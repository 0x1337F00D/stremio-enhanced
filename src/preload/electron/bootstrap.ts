import DiscordPresence from "../../core/DiscordPresence";
import ModManager from "../../core/ModManager";
import { initializeUserSettings } from "../../core/UserSettings";
import { STORAGE_KEYS } from "../../constants";
import { PlatformManager } from "../../platform/PlatformManager";
import { createEnhancedSettingsController } from "../shared/enhancedSettings";
import { checkPlaybackSubtitles } from "./playbackSubtitles";
import {
    addDesktopSettingsControls,
    initializeDesktopUpdates,
    renderDesktopAbout,
    renderDesktopUpdateState,
} from "./preferences";
import { scheduleStreamingServerReload } from "./streamingServer";
import { applyElectronTheme } from "./theme";
import { installWindowChrome } from "./windowChrome";
import { getLogger } from "../../utils/logger";
import updateClient from "./updateClient";

const settingsController = createEnhancedSettingsController({
    addPlatformControls: addDesktopSettingsControls,
    renderAbout: renderDesktopAbout,
});

let initialized = false;
const logger = getLogger("ElectronPreload");

async function syncRouteFeatures(): Promise<void> {
    const results = await Promise.allSettled([
        settingsController.check(),
        checkPlaybackSubtitles(),
    ]);
    for (const result of results) {
        if (result.status === "rejected") {
            logger.error(`Failed to sync route feature: ${result.reason}`);
        }
    }
}

export async function initializeElectronPreload(): Promise<void> {
    if (initialized) return;
    initialized = true;

    await PlatformManager.current.init();
    initializeUserSettings({ checkUpdatesOnStartupDefault: true });
    scheduleStreamingServerReload();
    await initializeDesktopUpdates();

    if (localStorage.getItem(STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP) === "true") {
        try {
            renderDesktopUpdateState(await updateClient.checkForUpdates());
        } catch (error) {
            logger.error(`Startup update check failed: ${error}`);
        }
    }

    if (localStorage.getItem(STORAGE_KEYS.DISCORD_RPC) === "true") {
        DiscordPresence.start();
        await DiscordPresence.discordRPCHandler();
    }

    await applyElectronTheme();
    await ModManager.loadEnabledPlugins();
    await installWindowChrome();

    window.addEventListener("hashchange", () => {
        void syncRouteFeatures();
    });
    await syncRouteFeatures();
}
