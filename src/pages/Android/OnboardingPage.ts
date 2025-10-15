import { OnboardingPage } from "../OnboardingPage";
import { assertAllTrue } from "../../helpers/assertAllTrue";

/**
 * Android implementation of the Onboarding page.
 * Defines Android-specific locators and behavior.
 */
export class AndroidOnboardingPage extends OnboardingPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,
            introPrompt: { type: "text", value: "How We Feel-\nA Journal for\nYour Wellbeing" },
            patternsPrompt: { type: "text", value: "And over time, spot patterns to gain insight" },
            freeInfoPrompt: { type: "text", value: "It’s free!\nMade possible\nby donations" },
            welcomePrompt: { type: "text", value: "Hi and welcome\nto HWF!" },
            skip: { type: "text", value: "Skip"},
            privacyUpdateModal: { type: "text", value: "We\'ve updated our Privacy Policy" },
            explorePrompt: { type: "text", value: "Before jumping in,\nlet’s explore why you’re here." },
            helpPrompt: { type: "text", value: "Great! How We Feel will help you:" },
            firstCheckinPrompt: { type: "text", value: "Let’s do your \nfirst check in" },
            describePrompt: { type: "text", value: "Describe what might be causing you to feel\npleased …" },
            completePrompt: { type: "text", value: "First check-in complete" },
            frecuencyPrompt: { type: "text", value: "How often do you want to check in?" },
            accessModal: { type: "text", value: "Special App Access required" },
            alarmAccessDescription: { type: "text", value: "Alarms & Reminders access is required in order to set an exact reminder time, otherwise an approximate reminder time will be used." },
            howWeFeel: { type: "text", value: "How We Feel" },
            allowSettings: { type: "text", value: "Allow setting alarms and reminders" },
            navigateBack: { type: "partialMatch", value: "Navigate up" },
            widgetPrompt: { type: "text", value: "Check in anytime with the How We Feel widget" },
            quickCheckin: { type: "text", value: "Quick check in" },
            addWidget: { type: "text", value: "Add widget" },
            addToHome: { type: "text", value: "Add to home screen" },
            tryStrategyPrompt: { type: "text", value: "Finally, let\'s try a strategy" },
            notRightNow: { type: "text", value: "Not right now" },
        }
    }

    async skipPrivacyModal(){
        await this.tapButton("skip");

        if(await this.verifyIsElementDisplayed("privacyUpdateModal")){
            await this.tapButton("accept");
        }
    }

    async completeOnboardingSetup(){
      await assertAllTrue(this.verifyIsElementDisplayed("describePrompt"));
      await this.enterTextJournal("textInput", "This is a test journal entry.");
      await this.tapButton("next");

      await assertAllTrue(this.verifyIsElementDisplayed("completePrompt"));
      await this.tapButton("continue");

      await assertAllTrue(this.verifyIsElementDisplayed("frecuencyPrompt"));
      await this.tapButton("continue");

      await assertAllTrue(this.verifyIsElementDisplayed("reminderPrompt"));
      await this.tapButton("continue");

      if(await this.verifyIsElementDisplayed("accessModal")){
        await assertAllTrue(this.verifyIsElementDisplayed("alarmAccessDescription"));
        await this.tapButton("settings");
        await this.tapButton("howWeFeel");
        await this.tapButton("allowSettings");
        await this.tapButton("navigateBack");
        await this.tapButton("navigateBack");
        await this.tapButton("continue");
      }

      await assertAllTrue(this.verifyIsElementDisplayed("widgetPrompt"));
      await this.tapButton("continue");

      await assertAllTrue(this.verifyIsElementDisplayed("quickCheckin"));
      await this.tapButton("addWidget", 5000);
      await this.tapButton("addToHome");

      await driver.pause(1000);

      await assertAllTrue(this.verifyIsElementDisplayed("tryStrategyPrompt"));
      await this.tapButton("notRightNow");
    }

}