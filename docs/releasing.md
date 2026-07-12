# Desktop auto-update releases

Desktop updates are built from semantic version tags such as `v1.0.2`. The tag must exactly match `package.json`. The workflow builds Windows NSIS, signed and notarized macOS DMG/ZIP, and Linux AppImage artifacts, validates every updater metadata hash, and creates a **draft** GitHub release.

GitHub's updater feed does not expose draft releases, so an installed build cannot discover this draft directly. Before publishing, install and launch every signed draft artifact and validate its generated metadata and hashes. For a full N to N+1 rehearsal before a public release, publish the artifacts to a disposable update repository/feed. After publishing the production release, immediately verify a real N to N+1 update on every supported platform; fixing a broken update requires a new, higher version.

Required GitHub Actions secrets:

- `WINDOWS_CSC_LINK`
- `WINDOWS_CSC_KEY_PASSWORD`
- `MACOS_CSC_LINK`
- `MACOS_CSC_KEY_PASSWORD`
- `APPLE_ID`
- `APPLE_APP_SPECIFIC_PASSWORD`
- `APPLE_TEAM_ID`

The release workflow deliberately fails instead of producing unsigned Windows or macOS update artifacts when these credentials are missing. Android releases use a separate build/update channel and are not handled by `electron-updater`.

Before tagging:

1. Update `package.json` to the intended new version.
2. Run `npm ci`, `npm run lint`, `npm test`, `npm run dist`, and `npm run typecheck:android`.
3. Commit the version change, then create and push the matching signed tag.
4. Install and launch the generated draft artifacts on Windows NSIS, macOS x64/arm64, and Linux AppImage. For a full pre-release updater rehearsal, use a disposable update repository/feed because GitHub drafts are invisible to `electron-updater`.
5. Publish the draft only after artifact smoke tests pass, then immediately verify a production N to N+1 update on every supported platform.
