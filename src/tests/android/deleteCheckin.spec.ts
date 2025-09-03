import { CheckinCardPage } from "../../pages/android/CheckinCardPage";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";
import { doCheckinWithEmotionsFlow } from "../helpers/android/checkinWithEmotionsFlow";

describe("Delete Checkin Page", () => {
    let checkinCardPage: CheckinCardPage;
    beforeAll(async () => {
        checkinCardPage = new CheckinCardPage();
        // Setup to skip all onboarding flow and start creating our check-ins
        await doOnboardingSetup();
    })

    it("Should create a check-in (green)", async () => {
        await doCheckinWithEmotionsFlow('calm', "Feeling peaceful and relaxed today.");
    });

    it("Should display the Checkin and delete the check-in", async () => {
        await verify(checkinCardPage.isCheckinCalmDisplayed());
        await checkinCardPage.tapCalmCheckin();
        await verify(checkinCardPage.isCalmCheckinCardDisplayed());
        await checkinCardPage.tapThreeButton();
        await verify(checkinCardPage.displayDeleteButton());
        await checkinCardPage.tapDeleteButton();
        await checkinCardPage.confirmDelete();
        await verify(checkinCardPage.isBackToMainScreen());
    });
})