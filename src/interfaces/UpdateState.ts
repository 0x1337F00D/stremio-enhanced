export type UpdateStatus =
    | "idle"
    | "unsupported"
    | "checking"
    | "available"
    | "downloading"
    | "downloaded"
    | "not-available"
    | "error";

export interface UpdateProgressDto {
    readonly percent: number;
    readonly transferred: number;
    readonly total: number;
    readonly bytesPerSecond: number;
}

/**
 * IPC-safe update state. Every field is always present so renderers can handle
 * the payload without relying on Electron or electron-updater object shapes.
 */
export interface UpdateState {
    readonly status: UpdateStatus;
    readonly currentVersion: string;
    readonly availableVersion: string | null;
    readonly releaseName: string | null;
    readonly releaseNotes: string | null;
    readonly message: string | null;
    readonly progress: UpdateProgressDto | null;
}
