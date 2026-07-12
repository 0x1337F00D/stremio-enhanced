// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UpdateState } from "../../interfaces/UpdateState";

const client = vi.hoisted(() => ({
    getState: vi.fn(),
    checkForUpdates: vi.fn(),
    quitAndInstall: vi.fn(),
    onStateChanged: vi.fn(() => vi.fn()),
}));
const nativeClient = vi.hoisted(() => ({
    getMpvStatus: vi.fn(),
    selectMpvExecutable: vi.fn(),
    resetMpvExecutable: vi.fn(),
    setMpvPreferences: vi.fn(),
    launchMpv: vi.fn(),
}));

vi.mock("./updateClient", () => ({ default: client }));
vi.mock("./nativePlayerClient", () => ({ default: nativeClient }));
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

import {
    renderDesktopMpvStatus,
    renderDesktopUpdateState,
    setDesktopMpvEnabled,
    setupNativePlayerControls,
    toggleDesktopMpvUserConfiguration,
} from "./preferences";

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

    it("never renders an executable path supplied outside the public status contract", () => {
        document.body.innerHTML = `<div id="stremio-enhanced-mpv-status"></div>`;

        const statusWithPrivateData = {
            available: true,
            executablePath: '<img src=x onerror="alert(1)">',
            version: "0.40.0",
            source: "configured",
            message: null,
            preferences: { enabled: true, useUserConfiguration: false },
        } as const;
        renderDesktopMpvStatus(statusWithPrivateData);

        const status = document.getElementById("stremio-enhanced-mpv-status");
        expect(status?.textContent).toBe("MPV 0.40.0 is available (user-selected).");
        expect(status?.textContent).not.toContain("Executable");
        expect(status?.textContent).not.toContain("<img");
        expect(status?.querySelector("img")).toBeNull();
    });

    it("loads preferences from main and rejects synthetic mutating events", async () => {
        document.body.innerHTML = `
            <div id="stremio-enhanced-native-player-controls">
            <select id="nativePlayerSelect">
                <option value="disabled">Built-in</option>
                <option value="mpv">MPV</option>
            </select>
            <div id="stremio-enhanced-mpv-controls">
                <div id="mpvUseUserConfig" role="switch"></div>
                <button id="selectMpvExecutableBtn"></button>
                <button id="resetMpvExecutableBtn"></button>
                <div id="stremio-enhanced-mpv-status"></div>
            </div>
            </div>
        `;
        const detected = {
            available: true,
            version: "0.40.0",
            source: "known-path" as const,
            message: null,
            preferences: {
                enabled: true,
                useUserConfiguration: false,
            },
        };
        nativeClient.getMpvStatus.mockResolvedValue(detected);
        nativeClient.selectMpvExecutable.mockResolvedValue({
            ...detected,
            source: "configured",
        });
        nativeClient.resetMpvExecutable.mockResolvedValue(detected);
        nativeClient.setMpvPreferences.mockResolvedValue(detected);

        await setupNativePlayerControls();

        const select = document.getElementById("nativePlayerSelect") as HTMLSelectElement;
        const toggle = document.getElementById("mpvUseUserConfig") as HTMLElement;
        const choose = document.getElementById(
            "selectMpvExecutableBtn"
        ) as HTMLButtonElement;
        const reset = document.getElementById(
            "resetMpvExecutableBtn"
        ) as HTMLButtonElement;

        expect(nativeClient.getMpvStatus).toHaveBeenCalledOnce();
        expect(document.getElementById("stremio-enhanced-mpv-controls")?.hidden)
            .toBe(false);
        expect(select.value).toBe("mpv");
        expect(toggle.getAttribute("aria-checked")).toBe("false");

        toggle.click();
        expect(nativeClient.setMpvPreferences).not.toHaveBeenCalled();
        expect(toggle.getAttribute("aria-checked")).toBe("false");

        select.value = "disabled";
        select.dispatchEvent(new Event("change"));
        expect(nativeClient.setMpvPreferences).not.toHaveBeenCalled();
        expect(select.value).toBe("mpv");
        expect(document.getElementById("stremio-enhanced-mpv-controls")?.hidden)
            .toBe(false);

        choose.click();
        reset.click();
        expect(nativeClient.selectMpvExecutable).not.toHaveBeenCalled();
        expect(nativeClient.resetMpvExecutable).not.toHaveBeenCalled();
    });

    it("serializes preference saves and keeps every MPV control disabled", async () => {
        document.body.innerHTML = `
            <div id="stremio-enhanced-native-player-controls">
                <select id="nativePlayerSelect">
                    <option value="disabled">Built-in</option>
                    <option value="mpv">MPV</option>
                </select>
                <div id="stremio-enhanced-mpv-controls">
                    <div id="mpvUseUserConfig" role="switch" tabindex="0"></div>
                    <button id="selectMpvExecutableBtn"></button>
                    <button id="resetMpvExecutableBtn"></button>
                    <div id="stremio-enhanced-mpv-status"></div>
                </div>
            </div>
        `;
        const initialStatus = {
            available: true,
            version: "0.40.0",
            source: "known-path" as const,
            message: null,
            preferences: {
                enabled: true,
                useUserConfiguration: false,
            },
        };
        nativeClient.getMpvStatus.mockResolvedValue(initialStatus);
        let resolveFirst: ((status: typeof initialStatus) => void) | undefined;
        let resolveSecond: ((status: typeof initialStatus) => void) | undefined;
        nativeClient.setMpvPreferences
            .mockReturnValueOnce(new Promise(resolve => {
                resolveFirst = resolve;
            }))
            .mockReturnValueOnce(new Promise(resolve => {
                resolveSecond = resolve;
            }));
        await setupNativePlayerControls();

        setDesktopMpvEnabled(false);
        toggleDesktopMpvUserConfiguration();

        await vi.waitFor(() => {
            expect(nativeClient.setMpvPreferences).toHaveBeenCalledTimes(1);
        });
        expect(nativeClient.setMpvPreferences).toHaveBeenNthCalledWith(1, {
            enabled: false,
            useUserConfiguration: false,
        });
        const select = document.getElementById("nativePlayerSelect") as HTMLSelectElement;
        const toggle = document.getElementById("mpvUseUserConfig") as HTMLElement;
        const choose = document.getElementById(
            "selectMpvExecutableBtn"
        ) as HTMLButtonElement;
        const reset = document.getElementById(
            "resetMpvExecutableBtn"
        ) as HTMLButtonElement;
        expect(select.disabled).toBe(true);
        expect(toggle.getAttribute("aria-disabled")).toBe("true");
        expect(choose.disabled).toBe(true);
        expect(reset.disabled).toBe(true);

        resolveFirst?.({
            ...initialStatus,
            preferences: { enabled: false, useUserConfiguration: false },
        });
        await vi.waitFor(() => {
            expect(nativeClient.setMpvPreferences).toHaveBeenCalledTimes(2);
        });
        expect(nativeClient.setMpvPreferences).toHaveBeenNthCalledWith(2, {
            enabled: false,
            useUserConfiguration: true,
        });
        expect(select.disabled).toBe(true);

        resolveSecond?.({
            ...initialStatus,
            preferences: { enabled: false, useUserConfiguration: true },
        });
        await vi.waitFor(() => expect(select.disabled).toBe(false));
        expect(toggle.getAttribute("aria-disabled")).toBe("false");
        expect(choose.disabled).toBe(false);
        expect(reset.disabled).toBe(false);
    });
});
