import { assertAllTrue } from "../helpers/assertAllTrue";
import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { verifyCheckInHomeScreen } from "../helpers/verifyCheckInHomeScreen";

describe("Create check-in with a past date", () => {
    let checkinPage, onboardingPage;

    beforeAll(async () => {
        checkinPage = createPageObjectInstance("checkin");
        onboardingPage = createPageObjectInstance("onboarding");

        //setup to skip all onboarding flow and start creating our check-ins
        await onboardingPage.skipOnboardingFlow();
    });

    it("Should create a check-in with a past date", async () => {
        await checkinPage.selectEmotionFromQuadrant("bored");

        await checkinPage.completeTagsAndJournalEntry("This is a test journal entry.", true);

        await checkinPage.selectPreviousCheckinDate();

        await assertAllTrue(verifyCheckInHomeScreen());
    });
})