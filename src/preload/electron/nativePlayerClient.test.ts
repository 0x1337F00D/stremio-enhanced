import { beforeEach, describe, expect, it, vi } from "vitest";
import { IPC_CHANNELS } from "../../constants";

const electron = vi.hoisted(() => ({
    invoke: vi.fn(),
}));

vi.mock("electron", () => ({ ipcRenderer: electron }));

import nativePlayerClient from "./nativePlayerClient";

describe("nativePlayerClient", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("uses pathless invoke-only IPC for MPV discovery controls", async () => {
        electron.invoke.mockResolvedValue({
            available: false,
            version: null,
            source: null,
            message: null,
            preferences: {
                enabled: false,
                useUserConfiguration: false,
            },
        });

        await nativePlayerClient.getMpvStatus();
        await nativePlayerClient.selectMpvExecutable();
        await nativePlayerClient.resetMpvExecutable();
        await nativePlayerClient.setMpvPreferences({
            enabled: true,
            useUserConfiguration: false,
        });

        expect(electron.invoke.mock.calls).toEqual([
            [IPC_CHANNELS.MPV_STATUS],
            [IPC_CHANNELS.MPV_SELECT_EXECUTABLE],
            [IPC_CHANNELS.MPV_RESET_EXECUTABLE],
            [
                IPC_CHANNELS.MPV_SET_PREFERENCES,
                { enabled: true, useUserConfiguration: false },
            ],
        ]);
    });

    it("sends only the typed launch request to the dedicated launch channel", async () => {
        electron.invoke.mockResolvedValue({ success: true, message: null });
        const request = {
            attemptId: "attempt_123",
            streamUrl: "https://example.test/movie.mkv",
        };

        await nativePlayerClient.launchMpv(request);

        expect(electron.invoke).toHaveBeenCalledWith(
            IPC_CHANNELS.MPV_LAUNCH,
            request
        );

        electron.invoke.mockResolvedValueOnce(true);
        await nativePlayerClient.cancelMpvLaunch({ attemptId: request.attemptId });
        expect(electron.invoke).toHaveBeenLastCalledWith(
            IPC_CHANNELS.MPV_CANCEL_LAUNCH,
            { attemptId: request.attemptId }
        );
    });
});
