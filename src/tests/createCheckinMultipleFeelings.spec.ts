import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { whichPlatform } from "../helpers/whichPlatform";

describe("Create check-in with multiple feelings", () => {
    let checkinPage : CheckinPage;
    let locator;

    beforeAll(async () => {
        locator = await whichPlatform();
        checkinPage = await new CheckinPage(locator);

        // Setup to skip all onboarding flow and start creating our check-ins
        await skipOnboardingFlow();
    })

    it("Should create a check-in with multiple feelings", async () => {
        await checkinPage.QuadrantsStep();

        await checkinPage.tapEmotion("redQuadrant", "uneasyEmotion");

        await checkinPage.tagsStep();

        if(locator.isAndroidPlatform){
            await locator.tapButton("addFeeling");
        }
        else {
            await locator.swipeVertical("down", 0.6);
            await locator.tapButton("addEmotion");
        }

        await locator.tapButton("searchInput");
        await locator.tapButton("yellowEmotions");
        await locator.tapButton("absorbedEmotion");

        await checkinPage.journalStep("This is a test journal entry.");

        await checkinPage.dataAndSaveStep();
        
        await checkinPage.completeCheckin(true);
    })
})