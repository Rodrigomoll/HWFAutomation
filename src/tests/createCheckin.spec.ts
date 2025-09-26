import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { whichPlatform } from "../helpers/whichPlatform";

describe("Create Checkin Page", () => {
    let checkinPage: CheckinPage;
    let locator;

    beforeAll(async () => {
        locator = await whichPlatform();
        checkinPage = await new CheckinPage(locator);
        
        //setup to skip all onboarding flow and start creating our check-ins
        await skipOnboardingFlow();
    });

    it("Should display the Create Checkin page", async () => {
        await checkinPage.QuadrantsStep();

        await checkinPage.tapEmotion("yellowQuadrant", "pleasedEmotion");

        await checkinPage.tagsAndJournalStep("This is a test journal entry.", true);

        await checkinPage.dataAndSaveStep();
        
        await checkinPage.completeCheckin();
    });
});