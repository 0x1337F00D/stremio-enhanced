const { channel, getDataPath } = require('bridge');
const fs = require('fs');
const os = require('os');
const path = require('path');

function serialize(value) {
    if (value instanceof Error) {
        return value.stack || value.message;
    }

    if (typeof value === 'string') {
        return value;
    }

    try {
        return JSON.stringify(value);
    } catch {
        return String(value);
    }
}

function emit(eventName, ...args) {
    try {
        channel.send(eventName, ...args);
    } catch {
        // The bridge can be unavailable during early startup failures.
    }
}

let logFilePath = null;

function appendLog(level, args) {
    if (!logFilePath) {
        return;
    }

    const line = `[${new Date().toISOString()}] [${level}] ${args.join(' ')}`;
    try {
        fs.appendFileSync(logFilePath, line + '\n');
    } catch {
        // Ignore log file write failures.
    }
}

function wrapConsole() {
    const originalLog = console.log.bind(console);
    const originalWarn = console.warn.bind(console);
    const originalError = console.error.bind(console);

    console.log = (...args) => {
        const safeArgs = args.map(serialize);
        appendLog('INFO', safeArgs);
        emit('log', ...safeArgs);
        originalLog(...args);
    };

    console.warn = (...args) => {
        const safeArgs = args.map(serialize);
        appendLog('WARN', safeArgs);
        emit('log', ...safeArgs);
        originalWarn(...args);
    };

    console.error = (...args) => {
        const safeArgs = args.map(serialize);
        appendLog('ERROR', safeArgs);
        emit('error', ...safeArgs);
        originalError(...args);
    };
}

function resolveAppPath() {
    try {
        const dataPath = getDataPath();
        if (dataPath) {
            return dataPath;
        }
    } catch {
        // Fall back below when the bridge is not ready.
    }

    return path.join(os.tmpdir(), 'stremio-enhanced');
}

const appPath = resolveAppPath();
fs.mkdirSync(appPath, { recursive: true });
logFilePath = path.join(appPath, 'stremio-server.log');

process.env.APP_PATH = appPath;
process.env.YTDL_NO_UPDATE = '1';

try {
    process.chdir(appPath);
} catch {
    // The runtime can still continue even if the working directory cannot be changed.
}

wrapConsole();

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception in bundled streaming server:', error);
});

process.on('unhandledRejection', (reason) => {
    console.error('Unhandled rejection in bundled streaming server:', reason);
});

console.log('Starting bundled Stremio streaming server');
console.log('APP_PATH:', appPath);

require('./server.js');
