import { join } from "path";
import { getDefaultThemeTemplate } from "../../components/default-theme/defaultTheme";
import { setupBrowseModsButton } from "../../components/mod-browser/modBrowser";
import { FILE_EXTENSIONS, SELECTORS, STORAGE_KEYS } from "../../constants";
import ModManager from "../../core/ModManager";
import properties from "../../core/Properties";
import Settings from "../../core/Settings";
import { PlatformManager } from "../../platform/PlatformManager";
import ExtractMetaData from "../../utils/ExtractMetaData";
import Helpers from "../../utils/Helpers";
import { getLogger } from "../../utils/logger";
import { getAboutIcon, getPluginIcon, getThemeIcon } from "./icons";

export interface EnhancedSettingsHooks {
    addPlatformControls(): void;
    renderAbout(): void;
}

export interface EnhancedSettingsController {
    check(): Promise<void>;
}

const logger = getLogger("EnhancedSettings");

async function readManagedFiles(path: string, extension: string): Promise<string[]> {
    try {
        const files = await PlatformManager.current.readdir(path);
        return files.filter(fileName => fileName.endsWith(extension));
    } catch (error) {
        logger.error(`Failed to read managed directory ${path}: ${error}`);
        return [];
    }
}

async function addInstalledThemes(themes: string[]): Promise<void> {
    await Helpers.waitForElm(SELECTORS.THEMES_CATEGORY);

    if (!document.getElementById("stremio-enhanced-default-theme")) {
        const isDefault = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME) === "Default";
        const container = document.createElement("div");
        container.id = "stremio-enhanced-default-theme";
        container.innerHTML = getDefaultThemeTemplate(isDefault);
        document.querySelector(SELECTORS.THEMES_CATEGORY)?.appendChild(container);
    }

    await Promise.all(themes.map(async theme => {
        try {
            const content = await PlatformManager.current.readFile(join(properties.themesPath, theme));
            const metaData = ExtractMetaData.extractMetadataFromText(content);
            if (metaData && metaData.name.toLowerCase() !== "default") {
                Settings.addItem("theme", theme, metaData);
            }
        } catch (error) {
            logger.error(`Failed to load theme metadata for ${theme}: ${error}`);
        }
    }));
}

async function addInstalledPlugins(plugins: string[]): Promise<void> {
    await Promise.all(plugins.map(async plugin => {
        try {
            const content = await PlatformManager.current.readFile(join(properties.pluginsPath, plugin));
            const metaData = ExtractMetaData.extractMetadataFromText(content);
            if (metaData) Settings.addItem("plugin", plugin, metaData);
        } catch (error) {
            logger.error(`Failed to load plugin metadata for ${plugin}: ${error}`);
        }
    }));
}

function settingsAreReady(): boolean {
    return Boolean(
        document.getElementById("enhanced") &&
        document.querySelector('[data-section="enhanced"]') &&
        document.querySelector(SELECTORS.THEMES_CATEGORY) &&
        document.querySelector(SELECTORS.PLUGINS_CATEGORY) &&
        document.querySelector(SELECTORS.ABOUT_CATEGORY)
    );
}

export function createEnhancedSettingsController(
    hooks: EnhancedSettingsHooks
): EnhancedSettingsController {
    let checkPending = false;

    const setup = async (): Promise<void> => {
        ModManager.addApplyThemeFunction();

        const [themes, plugins] = await Promise.all([
            readManagedFiles(properties.themesPath, FILE_EXTENSIONS.THEME),
            readManagedFiles(properties.pluginsPath, FILE_EXTENSIONS.PLUGIN),
        ]);

        Settings.addSection("enhanced", "Enhanced");
        await Helpers.waitForElm("#enhanced");
        Settings.addCategory("Themes", "enhanced", getThemeIcon());
        Settings.addCategory("Plugins", "enhanced", getPluginIcon());
        Settings.addCategory("About", "enhanced", getAboutIcon());
        await Promise.all([
            Helpers.waitForElm(SELECTORS.THEMES_CATEGORY),
            Helpers.waitForElm(SELECTORS.PLUGINS_CATEGORY),
            Helpers.waitForElm(SELECTORS.ABOUT_CATEGORY),
        ]);

        hooks.addPlatformControls();
        hooks.renderAbout();
        setupBrowseModsButton();

        await Promise.all([
            addInstalledThemes(themes),
            addInstalledPlugins(plugins),
        ]);

        ModManager.scrollListener();
    };

    return {
        async check(): Promise<void> {
            if (!location.href.includes("#/settings") || settingsAreReady() || checkPending) {
                return;
            }

            checkPending = true;
            try {
                await setup();
            } finally {
                checkPending = false;
            }
        },
    };
}
