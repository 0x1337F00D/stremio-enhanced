import { ipcRenderer, type IpcRendererEvent } from "electron";
import { IPC_CHANNELS } from "../../constants";
import type { UpdateState } from "../../interfaces/UpdateState";

export type UpdateStateListener = (state: UpdateState) => void;

export const updateClient = {
    getState(): Promise<UpdateState> {
        return ipcRenderer.invoke(IPC_CHANNELS.UPDATE_STATE_GET) as Promise<UpdateState>;
    },

    checkForUpdates(): Promise<UpdateState> {
        return ipcRenderer.invoke(IPC_CHANNELS.UPDATE_CHECK) as Promise<UpdateState>;
    },

    quitAndInstall(): Promise<boolean> {
        return ipcRenderer.invoke(IPC_CHANNELS.UPDATE_INSTALL) as Promise<boolean>;
    },

    onStateChanged(listener: UpdateStateListener): () => void {
        const handleStateChanged = (_event: IpcRendererEvent, state: UpdateState): void => {
            listener(state);
        };

        ipcRenderer.on(IPC_CHANNELS.UPDATE_STATE_CHANGED, handleStateChanged);
        return () => {
            ipcRenderer.removeListener(IPC_CHANNELS.UPDATE_STATE_CHANGED, handleStateChanged);
        };
    },
};

export default updateClient;
