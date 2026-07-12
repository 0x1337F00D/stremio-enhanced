// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { getModItemTemplate } from "./modsItem";

describe("getModItemTemplate", () => {
    it("escapes registry metadata before inserting it into HTML", () => {
        const template = getModItemTemplate({
            name: '<img src=x onerror="unsafe()">',
            description: "<script>unsafe()</script>",
            author: "A&B",
            version: '1.0" onclick="unsafe()',
            download: "https://example.com/example.plugin.js",
            repo: "https://example.com/repository",
        }, "Plugin", false);

        expect(template).not.toContain("<script>unsafe()</script>");
        expect(template).not.toContain("<img src=x");
        expect(template).toContain("&lt;script&gt;unsafe()&lt;/script&gt;");
        expect(template).toContain("A&amp;B");
        expect(template).toContain("1.0&quot; onclick=&quot;unsafe()");
    });

    it("rejects non-HTTPS action, repository, and preview URLs", () => {
        const template = getModItemTemplate({
            name: "Unsafe theme",
            description: "Invalid links must not become actions",
            author: "Registry",
            version: "1.0.0",
            preview: "data:image/svg+xml,<svg onload=unsafe()>",
            download: "javascript:unsafe()",
            repo: "javascript:unsafe()",
        }, "Theme", false);

        const container = document.createElement("div");
        container.innerHTML = template;

        expect(template).not.toContain("javascript:");
        expect(template).not.toContain("data:image");
        expect(container.querySelector("img")).toBeNull();
        expect(container.querySelector('[aria-label="Theme preview unavailable"]')).not.toBeNull();

        const action = container.querySelector<HTMLElement>(".modActionBtn");
        expect(action?.dataset.action).toBe("unavailable");
        expect(action?.dataset.link).toBe("");
        expect(action?.getAttribute("aria-disabled")).toBe("true");
        expect(action?.tabIndex).toBe(-1);

        const repo = container.querySelector<HTMLAnchorElement>(".share-button-container-s3gwP");
        expect(repo?.hasAttribute("href")).toBe(false);
        expect(repo?.getAttribute("aria-disabled")).toBe("true");
        expect(repo?.tabIndex).toBe(-1);

        const plaintext = getModItemTemplate({
            name: "Plaintext",
            description: "HTTP is not trusted for executable mods",
            author: "Registry",
            version: "1.0.0",
            preview: "http://example.com/preview.png",
            download: "http://example.com/plain.plugin.js",
            repo: "http://example.com/repository",
        }, "Plugin", false);
        expect(plaintext).not.toContain("http://example.com");
    });
});
