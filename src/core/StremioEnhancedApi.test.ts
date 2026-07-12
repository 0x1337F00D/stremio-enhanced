import { describe, expect, it, vi } from "vitest";
import { createStremioEnhancedApi } from "./StremioEnhancedApi";

describe("createStremioEnhancedApi", () => {
    it("rejects non-string theme requests at the page boundary", async () => {
        const applyTheme = vi.fn(async () => true);
        const api = createStremioEnhancedApi(applyTheme);

        await expect(
            (api.applyTheme as (theme: unknown) => Promise<boolean>)({ unsafe: true })
        ).resolves.toBe(false);
        expect(applyTheme).not.toHaveBeenCalled();
    });

    it("delegates valid theme names", async () => {
        const applyTheme = vi.fn(async () => true);
        const api = createStremioEnhancedApi(applyTheme);

        await expect(api.applyTheme("demo.theme.css")).resolves.toBe(true);
        expect(applyTheme).toHaveBeenCalledWith("demo.theme.css");
    });
});
