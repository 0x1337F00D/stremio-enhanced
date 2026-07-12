import { describe, expect, it } from "vitest";
import { getApplyThemeTemplate } from "./applyTheme";

describe("getApplyThemeTemplate", () => {
    it("delegates theme application to the isolated preload bridge", () => {
        const template = getApplyThemeTemplate();

        expect(template).toContain("window.stremioEnhanced?.applyTheme");
        expect(template).toContain("await window.stremioEnhanced.applyTheme(theme)");
        expect(template).not.toContain("{{ themesPath }}");
    });
});
