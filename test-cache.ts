import { readFile } from 'fs/promises';
import { readFileSync } from 'fs';
import { join } from 'path';

class TemplateCacheAsync {
    private static cache = new Map<string, string>();

    public static async load(componentDir: string, templateName: string): Promise<string> {
        const cacheKey = `${componentDir}/${templateName}`;

        if (!this.cache.has(cacheKey)) {
            const templatePath = join(componentDir, `${templateName}.html`);
            this.cache.set(cacheKey, await readFile(templatePath, 'utf8'));
        }

        return this.cache.get(cacheKey)!;
    }

    public static clear(): void {
        this.cache.clear();
    }
}

class TemplateCacheSync {
    private static cache = new Map<string, string>();

    public static load(componentDir: string, templateName: string): string {
        const cacheKey = `${componentDir}/${templateName}`;

        if (!this.cache.has(cacheKey)) {
            const templatePath = join(componentDir, `${templateName}.html`);
            this.cache.set(cacheKey, readFileSync(templatePath, 'utf8'));
        }

        return this.cache.get(cacheKey)!;
    }

    public static clear(): void {
        this.cache.clear();
    }
}

import * as fs from 'node:fs';
fs.writeFileSync('dummy.html', '<div>Hello {{name}}</div>');

async function run() {
    TemplateCacheAsync.clear();
    let start = performance.now();
    for (let i = 0; i < 10000; i++) {
        await TemplateCacheAsync.load('.', 'dummy');
    }
    let end = performance.now();
    console.log(`Loaded async (cached) 10000 times in ${end - start}ms`);

    TemplateCacheSync.clear();
    start = performance.now();
    for (let i = 0; i < 10000; i++) {
        TemplateCacheSync.load('.', 'dummy');
    }
    end = performance.now();
    console.log(`Loaded sync (cached) 10000 times in ${end - start}ms`);
}

run();
