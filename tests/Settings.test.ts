import Settings from '../src/core/Settings';

// Mock getEnhancedNav to return a simple HTML string to prevent needing fs modules
jest.mock('../src/components/enhanced-nav/enhancedNav', () => ({
    getEnhancedNav: jest.fn(() => '<div tabindex="0" title="Enhanced" data-section="enhanced" class="button-DNmYL button-container-zVLH6" style="outline: none;">Enhanced</div>')
}));

describe('Settings.addSection', () => {
    beforeEach(() => {
        // Clear previous document
        document.body.innerHTML = '';

        // Setup a simulated Stremio Web DOM with "General", "Player", "Streaming", and "Shortcuts"
        // Also it requires the settings panel to have > 2 children if testing the dynamic fallback,
        // but here we just provide the class prefix matching sections-container-
        document.body.innerHTML = `
            <div>
                <div class="menu-xeE06">
                    <a href="#" title="General"><div title="General">General</div></a>
                    <a href="#" title="Player"><div title="Player">Player</div></a>
                    <a href="#" title="Streaming"><div title="Streaming">Streaming</div></a>
                    <a href="#" title="Shortcuts"><div title="Shortcuts">Shortcuts</div></a>
                </div>
                <div class="sections-container-123">
                    <div class="section-xyz">
                        <div class="label-wXG3e">General</div>
                        <div class="category-abc">
                            <div class="heading-def">
                                <svg class="icon"></svg>
                                <div class="title-ghi">Language</div>
                            </div>
                        </div>
                    </div>
                    <div class="section-xyz">
                        <div class="label-wXG3e">Player</div>
                        <div>Player Settings Here...</div>
                    </div>
                    <div class="section-xyz">
                        <div class="label-wXG3e">Streaming</div>
                        <div>Streaming Settings Here...</div>
                    </div>
                    <div class="section-xyz">
                        <div class="label-wXG3e">Shortcuts</div>
                        <div>Shortcuts Settings Here...</div>
                    </div>
                </div>
                <div class="section-xyz"></div>
            </div>
        `;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should inject Enhanced nav item correctly into the DOM menu when Shortcuts exists', async () => {
        const infoSpy = jest.spyOn(Settings['logger'], 'info').mockImplementation((() => Settings['logger']) as any);
        jest.spyOn(Settings['logger'], 'error').mockImplementation((() => Settings['logger']) as any);

        // Run addSection
        Settings.addSection('enhanced', 'Enhanced');

        // Wait for waitForSettingsPanel and waitForNavMenu to resolve
        // Since we are not using fake timers we need to wait a bit for setInterval logic
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Add artificial wait in case there's any pending promise ticks
        await new Promise(process.nextTick);

        // check logger calls
        expect(infoSpy).toHaveBeenCalledWith("Adding section: enhanced with title: Enhanced");

        // Verify #enhanced section container is created in Settings panel
        const settingsPanel = document.querySelector('.sections-container-123');
        expect(settingsPanel).not.toBeNull();
        const enhancedSection = settingsPanel?.querySelector('#enhanced');
        expect(enhancedSection).not.toBeNull();

        // Verify [data-section="enhanced"] button is created in Nav Menu
        const navMenu = document.querySelector('.menu-xeE06');
        expect(navMenu).not.toBeNull();
        const enhancedNav = navMenu?.querySelector('[data-section="enhanced"]');
        expect(enhancedNav).not.toBeNull();

        // Check if Enhanced nav was appended correctly
        expect(navMenu?.children.length).toBe(5);
        expect(navMenu?.children[4].querySelector('[data-section="enhanced"]')).not.toBeNull();
    });
});