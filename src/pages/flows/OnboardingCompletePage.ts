import { BasePage } from "../base/BasePage";
import { AndroidLocators } from "../../locators/AndroidLocators";
import { iOSLocators } from "../../locators/iOSLocators";

export class OnboardingCompletePage extends BasePage {
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
            eigthPrompt: string;
            ninethPrompt: string;

            textInput: string;
            accessModal: string;
            alarmDescription: string;
            widget: string;
            widgetDescription: string;
        };

        buttons: {
            continue: string;
            next: string;
            settings: string;
            finish: string;
            complete: string;
            close: string;

            firstOption: string;
            pleasantOption: string;
            pleasedEmotion: string;
            arrowRight: string;
            journalEntry: string;
            twicePerDay: string;
            howWeFeel: string;
            allowSettings: string;
            navigateBack: string;
            addWidget: string;
            addToHome: string;
            notNow: string;
            checkin: string;
        };
    };

    async init() {
        this.isAndroidPlatform = await this.isAndroid();

        this.locators = this.isAndroidPlatform
            ? new AndroidLocators()
            : new iOSLocators();

        this.screensOnboarding = {
            elements: {
                // Prompts (Screens)
                firstPrompt: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "Before jumping in,\nlet’s explore why you’re here.") // Different format 
                    : await this.locators.selectValue("text", "Before jumping in,\nlet's explore why you're here."), // Different format
                secondPrompt: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "Great! How We Feel will help you:") // Different format 
                    : await this.locators.selectValue("text", "Great! How We\nFeel will help you:"), // Different format 
                thirdPrompt: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "Let’s do your \nfirst check in") // Different format 
                    : await this.locators.selectValue("text", "Let’s do your\nfirst check-in"), // Different format
                fourthPrompt: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "Describe what might be causing you to feel\npleased …") // Different element 
                    : await this.locators.selectValue("text", "Explore why you might be feeling pleased"), // Different element 
                fifthPrompt: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "First check-in complete")
                    : await this.locators.selectValue("text", "Remember to check in regularly to spot patterns"),
                sixthPrompt: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "How often do you want to check in?")
                    : await this.locators.selectValue("text", "How often do you\nwant to check in?"),
                seventhPrompt: await this.locators.selectValue("text", "What time do you want to be reminded?"),
                eigthPrompt: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "Check in anytime with the How We Feel widget")
                    : await this.locators.selectValue("text", "Add the widget"),
                ninethPrompt: await this.locators.selectValue("text", "Finally, let\'s try a strategy"),

                // Other elements
                textInput: this.isAndroidPlatform
                    ? await this.locators.selectValue("className", "android.widget.ScrollView")
                    : await this.locators.selectValue("textView", null),
                accessModal: await this.locators.selectValue("text", "Special App Access required"),
                alarmDescription: await this.locators.selectValue("text", "Alarms & Reminders access is required in order to set an exact reminder time, otherwise an approximate reminder time will be used."),
                widget: await this.locators.selectValue("text", "Quick check in"),
                widgetDescription: await this.locators.selectValue("text", "Check in anytime with the How We Feel Widget"),
            },
            buttons: {
                // General buttons
                continue: await this.locators.selectValue("text", "Continue"),
                next: await this.locators.selectValue("description", "Next"),
                settings: await this.locators.selectValue("text", "Settings"),
                finish: await this.locators.selectValue("button", "Finish"),
                complete: await this.locators.selectValue("text", "Complete check-in"),
                close: await this.locators.selectValue("navigation", "HowWeFeel_Moodmeter.DeadSimpleVideoView"),

                // Specific buttons
                firstOption: await this.locators.selectValue("text", "I want to feel more positive around others"),
                pleasantOption: await this.locators.selectValue("text", "High Energy\nPleasant"),
                pleasedEmotion: await this.locators.selectValue("text", "Pleased"),
                arrowRight: await this.locators.selectValue("text", "TagArrowRight"),
                journalEntry: await this.locators.selectValue("text", "Add Journal Entry"),
                twicePerDay: await this.locators.selectValue("text", "2 per day (recommended)"),
                howWeFeel: await this.locators.selectValue("text", "How We Feel"),
                allowSettings: await this.locators.selectValue("text", "Allow setting alarms and reminders"),
                navigateBack: await this.locators.selectValue("partialMatch", "Navigate up"), // ~ le puso eso como ios
                addWidget: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "Add widget")
                    : await this.locators.selectValue("text", "Add the widget"),
                addToHome: await this.locators.selectValue("text", "Add to home screen"),
                notNow: await this.locators.selectValue("text", "Not right now"),
                checkin: this.isAndroidPlatform
                    ? await this.locators.selectValue("text", "Want to change how you feel?\nExplore tools for emotional\nregulation!")
                    : await this.locators.selectValue("text", "Want to change how you feel? Explore tools for emotional regulation!"),
            }
        };

        return this;
    }

    async verifyIsElementDisplayed(
        element: keyof typeof this.screensOnboarding.elements
    ): Promise<boolean> {
        return await this.isElementDisplayed(await this.locators.buildSelector(this.screensOnboarding.elements[element]));
    }

    async tapButton(
        button: keyof typeof this.screensOnboarding.buttons
    ): Promise<void> {
        await this.tapElement(await this.locators.buildSelector(this.screensOnboarding.buttons[button]));
    }

    async enterTextJournal(text: string): Promise<void> {
        await this.enterText(await this.locators.buildSelector(this.screensOnboarding.elements.textInput), text, true);
    }
}