import { StremioEnhancedApi } from "../interfaces/StremioEnhancedApi";
import PluginOptions from "./PluginOptions";

export function createStremioEnhancedApi(
    applyTheme: (theme: string) => Promise<boolean>
): StremioEnhancedApi {
    return Object.freeze({
        applyTheme: (theme: unknown) => (
            typeof theme === "string" ? applyTheme(theme) : Promise.resolve(false)
        ),
        pluginOptions: Object.freeze({
            get: (pluginFile: string) => (
                typeof pluginFile === "string" ? PluginOptions.get(pluginFile) : {}
            ),
        }),
    });
}
