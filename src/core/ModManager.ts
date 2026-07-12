import Settings from "./Settings";
import { PlatformManager } from "../platform/PlatformManager";
import properties from "./Properties";
import helpers from "../utils/Helpers";
import { MetaData } from "../interfaces/MetaData";
import { getLogger } from "../utils/logger";
import { getApplyThemeTemplate } from "../components/apply-theme/applyTheme";
import { basename, join } from "path";
import { STORAGE_KEYS, CLASSES, URLS, FILE_EXTENSIONS } from "../constants";
import ExtractMetaData from "../utils/ExtractMetaData";
import PluginOptions from "./PluginOptions";
import reloadApplication from "../utils/reloadApplication";
import { isSafeModFileName } from "../utils/modFileName";

class ModManager {
    private static logger = getLogger("ModManager");
    private static readonly APPLY_THEME_SCRIPT_ID = "stremio-enhanced-apply-theme-script";
    private static readonly MAX_MOD_DOWNLOAD_BYTES = 5 * 1024 * 1024;
    private static scrollListenerReady = false;
    private static scrollListenerSetupPending = false;

    private static getEnabledPlugins(): string[] {
        try {
            const storedValue: unknown = JSON.parse(
                localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]"
            );
            return Array.isArray(storedValue)
                ? storedValue.filter((value): value is string => typeof value === "string")
                : [];
        } catch (error) {
            this.logger.warn(`Failed to parse enabled plugins: ${error}`);
            return [];
        }
    }

    private static decodeFileName(fileName: string): string {
        try {
            return decodeURIComponent(fileName);
        } catch {
            return fileName;
        }
    }

    private static sanitizeModFileName(
        fileName: string,
        type: "plugin" | "theme"
    ): string | null {
        const normalized = this.decodeFileName(basename(fileName).trim());
        return isSafeModFileName(normalized, type) ? normalized : null;
    }

    private static isSupportedRemoteUrl(rawUrl: string): boolean {
        try {
            const url = new URL(rawUrl);
            return url.protocol === "https:";
        } catch {
            return false;
        }
    }

    private static assertSecureResponseUrl(response: Response, fallbackUrl: string): void {
        const finalUrl = new URL(response.url || fallbackUrl);
        if (finalUrl.protocol !== "https:") {
            throw new Error(`Refused insecure redirect to ${finalUrl.protocol}`);
        }
    }

    private static async readLimitedModContent(response: Response): Promise<string> {
        const contentLength = Number(response.headers.get("content-length"));
        if (Number.isFinite(contentLength) && contentLength > this.MAX_MOD_DOWNLOAD_BYTES) {
            throw new Error("Mod download exceeds the 5 MiB size limit");
        }

        if (!response.body) {
            const content = await response.text();
            if (new TextEncoder().encode(content).byteLength > this.MAX_MOD_DOWNLOAD_BYTES) {
                throw new Error("Mod download exceeds the 5 MiB size limit");
            }
            return content;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let bytesRead = 0;
        let content = "";
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                bytesRead += value.byteLength;
                if (bytesRead > this.MAX_MOD_DOWNLOAD_BYTES) {
                    await reader.cancel();
                    throw new Error("Mod download exceeds the 5 MiB size limit");
                }
                content += decoder.decode(value, { stream: true });
            }
            return content + decoder.decode();
        } finally {
            reader.releaseLock();
        }
    }
    
    /**
     * Load and enable a plugin by filename
     */
    public static async loadPlugin(pluginName: string): Promise<void> {
        if (!isSafeModFileName(pluginName, "plugin")) {
            this.logger.warn(`Refused to load plugin with unsafe filename: ${pluginName}`);
            return;
        }
        if (document.getElementById(pluginName)) {
            this.logger.info(`Plugin ${pluginName} is already loaded`);
            return;
        }

        const pluginPath = join(properties.pluginsPath, pluginName);
        
        if (!await PlatformManager.current.exists(pluginPath)) {
            this.logger.error(`Plugin file not found: ${pluginPath}`);
            return;
        }

        let plugin: string;
        try {
            plugin = await PlatformManager.current.readFile(pluginPath);
        } catch (error) {
            this.logger.error(`Failed to read plugin ${pluginName}: ${error}`);
            return;
        }

        const metaData = ExtractMetaData.extractMetadataFromText(plugin);
        PluginOptions.register(pluginName, metaData?.options ?? []);

        const script = document.createElement("script");
        script.textContent = plugin;
        script.id = pluginName;
        script.dataset.stremioEnhancedPlugin = pluginName;
        
        document.body.appendChild(script);
        
        const enabledPlugins = this.getEnabledPlugins();
        
        if (!enabledPlugins.includes(pluginName)) {
            enabledPlugins.push(pluginName);
            localStorage.setItem(STORAGE_KEYS.ENABLED_PLUGINS, JSON.stringify(enabledPlugins));
        }
        
        this.logger.info(`Plugin ${pluginName} loaded!`);
    }

    /**
     * Load the installed plugins that the user previously enabled.
     * Discovery and individual plugin failures are isolated so one broken file
     * cannot prevent the remaining enabled plugins from starting.
     */
    public static async loadEnabledPlugins(): Promise<void> {
        const enabledPlugins = new Set(this.getEnabledPlugins());
        let installedPlugins: string[];

        try {
            const pluginsPath = properties.pluginsPath;
            if (!await PlatformManager.current.exists(pluginsPath)) return;

            installedPlugins = (await PlatformManager.current.readdir(pluginsPath))
                .filter(fileName => isSafeModFileName(fileName, "plugin"));
        } catch (error) {
            this.logger.error(`Failed to discover enabled plugins: ${error}`);
            return;
        }

        for (const pluginName of installedPlugins) {
            if (!enabledPlugins.has(pluginName)) continue;

            try {
                await this.loadPlugin(pluginName);
            } catch (error) {
                this.logger.error(`Failed to load enabled plugin ${pluginName}: ${error}`);
            }
        }
    }
    
    /**
     * Unload and disable a plugin by filename
     */
    public static unloadPlugin(pluginName: string): void {
        if (!isSafeModFileName(pluginName, "plugin")) {
            this.logger.warn(`Refused to unload plugin with unsafe filename: ${pluginName}`);
            return;
        }
        const pluginElement = document.getElementById(pluginName);
        if (pluginElement) {
            pluginElement.remove();
        }
        
        let enabledPlugins = this.getEnabledPlugins();
        enabledPlugins = enabledPlugins.filter((x: string) => x !== pluginName);
        localStorage.setItem(STORAGE_KEYS.ENABLED_PLUGINS, JSON.stringify(enabledPlugins));
        
        this.logger.info(`Plugin ${pluginName} unloaded!`);
        reloadApplication();
    }

    public static bindPluginToggle(
        toggle: HTMLElement,
        pluginName: string,
        allowProgrammaticActivation = false
    ): void {
        if (!isSafeModFileName(pluginName, "plugin")) {
            this.logger.warn(`Refused to bind unsafe plugin filename: ${pluginName}`);
            return;
        }
        if (toggle.dataset.stremioEnhancedToggleBound === "true") return;

        toggle.dataset.stremioEnhancedToggleBound = "true";
        toggle.addEventListener("click", event => {
            if (!event.isTrusted && !allowProgrammaticActivation) return;

            toggle.classList.toggle(CLASSES.CHECKED);
            if (toggle.classList.contains(CLASSES.CHECKED)) {
                void this.loadPlugin(pluginName);
            } else {
                this.unloadPlugin(pluginName);
            }
        });
    }

    /**
     * Fetch mods from the registry repository
     */
    public static async fetchMods(): Promise<{ plugins: unknown[]; themes: unknown[] }> {
        const response = await fetch(URLS.REGISTRY);
        return response.json();
    }

    /**
     * Download and save a mod (plugin or theme)
     */
    public static async downloadMod(modLink: string, type: "plugin" | "theme"): Promise<string> {
        this.logger.info(`Downloading ${type} from: ${modLink}`);

        const modUrl = new URL(modLink);
        if (modUrl.protocol !== "https:") {
            throw new Error(`Unsupported URL protocol for ${type}: ${modUrl.protocol}`);
        }

        const response = await fetch(modUrl.toString());
        if (!response.ok) throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
        this.assertSecureResponseUrl(response, modUrl.toString());
        
        const saveDir = type === "plugin" ? properties.pluginsPath : properties.themesPath;
        if (!await PlatformManager.current.exists(saveDir)) {
            await PlatformManager.current.mkdir(saveDir);
        }
        
        const fallbackName = `${type}-${Date.now()}${type === "theme" ? FILE_EXTENSIONS.THEME : FILE_EXTENSIONS.PLUGIN}`;
        const unsafeName = basename(modUrl.pathname) || fallbackName;
        const filename = this.sanitizeModFileName(unsafeName, type);
        if (!filename) {
            throw new Error(`Refused to save ${type} with unsafe filename: ${unsafeName}`);
        }

        const filePath = join(saveDir, filename);

        const content = await this.readLimitedModContent(response);
        await PlatformManager.current.writeFile(filePath, content);

        this.logger.info(`Downloaded ${type} saved to: ${filePath}`);
        return filePath;
    }

    /**
     * Remove a mod file and clean up associated state
     */
    public static async removeMod(fileName: string, type: "plugin" | "theme"): Promise<void> {
        const decodedFileName = this.decodeFileName(fileName.trim());
        if (!isSafeModFileName(decodedFileName, type)) {
            throw new Error(`Refused to remove ${type} with unsafe filename: ${fileName}`);
        }
        fileName = decodedFileName;
        this.logger.info(`Removing ${type} file: ${fileName}`);

        switch (type) {
            case "plugin":
                if (await this.isPluginInstalled(fileName)) {
                    const wasEnabled = this.getEnabledPlugins().includes(fileName);
                    await PlatformManager.current.unlink(join(properties.pluginsPath, fileName));
                    PluginOptions.remove(fileName);
                    if (wasEnabled) {
                        this.unloadPlugin(fileName);
                    }
                }
                break;
            case "theme":
                if (await this.isThemeInstalled(fileName)) {
                    if (localStorage.getItem(STORAGE_KEYS.CURRENT_THEME) === fileName) {
                        localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
                    }
                    document.getElementById("activeTheme")?.remove();
                    await PlatformManager.current.unlink(join(properties.themesPath, fileName));
                }
                break;
        }
    }

    public static async isThemeInstalled(fileName: string): Promise<boolean> {
        return (await this.getInstalledThemes()).includes(fileName);
    }

    public static async isPluginInstalled(fileName: string): Promise<boolean> {
        return (await this.getInstalledPlugins()).includes(fileName);
    }

    private static async getInstalledThemes(): Promise<string[]> {
        const dirPath = properties.themesPath;
        if (!await PlatformManager.current.exists(dirPath)) return [];

        const files = await PlatformManager.current.readdir(dirPath);
        const fileStats = await Promise.all(files.map(async file => {
            const stat = await PlatformManager.current.stat(join(dirPath, file));
            return { file, isFile: stat.isFile };
        }));
        
        return fileStats.filter(f => f.isFile).map(f => f.file);
    }

    private static async getInstalledPlugins(): Promise<string[]> {
        const dirPath = properties.pluginsPath;
        if (!await PlatformManager.current.exists(dirPath)) return [];

        const files = await PlatformManager.current.readdir(dirPath);
        const fileStats = await Promise.all(files.map(async file => {
            const stat = await PlatformManager.current.stat(join(dirPath, file));
            return { file, isFile: stat.isFile };
        }));
        
        return fileStats.filter(f => f.isFile).map(f => f.file);
    }
    
    public static openThemesFolder(): void {
        helpers.waitForElm("#openthemesfolderBtn").then(() => {
            const button = document.getElementById("openthemesfolderBtn") as HTMLElement | null;
            if (!button || button.dataset.stremioEnhancedClickBound === "true") return;

            button.dataset.stremioEnhancedClickBound = "true";
            button.addEventListener("click", async () => {
                await this.openFolder(properties.themesPath);
            });
        }).catch(err => this.logger.error(`Failed to setup themes folder button: ${err}`));
    }

    public static openPluginsFolder(): void {
        helpers.waitForElm("#openpluginsfolderBtn").then(() => {
            const button = document.getElementById("openpluginsfolderBtn") as HTMLElement | null;
            if (!button || button.dataset.stremioEnhancedClickBound === "true") return;

            button.dataset.stremioEnhancedClickBound = "true";
            button.addEventListener("click", async () => {
                await this.openFolder(properties.pluginsPath);
            });
        }).catch(err => this.logger.error(`Failed to setup plugins folder button: ${err}`));
    }

    /**
     * Open a folder in the system file explorer
     */
    private static async openFolder(folderPath: string): Promise<void> {
        try {
            await PlatformManager.current.openPath(folderPath);
        } catch (error) {
            this.logger.error(`Failed to open folder ${folderPath}: ${error}`);
        }
    }
        
    public static scrollListener(): void {
        if (this.scrollListenerReady || this.scrollListenerSetupPending) return;
        this.scrollListenerSetupPending = true;

        helpers.waitForElm('[data-section="enhanced"]').then(() => {
            const enhanced = document.getElementById('enhanced');
            const enhancedNav = document.querySelector('[data-section="enhanced"]') as HTMLElement | null;

            if (!(enhanced instanceof HTMLElement) || !enhancedNav) return;

            if (enhancedNav.dataset.stremioEnhancedScrollBound === "true") return;
            enhancedNav.dataset.stremioEnhancedScrollBound = "true";

            enhancedNav.addEventListener("click", () => {
                const firstChild = document.querySelector("#enhanced > div");
                firstChild?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                Settings.activeSection(enhancedNav);
            });
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        Settings.activeSection(enhancedNav);
                    } else {
                        enhancedNav.classList.remove(CLASSES.SELECTED);
                    }
                });
            }, { threshold: 0.1 });
        
            observer.observe(enhanced);
            this.scrollListenerReady = true;
        }).catch(err => {
            this.logger.warn(`Enhanced scroll listener was not ready: ${err}`);
        }).finally(() => {
            this.scrollListenerSetupPending = false;
        });
    }
    
    /**
     * Add the applyTheme function to the page
     */
    public static addApplyThemeFunction(): void {
        if (document.getElementById(this.APPLY_THEME_SCRIPT_ID)) return;

        const applyThemeScript = getApplyThemeTemplate();
        const script = document.createElement("script");  
        script.innerHTML = applyThemeScript;
        script.id = this.APPLY_THEME_SCRIPT_ID;
        
        document.body.appendChild(script);
    }
    
    /**
     * Check for updates for a specific plugin or theme
     */
    public static async checkForItemUpdates(itemFile: string): Promise<void> {
        this.logger.info('Checking for updates for ' + itemFile);
        
        const itemBox = document.getElementsByName(`${itemFile}-box`)[0];
        if (!itemBox) {
            this.logger.warn(`${itemFile}-box element not found.`);
            return;
        }

        const pluginOrTheme: 'theme' | 'plugin' = itemFile.endsWith(".theme.css") ? "theme" : "plugin";
        const itemPath = join(
            pluginOrTheme === "theme" ? properties.themesPath : properties.pluginsPath, 
            itemFile
        );
        
        // Refactored: Read file first
        let fileContent = "";
        try {
            fileContent = await PlatformManager.current.readFile(itemPath);
        } catch (e) {
            this.logger.error(`Failed to read file ${itemPath}: ${e}`);
            return;
        }

        const installedItemMetaData = ExtractMetaData.extractMetadataFromText(fileContent) as MetaData | null;
        
        if (!installedItemMetaData || Object.keys(installedItemMetaData).length === 0) {
            return;
        }

        const updateUrl = installedItemMetaData.updateUrl;
        if (!updateUrl || updateUrl === "none") {
            this.logger.info(`No update URL provided for ${pluginOrTheme} (${installedItemMetaData.name})`);
            return;
        }
        if (!this.isSupportedRemoteUrl(updateUrl)) {
            this.logger.warn(`Skipped update for ${itemFile}: unsupported URL protocol.`);
            return;
        }

        try {
            const request = await fetch(updateUrl);
            if (request.status !== 200) {
                this.logger.warn(`Failed to fetch update for ${itemFile}: HTTP ${request.status}`);
                return;
            }
            this.assertSecureResponseUrl(request, updateUrl);

            const response = await this.readLimitedModContent(request);
            const extractedMetaData = ExtractMetaData.extractMetadataFromText(response) as MetaData | null;
            
            if (!extractedMetaData) {
                this.logger.warn(`Failed to extract metadata from response for ${pluginOrTheme} (${installedItemMetaData.name})`);
                return;
            }

            if (helpers.isNewerVersion(extractedMetaData.version, installedItemMetaData.version)) {
                this.logger.info(
                    `Update available for ${pluginOrTheme} (${installedItemMetaData.name}): ` +
                    `v${installedItemMetaData.version} -> v${extractedMetaData.version}`
                );

                const updateButton = document.getElementById(`${itemFile}-update`);
                if (updateButton) {
                    updateButton.style.display = "flex";
                    if (updateButton.dataset.stremioEnhancedClickBound === "true") {
                        return;
                    }
                    updateButton.dataset.stremioEnhancedClickBound = "true";
                    updateButton.addEventListener("click", async () => {
                        await PlatformManager.current.writeFile(itemPath, response);
                        Settings.removeItem(itemFile);
                        Settings.addItem(pluginOrTheme, itemFile, extractedMetaData);
                    });
                }
            } else {
                this.logger.info(
                    `No update available for ${pluginOrTheme} (${installedItemMetaData.name}). ` +
                    `Current version: v${installedItemMetaData.version}`
                );
            }
        } catch (error) {
            this.logger.error(`Error checking updates for ${itemFile}: ${(error as Error).message}`);
        }
    }
}
    
export default ModManager;
