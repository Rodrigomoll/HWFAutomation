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
            
            getStarted: { type: "text", value: "signup_education_next_button"},
            introPrompt: { type: "text", value: "education_step_text_label" },
            emotionWordsPrompt: { type: "text", value: "education_step_text_label" },
            strategiesPrompt: { type: "text", value: "education_step_text_label" },
            patternsPrompt: { type: "text", value: "education_step_text_label" },
            freeInfoPrompt: { type: "text", value: "education_step_text_label" },
            termsPrivacyPrompt: { type: "text", value: "accept_terms_title" },
            accept: { type: "text", value: "accept_terms_button"},
            continue: { type: "text", value: "signup_education_next_button"},
            skipSetUp: { type: "text", value: "onboarding_skip_button"},
            continueSetUp: { type: "text", value: "onboarding_continue_button"},

            hearAboutPrompt: { type: "text", value: "referral_source_title_label"},
            hearAboutFirstOption: { type: "text", value: "referral_source_friends-family-colleagues_row"},
            explorePrompt: { type: "text", value: "set_goals_title_label" },
            positiveOption: { type: "text", value: "set_goals_purpose-and-meaning_row" },
            helpPrompt: { type: "text", value: "achieve_goals_title_label" },
            firstCheckinPrompt: { type: "text", value: "moodmeter_pulsars_education_title_label" },
            completePrompt: { type: "text", value: "check_in_saved_description_label" },
            frecuencyPrompt: { type: "text", value: "onboarding_title_label" },
            skipWidget: { type: "text", value: "onboarding_skip_button" },
            arrowRight: { type: "text", value: "mood_toast_next_button" },
            explorePleasedPrompt: { type: "text", value: "journal_editor_title_label" },
            reminderPrompt: { type: "text", value: "onboarding_title_label" },
            twicePerDay: { type: "text", value: "notif_goal_circle_2" },

            genderModalTitle: { type: "text", value: "gender_modal_title_label" },
            genderModalSkip: { type: "text", value: "gender_modal_close_button" },
            genderScreenTitle: { type: "text", value: "gender_onboarding_title_label" },
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
      await this.tapButton("continueSetUp");

      await assertAllTrue(this.verifyIsElementDisplayed("frecuencyPrompt"));
      await this.tapButton("twicePerDay");
      await this.tapButton("continueSetUp");

      await assertAllTrue(this.verifyIsElementDisplayed("reminderPrompt"));
      await this.tapButton("continueSetUp");
      await this.tapButton("skipWidget");
    }

}