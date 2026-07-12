// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { IPlatform } from "../platform/IPlatform";
import { STORAGE_KEYS } from "../constants";
import { PlatformManager } from "../platform/PlatformManager";
import ModManager from "./ModManager";

const loggerMocks = vi.hoisted(() => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
}));

vi.mock("../utils/logger", () => ({
    default: loggerMocks,
    getLogger: () => loggerMocks,
}));

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
});
