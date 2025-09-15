import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { verify } from "../helpers/testVerification";

describe("Create check-in with multiple feelings", () => {
    let checkinPage : CheckinPage;

    beforeAll(async () => {
        checkinPage = await new CheckinPage().init();
        // Setup to skip all onboarding flow and start creating our check-ins
        await skipOnboardingFlow();
    })

    it("Should create a check-in with multiple feelings", async () => {
        await checkinPage.QuadrantsStep();

        await checkinPage.tapUneasyEmotion();

        await checkinPage.tagsStep();

        await checkinPage.tapElementButton("addFeelingButton");
        await checkinPage.waitFor("searchInput");

        //await verify(checkinPage.displayColorsCategory());
        await checkinPage.tapElementButton("yellowEmotions");
        await checkinPage.tapElementButton("absorbedEmotion");

        await checkinPage.journalStep("This is a test journal entry.");

        await checkinPage.dataAndSaveStep();
        
        await checkinPage.completeCheckin(true);
    })
})