import type { IpcMainInvokeEvent } from "electron";
import { describe, expect, it } from "vitest";
import { assertTrustedRenderer, isTrustedRendererUrl } from "./trustedRenderer";

function eventWithFrame(
    url: string,
    parent: object | null = null,
    webContentsId: number = 7,
): IpcMainInvokeEvent {
    return {
        senderFrame: { url, parent },
        sender: { id: webContentsId },
    } as unknown as IpcMainInvokeEvent;
}

describe("trusted renderer boundary", () => {
    it("accepts only the configured origin in the main frame", () => {
        expect(isTrustedRendererUrl("https://web.stremio.com/#/player")).toBe(true);
        expect(() => assertTrustedRenderer(
            eventWithFrame("https://web.stremio.com/#/player")
        )).not.toThrow();

        expect(() => assertTrustedRenderer(
            eventWithFrame("https://web.stremio.com/#/player", {})
        )).toThrow("untrusted renderer");
        expect(() => assertTrustedRenderer(
            eventWithFrame("https://web.stremio.com.evil.invalid/")
        )).toThrow("untrusted renderer");
    });

    it("rejects missing renderer frame metadata", () => {
        expect(() => assertTrustedRenderer({
            senderFrame: null,
        } as unknown as IpcMainInvokeEvent)).toThrow("untrusted renderer");
    });

    it("can bind a trusted origin to one BrowserWindow", () => {
        expect(() => assertTrustedRenderer(
            eventWithFrame("https://web.stremio.com/", null, 7),
            7,
        )).not.toThrow();
        expect(() => assertTrustedRenderer(
            eventWithFrame("https://web.stremio.com/", null, 8),
            7,
        )).toThrow("untrusted renderer");
    });
});
