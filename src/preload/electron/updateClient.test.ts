import { beforeEach, describe, expect, it, vi } from "vitest";
import { IPC_CHANNELS } from "../../constants";

const electron = vi.hoisted(() => ({
    invoke: vi.fn(),
    on: vi.fn(),
    removeListener: vi.fn(),
}));

vi.mock("electron", () => ({ ipcRenderer: electron }));

import updateClient from "./updateClient";

describe("updateClient", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("uses invoke-only IPC for state, checks, and installation", async () => {
        electron.invoke
            .mockResolvedValueOnce({ status: "idle", currentVersion: "1.0.0" })
            .mockResolvedValueOnce({ status: "checking", currentVersion: "1.0.0" })
            .mockResolvedValueOnce(true);

        await updateClient.getState();
        await updateClient.checkForUpdates();
        await updateClient.quitAndInstall();

        expect(electron.invoke.mock.calls).toEqual([
            [IPC_CHANNELS.UPDATE_STATE_GET],
            [IPC_CHANNELS.UPDATE_CHECK],
            [IPC_CHANNELS.UPDATE_INSTALL],
        ]);
    });

    it("subscribes to update state and removes the exact listener", () => {
        const listener = vi.fn();
        const unsubscribe = updateClient.onStateChanged(listener);
        const ipcListener = electron.on.mock.calls[0][1] as (
            event: unknown,
            state: unknown
        ) => void;
        const state = { status: "checking", currentVersion: "1.0.0" };

        ipcListener({}, state);
        expect(listener).toHaveBeenCalledWith(state);

        unsubscribe();
        expect(electron.removeListener).toHaveBeenCalledWith(
            IPC_CHANNELS.UPDATE_STATE_CHANGED,
            ipcListener
        );
    });
});
