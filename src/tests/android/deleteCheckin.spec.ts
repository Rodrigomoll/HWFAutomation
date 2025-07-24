import { CheckinListPage } from "../../pages/android/CheckinListPage";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";

describe("Delete Checkin Page", () => {
    let checkinListPage: CheckinListPage;
    beforeAll(async () => {
        checkinListPage = new CheckinListPage();
        // Setup to skip all onboarding flow and start creating our check-ins
        await doOnboardingSetup();
    })

    it("Should create a check-in (green)", async () => {
        await browser.createCheckinWithEmotions('calm', "Feeling peaceful and relaxed today.");
    });

    it("Should display the Checkin and delete the check-in", async () => {
        await verify(checkinListPage.isCheckinCalmDisplayed());
        await new Promise(resolve => setTimeout(resolve, 1000));
        await checkinListPage.tapCalmCheckin();
        await verify(checkinListPage.isCalmCheckinCardDisplayed());
        await checkinListPage.tapThreeButton();
        await verify(checkinListPage.displayDeleteButton());
        await checkinListPage.tapDeleteButton();
        await checkinListPage.confirmDelete();
        await verify(checkinListPage.isBackToMainScreen());
    });
})