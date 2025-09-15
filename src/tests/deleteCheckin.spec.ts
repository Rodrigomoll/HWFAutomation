import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { verify } from "../helpers/testVerification";
import { doCheckinWithEmotionsFlow } from "../helpers/checkinWithEmotionsFlow";

describe("Delete Checkin Page", () => {
    let checkinPage: CheckinPage;
    
    beforeAll(async () => {
        checkinPage = await new CheckinPage().init();
        // Setup to skip all onboarding flow and start creating our check-ins
        await skipOnboardingFlow();
    })

    it("Should create a check-in (green)", async () => {
        await doCheckinWithEmotionsFlow('calm', "Feeling peaceful and relaxed today.");
    });

    it("Should display the Checkin and delete the check-in", async () => {
        await verify(checkinPage.isCheckinDisplayed("calmEmotion2"));
        await checkinPage.tapElementButton("calmEmotion2");
        await verify(checkinPage.isCheckinCardDisplayed("calmEmotion2"));
        await checkinPage.tapElementButton("threeDotsButton");
        await verify(checkinPage.verifyIsElementDisplayed("deleteButton"));
        await checkinPage.tapElementButton("deleteButton");
        await driver.pause(2000);
        await checkinPage.tapElementButton("confirmButton");
        await verify(checkinPage.verifyIsElementDisplayed("checkinPrompt", 5000));
    });
})