import { verify } from "./testVerification";
import { AndroidLocators } from "../locators/AndroidLocators";
import { iOSLocators } from "../locators/iOSLocators";

export async function setupInitialOnboardingFlow(locator: AndroidLocators | iOSLocators, skip: boolean) {
    try{
        await verify(locator.verifyIsElementDisplayed("introPrompt"))
        await locator.tapButton("getStarted");

        await verify(locator.verifyIsElementDisplayed("emotionWordsPrompt"));
        await locator.tapButton("continue");

        await verify(locator.verifyIsElementDisplayed("strategiesPrompt"));
        await locator.tapButton("continue");
        
        await verify(locator.verifyIsElementDisplayed("patternsPrompt"));
        await locator.tapButton("continue");

        await verify(locator.verifyIsElementDisplayed("freeInfoPrompt"));
        await locator.tapButton("continue");

        await verify(locator.verifyIsElementDisplayed("termsPrivacyPrompt"));
        await locator.tapButton("accept");

        if(locator.elements?.["welcomePrompt"]){
            await verify(locator.verifyIsElementDisplayed("welcomePrompt"));
        }

        await driver.pause(1000);
        await locator.tapButton(skip ? "skipSetUp" : "continue");
    }
    catch (error) {
        console.error("Error during initial onboarding setup:", error);
    }
}