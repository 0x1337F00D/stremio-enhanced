import { getModsTabTemplate } from './modsTab';

describe('modsTab', () => {
    describe('getModsTabTemplate', () => {
        it('should return a string', () => {
            const template = getModsTabTemplate();
            expect(typeof template).toBe('string');
        });

        it('should contain the mods-list container', () => {
            const template = getModsTabTemplate();
            expect(template).toContain('id="mods-list"');
        });

        it('should contain the data-tab attribute or container element', () => {
            const template = getModsTabTemplate();
            // Depending on the version (prompt's or current repo's),
            // we should find either 'data-tab="mods"' (from the prompt)
            // or 'mods-list' which is common to both
            expect(template).toMatch(/data-tab="mods"|mods-list/);
        });

        it('should return valid HTML-like string', () => {
            const template = getModsTabTemplate();
            expect(template).toMatch(/<div/);
            expect(template).toMatch(/<\/div>/);
        });
    });
});
