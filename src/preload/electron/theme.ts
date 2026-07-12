import { pathToFileURL } from "url";
import ThemeManager from "../../core/ThemeManager";

async function createElectronThemeElement(themePath: string): Promise<HTMLElement> {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = pathToFileURL(themePath).toString();
    return link;
}

export function applyElectronTheme(requestedTheme?: string): Promise<boolean> {
    return ThemeManager.applyTheme(requestedTheme, createElectronThemeElement);
}
