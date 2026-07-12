import { EventEmitter } from "events";
import type {
    AppUpdater,
    ProgressInfo,
    UpdateCheckResult,
    UpdateDownloadedEvent,
    UpdateInfo,
} from "electron-updater";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UpdateState } from "../interfaces/UpdateState";
import { UpdateController } from "./Updater";

class FakeAppUpdater extends EventEmitter {
    public autoDownload = false;
    public autoInstallOnAppQuit = false;
    public allowPrerelease = true;
    public allowDowngrade = true;
    public checkForUpdates = vi.fn(async (): Promise<UpdateCheckResult | null> => null);
    public quitAndInstall = vi.fn((): void => undefined);
}

function updateInfo(overrides: Partial<UpdateInfo> = {}): UpdateInfo {
    return {
        version: "2.0.0",
        files: [],
        path: "update.zip",
        sha512: "checksum",
        releaseDate: "2026-07-12T00:00:00.000Z",
        ...overrides,
    };
}

function updateCheckResult(
    isUpdateAvailable: boolean,
    info: UpdateInfo = updateInfo()
): UpdateCheckResult {
    return {
        isUpdateAvailable,
        updateInfo: info,
        versionInfo: info,
    };
}

function downloadedUpdate(overrides: Partial<UpdateDownloadedEvent> = {}): UpdateDownloadedEvent {
    return {
        ...updateInfo(),
        downloadedFile: "/private/update.zip",
        ...overrides,
    };
}

describe("UpdateController", () => {
    let updater: FakeAppUpdater;
    let broadcasts: ReturnType<typeof vi.fn<(state: UpdateState) => void>>;
    let logger: {
        info: ReturnType<typeof vi.fn<(message: string) => void>>;
        warn: ReturnType<typeof vi.fn<(message: string) => void>>;
        error: ReturnType<typeof vi.fn<(message: string) => void>>;
    };

    function createController(isSupported = true): UpdateController {
        return new UpdateController(updater as unknown as AppUpdater, {
            isSupported,
            currentVersion: "1.0.2",
            broadcast: broadcasts,
            logger,
        });
    }

    beforeEach(() => {
        updater = new FakeAppUpdater();
        broadcasts = vi.fn<(state: UpdateState) => void>();
        logger = {
            info: vi.fn<(message: string) => void>(),
            warn: vi.fn<(message: string) => void>(),
            error: vi.fn<(message: string) => void>(),
        };
    });

    it("configures the updater and each event listener exactly once", () => {
        const controller = createController();

        expect(updater.autoDownload).toBe(true);
        expect(updater.autoInstallOnAppQuit).toBe(true);
        expect(updater.allowPrerelease).toBe(false);
        expect(updater.allowDowngrade).toBe(false);
        expect(updater.listenerCount("checking-for-update")).toBe(1);
        expect(updater.listenerCount("update-available")).toBe(1);
        expect(updater.listenerCount("download-progress")).toBe(1);
        expect(updater.listenerCount("update-downloaded")).toBe(1);
        expect(updater.listenerCount("update-not-available")).toBe(1);
        expect(updater.listenerCount("update-cancelled")).toBe(1);
        expect(updater.listenerCount("error")).toBe(1);
        expect(controller.getState()).toEqual({
            status: "idle",
            currentVersion: "1.0.2",
            availableVersion: null,
            releaseName: null,
            releaseNotes: null,
            message: null,
            progress: null,
        });
    });

    it("reports unsupported builds without invoking the updater", async () => {
        const controller = createController(false);

        const state = await controller.checkForUpdates();

        expect(updater.checkForUpdates).not.toHaveBeenCalled();
        expect(state).toMatchObject({
            status: "unsupported",
            availableVersion: null,
            progress: null,
        });
        expect(state.message).toContain("unavailable for this build");
        expect(broadcasts).toHaveBeenCalledOnce();
    });

    it("serializes concurrent checks onto one updater request", async () => {
        let resolveCheck: ((result: UpdateCheckResult) => void) | undefined;
        updater.checkForUpdates.mockImplementation(() => new Promise(resolve => {
            resolveCheck = resolve;
        }));
        const controller = createController();

        const firstCheck = controller.checkForUpdates();
        const secondCheck = controller.checkForUpdates();
        await Promise.resolve();

        expect(secondCheck).toBe(firstCheck);
        expect(updater.checkForUpdates).toHaveBeenCalledOnce();

        resolveCheck?.(updateCheckResult(false));
        await expect(firstCheck).resolves.toMatchObject({ status: "not-available" });

        updater.checkForUpdates.mockResolvedValue(updateCheckResult(false));
        await controller.checkForUpdates();
        expect(updater.checkForUpdates).toHaveBeenCalledTimes(2);
    });

    it("emits sanitized, capped plain-text release information", () => {
        const controller = createController();
        const longNotes = `${"A".repeat(4_100)}<img src=x onerror=alert(1)>`;

        updater.emit("update-available", updateInfo({
            releaseName: "<b>Stable &amp; Safe</b>",
            releaseNotes: [
                { version: "2.0.0", note: "<script>bad()</script># **Highlights** [site](https://invalid.test)" },
                { version: "1.9.0", note: longNotes },
            ],
        }));

        const state = controller.getState();
        expect(state.status).toBe("available");
        expect(state.releaseName).toBe("Stable & Safe");
        expect(state.releaseNotes).toContain("Highlights site");
        expect(state.releaseNotes).not.toContain("<script>");
        expect(state.releaseNotes).not.toContain("https://invalid.test");
        expect(Array.from(state.releaseNotes ?? "")).toHaveLength(4_000);
        expect(state.releaseNotes?.endsWith("…")).toBe(true);
        expect(JSON.parse(JSON.stringify(state))).toEqual(state);
        expect(state).not.toHaveProperty("files");
    });

    it("emits finite, non-negative download progress", () => {
        const controller = createController();
        updater.emit("update-available", updateInfo());

        updater.emit("download-progress", {
            percent: 150,
            transferred: -10,
            total: Number.POSITIVE_INFINITY,
            delta: 123,
            bytesPerSecond: Number.NaN,
        } satisfies ProgressInfo);

        expect(controller.getState()).toEqual({
            status: "downloading",
            currentVersion: "1.0.2",
            availableVersion: "2.0.0",
            releaseName: null,
            releaseNotes: null,
            message: null,
            progress: {
                percent: 100,
                transferred: 0,
                total: 0,
                bytesPerSecond: 0,
            },
        });
    });

    it("guards installation until a downloaded event and prevents duplicate installs", () => {
        const controller = createController();

        expect(controller.quitAndInstall()).toBe(false);
        expect(updater.quitAndInstall).not.toHaveBeenCalled();
        expect(logger.warn).toHaveBeenCalledOnce();

        updater.emit("update-downloaded", downloadedUpdate({
            releaseName: "Ready",
            releaseNotes: "Install me",
        }));

        expect(controller.getState()).toMatchObject({
            status: "downloaded",
            availableVersion: "2.0.0",
            releaseName: "Ready",
            releaseNotes: "Install me",
        });
        expect(controller.quitAndInstall()).toBe(true);
        expect(updater.quitAndInstall).toHaveBeenCalledOnce();
        expect(controller.quitAndInstall()).toBe(false);
        expect(updater.quitAndInstall).toHaveBeenCalledOnce();
    });

    it("emits not-available state without exposing updater internals", () => {
        const controller = createController();

        updater.emit("update-not-available", updateInfo({ version: "1.0.2" }));

        expect(controller.getState()).toEqual({
            status: "not-available",
            currentVersion: "1.0.2",
            availableVersion: "1.0.2",
            releaseName: null,
            releaseNotes: null,
            message: null,
            progress: null,
        });
    });

    it("turns rejected checks into a sanitized error state", async () => {
        updater.checkForUpdates.mockRejectedValue(
            new Error(`<b>Network failed</b>\u0000${"x".repeat(600)}`)
        );
        const controller = createController();

        const state = await controller.checkForUpdates();

        expect(state.status).toBe("error");
        expect(state.message).toContain("Network failed");
        expect(state.message).not.toContain("<b>");
        expect(state.message).not.toContain("\u0000");
        expect(Array.from(state.message ?? "").length).toBeLessThanOrEqual(500);
        expect(logger.error).toHaveBeenCalledWith(
            expect.stringContaining("Auto-update failed")
        );
    });

    it("maps a disabled updater result and a cancelled download to safe states", async () => {
        const controller = createController();

        expect(await controller.checkForUpdates()).toMatchObject({
            status: "unsupported",
            message: expect.stringContaining("unavailable"),
        });

        updater.emit("update-cancelled", updateInfo());
        expect(controller.getState()).toMatchObject({
            status: "error",
            message: "The update download was cancelled.",
        });
    });

    it("contains broadcast and quit-and-install failures", () => {
        broadcasts.mockImplementation(() => {
            throw new Error("window destroyed");
        });
        updater.quitAndInstall.mockImplementation(() => {
            throw new Error("install failed");
        });
        const controller = createController();

        updater.emit("update-downloaded", downloadedUpdate());

        expect(logger.warn).toHaveBeenCalledWith(
            expect.stringContaining("Failed to broadcast")
        );
        expect(controller.quitAndInstall()).toBe(false);
        expect(controller.getState()).toMatchObject({
            status: "error",
            message: "install failed",
        });
    });
});
