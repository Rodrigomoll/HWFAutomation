import { assertAllTrue } from "../helpers/assertAllTrue";
import { verifyCheckInHomeScreen } from "../helpers/verifyCheckInHomeScreen";
import { createPageObjectInstance } from "../helpers/createPageObjectInstance";

describe("Create check-in with health data", () => {
    let checkinPage, healthDataPage, onboardingPage;

    beforeAll(async () => {
        checkinPage = createPageObjectInstance("checkin");
        healthDataPage = createPageObjectInstance("health");
        onboardingPage = createPageObjectInstance("onboarding");

        // Setup to skip all onboarding flow and start creating our check-ins
        await onboardingPage.skipOnboardingFlow();
    });

    it("Should create a check-in with health data", async () => {
        await checkinPage.selectEmotionFromQuadrant("uneasy");

        await checkinPage.completeTagsAndJournalEntry("This is a test journal entry with health data entries.", true);

        await healthDataPage.completeHealthData();

        await assertAllTrue(verifyCheckInHomeScreen());
    })
})