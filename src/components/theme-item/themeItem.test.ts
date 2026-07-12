// @vitest-environment jsdom

import { describe, expect, it } from "vitest";
import { getThemeItemTemplate } from "./themeItem";

describe("getThemeItemTemplate", () => {
    it("escapes theme metadata and uses a data attribute instead of inline JavaScript", () => {
        const template = getThemeItemTemplate('bad".theme.css', {
            name: "<img src=x onerror=alert(1)>",
            description: "<script>unsafe()</script>",
            author: "A&B",
            version: '1.0" onclick="unsafe()',
        }, false);

        expect(template).not.toContain("<script>unsafe()</script>");
        expect(template).not.toContain("<img src=x");
        const container = document.createElement("div");
        container.innerHTML = template;
        expect(container.querySelector("[onclick]")).toBeNull();
        expect(template).toContain("&lt;script&gt;unsafe()&lt;/script&gt;");
        expect(template).toContain("A&amp;B");
        expect(template).toContain('data-stremio-enhanced-apply-theme="bad&quot;.theme.css"');
    });
});
