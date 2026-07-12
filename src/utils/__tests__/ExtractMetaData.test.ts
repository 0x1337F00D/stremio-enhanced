import { describe, it, expect, vi } from 'vitest';
import ExtractMetaData from '../ExtractMetaData';

// Mock logger to avoid spamming console during tests
vi.mock('../logger', () => ({
    default: {
        error: vi.fn(),
        warn: vi.fn(),
    }
}));

describe('ExtractMetaData.parseMetadataFromContent', () => {
    it('returns null for content without a valid comment block', () => {
        // Since parseMetadataFromContent is private, we test it through the public extractMetadataFromText method
        const content = `
            const a = 1;
            // just a regular comment
            /* not a doc comment */
        `;
        const result = ExtractMetaData.extractMetadataFromText(content);
        expect(result).toBeNull();
    });

    it('returns null when required metadata keys are missing', () => {
        // Missing 'author' and 'version'
        const content = `
            /**
             * @name Test Plugin
             * @description A test plugin
             */
        `;
        const result = ExtractMetaData.extractMetadataFromText(content);
        expect(result).toBeNull();
    });

    it('extracts valid metadata correctly', () => {
        const content = `
            /**
             * @name Test Plugin
             * @description A test plugin
             * @author Test Author
             * @version 1.0.0
             * @source https://github.com/test/plugin
             */
        `;
        const result = ExtractMetaData.extractMetadataFromText(content);
        expect(result).toEqual({
            name: 'Test Plugin',
            description: 'A test plugin',
            author: 'Test Author',
            version: '1.0.0',
            source: 'https://github.com/test/plugin',
        });
    });

    it('ignores duplicated tags and keeps the first one', () => {
        const content = `
            /**
             * @name Test Plugin
             * @description A test plugin
             * @author Test Author
             * @version 1.0.0
             * @version 2.0.0
             */
        `;
        const result = ExtractMetaData.extractMetadataFromText(content);
        expect(result).toEqual({
            name: 'Test Plugin',
            description: 'A test plugin',
            author: 'Test Author',
            version: '1.0.0', // Should be 1.0.0, not 2.0.0
        });
    });

    it('returns null when a required key is empty', () => {
        const content = `
            /**
             * @name
             * @description A test plugin
             * @author Test Author
             * @version 1.0.0
             */
        `;
        const result = ExtractMetaData.extractMetadataFromText(content);
        expect(result).toBeNull();
    });

    it('ignores unknown metadata keys', () => {
        const content = `
            /**
             * @name Test Plugin
             * @description A test plugin
             * @author Test Author
             * @version 1.0.0
             * @unknownKey some value
             */
        `;
        const result = ExtractMetaData.extractMetadataFromText(content);
        expect(result).toEqual({
            name: 'Test Plugin',
            description: 'A test plugin',
            author: 'Test Author',
            version: '1.0.0',
        });
    });

    it('handles multiple comment blocks and matches the first valid doc comment format', () => {
        const content = `
            /*
             * Regular block comment
             */

            /**
             * @name Test Plugin
             * @description A test plugin
             * @author Test Author
             * @version 1.0.0
             */
        `;
        const result = ExtractMetaData.extractMetadataFromText(content);
        expect(result).toEqual({
            name: 'Test Plugin',
            description: 'A test plugin',
            author: 'Test Author',
            version: '1.0.0',
        });
    });

    it('handles random formatting, extra spaces and multiline spacing inside the comment', () => {
        const content = `
            /**
             *    @name      Spaced Name
             *
             * @description    A plugin with weird spaces
             *
             * @author    Space Author
             *         @version 1.0.0
             */
        `;
        const result = ExtractMetaData.extractMetadataFromText(content);
        expect(result).toEqual({
            name: 'Spaced Name',
            description: 'A plugin with weird spaces',
            author: 'Space Author',
            version: '1.0.0',
        });
    });

    it('extracts repeated, typed plugin options', () => {
        const content = `
            /**
             * @name Configurable Plugin
             * @description A plugin with settings
             * @author Test Author
             * @version 1.0.0
             * @option {"id":"enabled","type":"boolean","label":"Enabled","default":true}
             * @option {"id":"label","type":"text","label":"Label","default":"Demo","maxLength":20}
             * @option {"id":"scale","type":"number","label":"Scale","default":2,"min":1,"max":4,"step":0.5}
             * @option {"id":"mode","type":"select","label":"Mode","default":"a","choices":[{"value":"a","label":"Mode A"},{"value":"b","label":"Mode B"}]}
             */
        `;

        expect(ExtractMetaData.extractMetadataFromText(content)?.options).toEqual([
            { id: 'enabled', type: 'boolean', label: 'Enabled', default: true },
            { id: 'label', type: 'text', label: 'Label', default: 'Demo', maxLength: 20 },
            { id: 'scale', type: 'number', label: 'Scale', default: 2, min: 1, max: 4, step: 0.5 },
            {
                id: 'mode',
                type: 'select',
                label: 'Mode',
                default: 'a',
                choices: [
                    { value: 'a', label: 'Mode A' },
                    { value: 'b', label: 'Mode B' },
                ],
            },
        ]);
    });

    it('ignores malformed, unsupported, and duplicate plugin options', () => {
        const content = `
            /**
             * @name Configurable Plugin
             * @description A plugin with settings
             * @author Test Author
             * @version 1.0.0
             * @option {not-json}
             * @option {"id":"valid","type":"boolean","label":"Valid","default":false}
             * @option {"id":"valid","type":"text","label":"Duplicate","default":"ignored"}
             * @option {"id":"unsupported","type":"color","label":"Color","default":"red"}
             * @option {"id":"badSelect","type":"select","label":"Mode","default":"missing","choices":[{"value":"a","label":"Mode A"}]}
             */
        `;

        expect(ExtractMetaData.extractMetadataFromText(content)?.options).toEqual([
            { id: 'valid', type: 'boolean', label: 'Valid', default: false },
        ]);
    });
});
