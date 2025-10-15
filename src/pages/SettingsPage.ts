import { BasePage } from "./BasePage";
import { assertAllTrue } from "../helpers/assertAllTrue";

/**
 * Base class for handling user settings-related functionality.
 * Defines shared behaviors for managing preferences like sharing and AI settings.
 */
export abstract class SettingsPage extends BasePage {
    constructor() {
        super();
        this.init();

        // Define key UI elements specific to the Settings page
        this.locator.elements = {
            ...this.locator.elements,

            aiOption: { type: "text", value: "AI settings" },
        }
    }

    /**
     * Selects the user account within settings.
     */
    abstract selectAccount(): Promise<void>;

    /**
     * Navigates back from the current settings screen.
     */
    abstract tapBack(): Promise<void>;

    /**
     * Close the current settings screen.
     */
    abstract tapClose(): Promise<void>;

    /**
     * Disables the sharing option in user settings.
     * Navigates to the account settings, disables sharing, and ensures the "Always Ask" toggle is off.
     */
    async deactivateShare():Promise<void>{
        //if(!await this.verifyIsElementDisplayed("shareModalPrompt")){
            await this.tapButton("settings");

            await this.selectAccount();
            
            await this.tapButton("sharing");
            await driver.pause(3000);

        await this.tapButton("notShare");

        if(await this.locator.verifyIsActive("alwaysAskToggle")){
            await this.tapButton("alwaysAskToggle");
        }

        await this.tapClose();

        await driver.pause(1000);
    }

    /**
     * Enables the AI toggle within the AI settings menu.
     */
    abstract enableAItoggle(): Promise<void>;

    /**
     * Navigates to the AI settings section and enables the AI-related features.
     * Handles UI navigation and toggle activation logic.
     */
    async enableAISettings():Promise<void>{
        try{
            await this.tapButton("settings");
            await assertAllTrue(this.verifyIsElementDisplayed("settingsPrompt"));

            await this.tapButton("aiOption");
            await driver.pause(1000);

            await this.enableAItoggle();
        }
        catch (error){
            console.error("Error during AI settings enable flow:", error);
        }
    }

}