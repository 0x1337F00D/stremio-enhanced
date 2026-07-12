// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";

const playbackState = vi.hoisted(() => ({
    getPlayerState: vi.fn(),
}));
const client = vi.hoisted(() => ({
    getMpvStatus: vi.fn(),
    launchMpv: vi.fn(),
    cancelMpvLaunch: vi.fn(),
}));
const helpers = vi.hoisted(() => ({
    createToast: vi.fn(),
}));

vi.mock("../../utils/PlaybackState", () => ({ default: playbackState }));
vi.mock("./nativePlayerClient", () => ({ default: client }));
vi.mock("../../utils/Helpers", async importOriginal => {
    const actual = await importOriginal<typeof import("../../utils/Helpers")>();
    return {
        default: {
            waitForElm: (...args: Parameters<typeof actual.default.waitForElm>) =>
                actual.default.waitForElm(...args),
            createToast: helpers.createToast,
        },
    };
});
vi.mock("../../utils/logger", () => ({
    getLogger: () => ({ info: vi.fn(), warn: vi.fn(), error: vi.fn() }),
}));

import { launchNativePlayerForCurrentRoute } from "./nativePlayerPlayback";

function mpvStatus(enabled: boolean = true) {
    return {
        available: true,
        version: "0.40.0",
        source: "known-path" as const,
        message: null,
        preferences: {
            enabled,
            useUserConfiguration: false,
        },
    };
}

function playerState(
    metaId: string,
    url?: string,
    seriesInfoDetails: { season: number; episode: number } | null = null
) {
    return {
        metaDetails: { id: metaId, name: "Example", type: "movie" },
        seriesInfoDetails,
        stream: url ? { content: { url } } : undefined,
    };
}

function addVideo(): HTMLVideoElement {
    const video = document.createElement("video");
    document.body.appendChild(video);
    return video;
}

describe("native player route hand-off", () => {
    beforeEach(async () => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        vi.clearAllMocks();
        client.cancelMpvLaunch.mockResolvedValue(true);
        location.hash = "#/settings";
        await launchNativePlayerForCurrentRoute();
        document.body.replaceChildren();
    });

    it("deduplicates a route and launches with one opaque attempt ID", async () => {
        location.hash = "#/player/movie/one";
        client.getMpvStatus.mockResolvedValue(mpvStatus());
        playbackState.getPlayerState.mockResolvedValue(
            playerState("one", "https://example.test/stream.mkv")
        );
        client.launchMpv.mockResolvedValue({ success: true, message: null });
        const video = addVideo();
        const pause = vi.spyOn(video, "pause").mockImplementation(() => undefined);
        const back = vi.spyOn(window.history, "back").mockImplementation(() => undefined);

        const first = launchNativePlayerForCurrentRoute();
        const second = launchNativePlayerForCurrentRoute();

        await expect(first).resolves.toBe(true);
        await expect(second).resolves.toBe(true);
        expect(client.launchMpv).toHaveBeenCalledTimes(1);
        const request = client.launchMpv.mock.calls[0][0] as {
            attemptId: string;
            streamUrl: string;
        };
        expect(request.attemptId).toMatch(/^[a-zA-Z0-9_-]{1,128}$/);
        expect(request.streamUrl).toBe("https://example.test/stream.mkv");
        expect(pause).toHaveBeenCalledOnce();
        expect(back).toHaveBeenCalledOnce();
    });

    it("does nothing when main reports native playback disabled", async () => {
        location.hash = "#/player/movie/disabled";
        client.getMpvStatus.mockResolvedValue(mpvStatus(false));

        await expect(launchNativePlayerForCurrentRoute()).resolves.toBe(false);

        expect(playbackState.getPlayerState).not.toHaveBeenCalled();
        expect(client.launchMpv).not.toHaveBeenCalled();
    });

    it("never launches stale CoreState and accepts a decoded series episode route", async () => {
        vi.useFakeTimers();
        location.hash = [
            "#/player/encoded-stream",
            "stream-transport",
            "meta-transport",
            "series",
            "tt123",
            "tt123%3A1%3A2",
        ].join("/");
        client.getMpvStatus.mockResolvedValue(mpvStatus());
        playbackState.getPlayerState
            .mockResolvedValueOnce(
                playerState("old-title", "https://example.test/stale.mkv")
            )
            .mockResolvedValueOnce(
                playerState(
                    "tt123",
                    "https://example.test/current.mkv",
                    { season: 1, episode: 2 }
                )
            );
        client.launchMpv.mockResolvedValue({ success: true, message: null });
        const video = addVideo();
        vi.spyOn(video, "pause").mockImplementation(() => undefined);
        vi.spyOn(window.history, "back").mockImplementation(() => undefined);

        const attempt = launchNativePlayerForCurrentRoute();
        await vi.waitFor(() => expect(playbackState.getPlayerState).toHaveBeenCalledOnce());
        expect(client.launchMpv).not.toHaveBeenCalled();
        await vi.advanceTimersByTimeAsync(350);

        await expect(attempt).resolves.toBe(true);
        expect(client.launchMpv).toHaveBeenCalledTimes(1);
        expect(client.launchMpv.mock.calls[0][0].streamUrl)
            .toBe("https://example.test/current.mkv");
    });

    it("cancels main immediately when the route changes during a pending launch", async () => {
        let resolveLaunch: ((value: { success: boolean; message: null }) => void) | undefined;
        location.hash = "#/player/movie/stale-launch";
        client.getMpvStatus.mockResolvedValue(mpvStatus());
        playbackState.getPlayerState.mockResolvedValue(
            playerState("stale-launch", "https://example.test/stale-launch.mkv")
        );
        client.launchMpv.mockReturnValue(new Promise(resolve => {
            resolveLaunch = resolve;
        }));
        const video = addVideo();
        const pause = vi.spyOn(video, "pause").mockImplementation(() => undefined);
        const back = vi.spyOn(window.history, "back").mockImplementation(() => undefined);

        const attempt = launchNativePlayerForCurrentRoute();
        await vi.waitFor(() => expect(client.launchMpv).toHaveBeenCalledOnce());
        const attemptId = client.launchMpv.mock.calls[0][0].attemptId as string;
        location.hash = "#/settings";
        await launchNativePlayerForCurrentRoute();

        expect(client.cancelMpvLaunch).toHaveBeenCalledWith({ attemptId });
        resolveLaunch?.({ success: true, message: null });
        await expect(attempt).resolves.toBe(false);
        expect(pause).not.toHaveBeenCalled();
        expect(back).not.toHaveBeenCalled();
        expect(helpers.createToast).not.toHaveBeenCalled();
    });

    it("automatically retries missing video readiness on the same generation", async () => {
        vi.useFakeTimers();
        location.hash = "#/player/movie/retry";
        client.getMpvStatus.mockResolvedValue(mpvStatus());
        playbackState.getPlayerState.mockResolvedValue(
            playerState("retry", "https://example.test/retry.mkv")
        );
        client.launchMpv.mockResolvedValue({ success: true, message: null });

        const attempt = launchNativePlayerForCurrentRoute();
        await vi.advanceTimersByTimeAsync(850);
        expect(client.launchMpv).not.toHaveBeenCalled();
        const video = addVideo();
        vi.spyOn(video, "pause").mockImplementation(() => undefined);
        vi.spyOn(window.history, "back").mockImplementation(() => undefined);
        await vi.advanceTimersByTimeAsync(350);

        await expect(attempt).resolves.toBe(true);
        expect(client.launchMpv).toHaveBeenCalledOnce();
    });

    it("does not retry an unsafe non-HTTP stream URL", async () => {
        vi.useFakeTimers();
        location.hash = "#/player/movie/unsafe";
        client.getMpvStatus.mockResolvedValue(mpvStatus());
        playbackState.getPlayerState.mockResolvedValue(
            playerState("unsafe", "file:///tmp/movie.mkv")
        );
        addVideo();

        await expect(launchNativePlayerForCurrentRoute()).resolves.toBe(false);
        await vi.advanceTimersByTimeAsync(5_000);

        expect(playbackState.getPlayerState).toHaveBeenCalledTimes(1);
        expect(client.launchMpv).not.toHaveBeenCalled();
        expect(helpers.createToast).toHaveBeenCalledWith(
            "stremio-enhanced-mpv-launch-failed",
            "MPV playback unavailable",
            "Continuing in the built-in player.",
            "fail"
        );
    });
});
