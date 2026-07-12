import Helpers from "../../utils/Helpers";
import PlaybackState from "../../utils/PlaybackState";
import { getLogger } from "../../utils/logger";
import nativePlayerClient from "./nativePlayerClient";

const logger = getLogger("NativePlayerPlayback");
const STATUS_TIMEOUT_MS = 5_000;
const VIDEO_ATTEMPT_TIMEOUT_MS = 800;
const PLAYER_STATE_ATTEMPT_TIMEOUT_MS = 1_000;
const READINESS_RETRY_DELAY_MS = 300;
const MAX_READINESS_ATTEMPTS = 4;
const LAUNCH_TIMEOUT_MS = 15_000;

interface PlayerRoute {
    readonly type: string;
    readonly metaId: string;
    readonly videoId: string;
}

interface RouteGeneration {
    readonly route: string;
    readonly generation: number;
    readonly playerRoute: PlayerRoute | null;
}

interface RouteAttempt extends RouteGeneration {
    readonly attemptId: string;
    launchPending: boolean;
    cancelRequested: boolean;
    result: Promise<boolean>;
}

interface ScheduledRetry {
    readonly generation: number;
    readonly timerId: number;
    readonly resolve: (shouldContinue: boolean) => void;
}

type BoundedResult<T> =
    | { readonly ok: true; readonly value: T }
    | { readonly ok: false };

let observedRoute = "";
let routeGeneration = 0;
let fallbackAttemptSequence = 0;
let activeAttempt: RouteAttempt | null = null;
let scheduledRetry: ScheduledRetry | null = null;
let cancellationBarrier: Promise<void> = Promise.resolve();

function hasControlCharacters(value: string): boolean {
    for (const character of value) {
        const codePoint = character.codePointAt(0) ?? 0;
        if (
            codePoint <= 0x1f ||
            (codePoint >= 0x7f && codePoint <= 0x9f) ||
            codePoint === 0x2028 ||
            codePoint === 0x2029
        ) {
            return true;
        }
    }
    return false;
}

function decodeRouteSegment(rawValue: string, maximumLength: number): string | null {
    try {
        const value = decodeURIComponent(rawValue);
        return value.length > 0 && value.length <= maximumLength && !hasControlCharacters(value)
            ? value
            : null;
    } catch {
        return null;
    }
}

function parsePlayerRoute(hash: string): PlayerRoute | null {
    if (!hash.startsWith("#/player/")) return null;
    const pathOnly = hash.slice("#/player/".length).split("?", 1)[0];
    const segments = pathOnly.split("/");

    // Stremio Web's current route is:
    // /player/:stream/:streamTransport/:metaTransport/:type/:id/:videoId
    if (segments.length === 6) {
        const type = decodeRouteSegment(segments[3], 64);
        const metaId = decodeRouteSegment(segments[4], 512);
        const videoId = decodeRouteSegment(segments[5], 512);
        return type && metaId && videoId
            ? { type: type.toLowerCase(), metaId, videoId }
            : null;
    }

    // Keep compatibility with the older two-segment v5 route.
    if (segments.length === 2) {
        const type = decodeRouteSegment(segments[0], 64);
        const videoId = decodeRouteSegment(segments[1], 512);
        if (!type || !videoId) return null;
        const normalizedType = type.toLowerCase();
        const metaId = normalizedType === "series"
            ? videoId.split(":", 1)[0]
            : videoId;
        return { type: normalizedType, metaId, videoId };
    }
    return null;
}

function playerStateMatchesRoute(
    playerRoute: PlayerRoute,
    playerState: Awaited<ReturnType<typeof PlaybackState.getPlayerState>>
): boolean {
    const metaId = playerState?.metaDetails?.id;
    if (
        typeof metaId !== "string" ||
        metaId.length === 0 ||
        metaId.length > 512 ||
        hasControlCharacters(metaId)
    ) {
        return false;
    }
    if (playerRoute.metaId !== metaId) return false;
    if (playerRoute.type !== "series") {
        return playerRoute.videoId === metaId;
    }
    const season = playerState?.seriesInfoDetails?.season;
    const episode = playerState?.seriesInfoDetails?.episode;
    return Number.isInteger(season)
        && Number.isInteger(episode)
        && playerRoute.videoId === `${metaId}:${season}:${episode}`;
}

function createAttemptId(): string {
    if (typeof globalThis.crypto?.randomUUID === "function") {
        return globalThis.crypto.randomUUID();
    }
    fallbackAttemptSequence += 1;
    return `attempt_${Date.now().toString(36)}_${fallbackAttemptSequence.toString(36)}`;
}

function cancelScheduledRetry(): void {
    const retry = scheduledRetry;
    if (!retry) return;
    scheduledRetry = null;
    window.clearTimeout(retry.timerId);
    retry.resolve(false);
}

function cancelPendingLaunch(attempt: RouteAttempt): Promise<void> {
    if (attempt.cancelRequested) return cancellationBarrier;
    attempt.cancelRequested = true;
    const cancellation = async (): Promise<void> => {
        try {
            await nativePlayerClient.cancelMpvLaunch({
                attemptId: attempt.attemptId,
            });
        } catch (error) {
            logger.warn(`Failed to cancel a stale MPV launch: ${error}`);
        }
    };
    cancellationBarrier = cancellationBarrier.then(cancellation, cancellation);
    return cancellationBarrier;
}

function observeRoute(): RouteGeneration {
    const route = location.href;
    if (route !== observedRoute) {
        const previousAttempt = activeAttempt;
        observedRoute = route;
        routeGeneration += 1;
        cancelScheduledRetry();
        activeAttempt = null;
        if (previousAttempt?.launchPending) cancelPendingLaunch(previousAttempt);
    }
    return {
        route,
        generation: routeGeneration,
        playerRoute: parsePlayerRoute(location.hash),
    };
}

function isCurrentRoute(attempt: RouteGeneration): boolean {
    return (
        attempt.generation === routeGeneration &&
        attempt.route === observedRoute &&
        attempt.route === location.href
    );
}

async function settleWithin<T>(
    promise: Promise<T>,
    timeoutMs: number
): Promise<BoundedResult<T>> {
    let timeoutId: number | undefined;
    const timeout = new Promise<BoundedResult<T>>(resolve => {
        timeoutId = window.setTimeout(() => resolve({ ok: false }), timeoutMs);
    });
    const guarded: Promise<BoundedResult<T>> = promise
        .then(value => ({ ok: true as const, value }))
        .catch(() => ({ ok: false as const }));

    try {
        return await Promise.race([guarded, timeout]);
    } finally {
        if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    }
}

function isHttpStreamUrl(rawUrl: unknown): rawUrl is string {
    if (typeof rawUrl !== "string" || rawUrl.length === 0) return false;
    try {
        const parsed = new URL(rawUrl);
        return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
        return false;
    }
}

function showLaunchFailure(): void {
    void Helpers.createToast(
        "stremio-enhanced-mpv-launch-failed",
        "MPV playback unavailable",
        "Continuing in the built-in player.",
        "fail"
    );
}

async function waitForVideo(): Promise<HTMLVideoElement | null> {
    const existingVideo = document.querySelector<HTMLVideoElement>("video");
    if (existingVideo) return existingVideo;

    const result = await settleWithin(
        Helpers.waitForElm("video", VIDEO_ATTEMPT_TIMEOUT_MS),
        VIDEO_ATTEMPT_TIMEOUT_MS
    );
    return result.ok && result.value instanceof HTMLVideoElement
        ? result.value
        : null;
}

function waitForReadinessRetry(attempt: RouteAttempt): Promise<boolean> {
    if (!isCurrentRoute(attempt)) return Promise.resolve(false);
    return new Promise(resolve => {
        const timerId = window.setTimeout(() => {
            if (
                scheduledRetry?.generation === attempt.generation &&
                scheduledRetry.timerId === timerId
            ) {
                scheduledRetry = null;
            }
            resolve(isCurrentRoute(attempt));
        }, READINESS_RETRY_DELAY_MS);
        scheduledRetry = {
            generation: attempt.generation,
            timerId,
            resolve,
        };
    });
}

async function performLaunch(attempt: RouteAttempt): Promise<boolean> {
    await cancellationBarrier;
    if (!isCurrentRoute(attempt)) return false;
    const statusResult = await settleWithin(
        nativePlayerClient.getMpvStatus(),
        STATUS_TIMEOUT_MS
    );
    if (!isCurrentRoute(attempt)) return false;
    if (!statusResult.ok) {
        logger.warn("MPV status was not ready in time; using the built-in player.");
        return false;
    }
    if (!statusResult.value.preferences.enabled) return false;
    if (!statusResult.value.available) {
        showLaunchFailure();
        return false;
    }
    if (!attempt.playerRoute) return false;

    for (let readinessAttempt = 0; readinessAttempt < MAX_READINESS_ATTEMPTS; readinessAttempt++) {
        const video = await waitForVideo();
        if (!isCurrentRoute(attempt)) return false;

        if (video) {
            const playerStateResult = await settleWithin(
                PlaybackState.getPlayerState(),
                PLAYER_STATE_ATTEMPT_TIMEOUT_MS
            );
            if (!isCurrentRoute(attempt)) return false;

            if (
                playerStateResult.ok &&
                playerStateResult.value &&
                playerStateMatchesRoute(
                    attempt.playerRoute,
                    playerStateResult.value
                )
            ) {
                const streamUrl = playerStateResult.value.stream?.content?.url;
                if (typeof streamUrl === "string" && streamUrl.length > 0) {
                    if (!isHttpStreamUrl(streamUrl)) {
                        logger.warn("MPV launch rejected an unsafe stream URL.");
                        showLaunchFailure();
                        return false;
                    }

                    attempt.launchPending = true;
                    const launchResult = await settleWithin(
                        nativePlayerClient.launchMpv({
                            attemptId: attempt.attemptId,
                            streamUrl,
                        }),
                        LAUNCH_TIMEOUT_MS
                    );
                    if (!launchResult.ok) await cancelPendingLaunch(attempt);
                    attempt.launchPending = false;
                    if (!isCurrentRoute(attempt)) return false;
                    if (!launchResult.ok || !launchResult.value.success) {
                        logger.warn("The main process declined or timed out the MPV launch request.");
                        showLaunchFailure();
                        return false;
                    }

                    try {
                        video.pause();
                    } catch (error) {
                        logger.warn(`Failed to pause the built-in player: ${error}`);
                    }
                    window.history.back();
                    return true;
                }
            }
        }

        if (readinessAttempt + 1 < MAX_READINESS_ATTEMPTS) {
            const shouldRetry = await waitForReadinessRetry(attempt);
            if (!shouldRetry) return false;
        }
    }

    logger.warn("MPV playback state did not become ready; using the built-in player.");
    return false;
}

/**
 * Attempts one cancellable MPV hand-off for the current player-route generation.
 */
export function launchNativePlayerForCurrentRoute(): Promise<boolean> {
    const route = observeRoute();
    if (!route.playerRoute) return Promise.resolve(false);
    if (
        activeAttempt?.route === route.route &&
        activeAttempt.generation === route.generation
    ) {
        return activeAttempt.result;
    }

    const attempt: RouteAttempt = {
        ...route,
        attemptId: createAttemptId(),
        launchPending: false,
        cancelRequested: false,
        result: Promise.resolve(false),
    };
    attempt.result = performLaunch(attempt);
    activeAttempt = attempt;
    return attempt.result;
}
