import { ipcRenderer } from "electron";
import { getAboutCategoryTemplate } from "../../components/about-category/aboutCategory";
import { CLASSES, IPC_CHANNELS, SELECTORS, STORAGE_KEYS } from "../../constants";
import DiscordPresence from "../../core/DiscordPresence";
import ModManager from "../../core/ModManager";
import Settings from "../../core/Settings";
import type { UpdateState } from "../../interfaces/UpdateState";
import Helpers from "../../utils/Helpers";
import { getLogger } from "../../utils/logger";
import { createUpdateModal } from "../../components/update-modal/updateModal";
import updateClient from "./updateClient";
import { getTransparencyStatus } from "./windowChrome";

const logger = getLogger("DesktopPreferences");
const promptedDownloadVersions = new Set<string>();
let latestUpdateState: UpdateState | null = null;
let unsubscribeUpdateState: (() => void) | null = null;

function getUpdateStatusText(state: UpdateState): string {
    switch (state.status) {
        case "idle":
            return "";
        case "unsupported":
            return state.message || "Automatic updates are available in packaged builds only.";
        case "checking":
            return "Checking for updates…";
        case "available":
            return state.availableVersion
                ? `Update v${state.availableVersion} is available. Preparing download…`
                : "An update is available. Preparing download…";
        case "downloading": {
            const percent = state.progress
                ? Math.max(0, Math.min(100, state.progress.percent))
                : 0;
            const version = state.availableVersion ? ` v${state.availableVersion}` : "";
            return `Downloading update${version}: ${percent.toFixed(0)}%`;
        }
        case "downloaded":
            return state.availableVersion
                ? `Update v${state.availableVersion} is ready to install.`
                : "The update is ready to install.";
        case "not-available":
            return `Stremio Enhanced v${state.currentVersion} is up to date.`;
        case "error":
            return state.message || "The update check failed.";
    }
}

function ensureUpdateStatusElements(): {
    status: HTMLElement | null;
    progress: HTMLProgressElement | null;
} {
    const button = document.getElementById("checkforupdatesBtn");
    if (!button?.parentElement) return { status: null, progress: null };

    let status = document.getElementById("stremio-enhanced-update-status");
    if (!status) {
        status = document.createElement("div");
        status.id = "stremio-enhanced-update-status";
        status.setAttribute("role", "status");
        status.setAttribute("aria-live", "polite");
        status.style.marginTop = "0.5rem";
        button.parentElement.appendChild(status);
    }

    let progress = document.getElementById(
        "stremio-enhanced-update-progress"
    ) as HTMLProgressElement | null;
    if (!progress) {
        progress = document.createElement("progress");
        progress.id = "stremio-enhanced-update-progress";
        progress.max = 100;
        progress.setAttribute("aria-label", "Update download progress");
        progress.style.width = "100%";
        progress.hidden = true;
        button.parentElement.appendChild(progress);
    }

    return { status, progress };
}

function showDownloadedUpdate(state: UpdateState): void {
    if (state.status !== "downloaded" || !state.availableVersion) {
        document.getElementById("updateModalContainer")?.remove();
        return;
    }

    const availableVersion = state.availableVersion;
    if (promptedDownloadVersions.has(availableVersion)) return;
    if (document.getElementById("updateModalContainer")) return;

    const modal = createUpdateModal({
        currentVersion: state.currentVersion,
        version: availableVersion,
        releaseName: state.releaseName,
        releaseNotes: state.releaseNotes,
        onRestartNow: () => updateClient.quitAndInstall(),
        onLater: () => {
            promptedDownloadVersions.add(availableVersion);
        },
    });
    const modalHost = document.querySelector(".modals-container") ?? document.body;
    modalHost.appendChild(modal);
}

export function renderDesktopUpdateState(state: UpdateState): void {
    latestUpdateState = state;

    const { status, progress } = ensureUpdateStatusElements();
    if (status) status.textContent = getUpdateStatusText(state);

    if (progress) {
        progress.hidden = state.status !== "downloading" || state.progress === null;
        if (state.status === "downloading" && state.progress) {
            progress.value = Math.max(0, Math.min(100, state.progress.percent));
        } else {
            progress.removeAttribute("value");
        }
    }

    showDownloadedUpdate(state);
}

export async function initializeDesktopUpdates(): Promise<UpdateState | null> {
    if (!unsubscribeUpdateState) {
        unsubscribeUpdateState = updateClient.onStateChanged(renderDesktopUpdateState);
    }

    try {
        const state = await updateClient.getState();
        renderDesktopUpdateState(state);
        return state;
    } catch (error) {
        logger.error(`Failed to initialize update state: ${error}`);
        return null;
    }
}

function bindWhenReady(
    selector: string,
    bindingKey: string,
    bind: (element: HTMLElement) => void
): void {
    Helpers.waitForElm(selector).then(() => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element || element.dataset[bindingKey] === "true") return;
        element.dataset[bindingKey] = "true";
        bind(element);
    }).catch(error => logger.error(`Failed to bind ${selector}: ${error}`));
}

function setupCheckUpdatesButton(): void {
    bindWhenReady("#checkforupdatesBtn", "stremioEnhancedUpdateBound", button => {
        button.addEventListener("click", async () => {
            if (button.getAttribute("aria-busy") === "true") return;
            if (
                latestUpdateState?.status === "checking" ||
                latestUpdateState?.status === "available" ||
                latestUpdateState?.status === "downloading" ||
                latestUpdateState?.status === "downloaded"
            ) {
                return;
            }
            button.setAttribute("aria-busy", "true");
            button.style.pointerEvents = "none";
            try {
                renderDesktopUpdateState(await updateClient.checkForUpdates());
            } catch (error) {
                logger.error(`Failed to check for updates: ${error}`);
                const { status } = ensureUpdateStatusElements();
                if (status) status.textContent = "The update check failed.";
            } finally {
                button.removeAttribute("aria-busy");
                button.style.pointerEvents = "";
            }
        });
    });
}

function setupCheckUpdatesOnStartupToggle(): void {
    bindWhenReady(
        "#checkForUpdatesOnStartup",
        "stremioEnhancedUpdatePreferenceBound",
        toggle => {
            toggle.addEventListener("click", () => {
                toggle.classList.toggle(CLASSES.CHECKED);
                const enabled = toggle.classList.contains(CLASSES.CHECKED);
                localStorage.setItem(
                    STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP,
                    String(enabled)
                );
            });
        }
    );
}

function setupDiscordToggle(): void {
    bindWhenReady("#discordrichpresence", "stremioEnhancedDiscordBound", toggle => {
        toggle.addEventListener("click", async () => {
            toggle.classList.toggle(CLASSES.CHECKED);
            const enabled = toggle.classList.contains(CLASSES.CHECKED);
            localStorage.setItem(STORAGE_KEYS.DISCORD_RPC, String(enabled));

            if (enabled) {
                DiscordPresence.start();
                await DiscordPresence.discordRPCHandler();
            } else {
                DiscordPresence.stop();
            }
        });
    });
}

function setupTransparencyToggle(): void {
    bindWhenReady(
        "#enableTransparentThemes",
        "stremioEnhancedTransparencyBound",
        toggle => {
            toggle.addEventListener("click", () => {
                toggle.classList.toggle(CLASSES.CHECKED);
                ipcRenderer.send(
                    IPC_CHANNELS.SET_TRANSPARENCY,
                    toggle.classList.contains(CLASSES.CHECKED)
                );
            });
        }
    );
}

export function addDesktopSettingsControls(): void {
    Settings.addButton("Open Themes Folder", "openthemesfolderBtn", SELECTORS.THEMES_CATEGORY);
    Settings.addButton("Open Plugins Folder", "openpluginsfolderBtn", SELECTORS.PLUGINS_CATEGORY);
    setupCheckUpdatesButton();
    setupCheckUpdatesOnStartupToggle();
    setupDiscordToggle();
    setupTransparencyToggle();
    ModManager.openThemesFolder();
    ModManager.openPluginsFolder();
}

export function renderDesktopAbout(): void {
    Helpers.waitForElm(SELECTORS.ABOUT_CATEGORY).then(async () => {
        const aboutCategory = document.querySelector(SELECTORS.ABOUT_CATEGORY);
        if (!aboutCategory || document.getElementById("stremio-enhanced-about-content")) {
            return;
        }

        const content = document.createElement("div");
        content.id = "stremio-enhanced-about-content";
        let updateState = latestUpdateState;
        if (!updateState) {
            try {
                updateState = await updateClient.getState();
                renderDesktopUpdateState(updateState);
            } catch (error) {
                logger.error(`Failed to read the current app version: ${error}`);
            }
        }
        content.innerHTML = getAboutCategoryTemplate(
            updateState?.currentVersion ?? "unknown",
            localStorage.getItem(STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP) === "true",
            localStorage.getItem(STORAGE_KEYS.DISCORD_RPC) === "true",
            await getTransparencyStatus()
        );
        aboutCategory.appendChild(content);
        if (latestUpdateState) renderDesktopUpdateState(latestUpdateState);
    }).catch(error => logger.error(`Failed to render About settings: ${error}`));
}
