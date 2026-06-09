import { assertAllTrue } from "../helpers/assertAllTrue";
import { verifyCheckInHomeScreen } from "../helpers/verifyCheckInHomeScreen";
import { BasePage } from "./BasePage";
import { argosScreenshot } from "@argos-ci/webdriverio";

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
            
            skipSetUpp: { type: "className", value: "android.widget.Button", instance: 1 },
        }
    }

    /**
     * Navigates through the initial onboarding screens, such as emotion education,
     * strategies, and privacy terms. The flow ends at the setup decision point.
     * 
     * @param skip - If true, skips the full setup after initial onboarding.
     */
    async setupInitialOnboardingFlow(skip: boolean) {
        try {
            await assertAllTrue(this.verifyIsElementDisplayed("introPrompt"));
            await driver.pause(500);

            //await driver.checkScreen("intro-screen");
            await argosScreenshot(browser, "intro-screen");

            await this.tapButton("getStarted");

            await assertAllTrue(this.verifyIsElementDisplayed("emotionWordsPrompt"));

            await argosScreenshot(browser, "emotion-words-screen");
            //await driver.checkScreen("emotion-words-screen");

            await this.tapButton("continue");

            await assertAllTrue(this.verifyIsElementDisplayed("strategiesPrompt"));

            await argosScreenshot(browser, "strategies-screen");
            //await driver.checkScreen("strategies-screen");

            await this.tapButton("continue");

            await assertAllTrue(this.verifyIsElementDisplayed("patternsPrompt"));

            await argosScreenshot(browser, "patterns-screen");
            //await driver.checkScreen("patterns-screen");

            await this.tapButton("continue");

            await assertAllTrue(this.verifyIsElementDisplayed("freeInfoPrompt"));

            await argosScreenshot(browser, "free-info-screen");
            //await driver.checkScreen("free-info-screen");

            await this.tapButton("continue");

            await assertAllTrue(this.verifyIsElementDisplayed("termsPrivacyPrompt"));

            await argosScreenshot(browser, "terms-screen");
            //await driver.checkScreen("terms-screen");

            await this.tapButton("accept");

            if (this.locator.elements?.["welcomePrompt"]) {
                await assertAllTrue(this.verifyIsElementDisplayed("welcomePrompt"));

                await argosScreenshot(browser, "welcome-screen");
                //await driver.checkScreen("welcome-screen");
            }

            await driver.pause(1000);

            await argosScreenshot(browser, skip ? "skip-setup-screen" : "continue-setup-screen");
            //await driver.checkScreen(
            //     skip ? "skip-setup-screen" : "continue-setup-screen"
            // );

            await this.tapButton(skip ? "skipSetUp" : "continueSetUp");

        } catch (error) {
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

            await driver.pause(1000);
            
            await this.skipPrivacyModal();

            if (await this.isSpanishFlow()) {
                await assertAllTrue(this.verifyIsElementDisplayed("genderModalTitle"), this.verifyIsElementDisplayed("genderModalSkip"));
                
                // await eyes.check(
                //     "Gender modal",
                //     Target.window().layout()
                // );

                await this.tapButton("genderModalSkip");

                // await eyes.check(
                //         "Check-in tab",
                //         Target.window().layout()
                // );  
            }

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

            await assertAllTrue(this.verifyIsElementDisplayed("hearAboutPrompt"), this.verifyIsElementDisplayed("hearAboutFirstOption"));
            
            await this.tapButton("hearAboutFirstOption");
            await this.tapButton("continueSetUp");

            await assertAllTrue(this.verifyIsElementDisplayed("explorePrompt"), this.verifyIsElementDisplayed("positiveOption"));
            
            await this.tapButton("positiveOption");
            await this.tapButton("continueSetUp");

            await assertAllTrue(this.verifyIsElementDisplayed("helpPrompt"));
            await this.tapButton("continueSetUp");

            if (await this.isSpanishFlow()) {
                await assertAllTrue(this.verifyIsElementDisplayed("genderScreenTitle"));
                await this.tapButton("continueSetUp");
            }

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