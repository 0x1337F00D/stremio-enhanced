import { ipcRenderer } from "electron";
import { getTitleBarTemplate } from "../../components/title-bar/titleBar";
import { IPC_CHANNELS, SELECTORS } from "../../constants";
import { getLogger } from "../../utils/logger";

const logger = getLogger("WindowChrome");
let transparencyStatus: boolean | null = null;
let installed = false;

export async function getTransparencyStatus(): Promise<boolean> {
    if (transparencyStatus === null) {
        try {
            transparencyStatus = await ipcRenderer.invoke(
                IPC_CHANNELS.GET_TRANSPARENCY_STATUS
            ) as boolean;
        } catch (error) {
            logger.error(`Failed to read transparency status: ${error}`);
            transparencyStatus = false;
        }
    }
    return transparencyStatus;
}

function addTitleBar(): void {
    const activeRoute = document.querySelector(SELECTORS.ROUTE_CONTAINER);
    if (!activeRoute || activeRoute.querySelector(".title-bar")) return;

    activeRoute.insertAdjacentHTML("afterbegin", getTitleBarTemplate());
    const titleBar = activeRoute.querySelector(".title-bar");
    if (!titleBar) return;

    titleBar.querySelector("#minimizeApp-btn")?.addEventListener("click", () => {
        ipcRenderer.send(IPC_CHANNELS.MINIMIZE_WINDOW);
    });
    titleBar.querySelector("#maximizeApp-btn")?.addEventListener("click", () => {
        const pathElement = titleBar.querySelector("#maximizeApp-btn svg path");
        if (pathElement) {
            const currentPath = pathElement.getAttribute("d");
            const maximizedPath = "M4,8H8V4H20V16H16V20H4V8M16,8V14H18V6H10V8H16M6,12V18H14V12H6Z";
            const normalPath = "M3,3H21V21H3V3M5,5V19H19V5H5Z";
            pathElement.setAttribute(
                "d",
                currentPath === maximizedPath ? normalPath : maximizedPath
            );
        }
        ipcRenderer.send(IPC_CHANNELS.MAXIMIZE_WINDOW);
    });
    titleBar.querySelector("#closeApp-btn")?.addEventListener("click", () => {
        ipcRenderer.send(IPC_CHANNELS.CLOSE_WINDOW);
    });

    logger.info("Title bar added to active route");
}

export async function installWindowChrome(): Promise<void> {
    if (installed) return;
    installed = true;

    ipcRenderer.on(IPC_CHANNELS.FULLSCREEN_CHANGED, (_, isFullscreen: boolean) => {
        const titleBar = document.querySelector<HTMLElement>(".title-bar");
        if (titleBar) titleBar.style.display = isFullscreen ? "none" : "flex";
    });

    if (!await getTransparencyStatus()) return;

    const observer = new MutationObserver(addTitleBar);
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener("hashchange", addTitleBar);
    addTitleBar();
}
