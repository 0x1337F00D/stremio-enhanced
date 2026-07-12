import { beforeEach, describe, expect, it, vi } from "vitest";
import { STORAGE_KEYS } from "../constants";
import { PluginOptionDefinition } from "../interfaces/PluginOption";
import PluginOptions from "./PluginOptions";

const loggerMocks = vi.hoisted(() => ({
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
}));

vi.mock("../utils/logger", () => ({ getLogger: () => loggerMocks }));

function createMemoryStorage(): Storage {
    const values = new Map<string, string>();
    return {
        get length() { return values.size; },
        clear: () => values.clear(),
        getItem: key => values.get(key) ?? null,
        key: index => Array.from(values.keys())[index] ?? null,
        removeItem: key => { values.delete(key); },
        setItem: (key, value) => { values.set(key, String(value)); },
    };
}

const definitions: PluginOptionDefinition[] = [
    { id: "enabled", type: "boolean", label: "Enabled", default: true },
    { id: "label", type: "text", label: "Label", default: "Default", maxLength: 20 },
    { id: "scale", type: "number", label: "Scale", default: 2, min: 1, max: 4 },
    {
        id: "mode",
        type: "select",
        label: "Mode",
        default: "a",
        choices: [
            { value: "a", label: "Mode A" },
            { value: "b", label: "Mode B" },
        ],
    },
];

describe("PluginOptions", () => {
    const pluginFile = "configurable.plugin.js";
    const storageKey = `${STORAGE_KEYS.PLUGIN_OPTIONS_PREFIX}${pluginFile}`;
    let storage: Storage;

    beforeEach(() => {
        vi.clearAllMocks();
        storage = createMemoryStorage();
        Object.defineProperty(globalThis, "localStorage", {
            configurable: true,
            value: storage,
        });
        PluginOptions.register(pluginFile, definitions);
    });

    it("returns schema defaults when nothing was saved", () => {
        expect(PluginOptions.get(pluginFile)).toEqual({
            enabled: true,
            label: "Default",
            scale: 2,
            mode: "a",
        });
    });

    it("persists validated overrides and merges them over defaults", () => {
        PluginOptions.save(pluginFile, {
            enabled: false,
            label: "Custom",
            scale: 3,
            mode: "b",
        });

        expect(JSON.parse(storage.getItem(storageKey) ?? "{}"))
            .toEqual({ enabled: false, label: "Custom", scale: 3, mode: "b" });
        expect(PluginOptions.get(pluginFile)).toEqual({
            enabled: false,
            label: "Custom",
            scale: 3,
            mode: "b",
        });
    });

    it("ignores corrupt, unknown, and invalid persisted values", () => {
        storage.setItem(storageKey, JSON.stringify({
            enabled: "yes",
            label: "x".repeat(50),
            scale: 99,
            mode: "missing",
            unknown: true,
        }));

        expect(PluginOptions.get(pluginFile)).toEqual({
            enabled: true,
            label: "Default",
            scale: 2,
            mode: "a",
        });

        storage.setItem(storageKey, "not-json");
        expect(PluginOptions.get(pluginFile).enabled).toBe(true);
        expect(loggerMocks.warn).toHaveBeenCalled();
    });

    it("revalidates stored values when a plugin changes its schema", () => {
        storage.setItem(storageKey, JSON.stringify({ mode: "b", scale: 4 }));
        PluginOptions.register(pluginFile, [
            {
                id: "mode",
                type: "select",
                label: "Mode",
                default: "c",
                choices: [{ value: "c", label: "Mode C" }],
            },
        ]);

        expect(PluginOptions.get(pluginFile)).toEqual({ mode: "c" });
    });

    it("resets values and removes them when a plugin is uninstalled", () => {
        PluginOptions.save(pluginFile, { enabled: false });
        expect(storage.getItem(storageKey)).not.toBeNull();

        expect(PluginOptions.reset(pluginFile).enabled).toBe(true);
        expect(storage.getItem(storageKey)).toBeNull();

        PluginOptions.remove(pluginFile);
        expect(PluginOptions.hasOptions(pluginFile)).toBe(false);
    });

    it("refuses unsafe plugin filenames", () => {
        expect(PluginOptions.register("../unsafe.plugin.js", definitions)).toBe(false);
        expect(PluginOptions.get("../unsafe.plugin.js")).toEqual({});
    });
});
