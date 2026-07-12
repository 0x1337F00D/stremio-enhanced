import { PlatformManager } from "../platform/PlatformManager";
import { CapacitorPlatform } from "../platform/CapacitorPlatform";
import Settings from "../core/Settings";
import properties from "../core/Properties";
import ModManager from "../core/ModManager";
import Helpers from "../utils/Helpers";
import { getAboutCategoryTemplate } from "../components/about-category/aboutCategory";
import logger from "../utils/logger";
import { join } from "path";
import {
    SELECTORS,
    FILE_EXTENSIONS,
    TIMEOUTS,
} from "../constants";
import { NodeJS } from 'capacitor-nodejs';
import LogManager from "../core/LogManager";
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { createStremioEnhancedApi } from "../core/StremioEnhancedApi";
import { initializeUserSettings } from "../core/UserSettings";
import { createEnhancedSettingsController } from "../preload/shared/enhancedSettings";
import { applyAndroidTheme } from "../preload/android/theme";
import { isSafeModFileName } from "../utils/modFileName";

// Initialize platform for Capacitor
PlatformManager.setPlatform(new CapacitorPlatform());

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
    await PlatformManager.current.init();
    void ensureBundledStreamingServerReady();

    installFullscreenHider();
    observeSettingsUi();
    observePlayerUi();

    window.stremioEnhanced = createStremioEnhancedApi(applyAndroidTheme);

    initializeUserSettings({ checkUpdatesOnStartupDefault: false });

    // Apply enabled theme
    await applyAndroidTheme();

    // Load enabled plugins
    await ModManager.loadEnabledPlugins();

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

function addAndroidSettingsControls(): void {
    Settings.addButton("Import Theme", "importThemeBtn", SELECTORS.THEMES_CATEGORY);
    Settings.addButton("Manage Themes Folder", "openthemesfolderBtn", SELECTORS.THEMES_CATEGORY);
    Settings.addButton("Import Plugin", "importPluginBtn", SELECTORS.PLUGINS_CATEGORY);
    Settings.addButton("Manage Plugins Folder", "openpluginsfolderBtn", SELECTORS.PLUGINS_CATEGORY);

    setupImportButton("importThemeBtn", "theme");
    setupImportButton("importPluginBtn", "plugin");
    setupManagedFolderButton("openthemesfolderBtn", properties.themesPath);
    setupManagedFolderButton("openpluginsfolderBtn", properties.pluginsPath);
}

const settingsController = createEnhancedSettingsController({
    addPlatformControls: addAndroidSettingsControls,
    renderAbout: writeAbout,
});

async function checkSettings(): Promise<void> {
    await settingsController.check();
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
            if (location.href.includes(SETTINGS_ROUTE)) {
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

function setupImportButton(buttonId: string, type: "theme" | "plugin"): void {
    bindButtonClick(buttonId, () => importModFile(type), `${type} import button`);
}

function setupManagedFolderButton(buttonId: string, folderPath: string): void {
    bindButtonClick(buttonId, () => PlatformManager.current.openPath(folderPath), `folder button ${buttonId}`);
}

let isImporting = false;
function sanitizeImportedModFileName(fileName: string, type: "theme" | "plugin"): string | null {
    const normalized = fileName.trim().split(/[\\/]/).pop() || "";
    return isSafeModFileName(normalized, type) ? normalized : null;
}

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

        const safeFileName = sanitizeImportedModFileName(file.name, type);
        const expectedExtension = type === "theme" ? FILE_EXTENSIONS.THEME : FILE_EXTENSIONS.PLUGIN;
        if (!safeFileName) {
            await Helpers.showAlert(
                "warning",
                "Unsupported File",
                `Please choose a valid ${expectedExtension} file name.`,
                ["OK"]
            );
            return;
        }

        const content = await PlatformManager.current.readFile(filePath);
        const destinationDirectory = type === "theme" ? properties.themesPath : properties.pluginsPath;
        await PlatformManager.current.writeFile(join(destinationDirectory, safeFileName), content);

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
