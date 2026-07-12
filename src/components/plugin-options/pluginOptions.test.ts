// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import PluginOptions from "../../core/PluginOptions";
import { PluginOptionDefinition } from "../../interfaces/PluginOption";
import { mountPluginOptions } from "./pluginOptions";

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
    { id: "label", type: "text", label: "Label", default: "Demo", maxLength: 20 },
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

describe("mountPluginOptions", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
        Object.defineProperty(globalThis, "localStorage", {
            configurable: true,
            value: createMemoryStorage(),
        });
        PluginOptions.register("configurable.plugin.js", definitions);
    });

    it("renders typed controls and saves values without reloading a disabled plugin", () => {
        const container = document.createElement("div");
        const actions = document.createElement("div");
        container.appendChild(actions);
        document.body.appendChild(container);
        const reload = vi.fn();

        mountPluginOptions({
            container,
            actionContainer: actions,
            pluginFile: "configurable.plugin.js",
            definitions,
            isEnabled: () => false,
            reload,
        });

        actions.querySelector<HTMLButtonElement>(".se-plugin-options-button")?.click();
        const inputs = container.querySelectorAll<HTMLInputElement>("input");
        const select = container.querySelector<HTMLSelectElement>("select");
        expect(inputs).toHaveLength(3);
        expect(select?.options).toHaveLength(2);

        inputs[0].checked = false;
        inputs[1].value = "Custom";
        inputs[2].value = "3";
        if (select) select.value = "b";

        Array.from(container.querySelectorAll<HTMLButtonElement>("button"))
            .find(button => button.textContent === "Save")
            ?.click();

        expect(PluginOptions.get("configurable.plugin.js")).toEqual({
            enabled: false,
            label: "Custom",
            scale: 3,
            mode: "b",
        });
        expect(reload).not.toHaveBeenCalled();
    });

    it("reloads after saving options for an enabled plugin", () => {
        const container = document.createElement("div");
        const actions = document.createElement("div");
        container.appendChild(actions);
        const reload = vi.fn();

        mountPluginOptions({
            container,
            actionContainer: actions,
            pluginFile: "configurable.plugin.js",
            definitions,
            isEnabled: () => true,
            reload,
        });

        Array.from(container.querySelectorAll<HTMLButtonElement>("button"))
            .find(button => button.textContent === "Save")
            ?.click();

        expect(reload).toHaveBeenCalledOnce();
    });

    it("uses unique accessible panel IDs for filenames with the same sanitized form", () => {
        const firstContainer = document.createElement("div");
        const firstActions = document.createElement("div");
        firstContainer.appendChild(firstActions);
        const secondContainer = document.createElement("div");
        const secondActions = document.createElement("div");
        secondContainer.appendChild(secondActions);

        PluginOptions.register("a.b.plugin.js", definitions);
        PluginOptions.register("a-b.plugin.js", definitions);
        mountPluginOptions({
            container: firstContainer,
            actionContainer: firstActions,
            pluginFile: "a.b.plugin.js",
            definitions,
            isEnabled: () => false,
        });
        mountPluginOptions({
            container: secondContainer,
            actionContainer: secondActions,
            pluginFile: "a-b.plugin.js",
            definitions,
            isEnabled: () => false,
        });

        const firstId = firstActions.querySelector("button")?.getAttribute("aria-controls");
        const secondId = secondActions.querySelector("button")?.getAttribute("aria-controls");
        expect(firstId).toBeTruthy();
        expect(secondId).toBeTruthy();
        expect(firstId).not.toBe(secondId);
        expect(firstContainer.querySelector(`#${firstId}`)).not.toBeNull();
        expect(secondContainer.querySelector(`#${secondId}`)).not.toBeNull();
    });
});
