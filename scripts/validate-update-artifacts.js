const { createHash } = require("crypto");
const { existsSync, readdirSync, readFileSync, statSync } = require("fs");
const { basename, join, resolve } = require("path");

const REQUIRED_METADATA = [
    "latest.yml",
    "latest-mac.yml",
    "latest-linux.yml",
    "latest-linux-arm64.yml",
];

function stripYamlString(value) {
    const trimmed = value.trim();
    if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        return trimmed.slice(1, -1);
    }
    return trimmed;
}

function parseFileEntries(metadata) {
    const entries = [];
    const pattern = /^\s*-\s+url:\s*(.+)\r?\n\s+sha512:\s*(.+)$/gm;
    for (const match of metadata.matchAll(pattern)) {
        const encodedUrl = stripYamlString(match[1]);
        let decodedUrl;
        try {
            decodedUrl = decodeURIComponent(encodedUrl);
        } catch {
            decodedUrl = encodedUrl;
        }
        entries.push({
            fileName: basename(decodedUrl),
            sha512: stripYamlString(match[2]),
        });
    }
    return entries;
}

function parseVersion(metadata) {
    const match = /^version:\s*(.+)$/m.exec(metadata);
    return match ? stripYamlString(match[1]) : null;
}

function listFiles(directory) {
    return readdirSync(directory).flatMap(name => {
        const path = join(directory, name);
        return statSync(path).isDirectory() ? listFiles(path) : [path];
    });
}

function sha512(path) {
    return createHash("sha512").update(readFileSync(path)).digest("base64");
}

function validateUpdateArtifacts(
    directory,
    expectedVersion = require("../package.json").version
) {
    const root = resolve(directory);
    if (!existsSync(root)) throw new Error(`Artifact directory does not exist: ${root}`);
    const files = listFiles(root);
    const filesByBaseName = new Map();
    for (const file of files) {
        const fileName = basename(file);
        if (filesByBaseName.has(fileName)) {
            throw new Error(`Duplicate release asset filename: ${fileName}`);
        }
        filesByBaseName.set(fileName, file);
    }
    const validated = [];

    for (const metadataName of REQUIRED_METADATA) {
        const metadataFiles = files.filter(path => basename(path) === metadataName);
        if (metadataFiles.length !== 1) {
            throw new Error(`Expected exactly one ${metadataName}, found ${metadataFiles.length}`);
        }

        const metadata = readFileSync(metadataFiles[0], "utf8");
        const version = parseVersion(metadata);
        if (version !== expectedVersion) {
            throw new Error(
                `${metadataName} has version ${version ?? "missing"}; expected ${expectedVersion}`
            );
        }
        const entries = parseFileEntries(metadata);
        if (entries.length === 0) throw new Error(`${metadataName} contains no update files`);

        for (const entry of entries) {
            const asset = filesByBaseName.get(entry.fileName);
            if (!asset) {
                throw new Error(
                    `${metadataName} references missing asset ${entry.fileName}`
                );
            }
            if (sha512(asset) !== entry.sha512) {
                throw new Error(`${metadataName} has an invalid SHA-512 for ${entry.fileName}`);
            }
            validated.push(entry.fileName);
        }
    }

    return validated;
}

if (require.main === module) {
    try {
        const validated = validateUpdateArtifacts(process.argv[2] || "release-artifacts");
        console.log(`Validated ${validated.length} update artifact references.`);
    } catch (error) {
        console.error(error instanceof Error ? error.message : error);
        process.exitCode = 1;
    }
}

module.exports = { parseFileEntries, parseVersion, validateUpdateArtifacts };
