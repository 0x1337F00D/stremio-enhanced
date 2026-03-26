import { IPlatform } from "./IPlatform";
import { ElectronPlatform } from "./ElectronPlatform";
import { CapacitorPlatform } from "./CapacitorPlatform";

export class PlatformManager {
    private static _current: IPlatform | null = null;

    static get current(): IPlatform {
        if (!this._current) {
            throw new Error("PlatformManager not initialized");
        }
        return this._current;
    }

    static init(): void {
        if (typeof process !== "undefined" && process.versions && process.versions.electron) {
            this._current = new ElectronPlatform();
        } else if (typeof window !== "undefined" && (window as any).capacitor) {
            this._current = new CapacitorPlatform();
        } else {
            throw new Error("Unknown platform");
        }
    }
}
