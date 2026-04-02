import { IPlatform, FileStat } from "./IPlatform";
import { ipcRenderer } from "electron";
import { IPC_CHANNELS } from "../constants";

export class ElectronPlatform implements IPlatform {
    id: "electron" = "electron";

    private enhancedPath: string = "";
    private themesPath: string = "";
    private pluginsPath: string = "";

    constructor() {
        // Will be initialized in init() via IPC
    }

    async readFile(path: string): Promise<string> {
        return ipcRenderer.invoke(IPC_CHANNELS.READ_FILE, path);
    }

    async writeFile(path: string, content: string): Promise<void> {
        return ipcRenderer.invoke(IPC_CHANNELS.WRITE_FILE, path, content);
    }

    async readdir(path: string): Promise<string[]> {
        return ipcRenderer.invoke(IPC_CHANNELS.READ_DIR, path);
    }

    async exists(path: string): Promise<boolean> {
        return ipcRenderer.invoke(IPC_CHANNELS.EXISTS, path);
    }

    async unlink(path: string): Promise<void> {
        return ipcRenderer.invoke(IPC_CHANNELS.UNLINK, path);
    }

    async mkdir(path: string): Promise<void> {
        return ipcRenderer.invoke(IPC_CHANNELS.MKDIR, path);
    }

    async stat(path: string): Promise<FileStat> {
        return ipcRenderer.invoke(IPC_CHANNELS.STAT, path);
    }

    async openPath(path: string): Promise<void> {
        return ipcRenderer.invoke(IPC_CHANNELS.OPEN_PATH, path);
    }

    async openExternal(url: string): Promise<void> {
        return ipcRenderer.invoke(IPC_CHANNELS.OPEN_EXTERNAL, url);
    }

    isPictureInPictureSupported(): boolean {
        return false;
    }

    async enterPictureInPicture(_width?: number, _height?: number): Promise<boolean> {
        return false;
    }

    async setPictureInPictureState(_enabled: boolean, _width?: number, _height?: number): Promise<void> {
        return;
    }

    getThemesPath(): string {
        return this.themesPath;
    }

    getPluginsPath(): string {
        return this.pluginsPath;
    }

    getEnhancedPath(): string {
        return this.enhancedPath;
    }

    async init(): Promise<void> {
        const paths = await ipcRenderer.invoke(IPC_CHANNELS.GET_PATHS);
        this.enhancedPath = paths.enhancedPath;
        this.themesPath = paths.themesPath;
        this.pluginsPath = paths.pluginsPath;

        // Ensure directories exist
        if (!await this.exists(this.enhancedPath)) {
            await this.mkdir(this.enhancedPath);
        }
        if (!await this.exists(this.themesPath)) {
            await this.mkdir(this.themesPath);
        }
        if (!await this.exists(this.pluginsPath)) {
            await this.mkdir(this.pluginsPath);
        }
    }
}
