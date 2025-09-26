import { BasePage } from "../pages/base/BasePage";

export abstract class BaseLocators extends BasePage {

    public isAndroidPlatform: boolean = false;

    constructor() {
        super();
        this.initPlatform();
    }

    private async initPlatform() {
        this.isAndroidPlatform = await this.isAndroid();
    }
    
    public elements: Record<string, { type: string; value: string; instance?: number }> = {
        // Texts / Prompt
        emotionWordsPrompt: { type: "text", value: "Find words to identify your emotions" },
        strategiesPrompt: { type: "text", value: "Try strategies to help you in the moment" },
        termsPrivacyPrompt: { type: "text", value: "Terms & Privacy" },
        reminderPrompt: { type: "text", value: "What time do you want to be reminded?" },
        checkinPrompt: { type: "contains", value: "How are you feeling this" },

        // Modals
        skipModal: { type: "text", value: "Are you sure you want to skip the setup?" },
        privacyUpdateModal: { type: "text", value: "We\'ve updated our Privacy Policy" },

        // Inputs

        // Buttons
        continue: { type: "text", value: "Continue"},
        accept: { type: "text", value: "I Accept"},
        skipSetUp: { type: "text", value: "Skip setup"},
        skip: { type: "text", value: "Skip"},
        complete: { type: "text", value: "Complete check-in" },
        positiveOption: { type: "text", value: "I want to feel more positive around others" },
        yellowQuadrant: { type: "text", value: "High Energy\nPleasant" },
        pleasedEmotion: { type: "text", value: "Pleased" },
        greenQuadrant: { type: "text", value: "Low Energy\nPleasant" },

        // Emotions
        uneasyEmotion: { type: "text", value: "Uneasy" },
        calmEmotion: { type: "text", value: "Calm" },
        boredEmotion: { type: "text", value: "Bored" },

        uneasyEmotionLabel: { type: "text", value: "uneasy" },
        calmEmotionLabel: { type: "text", value: "calm" },

        uneasyText: { type: "text", value: "Feeling stressed about work" },
        calmText: { type: "text", value: "Feeling peaceful and relaxed today." },

        // Feelings
        yellowEmotions: { type: "text", value: "Yellow" },
        absorbedEmotion: { type: "text", value: "Absorbed" },
        greenEmotions: { type: "text", value: "Green" },
        acceptedEmotion: { type: "text", value: "Accepted" },
        blueEmotions: { type: "text", value: "Blue" },
        abandonedEmotion: { type: "text", value: "Abandoned" },
        redEmotions: { type: "text", value: "Red" },
        afraidEmotion: { type: "text", value: "Afraid" },

        // Friends
        friends: { type: "text", value: "Friends" },
        sharePrompt: { type: "text", value: "Share your emotions with friends" },
        checkin: { type: "text", value: "Check in" },
        selectAllButton: { type: "text", value: "Select all" },
        shareModalPrompt: { type: "text", value: "Share your check-in?" },
        share: { type: "contains", value: "Share with" },

        // Settings
        aiOption: { type: "text", value: "AI settings" },
        reflectModal: { type: "text", value: "Introducing" },
    }

    abstract buildSelector(selector: string): Promise<string>;

    async verifyIsElementDisplayed(element, timeout?: number): Promise<boolean> {
        //: keyof typeof this.elements
        return await this.isElementDisplayed(await this.buildSelector(element), timeout ?? null);
    }

    async tapButton(element, timeout?: number): Promise<void> {
        await this.tapElement(await this.buildSelector(element), timeout ?? null);
    }

    async enterTextJournal(element: string, text: string): Promise<void> {
        await this.enterText(await this.buildSelector(element), text, true);
    }

    async waitFor(element, timeout?: number) {
        return await this.waitForElement(await this.buildSelector(element), timeout ?? null);
    }

    async verifyIsActive(element): Promise<boolean> {
        const checkedAttr = await $(await this.buildSelector(element));
        await driver.pause(1000);
        const val = await checkedAttr.getAttribute(this.isAndroidPlatform ? "checked" : "value");
        return this.isAndroidPlatform ? val === "true" : val === "1";
    }
    
}