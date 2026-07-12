import { execFile as nodeExecFile, spawn as nodeSpawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { constants as fileSystemConstants } from "node:fs";
import * as nodeFileSystem from "node:fs/promises";
import { createConnection, type Socket } from "node:net";
import { tmpdir } from "node:os";
import path from "node:path";
import type {
    MpvLaunchResult,
    MpvPreferences,
    MpvStatus,
} from "../interfaces/NativePlayer";

const SETTINGS_FILE_NAME = "native-player-mpv.json";
const MAX_SETTINGS_BYTES = 4 * 1024;
const MAX_VERSION_OUTPUT_BYTES = 64 * 1024;
const VERSION_TIMEOUT_MS = 3_000;
const MAX_STREAM_URL_LENGTH = 8_192;
const DEFAULT_LAUNCH_COOLDOWN_MS = 2_000;
const EXECUTABLE_CACHE_MS = 10_000;
const MPV_IPC_TIMEOUT_MS = 10_000;
const MPV_IPC_RETRY_MS = 50;
const MAX_IPC_MESSAGE_BYTES = 1024 * 1024;
const MAX_UNIX_SOCKET_PATH_BYTES = 103;
const MPV_VERSION_PATTERN = /(?:^|\r?\n)\s*mpv\s+(?:v)?(\d+(?:\.\d+){1,3})\b/i;
type PlatformPath = typeof path.posix;

export interface MpvLogger {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}

interface FileStat {
    readonly size: number;
    readonly mode: number;
    readonly dev: number;
    readonly ino: number;
    readonly mtimeMs: number;
    isFile(): boolean;
}

export interface MpvFileHandle {
    stat(): Promise<FileStat>;
    read(
        buffer: Uint8Array,
        offset: number,
        length: number,
        position: number,
    ): Promise<{ bytesRead: number }>;
    close(): Promise<void>;
}

export interface MpvFileSystem {
    stat(filePath: string): Promise<FileStat>;
    realpath(filePath: string): Promise<string>;
    open(filePath: string, flags: number): Promise<MpvFileHandle>;
    mkdir(
        directoryPath: string,
        options: { recursive: boolean; mode: number },
    ): Promise<unknown>;
    writeFile(
        filePath: string,
        contents: string,
        options: { encoding: "utf8"; flag: "wx"; mode: number },
    ): Promise<unknown>;
    rename(oldPath: string, newPath: string): Promise<void>;
    unlink(filePath: string): Promise<void>;
    chmod(filePath: string, mode: number): Promise<void>;
    rmdir(directoryPath: string): Promise<void>;
}

export interface ExecFileOptions {
    readonly encoding: "utf8";
    readonly maxBuffer: number;
    readonly shell: false;
    readonly timeout: number;
    readonly windowsHide: true;
}

export type MpvExecFile = (
    executablePath: string,
    args: readonly string[],
    options: ExecFileOptions,
) => Promise<{ stdout: string; stderr: string }>;

export interface SpawnedMpvProcess {
    readonly pid?: number;
    unref(): void;
    kill(): boolean;
    once(event: "error" | "spawn" | "exit", listener: () => void): unknown;
}

export interface MpvSpawnOptions {
    readonly detached: true;
    readonly shell: false;
    readonly stdio: "ignore";
    readonly windowsHide: true;
}

export type MpvSpawn = (
    executablePath: string,
    args: readonly string[],
    options: MpvSpawnOptions,
) => SpawnedMpvProcess;

export type MpvIpcLoader = (
    endpoint: string,
    streamUrl: string,
    signal: AbortSignal,
) => Promise<void>;

export interface MpvManagerOptions {
    readonly userDataDirectory: string;
    readonly platform?: NodeJS.Platform;
    readonly environment?: Readonly<NodeJS.ProcessEnv>;
    readonly fileSystem?: MpvFileSystem;
    readonly execFile?: MpvExecFile;
    readonly spawn?: MpvSpawn;
    readonly logger?: MpvLogger;
    readonly createTemporaryToken?: () => string;
    readonly now?: () => number;
    readonly launchCooldownMs?: number;
    readonly temporaryDirectory?: string;
    readonly loadThroughIpc?: MpvIpcLoader;
}

interface PersistedMpvSettings extends MpvPreferences {
    readonly executablePath: string | null;
}

interface ValidMpvExecutable {
    readonly executablePath: string;
    readonly version: string;
    readonly identity: ExecutableIdentity;
}

interface ExecutableIdentity {
    readonly dev: number;
    readonly ino: number;
    readonly size: number;
    readonly mtimeMs: number;
}

interface ResolvedMpvExecutable {
    readonly executable: ValidMpvExecutable | null;
    readonly source: "configured" | "known-path" | null;
    readonly message: string | null;
}

interface DiscoveryCandidate {
    readonly executablePath: string;
    readonly source: "known-path";
}

interface ValidatedLaunchRequest {
    readonly attemptId: string;
    readonly streamUrl: string;
}

interface PendingMpvLaunch {
    readonly attemptId: string;
    readonly controller: AbortController;
    readonly finished: Promise<void>;
    readonly resolveFinished: () => void;
    child: SpawnedMpvProcess | null;
}

interface MpvIpcEndpoint {
    readonly endpoint: string;
    readonly directory: string | null;
}

const silentLogger: MpvLogger = {
    info: () => undefined,
    warn: () => undefined,
    error: () => undefined,
};

function defaultSettings(): PersistedMpvSettings {
    return {
        enabled: false,
        useUserConfiguration: false,
        executablePath: null,
    };
}

const defaultFileSystem: MpvFileSystem = {
    stat: async filePath => nodeFileSystem.stat(filePath),
    realpath: async filePath => nodeFileSystem.realpath(filePath),
    open: async (filePath, flags) => {
        const handle = await nodeFileSystem.open(filePath, flags);
        return {
            stat: async () => handle.stat(),
            read: async (buffer, offset, length, position) => {
                const result = await handle.read(buffer, offset, length, position);
                return { bytesRead: result.bytesRead };
            },
            close: async () => handle.close(),
        };
    },
    mkdir: async (directoryPath, options) => nodeFileSystem.mkdir(directoryPath, options),
    writeFile: async (filePath, contents, options) => {
        await nodeFileSystem.writeFile(filePath, contents, options);
    },
    rename: async (oldPath, newPath) => nodeFileSystem.rename(oldPath, newPath),
    unlink: async filePath => nodeFileSystem.unlink(filePath),
    chmod: async (filePath, mode) => nodeFileSystem.chmod(filePath, mode),
    rmdir: async directoryPath => nodeFileSystem.rmdir(directoryPath),
};

const defaultExecFile: MpvExecFile = (executablePath, args, options) =>
    new Promise((resolve, reject) => {
        nodeExecFile(executablePath, [...args], options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }
            resolve({ stdout, stderr });
        });
    });

const defaultSpawn: MpvSpawn = (executablePath, args, options) =>
    nodeSpawn(executablePath, [...args], options);

function cancellationError(): Error {
    return new Error("MPV launch was canceled");
}

function waitForRetry(signal: AbortSignal, delayMs: number): Promise<void> {
    return new Promise((resolve, reject) => {
        if (signal.aborted) {
            reject(cancellationError());
            return;
        }
        const timer = setTimeout(() => {
            signal.removeEventListener("abort", onAbort);
            resolve();
        }, delayMs);
        const onAbort = (): void => {
            clearTimeout(timer);
            reject(cancellationError());
        };
        signal.addEventListener("abort", onAbort, { once: true });
    });
}

function connectToMpvIpc(endpoint: string, signal: AbortSignal): Promise<Socket> {
    return new Promise((resolve, reject) => {
        if (signal.aborted) {
            reject(cancellationError());
            return;
        }
        const socket = createConnection(endpoint);
        let settled = false;
        const cleanup = (): void => {
            signal.removeEventListener("abort", onAbort);
            socket.removeListener("connect", onConnect);
            socket.removeListener("error", onError);
        };
        const settle = (result: "connect" | "error"): void => {
            if (settled) return;
            settled = true;
            cleanup();
            if (result === "connect") {
                resolve(socket);
            } else {
                socket.destroy();
                reject(new Error("MPV IPC is not ready"));
            }
        };
        const onConnect = (): void => settle("connect");
        const onError = (): void => settle("error");
        const onAbort = (): void => {
            socket.destroy();
            settle("error");
        };
        socket.once("connect", onConnect);
        socket.once("error", onError);
        signal.addEventListener("abort", onAbort, { once: true });
    });
}

async function connectToMpvIpcWithRetry(
    endpoint: string,
    signal: AbortSignal,
    deadline: number,
): Promise<Socket> {
    while (Date.now() < deadline) {
        if (signal.aborted) throw cancellationError();
        try {
            return await connectToMpvIpc(endpoint, signal);
        } catch {
            if (signal.aborted) throw cancellationError();
            const remaining = deadline - Date.now();
            if (remaining <= 0) break;
            await waitForRetry(signal, Math.min(MPV_IPC_RETRY_MS, remaining));
        }
    }
    throw new Error("MPV IPC connection timed out");
}

function requestMpvFileLoad(
    socket: Socket,
    streamUrl: string,
    signal: AbortSignal,
    deadline: number,
): Promise<void> {
    return new Promise((resolve, reject) => {
        let settled = false;
        let responseAccepted = false;
        let fileLoaded = false;
        let buffered = "";
        const timeout = setTimeout(
            () => settle(new Error("MPV did not load the stream in time")),
            Math.max(1, deadline - Date.now()),
        );
        const cleanup = (): void => {
            clearTimeout(timeout);
            signal.removeEventListener("abort", onAbort);
            socket.removeListener("data", onData);
            socket.removeListener("error", onError);
            socket.removeListener("close", onClose);
        };
        const settle = (error?: Error): void => {
            if (settled) return;
            settled = true;
            cleanup();
            socket.destroy();
            if (error) reject(error);
            else resolve();
        };
        const maybeComplete = (): void => {
            if (responseAccepted && fileLoaded) settle();
        };
        const processMessage = (rawLine: string): void => {
            if (!rawLine.trim()) return;
            let message: unknown;
            try {
                message = JSON.parse(rawLine);
            } catch {
                settle(new Error("MPV returned malformed IPC data"));
                return;
            }
            if (typeof message !== "object" || message === null || Array.isArray(message)) {
                return;
            }
            const record = message as Record<string, unknown>;
            if (record.request_id === 1) {
                if (record.error !== "success") {
                    settle(new Error("MPV rejected the stream"));
                    return;
                }
                responseAccepted = true;
            }
            if (record.event === "file-loaded") fileLoaded = true;
            if (record.event === "end-file" && !fileLoaded) {
                settle(new Error("MPV ended the stream before it loaded"));
                return;
            }
            maybeComplete();
        };
        const onData = (chunk: Buffer | string): void => {
            buffered += typeof chunk === "string" ? chunk : chunk.toString("utf8");
            if (Buffer.byteLength(buffered, "utf8") > MAX_IPC_MESSAGE_BYTES) {
                settle(new Error("MPV IPC message exceeded the size limit"));
                return;
            }
            let newlineIndex = buffered.indexOf("\n");
            while (newlineIndex >= 0 && !settled) {
                const line = buffered.slice(0, newlineIndex);
                buffered = buffered.slice(newlineIndex + 1);
                processMessage(line);
                newlineIndex = buffered.indexOf("\n");
            }
        };
        const onError = (): void => settle(new Error("MPV IPC failed"));
        const onClose = (): void => settle(new Error("MPV IPC closed before loading"));
        const onAbort = (): void => settle(cancellationError());

        socket.setEncoding("utf8");
        socket.on("data", onData);
        socket.once("error", onError);
        socket.once("close", onClose);
        signal.addEventListener("abort", onAbort, { once: true });
        socket.write(`${JSON.stringify({
            command: ["loadfile", streamUrl, "replace"],
            request_id: 1,
        })}\n`);
    });
}

export async function loadMpvStreamThroughIpc(
    endpoint: string,
    streamUrl: string,
    signal: AbortSignal,
): Promise<void> {
    const deadline = Date.now() + MPV_IPC_TIMEOUT_MS;
    const socket = await connectToMpvIpcWithRetry(endpoint, signal, deadline);
    await requestMpvFileLoad(socket, streamUrl, signal, deadline);
}

function hasErrorCode(error: unknown, ...codes: readonly string[]): boolean {
    return error instanceof Error && "code" in error
        && typeof error.code === "string" && codes.includes(error.code);
}

function isMissingFileError(error: unknown): boolean {
    return hasErrorCode(error, "ENOENT");
}

function getPathImplementation(platform: NodeJS.Platform): PlatformPath {
    return platform === "win32" ? path.win32 : path.posix;
}

function getEnvironmentValue(
    environment: Readonly<NodeJS.ProcessEnv>,
    name: string,
    platform: NodeJS.Platform,
): string | undefined {
    const directValue = environment[name];
    if (directValue !== undefined || platform !== "win32") {
        return directValue;
    }

    const matchingName = Object.keys(environment).find(
        environmentName => environmentName.toLowerCase() === name.toLowerCase(),
    );
    return matchingName === undefined ? undefined : environment[matchingName];
}

function containsControlCharacters(value: string): boolean {
    for (const character of value) {
        const codePoint = character.codePointAt(0) ?? 0;
        if (
            codePoint <= 0x1f
            || (codePoint >= 0x7f && codePoint <= 0x9f)
            || codePoint === 0x2028
            || codePoint === 0x2029
        ) {
            return true;
        }
    }
    return false;
}

function appendKnownPath(
    candidates: DiscoveryCandidate[],
    pathImplementation: PlatformPath,
    ...segments: Array<string | undefined>
): void {
    if (segments.some(segment => segment === undefined || segment.length === 0)) {
        return;
    }

    const candidate = pathImplementation.join(...segments as string[]);
    if (pathImplementation.isAbsolute(candidate)) {
        candidates.push({ executablePath: candidate, source: "known-path" });
    }
}

/**
 * Returns only conventional installation paths. PATH is intentionally ignored:
 * probing a PATH entry would execute an arbitrary same-named file before the
 * application had established its identity.
 */
export function listMpvDiscoveryCandidates(
    platform: NodeJS.Platform,
    environment: Readonly<NodeJS.ProcessEnv>,
): readonly DiscoveryCandidate[] {
    const pathImplementation = getPathImplementation(platform);
    const candidates: DiscoveryCandidate[] = [];

    if (platform === "win32") {
        appendKnownPath(
            candidates,
            pathImplementation,
            getEnvironmentValue(environment, "ProgramFiles", platform),
            "mpv",
            "mpv.exe",
        );
        appendKnownPath(
            candidates,
            pathImplementation,
            getEnvironmentValue(environment, "ProgramFiles(x86)", platform),
            "mpv",
            "mpv.exe",
        );
        appendKnownPath(
            candidates,
            pathImplementation,
            getEnvironmentValue(environment, "USERPROFILE", platform),
            "scoop",
            "apps",
            "mpv",
            "current",
            "mpv.exe",
        );
        appendKnownPath(
            candidates,
            pathImplementation,
            getEnvironmentValue(environment, "ProgramData", platform),
            "chocolatey",
            "bin",
            "mpv.exe",
        );
    } else if (platform === "darwin") {
        candidates.push(
            { executablePath: "/opt/homebrew/bin/mpv", source: "known-path" },
            { executablePath: "/usr/local/bin/mpv", source: "known-path" },
            {
                executablePath: "/Applications/mpv.app/Contents/MacOS/mpv",
                source: "known-path",
            },
        );
    } else if (platform === "linux") {
        candidates.push(
            { executablePath: "/usr/local/bin/mpv", source: "known-path" },
            { executablePath: "/usr/bin/mpv", source: "known-path" },
        );
    }

    const seen = new Set<string>();
    return candidates.filter(candidate => {
        const key = platform === "win32"
            ? candidate.executablePath.toLowerCase()
            : candidate.executablePath;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
}

function isExactDataObject(
    value: unknown,
    expectedKeys: readonly string[],
): value is Record<string, unknown> {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) return false;

    const ownKeys = Reflect.ownKeys(value);
    if (ownKeys.some(key => typeof key !== "string")) return false;
    const actualKeys = (ownKeys as string[]).sort();
    const sortedExpectedKeys = [...expectedKeys].sort();
    if (
        actualKeys.length !== sortedExpectedKeys.length
        || actualKeys.some((key, index) => key !== sortedExpectedKeys[index])
    ) {
        return false;
    }

    const descriptors = Object.getOwnPropertyDescriptors(value);
    return expectedKeys.every(key => {
        const descriptor = descriptors[key];
        return Boolean(descriptor && "value" in descriptor && descriptor.enumerable);
    });
}

export function validateMpvPreferences(value: unknown): MpvPreferences | null {
    if (!isExactDataObject(value, ["enabled", "useUserConfiguration"])) {
        return null;
    }
    if (
        typeof value.enabled !== "boolean"
        || typeof value.useUserConfiguration !== "boolean"
    ) {
        return null;
    }
    return {
        enabled: value.enabled,
        useUserConfiguration: value.useUserConfiguration,
    };
}

export function validateMpvLaunchRequest(request: unknown): ValidatedLaunchRequest | null {
    if (!isExactDataObject(request, ["attemptId", "streamUrl"])) return null;
    const attemptId = request.attemptId;
    const streamUrl = request.streamUrl;
    if (
        typeof attemptId !== "string"
        || !/^[a-zA-Z0-9_-]{1,128}$/.test(attemptId)
        || typeof streamUrl !== "string"
        || streamUrl.length === 0
        || streamUrl.length > MAX_STREAM_URL_LENGTH
        || containsControlCharacters(streamUrl)
    ) {
        return null;
    }

    try {
        const parsedUrl = new URL(streamUrl);
        if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
            return null;
        }
    } catch {
        return null;
    }
    return { attemptId, streamUrl };
}

export function validateMpvCancelRequest(value: unknown): string | null {
    if (!isExactDataObject(value, ["attemptId"])) return null;
    return typeof value.attemptId === "string"
        && /^[a-zA-Z0-9_-]{1,128}$/.test(value.attemptId)
        ? value.attemptId
        : null;
}

export class MpvManager {
    private readonly platform: NodeJS.Platform;
    private readonly environment: Readonly<NodeJS.ProcessEnv>;
    private readonly fileSystem: MpvFileSystem;
    private readonly execFile: MpvExecFile;
    private readonly spawn: MpvSpawn;
    private readonly logger: MpvLogger;
    private readonly createTemporaryToken: () => string;
    private readonly now: () => number;
    private readonly launchCooldownMs: number;
    private readonly temporaryDirectory: string;
    private readonly loadThroughIpc: MpvIpcLoader;
    private readonly pathImplementation: PlatformPath;
    private readonly userDataDirectory: string;
    private readonly settingsFilePath: string;
    private settingsMutationTail: Promise<void> = Promise.resolve();
    private activeProcess: SpawnedMpvProcess | null = null;
    private pendingLaunch: PendingMpvLaunch | null = null;
    private lastLaunchAttemptAt = Number.NEGATIVE_INFINITY;
    private executableCache: {
        readonly key: string;
        readonly resolvedAt: number;
        readonly result: ResolvedMpvExecutable;
    } | null = null;

    constructor(options: MpvManagerOptions) {
        this.platform = options.platform ?? process.platform;
        this.environment = options.environment ?? process.env;
        this.fileSystem = options.fileSystem ?? defaultFileSystem;
        this.execFile = options.execFile ?? defaultExecFile;
        this.spawn = options.spawn ?? defaultSpawn;
        this.logger = options.logger ?? silentLogger;
        this.createTemporaryToken = options.createTemporaryToken ?? randomUUID;
        this.now = options.now ?? Date.now;
        this.launchCooldownMs = Math.max(0, options.launchCooldownMs ?? DEFAULT_LAUNCH_COOLDOWN_MS);
        this.temporaryDirectory = options.temporaryDirectory
            ?? (this.platform === "win32" ? tmpdir() : "/tmp");
        this.loadThroughIpc = options.loadThroughIpc ?? loadMpvStreamThroughIpc;
        this.pathImplementation = getPathImplementation(this.platform);

        if (
            !this.pathImplementation.isAbsolute(options.userDataDirectory)
            || !this.pathImplementation.isAbsolute(this.temporaryDirectory)
        ) {
            throw new Error("The MPV settings directory must be absolute");
        }
        this.userDataDirectory = this.pathImplementation.normalize(options.userDataDirectory);
        this.settingsFilePath = this.pathImplementation.join(
            this.userDataDirectory,
            SETTINGS_FILE_NAME,
        );
    }

    async getStatus(): Promise<MpvStatus> {
        const settings = await this.readSettings();
        if (!settings.enabled) {
            return this.toPublicStatus(settings, null, null, "Native MPV playback is disabled.");
        }
        const resolved = await this.resolveExecutable(settings, false);
        return this.toPublicStatus(
            settings,
            resolved.executable,
            resolved.source,
            resolved.message,
        );
    }

    async setPreferences(value: unknown): Promise<MpvStatus> {
        const preferences = validateMpvPreferences(value);
        if (preferences === null) {
            throw new Error("The MPV preferences are invalid");
        }
        await this.updateSettings(settings => ({ ...settings, ...preferences }));
        return this.getStatus();
    }

    async configureExecutable(executablePath: string): Promise<MpvStatus> {
        if (typeof executablePath !== "string") {
            throw new Error("The selected MPV executable is invalid");
        }
        const executable = await this.inspectExecutable(executablePath);
        if (executable === null) {
            throw new Error("The selected file is not a valid MPV executable");
        }
        await this.updateSettings(settings => ({
            ...settings,
            executablePath: executable.executablePath,
        }));
        this.logger.info("The selected MPV executable was validated and saved");
        return this.getStatus();
    }

    async resetConfiguredExecutable(): Promise<MpvStatus> {
        await this.updateSettings(settings => ({ ...settings, executablePath: null }));
        this.logger.info("The configured MPV executable was reset");
        return this.getStatus();
    }

    async launch(request: unknown): Promise<MpvLaunchResult> {
        const validatedRequest = validateMpvLaunchRequest(request);
        if (validatedRequest === null) {
            return { success: false, message: "Invalid native player request." };
        }
        if (this.pendingLaunch !== null || this.activeProcess !== null) {
            return { success: false, message: "MPV is already starting or running." };
        }
        if (this.now() - this.lastLaunchAttemptAt < this.launchCooldownMs) {
            return { success: false, message: "Please wait before starting MPV again." };
        }

        let resolveFinished: (() => void) | undefined;
        const finished = new Promise<void>(resolve => {
            resolveFinished = resolve;
        });
        const pending: PendingMpvLaunch = {
            attemptId: validatedRequest.attemptId,
            controller: new AbortController(),
            finished,
            resolveFinished: () => resolveFinished?.(),
            child: null,
        };
        this.pendingLaunch = pending;
        let ipcEndpoint: MpvIpcEndpoint | null = null;
        let child: SpawnedMpvProcess | null = null;
        let processFailed = false;

        try {
            const settings = await this.readSettings();
            if (!settings.enabled) {
                return { success: false, message: "Native MPV playback is disabled." };
            }
            this.lastLaunchAttemptAt = this.now();
            const resolved = await this.resolveExecutable(settings, true);
            if (pending.controller.signal.aborted) throw cancellationError();
            if (resolved.executable === null) {
                return {
                    success: false,
                    message: resolved.message ?? "MPV is unavailable.",
                };
            }

            ipcEndpoint = await this.createIpcEndpoint();
            if (pending.controller.signal.aborted) throw cancellationError();
            if (!await this.executableIdentityIsCurrent(resolved.executable)) {
                throw new Error("The MPV executable changed after validation");
            }
            const args: string[] = [];
            if (!settings.useUserConfiguration) {
                args.push("--no-config", "--load-scripts=no");
            }
            args.push(
                "--idle=once",
                "--force-window=yes",
                "--terminal=no",
                "--input-terminal=no",
                `--input-ipc-server=${ipcEndpoint.endpoint}`,
            );

            child = this.spawn(resolved.executable.executablePath, args, {
                detached: true,
                shell: false,
                stdio: "ignore",
                windowsHide: true,
            });
            pending.child = child;
            this.activeProcess = child;
            const processStopped = (): void => {
                processFailed = true;
                if (this.activeProcess === child) this.activeProcess = null;
                if (this.pendingLaunch === pending) pending.controller.abort();
                if (ipcEndpoint) void this.cleanupIpcEndpoint(ipcEndpoint);
            };
            child.once("error", processStopped);
            child.once("exit", processStopped);

            await this.loadThroughIpc(
                ipcEndpoint.endpoint,
                validatedRequest.streamUrl,
                pending.controller.signal,
            );
            if (
                pending.controller.signal.aborted
                || this.pendingLaunch !== pending
            ) {
                throw cancellationError();
            }
            await this.cleanupIpcEndpoint(ipcEndpoint);
            ipcEndpoint = null;
            if (
                pending.controller.signal.aborted
                || this.pendingLaunch !== pending
                || this.activeProcess !== child
            ) {
                throw cancellationError();
            }
            this.pendingLaunch = null;
            child.unref();
            this.logger.info("MPV loaded the requested stream");
            return { success: true, message: null };
        } catch {
            if (child !== null && this.activeProcess === child) {
                this.activeProcess = null;
            }
            if (child !== null) {
                try {
                    child.kill();
                } catch {
                    // The process may already have exited.
                }
            }
            if (ipcEndpoint !== null) await this.cleanupIpcEndpoint(ipcEndpoint);
            if (pending.controller.signal.aborted && !processFailed) {
                this.logger.info("The pending MPV launch was canceled");
                return { success: false, message: "MPV launch was canceled." };
            }
            this.logger.error("MPV could not load the requested stream");
            return { success: false, message: "MPV could not be launched." };
        } finally {
            if (this.pendingLaunch === pending) this.pendingLaunch = null;
            pending.resolveFinished();
        }
    }

    async cancelLaunch(value: unknown): Promise<boolean> {
        const attemptId = validateMpvCancelRequest(value);
        if (attemptId === null || this.pendingLaunch?.attemptId !== attemptId) {
            return false;
        }
        const pending = this.pendingLaunch;
        pending.controller.abort();
        if (pending.child !== null) {
            try {
                pending.child.kill();
            } catch {
                // The process may already have exited.
            }
        }
        await pending.finished;
        this.lastLaunchAttemptAt = Number.NEGATIVE_INFINITY;
        return true;
    }

    private async inspectExecutable(candidatePath: string): Promise<ValidMpvExecutable | null> {
        if (!this.pathImplementation.isAbsolute(candidatePath)) return null;
        try {
            const executablePath = await this.fileSystem.realpath(candidatePath);
            if (!this.pathImplementation.isAbsolute(executablePath)) return null;
            const initialStats = await this.fileSystem.stat(executablePath);
            if (!this.executableStatsAreAcceptable(initialStats)) return null;
            const identity = this.executableIdentity(initialStats);
            const { stdout, stderr } = await this.execFile(executablePath, ["--version"], {
                encoding: "utf8",
                maxBuffer: MAX_VERSION_OUTPUT_BYTES,
                shell: false,
                timeout: VERSION_TIMEOUT_MS,
                windowsHide: true,
            });
            const versionMatch = `${stdout}\n${stderr}`.match(MPV_VERSION_PATTERN);
            if (!versionMatch) return null;
            const verifiedStats = await this.fileSystem.stat(executablePath);
            if (
                !this.executableStatsAreAcceptable(verifiedStats)
                || !this.executableIdentitiesMatch(
                    identity,
                    this.executableIdentity(verifiedStats),
                )
            ) {
                return null;
            }
            return { executablePath, version: versionMatch[1], identity };
        } catch {
            return null;
        }
    }

    private executableStatsAreAcceptable(stats: FileStat): boolean {
        return stats.isFile()
            && (
                this.platform === "win32"
                || (stats.mode & 0o022) === 0
            );
    }

    private executableIdentity(stats: FileStat): ExecutableIdentity {
        return {
            dev: stats.dev,
            ino: stats.ino,
            size: stats.size,
            mtimeMs: stats.mtimeMs,
        };
    }

    private executableIdentitiesMatch(
        first: ExecutableIdentity,
        second: ExecutableIdentity,
    ): boolean {
        return first.dev === second.dev
            && first.ino === second.ino
            && first.size === second.size
            && first.mtimeMs === second.mtimeMs;
    }

    private async executableIdentityIsCurrent(
        executable: ValidMpvExecutable,
    ): Promise<boolean> {
        try {
            const currentRealPath = await this.fileSystem.realpath(executable.executablePath);
            if (currentRealPath !== executable.executablePath) return false;
            const stats = await this.fileSystem.stat(currentRealPath);
            return this.executableStatsAreAcceptable(stats)
                && this.executableIdentitiesMatch(
                    executable.identity,
                    this.executableIdentity(stats),
                );
        } catch {
            return false;
        }
    }

    private async resolveExecutable(
        settings: PersistedMpvSettings,
        forceRefresh: boolean,
    ): Promise<ResolvedMpvExecutable> {
        const cacheKey = settings.executablePath ?? "<automatic>";
        if (
            !forceRefresh
            && this.executableCache?.key === cacheKey
            && this.now() - this.executableCache.resolvedAt < EXECUTABLE_CACHE_MS
        ) {
            return this.executableCache.result;
        }

        let configuredPathUnavailable = false;
        if (settings.executablePath !== null) {
            const executable = await this.inspectExecutable(settings.executablePath);
            if (executable !== null) {
                return this.cacheExecutable(cacheKey, {
                    executable,
                    source: "configured",
                    message: null,
                });
            }
            configuredPathUnavailable = true;
            this.logger.warn("The configured MPV executable is no longer valid");
        }

        for (const candidate of listMpvDiscoveryCandidates(this.platform, this.environment)) {
            const executable = await this.inspectExecutable(candidate.executablePath);
            if (executable !== null) {
                return this.cacheExecutable(cacheKey, {
                    executable,
                    source: candidate.source,
                    message: configuredPathUnavailable
                        ? "The configured MPV executable is unavailable; using a known installation."
                        : null,
                });
            }
        }

        return this.cacheExecutable(cacheKey, {
            executable: null,
            source: null,
            message: configuredPathUnavailable
                ? "The configured MPV executable is unavailable and no known installation was found."
                : "MPV was not found. Install MPV or select its executable.",
        });
    }

    private cacheExecutable(
        key: string,
        result: ResolvedMpvExecutable,
    ): ResolvedMpvExecutable {
        this.executableCache = { key, resolvedAt: this.now(), result };
        return result;
    }

    private async createIpcEndpoint(): Promise<MpvIpcEndpoint> {
        const token = this.safeTemporaryToken(48);
        if (this.platform === "win32") {
            return {
                endpoint: `\\\\.\\pipe\\stremio-enhanced-mpv-${token}`,
                directory: null,
            };
        }
        const directory = this.pathImplementation.join(
            this.temporaryDirectory,
            `stremio-mpv-${token}`,
        );
        const endpoint = this.pathImplementation.join(directory, "ipc.sock");
        if (Buffer.byteLength(endpoint, "utf8") > MAX_UNIX_SOCKET_PATH_BYTES) {
            throw new Error("The MPV IPC socket path is too long");
        }
        await this.fileSystem.mkdir(directory, { recursive: false, mode: 0o700 });
        await this.fileSystem.chmod(directory, 0o700);
        return {
            endpoint,
            directory,
        };
    }

    private async cleanupIpcEndpoint(ipcEndpoint: MpvIpcEndpoint): Promise<void> {
        if (ipcEndpoint.directory === null) return;
        try {
            await this.fileSystem.unlink(ipcEndpoint.endpoint);
        } catch (error) {
            if (!isMissingFileError(error)) {
                this.logger.warn("The MPV IPC socket could not be removed");
            }
        }
        try {
            await this.fileSystem.rmdir(ipcEndpoint.directory);
        } catch (error) {
            if (!isMissingFileError(error)) {
                this.logger.warn("The MPV IPC directory could not be removed");
            }
        }
    }

    private async readSettings(): Promise<PersistedMpvSettings> {
        await this.settingsMutationTail;
        return this.readSettingsFile();
    }

    private async readSettingsFile(): Promise<PersistedMpvSettings> {
        const noFollowFlag = typeof fileSystemConstants.O_NOFOLLOW === "number"
            ? fileSystemConstants.O_NOFOLLOW
            : 0;
        let handle: MpvFileHandle | null = null;
        try {
            handle = await this.fileSystem.open(
                this.settingsFilePath,
                fileSystemConstants.O_RDONLY | noFollowFlag,
            );
            const stats = await handle.stat();
            if (!stats.isFile() || stats.size > MAX_SETTINGS_BYTES) {
                this.logger.warn("The MPV settings file was rejected");
                return defaultSettings();
            }
            const bytes = new Uint8Array(MAX_SETTINGS_BYTES + 1);
            const { bytesRead } = await handle.read(bytes, 0, bytes.length, 0);
            if (bytesRead > MAX_SETTINGS_BYTES) {
                this.logger.warn("The MPV settings file was rejected");
                return defaultSettings();
            }
            const rawSettings = Buffer.from(bytes.subarray(0, bytesRead)).toString("utf8");
            const parsed: unknown = JSON.parse(rawSettings);
            if (
                typeof parsed !== "object"
                || parsed === null
                || Array.isArray(parsed)
                || Object.getPrototypeOf(parsed) !== Object.prototype
            ) {
                return defaultSettings();
            }
            const keys = Object.keys(parsed);
            const allowedKeys = new Set([
                "enabled",
                "useUserConfiguration",
                "executablePath",
            ]);
            if (keys.some(key => !allowedKeys.has(key))) return defaultSettings();

            const record = parsed as Record<string, unknown>;
            const enabled = record.enabled ?? false;
            const useUserConfiguration = record.useUserConfiguration ?? false;
            const executablePath = record.executablePath ?? null;
            if (
                typeof enabled !== "boolean"
                || typeof useUserConfiguration !== "boolean"
                || (
                    executablePath !== null
                    && (
                        typeof executablePath !== "string"
                        || !this.pathImplementation.isAbsolute(executablePath)
                    )
                )
            ) {
                return defaultSettings();
            }
            return { enabled, useUserConfiguration, executablePath };
        } catch (error) {
            if (!isMissingFileError(error)) {
                this.logger.warn("The MPV settings file could not be read");
            }
            return defaultSettings();
        } finally {
            if (handle !== null) {
                try {
                    await handle.close();
                } catch {
                    this.logger.warn("The MPV settings file could not be closed");
                }
            }
        }
    }

    private updateSettings(
        mutate: (settings: PersistedMpvSettings) => PersistedMpvSettings,
    ): Promise<PersistedMpvSettings> {
        const operation = async (): Promise<PersistedMpvSettings> => {
            const settings = mutate(await this.readSettingsFile());
            await this.writeSettingsFile(settings);
            this.executableCache = null;
            return settings;
        };
        const result = this.settingsMutationTail.then(operation, operation);
        this.settingsMutationTail = result.then(
            () => undefined,
            () => undefined,
        );
        return result;
    }

    private async writeSettingsFile(settings: PersistedMpvSettings): Promise<void> {
        await this.fileSystem.mkdir(this.userDataDirectory, { recursive: true, mode: 0o700 });
        const temporaryPath = this.pathImplementation.join(
            this.userDataDirectory,
            `.${SETTINGS_FILE_NAME}.${this.safeTemporaryToken()}.tmp`,
        );
        try {
            await this.fileSystem.writeFile(
                temporaryPath,
                `${JSON.stringify(settings)}\n`,
                { encoding: "utf8", flag: "wx", mode: 0o600 },
            );
            try {
                await this.fileSystem.rename(temporaryPath, this.settingsFilePath);
            } catch (error) {
                if (!hasErrorCode(error, "EEXIST", "EPERM")) throw error;
                try {
                    await this.fileSystem.unlink(this.settingsFilePath);
                } catch (unlinkError) {
                    if (!isMissingFileError(unlinkError)) throw unlinkError;
                }
                await this.fileSystem.rename(temporaryPath, this.settingsFilePath);
            }
        } finally {
            try {
                await this.fileSystem.unlink(temporaryPath);
            } catch (error) {
                if (!isMissingFileError(error)) {
                    this.logger.warn("The temporary MPV settings file could not be removed");
                }
            }
        }
    }

    private safeTemporaryToken(maximumLength: number = 80): string {
        return this.createTemporaryToken()
            .replace(/[^a-zA-Z0-9_-]/g, "")
            .slice(0, maximumLength) || "temporary";
    }

    private toPublicStatus(
        settings: PersistedMpvSettings,
        executable: ValidMpvExecutable | null,
        source: "configured" | "known-path" | null,
        message: string | null,
    ): MpvStatus {
        return {
            available: executable !== null,
            version: executable?.version ?? null,
            source,
            message,
            preferences: {
                enabled: settings.enabled,
                useUserConfiguration: settings.useUserConfiguration,
            },
        };
    }
}
