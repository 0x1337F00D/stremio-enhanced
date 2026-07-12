import { ipcRenderer } from "electron";
import { getAboutCategoryTemplate } from "../../components/about-category/aboutCategory";
import { CLASSES, IPC_CHANNELS, SELECTORS, STORAGE_KEYS } from "../../constants";
import DiscordPresence from "../../core/DiscordPresence";
import ModManager from "../../core/ModManager";
import Settings from "../../core/Settings";
import type { UpdateState } from "../../interfaces/UpdateState";
import type {
    MpvPreferences,
    MpvStatus,
} from "../../interfaces/NativePlayer";
import Helpers from "../../utils/Helpers";
import { getLogger } from "../../utils/logger";
import { createUpdateModal } from "../../components/update-modal/updateModal";
import updateClient from "./updateClient";
import nativePlayerClient from "./nativePlayerClient";
import { getTransparencyStatus } from "./windowChrome";

const logger = getLogger("DesktopPreferences");
const promptedDownloadVersions = new Set<string>();
let latestUpdateState: UpdateState | null = null;
let latestMpvStatus: MpvStatus | null = null;
let unsubscribeUpdateState: (() => void) | null = null;
let mpvPreferenceMutationTail: Promise<void> = Promise.resolve();
let pendingMpvPreferenceMutations = 0;

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

function setMpvStatusText(message: string): void {
    const status = document.getElementById("stremio-enhanced-mpv-status");
    if (status) status.textContent = message;
}

function safeMpvVersion(value: unknown): string | null {
    return typeof value === "string" && /^[0-9][0-9A-Za-z.+-]{0,63}$/.test(value)
        ? value
        : null;
}

export function renderDesktopMpvStatus(status: MpvStatus): void {
    latestMpvStatus = status;
    synchronizeMpvControls(status);

    if (!status.available) {
        setMpvStatusText("MPV was not found. Choose its executable or install MPV.");
        return;
    }

    const version = safeMpvVersion(status.version);
    const source = status.source === "configured" ? "user-selected" : "auto-detected";
    setMpvStatusText(
        `${version ? `MPV ${version}` : "MPV"} is available (${source}).`
    );
}

function setMpvControlsVisibility(enabled: boolean): void {
    const mpvControls = document.getElementById("stremio-enhanced-mpv-controls");
    if (mpvControls) mpvControls.hidden = !enabled;
}

function setMpvUserConfigToggle(toggle: HTMLElement, enabled: boolean): void {
    toggle.classList.toggle(CLASSES.CHECKED, enabled);
    toggle.setAttribute("aria-checked", String(enabled));
}

function synchronizeMpvControls(status: MpvStatus): void {
    const select = document.getElementById("nativePlayerSelect");
    const userConfigToggle = document.getElementById("mpvUseUserConfig");
    if (select instanceof HTMLSelectElement) {
        select.value = status.preferences.enabled ? "mpv" : "disabled";
    }
    if (userConfigToggle) {
        setMpvUserConfigToggle(
            userConfigToggle,
            status.preferences.useUserConfiguration
        );
    }
    setMpvControlsVisibility(status.preferences.enabled);
}

function setMpvControlsSaving(saving: boolean): void {
    const container = document.getElementById("stremio-enhanced-native-player-controls");
    const select = document.getElementById("nativePlayerSelect");
    const userConfigToggle = document.getElementById("mpvUseUserConfig");
    const selectExecutable = document.getElementById("selectMpvExecutableBtn");
    const resetExecutable = document.getElementById("resetMpvExecutableBtn");

    if (container) container.setAttribute("aria-busy", String(saving));
    if (select instanceof HTMLSelectElement) {
        select.disabled = saving;
        select.setAttribute("aria-disabled", String(saving));
    }
    if (userConfigToggle) {
        userConfigToggle.setAttribute("aria-disabled", String(saving));
        userConfigToggle.setAttribute("tabindex", saving ? "-1" : "0");
    }
    for (const button of [selectExecutable, resetExecutable]) {
        if (button instanceof HTMLButtonElement) {
            const actionBusy =
                button.dataset.stremioEnhancedMpvActionBusy === "true";
            button.disabled = saving || actionBusy;
            button.setAttribute("aria-disabled", String(saving || actionBusy));
        }
    }
}

function currentMpvPreferences(): MpvPreferences {
    return latestMpvStatus?.preferences ?? {
        enabled: false,
        useUserConfiguration: false,
    };
}

async function refreshMpvStatus(): Promise<MpvStatus | null> {
    setMpvStatusText("Detecting MPV…");
    try {
        const status = await nativePlayerClient.getMpvStatus();
        renderDesktopMpvStatus(status);
        return status;
    } catch (error) {
        logger.error(`Failed to read MPV status: ${error}`);
        setMpvStatusText("MPV status could not be loaded.");
        return null;
    }
}

async function runMpvStatusAction(
    button: HTMLButtonElement,
    action: () => Promise<MpvStatus>
): Promise<void> {
    if (button.disabled || pendingMpvPreferenceMutations > 0) return;
    button.dataset.stremioEnhancedMpvActionBusy = "true";
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    try {
        renderDesktopMpvStatus(await action());
    } catch (error) {
        logger.error(`MPV configuration action failed: ${error}`);
        setMpvStatusText("MPV configuration could not be changed.");
    } finally {
        delete button.dataset.stremioEnhancedMpvActionBusy;
        button.disabled = pendingMpvPreferenceMutations > 0;
        button.setAttribute(
            "aria-disabled",
            String(pendingMpvPreferenceMutations > 0)
        );
        button.removeAttribute("aria-busy");
    }
}

function queueMpvPreferenceMutation(
    mutate: (preferences: MpvPreferences) => MpvPreferences
): void {
    pendingMpvPreferenceMutations += 1;
    setMpvControlsSaving(true);

    const operation = async (): Promise<void> => {
        const previousStatus = latestMpvStatus;
        const preferences = mutate(currentMpvPreferences());
        setMpvStatusText("Saving MPV preferences…");
        try {
            renderDesktopMpvStatus(
                await nativePlayerClient.setMpvPreferences(preferences)
            );
        } catch (error) {
            logger.error(`Failed to save MPV preferences: ${error}`);
            if (previousStatus) synchronizeMpvControls(previousStatus);
            setMpvStatusText("MPV preferences could not be saved.");
        }
    };

    const result = mpvPreferenceMutationTail.then(operation, operation);
    mpvPreferenceMutationTail = result.then(
        () => undefined,
        () => undefined
    );
    void result
        .finally(() => {
            pendingMpvPreferenceMutations -= 1;
            if (pendingMpvPreferenceMutations === 0) setMpvControlsSaving(false);
        })
        .catch(() => undefined);
}

export function setDesktopMpvEnabled(enabled: boolean): void {
    queueMpvPreferenceMutation(preferences => ({
        ...preferences,
        enabled,
    }));
}

export function toggleDesktopMpvUserConfiguration(): void {
    queueMpvPreferenceMutation(preferences => ({
        ...preferences,
        useUserConfiguration: !preferences.useUserConfiguration,
    }));
}

export async function setupNativePlayerControls(): Promise<void> {
    await Helpers.waitForElm("#nativePlayerSelect");

    const select = document.getElementById("nativePlayerSelect");
    const userConfigToggle = document.getElementById("mpvUseUserConfig");
    const selectExecutable = document.getElementById("selectMpvExecutableBtn");
    const resetExecutable = document.getElementById("resetMpvExecutableBtn");
    if (
        !(select instanceof HTMLSelectElement) ||
        !userConfigToggle ||
        !(selectExecutable instanceof HTMLButtonElement) ||
        !(resetExecutable instanceof HTMLButtonElement)
    ) {
        return;
    }
    if (select.dataset.stremioEnhancedNativePlayerBound === "true") return;
    select.dataset.stremioEnhancedNativePlayerBound = "true";

    select.addEventListener("change", event => {
        if (!event.isTrusted) {
            if (latestMpvStatus) synchronizeMpvControls(latestMpvStatus);
            return;
        }
        setDesktopMpvEnabled(select.value === "mpv");
    });

    const toggleUserConfiguration = (event: Event): void => {
        if (!event.isTrusted) {
            if (latestMpvStatus) synchronizeMpvControls(latestMpvStatus);
            return;
        }
        if (pendingMpvPreferenceMutations > 0) return;
        toggleDesktopMpvUserConfiguration();
    };
    userConfigToggle.addEventListener("click", toggleUserConfiguration);
    userConfigToggle.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        if (!event.isTrusted) return;
        event.preventDefault();
        toggleUserConfiguration(event);
    });

    selectExecutable.addEventListener("click", event => {
        if (!event.isTrusted) return;
        void runMpvStatusAction(
            selectExecutable,
            () => nativePlayerClient.selectMpvExecutable()
        );
    });
    resetExecutable.addEventListener("click", event => {
        if (!event.isTrusted) return;
        void runMpvStatusAction(
            resetExecutable,
            () => nativePlayerClient.resetMpvExecutable()
        );
    });

    await refreshMpvStatus();
}

export function addDesktopSettingsControls(): void {
    Settings.addButton("Open Themes Folder", "openthemesfolderBtn", SELECTORS.THEMES_CATEGORY);
    Settings.addButton("Open Plugins Folder", "openpluginsfolderBtn", SELECTORS.PLUGINS_CATEGORY);
    setupCheckUpdatesButton();
    setupCheckUpdatesOnStartupToggle();
    setupDiscordToggle();
    setupTransparencyToggle();
    void setupNativePlayerControls().catch(error => {
        logger.error(`Failed to initialize native player controls: ${error}`);
    });
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
        let mpvStatus = latestMpvStatus;
        try {
            mpvStatus = await nativePlayerClient.getMpvStatus();
            latestMpvStatus = mpvStatus;
        } catch (error) {
            logger.error(`Failed to read MPV preferences: ${error}`);
        }
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
            await getTransparencyStatus(),
            mpvStatus?.preferences.enabled ? "mpv" : "disabled",
            mpvStatus?.preferences.useUserConfiguration ?? false,
            true
        );
        aboutCategory.appendChild(content);
        if (mpvStatus) renderDesktopMpvStatus(mpvStatus);
        if (latestUpdateState) renderDesktopUpdateState(latestUpdateState);
    }).catch(error => logger.error(`Failed to render About settings: ${error}`));
}
