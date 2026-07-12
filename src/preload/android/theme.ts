import ThemeManager from "../../core/ThemeManager";
import { PlatformManager } from "../../platform/PlatformManager";

async function createAndroidThemeElement(themePath: string): Promise<HTMLElement> {
    const style = document.createElement("style");
    style.textContent = await PlatformManager.current.readFile(themePath);
    return style;
}

export function applyAndroidTheme(requestedTheme?: string): Promise<boolean> {
    return ThemeManager.applyTheme(requestedTheme, createAndroidThemeElement);
}
