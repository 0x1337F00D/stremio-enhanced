/**
 * @name Library Categories
 * @description Organize Stremio library titles into local, user-defined categories.
 * @author Stremio Enhanced
 * @version 1.0.0
 * @updateUrl none
 * @license MIT
 * @option {"id":"allowMultiple","type":"boolean","label":"Allow multiple categories per title","default":true}
 * @option {"id":"showBadges","type":"boolean","label":"Show category badges on library cards","default":true}
 */

(() => {
    "use strict";

    const instanceKey = "__stremioEnhancedLibraryCategoriesPlugin";
    const previousInstance = window[instanceKey];
    if (previousInstance?.dispose) previousInstance.dispose();

    const script = document.currentScript;
    const pluginFile = script?.dataset.stremioEnhancedPlugin || script?.id || "library-categories.plugin.js";
    const savedOptions = window.stremioEnhanced?.pluginOptions?.get(pluginFile) || {};
    const options = {
        allowMultiple: savedOptions.allowMultiple !== false,
        showBadges: savedOptions.showBadges !== false,
    };
    const storageKey = "stremioEnhanced.libraryCategories.v1";
    const toolbarId = "stremio-enhanced-library-categories";
    const modalId = "stremio-enhanced-library-categories-modal";
    const styleId = "stremio-enhanced-library-categories-style";
    const hiddenClass = "se-library-category-hidden";
    const cardClass = "se-library-category-card";

    let activeCategory = "all";
    let assignmentMode = false;
    let refreshTimer = 0;
    let discoveryTimer = 0;
    let scrollTimer = 0;
    let observedGrid = null;
    let libraryObserver = null;
    let disposed = false;

    const emptyState = () => ({ version: 1, categories: [], assignments: {} });

    function loadState() {
        try {
            const parsed = JSON.parse(localStorage.getItem(storageKey) || "null");
            if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.categories)) return emptyState();

            const categories = parsed.categories
                .filter(category => category && typeof category.id === "string" && typeof category.name === "string")
                .map(category => ({ id: category.id, name: category.name.slice(0, 40) }));
            const validIds = new Set(categories.map(category => category.id));
            const assignments = {};

            if (parsed.assignments && typeof parsed.assignments === "object") {
                for (const [itemKey, categoryIds] of Object.entries(parsed.assignments)) {
                    if (!Array.isArray(categoryIds)) continue;
                    const validAssignments = categoryIds.filter(id => typeof id === "string" && validIds.has(id));
                    if (validAssignments.length) assignments[itemKey] = validAssignments;
                }
            }

            return { version: 1, categories, assignments };
        } catch {
            return emptyState();
        }
    }

    let state = loadState();

    function saveState() {
        try {
            localStorage.setItem(storageKey, JSON.stringify(state));
        } catch (error) {
            console.error("[Library Categories] Failed to save state", error);
        }
    }

    function normalizeAssignmentsForOptions() {
        if (options.allowMultiple) return false;

        let changed = false;
        for (const [itemKey, categoryIds] of Object.entries(state.assignments)) {
            if (categoryIds.length > 1) {
                state.assignments[itemKey] = [categoryIds[0]];
                changed = true;
            }
        }
        return changed;
    }

    if (normalizeAssignmentsForOptions()) saveState();

    function createId() {
        if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
        return `category-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    }

    function isLibraryRoute() {
        return location.hash.startsWith("#/library");
    }

    function itemKeyFromLink(link) {
        const href = link.getAttribute("href") || "";
        const match = href.match(/#\/detail\/([^/]+)\/([^/?#]+)/);
        if (!match) return null;

        try {
            return `${decodeURIComponent(match[1])}:${decodeURIComponent(match[2])}`;
        } catch {
            return null;
        }
    }

    function getLibraryCards(root = document) {
        const entries = new Map();
        const links = [];
        if (root instanceof Element && root.matches('a[href*="#/detail/"]')) links.push(root);
        root.querySelectorAll?.('a[href*="#/detail/"]').forEach(link => links.push(link));

        links.forEach(link => {
            const itemKey = itemKeyFromLink(link);
            if (!itemKey) return;

            const card = link.closest(
                '[class*="meta-item"], [class*="poster-container"], [class*="item-container"]'
            ) || link;
            if (!entries.has(card)) entries.set(card, itemKey);
        });
        return Array.from(entries, ([card, itemKey]) => ({ card, itemKey }));
    }

    function applyFilterToCards(cards) {
        const categoryNames = new Map(state.categories.map(category => [category.id, category.name]));
        for (const { card, itemKey } of cards) {
            const categoryIds = state.assignments[itemKey] || [];
            const visible = activeCategory === "all" || categoryIds.includes(activeCategory);
            card.classList.toggle(hiddenClass, !visible);
            card.classList.add(cardClass);

            if (options.showBadges && categoryIds.length) {
                card.dataset.seLibraryCategories = categoryIds
                    .map(id => categoryNames.get(id))
                    .filter(Boolean)
                    .join(" · ");
            } else {
                delete card.dataset.seLibraryCategories;
            }
        }
    }

    function nudgeInfiniteScroll(grid) {
        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(() => {
            grid?.dispatchEvent(new Event("scroll", { bubbles: true }));
            window.dispatchEvent(new Event("scroll"));
        }, 50);
    }

    function applyFilter() {
        if (!isLibraryRoute()) return;

        const cards = getLibraryCards();
        applyFilterToCards(cards);
        nudgeInfiniteScroll(cards[0]?.card.parentElement);
    }

    function renderCategorySelect(select) {
        const previousValue = activeCategory;
        select.replaceChildren();

        const allOption = document.createElement("option");
        allOption.value = "all";
        allOption.textContent = "All categories";
        select.appendChild(allOption);

        for (const category of state.categories) {
            const option = document.createElement("option");
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
        }

        activeCategory = previousValue === "all" || state.categories.some(category => category.id === previousValue)
            ? previousValue
            : "all";
        select.value = activeCategory;
    }

    function closeModal() {
        document.getElementById(modalId)?.remove();
    }

    function createModal(title) {
        closeModal();
        const overlay = document.createElement("div");
        overlay.id = modalId;
        overlay.className = "se-library-categories-modal";

        const dialog = document.createElement("section");
        dialog.className = "se-library-categories-dialog";
        dialog.setAttribute("role", "dialog");
        dialog.setAttribute("aria-modal", "true");

        const heading = document.createElement("h2");
        heading.textContent = title;

        const closeButton = document.createElement("button");
        closeButton.type = "button";
        closeButton.textContent = "Close";
        closeButton.addEventListener("click", closeModal);

        dialog.append(heading);
        overlay.append(dialog);
        overlay.addEventListener("click", event => {
            if (event.target === overlay) closeModal();
        });
        document.body.appendChild(overlay);

        return { dialog, closeButton };
    }

    function refreshToolbarAndCards() {
        const select = document.querySelector(`#${toolbarId} select`);
        if (select) renderCategorySelect(select);
        applyFilter();
    }

    function openManageModal() {
        const { dialog, closeButton } = createModal("Manage library categories");
        const list = document.createElement("div");

        const renderList = () => {
            list.replaceChildren();
            for (const category of state.categories) {
                const row = document.createElement("div");
                row.className = "se-library-categories-row";

                const input = document.createElement("input");
                input.value = category.name;
                input.maxLength = 40;
                input.setAttribute("aria-label", `Rename ${category.name}`);
                input.addEventListener("change", () => {
                    const nextName = input.value.trim().slice(0, 40);
                    if (!nextName) {
                        input.value = category.name;
                        return;
                    }
                    category.name = nextName;
                    saveState();
                    refreshToolbarAndCards();
                });

                const deleteButton = document.createElement("button");
                deleteButton.type = "button";
                deleteButton.textContent = "Delete";
                deleteButton.addEventListener("click", () => {
                    if (!window.confirm(`Delete category "${category.name}"?`)) return;
                    state.categories = state.categories.filter(item => item.id !== category.id);
                    for (const [itemKey, categoryIds] of Object.entries(state.assignments)) {
                        const remaining = categoryIds.filter(id => id !== category.id);
                        if (remaining.length) state.assignments[itemKey] = remaining;
                        else delete state.assignments[itemKey];
                    }
                    saveState();
                    renderList();
                    refreshToolbarAndCards();
                });

                row.append(input, deleteButton);
                list.appendChild(row);
            }
        };

        const addRow = document.createElement("div");
        addRow.className = "se-library-categories-row";
        const addInput = document.createElement("input");
        addInput.placeholder = "New category";
        addInput.maxLength = 40;
        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.textContent = "Add";
        addButton.addEventListener("click", () => {
            const name = addInput.value.trim().slice(0, 40);
            if (!name) return;
            state.categories.push({ id: createId(), name });
            addInput.value = "";
            saveState();
            renderList();
            refreshToolbarAndCards();
        });
        addRow.append(addInput, addButton);

        renderList();
        dialog.append(list, addRow, closeButton);
        addInput.focus();
    }

    function openAssignmentModal(itemKey) {
        if (state.categories.length === 0) {
            window.alert("Create a category first.");
            return;
        }

        const { dialog, closeButton } = createModal(`Assign ${itemKey}`);
        const selected = new Set(state.assignments[itemKey] || []);
        const inputs = [];

        for (const category of state.categories) {
            const label = document.createElement("label");
            label.className = "se-library-categories-choice";
            const input = document.createElement("input");
            input.type = options.allowMultiple ? "checkbox" : "radio";
            input.name = `se-library-category-${itemKey}`;
            input.value = category.id;
            input.checked = selected.has(category.id);
            inputs.push(input);
            label.append(input, document.createTextNode(category.name));
            dialog.appendChild(label);
        }

        const saveButton = document.createElement("button");
        saveButton.type = "button";
        saveButton.textContent = "Save assignment";
        saveButton.addEventListener("click", () => {
            const categoryIds = inputs.filter(input => input.checked).map(input => input.value);
            if (categoryIds.length) state.assignments[itemKey] = categoryIds;
            else delete state.assignments[itemKey];
            saveState();
            closeModal();
            applyFilter();
        });

        dialog.append(saveButton, closeButton);
    }

    function ensureToolbar() {
        if (!isLibraryRoute()) {
            cleanupRoute();
            return;
        }
        connectLibraryObserver();
        if (document.getElementById(toolbarId)) {
            applyFilter();
            return;
        }

        const toolbar = document.createElement("aside");
        toolbar.id = toolbarId;
        toolbar.className = "se-library-categories-toolbar";

        const select = document.createElement("select");
        select.setAttribute("aria-label", "Filter library category");
        renderCategorySelect(select);
        select.addEventListener("change", () => {
            activeCategory = select.value;
            applyFilter();
        });

        const manageButton = document.createElement("button");
        manageButton.type = "button";
        manageButton.textContent = "Manage";
        manageButton.addEventListener("click", openManageModal);

        const assignButton = document.createElement("button");
        assignButton.type = "button";
        assignButton.textContent = "Assign titles";
        assignButton.addEventListener("click", () => {
            assignmentMode = !assignmentMode;
            assignButton.textContent = assignmentMode ? "Stop assigning" : "Assign titles";
            toolbar.classList.toggle("is-assigning", assignmentMode);
        });

        toolbar.append(select, manageButton, assignButton);
        document.body.appendChild(toolbar);
        applyFilter();
    }

    function cleanupRoute() {
        disconnectLibraryObserver();
        window.clearTimeout(discoveryTimer);
        document.getElementById(toolbarId)?.remove();
        closeModal();
        assignmentMode = false;
        for (const { card } of getLibraryCards()) {
            card.classList.remove(hiddenClass, cardClass);
            delete card.dataset.seLibraryCategories;
        }
    }

    function scheduleRefresh() {
        if (disposed) return;
        window.clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(ensureToolbar, 100);
    }

    function disconnectLibraryObserver() {
        libraryObserver?.disconnect();
        libraryObserver = null;
        observedGrid = null;
    }

    function scheduleGridDiscovery() {
        if (disposed || !isLibraryRoute()) return;
        window.clearTimeout(discoveryTimer);
        discoveryTimer = window.setTimeout(connectLibraryObserver, 500);
    }

    function connectLibraryObserver() {
        if (disposed || !isLibraryRoute()) {
            disconnectLibraryObserver();
            return;
        }

        const firstCard = getLibraryCards()[0]?.card;
        const grid = firstCard?.parentElement || null;
        if (!grid) {
            disconnectLibraryObserver();
            scheduleGridDiscovery();
            return;
        }
        if (grid === observedGrid && libraryObserver) return;

        disconnectLibraryObserver();
        window.clearTimeout(discoveryTimer);
        observedGrid = grid;
        libraryObserver = new MutationObserver(records => {
            const addedEntries = new Map();
            for (const record of records) {
                for (const node of record.addedNodes) {
                    if (!(node instanceof Element)) continue;
                    for (const entry of getLibraryCards(node)) {
                        addedEntries.set(entry.card, entry.itemKey);
                    }
                }
            }

            if (addedEntries.size > 0) {
                applyFilterToCards(
                    Array.from(addedEntries, ([card, itemKey]) => ({ card, itemKey }))
                );
                nudgeInfiniteScroll(observedGrid);
            }
            if (!observedGrid?.isConnected) scheduleRefresh();
        });
        libraryObserver.observe(grid, { childList: true, subtree: true });
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
        .se-library-categories-toolbar {
            position: fixed; top: 5rem; right: 1rem; z-index: 10000;
            display: flex; gap: .5rem; align-items: center; padding: .65rem;
            border-radius: .5rem; color: white; background: rgba(20, 20, 28, .96);
            box-shadow: 0 .4rem 1.2rem rgba(0,0,0,.35);
        }
        .se-library-categories-toolbar button,
        .se-library-categories-toolbar select,
        .se-library-categories-dialog button,
        .se-library-categories-dialog input {
            padding: .5rem .65rem; border-radius: .35rem; border: 1px solid rgba(255,255,255,.25);
        }
        .se-library-categories-toolbar.is-assigning { outline: 2px solid #8b7cff; }
        .${hiddenClass} { display: none !important; }
        .${cardClass} { position: relative; }
        .${cardClass}[data-se-library-categories]::after {
            content: attr(data-se-library-categories); position: absolute; left: .35rem; bottom: .35rem;
            max-width: calc(100% - .7rem); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
            padding: .2rem .4rem; border-radius: .25rem; color: white; background: rgba(15,15,20,.85);
            pointer-events: none; font-size: .75rem;
        }
        .se-library-categories-modal {
            position: fixed; inset: 0; z-index: 10001; display: grid; place-items: center;
            background: rgba(0,0,0,.65);
        }
        .se-library-categories-dialog {
            display: grid; gap: .75rem; width: min(34rem, calc(100vw - 2rem)); max-height: 80vh;
            overflow: auto; padding: 1.25rem; border-radius: .65rem; color: white;
            background: rgb(28,28,38);
        }
        .se-library-categories-row { display: flex; gap: .5rem; margin-bottom: .5rem; }
        .se-library-categories-row input { flex: 1; }
        .se-library-categories-choice { display: flex; gap: .5rem; align-items: center; }
    `;
    document.head.appendChild(style);

    const handleDocumentClick = event => {
        if (!assignmentMode || !isLibraryRoute()) return;
        const link = event.target instanceof Element
            ? event.target.closest('a[href*="#/detail/"]')
            : null;
        if (!link) return;
        const itemKey = itemKeyFromLink(link);
        if (!itemKey) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        openAssignmentModal(itemKey);
    };

    const handleHashChange = () => scheduleRefresh();

    function dispose() {
        if (disposed) return;
        disposed = true;
        window.clearTimeout(refreshTimer);
        window.clearTimeout(discoveryTimer);
        window.clearTimeout(scrollTimer);
        disconnectLibraryObserver();
        document.removeEventListener("click", handleDocumentClick, true);
        window.removeEventListener("hashchange", handleHashChange);
        cleanupRoute();
        style.remove();
        if (window[instanceKey]?.dispose === dispose) delete window[instanceKey];
    }

    window[instanceKey] = Object.freeze({ dispose });
    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("hashchange", handleHashChange);
    scheduleRefresh();
})();
