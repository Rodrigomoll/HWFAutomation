import { CheckinCardPage } from "../../pages/android/CheckinCardPage";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";
import { doCheckinWithEmotionsFlow } from "../helpers/android/checkinWithEmotionsFlow";


describe("Edit Checkin Page", () => {
    let checkinCardPage : CheckinCardPage;
    
    const ORIGINAL_TEXT = "Feeling stressed about work";
    const UPDATED_TEXT = "Updated journal entry for the check-in.";

    beforeAll(async () => {
        checkinCardPage = new CheckinCardPage();
        //setup to skip all onboarding flow and start creating our check-ins
        await doOnboardingSetup();
    });

    it("Should create uneasy check-in (red)", async () => {
        await doCheckinWithEmotionsFlow('uneasy', ORIGINAL_TEXT);
    });

    it("Should display the Checkin and edit the journal entry of the check-in", async () => {
        await verify(checkinCardPage.isCheckinUneasyDisplayed());
        await checkinCardPage.tapUneasyCheckin();
        await verify(checkinCardPage.isUneasyCheckinCardDisplayed());
        await checkinCardPage.tapJournalEntry();
        await checkinCardPage.editJournalEntry(UPDATED_TEXT);
        await verify(checkinCardPage.isEditedJournalEntryDisplayed(UPDATED_TEXT));
        await checkinCardPage.saveJournalEntry();
        await checkinCardPage.saveJournalEntry();
        await verify(checkinCardPage.isEditedJournalEntryDisplayed(UPDATED_TEXT));
    })
});