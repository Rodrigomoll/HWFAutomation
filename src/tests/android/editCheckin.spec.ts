import { CheckinListPage } from "../../pages/android/CheckinListPage";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";


describe("Edit Checkin Page", () => {
    let checkinListPage : CheckinListPage;
    beforeAll(async () => {
        checkinListPage = new CheckinListPage();
        //setup to skip all onboarding flow and start creating our check-ins
        await doOnboardingSetup();
    });

    it("Should create uneasy check-in (red)", async () => {
        await browser.createCheckinWithEmotions('uneasy', "Feeling stressed about work");
    });

    it("Should display the Checkin and edit the journal entry of the check-in", async () => {
        await verify (checkinListPage.isCheckinUneasyDisplayed());
        await new Promise(resolve => setTimeout(resolve, 1000));
        await checkinListPage.tapUneasyCheckin();
        await verify (checkinListPage.isUneasyCheckinCardDisplayed());
        await checkinListPage.tapJournalEntry();
        await checkinListPage.editJournalEntry("Updated journal entry for the check-in.");
        await verify (checkinListPage.isEditedJournalEntryDisplayed("Updated journal entry for the check-in."));
        await checkinListPage.saveJournalEntry();
        await checkinListPage.saveJournalEntry();
        await verify (checkinListPage.isEditedJournalEntryDisplayed("Updated journal entry for the check-in."));
    })
});