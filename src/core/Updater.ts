import type {
    AppUpdater,
    ProgressInfo,
    UpdateCheckResult,
    UpdateDownloadedEvent,
    UpdateInfo,
} from "electron-updater";
import type { UpdateProgressDto, UpdateState, UpdateStatus } from "../interfaces/UpdateState";

const MAX_RELEASE_NOTES_LENGTH = 4_000;
const MAX_RELEASE_NAME_LENGTH = 200;
const MAX_ERROR_MESSAGE_LENGTH = 500;
const MAX_VERSION_LENGTH = 100;

export interface UpdateControllerLogger {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}

export interface UpdateControllerDependencies {
    isSupported: boolean;
    currentVersion: string;
    broadcast(state: UpdateState): void;
    logger: UpdateControllerLogger;
}

interface SafeReleaseInfo {
    availableVersion: string;
    releaseName: string | null;
    releaseNotes: string | null;
}

interface StateOverrides {
    availableVersion?: string | null;
    releaseName?: string | null;
    releaseNotes?: string | null;
    message?: string | null;
    progress?: UpdateProgressDto | null;
}

function decodeHtmlEntities(value: string): string {
    const namedEntities: Record<string, string> = {
        amp: "&",
        apos: "'",
        gt: ">",
        lt: "<",
        nbsp: " ",
        quot: '"',
    };

    return value.replace(/&(?:#(\d+)|#x([\da-f]+)|([a-z]+));/gi, (_entity, decimal, hex, named) => {
        if (typeof named === "string") {
            return namedEntities[named.toLowerCase()] ?? " ";
        }

        const codePoint = Number.parseInt(decimal ?? hex, decimal ? 10 : 16);
        if (!Number.isSafeInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff) {
            return " ";
        }

        try {
            return String.fromCodePoint(codePoint);
        } catch {
            return " ";
        }
    });
}

function sanitizePlainText(value: string, maximumLength: number): string {
    const decoded = decodeHtmlEntities(value);
    const normalized = decoded
        .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
        .replace(/<!--[\s\S]*?-->/g, " ")
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/<[^>]*>/g, " ")
        .replace(/^\s{0,3}(?:#{1,6}|[-+*>]|\d+[.)])\s+/gm, "")
        .replace(/[`*_~]+/g, "");
    const withoutControlCharacters = Array.from(normalized, character => {
        const codePoint = character.codePointAt(0) ?? 0;
        const isDisallowedControl = codePoint <= 8
            || codePoint === 11
            || codePoint === 12
            || (codePoint >= 14 && codePoint <= 31)
            || codePoint === 127;
        return isDisallowedControl ? " " : character;
    }).join("");
    const plainText = withoutControlCharacters
        .replace(/[ \t]+/g, " ")
        .replace(/\s*\n\s*/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    const characters = Array.from(plainText);
    if (characters.length <= maximumLength) return plainText;
    return `${characters.slice(0, maximumLength - 1).join("")}…`;
}

function nullablePlainText(value: unknown, maximumLength: number): string | null {
    if (typeof value !== "string") return null;
    return sanitizePlainText(value, maximumLength) || null;
}

function sanitizeReleaseNotes(releaseNotes: UpdateInfo["releaseNotes"]): string | null {
    if (Array.isArray(releaseNotes)) {
        const combinedNotes = releaseNotes
            .map(releaseNote => {
                const version = nullablePlainText(releaseNote.version, MAX_VERSION_LENGTH);
                const note = typeof releaseNote.note === "string" ? releaseNote.note : "";
                return version ? `${version}\n${note}` : note;
            })
            .filter(Boolean)
            .join("\n\n");
        return nullablePlainText(combinedNotes, MAX_RELEASE_NOTES_LENGTH);
    }

    return nullablePlainText(releaseNotes, MAX_RELEASE_NOTES_LENGTH);
}

function safeNonNegativeNumber(value: number): number {
    return Number.isFinite(value) && value >= 0 ? value : 0;
}

function sanitizeProgress(progress: ProgressInfo): UpdateProgressDto {
    return {
        percent: Math.min(100, safeNonNegativeNumber(progress.percent)),
        transferred: safeNonNegativeNumber(progress.transferred),
        total: safeNonNegativeNumber(progress.total),
        bytesPerSecond: safeNonNegativeNumber(progress.bytesPerSecond),
    };
}

function sanitizeErrorMessage(error: unknown): string {
    const rawMessage = error instanceof Error
        ? error.message
        : typeof error === "string"
            ? error
            : "Unknown update error.";
    return sanitizePlainText(rawMessage, MAX_ERROR_MESSAGE_LENGTH) || "Unknown update error.";
}

/**
 * Owns the main-process auto-update lifecycle and only exposes serializable
 * state to renderer processes.
 */
export class UpdateController {
    private readonly updater: AppUpdater;
    private readonly isSupported: boolean;
    private readonly currentVersion: string;
    private readonly broadcast: (state: UpdateState) => void;
    private readonly logger: UpdateControllerLogger;
    private state: UpdateState;
    private checkInFlight: Promise<UpdateState> | null = null;
    private latestRelease: SafeReleaseInfo | null = null;
    private updateDownloaded = false;

    public constructor(updater: AppUpdater, dependencies: UpdateControllerDependencies) {
        this.updater = updater;
        this.isSupported = dependencies.isSupported;
        this.currentVersion = sanitizePlainText(
            dependencies.currentVersion,
            MAX_VERSION_LENGTH
        ) || "0.0.0";
        this.broadcast = dependencies.broadcast;
        this.logger = dependencies.logger;
        this.state = this.createState("idle");

        this.configureUpdater();
    }

    public getState(): UpdateState {
        return this.state;
    }

    public checkForUpdates(): Promise<UpdateState> {
        if (!this.isSupported) {
            return Promise.resolve(this.transition("unsupported", {
                message: "Automatic updates are unavailable for this build.",
            }));
        }

        if (this.checkInFlight) return this.checkInFlight;

        this.latestRelease = null;
        this.transition("checking");

        const request = Promise.resolve()
            .then(() => this.updater.checkForUpdates())
            .then(result => this.handleCheckResult(result))
            .catch(error => this.handleError(error))
            .finally(() => {
                if (this.checkInFlight === request) {
                    this.checkInFlight = null;
                }
            });
        this.checkInFlight = request;
        return request;
    }

    public quitAndInstall(): boolean {
        if (!this.updateDownloaded) {
            this.logger.warn("Refused to install an update before it finished downloading.");
            return false;
        }

        this.updateDownloaded = false;
        try {
            this.updater.quitAndInstall();
            return true;
        } catch (error) {
            this.handleError(error);
            return false;
        }
    }

    private configureUpdater(): void {
        this.updater.autoDownload = true;
        this.updater.autoInstallOnAppQuit = true;
        this.updater.allowPrerelease = false;
        this.updater.allowDowngrade = false;

        this.updater.on("checking-for-update", () => {
            this.transition("checking");
        });
        this.updater.on("update-available", info => {
            this.latestRelease = this.sanitizeReleaseInfo(info);
            this.logger.info(`Update ${this.latestRelease.availableVersion} is available.`);
            this.transition("available", this.latestRelease);
        });
        this.updater.on("download-progress", progress => {
            this.transition("downloading", {
                ...this.latestRelease,
                progress: sanitizeProgress(progress),
            });
        });
        this.updater.on("update-downloaded", event => {
            this.latestRelease = this.sanitizeReleaseInfo(event);
            this.updateDownloaded = true;
            this.logger.info(`Update ${this.latestRelease.availableVersion} was downloaded.`);
            this.transition("downloaded", this.latestRelease);
        });
        this.updater.on("update-not-available", info => {
            this.latestRelease = this.sanitizeReleaseInfo(info);
            this.logger.info("No update is available.");
            this.transition("not-available", this.latestRelease);
        });
        this.updater.on("update-cancelled", () => {
            this.handleError("The update download was cancelled.");
        });
        this.updater.on("error", error => {
            this.handleError(error);
        });
    }

    private handleCheckResult(result: UpdateCheckResult | null): UpdateState {
        if (this.state.status !== "checking") return this.state;

        if (result === null) {
            return this.transition("unsupported", {
                message: "Automatic updates are unavailable for this build.",
            });
        }

        this.latestRelease = this.sanitizeReleaseInfo(result.updateInfo);
        return this.transition(
            result.isUpdateAvailable ? "available" : "not-available",
            this.latestRelease
        );
    }

    private handleError(error: unknown): UpdateState {
        const message = sanitizeErrorMessage(error);
        this.logger.error(`Auto-update failed: ${message}`);
        return this.transition("error", { message });
    }

    private sanitizeReleaseInfo(info: UpdateInfo | UpdateDownloadedEvent): SafeReleaseInfo {
        return {
            availableVersion: nullablePlainText(info.version, MAX_VERSION_LENGTH) ?? "unknown",
            releaseName: nullablePlainText(info.releaseName, MAX_RELEASE_NAME_LENGTH),
            releaseNotes: sanitizeReleaseNotes(info.releaseNotes),
        };
    }

    private createState(status: UpdateStatus, overrides: StateOverrides = {}): UpdateState {
        const progress = overrides.progress
            ? Object.freeze({ ...overrides.progress })
            : null;

        return Object.freeze({
            status,
            currentVersion: this.currentVersion,
            availableVersion: overrides.availableVersion ?? null,
            releaseName: overrides.releaseName ?? null,
            releaseNotes: overrides.releaseNotes ?? null,
            message: overrides.message ?? null,
            progress,
        });
    }

    private transition(status: UpdateStatus, overrides: StateOverrides = {}): UpdateState {
        const nextState = this.createState(status, overrides);
        if (JSON.stringify(nextState) === JSON.stringify(this.state)) return this.state;

        this.state = nextState;
        try {
            this.broadcast(nextState);
        } catch (error) {
            this.logger.warn(`Failed to broadcast auto-update state: ${sanitizeErrorMessage(error)}`);
        }
        return nextState;
    }
}

export default UpdateController;
