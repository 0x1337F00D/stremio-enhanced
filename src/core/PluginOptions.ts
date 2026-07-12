import { FILE_EXTENSIONS, STORAGE_KEYS } from "../constants";
import {
    PluginOptionDefinition,
    PluginOptionValues,
} from "../interfaces/PluginOption";
import {
    getPluginOptionDefaults,
    normalizePluginOptionValue,
} from "../utils/PluginOptionSchema";
import { getLogger } from "../utils/logger";

class PluginOptions {
    private static readonly logger = getLogger("PluginOptions");
    private static readonly schemas = new Map<string, PluginOptionDefinition[]>();

    private static isSafePluginFileName(pluginFile: string): boolean {
        return (
            /^[A-Za-z0-9._-]+$/.test(pluginFile) &&
            pluginFile.endsWith(FILE_EXTENSIONS.PLUGIN)
        );
    }

    private static getStorageKey(pluginFile: string): string {
        return `${STORAGE_KEYS.PLUGIN_OPTIONS_PREFIX}${pluginFile}`;
    }

    private static cloneDefinitions(definitions: PluginOptionDefinition[]): PluginOptionDefinition[] {
        return definitions.map(definition => (
            definition.type === "select"
                ? { ...definition, choices: definition.choices.map(choice => ({ ...choice })) }
                : { ...definition }
        ));
    }

    public static register(pluginFile: string, definitions: PluginOptionDefinition[] = []): boolean {
        if (!this.isSafePluginFileName(pluginFile)) {
            this.logger.warn(`Refused to register options for unsafe plugin filename: ${pluginFile}`);
            return false;
        }

        this.schemas.set(pluginFile, this.cloneDefinitions(definitions));
        return true;
    }

    public static hasOptions(pluginFile: string): boolean {
        return (this.schemas.get(pluginFile)?.length ?? 0) > 0;
    }

    public static getDefinitions(pluginFile: string): PluginOptionDefinition[] {
        return this.cloneDefinitions(this.schemas.get(pluginFile) ?? []);
    }

    public static get(pluginFile: string): PluginOptionValues {
        if (!this.isSafePluginFileName(pluginFile)) return {};

        const definitions = this.schemas.get(pluginFile) ?? [];
        const values = getPluginOptionDefaults(definitions);
        if (definitions.length === 0) return values;

        try {
            const rawValue = localStorage.getItem(this.getStorageKey(pluginFile));
            if (!rawValue) return values;

            const storedValue: unknown = JSON.parse(rawValue);
            if (typeof storedValue !== "object" || storedValue === null || Array.isArray(storedValue)) {
                return values;
            }

            const storedOptions = storedValue as Record<string, unknown>;
            for (const definition of definitions) {
                const normalized = normalizePluginOptionValue(definition, storedOptions[definition.id]);
                if (normalized !== undefined) {
                    values[definition.id] = normalized;
                }
            }
        } catch (error) {
            this.logger.warn(`Failed to read options for ${pluginFile}: ${error}`);
        }

        return values;
    }

    public static save(pluginFile: string, candidateValues: PluginOptionValues): PluginOptionValues {
        if (!this.isSafePluginFileName(pluginFile)) return {};

        const definitions = this.schemas.get(pluginFile) ?? [];
        if (definitions.length === 0) return {};

        const normalizedValues = getPluginOptionDefaults(definitions);
        const overrides: PluginOptionValues = {};

        for (const definition of definitions) {
            const normalized = normalizePluginOptionValue(definition, candidateValues[definition.id]);
            const value = normalized ?? definition.default;
            normalizedValues[definition.id] = value;

            if (value !== definition.default) {
                overrides[definition.id] = value;
            }
        }

        try {
            const storageKey = this.getStorageKey(pluginFile);
            if (Object.keys(overrides).length === 0) {
                localStorage.removeItem(storageKey);
            } else {
                localStorage.setItem(storageKey, JSON.stringify(overrides));
            }
        } catch (error) {
            this.logger.error(`Failed to save options for ${pluginFile}: ${error}`);
        }

        return normalizedValues;
    }

    public static reset(pluginFile: string): PluginOptionValues {
        if (!this.isSafePluginFileName(pluginFile)) return {};

        try {
            localStorage.removeItem(this.getStorageKey(pluginFile));
        } catch (error) {
            this.logger.warn(`Failed to reset options for ${pluginFile}: ${error}`);
        }

        return getPluginOptionDefaults(this.schemas.get(pluginFile) ?? []);
    }

    public static remove(pluginFile: string): void {
        this.reset(pluginFile);
        this.schemas.delete(pluginFile);
    }
}

export default PluginOptions;
