import Properties from '../../core/Properties';

export function getApplyThemeTemplate(): string {
    // Note: This loads a .js file, not HTML, so we don't use template cache
    const template = `function applyTheme(theme) {
    console.log("applying " + theme);

    const activeThemeElement = document.getElementById("activeTheme");
    if (activeThemeElement) {
        activeThemeElement.remove();
    }

    if (theme !== "Default") {
        const themeElement = document.createElement("link");
        themeElement.id = "activeTheme";
        themeElement.rel = "stylesheet";
        themeElement.href = \`{{ themesPath }}/\${theme}\`;

        document.head.appendChild(themeElement);
    }

    const currentTheme = localStorage.getItem("currentTheme");
    if (currentTheme) {
        console.log("[ Theme ] Disabling " + currentTheme + " as an active theme");

        const currentThemeElement = document.getElementById(currentTheme);
        if (currentThemeElement) {
            currentThemeElement.classList.remove("disabled");

            if (currentTheme !== "Default") {
                currentThemeElement.classList.remove("uninstall-button-container-oV4Yo");
                currentThemeElement.classList.add("install-button-container-yfcq5");
            } else {
                currentThemeElement.style.backgroundColor = "var(--secondary-accent-color)";
            }

            currentThemeElement.innerText = "Apply";
        }
    }

    localStorage.setItem("currentTheme", theme);
    console.log("[ Theme ] Disabling " + theme + " as an active theme");

    const newThemeElement = document.getElementById(theme);
    if (newThemeElement) {
        newThemeElement.classList.add("disabled");

        if (theme !== "Default") {
            newThemeElement.classList.remove("install-button-container-yfcq5");
            newThemeElement.classList.add("uninstall-button-container-oV4Yo");
        } else {
            newThemeElement.style.backgroundColor = "var(--overlay-color)";
        }

        newThemeElement.innerText = "Applied";
    }

    console.log(\`[ Theme ] \${theme} applied!\`);
}`;

    // Convert path to file URL without using the 'url' module directly to avoid Node dependencies
    let themeBaseURL = Properties.themesPath;
    if (!themeBaseURL.startsWith('file://')) {
        // Handle Windows paths
        if (themeBaseURL.match(/^[a-zA-Z]:/)) {
            themeBaseURL = 'file:///' + themeBaseURL.replace(/\\/g, '/');
        } else {
            themeBaseURL = 'file://' + themeBaseURL;
        }
    }

    return template.replace("{{ themesPath }}", themeBaseURL);
}
