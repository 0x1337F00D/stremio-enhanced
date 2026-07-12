import { ipcRenderer } from "electron";
import { getAboutCategoryTemplate } from "../../components/about-category/aboutCategory";
import { CLASSES, IPC_CHANNELS, SELECTORS, STORAGE_KEYS } from "../../constants";
import DiscordPresence from "../../core/DiscordPresence";
import ModManager from "../../core/ModManager";
import Settings from "../../core/Settings";
import Updater from "../../core/Updater";
import Helpers from "../../utils/Helpers";
import { getLogger } from "../../utils/logger";
import { getTransparencyStatus } from "./windowChrome";

const logger = getLogger("DesktopPreferences");

function bindWhenReady(
    selector: string,
    bindingKey: string,
    bind: (element: HTMLElement) => void
): void {
    Helpers.waitForElm(selector).then(() => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element || element.dataset[bindingKey] === "true") return;
        element.dataset[bindingKey] = "true";
        bind(element);
    }).catch(error => logger.error(`Failed to bind ${selector}: ${error}`));
}

function setupCheckUpdatesButton(): void {
    bindWhenReady("#checkforupdatesBtn", "stremioEnhancedUpdateBound", button => {
        button.addEventListener("click", async () => {
            if (button.getAttribute("aria-busy") === "true") return;
            button.setAttribute("aria-busy", "true");
            button.style.pointerEvents = "none";
            try {
                await Updater.checkForUpdates(true);
            } finally {
                button.removeAttribute("aria-busy");
                button.style.pointerEvents = "";
            }
        });
    });
}

function setupCheckUpdatesOnStartupToggle(): void {
    bindWhenReady(
        "#checkForUpdatesOnStartup",
        "stremioEnhancedUpdatePreferenceBound",
        toggle => {
            toggle.addEventListener("click", () => {
                toggle.classList.toggle(CLASSES.CHECKED);
                const enabled = toggle.classList.contains(CLASSES.CHECKED);
                localStorage.setItem(
                    STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP,
                    String(enabled)
                );
            });
        }
    );
}

function setupDiscordToggle(): void {
    bindWhenReady("#discordrichpresence", "stremioEnhancedDiscordBound", toggle => {
        toggle.addEventListener("click", async () => {
            toggle.classList.toggle(CLASSES.CHECKED);
            const enabled = toggle.classList.contains(CLASSES.CHECKED);
            localStorage.setItem(STORAGE_KEYS.DISCORD_RPC, String(enabled));

            if (enabled) {
                DiscordPresence.start();
                await DiscordPresence.discordRPCHandler();
            } else {
                DiscordPresence.stop();
            }
        });
    });
}

function setupTransparencyToggle(): void {
    bindWhenReady(
        "#enableTransparentThemes",
        "stremioEnhancedTransparencyBound",
        toggle => {
            toggle.addEventListener("click", () => {
                toggle.classList.toggle(CLASSES.CHECKED);
                ipcRenderer.send(
                    IPC_CHANNELS.SET_TRANSPARENCY,
                    toggle.classList.contains(CLASSES.CHECKED)
                );
            });
        }
    );
}

export function addDesktopSettingsControls(): void {
    Settings.addButton("Open Themes Folder", "openthemesfolderBtn", SELECTORS.THEMES_CATEGORY);
    Settings.addButton("Open Plugins Folder", "openpluginsfolderBtn", SELECTORS.PLUGINS_CATEGORY);
    setupCheckUpdatesButton();
    setupCheckUpdatesOnStartupToggle();
    setupDiscordToggle();
    setupTransparencyToggle();
    ModManager.openThemesFolder();
    ModManager.openPluginsFolder();
}

export function renderDesktopAbout(): void {
    Helpers.waitForElm(SELECTORS.ABOUT_CATEGORY).then(async () => {
        const aboutCategory = document.querySelector(SELECTORS.ABOUT_CATEGORY);
        if (!aboutCategory || document.getElementById("stremio-enhanced-about-content")) {
            return;
        }

        const content = document.createElement("div");
        content.id = "stremio-enhanced-about-content";
        content.innerHTML = getAboutCategoryTemplate(
            Updater.getCurrentVersion(),
            localStorage.getItem(STORAGE_KEYS.CHECK_UPDATES_ON_STARTUP) === "true",
            localStorage.getItem(STORAGE_KEYS.DISCORD_RPC) === "true",
            await getTransparencyStatus()
        );
        aboutCategory.appendChild(content);
    }).catch(error => logger.error(`Failed to render About settings: ${error}`));
}
