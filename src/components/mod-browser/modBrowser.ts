import ModManager from "../../core/ModManager";
import Helpers from "../../utils/Helpers";
import { CLASSES, SELECTORS } from "../../constants";
import { getBackButton } from "../back-btn/backBtn";
import { getModItemTemplate, ModMetaData } from "../mods-item/modsItem";
import { getModsTabTemplate } from "../mods-tab/modsTab";
import { getLogger } from "../../utils/logger";
import { isSafeModFileName } from "../../utils/modFileName";

type ModType = "plugin" | "theme";

interface ModActionState {
    action: "install" | "uninstall";
    fileName: string;
    link: string;
    type: ModType;
}

const logger = getLogger("ModBrowser");
const modActionStates = new WeakMap<HTMLElement, ModActionState>();

function asString(value: unknown): string {
    return typeof value === "string" ? value : "";
}

function parseRegistryMod(value: unknown): ModMetaData | null {
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;

    const record = value as Record<string, unknown>;
    return {
        name: asString(record.name),
        description: asString(record.description),
        author: asString(record.author),
        version: asString(record.version),
        preview: asString(record.preview) || undefined,
        download: asString(record.download),
        repo: asString(record.repo),
    };
}

function parseRegistryDownload(
    rawUrl: string,
    type: ModType
): { fileName: string; url: string } | null {
    try {
        const url = new URL(rawUrl);
        if (url.protocol !== "https:") return null;

        const encodedFileName = url.pathname.split("/").at(-1) ?? "";
        if (!encodedFileName) return null;

        let fileName: string;
        try {
            fileName = decodeURIComponent(encodedFileName);
        } catch {
            return null;
        }
        if (!isSafeModFileName(fileName, type)) return null;
        return { fileName, url: url.toString() };
    } catch {
        return null;
    }
}

function setActionState(
    button: HTMLElement,
    state: ModActionState,
    action: "install" | "uninstall"
): void {
    const installing = action === "install";
    const title = installing ? "Install" : "Uninstall";

    state.action = action;
    button.dataset.action = action;
    button.title = title;
    button.setAttribute("aria-disabled", "false");
    button.classList.toggle(CLASSES.INSTALL_BUTTON, installing);
    button.classList.toggle(CLASSES.UNINSTALL_BUTTON, !installing);

    const label = button.querySelector<HTMLElement>(".label-OnWh2");
    if (label) label.textContent = title;
}

export async function activateModAction(button: HTMLElement): Promise<void> {
    if (
        button.dataset.stremioEnhancedActionBusy === "true" ||
        button.getAttribute("aria-disabled") === "true"
    ) {
        return;
    }

    const state = modActionStates.get(button);
    if (!state) {
        button.setAttribute("aria-disabled", "true");
        return;
    }

    button.dataset.stremioEnhancedActionBusy = "true";
    button.setAttribute("aria-busy", "true");
    button.setAttribute("aria-disabled", "true");

    try {
        if (state.action === "install") {
            await ModManager.downloadMod(state.link, state.type);
            setActionState(button, state, "uninstall");
        } else {
            await ModManager.removeMod(state.fileName, state.type);
            setActionState(button, state, "install");
        }
    } catch (error) {
        logger.error(`Failed to ${state.action} ${state.type}: ${error}`);
        button.setAttribute("aria-disabled", "false");
    } finally {
        delete button.dataset.stremioEnhancedActionBusy;
        button.removeAttribute("aria-busy");
    }
}

function setupActionButtons(): void {
    document.querySelectorAll<HTMLElement>(".modActionBtn").forEach(button => {
        if (button.dataset.stremioEnhancedModActionBound === "true") return;
        if (!modActionStates.has(button)) {
            button.setAttribute("aria-disabled", "true");
            return;
        }

        button.dataset.stremioEnhancedModActionBound = "true";
        button.addEventListener("click", event => {
            if (!event.isTrusted) return;
            void activateModAction(button);
        });
        button.addEventListener("keydown", event => {
            if (!event.isTrusted) return;
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            void activateModAction(button);
        });
    });
}

function setupBackButton(): void {
    const horizontalNav = document.querySelectorAll(SELECTORS.HORIZONTAL_NAV)[1];
    if (!horizontalNav) return;

    horizontalNav.innerHTML = getBackButton();
    document.getElementById("back-btn")?.addEventListener("click", () => {
        location.hash = "#/";
        setTimeout(() => {
            location.hash = "#/settings";
        }, 0);
    });
}

async function renderRegistryMods(
    modsList: HTMLElement,
    values: unknown[],
    type: "Plugin" | "Theme"
): Promise<void> {
    for (const value of values) {
        const mod = parseRegistryMod(value);
        if (!mod) continue;

        const modType = type.toLowerCase() as ModType;
        const download = parseRegistryDownload(mod.download, modType);
        const installed = download
            ? type === "Plugin"
                ? await ModManager.isPluginInstalled(download.fileName)
                : await ModManager.isThemeInstalled(download.fileName)
            : false;

        const rendered = document.createElement("div");
        rendered.innerHTML = getModItemTemplate(mod, type, installed);
        const actionButton = rendered.querySelector<HTMLElement>(".modActionBtn");
        if (actionButton && download) {
            const state: ModActionState = {
                action: installed ? "uninstall" : "install",
                fileName: download.fileName,
                link: download.url,
                type: modType,
            };
            modActionStates.set(actionButton, state);
            setActionState(actionButton, state, state.action);
        }
        modsList.append(...Array.from(rendered.childNodes));
    }
}

export async function browseMods(): Promise<void> {
    const settingsContent = document.querySelector<HTMLElement>(SELECTORS.SETTINGS_CONTENT);
    if (!settingsContent) return;

    settingsContent.innerHTML = getModsTabTemplate();

    const mods = await ModManager.fetchMods();
    const modsList = document.getElementById("mods-list");
    if (!modsList) return;

    const plugins = Array.isArray(mods.plugins) ? mods.plugins : [];
    const themes = Array.isArray(mods.themes) ? mods.themes : [];

    await renderRegistryMods(modsList, plugins, "Plugin");
    await renderRegistryMods(modsList, themes, "Theme");

    setupActionButtons();
    setupSearchBar();
    setupBackButton();
}

export function setupSearchBar(): void {
    const searchInput = document.querySelector<HTMLInputElement>(SELECTORS.SEARCH_INPUT);
    const addonsContainer = document.querySelector<HTMLElement>(SELECTORS.ADDONS_LIST_CONTAINER);
    if (!searchInput || !addonsContainer) return;
    if (searchInput.dataset.stremioEnhancedSearchBound === "true") return;

    searchInput.dataset.stremioEnhancedSearchBound = "true";
    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.trim().toLowerCase();
        const modItems = addonsContainer.querySelectorAll<HTMLElement>(SELECTORS.ADDON_CONTAINER);

        modItems.forEach(item => {
            const name = item.querySelector(SELECTORS.NAME_CONTAINER)?.textContent?.toLowerCase() ?? "";
            const description = item.querySelector(SELECTORS.DESCRIPTION_ITEM)?.textContent?.toLowerCase() ?? "";
            const type = item.querySelector(SELECTORS.TYPES_CONTAINER)?.textContent?.toLowerCase() ?? "";
            const matches = name.includes(filter) || description.includes(filter) || type.includes(filter);
            item.style.display = matches ? "" : "none";
        });
    });
}

export function setupBrowseModsButton(): void {
    Helpers.waitForElm("#browsePluginsThemesBtn").then(() => {
        const button = document.getElementById("browsePluginsThemesBtn");
        if (!(button instanceof HTMLElement)) return;
        if (button.dataset.stremioEnhancedBrowseModsBound === "true") return;

        button.dataset.stremioEnhancedBrowseModsBound = "true";
        button.addEventListener("click", async () => {
            if (button.dataset.stremioEnhancedBrowseModsBusy === "true") return;

            button.dataset.stremioEnhancedBrowseModsBusy = "true";
            button.setAttribute("aria-busy", "true");
            try {
                await browseMods();
            } catch (error) {
                logger.error(`Failed to browse mods: ${error}`);
            } finally {
                delete button.dataset.stremioEnhancedBrowseModsBusy;
                button.removeAttribute("aria-busy");
            }
        });
    }).catch(error => logger.error(`Failed to setup browse mods button: ${error}`));
}
