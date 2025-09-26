import { setupInitialOnboardingFlow } from "./setupInitialOnboardingFlow";
import { verify } from "./testVerification";
import { whichPlatform } from "./whichPlatform";

export async function skipOnboardingFlow() {
    try{
        const locator = await whichPlatform();
        
        await setupInitialOnboardingFlow(locator, true);
        
        await verify(locator.verifyIsElementDisplayed("skipModal"));

        if (locator.isAndroidPlatform) {
            await locator.tapButton("skip");

            if(await locator.verifyIsElementDisplayed("privacyUpdateModal")){
                await locator.tapButton("accept");
            }
        }
    }
    catch (error) {
        console.error("Error during skip onboarding setup:", error);
    }
}