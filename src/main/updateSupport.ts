export interface DesktopUpdateEnvironment {
    readonly APPIMAGE?: string;
    readonly PORTABLE_EXECUTABLE_FILE?: string;
}

export interface DesktopUpdateSupportInput {
    readonly isPackaged: boolean;
    readonly platform: NodeJS.Platform;
    readonly environment: DesktopUpdateEnvironment;
}

/**
 * electron-updater only supports the installable desktop targets we publish.
 * Portable Windows builds and unpacked/non-AppImage Linux builds must never
 * download an installer that cannot safely replace the running application.
 */
export function isDesktopAutoUpdateSupported(input: DesktopUpdateSupportInput): boolean {
    if (!input.isPackaged) return false;

    switch (input.platform) {
        case "darwin":
            return true;
        case "win32":
            return !input.environment.PORTABLE_EXECUTABLE_FILE;
        case "linux":
            return Boolean(input.environment.APPIMAGE);
        default:
            return false;
    }
}
