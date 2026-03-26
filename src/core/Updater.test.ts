import Updater from './Updater';

// Mock fs
jest.mock("fs", () => ({
    readFileSync: jest.fn()
}));

// Mock logger
jest.mock("../utils/logger", () => ({
    getLogger: jest.fn(() => ({
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn()
    }))
}));

// Mock Helpers
jest.mock('../utils/Helpers', () => ({
    isNewerVersion: jest.fn(),
    showAlert: jest.fn()
}));

// Mock getUpdateModalTemplate
jest.mock("../components/update-modal/updateModal", () => ({
    getUpdateModalTemplate: jest.fn().mockResolvedValue('<div id="mock-modal">Update Modal</div>')
}));

// Mock fetch globally
global.fetch = jest.fn();

describe('Updater', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Reset the private versionCache by overriding via generic any casting or recreating Updater logic if needed
        // Since versionCache is private static, we can reset it this way in tests:
        (Updater as any).versionCache = null;
    });

    describe('getLatestVersion', () => {
        it('should return the latest version when fetch is successful', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                text: jest.fn().mockResolvedValueOnce('1.0.3')
            });

            const version = await Updater.getLatestVersion();
            expect(version).toBe('1.0.3');
            expect(global.fetch).toHaveBeenCalledWith(expect.any(String));
        });

        it('should throw an error when fetch fails', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 404,
                statusText: 'Not Found'
            });

            await expect(Updater.getLatestVersion()).rejects.toThrow('HTTP 404: Not Found');
        });
    });

    describe('getCurrentVersion', () => {
        it('should read the version from file and cache it', () => {
            const mockReadFileSync = require('fs').readFileSync as jest.Mock;
            mockReadFileSync.mockReturnValueOnce('1.0.2\n');

            const version = Updater.getCurrentVersion();
            expect(version).toBe('1.0.2');
            expect(mockReadFileSync).toHaveBeenCalledTimes(1);

            // Calling it again should use the cache
            const cachedVersion = Updater.getCurrentVersion();
            expect(cachedVersion).toBe('1.0.2');
            expect(mockReadFileSync).toHaveBeenCalledTimes(1); // Still 1
        });

        it('should handle file read error and return "0.0.0"', () => {
            const mockReadFileSync = require('fs').readFileSync as jest.Mock;
            mockReadFileSync.mockImplementationOnce(() => {
                throw new Error('File not found');
            });

            const version = Updater.getCurrentVersion();
            expect(version).toBe('0.0.0');
        });
    });

    describe('checkForUpdates', () => {
        let getLatestVersionSpy: jest.SpyInstance;
        let getCurrentVersionSpy: jest.SpyInstance;

        beforeEach(() => {
            getLatestVersionSpy = jest.spyOn(Updater, 'getLatestVersion');
            getCurrentVersionSpy = jest.spyOn(Updater, 'getCurrentVersion');
            document.body.innerHTML = ''; // Clear DOM
        });

        it('should show update modal if a newer version is available', async () => {
            getLatestVersionSpy.mockResolvedValueOnce('1.1.0');
            getCurrentVersionSpy.mockReturnValueOnce('1.0.0');

            // Mock DOM element
            const modalContainer = document.createElement('div');
            modalContainer.className = 'modals-container';
            document.body.appendChild(modalContainer);

            const helpers = require('../utils/Helpers');
            helpers.isNewerVersion.mockReturnValueOnce(true);

            const result = await Updater.checkForUpdates(false);

            expect(result).toBe(true);
            expect(helpers.isNewerVersion).toHaveBeenCalledWith('1.1.0', '1.0.0');
            expect(modalContainer.innerHTML).toBe('<div id="mock-modal">Update Modal</div>');
        });

        it('should return false but not show alert if no newer version and showNoUpdatePrompt is false', async () => {
            getLatestVersionSpy.mockResolvedValueOnce('1.0.0');
            getCurrentVersionSpy.mockReturnValueOnce('1.0.0');

            const helpers = require('../utils/Helpers');
            helpers.isNewerVersion.mockReturnValueOnce(false);

            const result = await Updater.checkForUpdates(false);

            expect(result).toBe(false);
            expect(helpers.showAlert).not.toHaveBeenCalled();
        });

        it('should show alert if no newer version and showNoUpdatePrompt is true', async () => {
            getLatestVersionSpy.mockResolvedValueOnce('1.0.0');
            getCurrentVersionSpy.mockReturnValueOnce('1.0.0');

            const helpers = require('../utils/Helpers');
            helpers.isNewerVersion.mockReturnValueOnce(false);

            const result = await Updater.checkForUpdates(true);

            expect(result).toBe(false);
            expect(helpers.showAlert).toHaveBeenCalledWith(
                "info",
                "No update available!",
                "You're running the latest version (v1.0.0).",
                ["OK"]
            );
        });

        it('should show error alert if check fails and showNoUpdatePrompt is true', async () => {
            getLatestVersionSpy.mockRejectedValueOnce(new Error('Network error'));

            const helpers = require('../utils/Helpers');

            const result = await Updater.checkForUpdates(true);

            expect(result).toBe(false);
            expect(helpers.showAlert).toHaveBeenCalledWith(
                "error",
                "Update check failed",
                "Could not check for updates. Please check your internet connection.",
                ["OK"]
            );
        });

        it('should return false and not show error alert if check fails and showNoUpdatePrompt is false', async () => {
            getLatestVersionSpy.mockRejectedValueOnce(new Error('Network error'));

            const helpers = require('../utils/Helpers');

            const result = await Updater.checkForUpdates(false);

            expect(result).toBe(false);
            expect(helpers.showAlert).not.toHaveBeenCalled();
        });
    });

    describe('getReleaseNotes', () => {
        it('should return release notes body on successful fetch', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValueOnce({ body: 'Release note details' })
            });

            const notes = await Updater.getReleaseNotes();
            expect(notes).toBe('Release note details');
        });

        it('should return fallback text when body is missing', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValueOnce({})
            });

            const notes = await Updater.getReleaseNotes();
            expect(notes).toBe('No release notes available.');
        });

        it('should handle fetch failure and return error message', async () => {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: 'Server Error'
            });

            const notes = await Updater.getReleaseNotes();
            expect(notes).toBe('Could not load release notes.');
        });
    });
});
