import { readFile } from 'fs/promises';
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

import * as fs from 'node:fs';

fs.writeFileSync('dummy.html', '<div>Hello {{name}}</div>');

async function run() {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
        TemplateCacheAsync.clear();
        await TemplateCacheAsync.load('.', 'dummy');
    }
    const end = performance.now();

    console.log(`Loaded async and cleared cache 10000 times in ${end - start}ms`);
}

run();
