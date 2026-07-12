// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UpdateState } from "../../interfaces/UpdateState";

const client = vi.hoisted(() => ({
    getState: vi.fn(),
    checkForUpdates: vi.fn(),
    quitAndInstall: vi.fn(),
    onStateChanged: vi.fn(() => vi.fn()),
}));

vi.mock("./updateClient", () => ({ default: client }));
vi.mock("electron", () => ({ ipcRenderer: { send: vi.fn(), invoke: vi.fn() } }));
vi.mock("../../core/DiscordPresence", () => ({
    default: {
        start: vi.fn(),
        stop: vi.fn(),
        discordRPCHandler: vi.fn(),
    },
}));
vi.mock("../../core/ModManager", () => ({
    default: {
        openThemesFolder: vi.fn(),
        openPluginsFolder: vi.fn(),
    },
}));
vi.mock("../../core/Settings", () => ({
    default: { addButton: vi.fn() },
}));
vi.mock("./windowChrome", () => ({ getTransparencyStatus: vi.fn() }));
vi.mock("../../utils/logger", () => ({
    getLogger: () => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn() }),
}));

import { renderDesktopUpdateState } from "./preferences";

function updateState(overrides: Partial<UpdateState>): UpdateState {
    return {
        status: "idle",
        currentVersion: "1.0.0",
        availableVersion: null,
        releaseName: null,
        releaseNotes: null,
        message: null,
        progress: null,
        ...overrides,
    };
}

describe("desktop update presentation", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = `
            <div class="modals-container"></div>
            <div><button id="checkforupdatesBtn">Check</button></div>
        `;
    });

    it("renders download status and bounded progress", () => {
        renderDesktopUpdateState(updateState({
            status: "downloading",
            availableVersion: "1.1.0",
            progress: {
                percent: 37.6,
                transferred: 376,
                total: 1000,
                bytesPerSecond: 100,
            },
        }));

        const status = document.getElementById("stremio-enhanced-update-status");
        const progress = document.getElementById(
            "stremio-enhanced-update-progress"
        ) as HTMLProgressElement | null;
        expect(status?.textContent).toBe("Downloading update v1.1.0: 38%");
        expect(progress?.hidden).toBe(false);
        expect(progress?.value).toBe(37.6);

        renderDesktopUpdateState(updateState({
            status: "downloading",
            availableVersion: "1.1.0",
            progress: {
                percent: 140,
                transferred: 1400,
                total: 1000,
                bytesPerSecond: 100,
            },
        }));
        expect(progress?.value).toBe(100);
    });

    it("shows the downloaded prompt and guards the install IPC request", async () => {
        let finishInstall: ((accepted: boolean) => void) | undefined;
        client.quitAndInstall.mockReturnValue(new Promise<boolean>(resolve => {
            finishInstall = resolve;
        }));

        renderDesktopUpdateState(updateState({
            status: "downloaded",
            availableVersion: "2.0.0-test",
            releaseName: "Version 2",
            releaseNotes: "Ready",
        }));

        const restart = document.querySelector<HTMLButtonElement>(
            '[data-stremio-enhanced-install-update="true"]'
        );
        restart?.click();
        restart?.click();

        expect(client.quitAndInstall).toHaveBeenCalledTimes(1);
        expect(restart?.disabled).toBe(true);

        finishInstall?.(false);
        await vi.waitFor(() => expect(restart?.disabled).toBe(false));
    });
});
