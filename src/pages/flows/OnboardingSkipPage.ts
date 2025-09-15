import { BasePage } from "../base/BasePage";
import { AndroidLocators } from "../../locators/AndroidLocators";
import { iOSLocators } from "../../locators/iOSLocators";

export class OnboardingSkipPage extends BasePage {
    private locators!: AndroidLocators | iOSLocators;
    private isAndroidPlatform!: boolean;

    private screensOnboarding!: {
        elements: {
            skipModal: string;
            privacyModal: string;
        };

        buttons: {
            accept: string;
            skipModal: string;
        };
    };

    async init() {
        this.isAndroidPlatform = await this.isAndroid();

        this.locators = this.isAndroidPlatform
            ? new AndroidLocators()
            : new iOSLocators();

        this.screensOnboarding = {
            elements: {
                skipModal:  await this.locators.selectValue("text", "Are you sure you want to skip the setup?"),
                privacyModal: await this.locators.selectValue("text", "We\'ve updated our Privacy Policy"),
            },
            buttons: {
                accept: await this.locators.selectValue("text", "I Accept"),
                skipModal: await this.locators.selectValue("text", "Skip"),
            }
        };

        return this;
    }

    async isScreenDisplayed(
        element: keyof typeof this.screensOnboarding.elements
    ): Promise<boolean> {
        return await this.isElementDisplayed(await this.locators.buildSelector(this.screensOnboarding.elements[element]));
    }

    async tapButton(
        button: keyof typeof this.screensOnboarding.buttons
    ): Promise<void> {
        await this.tapElement(await this.locators.buildSelector(this.screensOnboarding.buttons[button]));
    }

}