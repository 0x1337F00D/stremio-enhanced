# Native MPV playback

Stremio Enhanced can hand desktop streams to an installed MPV executable. MPV runs as a separate native player process; the remote Stremio page never receives a generic process or command API.

## Setup

1. Install [MPV for your operating system](https://mpv.io/installation/).
2. Open **Settings → Enhanced → About**.
3. Select **MPV (native external player)**.
4. If MPV is not found automatically, use **Choose MPV executable**. The selected file is validated by the main process before it is saved.

Automatic discovery checks conventional native installation paths, not `PATH` entries or launcher wrappers. In particular, Snap's `/snap/bin/mpv` dispatcher is not treated as a directly executable MPV binary; use a native package/build or select the real MPV executable.

The enabled state and the user-configuration choice are stored by the local main process, not in the remote page's web storage. Programmatic page events cannot change them. The settings page receives only availability, version, discovery source, and a safe status message; it does not receive or render the local executable path.

When a metadata-backed stream route opens, Stremio Enhanced checks the main-process preference, correlates the current core state with that exact route, waits a bounded amount of time for readiness, and validates the HTTP(S) URL. The main process starts MPV with one initial idle wait and a private, random JSON-IPC endpoint, sends one fixed `loadfile` request, and reports success only after MPV emits `file-loaded`. MPV exits normally after that item finishes, so a later stream can start a fresh process. The stream URL and title are never process arguments. A route change cancels and terminates a still-pending hand-off before it is committed. If readiness, discovery, or launch fails, the built-in player remains available.

## ThumbFast, shaders, and upscale models

The **Use normal MPV config** option is disabled by default. With it disabled, MPV starts with its configuration and scripts turned off. With it enabled, MPV may load the user's normal `mpv.conf`, scripts, shaders, and models. This provides opt-in compatibility with an already installed, user-managed setup such as ThumbFast or Anime4K. Stremio Enhanced does not install, configure, control, or verify those features. See the [MPV configuration manual](https://mpv.io/manual/stable/#configuration-files) for the underlying behavior.

Typical MPV configuration directories are `%APPDATA%\mpv` on Windows and `~/.config/mpv` on Linux/macOS. Exact paths and feature requirements depend on the installed MPV build and the selected third-party configuration.

Stremio Enhanced does not bundle MPV, ThumbFast, Anime4K, shaders, or model runtimes. Users remain responsible for reviewing and installing those components and their licenses. The integration accepts no renderer-supplied executable path, MPV command, property name, title, script, shader path, or arbitrary command-line argument.

Thumbnail generation and upscale-model management intentionally remain user-managed. [ThumbFast](https://github.com/po5/thumbfast) does not render thumbnails by itself; it also requires a compatible MPV UI script. Bundling that stack would replace part of the user's MPV UI and add another executable/script supply chain. Anime4K and similar shaders are content-, GPU-, driver-, and performance-profile choices rather than safe universal defaults. Enabling a normal MPV configuration lets a reviewed existing setup behave as it normally would without Stremio Enhanced silently installing or updating those components.

## Intentional scope

This integration uses a separate MPV window. It does not copy Zaarrg's WebView2/Qt implementation or the experimental Windows-only `electron-libmpv` branch. That keeps the Electron build cross-platform, avoids shipping native MPV binaries, and preserves a narrow process-security boundary.
