import type { IpcMainInvokeEvent, OpenDialogOptions } from "electron";
import { beforeEach, describe, expect, it, vi, type Mock } from "vitest";

vi.mock("electron", () => ({
    dialog: {},
    ipcMain: {},
}));
import { IPC_CHANNELS } from "../constants";
import type { MpvStatus } from "../interfaces/NativePlayer";
import {
    registerMpvIpc,
    resolveMpvDialogSelection,
    type MpvControllerPort,
    type MpvDialogPort,
    type MpvIpcMainPort,
} from "./mpvIpc";

type RegisteredHandler = (
    event: IpcMainInvokeEvent,
    ...args: unknown[]
) => unknown;

const availableStatus: MpvStatus = {
    available: true,
    version: "0.39.0",
    source: "known-path",
    message: null,
    preferences: {
        enabled: true,
        useUserConfiguration: false,
    },
};

function trustedEvent(): IpcMainInvokeEvent {
    return {
        senderFrame: {
            parent: null,
            url: "https://web.stremio.com/",
        },
        sender: { id: 17 },
    } as unknown as IpcMainInvokeEvent;
}

function untrustedEvent(): IpcMainInvokeEvent {
    return {
        senderFrame: {
            parent: null,
            url: "https://attacker.example/",
        },
        sender: { id: 17 },
    } as unknown as IpcMainInvokeEvent;
}

describe("resolveMpvDialogSelection", () => {
    it("maps a selected macOS application bundle to its executable", () => {
        expect(resolveMpvDialogSelection("/Applications/mpv.app", "darwin"))
            .toBe("/Applications/mpv.app/Contents/MacOS/mpv");
        expect(resolveMpvDialogSelection("/usr/local/bin/mpv", "darwin"))
            .toBe("/usr/local/bin/mpv");
        expect(resolveMpvDialogSelection("C:\\Tools\\mpv.exe", "win32"))
            .toBe("C:\\Tools\\mpv.exe");
    });
});

describe("registerMpvIpc", () => {
    let handlers: Map<string, RegisteredHandler>;
    let removedChannels: string[];
    let ipcMain: MpvIpcMainPort;
    let controller: MpvControllerPort;
    let dialog: MpvDialogPort;
    let getStatus: Mock<MpvControllerPort["getStatus"]>;
    let configureExecutable: Mock<MpvControllerPort["configureExecutable"]>;
    let resetConfiguredExecutable: Mock<MpvControllerPort["resetConfiguredExecutable"]>;
    let setPreferences: Mock<MpvControllerPort["setPreferences"]>;
    let launch: Mock<MpvControllerPort["launch"]>;
    let cancelLaunch: Mock<MpvControllerPort["cancelLaunch"]>;
    let showOpenDialog: Mock<MpvDialogPort["showOpenDialog"]>;

    beforeEach(() => {
        handlers = new Map();
        removedChannels = [];
        ipcMain = {
            handle: (channel, listener) => handlers.set(channel, listener),
            removeHandler: channel => {
                removedChannels.push(channel);
                handlers.delete(channel);
            },
        };
        getStatus = vi.fn<MpvControllerPort["getStatus"]>().mockResolvedValue(availableStatus);
        configureExecutable = vi.fn<MpvControllerPort["configureExecutable"]>().mockResolvedValue({
            ...availableStatus,
            source: "configured",
        });
        resetConfiguredExecutable = vi.fn<MpvControllerPort["resetConfiguredExecutable"]>()
            .mockResolvedValue(availableStatus);
        setPreferences = vi.fn<MpvControllerPort["setPreferences"]>()
            .mockResolvedValue(availableStatus);
        launch = vi.fn<MpvControllerPort["launch"]>()
            .mockResolvedValue({ success: true, message: null });
        cancelLaunch = vi.fn<MpvControllerPort["cancelLaunch"]>()
            .mockResolvedValue(true);
        controller = {
            getStatus,
            configureExecutable,
            resetConfiguredExecutable,
            setPreferences,
            launch,
            cancelLaunch,
        };
        showOpenDialog = vi.fn<MpvDialogPort["showOpenDialog"]>().mockResolvedValue({
            canceled: false,
            filePaths: ["/Applications/mpv.app"],
        });
        dialog = {
            showOpenDialog: (options: OpenDialogOptions) => showOpenDialog(options),
        };
        registerMpvIpc(controller, {
            ipcMain,
            dialog,
            getTrustedWebContentsId: () => 17,
        });
    });

    it("registers trusted status, reset, and launch handlers", async () => {
        await expect(handlers.get(IPC_CHANNELS.MPV_STATUS)?.(trustedEvent()))
            .resolves.toEqual(availableStatus);
        await expect(handlers.get(IPC_CHANNELS.MPV_RESET_EXECUTABLE)?.(trustedEvent()))
            .resolves.toEqual(availableStatus);
        const preferences = { enabled: true, useUserConfiguration: true };
        await expect(handlers.get(IPC_CHANNELS.MPV_SET_PREFERENCES)?.(
            trustedEvent(),
            preferences,
        )).resolves.toEqual(availableStatus);
        expect(setPreferences).toHaveBeenCalledWith(preferences);
        const request = {
            attemptId: "attempt-1",
            streamUrl: "https://example.test/video",
        };
        await expect(handlers.get(IPC_CHANNELS.MPV_LAUNCH)?.(trustedEvent(), request))
            .resolves.toEqual({ success: true, message: null });
        expect(launch).toHaveBeenCalledWith(request);
        const cancelRequest = { attemptId: "attempt-1" };
        await expect(handlers.get(IPC_CHANNELS.MPV_CANCEL_LAUNCH)?.(
            trustedEvent(),
            cancelRequest,
        )).resolves.toBe(true);
        expect(cancelLaunch).toHaveBeenCalledWith(cancelRequest);
    });

    it("takes executable selection only from the main-process dialog", async () => {
        const handler = handlers.get(IPC_CHANNELS.MPV_SELECT_EXECUTABLE);
        await handler?.(trustedEvent(), "/renderer/supplied/mpv", ["--unsafe"]);

        expect(showOpenDialog).toHaveBeenCalledWith({
            title: "Select the MPV executable",
            buttonLabel: "Select MPV",
            properties: ["openFile"],
        });
        expect(configureExecutable).toHaveBeenCalledWith(
            process.platform === "darwin"
                ? "/Applications/mpv.app/Contents/MacOS/mpv"
                : "/Applications/mpv.app",
        );
        expect(configureExecutable).not.toHaveBeenCalledWith("/renderer/supplied/mpv");
    });

    it("keeps the existing status when selection is canceled", async () => {
        showOpenDialog.mockResolvedValue({ canceled: true, filePaths: [] });

        await expect(handlers.get(IPC_CHANNELS.MPV_SELECT_EXECUTABLE)?.(trustedEvent()))
            .resolves.toEqual(availableStatus);
        expect(configureExecutable).not.toHaveBeenCalled();
        expect(getStatus).toHaveBeenCalledOnce();
    });

    it("rejects every handler for an untrusted renderer before doing work", async () => {
        for (const channel of [
            IPC_CHANNELS.MPV_STATUS,
            IPC_CHANNELS.MPV_SELECT_EXECUTABLE,
            IPC_CHANNELS.MPV_RESET_EXECUTABLE,
            IPC_CHANNELS.MPV_SET_PREFERENCES,
            IPC_CHANNELS.MPV_LAUNCH,
            IPC_CHANNELS.MPV_CANCEL_LAUNCH,
        ]) {
            await expect(Promise.resolve().then(
                () => handlers.get(channel)?.(untrustedEvent(), {}),
            )).rejects.toThrow("Rejected request from an untrusted renderer");
        }
        expect(getStatus).not.toHaveBeenCalled();
        expect(showOpenDialog).not.toHaveBeenCalled();
        expect(resetConfiguredExecutable).not.toHaveBeenCalled();
        expect(setPreferences).not.toHaveBeenCalled();
        expect(launch).not.toHaveBeenCalled();
        expect(cancelLaunch).not.toHaveBeenCalled();
    });

    it("rejects the right origin from a different BrowserWindow", async () => {
        const event = trustedEvent() as IpcMainInvokeEvent & {
            sender: { id: number };
        };
        event.sender.id = 99;

        await expect(Promise.resolve().then(
            () => handlers.get(IPC_CHANNELS.MPV_STATUS)?.(event),
        )).rejects.toThrow("Rejected request from an untrusted renderer");
        expect(getStatus).not.toHaveBeenCalled();
    });

    it("returns a cleanup that removes only its six handlers", () => {
        handlers.clear();
        const cleanup = registerMpvIpc(controller, {
            ipcMain,
            dialog,
            getTrustedWebContentsId: () => 17,
        });

        cleanup();

        expect(removedChannels).toEqual([
            IPC_CHANNELS.MPV_STATUS,
            IPC_CHANNELS.MPV_SELECT_EXECUTABLE,
            IPC_CHANNELS.MPV_RESET_EXECUTABLE,
            IPC_CHANNELS.MPV_SET_PREFERENCES,
            IPC_CHANNELS.MPV_LAUNCH,
            IPC_CHANNELS.MPV_CANCEL_LAUNCH,
        ]);
    });
});
