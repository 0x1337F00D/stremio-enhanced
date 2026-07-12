import {
    dialog as electronDialog,
    ipcMain as electronIpcMain,
    type IpcMainInvokeEvent,
    type OpenDialogOptions,
} from "electron";
import path from "node:path";
import { IPC_CHANNELS } from "../constants";
import type {
    MpvLaunchResult,
    MpvStatus,
} from "../interfaces/NativePlayer";
import { assertTrustedRenderer } from "./trustedRenderer";

export interface MpvControllerPort {
    getStatus(): Promise<MpvStatus>;
    configureExecutable(executablePath: string): Promise<MpvStatus>;
    resetConfiguredExecutable(): Promise<MpvStatus>;
    setPreferences(preferences: unknown): Promise<MpvStatus>;
    launch(request: unknown): Promise<MpvLaunchResult>;
    cancelLaunch(request: unknown): Promise<boolean>;
}

type IpcHandler = (event: IpcMainInvokeEvent, ...args: unknown[]) => unknown;

export interface MpvIpcMainPort {
    handle(channel: string, listener: IpcHandler): void;
    removeHandler(channel: string): void;
}

export interface MpvOpenDialogResult {
    readonly canceled: boolean;
    readonly filePaths: readonly string[];
}

export interface MpvDialogPort {
    showOpenDialog(options: OpenDialogOptions): Promise<MpvOpenDialogResult>;
}

export interface MpvIpcDependencies {
    readonly ipcMain?: MpvIpcMainPort;
    readonly dialog?: MpvDialogPort;
    readonly getTrustedWebContentsId?: () => number | null;
}

const MPV_IPC_CHANNELS = [
    IPC_CHANNELS.MPV_STATUS,
    IPC_CHANNELS.MPV_SELECT_EXECUTABLE,
    IPC_CHANNELS.MPV_RESET_EXECUTABLE,
    IPC_CHANNELS.MPV_SET_PREFERENCES,
    IPC_CHANNELS.MPV_LAUNCH,
    IPC_CHANNELS.MPV_CANCEL_LAUNCH,
] as const;

export function resolveMpvDialogSelection(
    selectedPath: string,
    platform: NodeJS.Platform = process.platform,
): string {
    if (platform !== "darwin") {
        return selectedPath;
    }

    const normalizedPath = path.posix.normalize(selectedPath);
    return normalizedPath.toLowerCase().endsWith(".app")
        ? path.posix.join(normalizedPath, "Contents", "MacOS", "mpv")
        : selectedPath;
}

export function registerMpvIpc(
    controller: MpvControllerPort,
    dependencies: MpvIpcDependencies = {},
): () => void {
    const ipcMain = dependencies.ipcMain ?? electronIpcMain;
    const dialog = dependencies.dialog ?? electronDialog;
    const assertTrustedMpvRenderer = (event: IpcMainInvokeEvent): void => {
        const expectedWebContentsId = dependencies.getTrustedWebContentsId?.();
        if (
            dependencies.getTrustedWebContentsId
            && expectedWebContentsId === null
        ) {
            throw new Error("Rejected request from an untrusted renderer");
        }
        assertTrustedRenderer(event, expectedWebContentsId ?? undefined);
    };

    ipcMain.handle(IPC_CHANNELS.MPV_STATUS, event => {
        assertTrustedMpvRenderer(event);
        return controller.getStatus();
    });

    ipcMain.handle(IPC_CHANNELS.MPV_SELECT_EXECUTABLE, async event => {
        assertTrustedMpvRenderer(event);
        const result = await dialog.showOpenDialog({
            title: "Select the MPV executable",
            buttonLabel: "Select MPV",
            properties: ["openFile"],
        });
        if (result.canceled || result.filePaths.length !== 1) {
            return controller.getStatus();
        }

        // The path comes exclusively from Electron's main-process file dialog.
        // Renderer-provided paths and arguments are intentionally not accepted.
        return controller.configureExecutable(resolveMpvDialogSelection(result.filePaths[0]));
    });

    ipcMain.handle(IPC_CHANNELS.MPV_RESET_EXECUTABLE, event => {
        assertTrustedMpvRenderer(event);
        return controller.resetConfiguredExecutable();
    });

    ipcMain.handle(IPC_CHANNELS.MPV_SET_PREFERENCES, (event, preferences) => {
        assertTrustedMpvRenderer(event);
        return controller.setPreferences(preferences);
    });

    ipcMain.handle(IPC_CHANNELS.MPV_LAUNCH, (event, request) => {
        assertTrustedMpvRenderer(event);
        return controller.launch(request);
    });

    ipcMain.handle(IPC_CHANNELS.MPV_CANCEL_LAUNCH, (event, request) => {
        assertTrustedMpvRenderer(event);
        return controller.cancelLaunch(request);
    });

    return () => {
        for (const channel of MPV_IPC_CHANNELS) {
            ipcMain.removeHandler(channel);
        }
    };
}
