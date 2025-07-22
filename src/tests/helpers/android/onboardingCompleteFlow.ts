import { OnboardingSkipPage } from "../../../pages/android/OnboardingSkipPage";

// This function completes the onboarding flow by interacting with first steps of the onboarding screens
// the methods comes from OnboardingSkipPage class then proceeds to the next steps

export async function doOnboardingCompleteFlow() {
    const onboardingSkipPage = new OnboardingSkipPage();

    try{
        await onboardingSkipPage.tapGetStarted();
        await new Promise(resolve => setTimeout(resolve, 800));
        
        await onboardingSkipPage.tapContinueSecondScreen();
        await new Promise(resolve => setTimeout(resolve, 800));
        
        await onboardingSkipPage.tapContinueThirdScreen();
        await new Promise(resolve => setTimeout(resolve, 800));
        
        await onboardingSkipPage.tapContinueFourthScreen();
        await new Promise(resolve => setTimeout(resolve, 800));
        
        await onboardingSkipPage.tapContinueFifthScreen();
        await new Promise(resolve => setTimeout(resolve, 800));
        
        await onboardingSkipPage.tapIAccept();
        await new Promise(resolve => setTimeout(resolve, 800));

        await onboardingSkipPage.tapContinueSeventhScreen();
        await new Promise(resolve => setTimeout(resolve, 800));
    }
    catch (error) {
        console.error("Error during onboarding setup:", error);
    }
}