import { ipcMain } from "electron";
import { IPC_CHANNELS } from "../constants";
import { UpdateState } from "../interfaces/UpdateState";
import { assertTrustedRenderer, isTrustedRendererUrl } from "./trustedRenderer";

export interface UpdateControllerPort {
    getState(): UpdateState;
    checkForUpdates(): Promise<UpdateState>;
    quitAndInstall(): boolean;
}

export const isTrustedUpdateRendererUrl = isTrustedRendererUrl;

export function registerUpdateIpc(controller: UpdateControllerPort): void {
    ipcMain.handle(IPC_CHANNELS.UPDATE_STATE_GET, event => {
        assertTrustedRenderer(event);
        return controller.getState();
    });
    ipcMain.handle(IPC_CHANNELS.UPDATE_CHECK, event => {
        assertTrustedRenderer(event);
        return controller.checkForUpdates();
    });
    ipcMain.handle(IPC_CHANNELS.UPDATE_INSTALL, event => {
        assertTrustedRenderer(event);
        return controller.quitAndInstall();
    });
}
