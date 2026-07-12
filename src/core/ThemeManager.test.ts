// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import { STORAGE_KEYS } from "../constants";
import type { IPlatform } from "../platform/IPlatform";
import { PlatformManager } from "../platform/PlatformManager";
import ThemeManager from "./ThemeManager";

const logger = vi.hoisted(() => ({
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
}));

vi.mock("../utils/logger", () => ({ getLogger: () => logger }));

const exists = vi.fn(async () => true);
const platform = {
    id: "electron",
    readFile: vi.fn(async () => ""),
    writeFile: vi.fn(async () => undefined),
    readdir: vi.fn(async () => []),
    exists,
    unlink: vi.fn(async () => undefined),
    mkdir: vi.fn(async () => undefined),
    stat: vi.fn(async () => ({ isFile: true, isDirectory: false })),
    openPath: vi.fn(async () => undefined),
    openExternal: vi.fn(async () => undefined),
    isPictureInPictureSupported: () => false,
    enterPictureInPicture: vi.fn(async () => false),
    setPictureInPictureState: vi.fn(async () => undefined),
    getThemesPath: () => "/managed/themes",
    getPluginsPath: () => "/managed/plugins",
    getEnhancedPath: () => "/managed",
    init: vi.fn(async () => undefined),
} satisfies IPlatform;

function createMemoryStorage(): Storage {
    const values = new Map<string, string>();
    return {
        get length() { return values.size; },
        clear: () => values.clear(),
        getItem: key => values.get(key) ?? null,
        key: index => Array.from(values.keys())[index] ?? null,
        removeItem: key => { values.delete(key); },
        setItem: (key, value) => { values.set(key, String(value)); },
    };
}

describe("ThemeManager", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.head.innerHTML = "";
        const storage = createMemoryStorage();
        Object.defineProperty(globalThis, "localStorage", {
            configurable: true,
            value: storage,
        });
        Object.defineProperty(window, "localStorage", {
            configurable: true,
            value: storage,
        });
        PlatformManager.setPlatform(platform);
        exists.mockResolvedValue(true);
    });

    it("removes an active theme when Default is selected", async () => {
        const active = document.createElement("style");
        active.id = "activeTheme";
        document.head.appendChild(active);

        await expect(ThemeManager.applyTheme("Default", vi.fn()))
            .resolves.toBe(true);

        expect(document.getElementById("activeTheme")).toBeNull();
        expect(localStorage.getItem(STORAGE_KEYS.CURRENT_THEME)).toBe("Default");
    });

    it("rejects unsafe files without replacing the active theme", async () => {
        const active = document.createElement("style");
        active.id = "activeTheme";
        document.head.appendChild(active);
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "old.theme.css");
        const factory = vi.fn(async () => document.createElement("style"));

        await expect(ThemeManager.applyTheme("../bad.theme.css", factory))
            .resolves.toBe(false);

        expect(factory).not.toHaveBeenCalled();
        expect(document.getElementById("activeTheme")).toBe(active);
        expect(localStorage.getItem(STORAGE_KEYS.CURRENT_THEME)).toBe("old.theme.css");
    });

    it("falls back to Default when the stored theme file is missing", async () => {
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "missing.theme.css");
        exists.mockResolvedValue(false);
        const factory = vi.fn(async () => document.createElement("style"));

        await expect(ThemeManager.applyTheme(undefined, factory))
            .resolves.toBe(false);

        expect(factory).not.toHaveBeenCalled();
        expect(localStorage.getItem(STORAGE_KEYS.CURRENT_THEME)).toBe("Default");
    });

    it("prepares the next element before replacing and persisting it", async () => {
        const active = document.createElement("style");
        active.id = "activeTheme";
        document.head.appendChild(active);
        const next = document.createElement("link");
        const factory = vi.fn(async () => next);

        await expect(ThemeManager.applyTheme("new.theme.css", factory))
            .resolves.toBe(true);

        expect(factory).toHaveBeenCalledWith(
            expect.stringContaining("new.theme.css"),
            "new.theme.css"
        );
        expect(document.getElementById("activeTheme")).toBe(next);
        expect(active.isConnected).toBe(false);
        expect(localStorage.getItem(STORAGE_KEYS.CURRENT_THEME)).toBe("new.theme.css");
    });

    it("keeps the previous theme when element preparation fails", async () => {
        const active = document.createElement("style");
        active.id = "activeTheme";
        document.head.appendChild(active);
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "old.theme.css");

        await expect(ThemeManager.applyTheme(
            "broken.theme.css",
            async () => { throw new Error("read failed"); }
        )).resolves.toBe(false);

        expect(document.getElementById("activeTheme")).toBe(active);
        expect(localStorage.getItem(STORAGE_KEYS.CURRENT_THEME)).toBe("old.theme.css");
        expect(logger.error).toHaveBeenCalled();
    });
});
