import { createHash } from "crypto";
import { mkdtempSync, mkdirSync, writeFileSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { describe, expect, it } from "vitest";

const { validateUpdateArtifacts } = require("../../../scripts/validate-update-artifacts.js") as {
    validateUpdateArtifacts(directory: string): string[];
};

function hash(content: string): string {
    return createHash("sha512").update(content).digest("base64");
}

describe("validate-update-artifacts", () => {
    it("verifies every platform metadata reference and hash", () => {
        const directory = mkdtempSync(join(tmpdir(), "stremio-update-artifacts-"));
        const platforms = [
            ["latest.yml", "Stremio-Setup.exe"],
            ["latest-mac.yml", "Stremio-mac.zip"],
            ["latest-linux.yml", "Stremio.AppImage"],
            ["latest-linux-arm64.yml", "Stremio-arm64.AppImage"],
        ] as const;

        for (const [metadata, asset] of platforms) {
            const platformDirectory = join(directory, metadata);
            mkdirSync(platformDirectory);
            writeFileSync(join(platformDirectory, asset), asset);
            writeFileSync(join(platformDirectory, metadata), [
                "version: 1.0.2",
                "files:",
                `  - url: ${asset}`,
                `    sha512: ${hash(asset)}`,
            ].join("\n"));
        }

        expect(validateUpdateArtifacts(directory)).toEqual([
            "Stremio-Setup.exe",
            "Stremio-mac.zip",
            "Stremio.AppImage",
            "Stremio-arm64.AppImage",
        ]);
    });

    it("rejects a metadata hash mismatch", () => {
        const directory = mkdtempSync(join(tmpdir(), "stremio-update-artifacts-"));
        for (const metadata of [
            "latest.yml",
            "latest-mac.yml",
            "latest-linux.yml",
            "latest-linux-arm64.yml",
        ]) {
            const platformDirectory = join(directory, metadata);
            mkdirSync(platformDirectory);
            const asset = `${metadata}.bin`;
            writeFileSync(join(platformDirectory, asset), "asset");
            writeFileSync(join(platformDirectory, metadata), [
                "version: 1.0.2",
                "files:",
                `  - url: ${asset}`,
                "    sha512: invalid",
            ].join("\n"));
        }

        expect(() => validateUpdateArtifacts(directory)).toThrow("invalid SHA-512");
    });

    it("rejects metadata for a different app version", () => {
        const directory = mkdtempSync(join(tmpdir(), "stremio-update-artifacts-"));
        for (const metadata of [
            "latest.yml",
            "latest-mac.yml",
            "latest-linux.yml",
            "latest-linux-arm64.yml",
        ]) {
            const platformDirectory = join(directory, metadata);
            mkdirSync(platformDirectory);
            const asset = `${metadata}.bin`;
            writeFileSync(join(platformDirectory, asset), "asset");
            writeFileSync(join(platformDirectory, metadata), [
                "version: 9.9.9",
                "files:",
                `  - url: ${asset}`,
                `    sha512: ${hash("asset")}`,
            ].join("\n"));
        }

        expect(() => validateUpdateArtifacts(directory)).toThrow(
            "has version 9.9.9; expected 1.0.2"
        );
    });

    it("rejects metadata whose URL basename does not match the local artifact", () => {
        const directory = mkdtempSync(join(tmpdir(), "stremio-update-artifacts-"));
        for (const metadata of [
            "latest.yml",
            "latest-mac.yml",
            "latest-linux.yml",
            "latest-linux-arm64.yml",
        ]) {
            const platformDirectory = join(directory, metadata);
            mkdirSync(platformDirectory);
            const localAsset = `${metadata}.bin`;
            const metadataAsset = metadata === "latest.yml"
                ? "safe-but-missing-name.bin"
                : localAsset;
            writeFileSync(join(platformDirectory, localAsset), "asset");
            writeFileSync(join(platformDirectory, metadata), [
                "version: 1.0.2",
                "files:",
                `  - url: ${metadataAsset}`,
                `    sha512: ${hash("asset")}`,
            ].join("\n"));
        }

        expect(() => validateUpdateArtifacts(directory)).toThrow(
            "references missing asset safe-but-missing-name.bin"
        );
    });
});
