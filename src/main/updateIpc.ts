import { ipcMain, IpcMainInvokeEvent } from "electron";
import { IPC_CHANNELS, URLS } from "../constants";
import { UpdateState } from "../interfaces/UpdateState";

export interface UpdateControllerPort {
    getState(): UpdateState;
    checkForUpdates(): Promise<UpdateState>;
    quitAndInstall(): boolean;
}

const TRUSTED_RENDERER_ORIGIN = new URL(URLS.STREMIO_WEB).origin;

export function isTrustedUpdateRendererUrl(rawUrl: string): boolean {
    try {
        return new URL(rawUrl).origin === TRUSTED_RENDERER_ORIGIN;
    } catch {
        return false;
    }
}

function assertTrustedSender(event: IpcMainInvokeEvent): void {
    const frame = event.senderFrame;
    if (!frame || frame.parent !== null || !isTrustedUpdateRendererUrl(frame.url)) {
        throw new Error("Rejected update request from an untrusted renderer");
    }
}

export function registerUpdateIpc(controller: UpdateControllerPort): void {
    ipcMain.handle(IPC_CHANNELS.UPDATE_STATE_GET, event => {
        assertTrustedSender(event);
        return controller.getState();
    });
    ipcMain.handle(IPC_CHANNELS.UPDATE_CHECK, event => {
        assertTrustedSender(event);
        return controller.checkForUpdates();
    });
    ipcMain.handle(IPC_CHANNELS.UPDATE_INSTALL, event => {
        assertTrustedSender(event);
        return controller.quitAndInstall();
    });
}
