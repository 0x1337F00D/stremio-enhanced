import { join } from "path";
import { STORAGE_KEYS } from "../constants";
import { PlatformManager } from "../platform/PlatformManager";
import { getLogger } from "../utils/logger";
import { isSafeModFileName } from "../utils/modFileName";
import properties from "./Properties";

export type ThemeElementFactory = (
    themePath: string,
    themeFile: string
) => Promise<HTMLElement>;

class ThemeManager {
    private static readonly logger = getLogger("ThemeManager");

    public static async applyTheme(
        requestedTheme: string | undefined,
        createThemeElement: ThemeElementFactory
    ): Promise<boolean> {
        const themeFile = requestedTheme ?? localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);

        if (!themeFile || themeFile === "Default") {
            document.getElementById("activeTheme")?.remove();
            localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
            return true;
        }

        if (!isSafeModFileName(themeFile, "theme")) {
            this.logger.warn(`Refused to apply invalid theme name: ${themeFile}`);
            return false;
        }

        const themePath = join(properties.themesPath, themeFile);
        try {
            if (!await PlatformManager.current.exists(themePath)) {
                localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, "Default");
                return false;
            }

            const nextTheme = await createThemeElement(themePath, themeFile);
            nextTheme.id = "activeTheme";
            document.getElementById("activeTheme")?.remove();
            document.head.appendChild(nextTheme);
            localStorage.setItem(STORAGE_KEYS.CURRENT_THEME, themeFile);
            return true;
        } catch (error) {
            this.logger.error(`Failed to apply theme ${themeFile}: ${error}`);
            return false;
        }
    }
}

export default ThemeManager;
