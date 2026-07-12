import { beforeEach, describe, expect, it } from "vitest";
import { STORAGE_KEYS } from "../constants";
import { initializeUserSettings } from "./UserSettings";

function createMemoryStorage(): Storage {
    const values = new Map<string, string>();

    return {
        get length() {
            return values.size;
        },
        clear: () => values.clear(),
        getItem: (key: string) => values.get(key) ?? null,
        key: (index: number) => Array.from(values.keys())[index] ?? null,
        removeItem: (key: string) => {
            values.delete(key);
        },
        setItem: (key: string, value: string) => {
            values.set(key, String(value));
        },
    };
}

describe("initializeUserSettings", () => {
    beforeEach(() => {
        Object.defineProperty(globalThis, "localStorage", {
            configurable: true,
            value: createMemoryStorage(),
        });
    });

    it("initializes every missing setting with desktop defaults", () => {
        initializeUserSettings({ checkUpdatesOnStartupDefault: true });

        expect(localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS)).toBe("[]");
        expect(localStorage.getItem(STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP)).toBe("true");
        expect(localStorage.getItem(STORAGE_KEYS.DISCORD_RPC)).toBe("false");
    });

    it("supports a disabled update-check default", () => {
        initializeUserSettings({ checkUpdatesOnStartupDefault: false });

        expect(localStorage.getItem(STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP)).toBe("false");
    });

    it("preserves all existing values, including an empty string", () => {
        localStorage.setItem(STORAGE_KEYS.ENABLED_PLUGINS, '["kept.plugin.js"]');
        localStorage.setItem(STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP, "false");
        localStorage.setItem(STORAGE_KEYS.DISCORD_RPC, "");

        initializeUserSettings({ checkUpdatesOnStartupDefault: true });

        expect(localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS))
            .toBe('["kept.plugin.js"]');
        expect(localStorage.getItem(STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP)).toBe("false");
        expect(localStorage.getItem(STORAGE_KEYS.DISCORD_RPC)).toBe("");
    });
});
