import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { assertAllTrue } from "../helpers/assertAllTrue";
import { completeBasicCheckin } from "../helpers/completeBasicCheckin";

describe("Delete Checkin Page", () => {
    let checkinPage, onboardingPage;
    
    beforeAll(async () => {
        checkinPage = createPageObjectInstance("checkin");
        onboardingPage = createPageObjectInstance("onboarding");

        // Setup to skip all onboarding flow and start creating our check-ins
        await onboardingPage.skipOnboardingFlow();
    })

    it("Should create a check-in (green)", async () => {
        await assertAllTrue(completeBasicCheckin('calm', "Feeling peaceful and relaxed today."));
    });

    it("Should display the Checkin and delete the check-in", async () => {
        await assertAllTrue(checkinPage.isCheckinDisplayed("calmEmotionLabel"));

        await checkinPage.deleteCheckin();
        
        await assertAllTrue(checkinPage.verifyIsElementDisplayed("checkinPrompt", 5000));
    });
})