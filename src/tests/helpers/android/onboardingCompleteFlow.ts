import { OnboardingSkipPage } from "../../../pages/android/OnboardingSkipPage";
import { verify } from "./test-verification";

// This function completes the onboarding flow by interacting with first steps of the onboarding screens
// the methods comes from OnboardingSkipPage class then proceeds to the next steps

export async function doOnboardingCompleteFlow() {
    const onboardingSkipPage = new OnboardingSkipPage();

    try{
        await verify(onboardingSkipPage.isFirstScreenDisplayed())
        await onboardingSkipPage.tapGetStarted();

        await verify(onboardingSkipPage.isSecondScreenDisplayed());
        await onboardingSkipPage.tapContinueSecondScreen();

        await verify(onboardingSkipPage.isThirdScreenDisplayed());
        await onboardingSkipPage.tapContinueThirdScreen();
        
        await verify(onboardingSkipPage.isFourthScreenDisplayed());
        await onboardingSkipPage.tapContinueFourthScreen();

        await verify(onboardingSkipPage.isFifthScreenDisplayed());
        await onboardingSkipPage.tapContinueFifthScreen();

        await verify(onboardingSkipPage.isSixthScreenDisplayed());
        await onboardingSkipPage.tapIAccept();

        await verify(onboardingSkipPage.isSeventhScreenDisplayed());
        await onboardingSkipPage.tapContinueSeventhScreen();
    }
    catch (error) {
        console.error("Error during onboarding setup:", error);
    }
}