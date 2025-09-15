import { OnboardingInitialPage } from "../pages/flows/OnboardingInitialPage";
import { verify } from "./testVerification";

export async function setupInitialOnboardingFlow(skip: boolean) {
    const onboardingInitialPage = await new OnboardingInitialPage().init();

    try{
        await verify(onboardingInitialPage.isScreenDisplayed("firstPrompt"))
        await onboardingInitialPage.tapButton("getStarted");

        await verify(onboardingInitialPage.isScreenDisplayed("secondPrompt"));
        await onboardingInitialPage.tapButton("continue");

        await verify(onboardingInitialPage.isScreenDisplayed("thirdPrompt"));
        await onboardingInitialPage.tapButton("continue");
        
        await verify(onboardingInitialPage.isScreenDisplayed("fourthPrompt"));
        await onboardingInitialPage.tapButton("continue");

        await verify(onboardingInitialPage.isScreenDisplayed("fifthPrompt"));
        await onboardingInitialPage.tapButton("continue");

        await verify(onboardingInitialPage.isScreenDisplayed("sixthPrompt"));
        await onboardingInitialPage.tapButton("accept");

        await verify(onboardingInitialPage.isScreenDisplayed("seventhPrompt"));
        await onboardingInitialPage.tapButton(skip ? "skipSetUp" : "continue");
    }
    catch (error) {
        console.error("Error during initial onboarding setup:", error);
    }
}