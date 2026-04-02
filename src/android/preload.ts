import { PlatformManager } from "../platform/PlatformManager";

import Settings from "../core/Settings";
import properties from "../core/Properties";
import ModManager from "../core/ModManager";
import Helpers from "../utils/Helpers";
import { getModsTabTemplate } from "../components/mods-tab/modsTab";
import { getModItemTemplate } from "../components/mods-item/modsItem";
import { getAboutCategoryTemplate } from "../components/about-category/aboutCategory";
import { getDefaultThemeTemplate } from "../components/default-theme/defaultTheme";
import { getBackButton } from "../components/back-btn/backBtn";
import logger from "../utils/logger";
import { join } from "path";
import {
    STORAGE_KEYS,
    SELECTORS,
    CLASSES,
    FILE_EXTENSIONS,
    TIMEOUTS,
} from "../constants";
import ExtractMetaData from "../utils/ExtractMetaData";
import { NodeJS } from 'capacitor-nodejs';
import LogManager from "../core/LogManager";
import { FilePicker } from '@capawesome/capacitor-file-picker';

// Initialize platform for Capacitor
PlatformManager.init();

// Hook console for logs menu
LogManager.hookConsole();
LogManager.addLog('INFO', 'Stremio Enhanced: Preload script initialized');

// Listen for server logs and errors
NodeJS.addListener('log', (data) => {
    LogManager.addLog('INFO', `[Server] ${data.args.join(' ')}`);
    console.log('[Server]', ...data.args);
});

NodeJS.addListener('error', (data) => {
    LogManager.addLog('ERROR', `[Server Error] ${data.args.join(' ')}`);
    console.error('[Server Error]', ...data.args);
    Helpers.showAlert('error', 'Server Error', data.args.join(' '), ['OK']);
});

// Mock ipcRenderer for Android
const ipcRenderer = {
    invoke: async (channel: string, ...args: any[]) => {
        logger.info(`[Android] Invoke ${channel}`, args);
        if (channel === 'get-transparency-status') return false;
        if (channel === 'extract-embedded-subtitles') return [];
        return null;
    },
    send: (channel: string, ...args: any[]) => {
        logger.info(`[Android] Send ${channel}`, args);
    },
    on: (channel: string, listener: any) => {
        // No-op
    }
};

const SETTINGS_ROUTE = "#/settings";
const PLAYER_ROUTE = "#/player";
const STREAMING_SERVER_READY_TIMEOUT_MS = 15000;
const FULLSCREEN_CONTROL_SELECTORS = [
    '[title="Fullscreen"]',
    '[title="Exit Fullscreen"]',
    'button[aria-label="Fullscreen"]',
    'button[aria-label="Exit Fullscreen"]',
    '[class*="fullscreen-toggle"]',
    '[class*="horizontal-nav-bar-container-"] [class*="buttons-container-"] > :not([class*="menu-button-container"]):not(.stremio-enhanced-pip-button)',
];

let fullscreenStyleInjected = false;
let fullscreenObserverStarted = false;
let settingsObserverStarted = false;
let settingsCheckScheduled = false;
let playerObserverStarted = false;
let playerFeatureCheckScheduled = false;
let streamingServerReadyPromise: Promise<void> | null = null;
let streamingServerReloadScheduled = false;

const init = async () => {
    LogManager.addLog('INFO', 'Stremio Enhanced: Initialization started');
    // Initialize platform
    if (!PlatformManager.current) PlatformManager.init();
    await PlatformManager.current.init();
    void ensureBundledStreamingServerReady();

    installFullscreenHider();
    observeSettingsUi();
    observePlayerUi();

    // Expose API for injected scripts
    (window as any).stremioEnhanced = {
        applyTheme: async (theme: string) => {
            // applyUserTheme reads from localStorage which is updated by the injected script
            await applyUserTheme();
        }
    };

    initializeUserSettings();

    // Apply enabled theme
    await applyUserTheme();

    // Load enabled plugins
    await loadEnabledPlugins();

    // Handle navigation changes
    window.addEventListener("hashchange", () => {
        scheduleSettingsCheck();
        schedulePlayerFeatureSync();
    });

    window.addEventListener("resize", () => {
        hideFullscreenControls();
    });

    // Initial check
    scheduleSettingsCheck();
    schedulePlayerFeatureSync();
    hideFullscreenControls();

    // Inject success toast
    Helpers.createToast('enhanced-loaded', 'Stremio Enhanced', 'Stremio Enhanced Loaded', 'success');
};

if (document.readyState === 'loading') {
    window.addEventListener("load", init);
} else {
    init();
}

// Settings page opened
let isCheckingSettings = false;

function isEnhancedSettingsReady(): boolean {
    return Boolean(
        document.getElementById("enhanced") &&
        document.querySelector('[data-section="enhanced"]') &&
        document.querySelector(SELECTORS.THEMES_CATEGORY) &&
        document.querySelector(SELECTORS.PLUGINS_CATEGORY) &&
        document.querySelector(SELECTORS.ABOUT_CATEGORY)
    );
}

function bindButtonClick(
    buttonId: string,
    handler: () => void | Promise<void>,
    errorContext: string
): void {
    Helpers.waitForElm(`#${buttonId}`).then(() => {
        const button = document.getElementById(buttonId);
        if (!(button instanceof HTMLElement)) return;
        if (button.dataset.stremioEnhancedClickBound === "true") return;

        button.dataset.stremioEnhancedClickBound = "true";
        button.addEventListener("click", () => {
            void handler();
        });
    }).catch(err => logger.error(`Failed to setup ${errorContext}: ${err}`));
}

async function checkSettings() {
    if (!location.href.includes(SETTINGS_ROUTE)) return;
    if (isEnhancedSettingsReady()) return;

    if (isCheckingSettings) return;
    isCheckingSettings = true;

    try {
        await doCheckSettings();
    } finally {
        isCheckingSettings = false;
    }
}

async function doCheckSettings() {
    ModManager.addApplyThemeFunction();

    const themesPath = properties.themesPath;
    const pluginsPath = properties.pluginsPath;

    let allThemes: string[] = [];
    let allPlugins: string[] = [];

    try {
        allThemes = await PlatformManager.current.readdir(themesPath);
        allPlugins = await PlatformManager.current.readdir(pluginsPath);
    } catch(e) {
        logger.error("Failed to read themes/plugins directories: " + e);
    }

    const themesList = allThemes.filter(fileName => fileName.endsWith(FILE_EXTENSIONS.THEME));
    const pluginsList = allPlugins.filter(fileName => fileName.endsWith(FILE_EXTENSIONS.PLUGIN));

    logger.info("Adding 'Enhanced' sections...");
    Settings.addSection("enhanced", "Enhanced");
    Settings.addCategory("Themes", "enhanced", getThemeIcon());
    Settings.addCategory("Plugins", "enhanced", getPluginIcon());
    Settings.addCategory("About", "enhanced", getAboutIcon());

    Settings.addButton("Import Theme", "importThemeBtn", SELECTORS.THEMES_CATEGORY);
    Settings.addButton("Manage Themes Folder", "openthemesfolderBtn", SELECTORS.THEMES_CATEGORY);
    Settings.addButton("Import Plugin", "importPluginBtn", SELECTORS.PLUGINS_CATEGORY);
    Settings.addButton("Manage Plugins Folder", "openpluginsfolderBtn", SELECTORS.PLUGINS_CATEGORY);

    setupImportButton("importThemeBtn", "theme");
    setupImportButton("importPluginBtn", "plugin");
    setupManagedFolderButton("openthemesfolderBtn", properties.themesPath);
    setupManagedFolderButton("openpluginsfolderBtn", properties.pluginsPath);

    writeAbout();

    // Browse plugins/themes from stremio-enhanced-registry
    setupBrowseModsButton();

    // Add themes to settings
    Helpers.waitForElm(SELECTORS.THEMES_CATEGORY).then(async () => {
        // Default theme
        if (!document.getElementById("stremio-enhanced-default-theme")) {
            const isCurrentThemeDefault = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME) === "Default";
            const defaultThemeContainer = document.createElement("div");
            defaultThemeContainer.id = "stremio-enhanced-default-theme";
            defaultThemeContainer.innerHTML = getDefaultThemeTemplate(isCurrentThemeDefault);
            document.querySelector(SELECTORS.THEMES_CATEGORY)?.appendChild(defaultThemeContainer);
        }

        // Add installed themes
        await Promise.all(themesList.map(async (theme) => {
            try {
                const themePath = join(themesPath, theme);
                const content = await PlatformManager.current.readFile(themePath);
                const metaData = ExtractMetaData.extractMetadataFromText(content);

                if (metaData) {
                    if (metaData.name.toLowerCase() !== "default") {
                        Settings.addItem("theme", theme, {
                            name: metaData.name,
                            description: metaData.description,
                            author: metaData.author,
                            version: metaData.version,
                            updateUrl: metaData.updateUrl,
                            source: metaData.source
                        });
                    }
                }
            } catch (e) {
                logger.error(`Failed to load theme metadata for ${theme}: ${e}`);
            }
        }));
    }).catch(err => logger.error("Failed to setup themes: " + err));

    // Add plugins to settings
    for (const plugin of pluginsList) {
        try {
            const pluginPath = join(pluginsPath, plugin);
            const content = await PlatformManager.current.readFile(pluginPath);
            const metaData = ExtractMetaData.extractMetadataFromText(content);

            if (metaData) {
                Settings.addItem("plugin", plugin, {
                    name: metaData.name,
                    description: metaData.description,
                    author: metaData.author,
                    version: metaData.version,
                    updateUrl: metaData.updateUrl,
                    source: metaData.source
                });
            }
        } catch (e) {
            logger.error(`Failed to load plugin metadata for ${plugin}: ${e}`);
        }
    }

    ModManager.togglePluginListener();
    ModManager.scrollListener();
}

async function ensureBundledStreamingServerReady(): Promise<void> {
    if (streamingServerReadyPromise) {
        await streamingServerReadyPromise;
        return;
    }

    streamingServerReadyPromise = (async () => {
        try {
            await Promise.race([
                NodeJS.whenReady(),
                new Promise<never>((_, reject) => {
                    window.setTimeout(() => {
                        reject(new Error("Timed out waiting for the bundled streaming server."));
                    }, STREAMING_SERVER_READY_TIMEOUT_MS);
                })
            ]);

            LogManager.addLog("INFO", "Bundled streaming server is ready");
            scheduleStreamingServerReload();
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            LogManager.addLog("ERROR", `Bundled streaming server failed to become ready: ${message}`);
            logger.error(`Bundled streaming server failed to become ready: ${message}`);
            streamingServerReadyPromise = null;
        }
    })();

    await streamingServerReadyPromise;
}

async function reloadStreamingServer(retryCount = 0): Promise<void> {
    try {
        await Helpers._eval(`core.transport.dispatch({ action: 'StreamingServer', args: { action: 'Reload' } });`);
        logger.info("Stremio streaming server reloaded.");
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        if (retryCount < 3) {
            window.setTimeout(() => {
                void reloadStreamingServer(retryCount + 1);
            }, TIMEOUTS.CORESTATE_RETRY_INTERVAL);
            return;
        }

        logger.error(`Failed to reload bundled streaming server: ${message}`);
        LogManager.addLog("ERROR", `Failed to reload bundled streaming server: ${message}`);
    }
}

function scheduleStreamingServerReload(): void {
    if (streamingServerReloadScheduled) return;
    streamingServerReloadScheduled = true;

    window.setTimeout(() => {
        streamingServerReloadScheduled = false;
        void reloadStreamingServer();
    }, TIMEOUTS.SERVER_RELOAD_DELAY);
}

function scheduleSettingsCheck(): void {
    if (settingsCheckScheduled) return;
    settingsCheckScheduled = true;

    window.setTimeout(async () => {
        settingsCheckScheduled = false;
        await checkSettings();
    }, 100);
}

function observeSettingsUi(): void {
    if (settingsObserverStarted) return;
    settingsObserverStarted = true;

    const startObserver = () => {
        const observer = new MutationObserver(() => {
            if (location.href.includes(SETTINGS_ROUTE) && !isCheckingSettings && !isEnhancedSettingsReady()) {
                scheduleSettingsCheck();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    };

    if (document.body) {
        startObserver();
        return;
    }

    const bodyObserver = new MutationObserver((_, obs) => {
        if (!document.body) return;
        obs.disconnect();
        startObserver();
    });

    bodyObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
}

function schedulePlayerFeatureSync(): void {
    if (playerFeatureCheckScheduled) return;
    playerFeatureCheckScheduled = true;

    window.setTimeout(async () => {
        playerFeatureCheckScheduled = false;
        await syncPlayerFeatures();
    }, 100);
}

function observePlayerUi(): void {
    if (playerObserverStarted) return;
    playerObserverStarted = true;

    const startObserver = () => {
        const observer = new MutationObserver(() => {
            if (location.href.includes(PLAYER_ROUTE)) {
                schedulePlayerFeatureSync();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    };

    if (document.body) {
        startObserver();
        return;
    }

    const bodyObserver = new MutationObserver((_, obs) => {
        if (!document.body) return;
        obs.disconnect();
        startObserver();
    });

    bodyObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
}

function installFullscreenHider(): void {
    if (!fullscreenStyleInjected) {
        const style = document.createElement("style");
        style.id = "stremio-enhanced-fullscreen-style";
        style.textContent = `
            ${FULLSCREEN_CONTROL_SELECTORS.join(",\n            ")} {
                display: none !important;
                visibility: hidden !important;
                pointer-events: none !important;
            }
        `;

        const appendStyle = () => {
            if (!document.head || document.getElementById(style.id)) return false;
            document.head.appendChild(style);
            fullscreenStyleInjected = true;
            return true;
        };

        if (!appendStyle()) {
            const observer = new MutationObserver((_, obs) => {
                if (!appendStyle()) return;
                obs.disconnect();
            });
            observer.observe(document.documentElement, { childList: true, subtree: true });
        }
    }

    hideFullscreenControls();

    if (fullscreenObserverStarted) return;
    fullscreenObserverStarted = true;

    const startObserver = () => {
        const observer = new MutationObserver(() => {
            hideFullscreenControls();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ["class", "title", "aria-label"],
        });
    };

    if (document.body) {
        startObserver();
        return;
    }

    const bodyObserver = new MutationObserver((_, obs) => {
        if (!document.body) return;
        obs.disconnect();
        startObserver();
    });

    bodyObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
}

function hideFullscreenControls(): void {
    document.querySelectorAll<HTMLElement>(FULLSCREEN_CONTROL_SELECTORS.join(",")).forEach((element) => {
        if (element.closest('[class*="menu-button-container"]') || element.classList.contains("stremio-enhanced-pip-button")) return;
        element.style.display = "none";
        element.style.visibility = "hidden";
        element.style.pointerEvents = "none";
    });
}

function initializeUserSettings(): void {
    const defaults: Record<string, string> = {
        [STORAGE_KEYS.ENABLED_PLUGINS]: "[]",
        [STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP]: "false",
        [STORAGE_KEYS.DISCORD_RPC]: "false",
    };

    for (const [key, defaultValue] of Object.entries(defaults)) {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, defaultValue);
        }
    }
}

async function applyUserTheme(): Promise<void> {
    const currentTheme = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);

    if (!currentTheme || currentTheme === "Default") {
        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
        return;
    }

    const themePath = join(properties.themesPath, currentTheme);

    // In capacitor, we need to read the file content and inject it as style
    // because file:// URLs might not work or are restricted.
    // Electron implementation uses pathToFileURL which results in file://.
    // Let's try to read content and inject <style> instead of <link>.

    try {
        if (!await PlatformManager.current.exists(themePath)) {
            localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
            return;
        }

        // Remove existing theme if present
        document.getElementById("activeTheme")?.remove();

        const content = await PlatformManager.current.readFile(themePath);

        const styleElement = document.createElement('style');
        styleElement.setAttribute("id", "activeTheme");
        styleElement.textContent = content;
        document.head.appendChild(styleElement);
    } catch (e) {
        logger.error("Failed to apply theme: " + e);
    }
}

async function loadEnabledPlugins(): Promise<void> {
    const pluginsPath = properties.pluginsPath;
    try {
        if (!await PlatformManager.current.exists(pluginsPath)) return;

        const allPlugins = await PlatformManager.current.readdir(pluginsPath);
        const pluginsToLoad = allPlugins.filter(fileName => fileName.endsWith(FILE_EXTENSIONS.PLUGIN));

        const enabledPlugins: string[] = JSON.parse(
            localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]"
        );

        for (const plugin of pluginsToLoad) {
            if (enabledPlugins.includes(plugin)) {
                await ModManager.loadPlugin(plugin);
            }
        }
    } catch (e) {
        logger.error("Failed to load plugins: " + e);
    }
}

function setupImportButton(buttonId: string, type: "theme" | "plugin"): void {
    bindButtonClick(buttonId, () => importModFile(type), `${type} import button`);
}

function setupManagedFolderButton(buttonId: string, folderPath: string): void {
    bindButtonClick(buttonId, () => PlatformManager.current.openPath(folderPath), `folder button ${buttonId}`);
}

let isImporting = false;
async function importModFile(type: "theme" | "plugin"): Promise<void> {
    if (isImporting) return;
    isImporting = true;
    try {
        const result = await FilePicker.pickFiles({ limit: 1 });
        const file = result.files[0];
        const filePath = (file as { path?: string; uri?: string } | undefined)?.path
            ?? (file as { path?: string; uri?: string } | undefined)?.uri;

        if (!file?.name || !filePath) {
            return;
        }

        const expectedExtension = type === "theme" ? FILE_EXTENSIONS.THEME : FILE_EXTENSIONS.PLUGIN;
        if (!file.name.endsWith(expectedExtension)) {
            await Helpers.showAlert(
                "warning",
                "Unsupported File",
                `Please choose a ${expectedExtension} file.`,
                ["OK"]
            );
            return;
        }

        const content = await PlatformManager.current.readFile(filePath);
        const destinationDirectory = type === "theme" ? properties.themesPath : properties.pluginsPath;
        await PlatformManager.current.writeFile(join(destinationDirectory, file.name), content);

        // Use a timeout to avoid location.reload() triggering loop issues with Capacitor Activity Results
        setTimeout(() => location.reload(), 100);
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        if (/cancel|canceled|cancelled|no files selected/i.test(message)) {
            return;
        }

        logger.error(`Failed to import ${type}: ${message}`);
    } finally {
        // slight delay before unlocking to avoid double click events after focus returns
        setTimeout(() => { isImporting = false; }, 500);
    }
}

async function syncPlayerFeatures(): Promise<void> {
    if (!PlatformManager.current.isPictureInPictureSupported()) {
        removePictureInPictureButton();
        return;
    }

    if (!location.href.includes(PLAYER_ROUTE)) {
        removePictureInPictureButton();
        await PlatformManager.current.setPictureInPictureState(false);
        return;
    }

    const video = document.querySelector("video") as HTMLVideoElement | null;
    if (!video) {
        removePictureInPictureButton();
        await PlatformManager.current.setPictureInPictureState(false);
        return;
    }

    bindPlayerPictureInPicture(video);
    injectPictureInPictureButton();
    await updatePictureInPictureState(video);
}

function bindPlayerPictureInPicture(video: HTMLVideoElement): void {
    if (video.dataset.stremioEnhancedPipBound === "true") return;
    video.dataset.stremioEnhancedPipBound = "true";

    const syncState = () => {
        void updatePictureInPictureState(video);
    };

    ["loadedmetadata", "play", "pause", "ended", "emptied", "resize"].forEach((eventName) => {
        video.addEventListener(eventName, syncState);
    });
}

async function updatePictureInPictureState(video?: HTMLVideoElement): Promise<void> {
    if (!PlatformManager.current.isPictureInPictureSupported()) return;

    const currentVideo = video ?? document.querySelector("video") as HTMLVideoElement | null;
    if (!currentVideo || !location.href.includes(PLAYER_ROUTE)) {
        await PlatformManager.current.setPictureInPictureState(false);
        return;
    }

    const width = currentVideo.videoWidth || 16;
    const height = currentVideo.videoHeight || 9;
    const isActivePlayback = currentVideo.readyState > 0 && !currentVideo.paused && !currentVideo.ended;

    await PlatformManager.current.setPictureInPictureState(isActivePlayback, width, height);
}

function injectPictureInPictureButton(): void {
    const existingButton = document.getElementById("stremio-enhanced-pip-btn");
    if (existingButton) return;

    const buttonsContainer = getPictureInPictureButtonContainer();
    if (!buttonsContainer) return;

    const templateButton = buttonsContainer.firstElementChild as HTMLElement | null;
    const templateIcon = templateButton?.querySelector("svg");

    const button = document.createElement("button");
    button.id = "stremio-enhanced-pip-btn";
    button.type = "button";
    button.title = "Picture in Picture";
    button.setAttribute("aria-label", "Picture in Picture");
    button.className = `${templateButton?.className ?? ""} stremio-enhanced-pip-button`.trim();
    button.innerHTML = `
        <svg class="${templateIcon?.getAttribute("class") ?? ""}" viewBox="0 0 24 24">
            <path d="M19 7H5v10h14V7Zm0-2c1.11 0 2 .89 2 2v10c0 1.11-.89 2-2 2H5c-1.11 0-2-.89-2-2V7c0-1.11.89-2 2-2h14Zm-1 7h-6v4h6v-4Z" style="fill: currentColor;"></path>
        </svg>
    `;
    button.addEventListener("click", async () => {
        const currentVideo = document.querySelector("video") as HTMLVideoElement | null;
        const success = await PlatformManager.current.enterPictureInPicture(
            currentVideo?.videoWidth || 16,
            currentVideo?.videoHeight || 9
        );

        if (!success) {
            Helpers.createToast(
                "pip-unavailable",
                "Picture in Picture",
                "Picture in Picture is not available on this device.",
                "fail"
            );
        }
    });

    buttonsContainer.insertBefore(button, buttonsContainer.firstChild);
}

function removePictureInPictureButton(): void {
    document.getElementById("stremio-enhanced-pip-btn")?.remove();
}

function getPictureInPictureButtonContainer(): HTMLElement | null {
    const allContainers = Array.from(
        document.querySelectorAll<HTMLElement>('[class*="horizontal-nav-bar-container-"] [class*="buttons-container-"]')
    );

    return allContainers.at(-1) ?? null;
}

async function browseMods(): Promise<void> {
    const settingsContent = document.querySelector(SELECTORS.SETTINGS_CONTENT);
    if (!settingsContent) return;

    settingsContent.innerHTML = getModsTabTemplate();

    const mods = await ModManager.fetchMods();
    const modsList = document.getElementById("mods-list");
    if (!modsList) return;

    interface RegistryMod {
        name: string;
        description: string;
        author: string;
        version: string;
        preview?: string;
        download: string;
        repo: string;
    }

    // Add plugins
    for (const plugin of (mods.plugins as RegistryMod[])) {
        const installed = await ModManager.isPluginInstalled(Helpers.getFileNameFromUrl(plugin.download));
        modsList.innerHTML += getModItemTemplate(plugin, "Plugin", installed);
    }

    // Add themes
    for (const theme of (mods.themes as RegistryMod[])) {
        const installed = await ModManager.isThemeInstalled(Helpers.getFileNameFromUrl(theme.download));
        modsList.innerHTML += getModItemTemplate(theme, "Theme", installed);
    }

    // Set up action buttons
    const actionBtns = document.querySelectorAll(".modActionBtn");
    actionBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const link = btn.getAttribute("data-link");
            const type = btn.getAttribute("data-type")?.toLowerCase() as "plugin" | "theme";

            if (!link || !type) return;

            if (btn.getAttribute("title") === "Install") {
                ModManager.downloadMod(link, type);
                btn.classList.remove(CLASSES.INSTALL_BUTTON);
                btn.classList.add(CLASSES.UNINSTALL_BUTTON);
                btn.setAttribute("title", "Uninstall");
                if (btn.childNodes[1]) {
                    btn.childNodes[1].textContent = "Uninstall";
                }
            } else {
                ModManager.removeMod(Helpers.getFileNameFromUrl(link), type);
                btn.classList.remove(CLASSES.UNINSTALL_BUTTON);
                btn.classList.add(CLASSES.INSTALL_BUTTON);
                btn.setAttribute("title", "Install");
                if (btn.childNodes[1]) {
                    btn.childNodes[1].textContent = "Install";
                }
            }
        });
    });

    // Search bar logic
    setupSearchBar();

    // Add back button
    const horizontalNavs = document.querySelectorAll(SELECTORS.HORIZONTAL_NAV);
    const horizontalNav = horizontalNavs[1];
    if (horizontalNav) {
        horizontalNav.innerHTML = getBackButton();
        document.getElementById("back-btn")?.addEventListener("click", () => {
            location.hash = '#/';
            setTimeout(() => {
                location.hash = '#/settings';
            }, 0);
        });
    }
}

function setupSearchBar(): void {
    const searchInput = document.querySelector(SELECTORS.SEARCH_INPUT) as HTMLInputElement;
    const addonsContainer = document.querySelector(SELECTORS.ADDONS_LIST_CONTAINER);

    if (!searchInput || !addonsContainer) return;

    searchInput.addEventListener("input", () => {
        const filter = searchInput.value.trim().toLowerCase();
        const modItems = addonsContainer.querySelectorAll(SELECTORS.ADDON_CONTAINER);

        modItems.forEach((item) => {
            const name = item.querySelector(SELECTORS.NAME_CONTAINER)?.textContent?.toLowerCase() || "";
            const description = item.querySelector(SELECTORS.DESCRIPTION_ITEM)?.textContent?.toLowerCase() || "";
            const type = item.querySelector(SELECTORS.TYPES_CONTAINER)?.textContent?.toLowerCase() || "";

            const match = name.includes(filter) || description.includes(filter) || type.includes(filter);
            (item as HTMLElement).style.display = match ? "" : "none";
        });
    });
}

function setupBrowseModsButton(): void {
    bindButtonClick("browsePluginsThemesBtn", browseMods, "browse mods button");
}

function writeAbout(): void {
    Helpers.waitForElm(SELECTORS.ABOUT_CATEGORY).then(async () => {
        const aboutCategory = document.querySelector(SELECTORS.ABOUT_CATEGORY);
        if (aboutCategory instanceof HTMLElement) {
            if (!document.getElementById("stremio-enhanced-about-content")) {
                const aboutContent = document.createElement("div");
                aboutContent.id = "stremio-enhanced-about-content";
                aboutContent.innerHTML = getAboutCategoryTemplate(
                    "Android-v1.0.0",
                    false,
                    false,
                    false
                );
                aboutCategory.appendChild(aboutContent);
            }

            Settings.addButton("Open Logs", "openLogsBtn", SELECTORS.ABOUT_CATEGORY);
            Settings.addButton("Export Logs", "exportLogsBtn", SELECTORS.ABOUT_CATEGORY);
            Settings.addButton("Reload Streaming Server", "reloadStreamingServerBtn", SELECTORS.ABOUT_CATEGORY);
            Settings.addButton("Open App Files", "openEnhancedFolderBtn", SELECTORS.ABOUT_CATEGORY);

            bindButtonClick("openLogsBtn", () => {
                LogManager.showLogs();
            }, "open logs button");

            bindButtonClick("exportLogsBtn", async () => {
                const exportedPath = await LogManager.exportLogs();
                if (exportedPath) {
                    await PlatformManager.current.openPath(join(properties.enhancedPath, "logs"));
                }
            }, "export logs button");

            bindButtonClick("reloadStreamingServerBtn", async () => {
                await ensureBundledStreamingServerReady();
                scheduleStreamingServerReload();
            }, "reload streaming server button");

            bindButtonClick("openEnhancedFolderBtn", async () => {
                await PlatformManager.current.openPath(properties.enhancedPath);
            }, "open enhanced folder button");
        }
    }).catch(err => logger.error("Failed to write about section: " + err));
}

function getAboutIcon(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
        <g><path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" style="fill:currentcolor"></path></g></svg>`;
}

function getThemeIcon(): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon">
        <g><path fill="none" d="M0 0h24v24H0z"></path>
        <path d="M4 3h16a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm2 9h6a1 1 0 0 1 1 1v3h1v6h-4v-6h1v-2H5a1 1 0 0 1-1-1v-2h2v1zm11.732 1.732l1.768-1.768 1.768 1.768a2.5 2.5 0 1 1-3.536 0z" style="fill: currentcolor;"></path></g></svg>`;
}

function getPluginIcon(): string {
    return `<svg icon="addons-outline" class="icon" viewBox="0 0 512 512" style="fill: currentcolor;">
        <path d="M413.7 246.1H386c-0.53-0.01-1.03-0.23-1.4-0.6-0.37-0.37-0.59-0.87-0.6-1.4v-77.2a38.94 38.94 0 0 0-11.4-27.5 38.94 38.94 0 0 0-27.5-11.4h-77.2c-0.53-0.01-1.03-0.23-1.4-0.6-0.37-0.37-0.59-0.87-0.6-1.4v-27.7c0-27.1-21.5-49.9-48.6-50.3-6.57-0.1-13.09 1.09-19.2 3.5a49.616 49.616 0 0 0-16.4 10.7 49.823 49.823 0 0 0-11 16.2 48.894 48.894 0 0 0-3.9 19.2v28.5c-0.01 0.53-0.23 1.03-0.6 1.4-0.37 0.37-0.87 0.59-1.4 0.6h-77.2c-10.5 0-20.57 4.17-28 11.6a39.594 39.594 0 0 0-11.6 28v70.4c0.01 0.53 0.23 1.03 0.6 1.4 0.37 0.37 0.87 0.59 1.4 0.6h26.9c29.4 0 53.7 25.5 54.1 54.8 0.4 29.9-23.5 57.2-53.3 57.2H50c-0.53 0.01-1.03 0.23-1.4 0.6-0.37 0.37-0.59 0.87-0.6 1.4v70.4c0 10.5 4.17 20.57 11.6 28s17.5 11.6 28 11.6h70.4c0.53-0.01 1.03-0.23 1.4-0.6 0.37-0.37 0.59-0.87 0.6-1.4V441.2c0-30.3 24.8-56.4 55-57.1 30.1-0.7 57 20.3 57 50.3v27.7c0.01 0.53 0.23 1.03 0.6 1.4 0.37 0.37 0.87 0.59 1.4 0.6h71.1a38.94 38.94 0 0 0 27.5-11.4 38.958 38.958 0 0 0 11.4-27.5v-78c0.01-0.53 0.23-1.03 0.6-1.4 0.37-0.37 0.87-0.59 1.4-0.6h28.5c27.6 0 49.5-22.7 49.5-50.4s-23.2-48.7-50.3-48.7Z" style="stroke:currentcolor;stroke-linecap:round;stroke-linejoin:round;stroke-width:32;fill: currentColor;"></path></svg>`;
}
