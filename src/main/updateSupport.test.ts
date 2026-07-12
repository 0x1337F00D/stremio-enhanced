import { describe, expect, it } from "vitest";
import { isDesktopAutoUpdateSupported } from "./updateSupport";

describe("isDesktopAutoUpdateSupported", () => {
    it("supports packaged macOS and installed Windows builds", () => {
        expect(isDesktopAutoUpdateSupported({
            isPackaged: true,
            platform: "darwin",
            environment: {},
        })).toBe(true);
        expect(isDesktopAutoUpdateSupported({
            isPackaged: true,
            platform: "win32",
            environment: {},
        })).toBe(true);
    });

    it("rejects development and Windows portable builds", () => {
        expect(isDesktopAutoUpdateSupported({
            isPackaged: false,
            platform: "darwin",
            environment: {},
        })).toBe(false);
        expect(isDesktopAutoUpdateSupported({
            isPackaged: true,
            platform: "win32",
            environment: { PORTABLE_EXECUTABLE_FILE: "Stremio Enhanced.exe" },
        })).toBe(false);
    });

    it("supports Linux only when running from an AppImage", () => {
        expect(isDesktopAutoUpdateSupported({
            isPackaged: true,
            platform: "linux",
            environment: {},
        })).toBe(false);
        expect(isDesktopAutoUpdateSupported({
            isPackaged: true,
            platform: "linux",
            environment: { APPIMAGE: "/tmp/Stremio.AppImage" },
        })).toBe(true);
    });
});
