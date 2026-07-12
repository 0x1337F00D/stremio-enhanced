// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { IPlatform } from "../../platform/IPlatform";
import { PlatformManager } from "../../platform/PlatformManager";
import { createEnhancedSettingsController } from "./enhancedSettings";

const settings = vi.hoisted(() => ({
    addSection: vi.fn((sectionId: string) => {
        if (document.getElementById(sectionId)) return;
        const section = document.createElement("div");
        section.id = sectionId;
        section.appendChild(document.createElement("div"));
        document.body.appendChild(section);

        const nav = document.createElement("a");
        nav.dataset.section = sectionId;
        document.body.appendChild(nav);
    }),
    addCategory: vi.fn((title: string, sectionId: string) => {
        const category = document.createElement("div");
        category.dataset.title = title;
        document.getElementById(sectionId)?.appendChild(category);
    }),
    addItem: vi.fn(),
}));

const modManager = vi.hoisted(() => ({
    addApplyThemeFunction: vi.fn(),
    scrollListener: vi.fn(),
}));

const setupBrowseModsButton = vi.hoisted(() => vi.fn());

vi.mock("../../core/Settings", () => ({ default: settings }));
vi.mock("../../core/ModManager", () => ({ default: modManager }));
vi.mock("../../components/mod-browser/modBrowser", () => ({ setupBrowseModsButton }));
vi.mock("../../components/default-theme/defaultTheme", () => ({
    getDefaultThemeTemplate: () => "<div>Default</div>",
}));
vi.mock("../../utils/Helpers", () => ({
    default: {
        waitForElm: async (selector: string) => {
            const element = document.querySelector(selector);
            if (!element) throw new Error(`Missing ${selector}`);
            return element;
        },
    },
}));
vi.mock("../../utils/logger", () => ({
    getLogger: () => ({ error: vi.fn(), info: vi.fn(), warn: vi.fn() }),
}));

const platform = {
    id: "electron",
    readFile: vi.fn(async () => ""),
    writeFile: vi.fn(async () => undefined),
    readdir: vi.fn(async () => []),
    exists: vi.fn(async () => true),
    unlink: vi.fn(async () => undefined),
    mkdir: vi.fn(async () => undefined),
    stat: vi.fn(async () => ({ isFile: true, isDirectory: false })),
    openPath: vi.fn(async () => undefined),
    openExternal: vi.fn(async () => undefined),
    isPictureInPictureSupported: () => false,
    enterPictureInPicture: vi.fn(async () => false),
    setPictureInPictureState: vi.fn(async () => undefined),
    getThemesPath: () => "/themes",
    getPluginsPath: () => "/plugins",
    getEnhancedPath: () => "/enhanced",
    init: vi.fn(async () => undefined),
} satisfies IPlatform;

describe("createEnhancedSettingsController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = "";
        PlatformManager.setPlatform(platform);
        window.location.hash = "#/settings";
        const storage = new Map<string, string>();
        Object.defineProperty(globalThis, "localStorage", {
            configurable: true,
            value: {
                getItem: (key: string) => storage.get(key) ?? null,
                setItem: (key: string, value: string) => storage.set(key, value),
            },
        });
    });

    it("builds shared settings once and avoids duplicate route setup", async () => {
        const addPlatformControls = vi.fn();
        const renderAbout = vi.fn();
        const controller = createEnhancedSettingsController({
            addPlatformControls,
            renderAbout,
        });

        await controller.check();
        await controller.check();

        expect(settings.addSection).toHaveBeenCalledOnce();
        expect(settings.addCategory).toHaveBeenCalledTimes(3);
        expect(addPlatformControls).toHaveBeenCalledOnce();
        expect(renderAbout).toHaveBeenCalledOnce();
        expect(setupBrowseModsButton).toHaveBeenCalledOnce();
        expect(modManager.scrollListener).toHaveBeenCalledOnce();
        expect(document.querySelectorAll("#stremio-enhanced-default-theme"))
            .toHaveLength(1);
    });

    it("does nothing outside the settings route", async () => {
        window.location.hash = "#/library";
        const controller = createEnhancedSettingsController({
            addPlatformControls: vi.fn(),
            renderAbout: vi.fn(),
        });

        await controller.check();

        expect(settings.addSection).not.toHaveBeenCalled();
    });
});
