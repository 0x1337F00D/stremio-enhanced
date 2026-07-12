// @vitest-environment jsdom

import { readFileSync } from "fs";
import { resolve } from "path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

function createMemoryStorage(): Storage {
    const values = new Map<string, string>();
    return {
        get length() { return values.size; },
        clear: () => values.clear(),
        getItem: key => values.get(key) ?? null,
        key: index => Array.from(values.keys())[index] ?? null,
        removeItem: key => { values.delete(key); },
        setItem: (key, value) => { values.set(key, String(value)); },
    };
}

describe("library-categories example plugin", () => {
    function installPlugin(): HTMLScriptElement {
        const plugin = document.createElement("script");
        plugin.id = "library-categories.plugin.js";
        plugin.dataset.stremioEnhancedPlugin = plugin.id;
        plugin.textContent = readFileSync(
            resolve(process.cwd(), "examples/library-categories.plugin.js"),
            "utf8"
        );
        document.body.appendChild(plugin);
        return plugin;
    }

    function readPageState(): Record<string, unknown> {
        const readback = document.createElement("script");
        readback.textContent = `
            document.body.dataset.libraryCategoriesState =
                localStorage.getItem("stremioEnhanced.libraryCategories.v1") || "{}";
        `;
        document.body.appendChild(readback);
        return JSON.parse(document.body.dataset.libraryCategoriesState ?? "{}");
    }

    function writePageState(state: Record<string, unknown>): void {
        const writeState = document.createElement("script");
        writeState.textContent = `
            localStorage.setItem(
                "stremioEnhanced.libraryCategories.v1",
                ${JSON.stringify(JSON.stringify(state))}
            );
        `;
        document.body.appendChild(writeState);
    }

    function disposePagePlugin(): void {
        const dispose = document.createElement("script");
        dispose.textContent = "window.__stremioEnhancedLibraryCategoriesPlugin?.dispose();";
        document.body.appendChild(dispose);
    }

    function setPageOptions(options: { allowMultiple: boolean; showBadges: boolean }): void {
        const bridge = document.createElement("script");
        bridge.textContent = `
            window.stremioEnhanced = {
                applyTheme: async () => true,
                pluginOptions: { get: () => (${JSON.stringify(options)}) }
            };
        `;
        document.body.appendChild(bridge);
    }

    beforeEach(() => {
        vi.useFakeTimers();
        document.head.innerHTML = "";
        document.body.innerHTML = `
            <div id="library-grid">
                <a class="meta-item-container" href="#/detail/movie/tt1234567">Example title</a>
            </div>
        `;
        const storage = createMemoryStorage();
        Object.defineProperty(globalThis, "localStorage", {
            configurable: true,
            value: storage,
        });
        Object.defineProperty(window, "localStorage", {
            configurable: true,
            value: storage,
        });
        window.location.hash = "#/library";

        const resetPageStorage = document.createElement("script");
        resetPageStorage.textContent = "localStorage.clear();";
        document.body.appendChild(resetPageStorage);
        setPageOptions({ allowMultiple: true, showBadges: true });
    });

    afterEach(() => {
        disposePagePlugin();
        vi.useRealTimers();
    });

    it("mounts its toolbar and persists a locally managed category", async () => {
        installPlugin();

        await vi.advanceTimersByTimeAsync(150);

        const toolbar = document.getElementById("stremio-enhanced-library-categories");
        expect(toolbar).not.toBeNull();
        Array.from(toolbar?.querySelectorAll<HTMLButtonElement>("button") ?? [])
            .find(button => button.textContent === "Manage")
            ?.click();

        const modal = document.getElementById("stremio-enhanced-library-categories-modal");
        expect(modal).not.toBeNull();
        const newCategoryInput = modal?.querySelector<HTMLInputElement>('input[placeholder="New category"]');
        expect(newCategoryInput).not.toBeNull();
        if (newCategoryInput) newCategoryInput.value = "Favorites";
        const addButton = Array.from(modal?.querySelectorAll<HTMLButtonElement>("button") ?? [])
            .find(button => button.textContent === "Add");
        expect(addButton).toBeDefined();
        addButton?.click();

        expect(readPageState()).toMatchObject({
                version: 1,
                categories: [{ name: "Favorites" }],
            });
    });

    it("normalizes existing assignments when multiple categories are disabled", async () => {
        setPageOptions({ allowMultiple: false, showBadges: true });
        writePageState({
            version: 1,
            categories: [
                { id: "one", name: "One" },
                { id: "two", name: "Two" },
            ],
            assignments: { "movie:tt1234567": ["one", "two"] },
        });

        installPlugin();
        await vi.advanceTimersByTimeAsync(150);

        expect(readPageState()).toMatchObject({
            assignments: { "movie:tt1234567": ["one"] },
        });
    });

    it("ignores malformed detail URLs without aborting the library refresh", async () => {
        document.body.insertAdjacentHTML(
            "beforeend",
            '<a href="#/detail/movie/%E0%A4%A">Malformed title</a>'
        );

        installPlugin();
        await vi.advanceTimersByTimeAsync(150);

        expect(document.getElementById("stremio-enhanced-library-categories"))
            .not.toBeNull();
    });

    it("nudges infinite scroll after a newly loaded page is fully filtered out", async () => {
        writePageState({
            version: 1,
            categories: [{ id: "favorites", name: "Favorites" }],
            assignments: { "movie:tt1234567": ["favorites"] },
        });
        installPlugin();
        await vi.advanceTimersByTimeAsync(150);

        const toolbar = document.getElementById("stremio-enhanced-library-categories");
        const select = toolbar?.querySelector<HTMLSelectElement>("select");
        if (select) {
            select.value = "favorites";
            select.dispatchEvent(new Event("change"));
        }
        await vi.advanceTimersByTimeAsync(60);

        const grid = document.getElementById("library-grid");
        let scrollEvents = 0;
        grid?.addEventListener("scroll", () => { scrollEvents += 1; });
        const nextPageCard = document.createElement("a");
        nextPageCard.className = "meta-item-container";
        nextPageCard.href = "#/detail/movie/tt7654321";
        nextPageCard.textContent = "Filtered title";
        grid?.appendChild(nextPageCard);

        await vi.advanceTimersByTimeAsync(60);

        expect(nextPageCard.classList.contains("se-library-category-hidden"))
            .toBe(true);
        expect(scrollEvents).toBe(1);
    });

    it("exposes a disposer that removes DOM state and listeners", async () => {
        installPlugin();
        await vi.advanceTimersByTimeAsync(150);

        disposePagePlugin();

        expect(document.getElementById("stremio-enhanced-library-categories"))
            .toBeNull();
        expect(document.getElementById("stremio-enhanced-library-categories-style"))
            .toBeNull();
        expect(document.querySelector(".se-library-category-card")).toBeNull();
    });
});
