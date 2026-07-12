import {
    MetaData,
    MetadataKey,
    REQUIRED_METADATA_KEYS,
    ALL_METADATA_KEYS,
} from "../interfaces/MetaData";
import { PluginOptionDefinition } from "../interfaces/PluginOption";
import { validatePluginOptionDefinition } from "./PluginOptionSchema";
import logger from "./logger";

class ExtractMetaData {
    private static readonly MAX_PLUGIN_OPTIONS = 32;

    /**
     * Parse metadata from a comment block in the format:
     * /** @key value *\/
    */
    private static parseMetadataFromContent(content: string): MetaData | null {
        const blockMatch = content.match(/\/\*\*([\s\S]*?)\*\//);
        if (!blockMatch) return null;

        const result: Partial<MetaData> = {};
        const tagRegex = /@(\w+)\s+([^\n\r]+)/g;

        for (const [, rawKey, rawValue] of blockMatch[1].matchAll(tagRegex)) {
            if (!ALL_METADATA_KEYS.includes(rawKey as MetadataKey)) continue;

            const key = rawKey as MetadataKey;

            if (result[key] !== undefined) continue;

            result[key] = rawValue.trim();
        }

        const options: PluginOptionDefinition[] = [];
        const optionIds = new Set<string>();
        const optionRegex = /@option\s+([^\n\r]+)/g;

        for (const [, rawOption] of blockMatch[1].matchAll(optionRegex)) {
            if (options.length >= this.MAX_PLUGIN_OPTIONS) {
                logger.warn(`Ignoring plugin options after the first ${this.MAX_PLUGIN_OPTIONS}`);
                break;
            }

            try {
                const option = validatePluginOptionDefinition(JSON.parse(rawOption.trim()));
                if (!option) {
                    logger.warn(`Ignoring invalid plugin option: ${rawOption.trim()}`);
                    continue;
                }
                if (optionIds.has(option.id)) {
                    logger.warn(`Ignoring duplicate plugin option id: ${option.id}`);
                    continue;
                }

                optionIds.add(option.id);
                options.push(option);
            } catch {
                logger.warn(`Ignoring malformed plugin option JSON: ${rawOption.trim()}`);
            }
        }

        if (options.length > 0) {
            result.options = options;
        }

        for (const key of REQUIRED_METADATA_KEYS) {
            if (!result[key]) return null;
        }

        return result as MetaData;
    }

    public static extractMetadataFromText(textContent: string): MetaData | null {
        const metadata = this.parseMetadataFromContent(textContent);
        
        if (!metadata) {
            logger.error('Comment block not found in the provided text');
        }
        
        return metadata;
    }
}

export default ExtractMetaData;
