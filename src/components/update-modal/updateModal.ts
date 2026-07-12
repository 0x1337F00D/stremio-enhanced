export interface UpdateModalOptions {
    currentVersion: string;
    version: string;
    releaseName?: string | null;
    releaseNotes?: string | null;
    onRestartNow: () => boolean | Promise<boolean>;
    onLater?: () => void;
}

function createElement<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    className?: string
): HTMLElementTagNameMap[K] {
    const element = document.createElement(tagName);
    if (className) element.className = className;
    return element;
}

function createActionButton(label: string, className: string): HTMLButtonElement {
    const button = createElement("button", className);
    button.type = "button";
    button.title = label;

    const buttonLabel = createElement("span", "label-wbfsE");
    buttonLabel.textContent = label;
    button.appendChild(buttonLabel);
    return button;
}

/**
 * Build the downloaded-update prompt without parsing release notes as markup.
 * The returned element is detached so callers can choose the appropriate modal
 * host for the current Stremio route.
 */
export function createUpdateModal(options: UpdateModalOptions): HTMLElement {
    const container = createElement(
        "div",
        "addon-details-modal-container-aBFaQ modal-container-OuxEF modal-container"
    );
    container.id = "updateModalContainer";
    container.setAttribute("role", "dialog");
    container.setAttribute("aria-modal", "true");
    container.setAttribute("aria-labelledby", "stremio-enhanced-update-title");

    const dialog = createElement("div", "modal-dialog-container-DZMKq");
    dialog.style.width = "50%";
    dialog.style.maxWidth = "48rem";
    dialog.style.height = "80%";

    const background = createElement("div", "modal-dialog-background-vZpB_");
    const content = createElement("div", "modal-dialog-content-Xgv7Z");

    const title = createElement("div", "title-container-v2mmF");
    title.id = "stremio-enhanced-update-title";
    title.textContent = "Update ready to install";

    const body = createElement("div", "body-container-H80dD");
    const details = createElement(
        "div",
        "addon-details-container-VdGrt addon-details-container-tUlp2"
    );
    details.style.width = "auto";

    const releaseTitle = createElement("div", "name-i0o3Y");
    releaseTitle.textContent = options.releaseName?.trim() || `Update ${options.version}`;

    const version = createElement("div", "version-FdUq6");
    version.textContent = `${options.currentVersion} → ${options.version}`;

    const notes = createElement("div", "section-container-N6QHW");
    notes.dataset.stremioEnhancedUpdateNotes = "true";
    notes.style.overflowY = "auto";
    notes.style.height = "500px";
    notes.style.lineHeight = "1.5";
    notes.style.whiteSpace = "pre-wrap";
    notes.textContent = options.releaseNotes?.trim() || "No release notes available.";

    details.append(releaseTitle, version, notes);
    body.appendChild(details);

    const buttons = createElement("div", "buttons-container-e_JoR");
    const laterButton = createActionButton(
        "Later",
        "cancel-button-zuUX6 action-button-eprQG button-container-zVLH6"
    );
    const restartButton = createActionButton(
        "Restart now",
        "action-button-eprQG button-container-zVLH6"
    );
    restartButton.dataset.stremioEnhancedInstallUpdate = "true";

    const close = (): void => {
        options.onLater?.();
        container.remove();
    };
    laterButton.addEventListener("click", close);

    let installing = false;
    restartButton.addEventListener("click", async () => {
        if (installing) return;
        installing = true;
        restartButton.disabled = true;
        restartButton.setAttribute("aria-busy", "true");

        try {
            const accepted = await options.onRestartNow();
            if (!accepted) {
                installing = false;
                restartButton.disabled = false;
                restartButton.removeAttribute("aria-busy");
            }
        } catch {
            installing = false;
            restartButton.disabled = false;
            restartButton.removeAttribute("aria-busy");
        }
    });

    buttons.append(laterButton, restartButton);
    content.append(title, body, buttons);
    dialog.append(background, content);
    container.appendChild(dialog);

    container.addEventListener("keydown", event => {
        if (event.key === "Escape" && !installing) close();
    });

    return container;
}
