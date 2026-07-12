import { FILE_EXTENSIONS } from "../constants";

export type ModFileType = "plugin" | "theme";

export function isSafeModFileName(fileName: string, type: ModFileType): boolean {
    const extension = type === "theme"
        ? FILE_EXTENSIONS.THEME
        : FILE_EXTENSIONS.PLUGIN;

    return (
        fileName.length > extension.length &&
        fileName.length <= 255 &&
        fileName.endsWith(extension) &&
        /^[A-Za-z0-9._-]+$/.test(fileName)
    );
}
