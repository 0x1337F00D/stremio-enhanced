import { PluginOptionValues } from "./PluginOption";

export interface StremioEnhancedApi {
    applyTheme(theme: string): Promise<boolean>;
    pluginOptions: {
        get(pluginFile: string): PluginOptionValues;
    };
}

declare global {
    interface Window {
        stremioEnhanced?: StremioEnhancedApi;
    }
}
