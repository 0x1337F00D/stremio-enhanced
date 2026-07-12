import {
    PluginOptionDefinition,
    PluginOptionValue,
    PluginOptionValues,
    SelectPluginOptionChoice,
} from "../interfaces/PluginOption";

const OPTION_ID_PATTERN = /^[A-Za-z][A-Za-z0-9_-]{0,63}$/;
const MAX_LABEL_LENGTH = 120;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_TEXT_LENGTH = 10_000;
const MAX_CHOICES = 64;

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBoundedString(value: unknown, minLength: number, maxLength: number): value is string {
    return typeof value === "string" && value.length >= minLength && value.length <= maxLength;
}

function getBaseFields(value: Record<string, unknown>) {
    if (!OPTION_ID_PATTERN.test(String(value.id ?? ""))) return null;
    if (!isBoundedString(value.label, 1, MAX_LABEL_LENGTH)) return null;
    if (
        value.description !== undefined &&
        !isBoundedString(value.description, 1, MAX_DESCRIPTION_LENGTH)
    ) {
        return null;
    }

    return {
        id: String(value.id),
        label: value.label,
        ...(value.description === undefined ? {} : { description: value.description }),
    };
}

export function validatePluginOptionDefinition(value: unknown): PluginOptionDefinition | null {
    if (!isRecord(value)) return null;

    const base = getBaseFields(value);
    if (!base) return null;

    switch (value.type) {
        case "boolean":
            if (typeof value.default !== "boolean") return null;
            return { ...base, type: "boolean", default: value.default };

        case "text": {
            if (typeof value.default !== "string") return null;
            if (
                value.placeholder !== undefined &&
                !isBoundedString(value.placeholder, 0, 200)
            ) {
                return null;
            }
            if (
                value.maxLength !== undefined &&
                (
                    typeof value.maxLength !== "number" ||
                    !Number.isInteger(value.maxLength) ||
                    value.maxLength < 1 ||
                    value.maxLength > MAX_TEXT_LENGTH
                )
            ) {
                return null;
            }
            const maxLength = typeof value.maxLength === "number" ? value.maxLength : MAX_TEXT_LENGTH;
            if (value.default.length > maxLength) return null;

            return {
                ...base,
                type: "text",
                default: value.default,
                ...(value.placeholder === undefined ? {} : { placeholder: value.placeholder as string }),
                ...(value.maxLength === undefined ? {} : { maxLength: value.maxLength as number }),
            };
        }

        case "number": {
            if (typeof value.default !== "number" || !Number.isFinite(value.default)) return null;
            const numericKeys = ["min", "max", "step"] as const;
            for (const key of numericKeys) {
                if (value[key] !== undefined && (typeof value[key] !== "number" || !Number.isFinite(value[key]))) {
                    return null;
                }
            }
            const min = value.min as number | undefined;
            const max = value.max as number | undefined;
            const step = value.step as number | undefined;
            if (min !== undefined && max !== undefined && min > max) return null;
            if (step !== undefined && step <= 0) return null;
            if (min !== undefined && value.default < min) return null;
            if (max !== undefined && value.default > max) return null;

            return {
                ...base,
                type: "number",
                default: value.default,
                ...(min === undefined ? {} : { min }),
                ...(max === undefined ? {} : { max }),
                ...(step === undefined ? {} : { step }),
            };
        }

        case "select": {
            if (typeof value.default !== "string") return null;
            if (!Array.isArray(value.choices) || value.choices.length < 1 || value.choices.length > MAX_CHOICES) {
                return null;
            }

            const choices: SelectPluginOptionChoice[] = [];
            const seenValues = new Set<string>();
            for (const rawChoice of value.choices) {
                if (!isRecord(rawChoice)) return null;
                if (!isBoundedString(rawChoice.value, 1, 128)) return null;
                if (!isBoundedString(rawChoice.label, 1, MAX_LABEL_LENGTH)) return null;
                if (seenValues.has(rawChoice.value)) return null;
                seenValues.add(rawChoice.value);
                choices.push({ value: rawChoice.value, label: rawChoice.label });
            }
            if (!seenValues.has(value.default)) return null;

            return { ...base, type: "select", default: value.default, choices };
        }

        default:
            return null;
    }
}

export function normalizePluginOptionValue(
    definition: PluginOptionDefinition,
    value: unknown
): PluginOptionValue | undefined {
    switch (definition.type) {
        case "boolean":
            return typeof value === "boolean" ? value : undefined;

        case "text": {
            if (typeof value !== "string") return undefined;
            const maxLength = definition.maxLength ?? MAX_TEXT_LENGTH;
            return value.length <= maxLength ? value : undefined;
        }

        case "number":
            if (typeof value !== "number" || !Number.isFinite(value)) return undefined;
            if (definition.min !== undefined && value < definition.min) return undefined;
            if (definition.max !== undefined && value > definition.max) return undefined;
            return value;

        case "select":
            return typeof value === "string" && definition.choices.some(choice => choice.value === value)
                ? value
                : undefined;
    }
}

export function getPluginOptionDefaults(definitions: PluginOptionDefinition[]): PluginOptionValues {
    return Object.fromEntries(definitions.map(definition => [definition.id, definition.default]));
}
