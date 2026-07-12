import type { IpcMainInvokeEvent } from "electron";
import { URLS } from "../constants";

const TRUSTED_RENDERER_ORIGIN = new URL(URLS.STREMIO_WEB).origin;

export function isTrustedRendererUrl(rawUrl: string): boolean {
    try {
        return new URL(rawUrl).origin === TRUSTED_RENDERER_ORIGIN;
    } catch {
        return false;
    }
}

export function assertTrustedRenderer(
    event: IpcMainInvokeEvent,
    expectedWebContentsId?: number,
): void {
    const frame = event.senderFrame;
    if (
        !frame
        || frame.parent !== null
        || !isTrustedRendererUrl(frame.url)
        || (
            expectedWebContentsId !== undefined
            && event.sender.id !== expectedWebContentsId
        )
    ) {
        throw new Error("Rejected request from an untrusted renderer");
    }
}
