import { TIMEOUTS } from "../../constants";
import Helpers from "../../utils/Helpers";
import { getLogger } from "../../utils/logger";

const logger = getLogger("StreamingServerReload");

export function scheduleStreamingServerReload(): void {
    window.setTimeout(() => {
        void Helpers._eval(
            "core.transport.dispatch({ action: 'StreamingServer', args: { action: 'Reload' } });"
        );
        logger.info("Stremio streaming server reloaded.");
    }, TIMEOUTS.SERVER_RELOAD_DELAY);
}
