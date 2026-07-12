import { describe, expect, it, vi } from "vitest";

vi.mock("electron", () => ({
    ipcMain: {
        handle: vi.fn(),
    },
}));

import { isTrustedUpdateRendererUrl } from "./updateIpc";

describe("isTrustedUpdateRendererUrl", () => {
    it("accepts only the configured Stremio Web origin", () => {
        expect(isTrustedUpdateRendererUrl("https://web.stremio.com/#/settings"))
            .toBe(true);
        expect(isTrustedUpdateRendererUrl("https://web.stremio.com.evil.invalid/"))
            .toBe(false);
        expect(isTrustedUpdateRendererUrl("http://web.stremio.com/"))
            .toBe(false);
        expect(isTrustedUpdateRendererUrl("not a url")).toBe(false);
    });
});
