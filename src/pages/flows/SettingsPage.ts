import { BasePage } from "../base/BasePage";
import { AndroidLocators } from "../../locators/AndroidLocators";
//import { iOSLocators } from "../../locators/iOSLocators";

export class SettingsPage extends BasePage {
    private locators!: AndroidLocators; // | iOSLocators;
    //private isAndroidPlatform!: boolean;

    private elements!: {
        settingsPrompt: string;
        aiOption: string;
        reflectModal: string;
        aiEnablePrompt: string;
        notificationsOption: string;

        settingsButton: string;
        aiToggle: string;
        friendsToggle: string;
        getStartedButton: string;
        enableAIButton: string;
        backButton: string;
        closeButton: string;
    }

    async init() {
        //this.isAndroidPlatform = await this.isAndroid();

        this.locators = new AndroidLocators();

        this.elements = {
            settingsPrompt: await this.locators.selectValue("text", "Settings"),
            aiOption: await this.locators.selectValue("text", "AI settings"),
            reflectModal: await this.locators.selectValue("text", "Introducing"),
            aiEnablePrompt: await this.locators.selectValue("text", "Enable AI Features in How We Feel"),

            notificationsOption: await this.locators.selectValue("text", "Notifications"),

            // Buttons
            settingsButton: await this.locators.selectValue("description", "Settings"),
            aiToggle: await this.locators.selectValue("className", "android.view.View") + await this.locators.selectValue("instance", "4"),
            friendsToggle: await this.locators.selectValue("className", "android.view.View") + await this.locators.selectValue("instance", "5"),
            getStartedButton: await this.locators.selectValue("text", "Get started"),
            enableAIButton: await this.locators.selectValue("text", "Enable AI Features"),
            backButton: await this.locators.selectValue("description", "Back"),
            closeButton: await this.locators.selectValue("description", "Close"),
        };

        return this;
    };

    async verifyIsElementDisplayed(
        element: keyof typeof this.elements,
        timeout?: number
    ): Promise<boolean> {
        return await this.isElementDisplayed(await this.locators.buildSelector(this.elements[element]), timeout ?? null);
    }

    async tapElementButton(
        button: keyof typeof this.elements,
        timeout?: number
    ): Promise<void> {
        await this.tapElement(await this.locators.buildSelector(this.elements[button]), timeout ?? null);
    }

}
