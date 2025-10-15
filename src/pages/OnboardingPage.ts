import { assertAllTrue } from "../helpers/assertAllTrue";
import { verifyCheckInHomeScreen } from "../helpers/verifyCheckInHomeScreen";
import { BasePage } from "./BasePage";

/**
 * Represents the onboarding flow shown to users when they launch the app for the first time.
 * Includes interactions for introductory screens, permissions, and optional setup steps.
 */
export abstract class OnboardingPage extends BasePage {

    constructor() {
        super();
        this.init();

        // Define key UI elements specific to the Onboarding page
        this.locator.elements = {
            ...this.locator.elements,

            emotionWordsPrompt: { type: "text", value: "Find words to identify your emotions" },
            strategiesPrompt: { type: "text", value: "Try strategies to help you in the moment" },
            termsPrivacyPrompt: { type: "text", value: "Terms & Privacy" },
            accept: { type: "text", value: "I Accept"},
            skipSetUp: { type: "text", value: "Skip setup"},
            skipModal: { type: "text", value: "Are you sure you want to skip the setup?" },
            positiveOption: { type: "text", value: "I want to feel more positive around others" },
            reminderPrompt: { type: "text", value: "What time do you want to be reminded?" },
        }
    }

    /**
     * Navigates through the initial onboarding screens, such as emotion education,
     * strategies, and privacy terms. The flow ends at the setup decision point.
     * 
     * @param skip - If true, skips the full setup after initial onboarding.
     */
    async setupInitialOnboardingFlow(skip: boolean){
        try{
            await assertAllTrue(this.verifyIsElementDisplayed("introPrompt"))
            await this.tapButton("getStarted");

            await assertAllTrue(this.verifyIsElementDisplayed("emotionWordsPrompt"));
            await this.tapButton("continue");

            await assertAllTrue(this.verifyIsElementDisplayed("strategiesPrompt"));
            await this.tapButton("continue");
            
            await assertAllTrue(this.verifyIsElementDisplayed("patternsPrompt"));
            await this.tapButton("continue");

            await assertAllTrue(this.verifyIsElementDisplayed("freeInfoPrompt"));
            await this.tapButton("continue");

            await assertAllTrue(this.verifyIsElementDisplayed("termsPrivacyPrompt"));
            await this.tapButton("accept");

            if(this.locator.elements?.["welcomePrompt"]){
                await assertAllTrue(this.verifyIsElementDisplayed("welcomePrompt"));
            }

            await driver.pause(1000);
            await this.tapButton(skip ? "skipSetUp" : "continue");
        }
        catch (error) {
            console.error("Error during initial onboarding setup:", error);
            throw error;
        }
    }

    /**
     * Confirms the user’s choice to skip onboarding setup when prompted.
     */
    abstract skipPrivacyModal(): Promise<void>;

    /**
     * Runs a reduced onboarding flow where the user skips the setup process
     * after completing the initial screens and handles any confirmation modals.
     */
    async skipOnboardingFlow(){
        try{
            await this.setupInitialOnboardingFlow(true);
            
            await assertAllTrue(this.verifyIsElementDisplayed("skipModal"));

            await this.skipPrivacyModal();
            return true;
        }
        catch (error) {
            console.error("Error during skip onboarding setup:", error);
            throw error;
        }
    }

    /**
     * Finalizes the onboarding setup based on selected options during the flow.
     */
    abstract completeOnboardingSetup(): Promise<void>;

    /**
     * Completes the full onboarding experience including prompts, setup selections,
     * and the first check-in. Ends with verification that the user reaches the home screen.
     */
    async completeOnboardingFlow(){
        try{
            await this.setupInitialOnboardingFlow(false);
            
            await assertAllTrue(this.verifyIsElementDisplayed("explorePrompt"));
            
            await this.tapButton("positiveOption");
            await this.tapButton("continue");

            await assertAllTrue(this.verifyIsElementDisplayed("helpPrompt"));
            await this.tapButton("continue");

            await driver.pause(1000);

            await assertAllTrue(this.verifyIsElementDisplayed("firstCheckinPrompt"));
            await this.tapButton("yellowQuadrant");
            await this.tapButton("pleasedEmotion");

            await this.completeOnboardingSetup();

            return await verifyCheckInHomeScreen();
        }
        catch (error) {
            console.error("Error during complete onboarding setup:", error);
            throw error;
        }
    }

}