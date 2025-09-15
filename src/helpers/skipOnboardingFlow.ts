import { setupInitialOnboardingFlow } from "./setupInitialOnboardingFlow";
import { OnboardingSkipPage } from "../pages/flows/OnboardingSkipPage";
import { verify } from "./testVerification";

export async function skipOnboardingFlow() {
    try{
        const onboardingSkipPage = await new OnboardingSkipPage().init();
        
        await setupInitialOnboardingFlow(true);
        
        await verify(onboardingSkipPage.isScreenDisplayed("skipModal"));
        await onboardingSkipPage.tapButton("skipModal");

        if (await onboardingSkipPage.isScreenDisplayed("privacyModal")) {
            await verify(onboardingSkipPage.isScreenDisplayed("privacyModal"));
            await onboardingSkipPage.tapButton("accept");
        }
    }
    catch (error) {
        console.error("Error during skip onboarding setup:", error);
    }
}