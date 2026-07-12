import { describe, expect, it } from "vitest";
import { isSafeModFileName } from "../modFileName";

describe("isSafeModFileName", () => {
    it("accepts managed plugin and theme basenames", () => {
        expect(isSafeModFileName("demo.plugin.js", "plugin")).toBe(true);
        expect(isSafeModFileName("dark-v2.theme.css", "theme")).toBe(true);
    });

    it("rejects traversal, separators, wrong extensions, and oversized names", () => {
        expect(isSafeModFileName("../demo.theme.css", "theme")).toBe(false);
        expect(isSafeModFileName("folder/demo.plugin.js", "plugin")).toBe(false);
        expect(isSafeModFileName("demo.js", "plugin")).toBe(false);
        expect(isSafeModFileName(`${"a".repeat(250)}.theme.css`, "theme"))
            .toBe(false);
    });
});
