import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { verify } from "../helpers/testVerification";

describe("Create Checkin Past Date Page", () => {
    let checkinPage: CheckinPage;

    beforeAll(async () => {
        checkinPage = await new CheckinPage().init();
        //setup to skip all onboarding flow and start creating our check-ins
        await skipOnboardingFlow();
    });

    it("Should display the Create Checkin page", async () => {
        await checkinPage.QuadrantsStep();
        await checkinPage.tapBoredEmotion();

        await checkinPage.tagsAndJournalStep("This is a test journal entry.");

        await verify(checkinPage.verifyIsElementDisplayed("dataPrompt"));
        await checkinPage.tapDateTimeDisplay();
        await checkinPage.selectPreviousDateInCarousel();
        await checkinPage.tapElementButton("saveButton");
        await checkinPage.tapElementButton("saveButton");

        await verify(checkinPage.isPreviousDateDisplayed());

        await checkinPage.completeCheckin();
    });
})