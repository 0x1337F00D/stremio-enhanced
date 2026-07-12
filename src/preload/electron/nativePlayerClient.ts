import { ipcRenderer } from "electron";
import { IPC_CHANNELS } from "../../constants";
import type {
    MpvCancelLaunchRequest,
    MpvLaunchRequest,
    MpvLaunchResult,
    MpvPreferences,
    MpvStatus,
} from "../../interfaces/NativePlayer";

/**
 * Narrow renderer-to-main bridge for MPV operations. Executable paths are
 * selected and persisted by the trusted main process; the renderer never
 * submits a path or command-line arguments.
 */
export const nativePlayerClient = {
    getMpvStatus(): Promise<MpvStatus> {
        return ipcRenderer.invoke(IPC_CHANNELS.MPV_STATUS) as Promise<MpvStatus>;
    },

    selectMpvExecutable(): Promise<MpvStatus> {
        return ipcRenderer.invoke(
            IPC_CHANNELS.MPV_SELECT_EXECUTABLE
        ) as Promise<MpvStatus>;
    },

    resetMpvExecutable(): Promise<MpvStatus> {
        return ipcRenderer.invoke(
            IPC_CHANNELS.MPV_RESET_EXECUTABLE
        ) as Promise<MpvStatus>;
    },

    setMpvPreferences(preferences: MpvPreferences): Promise<MpvStatus> {
        return ipcRenderer.invoke(
            IPC_CHANNELS.MPV_SET_PREFERENCES,
            preferences
        ) as Promise<MpvStatus>;
    },

    launchMpv(request: MpvLaunchRequest): Promise<MpvLaunchResult> {
        return ipcRenderer.invoke(
            IPC_CHANNELS.MPV_LAUNCH,
            request
        ) as Promise<MpvLaunchResult>;
    },

    cancelMpvLaunch(request: MpvCancelLaunchRequest): Promise<boolean> {
        return ipcRenderer.invoke(
            IPC_CHANNELS.MPV_CANCEL_LAUNCH,
            request
        ) as Promise<boolean>;
    },
};

export default nativePlayerClient;
