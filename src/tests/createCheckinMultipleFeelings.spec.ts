import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { verifyCheckInHomeScreen } from "../helpers/verifyCheckInHomeScreen";
import { assertAllTrue } from "../helpers/assertAllTrue";

describe("Create check-in with multiple feelings", () => {
    let checkinPage, onboardingPage;

    beforeAll(async () => {
        checkinPage = createPageObjectInstance("checkin");
        onboardingPage = createPageObjectInstance("onboarding");

        // Setup to skip all onboarding flow and start creating our check-ins
        await onboardingPage.skipOnboardingFlow();
    })

    it("Should create a check-in with multiple feelings", async () => {
        await checkinPage.selectEmotionFromQuadrant("uneasy");

        await checkinPage.verifyAndSelectTags();

        await checkinPage.addEmotion();

        await checkinPage.tapButton("searchInput");
        await checkinPage.tapButton("yellowEmotions");
        await checkinPage.tapButton("absorbedEmotion");

        await checkinPage.addJournalEntry("This is a test journal entry.");

        await checkinPage.completeCheckIn();
        
        await assertAllTrue(verifyCheckInHomeScreen());
    })
})