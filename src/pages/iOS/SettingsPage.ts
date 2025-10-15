import { SettingsPage } from "../SettingsPage";

/**
 * iOS implementation of the Settings page.
 * Defines iOS-specific locators and behavior.
 */
export class iOSSettingsPage extends SettingsPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,

            sharing: {type: "button", value: "Friends & Sharing"},
            notShare: {type: "text", value: "Don't Share"},
            alwaysAskToggle: {type: "component", value: "//XCUIElementTypeSwitch"},
            back: { type: "component", value: "//XCUIElementTypeButton" },
            settingsPrompt: { type: "text", value: "Settings" },
        }
    }

    async selectAccount():Promise<void>{
        // Not applicable
    }

    async tapBack(){
        await this.tapButton("back");
    }

    async tapClose() {
        await this.tapButton("back");
        await this.tapBack();
    }

    async enableAItoggle(){
        await this.tapBack();
        await this.tapBack();
    }

}