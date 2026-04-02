import ModManager from './ModManager';
import { PlatformManager } from '../platform/PlatformManager';
import { STORAGE_KEYS } from '../constants';

// Mock PlatformManager
const mockPlatform = {
    exists: jest.fn(),
    readFile: jest.fn(),
    getPluginsPath: jest.fn().mockReturnValue('/mock/plugins'),
    getThemesPath: jest.fn().mockReturnValue('/mock/themes'),
    getEnhancedPath: jest.fn().mockReturnValue('/mock/enhanced'),
};

PlatformManager.setPlatform(mockPlatform as any);

describe('ModManager', () => {
    beforeEach(() => {
        // Clear DOM
        document.body.innerHTML = '';
        // Clear localStorage
        localStorage.clear();
        // Clear mocks
        jest.clearAllMocks();
    });

    describe('loadPlugin', () => {
        it('should load a plugin successfully when it exists', async () => {
            const pluginName = 'test-plugin.js';
            const pluginContent = 'console.log("plugin loaded");';

            mockPlatform.exists.mockResolvedValue(true);
            mockPlatform.readFile.mockResolvedValue(pluginContent);

            await ModManager.loadPlugin(pluginName);

            // Check if script element is added
            const scriptElement = document.getElementById(pluginName);
            expect(scriptElement).toBeTruthy();
            expect(scriptElement?.innerHTML).toBe(pluginContent);

            // Check localStorage
            const enabledPlugins = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || '[]');
            expect(enabledPlugins).toContain(pluginName);
        });

        it('should not add duplicate to localStorage if plugin is already in list', async () => {
            const pluginName = 'test-plugin.js';
            const pluginContent = 'console.log("plugin loaded");';

            // Pre-populate localStorage
            localStorage.setItem(STORAGE_KEYS.ENABLED_PLUGINS, JSON.stringify([pluginName]));

            mockPlatform.exists.mockResolvedValue(true);
            mockPlatform.readFile.mockResolvedValue(pluginContent);

            await ModManager.loadPlugin(pluginName);

            // Check localStorage - should only contain the plugin once
            const enabledPlugins = JSON.parse(localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || '[]');
            expect(enabledPlugins).toEqual([pluginName]);
            expect(enabledPlugins.length).toBe(1);
        });

        it('should do nothing if plugin is already loaded in DOM', async () => {
            const pluginName = 'test-plugin.js';

            // Add plugin to DOM
            const script = document.createElement('script');
            script.id = pluginName;
            document.body.appendChild(script);

            await ModManager.loadPlugin(pluginName);

            // exists should not be called
            expect(mockPlatform.exists).not.toHaveBeenCalled();
        });

        it('should log an error if plugin file is not found', async () => {
            const pluginName = 'non-existent-plugin.js';
            mockPlatform.exists.mockResolvedValue(false);

            await ModManager.loadPlugin(pluginName);

            // readFile should not be called
            expect(mockPlatform.readFile).not.toHaveBeenCalled();

            // DOM should not be modified
            expect(document.getElementById(pluginName)).toBeFalsy();
        });
    });
});
