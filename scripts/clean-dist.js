const { rmSync } = require("fs");
const { join, resolve } = require("path");

const projectRoot = resolve(__dirname, "..");
const distDirectory = join(projectRoot, "dist");

rmSync(distDirectory, { force: true, recursive: true });
