import { STORAGE_KEYS } from "../constants";

export interface UserSettingsInitializationOptions {
    checkUpdatesOnStartupDefault: boolean;
}

/**
 * Initialize settings that must exist before the rest of the preload starts.
 * Existing values are intentionally left untouched, including empty strings,
 * so this function never overwrites a user's persisted choices.
 */
export function initializeUserSettings({
    checkUpdatesOnStartupDefault,
}: UserSettingsInitializationOptions): void {
    const defaults: ReadonlyArray<readonly [string, string]> = [
        [STORAGE_KEYS.ENABLED_PLUGINS, "[]"],
        [STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP, String(checkUpdatesOnStartupDefault)],
        [STORAGE_KEYS.DISCORD_RPC, "false"],
    ];

    for (const [key, defaultValue] of defaults) {
        if (localStorage.getItem(key) === null) {
            localStorage.setItem(key, defaultValue);
        }
    }
}
