// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";

const modManager = vi.hoisted(() => ({
    fetchMods: vi.fn(),
    isPluginInstalled: vi.fn(),
    isThemeInstalled: vi.fn(),
    downloadMod: vi.fn(),
    removeMod: vi.fn(),
}));

vi.mock("../../core/ModManager", () => ({ default: modManager }));
vi.mock("../../utils/logger", () => ({
    getLogger: () => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn() }),
}));

import {
    activateModAction,
    browseMods,
    setupBrowseModsButton,
} from "./modBrowser";

function mountSettings(): void {
    document.body.innerHTML = `
        <div class="horizontal-nav-bar-container-Y_zvK"></div>
        <div class="horizontal-nav-bar-container-Y_zvK"></div>
        <main class="settings-content-co5eU"></main>
    `;
}

function registryMod(overrides: Record<string, unknown> = {}): Record<string, unknown> {
    return {
        name: "Example plugin",
        description: "Adds useful playback tools",
        author: "Registry author",
        version: "1.2.3",
        download: "https://example.com/example.plugin.js",
        repo: "https://example.com/repository",
        ...overrides,
    };
}

describe("mod browser", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
        mountSettings();
        modManager.fetchMods.mockResolvedValue({ plugins: [], themes: [] });
        modManager.isPluginInstalled.mockResolvedValue(false);
        modManager.isThemeInstalled.mockResolvedValue(false);
        modManager.downloadMod.mockResolvedValue("/mods/example.plugin.js");
        modManager.removeMod.mockResolvedValue(undefined);
    });

    it("renders registry entries, filters search text, and returns to settings", async () => {
        vi.useFakeTimers();
        modManager.fetchMods.mockResolvedValue({
            plugins: [registryMod()],
            themes: [registryMod({
                name: "Midnight theme",
                description: "A dark color palette",
                download: "https://example.com/midnight.theme.css",
            })],
        });

        await browseMods();

        const items = Array.from(document.querySelectorAll<HTMLElement>(".addon-container-lC5KN"));
        expect(items).toHaveLength(2);
        expect(items[0].textContent).toContain("Example plugin");
        expect(items[1].textContent).toContain("Midnight theme");

        const search = document.querySelector<HTMLInputElement>(".search-input-bAgAh");
        expect(search).not.toBeNull();
        if (!search) return;

        search.value = "dark";
        search.dispatchEvent(new Event("input"));
        expect(items[0].style.display).toBe("none");
        expect(items[1].style.display).toBe("");

        document.getElementById("back-btn")?.click();
        expect(location.hash).toBe("#/");
        await vi.runAllTimersAsync();
        expect(location.hash).toBe("#/settings");
    });

    it("updates an install action only after the operation resolves", async () => {
        let finishDownload: ((path: string) => void) | undefined;
        modManager.downloadMod.mockReturnValue(new Promise<string>(resolve => {
            finishDownload = resolve;
        }));
        modManager.fetchMods.mockResolvedValue({ plugins: [registryMod()], themes: [] });

        await browseMods();

        const button = document.querySelector<HTMLElement>(".modActionBtn");
        expect(button?.title).toBe("Install");
        const action = button ? activateModAction(button) : Promise.resolve();

        expect(button?.title).toBe("Install");
        expect(button?.getAttribute("aria-busy")).toBe("true");

        finishDownload?.("/mods/example.plugin.js");
        await action;
        expect(button?.title).toBe("Uninstall");
        expect(button?.dataset.action).toBe("uninstall");
        expect(button?.getAttribute("aria-busy")).toBeNull();
    });

    it("ignores page mutations to privileged action attributes", async () => {
        modManager.fetchMods.mockResolvedValue({ plugins: [registryMod()], themes: [] });
        await browseMods();
        const button = document.querySelector<HTMLElement>(".modActionBtn");
        expect(button).not.toBeNull();
        if (!button) return;

        button.dataset.action = "uninstall";
        button.dataset.link = "https://attacker.invalid/overwrite.plugin.js";
        button.dataset.type = "theme";
        await activateModAction(button);

        expect(modManager.downloadMod).toHaveBeenCalledWith(
            "https://example.com/example.plugin.js",
            "plugin"
        );
        expect(modManager.removeMod).not.toHaveBeenCalled();
    });

    it("binds the browse button once even when setup runs repeatedly", async () => {
        document.body.insertAdjacentHTML("afterbegin", '<button id="browsePluginsThemesBtn">Browse</button>');

        setupBrowseModsButton();
        setupBrowseModsButton();
        await Promise.resolve();
        await Promise.resolve();

        document.getElementById("browsePluginsThemesBtn")?.click();
        await vi.waitFor(() => expect(modManager.fetchMods).toHaveBeenCalledTimes(1));
    });
});
