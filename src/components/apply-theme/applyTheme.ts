import { readFileSync } from 'fs';
import { pathToFileURL } from 'url';
import { join } from 'path';
import Properties from '../../core/Properties';

let cachedTemplate: string | null = null;

export function getApplyThemeTemplate(): string {
    if (cachedTemplate === null) {
        // Note: This loads a .js file, not HTML, so we don't use template cache
        cachedTemplate = readFileSync(join(__dirname, 'apply-theme.js'), 'utf8');
    }
    const themeBaseURL = pathToFileURL(Properties.themesPath).toString();

    return cachedTemplate.replace("{{ themesPath }}", themeBaseURL);
}
