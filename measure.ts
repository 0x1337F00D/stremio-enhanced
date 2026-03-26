import TemplateCache from './src/utils/templateCache';
import * as fs from 'node:fs';

// Let's create a dummy template file
fs.writeFileSync('dummy.html', '<div>Hello {{name}}</div>');

const start = performance.now();
for (let i = 0; i < 10000; i++) {
    TemplateCache.clear();
    TemplateCache.load('.', 'dummy');
}
const end = performance.now();

console.log(`Loaded and cleared cache 10000 times in ${end - start}ms`);
