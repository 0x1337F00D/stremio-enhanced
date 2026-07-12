import { describe, expect, it } from "vitest";
import { resolve } from "path";
import { resolveManagedFilePath } from "../managedPath";

describe("resolveManagedFilePath", () => {
    const rootPath = "/tmp/stremio-enhanced/themes";

    it("resolves a supported file inside the managed root", () => {
        expect(resolveManagedFilePath(rootPath, "amoled.theme.css", ".theme.css"))
            .toBe(resolve(rootPath, "amoled.theme.css"));
    });

    it.each([
        "../outside.theme.css",
        "nested/outside.theme.css",
        "nested\\outside.theme.css",
        "/tmp/outside.theme.css",
        "outside.css",
        "unsafe name.theme.css",
    ])("rejects an unsafe or unsupported name: %s", (fileName) => {
        expect(resolveManagedFilePath(rootPath, fileName, ".theme.css")).toBeNull();
    });
});
