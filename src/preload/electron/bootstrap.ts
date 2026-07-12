import DiscordPresence from "../../core/DiscordPresence";
import ModManager from "../../core/ModManager";
import { initializeUserSettings } from "../../core/UserSettings";
import { STORAGE_KEYS } from "../../constants";
import { PlatformManager } from "../../platform/PlatformManager";
import { createEnhancedSettingsController } from "../shared/enhancedSettings";
import { checkPlaybackSubtitles } from "./playbackSubtitles";
import { launchNativePlayerForCurrentRoute } from "./nativePlayerPlayback";
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
let routeSyncGeneration = 0;
const logger = getLogger("ElectronPreload");

async function syncRouteFeatures(): Promise<void> {
    const generation = ++routeSyncGeneration;
    const route = location.href;
    let nativeLaunchSucceeded = false;
    try {
        nativeLaunchSucceeded = await launchNativePlayerForCurrentRoute();
    } catch (error) {
        logger.error(`Failed to synchronize native playback: ${error}`);
    }
    if (generation !== routeSyncGeneration || location.href !== route) return;

    const routeFeatures: Array<Promise<void>> = [settingsController.check()];
    if (!nativeLaunchSucceeded) routeFeatures.push(checkPlaybackSubtitles());

    const results = await Promise.allSettled(routeFeatures);
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
