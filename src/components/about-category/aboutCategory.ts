import TemplateCache from '../../utils/templateCache';
import type { NativePlayerPreference } from '../../interfaces/NativePlayer';

export function getAboutCategoryTemplate(
    version: string, 
    checkForUpdatesOnStartup: boolean, 
    discordRichPresence: boolean, 
    enableTransparentThemes: boolean,
    nativePlayer: NativePlayerPreference = "disabled",
    mpvUseUserConfiguration: boolean = false,
    showNativePlayerControls: boolean = false
): string {
    const template = TemplateCache.load(__dirname, 'about-category');
    
    return template
        .replace("{{ version }}", version)
        .replace("{{ checkForUpdatesOnStartup }}", checkForUpdatesOnStartup ? "checked" : "")
        .replace("{{ discordrichpresence }}", discordRichPresence ? "checked" : "")
        .replace("{{ enableTransparentThemes }}", enableTransparentThemes ? "checked" : "")
        .replace(
            "{{ nativePlayerControlsDisplay }}",
            showNativePlayerControls ? "" : "display: none;"
        )
        .replace(
            "{{ nativePlayerDisabledSelected }}",
            nativePlayer === "disabled" ? "selected" : ""
        )
        .replace(
            "{{ nativePlayerMpvSelected }}",
            nativePlayer === "mpv" ? "selected" : ""
        )
        .replace(
            "{{ mpvUseUserConfiguration }}",
            mpvUseUserConfiguration ? "checked" : ""
        );
}
