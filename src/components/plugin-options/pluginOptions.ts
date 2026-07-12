import PluginOptions from "../../core/PluginOptions";
import {
    PluginOptionDefinition,
    PluginOptionValues,
} from "../../interfaces/PluginOption";

const STYLE_ID = "stremio-enhanced-plugin-options-style";
let nextPanelId = 0;

function ensureStyles(): void {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
        .se-plugin-options-button,
        .se-plugin-options-action {
            border: 0;
            border-radius: .35rem;
            cursor: pointer;
            padding: .55rem .85rem;
            color: white;
            background: var(--secondary-accent-color, #5b4bd8);
        }
        .se-plugin-options-panel {
            margin: -.5rem 0 1rem;
            padding: 1rem;
            border-radius: .5rem;
            color: white;
            background: var(--secondary-background-color, rgba(20, 20, 28, .96));
        }
        .se-plugin-options-panel[hidden] { display: none; }
        .se-plugin-options-field { display: grid; gap: .35rem; margin-bottom: .9rem; }
        .se-plugin-options-field input:not([type="checkbox"]),
        .se-plugin-options-field select {
            box-sizing: border-box;
            width: 100%;
            padding: .55rem;
            color: inherit;
            background: var(--primary-background-color, #17171f);
            border: 1px solid rgba(255, 255, 255, .25);
            border-radius: .35rem;
        }
        .se-plugin-options-description { opacity: .75; font-size: .9em; }
        .se-plugin-options-actions { display: flex; gap: .6rem; flex-wrap: wrap; }
        .se-plugin-options-action[data-kind="cancel"] { background: transparent; border: 1px solid rgba(255,255,255,.35); }
    `;
    document.head.appendChild(style);
}

function createOptionInput(
    definition: PluginOptionDefinition,
    inputId: string
): HTMLInputElement | HTMLSelectElement {
    if (definition.type === "select") {
        const select = document.createElement("select");
        select.id = inputId;
        for (const choice of definition.choices) {
            const option = document.createElement("option");
            option.value = choice.value;
            option.textContent = choice.label;
            select.appendChild(option);
        }
        return select;
    }

    const input = document.createElement("input");
    input.id = inputId;
    input.type = definition.type === "boolean" ? "checkbox" : definition.type;

    if (definition.type === "text") {
        if (definition.placeholder !== undefined) input.placeholder = definition.placeholder;
        if (definition.maxLength !== undefined) input.maxLength = definition.maxLength;
    } else if (definition.type === "number") {
        if (definition.min !== undefined) input.min = String(definition.min);
        if (definition.max !== undefined) input.max = String(definition.max);
        if (definition.step !== undefined) input.step = String(definition.step);
    }

    return input;
}

function setInputValue(
    input: HTMLInputElement | HTMLSelectElement,
    definition: PluginOptionDefinition,
    value: boolean | string | number
): void {
    if (definition.type === "boolean" && input instanceof HTMLInputElement) {
        input.checked = value === true;
    } else {
        input.value = String(value);
    }
}

function readInputValue(
    input: HTMLInputElement | HTMLSelectElement,
    definition: PluginOptionDefinition
): boolean | string | number {
    if (definition.type === "boolean" && input instanceof HTMLInputElement) {
        return input.checked;
    }
    if (definition.type === "number" && input instanceof HTMLInputElement) {
        return Number.isFinite(input.valueAsNumber) ? input.valueAsNumber : definition.default;
    }
    return input.value;
}

export interface MountPluginOptionsParams {
    container: HTMLElement;
    actionContainer: HTMLElement;
    pluginFile: string;
    definitions: PluginOptionDefinition[];
    isEnabled: () => boolean;
    reload?: () => void;
}

export function mountPluginOptions({
    container,
    actionContainer,
    pluginFile,
    definitions,
    isEnabled,
    reload = () => window.location.reload(),
}: MountPluginOptionsParams): void {
    if (definitions.length === 0) return;
    if (container.querySelector("[data-stremio-enhanced-plugin-options]")) return;

    ensureStyles();

    nextPanelId += 1;
    const panelId = `se-plugin-options-${nextPanelId}`;
    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "se-plugin-options-button";
    toggleButton.textContent = "Options";
    toggleButton.setAttribute("aria-controls", panelId);
    toggleButton.setAttribute("aria-expanded", "false");
    actionContainer.appendChild(toggleButton);

    const panel = document.createElement("section");
    panel.id = panelId;
    panel.className = "se-plugin-options-panel";
    panel.dataset.stremioEnhancedPluginOptions = pluginFile;
    panel.hidden = true;

    const controls = new Map<string, HTMLInputElement | HTMLSelectElement>();
    for (const definition of definitions) {
        const field = document.createElement("div");
        field.className = "se-plugin-options-field";

        const inputId = `${panelId}-${definition.id}`;
        const label = document.createElement("label");
        label.htmlFor = inputId;
        label.textContent = definition.label;

        const input = createOptionInput(definition, inputId);
        controls.set(definition.id, input);

        field.appendChild(label);
        if (definition.description) {
            const description = document.createElement("div");
            description.className = "se-plugin-options-description";
            description.textContent = definition.description;
            field.appendChild(description);
        }
        field.appendChild(input);
        panel.appendChild(field);
    }

    const actions = document.createElement("div");
    actions.className = "se-plugin-options-actions";

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "se-plugin-options-action";
    saveButton.textContent = "Save";

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "se-plugin-options-action";
    resetButton.textContent = "Reset to defaults";

    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.className = "se-plugin-options-action";
    cancelButton.dataset.kind = "cancel";
    cancelButton.textContent = "Cancel";

    actions.append(saveButton, resetButton, cancelButton);
    panel.appendChild(actions);
    container.appendChild(panel);

    const renderValues = (values: PluginOptionValues): void => {
        for (const definition of definitions) {
            const input = controls.get(definition.id);
            if (!input) continue;
            setInputValue(input, definition, values[definition.id] ?? definition.default);
        }
    };

    const closePanel = (): void => {
        panel.hidden = true;
        toggleButton.setAttribute("aria-expanded", "false");
    };

    toggleButton.addEventListener("click", event => {
        event.stopPropagation();
        panel.hidden = !panel.hidden;
        toggleButton.setAttribute("aria-expanded", String(!panel.hidden));
        if (!panel.hidden) renderValues(PluginOptions.get(pluginFile));
    });

    cancelButton.addEventListener("click", closePanel);

    saveButton.addEventListener("click", () => {
        const candidateValues: PluginOptionValues = {};
        for (const definition of definitions) {
            const input = controls.get(definition.id);
            if (input) candidateValues[definition.id] = readInputValue(input, definition);
        }

        PluginOptions.save(pluginFile, candidateValues);
        closePanel();
        if (isEnabled()) reload();
    });

    resetButton.addEventListener("click", () => {
        renderValues(PluginOptions.reset(pluginFile));
        if (isEnabled()) reload();
    });
}
