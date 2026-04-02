import { PlatformManager } from "../PlatformManager";
import { ElectronPlatform } from "../ElectronPlatform";
import { CapacitorPlatform } from "../CapacitorPlatform";

// Mock the platform classes so we don't actually instantiate them
jest.mock("../ElectronPlatform", () => {
    return {
        ElectronPlatform: jest.fn().mockImplementation(() => {
            return { id: "electron" };
        })
    };
});

jest.mock("../CapacitorPlatform", () => {
    return {
        CapacitorPlatform: jest.fn().mockImplementation(() => {
            return { id: "capacitor" };
        })
    };
});

describe("PlatformManager", () => {
    const originalProcess = global.process;
    const originalWindow = global.window;

    beforeEach(() => {
        // Reset the static instance before each test
        // @ts-expect-error - Accessing private static property for testing
        PlatformManager._current = undefined;

        jest.clearAllMocks();
    });

    afterEach(() => {
        global.process = originalProcess;
        global.window = originalWindow;
    });

    describe("init", () => {
        it("should instantiate ElectronPlatform when process.versions.electron is defined", () => {
            global.process = {
                ...originalProcess,
                versions: {
                    ...originalProcess.versions,
                    electron: "1.0.0"
                }
            } as NodeJS.Process;

            PlatformManager.init();

            expect(ElectronPlatform).toHaveBeenCalled();
            expect(PlatformManager.current.id).toBe("electron");
        });

        it("should instantiate CapacitorPlatform when window.capacitor is defined", () => {
            // Need to temporarily remove process.versions.electron if it exists
            const { electron, ...otherVersions } = originalProcess.versions || {};
            global.process = {
                ...originalProcess,
                versions: otherVersions
            } as NodeJS.Process;

            global.window = {
                capacitor: {}
            } as any;

            PlatformManager.init();

            expect(CapacitorPlatform).toHaveBeenCalled();
            expect(PlatformManager.current.id).toBe("capacitor");
        });

        it("should throw an error if neither environment is detected", () => {
            // Remove electron from process.versions
            const { electron, ...otherVersions } = originalProcess.versions || {};
            global.process = {
                ...originalProcess,
                versions: otherVersions
            } as NodeJS.Process;

            // Ensure window.capacitor is undefined
            global.window = undefined as any;

            expect(() => {
                PlatformManager.init();
            }).toThrow("Unknown platform");
        });
    });

    describe("current", () => {
        it("should throw an error if platform is not initialized", () => {
            expect(() => {
                const _ = PlatformManager.current; void _;
            }).toThrow("PlatformManager not initialized");
        });
    });
});
