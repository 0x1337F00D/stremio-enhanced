const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.join(__dirname, '..');
const CONSTANTS_FILE = path.join(REPO_ROOT, 'src/constants/index.ts');
const WRAPPER_TEMPLATE_FILE = path.join(__dirname, 'templates/android-nodejs-wrapper.js');
const TARGET_DIRS = [
    path.join(REPO_ROOT, 'dist/nodejs'),
    path.join(REPO_ROOT, 'android/app/src/main/assets/public/nodejs'),
];
const SERVER_URL_METADATA_FILE = '.server-source-url';

function ensureDir(dirPath) {
    fs.mkdirSync(dirPath, { recursive: true });
}

function readServerJsUrl() {
    const constantsSource = fs.readFileSync(CONSTANTS_FILE, 'utf8');
    const match = constantsSource.match(/export const SERVER_JS_URL = ["'`](.+?)["'`]/);
    if (!match) {
        throw new Error(`Could not read SERVER_JS_URL from ${CONSTANTS_FILE}`);
    }
    return match[1];
}

function readWrapperTemplate() {
    return fs.readFileSync(WRAPPER_TEMPLATE_FILE, 'utf8');
}

function readCachedServerSource(serverJsUrl) {
    for (const targetDir of TARGET_DIRS) {
        const targetFile = path.join(targetDir, 'server.js');
        const metadataFile = path.join(targetDir, SERVER_URL_METADATA_FILE);
        if (!fs.existsSync(targetFile)) {
            continue;
        }

        if (!fs.existsSync(metadataFile)) {
            continue;
        }

        const cachedServerJsUrl = fs.readFileSync(metadataFile, 'utf8').trim();
        if (cachedServerJsUrl !== serverJsUrl) {
            continue;
        }

        const stats = fs.statSync(targetFile);
        if (stats.size === 0) {
            continue;
        }

        console.log(`Reusing cached server.js from ${targetFile}`);
        return fs.readFileSync(targetFile, 'utf8');
    }

    return null;
}

function downloadText(url) {
    return new Promise((resolve, reject) => {
        const request = (downloadUrl) => {
            https.get(downloadUrl, { headers: { 'User-Agent': 'Stremio-Enhanced-Android-Build' } }, (response) => {
                if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                    const redirectedUrl = new URL(response.headers.location, downloadUrl).toString();
                    request(redirectedUrl);
                    return;
                }

                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download server.js: HTTP ${response.statusCode}`));
                    return;
                }

                const chunks = [];
                response.setEncoding('utf8');
                response.on('data', chunk => chunks.push(chunk));
                response.on('end', () => resolve(chunks.join('')));
                response.on('error', reject);
            }).on('error', reject);
        };

        request(url);
    });
}

function writeNodejsBundle(targetDir, serverSource, wrapperSource, serverJsUrl) {
    ensureDir(targetDir);

    fs.writeFileSync(path.join(targetDir, 'server.js'), serverSource);
    fs.writeFileSync(path.join(targetDir, 'wrapper.js'), wrapperSource);
    fs.writeFileSync(path.join(targetDir, SERVER_URL_METADATA_FILE), serverJsUrl + '\n');
    fs.writeFileSync(
        path.join(targetDir, 'package.json'),
        JSON.stringify({
            name: 'stremio-server',
            version: '1.0.0',
            private: true,
            main: 'wrapper.js',
        }, null, 2) + '\n'
    );

    console.log(`Prepared Android node bundle in ${targetDir}`);
}

async function run() {
    const serverJsUrl = readServerJsUrl();
    const wrapperSource = readWrapperTemplate();
    const cachedServerSource = process.env.FORCE_DOWNLOAD_SERVER === '1'
        ? null
        : readCachedServerSource(serverJsUrl);

    const serverSource = cachedServerSource ?? await downloadText(serverJsUrl);
    if (!serverSource || serverSource.length === 0) {
        throw new Error('Downloaded server.js is empty');
    }

    for (const targetDir of TARGET_DIRS) {
        writeNodejsBundle(targetDir, serverSource, wrapperSource, serverJsUrl);
    }
}

run().catch((error) => {
    console.error(`Failed to prepare Android streaming server bundle: ${error.message}`);
    process.exit(1);
});
