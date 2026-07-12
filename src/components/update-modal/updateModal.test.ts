// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from "vitest";
import { createUpdateModal } from "./updateModal";

describe("createUpdateModal", () => {
    beforeEach(() => {
        document.body.replaceChildren();
    });

    it("renders hostile release notes as text instead of markup", () => {
        const hostileNotes = '<img src=x onerror="unsafe()"><script>unsafe()</script> **bold**';
        const modal = createUpdateModal({
            currentVersion: "1.0.0",
            version: "1.1.0",
            releaseName: "Security update",
            releaseNotes: hostileNotes,
            onRestartNow: () => true,
        });
        document.body.appendChild(modal);

        const notes = modal.querySelector<HTMLElement>(
            '[data-stremio-enhanced-update-notes="true"]'
        );
        expect(notes?.textContent).toBe(hostileNotes);
        expect(notes?.querySelector("img")).toBeNull();
        expect(notes?.querySelector("script")).toBeNull();
        expect(modal.querySelector("[onclick]")).toBeNull();
    });

    it("guards restart installation while the request is pending", async () => {
        let finishInstall: ((accepted: boolean) => void) | undefined;
        const onRestartNow = vi.fn(() => new Promise<boolean>(resolve => {
            finishInstall = resolve;
        }));
        const modal = createUpdateModal({
            currentVersion: "1.0.0",
            version: "1.1.0",
            onRestartNow,
        });
        document.body.appendChild(modal);

        const restart = modal.querySelector<HTMLButtonElement>(
            '[data-stremio-enhanced-install-update="true"]'
        );
        restart?.click();
        restart?.click();

        expect(onRestartNow).toHaveBeenCalledTimes(1);
        expect(restart?.disabled).toBe(true);
        expect(restart?.getAttribute("aria-busy")).toBe("true");

        finishInstall?.(false);
        await vi.waitFor(() => expect(restart?.disabled).toBe(false));
        expect(restart?.getAttribute("aria-busy")).toBeNull();
    });

    it("defers installation when Later is selected", () => {
        const onLater = vi.fn();
        const modal = createUpdateModal({
            currentVersion: "1.0.0",
            version: "1.1.0",
            onRestartNow: () => true,
            onLater,
        });
        document.body.appendChild(modal);

        const later = Array.from(modal.querySelectorAll("button"))
            .find(button => button.textContent === "Later");
        later?.click();

        expect(onLater).toHaveBeenCalledOnce();
        expect(modal.isConnected).toBe(false);
    });
});
