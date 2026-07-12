export type NativePlayerPreference = "disabled" | "mpv";

export interface MpvPreferences {
    readonly enabled: boolean;
    readonly useUserConfiguration: boolean;
}

export interface MpvStatus {
    readonly available: boolean;
    readonly version: string | null;
    readonly source: "configured" | "known-path" | null;
    readonly message: string | null;
    readonly preferences: MpvPreferences;
}

export interface MpvLaunchRequest {
    readonly attemptId: string;
    readonly streamUrl: string;
}

export interface MpvCancelLaunchRequest {
    readonly attemptId: string;
}

export interface MpvLaunchResult {
    readonly success: boolean;
    readonly message: string | null;
}
