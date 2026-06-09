import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { completeBasicCheckin } from "../helpers/completeBasicCheckin";
import { assertAllTrue } from "../helpers/assertAllTrue";

describe("Create check-in", () => {
    let onboardingPage;

    beforeAll(async () => {
        onboardingPage = createPageObjectInstance("onboarding");
        
        // Setup to skip all onboarding flow and start creating our check-ins
        await onboardingPage.skipOnboardingFlow();
    });

    it("Should create a basic check-in", async () => {
        await assertAllTrue(completeBasicCheckin("pleased", "This is a test journal entry."));
    });
});