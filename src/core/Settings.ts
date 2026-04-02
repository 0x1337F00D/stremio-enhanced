import Helpers from "../utils/Helpers";
import { MetaData } from "../interfaces/MetaData";
import { getPluginItemTemplate } from "../components/plugin-item/pluginItem";
import { getThemeItemTemplate } from "../components/theme-item/themeItem";
import { getEnhancedNav } from "../components/enhanced-nav/enhancedNav";
import { getLogger } from "../utils/logger";
import ModManager from "./ModManager";
import { SELECTORS, CLASSES, STORAGE_KEYS } from "../constants";

class Settings {
    private static logger = getLogger("Settings");

    private static getCategoryKey(sectionId: string, title: string): string {
        return `${sectionId}:${title.trim().toLowerCase()}`;
    }

    private static getExistingCategory(section: HTMLElement, sectionId: string, title: string): HTMLElement | null {
        const categoryKey = this.getCategoryKey(sectionId, title);
        const categoryByKey = section.querySelector<HTMLElement>(`[data-stremio-enhanced-category="${categoryKey}"]`);
        if (categoryByKey) return categoryByKey;

        return Array.from(section.children).find((child): child is HTMLElement => {
            if (!(child instanceof HTMLElement)) return false;
            const label = child.querySelector(SELECTORS.CATEGORY_LABEL);
            return label?.textContent?.trim() === title;
        }) ?? null;
    }

    private static ensureNavItem(sectionId: string, title: string): void {
        this.waitForNavMenu().then(() => {
            const nav = this.getNavMenu();
            const shortcutsNav = this.getNavShortcutItem();

            if (!nav) {
                this.logger.error("nav menu is still null after wait");
                return;
            }

            const existingNav = nav.querySelector<HTMLElement>(`[data-section="${sectionId}"]`);
            if (existingNav) {
                existingNav.setAttribute("title", title);
                existingNav.textContent = title;
                return;
            }

            const enhancedNavContainer = document.createElement("div");
            enhancedNavContainer.innerHTML = getEnhancedNav();

            const childToAppend = (enhancedNavContainer.firstElementChild as HTMLElement | null) ?? enhancedNavContainer;
            childToAppend.setAttribute("data-section", sectionId);
            childToAppend.setAttribute("title", title);
            childToAppend.textContent = title;

            if (shortcutsNav && shortcutsNav.parentNode === nav) {
                nav.insertBefore(childToAppend, shortcutsNav.nextSibling);
            } else {
                nav.appendChild(childToAppend);
            }
        }).catch(err => this.logger.error(`Failed to add nav: ${err}`));
    }

    /**
     * Add a new section to the settings panel
     */
    public static addSection(sectionId: string, title: string): void {
        this.waitForSettingsPanel().then(() => {
            const settingsPanel = this.getSettingsPanel();
            if (!settingsPanel) return;

            let sectionContainer = document.getElementById(sectionId) as HTMLElement | null;

            if (!sectionContainer) {
                this.logger.info(`Adding section: ${sectionId} with title: ${title}`);

                const sectionElement = this.getExistingSection(settingsPanel);
                const labelElement = this.getExistingSectionLabel(sectionElement);

                if (!sectionElement || !labelElement) return;

                const sectionClassName = sectionElement.className;
                const titleClassName = labelElement.className;

                sectionContainer = document.createElement("div");
                sectionContainer.className = sectionClassName;
                sectionContainer.id = sectionId;
                sectionContainer.setAttribute("data-stremio-enhanced-section", sectionId);

                const sectionTitle = document.createElement("div");
                sectionTitle.className = titleClassName;
                sectionTitle.textContent = title;

                sectionContainer.appendChild(sectionTitle);
                settingsPanel.appendChild(sectionContainer);
            }

            this.ensureNavItem(sectionId, title);
        }).catch(err => this.logger.error(`Failed to add section: ${err}`));
    }

    /**
     * Add a category within a section
     */
    public static addCategory(title: string, sectionId: string, icon: string): void {
        this.waitForSettingsPanel().then(() => {
            const section = document.getElementById(sectionId);
            if (!(section instanceof HTMLElement)) return;

            if (this.getExistingCategory(section, sectionId, title)) return;

            this.logger.info(`Adding category: ${title} to section: ${sectionId}`);

            const categoryTemplate = this.getCategoryTemplate();
            if (!categoryTemplate) return;

            const { categoryClass, categoryTitleClass, headingClass, iconClass } = categoryTemplate;

            icon = icon.replace(`class="icon"`, `class="${iconClass}"`);

            const categoryDiv = document.createElement("div");
            categoryDiv.className = categoryClass;
            categoryDiv.setAttribute("data-stremio-enhanced-category", this.getCategoryKey(sectionId, title));
            
            const titleDiv = document.createElement("div");
            titleDiv.className = categoryTitleClass;
            titleDiv.textContent = title;

            const headingDiv = document.createElement("div");
            // If we found a class, use it. If not, fallback to selector logic or empty
            if (headingClass) {
                headingDiv.className = headingClass;
            } else {
                 headingDiv.classList.add(SELECTORS.CATEGORY_HEADING.replace('.', ''));
            }

            headingDiv.innerHTML += icon;
            headingDiv.appendChild(titleDiv);
            
            categoryDiv.appendChild(headingDiv);
            section.appendChild(categoryDiv);
        }).catch(err => this.logger.error(`Failed to add category: ${err}`));
    }

    /**
     * Add a button to the settings
     */
    public static addButton(title: string, id: string, query: string): void {
        Helpers.waitForElm(query).then(() => {
            if (document.getElementById(id)) return;

            const element = document.querySelector(query);
            if (!element) return;

            const optionDiv = document.createElement("div");
            optionDiv.classList.add(CLASSES.OPTION);

            const contentDiv = document.createElement("div");
            contentDiv.classList.add(CLASSES.CONTENT);

            const buttonDiv = document.createElement("div");
            buttonDiv.setAttribute("tabindex", "0");
            buttonDiv.setAttribute("title", title);
            buttonDiv.classList.add(CLASSES.BUTTON, CLASSES.BUTTON_CONTAINER, "button");
            buttonDiv.id = id;
            buttonDiv.textContent = title;

            contentDiv.appendChild(buttonDiv);
            optionDiv.appendChild(contentDiv);
            element.appendChild(optionDiv);
        }).catch(err => this.logger.error(`Failed to add button: ${err}`));
    }

    /**
     * Add a theme or plugin item to the settings
     */
    public static addItem(type: "theme" | "plugin", fileName: string, metaData: MetaData): void {
        this.logger.info(`Adding ${type}: ${fileName}`);

        if (document.getElementsByName(`${fileName}-box`).length > 0) {
            return;
        }
        
        if (type === "theme") {
            Helpers.waitForElm(SELECTORS.THEMES_CATEGORY).then(() => {
                this.addTheme(fileName, metaData);
            }).catch(err => this.logger.error(`Failed to add theme: ${err}`));
        } else if (type === "plugin") {
            Helpers.waitForElm(SELECTORS.PLUGINS_CATEGORY).then(() => {
                this.addPlugin(fileName, metaData);
            }).catch(err => this.logger.error(`Failed to add plugin: ${err}`));
        }        
    }

    private static addPlugin(fileName: string, metaData: MetaData): void {
        if (document.getElementsByName(`${fileName}-box`).length > 0) {
            return;
        }

        const enabledPlugins: string[] = JSON.parse(
            localStorage.getItem(STORAGE_KEYS.ENABLED_PLUGINS) || "[]"
        );

        const pluginContainer = document.createElement("div");
        pluginContainer.innerHTML = getPluginItemTemplate(fileName, metaData, enabledPlugins.includes(fileName));
        pluginContainer.setAttribute("name", `${fileName}-box`);
        pluginContainer.setAttribute("data-stremio-enhanced-item", fileName);

        const pluginsCategory = document.querySelector(SELECTORS.PLUGINS_CATEGORY);
        pluginsCategory?.appendChild(pluginContainer);
        
        ModManager.checkForItemUpdates(fileName);
    }

    private static addTheme(fileName: string, metaData: MetaData): void {
        if (document.getElementsByName(`${fileName}-box`).length > 0) {
            return;
        }

        const currentTheme = localStorage.getItem(STORAGE_KEYS.CURRENT_THEME);

        const themeContainer = document.createElement("div");
        themeContainer.innerHTML = getThemeItemTemplate(fileName, metaData, currentTheme === fileName);
        themeContainer.setAttribute("name", `${fileName}-box`);
        themeContainer.setAttribute("data-stremio-enhanced-item", fileName);

        const themesCategory = document.querySelector(SELECTORS.THEMES_CATEGORY);
        themesCategory?.appendChild(themeContainer);
        
        ModManager.checkForItemUpdates(fileName);
    }

    /**
     * Remove an item from the settings
     */
    public static removeItem(fileName: string): void {
        Array.from(document.getElementsByName(`${fileName}-box`)).forEach((element) => {
            element.remove();
        });
    }

    /**
     * Set a navigation element as active
     */
    public static activeSection(element: Element): void {
        const nav = this.getNavMenu();
        if (nav) {
            // Remove selected class from all nav items
            for (let i = 0; i < nav.children.length; i++) {
                nav.children[i].classList.remove(CLASSES.SELECTED);
            }
        } else {
             // Fallback to querySelector
             for (let i = 0; i < 6; i++) {
                const navItem = document.querySelector(`${SELECTORS.NAV_MENU} > div:nth-child(${i})`);
                navItem?.classList.remove(CLASSES.SELECTED);
            }
        }

        element.classList.add(CLASSES.SELECTED);
    }

    // --- Dynamic Discovery Helpers ---

    private static getNavMenu(): Element | null {
        // Try selector
        const nav = document.querySelector(SELECTORS.NAV_MENU);
        if (nav) return nav;

        // Dynamic fallback
        const keywords = ["General", "Interface", "Player", "Streaming", "Shortcuts"];
        const links = Array.from(document.querySelectorAll('a, div[title]'));

        for (const link of links) {
             const title = link.getAttribute('title');
             if (title && keywords.includes(title)) {
                 let parent = link.parentElement;
                 while(parent) {
                     const found = keywords.filter(k => parent!.querySelector(`[title="${k}"]`));
                     if (found.length >= 1) { // Changed to 1 to be more permissive on mobile
                         return parent;
                     }
                     parent = parent.parentElement;
                     if (parent === document.body) break;
                 }
             }
        }
        return null;
    }

    private static getNavShortcutItem(): Element | null {
        const item = document.querySelector('[title="Shortcuts"]') || document.querySelector('[title="Streaming"]');
        return item;
    }

    private static getSettingsPanel(): Element | null {
        // Try selector
        const panel = document.querySelector(SELECTORS.SECTIONS_CONTAINER);
        if (panel) return panel;

        // Dynamic fallback
        const navMenu = this.getNavMenu();
        const keywords = ["General", "Interface", "Player", "Streaming", "Shortcuts"];
        const allDivs = Array.from(document.querySelectorAll('div'));
        for (const div of allDivs) {
             // Exclude nav menu and its descendants
             if (navMenu && (div === navMenu || navMenu.contains(div))) continue;

             // The real settings panel contains large sections, so we can check if it has multiple children
             if (div.children.length >= 2) { // Changed to >= 2 to be more permissive on mobile
                 let matchCount = 0;
                 for (let i = 0; i < div.children.length; i++) {
                     if (keywords.some(k => div.children[i].textContent?.includes(k))) {
                         matchCount++;
                     }
                 }
                 if (matchCount >= 1) return div; // Changed to >= 1 to be more permissive on mobile
             }
        }
        return null;
    }

    private static getExistingSection(panel: Element): Element | null {
        // Find a child that contains "General" or "Player"
        const keywords = ["General", "Interface", "Player", "Streaming", "Shortcuts"];
        for (let i = 0; i < panel.children.length; i++) {
            const child = panel.children[i];
            if (keywords.some(k => child.textContent?.includes(k))) {
                return child;
            }
        }
        // Fallback to selector
        return document.querySelector(SELECTORS.SECTION);
    }

    private static getExistingSectionLabel(section: Element | null): Element | null {
        if (!section) return null;
        // The label is usually the first child or class contains label
        if (section.children.length > 0) return section.children[0];
        // Fallback
        return document.querySelector(SELECTORS.LABEL);
    }

    private static getCategoryTemplate(): { categoryClass: string, categoryTitleClass: string, headingClass: string, iconClass: string } | null {
        // Try to find an existing category to copy classes
        const categoryElement = document.querySelector(SELECTORS.CATEGORY);
        const categoryTitleElement = document.querySelector(SELECTORS.CATEGORY_LABEL);
        const categoryIconElement = document.querySelector(SELECTORS.CATEGORY_ICON);
        const categoryHeadingElement = document.querySelector(SELECTORS.CATEGORY_HEADING);

        let categoryClass = categoryElement?.className || "";
        let categoryTitleClass = categoryTitleElement?.className || "";
        let headingClass = categoryHeadingElement?.className || "";

        let iconClass = 'icon';
        if (categoryIconElement instanceof SVGElement) {
            iconClass = categoryIconElement.className.baseVal;
        } else if (categoryIconElement) {
            iconClass = categoryIconElement.className;
        }

        if (categoryClass && categoryTitleClass) {
            return { categoryClass, categoryTitleClass, headingClass, iconClass };
        }

        // Try dynamic if selector failed
        const panel = this.getSettingsPanel();
        if (panel) {
            const section = this.getExistingSection(panel);
            if (section) {
                // Find a category inside section
                // Usually not the first child (Label)
                for(let i=0; i<section.children.length; i++) {
                    const child = section.children[i];
                    // Skip if it is the label/title
                    const label = this.getExistingSectionLabel(section);
                    if (child === label) continue;

                    // This child is likely a category
                    categoryClass = child.className;

                    // Find Heading
                    const heading = child.children[0]; // Assuming first child is heading
                    if (heading) {
                        headingClass = heading.className;
                        // Heading contains Icon and Title
                         const icon = heading.querySelector('svg') || heading.children[0];
                         if (icon) {
                             if (icon instanceof SVGElement) iconClass = icon.className.baseVal;
                             else iconClass = icon.className;
                         }

                         const title = heading.querySelector('div') || heading.children[1];
                         if (title) categoryTitleClass = title.className;
                    }

                    if (categoryClass && categoryTitleClass) {
                         return { categoryClass, categoryTitleClass, headingClass, iconClass };
                    }
                }
            }
        }

        return null;
    }

    private static waitForSettingsPanel(): Promise<void> {
        return new Promise((resolve) => {
            let retries = 0;
            const maxRetries = 40; // 20 seconds
            const interval = setInterval(() => {
                if (this.getSettingsPanel()) {
                    clearInterval(interval);
                    resolve();
                } else {
                    retries++;
                    if (retries > maxRetries) {
                         clearInterval(interval);
                         this.logger.error("Timeout waiting for settings panel");
                         resolve(); // resolve to let it fail gracefully inside
                    }
                }
            }, 500);
        });
    }

    private static waitForNavMenu(): Promise<void> {
         return new Promise((resolve) => {
            let retries = 0;
            const maxRetries = 40; // 20 seconds
            const interval = setInterval(() => {
                if (this.getNavMenu()) {
                    clearInterval(interval);
                    resolve();
                } else {
                    retries++;
                    if (retries > maxRetries) {
                         clearInterval(interval);
                         this.logger.error("Timeout waiting for nav menu");
                         resolve();
                    }
                }
            }, 500);
        });
    }
}

export default Settings;
