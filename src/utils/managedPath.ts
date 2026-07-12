import { basename, isAbsolute, relative, resolve } from "path";

export function resolveManagedFilePath(
    rootPath: string,
    fileName: string,
    expectedExtension: string
): string | null {
    if (
        basename(fileName) !== fileName ||
        !/^[A-Za-z0-9._-]+$/.test(fileName) ||
        !fileName.endsWith(expectedExtension)
    ) {
        return null;
    }

    const resolvedRoot = resolve(rootPath);
    const resolvedPath = resolve(resolvedRoot, fileName);
    const pathWithinRoot = relative(resolvedRoot, resolvedPath);

    if (!pathWithinRoot || pathWithinRoot.startsWith("..") || isAbsolute(pathWithinRoot)) {
        return null;
    }

    return resolvedPath;
}
