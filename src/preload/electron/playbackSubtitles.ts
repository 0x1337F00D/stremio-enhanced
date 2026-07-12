import { ipcRenderer } from "electron";
import { pathToFileURL } from "url";
import { IPC_CHANNELS } from "../../constants";
import ExtractedSubtitle from "../../interfaces/ExtractedSubtitle";
import Helpers from "../../utils/Helpers";
import PlaybackState from "../../utils/PlaybackState";
import { getLogger } from "../../utils/logger";

const logger = getLogger("PlaybackSubtitles");
const boundVideos = new WeakSet<HTMLVideoElement>();

function attachExternalSubtitles(
    video: HTMLVideoElement,
    subtitles: ExtractedSubtitle[]
): void {
    for (const subtitle of subtitles) {
        const track = document.createElement("track");
        track.kind = "subtitles";
        track.label = subtitle.descriptiveName;
        track.srclang = subtitle.shortLang;
        track.src = pathToFileURL(subtitle.path).toString();
        track.default = true;
        video.appendChild(track);
    }

    window.setTimeout(() => {
        for (const track of video.textTracks) track.mode = "disabled";
    }, 200);

    Helpers.createToast(
        "embeddedSubsToast",
        "Subtitles loaded",
        "Embedded subtitles loaded",
        "success"
    );
}

async function getStreamUrl(): Promise<string | null> {
    const playerState = await PlaybackState.getPlayerState();
    const url = playerState?.stream?.content?.url;
    if (typeof url !== "string" || !url) {
        logger.error("Failed to get player stream URL.");
        return null;
    }
    return url;
}

async function extractMissingSubtitles(video: HTMLVideoElement): Promise<void> {
    if (video.textTracks.length > 0) {
        logger.info("Embedded subtitles already loaded natively.");
        return;
    }

    const streamUrl = await getStreamUrl();
    if (!streamUrl) return;

    Helpers.createToast(
        "extractingAlertToast",
        "Extracting embedded subtitles...",
        "Extracting embedded subtitles, please wait.",
        "info"
    );

    const subtitles = await ipcRenderer.invoke(
        IPC_CHANNELS.EXTRACT_EMBEDDED_SUBTITLES,
        streamUrl
    ) as ExtractedSubtitle[];

    if (Array.isArray(subtitles) && subtitles.length > 0) {
        attachExternalSubtitles(video, subtitles);
        return;
    }

    Helpers.createToast(
        "noEmbeddedSubsToast",
        "No embedded subtitles found",
        "No embedded subtitles were found in this video.",
        "fail"
    );
}

export async function checkPlaybackSubtitles(): Promise<void> {
    if (!location.href.includes("#/player")) return;

    try {
        await Helpers.waitForElm("video");
    } catch (error) {
        logger.warn(`Video element was not ready: ${error}`);
        return;
    }

    const video = document.querySelector<HTMLVideoElement>("video");
    if (!video || boundVideos.has(video)) return;
    boundVideos.add(video);

    let extractionStarted = false;
    const onMetadata = (): void => {
        if (extractionStarted) return;
        extractionStarted = true;
        void extractMissingSubtitles(video).catch(error => {
            logger.error(`Failed to extract embedded subtitles: ${error}`);
        });
    };

    video.addEventListener("loadedmetadata", onMetadata, { once: true });
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) onMetadata();
}
