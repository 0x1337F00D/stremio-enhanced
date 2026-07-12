// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { IPlatform } from "../platform/IPlatform";
import { STORAGE_KEYS } from "../constants";
import { PlatformManager } from "../platform/PlatformManager";
import ModManager from "./ModManager";
import PluginOptions from "./PluginOptions";

const loggerMocks = vi.hoisted(() => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
}));
const reloadApplicationMock = vi.hoisted(() => vi.fn());

vi.mock("../utils/logger", () => ({
    default: loggerMocks,
    getLogger: () => loggerMocks,
}));
vi.mock("../utils/reloadApplication", () => ({ default: reloadApplicationMock }));

const existsMock = vi.fn(async (_path: string) => true);
const readFileMock = vi.fn(async (_path: string) => "");
let storage: Storage;

function createMemoryStorage(): Storage {
    const values = new Map<string, string>();

    return {
        get length() {
            return values.size;
        },
        clear: () => values.clear(),
        getItem: (key: string) => values.get(key) ?? null,
        key: (index: number) => Array.from(values.keys())[index] ?? null,
        removeItem: (key: string) => {
            values.delete(key);
        },
        setItem: (key: string, value: string) => {
            values.set(key, String(value));
        },
    };
}

const mockPlatform = {
    id: "electron",
    readFile: readFileMock,
    writeFile: vi.fn(async (_path: string, _content: string) => undefined),
    readdir: vi.fn(async (_path: string) => []),
    exists: existsMock,
    unlink: vi.fn(async (_path: string) => undefined),
    mkdir: vi.fn(async (_path: string) => undefined),
    stat: vi.fn(async (_path: string) => ({ isFile: true, isDirectory: false })),
    openPath: vi.fn(async (_path: string) => undefined),
    openExternal: vi.fn(async (_url: string) => undefined),
    isPictureInPictureSupported: () => false,
    enterPictureInPicture: vi.fn(async () => false),
    setPictureInPictureState: vi.fn(async () => undefined),
    getThemesPath: () => "/mock/themes",
    getPluginsPath: () => "/mock/plugins",
    getEnhancedPath: () => "/mock/enhanced",
    init: vi.fn(async () => undefined),
} satisfies IPlatform;

describe("ModManager.loadPlugin", () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        vi.clearAllMocks();
        document.body.innerHTML = "";
        storage = createMemoryStorage();
        Object.defineProperty(globalThis, "localStorage", {
            configurable: true,
            value: storage,
        });
        PlatformManager.setPlatform(mockPlatform);
        existsMock.mockResolvedValue(true);
        readFileMock.mockResolvedValue("");
    });

    it("injects an existing plugin and persists it as enabled", async () => {
        readFileMock.mockResolvedValue("/* plugin content */");

        await ModManager.loadPlugin("test.plugin.js");

        expect(document.getElementById("test.plugin.js")?.textContent)
            .toBe("/* plugin content */");
        expect(JSON.parse(storage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) ?? "[]"))
            .toEqual(["test.plugin.js"]);
    });

    it("does not duplicate an already-enabled plugin", async () => {
        storage.setItem(
            STORAGE_KEYS.ENABLED_PLUGINS,
            JSON.stringify(["test.plugin.js"])
        );

        await ModManager.loadPlugin("test.plugin.js");

        expect(JSON.parse(storage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) ?? "[]"))
            .toEqual(["test.plugin.js"]);
    });

    it("does not touch the filesystem when the plugin is already in the DOM", async () => {
        const existingScript = document.createElement("script");
        existingScript.id = "test.plugin.js";
        document.body.appendChild(existingScript);

        await ModManager.loadPlugin("test.plugin.js");

        expect(existsMock).not.toHaveBeenCalled();
        expect(readFileMock).not.toHaveBeenCalled();
    });

    it("does not inject a plugin when its file is missing", async () => {
        existsMock.mockResolvedValue(false);

        await ModManager.loadPlugin("missing.plugin.js");

        expect(readFileMock).not.toHaveBeenCalled();
        expect(document.getElementById("missing.plugin.js")).toBeNull();
        expect(loggerMocks.error).toHaveBeenCalledWith(
            expect.stringContaining("Plugin file not found")
        );
    });

    it("handles a plugin read failure without changing DOM or storage", async () => {
        readFileMock.mockRejectedValue(new Error("read failed"));

        await ModManager.loadPlugin("broken.plugin.js");

        expect(document.getElementById("broken.plugin.js")).toBeNull();
        expect(storage.getItem(STORAGE_KEYS.ENABLED_PLUGINS)).toBeNull();
        expect(loggerMocks.error).toHaveBeenCalledWith(
            expect.stringContaining("Failed to read plugin broken.plugin.js")
        );
    });

    it("registers option metadata before executing the plugin", async () => {
        readFileMock.mockResolvedValue(`
            /**
             * @name Configurable
             * @description Configurable plugin
             * @author Test
             * @version 1.0.0
             * @option {"id":"enabled","type":"boolean","label":"Enabled","default":true}
             */
            window.configurablePluginLoaded = true;
        `);
        const registerSpy = vi.spyOn(PluginOptions, "register").mockImplementation(() => {
            expect(document.getElementById("configurable.plugin.js")).toBeNull();
            return true;
        });

        await ModManager.loadPlugin("configurable.plugin.js");

        expect(registerSpy).toHaveBeenCalledWith("configurable.plugin.js", [
            { id: "enabled", type: "boolean", label: "Enabled", default: true },
        ]);
        expect(document.getElementById("configurable.plugin.js")?.dataset.stremioEnhancedPlugin)
            .toBe("configurable.plugin.js");
    });

    it("reloads after disabling a plugin so its page-context side effects stop", () => {
        storage.setItem(
            STORAGE_KEYS.ENABLED_PLUGINS,
            JSON.stringify(["test.plugin.js"])
        );
        const plugin = document.createElement("script");
        plugin.id = "test.plugin.js";
        document.body.appendChild(plugin);

        ModManager.unloadPlugin("test.plugin.js");

        expect(document.getElementById("test.plugin.js")).toBeNull();
        expect(JSON.parse(storage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) ?? "[]"))
            .toEqual([]);
        expect(reloadApplicationMock).toHaveBeenCalledOnce();
    });

    it("cleans option state and reloads when an enabled plugin is uninstalled", async () => {
        storage.setItem(
            STORAGE_KEYS.ENABLED_PLUGINS,
            JSON.stringify(["test.plugin.js"])
        );
        PluginOptions.register("test.plugin.js", [
            { id: "enabled", type: "boolean", label: "Enabled", default: true },
        ]);
        PluginOptions.save("test.plugin.js", { enabled: false });
        vi.spyOn(ModManager, "isPluginInstalled").mockResolvedValue(true);

        await ModManager.removeMod("test.plugin.js", "plugin");

        expect(mockPlatform.unlink).toHaveBeenCalledWith(
            expect.stringContaining("test.plugin.js")
        );
        expect(PluginOptions.hasOptions("test.plugin.js")).toBe(false);
        expect(storage.getItem(`${STORAGE_KEYS.PLUGIN_OPTIONS_PREFIX}test.plugin.js`))
            .toBeNull();
        expect(reloadApplicationMock).toHaveBeenCalledOnce();
    });
});
