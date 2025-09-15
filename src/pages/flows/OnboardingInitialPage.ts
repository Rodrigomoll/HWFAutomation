import { BasePage } from "../base/BasePage";
import { AndroidLocators } from "../../locators/AndroidLocators";
import { iOSLocators } from "../../locators/iOSLocators";

export class OnboardingInitialPage extends BasePage {
    private locators!: AndroidLocators | iOSLocators;
    private isAndroidPlatform!: boolean;

    private screensOnboarding!: {
        elements: {
            firstPrompt: string;
            secondPrompt: string;
            thirdPrompt: string;
            fourthPrompt: string;
            fifthPrompt: string;
            sixthPrompt: string;
            seventhPrompt: string;
        };

        buttons: {
            getStarted: string;
            continue: string;
            accept: string;
            skipSetUp: string;
        };
    };

    async init() {
        this.isAndroidPlatform = await this.isAndroid();

        this.locators = this.isAndroidPlatform
            ? new AndroidLocators()
            : new iOSLocators();

        this.screensOnboarding = {
            elements: {
                firstPrompt: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "How We Feel-\nA Journal for\nYour Wellbeing") // Different '-' format 
                    : await this.locators.selectValue("text", "How We Feel—\nA Journal for\nYour Wellbeing"), // Different '—' format (large)
                secondPrompt: await this.locators.selectValue("text", "Find words to identify your emotions"),
                thirdPrompt: await this.locators.selectValue("text", "Try strategies to help you in the moment"),
                fourthPrompt: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "And over time, spot patterns to gain insight") // Different format
                    : await this.locators.selectValue("text", "And over time, spot patterns to gain insights"), // Different format (s)
                fifthPrompt: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "It’s free!\nMade possible\nby donations") // Different format
                    : await this.locators.selectValue("text", "It’s free—\nMade possible by donations"), // Different format
                sixthPrompt: await this.locators.selectValue("text", "Terms & Privacy"),
                seventhPrompt: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "Hi and welcome\nto HWF!") // Different element
                    : await this.locators.selectValue("text", "Skip setup"), // Different element
            },
            buttons: {
                getStarted: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "Get started")
                    : await this.locators.selectValue("text", "Get Started"),
                
                continue: await this.locators.selectValue("text", "Continue"),
                accept: await this.locators.selectValue("text", "I Accept"),
                skipSetUp: await this.locators.selectValue("text", "Skip setup"),
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