import { readFileSync, writeFileSync } from "node:fs";
import {
    mkdtemp,
    mkdir,
    readFile,
    realpath,
    rm,
    stat,
    symlink,
    unlink,
    writeFile,
} from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";
import {
    listMpvDiscoveryCandidates,
    loadMpvStreamThroughIpc,
    MpvManager,
    type MpvExecFile,
    type MpvIpcLoader,
    type MpvLogger,
    type MpvManagerOptions,
    type MpvSpawn,
    type SpawnedMpvProcess,
    validateMpvCancelRequest,
    validateMpvLaunchRequest,
    validateMpvPreferences,
} from "./mpv";

class FakeMpvProcess implements SpawnedMpvProcess {
    readonly pid = 1234;
    readonly unref = vi.fn();
    readonly kill = vi.fn(() => true);
    private readonly listeners = new Map<string, Array<() => void>>();

    constructor(private readonly automaticEvent: "spawn" | "error" | "exit" | null = "spawn") {}

    once(event: "error" | "spawn" | "exit", listener: () => void): unknown {
        const listeners = this.listeners.get(event) ?? [];
        listeners.push(listener);
        this.listeners.set(event, listeners);
        if (this.automaticEvent === event) queueMicrotask(() => this.emit(event));
        return this;
    }

    emit(event: "error" | "spawn" | "exit"): void {
        const listeners = this.listeners.get(event) ?? [];
        this.listeners.delete(event);
        for (const listener of listeners) listener();
    }
}

describe("MPV discovery candidates", () => {
    it("ignores PATH and returns only conventional installation paths", () => {
        const candidates = listMpvDiscoveryCandidates("win32", {
            Path: '"C:\\Portable Tools\\bin";C:\\attacker-controlled',
            ProgramFiles: "C:\\Program Files",
            USERPROFILE: "C:\\Users\\viewer",
        });

        expect(candidates).not.toContainEqual({
            executablePath: "C:\\Portable Tools\\bin\\mpv.exe",
            source: "known-path",
        });
        expect(candidates).toContainEqual({
            executablePath: "C:\\Program Files\\mpv\\mpv.exe",
            source: "known-path",
        });
        expect(candidates).toContainEqual({
            executablePath: "C:\\Users\\viewer\\scoop\\apps\\mpv\\current\\mpv.exe",
            source: "known-path",
        });
        expect(listMpvDiscoveryCandidates("linux", {})).not.toContainEqual({
            executablePath: "/snap/bin/mpv",
            source: "known-path",
        });
    });
});

describe("MPV request validation", () => {
    it("accepts only an exact, bounded HTTP(S) launch request", () => {
        expect(validateMpvLaunchRequest({
            attemptId: "attempt-1",
            streamUrl: "https://stream.example/video?id=one%2Ftwo",
        })).toEqual({
            attemptId: "attempt-1",
            streamUrl: "https://stream.example/video?id=one%2Ftwo",
        });

        const invalidRequests: unknown[] = [
            null,
            [],
            { attemptId: "attempt-1", streamUrl: "file:///tmp/video" },
            { attemptId: "bad attempt", streamUrl: "https://example.test/video" },
            { attemptId: "attempt-1", streamUrl: "https://example.test/video\n--script=x" },
            { attemptId: "attempt-1", streamUrl: `https://example.test/${"a".repeat(8_193)}` },
            { attemptId: "attempt-1", streamUrl: "https://example.test/video", title: "not accepted" },
            { attemptId: "attempt-1", streamUrl: "https://example.test/video", useUserConfiguration: true },
        ];
        for (const request of invalidRequests) {
            expect(validateMpvLaunchRequest(request)).toBeNull();
        }

        const getterRequest = Object.create(null) as Record<string, unknown>;
        Object.defineProperties(getterRequest, {
            attemptId: { enumerable: true, value: "attempt-1" },
            streamUrl: {
                enumerable: true,
                get: () => "https://example.test/video",
            },
        });
        expect(validateMpvLaunchRequest(getterRequest)).toBeNull();
        expect(validateMpvCancelRequest({ attemptId: "attempt-1" })).toBe("attempt-1");
        expect(validateMpvCancelRequest({ attemptId: "bad attempt" })).toBeNull();
    });

    it("accepts only exact boolean preferences", () => {
        expect(validateMpvPreferences({
            enabled: true,
            useUserConfiguration: false,
        })).toEqual({
            enabled: true,
            useUserConfiguration: false,
        });
        expect(validateMpvPreferences({
            enabled: true,
            useUserConfiguration: false,
            executablePath: "/tmp/mpv",
        })).toBeNull();
        expect(validateMpvPreferences({
            enabled: "true",
            useUserConfiguration: false,
        })).toBeNull();
    });
});

describe("MPV JSON IPC loading", () => {
    it("sends one fixed loadfile command and waits for file-loaded", async () => {
        const directory = await mkdtemp(path.join(tmpdir(), "stremio-mpv-ipc-test-"));
        const endpoint = path.join(directory, "ipc.sock");
        const streamUrl = "https://stream.example/video?signature=private";
        let received: unknown = null;
        const server = createServer(socket => {
            let buffered = "";
            socket.setEncoding("utf8");
            socket.on("data", chunk => {
                buffered += chunk;
                const newline = buffered.indexOf("\n");
                if (newline < 0) return;
                received = JSON.parse(buffered.slice(0, newline));
                socket.write(
                    `${JSON.stringify({ request_id: 1, error: "success" })}\n`
                    + `${JSON.stringify({ event: "file-loaded" })}\n`,
                );
            });
        });
        await new Promise<void>((resolve, reject) => {
            server.once("error", reject);
            server.listen(endpoint, resolve);
        });

        try {
            await loadMpvStreamThroughIpc(
                endpoint,
                streamUrl,
                new AbortController().signal,
            );
            expect(received).toEqual({
                command: ["loadfile", streamUrl, "replace"],
                request_id: 1,
            });
        } finally {
            await new Promise<void>(resolve => server.close(() => resolve()));
            await rm(directory, { recursive: true, force: true });
        }
    });
});

describe("MpvManager", () => {
    let rootDirectory: string;
    let userDataDirectory: string;
    let ipcTemporaryDirectory: string;
    let binDirectory: string;
    let executablePath: string;
    let execFile: ReturnType<typeof vi.fn<MpvExecFile>>;
    let spawn: ReturnType<typeof vi.fn<MpvSpawn>>;
    let loadThroughIpc: ReturnType<typeof vi.fn<MpvIpcLoader>>;
    let logger: MpvLogger;
    let info: Mock<(message: string) => void>;
    let warn: Mock<(message: string) => void>;
    let error: Mock<(message: string) => void>;
    let tokenCounter: number;

    beforeEach(async () => {
        rootDirectory = await mkdtemp(path.join(tmpdir(), "stremio-enhanced-mpv-"));
        userDataDirectory = path.join(rootDirectory, "user-data");
        ipcTemporaryDirectory = path.join(
            "/tmp",
            `se-mpv-test-${path.basename(rootDirectory)}`,
        );
        await mkdir(ipcTemporaryDirectory, { recursive: true });
        binDirectory = path.join(rootDirectory, "bin");
        executablePath = path.join(binDirectory, "mpv");
        await mkdir(binDirectory, { recursive: true });
        await writeFile(executablePath, "test executable", "utf8");
        execFile = vi.fn<MpvExecFile>(async () => ({
            stdout: "mpv 0.39.0 Copyright mpv contributors\n",
            stderr: "",
        }));
        spawn = vi.fn<MpvSpawn>(() => new FakeMpvProcess());
        loadThroughIpc = vi.fn<MpvIpcLoader>(async () => undefined);
        info = vi.fn<(message: string) => void>();
        warn = vi.fn<(message: string) => void>();
        error = vi.fn<(message: string) => void>();
        logger = { info, warn, error };
        tokenCounter = 0;
    });

    afterEach(async () => {
        await rm(rootDirectory, { recursive: true, force: true });
        await rm(ipcTemporaryDirectory, { recursive: true, force: true });
    });

    function createManager(overrides: Partial<MpvManagerOptions> = {}): MpvManager {
        return new MpvManager({
            userDataDirectory,
            platform: "linux",
            environment: { PATH: binDirectory },
            execFile,
            spawn,
            logger,
            createTemporaryToken: () => `test-token-${++tokenCounter}`,
            launchCooldownMs: 0,
            temporaryDirectory: ipcTemporaryDirectory,
            loadThroughIpc,
            ...overrides,
        });
    }

    async function configureAndEnable(
        manager: MpvManager,
        useUserConfiguration: boolean = false,
    ): Promise<void> {
        await manager.configureExecutable(executablePath);
        await manager.setPreferences({ enabled: true, useUserConfiguration });
    }

    it("does not probe PATH or any executable before explicit opt-in", async () => {
        const status = await createManager().getStatus();

        expect(status).toEqual({
            available: false,
            version: null,
            source: null,
            message: "Native MPV playback is disabled.",
            preferences: {
                enabled: false,
                useUserConfiguration: false,
            },
        });
        expect(execFile).not.toHaveBeenCalled();
    });

    it("persists Main-owned preferences and a validated real path without exposing it", async () => {
        const selectedLink = path.join(rootDirectory, "selected-mpv");
        await symlink(executablePath, selectedLink);
        const resolvedExecutablePath = await realpath(executablePath);
        const manager = createManager();

        await manager.configureExecutable(selectedLink);
        const status = await manager.setPreferences({
            enabled: true,
            useUserConfiguration: true,
        });

        expect(status).toEqual({
            available: true,
            version: "0.39.0",
            source: "configured",
            message: null,
            preferences: {
                enabled: true,
                useUserConfiguration: true,
            },
        });
        expect(status).not.toHaveProperty("executablePath");

        const settingsPath = path.join(userDataDirectory, "native-player-mpv.json");
        expect(JSON.parse(await readFile(settingsPath, "utf8"))).toEqual({
            enabled: true,
            useUserConfiguration: true,
            executablePath: resolvedExecutablePath,
        });
        expect((await stat(settingsPath)).mode & 0o777).toBe(0o600);
    });

    it("serializes concurrent preference and executable mutations", async () => {
        const manager = createManager();

        await Promise.all([
            manager.configureExecutable(executablePath),
            manager.setPreferences({ enabled: true, useUserConfiguration: true }),
        ]);

        const settings = JSON.parse(await readFile(
            path.join(userDataDirectory, "native-player-mpv.json"),
            "utf8",
        ));
        expect(settings).toMatchObject({
            enabled: true,
            useUserConfiguration: true,
            executablePath: await realpath(executablePath),
        });
    });

    it("rejects a symlinked settings file without following it", async () => {
        const externalSettings = path.join(rootDirectory, "external.json");
        await writeFile(externalSettings, JSON.stringify({
            enabled: true,
            useUserConfiguration: true,
            executablePath,
        }));
        await mkdir(userDataDirectory, { recursive: true });
        await symlink(
            externalSettings,
            path.join(userDataDirectory, "native-player-mpv.json"),
        );

        const status = await createManager().getStatus();

        expect(status.preferences.enabled).toBe(false);
        expect(execFile).not.toHaveBeenCalled();
    });

    it("resets only the configured path and preserves Main-owned preferences", async () => {
        const manager = createManager();
        await configureAndEnable(manager, true);

        const status = await manager.resetConfiguredExecutable();

        expect(status.preferences).toEqual({
            enabled: true,
            useUserConfiguration: true,
        });
        const settings = JSON.parse(await readFile(
            path.join(userDataDirectory, "native-player-mpv.json"),
            "utf8",
        ));
        expect(settings.executablePath).toBeNull();
    });

    it("loads through private JSON IPC without putting URL or title in argv", async () => {
        const streamUrl = "https://stream.example/video?signature=secret";
        const child = new FakeMpvProcess();
        spawn.mockReturnValue(child);
        const manager = createManager();
        await configureAndEnable(manager);

        await expect(manager.launch({
            attemptId: "attempt-private",
            streamUrl,
        })).resolves.toEqual({
            success: true,
            message: null,
        });

        const args = spawn.mock.calls[0][1];
        expect(args.slice(0, 2)).toEqual(["--no-config", "--load-scripts=no"]);
        expect(args).toContain("--idle=once");
        expect(args).toContain("--force-window=yes");
        expect(args.some(argument => argument.startsWith("--input-ipc-server="))).toBe(true);
        expect(args.join(" ")).not.toContain(streamUrl);
        expect(args.join(" ")).not.toContain("title");
        expect(loadThroughIpc).toHaveBeenCalledWith(
            expect.stringContaining("ipc.sock"),
            streamUrl,
            expect.any(AbortSignal),
        );
        expect(child.unref).toHaveBeenCalledOnce();
        expect([...info.mock.calls, ...warn.mock.calls, ...error.mock.calls].flat().join(" "))
            .not.toContain(streamUrl);
    });

    it("loads normal MPV configuration only from Main-owned preferences", async () => {
        const manager = createManager();
        await configureAndEnable(manager, true);

        await manager.launch({
            attemptId: "attempt-config",
            streamUrl: "http://127.0.0.1:11470/video",
        });

        expect(spawn.mock.calls[0][1]).not.toContain("--no-config");
        expect(spawn.mock.calls[0][1]).not.toContain("--load-scripts=no");
        expect(spawn.mock.calls[0][1]).toContain("--idle=once");
    });

    it("keeps the macOS Unix socket path within the sun_path byte limit", async () => {
        let endpoint = "";
        loadThroughIpc.mockImplementation(async value => {
            endpoint = value;
        });
        const manager = createManager({
            platform: "darwin",
            temporaryDirectory: "/tmp",
            createTemporaryToken: () => "x".repeat(80),
        });
        await configureAndEnable(manager);

        await expect(manager.launch({
            attemptId: "attempt-macos-path",
            streamUrl: "https://stream.example/macos",
        })).resolves.toEqual({ success: true, message: null });

        expect(Buffer.byteLength(endpoint, "utf8")).toBeLessThanOrEqual(103);
        expect(endpoint.startsWith("/tmp/stremio-mpv-")).toBe(true);
    });

    it("rejects renderer-controlled configuration fields and unsafe URLs", async () => {
        const manager = createManager();
        await configureAndEnable(manager);

        await expect(manager.launch({
            attemptId: "attempt-extra-field",
            streamUrl: "https://stream.example/video",
            useUserConfiguration: true,
        })).resolves.toEqual({
            success: false,
            message: "Invalid native player request.",
        });
        await expect(manager.launch({
            attemptId: "attempt-unsafe",
            streamUrl: "ftp://private.example/secret",
        }))
            .resolves.toEqual({
                success: false,
                message: "Invalid native player request.",
            });
        expect(spawn).not.toHaveBeenCalled();
    });

    it("allows only one active or in-flight MPV process", async () => {
        const firstChild = new FakeMpvProcess(null);
        const secondChild = new FakeMpvProcess();
        let finishFirstLoad: (() => void) | undefined;
        loadThroughIpc
            .mockReturnValueOnce(new Promise<void>(resolve => {
                finishFirstLoad = resolve;
            }))
            .mockResolvedValue(undefined);
        spawn.mockReturnValueOnce(firstChild).mockReturnValueOnce(secondChild);
        const manager = createManager();
        await configureAndEnable(manager);

        const firstLaunch = manager.launch({
            attemptId: "attempt-one",
            streamUrl: "https://stream.example/one",
        });
        await vi.waitFor(() => expect(spawn).toHaveBeenCalledOnce());
        await expect(manager.launch({
            attemptId: "attempt-two",
            streamUrl: "https://stream.example/two",
        }))
            .resolves.toEqual({
                success: false,
                message: "MPV is already starting or running.",
            });
        finishFirstLoad?.();
        await expect(firstLaunch).resolves.toEqual({ success: true, message: null });

        await expect(manager.launch({
            attemptId: "attempt-two",
            streamUrl: "https://stream.example/two",
        }))
            .resolves.toEqual({
                success: false,
                message: "MPV is already starting or running.",
            });
        firstChild.emit("exit");
        await expect(manager.launch({
            attemptId: "attempt-two",
            streamUrl: "https://stream.example/two",
        }))
            .resolves.toEqual({ success: true, message: null });
        expect(spawn).toHaveBeenCalledTimes(2);
    });

    it("cancels only the matching pending launch before file-loaded", async () => {
        const child = new FakeMpvProcess(null);
        const nextChild = new FakeMpvProcess(null);
        spawn.mockReturnValueOnce(child).mockReturnValueOnce(nextChild);
        loadThroughIpc.mockImplementation((_endpoint, _url, signal) =>
            new Promise<void>((_resolve, reject) => {
                signal.addEventListener(
                    "abort",
                    () => reject(new Error("aborted")),
                    { once: true },
                );
            })
        );
        const manager = createManager();
        await configureAndEnable(manager);

        const launch = manager.launch({
            attemptId: "attempt-cancel",
            streamUrl: "https://stream.example/cancel",
        });
        await vi.waitFor(() => expect(spawn).toHaveBeenCalledOnce());

        await expect(manager.cancelLaunch({ attemptId: "different" }))
            .resolves.toBe(false);
        await expect(manager.cancelLaunch({ attemptId: "attempt-cancel" }))
            .resolves.toBe(true);
        await expect(launch).resolves.toEqual({
            success: false,
            message: "MPV launch was canceled.",
        });
        expect(child.kill).toHaveBeenCalled();
        expect(child.unref).not.toHaveBeenCalled();

        loadThroughIpc.mockResolvedValue(undefined);
        await expect(manager.launch({
            attemptId: "attempt-after-cancel",
            streamUrl: "https://stream.example/after-cancel",
        })).resolves.toEqual({ success: true, message: null });
        expect(nextChild.unref).toHaveBeenCalledOnce();
    });

    it("clears cooldown when canceled before executable resolution completes", async () => {
        const manager = createManager({ launchCooldownMs: 10_000 });
        await configureAndEnable(manager);

        const canceledLaunch = manager.launch({
            attemptId: "attempt-early-cancel",
            streamUrl: "https://stream.example/early-cancel",
        });
        const cancellation = manager.cancelLaunch({
            attemptId: "attempt-early-cancel",
        });

        await expect(canceledLaunch).resolves.toEqual({
            success: false,
            message: "MPV launch was canceled.",
        });
        await expect(cancellation).resolves.toBe(true);
        await expect(manager.launch({
            attemptId: "attempt-after-early-cancel",
            streamUrl: "https://stream.example/after-early-cancel",
        })).resolves.toEqual({ success: true, message: null });
    });

    it("refuses to spawn when the validated executable identity changes", async () => {
        let tokensCreated = 0;
        const manager = createManager({
            createTemporaryToken: () => {
                tokensCreated += 1;
                if (tokensCreated === 3) {
                    writeFileSync(executablePath, "replacement executable with new identity");
                }
                return `identity-token-${tokensCreated}`;
            },
        });
        await configureAndEnable(manager);

        await expect(manager.launch({
            attemptId: "attempt-identity",
            streamUrl: "https://stream.example/identity",
        })).resolves.toEqual({
            success: false,
            message: "MPV could not be launched.",
        });
        expect(spawn).not.toHaveBeenCalled();
        expect(loadThroughIpc).not.toHaveBeenCalled();
    });

    it("rate-limits rapid relaunches even after the prior process exits", async () => {
        let now = 10_000;
        const firstChild = new FakeMpvProcess();
        const secondChild = new FakeMpvProcess();
        spawn.mockReturnValueOnce(firstChild).mockReturnValueOnce(secondChild);
        const manager = createManager({
            now: () => now,
            launchCooldownMs: 2_000,
        });
        await configureAndEnable(manager);

        await manager.launch({
            attemptId: "attempt-one",
            streamUrl: "https://stream.example/one",
        });
        firstChild.emit("exit");
        await expect(manager.launch({
            attemptId: "attempt-two",
            streamUrl: "https://stream.example/two",
        }))
            .resolves.toEqual({
                success: false,
                message: "Please wait before starting MPV again.",
            });
        now += 2_001;
        await expect(manager.launch({
            attemptId: "attempt-two",
            streamUrl: "https://stream.example/two",
        }))
            .resolves.toEqual({ success: true, message: null });
    });

    it("treats an immediate process exit as a failed hand-off", async () => {
        const child = new FakeMpvProcess("exit");
        spawn.mockReturnValue(child);
        loadThroughIpc.mockImplementation((_endpoint, _url, signal) =>
            new Promise<void>((_resolve, reject) => {
                signal.addEventListener(
                    "abort",
                    () => reject(new Error("process stopped")),
                    { once: true },
                );
            })
        );
        const manager = createManager();
        await configureAndEnable(manager);

        await expect(manager.launch({
            attemptId: "attempt-exit",
            streamUrl: "https://stream.example/video",
        }))
            .resolves.toEqual({ success: false, message: "MPV could not be launched." });

        expect(child.unref).not.toHaveBeenCalled();
        expect(error).toHaveBeenCalledWith("MPV could not load the requested stream");
    });

    it("returns a generic error and removes IPC state when spawn throws", async () => {
        const streamUrl = "https://private.example/secret";
        spawn.mockImplementation(() => {
            throw new Error(`could not open ${streamUrl}`);
        });
        const manager = createManager();
        await configureAndEnable(manager);

        await expect(manager.launch({ attemptId: "attempt-spawn", streamUrl })).resolves.toEqual({
            success: false,
            message: "MPV could not be launched.",
        });

        expect(error).toHaveBeenCalledWith("MPV could not load the requested stream");
        expect(error.mock.calls.flat().join(" ")).not.toContain(streamUrl);
        const remainingFiles = readFileSync(
            path.join(userDataDirectory, "native-player-mpv.json"),
            "utf8",
        );
        expect(remainingFiles).not.toContain(streamUrl);
    });

    it("rejects non-files and executables without an MPV version", async () => {
        const manager = createManager();
        await unlink(executablePath);
        await mkdir(executablePath);
        await expect(manager.configureExecutable(executablePath))
            .rejects.toThrow("not a valid MPV executable");
        expect(execFile).not.toHaveBeenCalled();

        await rm(executablePath, { recursive: true });
        await writeFile(executablePath, "not mpv", "utf8");
        execFile.mockResolvedValue({ stdout: "a different program 1.0", stderr: "" });
        await expect(manager.configureExecutable(executablePath))
            .rejects.toThrow("not a valid MPV executable");
    });
});
