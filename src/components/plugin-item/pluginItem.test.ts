import { describe, expect, it } from "vitest";
import { getPluginItemTemplate } from "./pluginItem";

describe("getPluginItemTemplate", () => {
    it("escapes plugin metadata and filenames before inserting HTML", () => {
        const template = getPluginItemTemplate('bad".plugin.js', {
            name: "<img src=x onerror=alert(1)>",
            description: "<script>unsafe()</script>",
            author: "A&B",
            version: '1.0" onclick="unsafe()',
        }, false);

        expect(template).not.toContain("<script>unsafe()</script>");
        expect(template).not.toContain("<img src=x");
        expect(template).toContain("&lt;script&gt;unsafe()&lt;/script&gt;");
        expect(template).toContain("A&amp;B");
        expect(template).toContain("bad&quot;.plugin.js");
    });
});
