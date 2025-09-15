import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { HealthDataEntriesPages } from "../pages/flows/HealthDataEntriesPage";
import { verify } from "../helpers/testVerification";

describe("Create Checkin Health Data Page", () => {
    let checkinPage : CheckinPage;
    let healthDataPage : HealthDataEntriesPages;

    beforeAll(async () => {
        checkinPage = await new CheckinPage().init();
        healthDataPage = await new HealthDataEntriesPages().init();
        await skipOnboardingFlow();
    });

    it("Should create a check-in with health data", async () => {
        await checkinPage.QuadrantsStep();

        await checkinPage.tapUneasyEmotion();

        await checkinPage.tagsAndJournalStep("This is a test journal entry with health data entries.");

        await verify(checkinPage.verifyIsElementDisplayed("dataPrompt"));
        await checkinPage.tapElementButton("paperClipIcon");

        await healthDataPage.healthDataEntriesFlow();
        
        await checkinPage.tapElementButton("saveButton");

        await checkinPage.completeCheckin();
    })
})