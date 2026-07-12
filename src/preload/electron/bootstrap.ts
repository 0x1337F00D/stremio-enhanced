import DiscordPresence from "../../core/DiscordPresence";
import ModManager from "../../core/ModManager";
import Updater from "../../core/Updater";
import { initializeUserSettings } from "../../core/UserSettings";
import { STORAGE_KEYS } from "../../constants";
import { PlatformManager } from "../../platform/PlatformManager";
import { createEnhancedSettingsController } from "../shared/enhancedSettings";
import { checkPlaybackSubtitles } from "./playbackSubtitles";
import {
    addDesktopSettingsControls,
    renderDesktopAbout,
} from "./preferences";
import { scheduleStreamingServerReload } from "./streamingServer";
import { applyElectronTheme } from "./theme";
import { installWindowChrome } from "./windowChrome";
import { getLogger } from "../../utils/logger";

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

    if (localStorage.getItem(STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP) === "true") {
        await Updater.checkForUpdates(false);
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
