import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { verify } from "../helpers/testVerification";
import { doCheckinWithEmotionsFlow } from "../helpers/checkinWithEmotionsFlow";


describe("Edit Checkin Page", () => {
    let checkinPage: CheckinPage;
    
    const UPDATED_TEXT = "Updated journal entry for the check-in.";

    beforeAll(async () => {
        checkinPage = await new CheckinPage().init();
        //setup to skip all onboarding flow and start creating our check-ins
        await skipOnboardingFlow();
    });

    it("Should create uneasy check-in (red)", async () => {
        await doCheckinWithEmotionsFlow('uneasy', "Feeling stressed about work");
    });

    it("Should display the Checkin and edit the journal entry of the check-in", async () => {
        await verify(checkinPage.isCheckinDisplayed("uneasyEmotion2"));
        await checkinPage.tapElementButton("uneasyEmotion2");
        await verify(checkinPage.isCheckinCardDisplayed("uneasyEmotion2"));
        await checkinPage.tapElementButton("uneasyText");
        await driver.pause(2000);

        await checkinPage.editJournalEntry(UPDATED_TEXT);
        await verify(checkinPage.verifyIsNewElementDisplayed(UPDATED_TEXT));

        await checkinPage.tapElementButton("saveButton", 200);
        await checkinPage.tapElementButton("saveButton", 200);

        await verify(checkinPage.verifyIsNewElementDisplayed(UPDATED_TEXT));
    })
});