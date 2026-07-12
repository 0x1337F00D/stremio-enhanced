import { contextBridge } from "electron";
import { createStremioEnhancedApi } from "./core/StremioEnhancedApi";
import { ElectronPlatform } from "./platform/ElectronPlatform";
import { PlatformManager } from "./platform/PlatformManager";
import { initializeElectronPreload } from "./preload/electron/bootstrap";
import { applyElectronTheme } from "./preload/electron/theme";

PlatformManager.setPlatform(new ElectronPlatform());

contextBridge.exposeInMainWorld(
    "stremioEnhanced",
    createStremioEnhancedApi(applyElectronTheme)
);

window.addEventListener("load", () => {
    void initializeElectronPreload();
});
