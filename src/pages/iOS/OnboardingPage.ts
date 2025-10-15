import { OnboardingPage } from "../OnboardingPage";
import { assertAllTrue } from "../../helpers/assertAllTrue";

/**
 * iOS implementation of the Onboarding page.
 * Defines iOS-specific locators and behavior.
 */
export class iOSOnboardingPage extends OnboardingPage {
    constructor() {
        super();
        this.locator.elements = {
            ...this.locator.elements,
            
            introPrompt: { type: "text", value: "How We Feel—\nA Journal for\nYour Wellbeing" },
            patternsPrompt: { type: "text", value: "And over time, spot patterns to gain insights" },
            freeInfoPrompt: { type: "text", value: "It’s free—\nMade possible by donations" },
            explorePrompt: { type: "text", value: "Before jumping in,\nlet's explore why you're here." },
            helpPrompt: { type: "text", value: "Great! How We\nFeel will help you:" },
            firstCheckinPrompt: { type: "text", value: "Let’s do your\nfirst check-in" },
            completePrompt: { type: "text", value: "Remember to check in regularly to spot patterns" },
            frecuencyPrompt: { type: "text", value: "How often do you\nwant to check in?" },
            addWidget: { type: "text", value: "Add the widget" },
            arrowRight: { type: "text", value: "TagArrowRight" },
            explorePleasedPrompt: { type: "text", value: "Explore why you might be feeling pleased" },
            close: { type: "navigation", value: "HowWeFeel_Moodmeter.DeadSimpleVideoView" },
            twicePerDay: { type: "text", value: "2 per day (recommended)" },
        }
    }

    async skipPrivacyModal(){
      // Not applicable
    }

    async completeOnboardingSetup(this){
      await this.tapButton("arrowRight");
      await this.tapButton("journalEntry");
      await assertAllTrue(this.verifyIsElementDisplayed("explorePleasedPrompt"));
      await this.enterTextJournal("textInput", "Exploring my pleased emotion with a test.");
      await this.tapButton("finish");
      await this.tapButton("complete");

      await assertAllTrue(this.verifyIsElementDisplayed("completePrompt"));
      await this.tapButton("continue");

      await assertAllTrue(this.verifyIsElementDisplayed("frecuencyPrompt"));
      await this.tapButton("twicePerDay");
      await this.tapButton("continue");

      await assertAllTrue(this.verifyIsElementDisplayed("reminderPrompt"));
      await this.tapButton("continue");
      await this.tapButton("addWidget");
      await this.tapButton("close");
    }

}