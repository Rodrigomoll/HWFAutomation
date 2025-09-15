import { enableAISettings } from "../helpers/enableAISettings";
import { doLoginFlow } from "../helpers/loginFlow";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { doReflectFlow } from "../helpers/reflectFlow";
import { deactivateShare } from "../helpers/deactivateShare";
import { FriendsPage } from "../pages/flows/FriendsPage";

it("Should create a check-in with reflection and takeaways feature", async () => {
    const friendsPage = await new FriendsPage().init();
    
    await skipOnboardingFlow();
    await doLoginFlow();
    await enableAISettings();

    await doReflectFlow(true, true); // First check-in
    await deactivateShare();

    for(let i=0; i<5; i++){
        await doReflectFlow(true, false);
    }
    // The last one with the modal of sharing
    if(await friendsPage.verifyIsElementDisplayed("shareEmotionsModal")){
        await friendsPage.tapElementButton("closeButton2")
    }
    //await driver.pause(1000);
    await doReflectFlow(true, false);
});
