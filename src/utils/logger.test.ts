import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Logger, { getLogger } from "./logger";

describe("getLogger", () => {
    beforeEach(() => {
        Logger.silent = true;
    });

    afterEach(() => {
        Logger.silent = false;
        vi.restoreAllMocks();
    });

    it("delegates info messages with their class name", () => {
        const infoSpy = vi.spyOn(Logger, "info");

        getLogger("Player").info("started");

        expect(infoSpy).toHaveBeenCalledWith(expect.objectContaining({
            message: "started",
            className: "Player",
        }));
    });

    it("delegates error messages with their class name", () => {
        const errorSpy = vi.spyOn(Logger, "error");

        getLogger("Updater").error("failed");

        expect(errorSpy).toHaveBeenCalledWith(expect.objectContaining({
            message: "failed",
            className: "Updater",
        }));
    });

    it("delegates warning messages with their class name", () => {
        const warnSpy = vi.spyOn(Logger, "warn");

        getLogger("Mods").warn("unsupported");

        expect(warnSpy).toHaveBeenCalledWith(expect.objectContaining({
            message: "unsupported",
            className: "Mods",
        }));
    });
});
