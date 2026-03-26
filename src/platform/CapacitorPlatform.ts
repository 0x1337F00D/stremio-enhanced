import { IPlatform, FileStat } from "./IPlatform";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Browser } from "@capacitor/browser";
import { FilePicker } from "@capawesome/capacitor-file-picker";

interface AndroidBridge {
    openPath(path: string): void;
    isPictureInPictureSupported(): boolean;
    enterPictureInPicture(width: number, height: number): boolean;
    setPictureInPictureState(enabled: boolean, width: number, height: number): void;
}

declare global {
    interface Window {
        StremioEnhancedAndroid?: AndroidBridge;
    }
}

export class CapacitorPlatform implements IPlatform {
    id: "capacitor" = "capacitor";
    private readonly enhancedPath = "Stremio Enhanced";
    private readonly themesPath = `${this.enhancedPath}/themes`;
    private readonly pluginsPath = `${this.enhancedPath}/plugins`;

    private isExternalPath(path: string): boolean {
        return path.startsWith("file://") || path.startsWith("content://") || path.startsWith("/");
    }

    private getDirectory(path: string): Directory | undefined {
        return this.isExternalPath(path) ? undefined : Directory.Documents;
    }

    private getFileOptions(path: string, encoding?: Encoding): {
        path: string;
        directory?: Directory;
        encoding?: Encoding;
    } {
        const options: {
            path: string;
            directory?: Directory;
            encoding?: Encoding;
        } = { path };

        const directory = this.getDirectory(path);
        if (directory) {
            options.directory = directory;
        }

        if (encoding) {
            options.encoding = encoding;
        }

        return options;
    }

    private async existsInDirectory(path: string, directory: Directory): Promise<boolean> {
        try {
            await Filesystem.stat({ path, directory });
            return true;
        } catch {
            return false;
        }
    }

    private async readdirInDirectory(path: string, directory: Directory): Promise<string[]> {
        try {
            const result = await Filesystem.readdir({ path, directory });
            return result.files.map(file => file.name);
        } catch (error: any) {
            if (error?.message?.includes("does not exist")) return [];
            console.error("Failed to readdir:", error);
            return [];
        }
    }

    private async migrateLegacyDirectory(oldPath: string, newPath: string): Promise<void> {
        const legacyFiles = await this.readdirInDirectory(oldPath, Directory.Data);
        if (!legacyFiles.length) return;

        await this.mkdir(newPath);
        const migratedFiles = new Set(await this.readdir(newPath));

        for (const fileName of legacyFiles) {
            if (migratedFiles.has(fileName)) continue;

            const legacyPath = `${oldPath}/${fileName}`;
            const legacyStat = await Filesystem.stat({
                path: legacyPath,
                directory: Directory.Data
            }).catch(() => null);

            if (!legacyStat || legacyStat.type !== "file") continue;

            const content = await Filesystem.readFile({
                path: legacyPath,
                directory: Directory.Data,
                encoding: Encoding.UTF8
            });

            await Filesystem.writeFile({
                path: `${newPath}/${fileName}`,
                directory: Directory.Documents,
                data: content.data as string,
                encoding: Encoding.UTF8
            });
        }
    }

    private async ensurePermissions(): Promise<void> {
        await Promise.allSettled([
            Filesystem.requestPermissions(),
            FilePicker.requestPermissions()
        ]);
    }

    private getAndroidBridge(): AndroidBridge | undefined {
        return typeof window === "undefined" ? undefined : window.StremioEnhancedAndroid;
    }

    async readFile(path: string): Promise<string> {
        const result = await Filesystem.readFile(this.getFileOptions(path, Encoding.UTF8));
        return result.data as string;
    }

    async writeFile(path: string, content: string): Promise<void> {
        await Filesystem.writeFile({
            ...this.getFileOptions(path, Encoding.UTF8),
            data: content
        });
    }

    async readdir(path: string): Promise<string[]> {
        try {
            const result = await Filesystem.readdir(this.getFileOptions(path));
            return result.files.map(f => f.name);
        } catch (error: any) {
            if (error?.message?.includes("does not exist")) return [];
            console.error("Failed to readdir:", error);
            return [];
        }
    }

    async exists(path: string): Promise<boolean> {
        try {
            await Filesystem.stat(this.getFileOptions(path));
            return true;
        } catch {
            return false;
        }
    }

    async unlink(path: string): Promise<void> {
        await Filesystem.deleteFile(this.getFileOptions(path));
    }

    async mkdir(path: string): Promise<void> {
        try {
            await Filesystem.mkdir({
                ...this.getFileOptions(path),
                recursive: true
            });
        } catch (error: any) {
            // Ignore error if directory already exists
            if (error?.message?.includes("already exists")) return;
            console.error("Failed to create directory:", error);
        }
    }

    async stat(path: string): Promise<FileStat> {
        const stat = await Filesystem.stat(this.getFileOptions(path));
        return {
            isFile: stat.type === 'file',
            isDirectory: stat.type === 'directory'
        };
    }

    async openPath(path: string): Promise<void> {
        const bridge = this.getAndroidBridge();
        if (bridge) {
            bridge.openPath(path);
            return;
        }

        console.info("Open this folder from your Files app:", path);
    }

    async openExternal(url: string): Promise<void> {
        await Browser.open({ url });
    }

    isPictureInPictureSupported(): boolean {
        return this.getAndroidBridge()?.isPictureInPictureSupported() ?? false;
    }

    async enterPictureInPicture(width = 16, height = 9): Promise<boolean> {
        const bridge = this.getAndroidBridge();
        if (!bridge) return false;
        return bridge.enterPictureInPicture(width, height);
    }

    async setPictureInPictureState(enabled: boolean, width = 16, height = 9): Promise<void> {
        this.getAndroidBridge()?.setPictureInPictureState(enabled, width, height);
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
        await this.ensurePermissions();
        await this.mkdir(this.getEnhancedPath());
        await this.mkdir(this.getThemesPath());
        await this.mkdir(this.getPluginsPath());

        await this.migrateLegacyDirectory("themes", this.getThemesPath());
        await this.migrateLegacyDirectory("plugins", this.getPluginsPath());

        const legacyRootExists = await this.existsInDirectory("logs", Directory.Data);
        if (legacyRootExists) {
            await this.mkdir(`${this.getEnhancedPath()}/logs`);
            await this.migrateLegacyDirectory("logs", `${this.getEnhancedPath()}/logs`);
        }
    }
}
