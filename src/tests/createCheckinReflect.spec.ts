import { enableAISettings } from "../helpers/enableAISettings";
import { doLoginFlow } from "../helpers/loginFlow";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { doReflectFlow } from "../helpers/reflectFlow";
import { whichPlatform } from "../helpers/whichPlatform";
import { deactivateShare } from "../helpers/deactivateShare";

it("Should create a check-in with reflection feature", async() => {
    let locator = await whichPlatform();
    await skipOnboardingFlow();
    await doLoginFlow(locator);
    await enableAISettings(locator);

    await doReflectFlow(false, true); // First check-in
    await deactivateShare(locator);

    for(let i=0; i<5; i++){
        await doReflectFlow(false, false);
    }

    if(locator.isAndroidPlatform){
        // The last one with the modal of sharing
        if(await locator.verifyIsElementDisplayed("shareEmotionsModal")){
            await locator.tapButton("close")
        }
        await driver.pause(1000);
    }
    
    await doReflectFlow(false, false);
});