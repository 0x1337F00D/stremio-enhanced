import { beforeEach, describe, expect, it, vi } from "vitest";
import { join, resolve } from "path";
import EmbeddedSubtitles from "./EmbeddedSubtitles";

const mocks = vi.hoisted(() => ({
    spawn: vi.fn(),
    existsSync: vi.fn(() => true),
    mkdirSync: vi.fn(),
    readdirSync: vi.fn(() => [] as string[]),
    unlinkSync: vi.fn(),
    logger: {
        info: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
    },
}));

vi.mock("child_process", () => ({ spawn: mocks.spawn }));
vi.mock("fs", () => ({
    existsSync: mocks.existsSync,
    mkdirSync: mocks.mkdirSync,
    readdirSync: mocks.readdirSync,
    unlinkSync: mocks.unlinkSync,
}));
vi.mock("../core/Properties", () => ({
    default: {
        isUsingStremioService: false,
        enhancedPath: "/mock/enhanced",
    },
}));
vi.mock("./StremioService", () => ({
    default: { findExecutable: vi.fn(() => "/mock/stremio/stremio-server") },
}));
vi.mock("./logger", () => ({ getLogger: () => mocks.logger }));

function probeProcess(streams: unknown[], exitCode = 0) {
    return {
        stdout: {
            async *[Symbol.asyncIterator]() {
                yield JSON.stringify({ streams });
            },
        },
        on: vi.fn((event: string, callback: (code: number) => void) => {
            if (event === "close") callback(exitCode);
        }),
    };
}

function ffmpegProcess(exitCode = 0) {
    return {
        on: vi.fn((event: string, callback: (value: number | Error) => void) => {
            if (event === "close") callback(exitCode);
        }),
    };
}

describe("EmbeddedSubtitles.extractSubtitles", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mocks.existsSync.mockReturnValue(true);
        mocks.readdirSync.mockReturnValue([]);
    });

    it("falls back to track names when subtitle metadata is incomplete", async () => {
        mocks.spawn
            .mockReturnValueOnce(probeProcess([
                { index: 0, codec_type: "subtitle", codec_name: "webvtt" },
                {
                    index: 1,
                    codec_type: "subtitle",
                    codec_name: "subrip",
                    tags: { language: "eng" },
                },
            ]))
            .mockReturnValueOnce(ffmpegProcess())
            .mockReturnValueOnce(ffmpegProcess());

        const result = await EmbeddedSubtitles.extractSubtitles("https://example.test/video.mkv");
        const targetDir = resolve("/mock/enhanced/streamingserver", "subtitles");

        expect(result).toEqual([
            {
                shortLang: "track0",
                descriptiveName: "track0",
                path: join(targetDir, "subs_track0_0.vtt"),
            },
            {
                shortLang: "eng",
                descriptiveName: "eng",
                path: join(targetDir, "subs_eng_1.vtt"),
            },
        ]);

        const nativeArgs = mocks.spawn.mock.calls[1]?.[1] as string[];
        const convertedArgs = mocks.spawn.mock.calls[2]?.[1] as string[];
        expect(nativeArgs).toEqual(expect.arrayContaining(["-c", "copy"]));
        expect(convertedArgs).toEqual(expect.arrayContaining(["-c:s", "webvtt"]));
    });

    it("returns an empty list when ffprobe finds no subtitle streams", async () => {
        mocks.spawn.mockReturnValueOnce(probeProcess([]));

        await expect(EmbeddedSubtitles.extractSubtitles("https://example.test/video.mkv"))
            .resolves.toEqual([]);
        expect(mocks.spawn).toHaveBeenCalledTimes(1);
    });

    it("rejects when ffprobe exits unsuccessfully", async () => {
        mocks.spawn.mockReturnValueOnce(probeProcess([], 1));

        await expect(EmbeddedSubtitles.extractSubtitles("https://example.test/video.mkv"))
            .rejects.toThrow("ffprobe failed");
    });
});
