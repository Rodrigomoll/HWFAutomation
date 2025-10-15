import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { assertAllTrue } from "../helpers/assertAllTrue";
import { completeBasicCheckin } from "../helpers/completeBasicCheckin";

describe("Edit Checkin Page", () => {
    let checkinPage, onboardingPage;
    
    const UPDATED_TEXT = "Updated journal entry for the check-in.";

    beforeAll(async () => {
        checkinPage = createPageObjectInstance("checkin");
        onboardingPage = createPageObjectInstance("onboarding");

        //setup to skip all onboarding flow and start creating our check-ins
        await onboardingPage.skipOnboardingFlow();
    });

    it("Should create uneasy check-in (red)", async () => {
        await assertAllTrue(completeBasicCheckin('uneasy', "Feeling stressed about work"));
    });

    it("Should display the Checkin and edit the journal entry of the check-in", async () => {
        await assertAllTrue(checkinPage.isCheckinDisplayed("uneasyEmotionLabel"));
        await checkinPage.tapButton("uneasyText");
        await driver.pause(2000);

        await checkinPage.updateJournalEntryText(UPDATED_TEXT);

        await assertAllTrue(checkinPage.verifyIsElementDisplayed({type: "text", value: UPDATED_TEXT}));
    })
});