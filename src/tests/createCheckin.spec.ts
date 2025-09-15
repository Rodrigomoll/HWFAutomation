import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";

describe("Create Checkin Page", () => {
    let checkinPage: CheckinPage;

    beforeAll(async () => {
        checkinPage = await new CheckinPage().init();
        
        //setup to skip all onboarding flow and start creating our check-ins
        await skipOnboardingFlow();
    });

    it("Should display the Create Checkin page", async () => {
        await checkinPage.QuadrantsStep();
        await checkinPage.tapElementButton("yellowQuadrant");

        await checkinPage.tapPleasedEmotion(false);

        await checkinPage.tagsAndJournalStep("This is a test journal entry.");

        await checkinPage.dataAndSaveStep();
        
        await checkinPage.completeCheckin();
    });
});