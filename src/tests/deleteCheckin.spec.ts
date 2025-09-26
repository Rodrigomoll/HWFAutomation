import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { verify } from "../helpers/testVerification";
import { whichPlatform } from "../helpers/whichPlatform";
import { doCheckinWithEmotionsFlow } from "../helpers/checkinWithEmotionsFlow";

describe("Delete Checkin Page", () => {
    let checkinPage: CheckinPage;
    let locator;
    
    beforeAll(async () => {
        locator = await whichPlatform();
        checkinPage = await new CheckinPage(locator);

        // Setup to skip all onboarding flow and start creating our check-ins
        await skipOnboardingFlow();
    })

    it("Should create a check-in (green)", async () => {
        await doCheckinWithEmotionsFlow('calm', "Feeling peaceful and relaxed today.");
    });

    it("Should display the Checkin and delete the check-in", async () => {
        if(locator.isAndroidPlatform) {
            await verify(checkinPage.isCheckinDisplayed("calmEmotionLabel"));
            await locator.tapButton("calmEmotionLabel");
        }
        else {
            await verify(checkinPage.isCheckinDisplayed("agoTiming"));
            await locator.tapButton("agoTiming");
        }

        await verify(checkinPage.isCheckinCardDisplayed("calmEmotionLabel"));
        await locator.tapButton("threeDots");
        await verify(locator.verifyIsElementDisplayed("delete"));
        await locator.tapButton("delete");
        await driver.pause(2000);
        if(locator.isAndroidPlatform) {
            await locator.tapButton("confirm");
        }
        else {
            await locator.swipeVertical("down", 1);
        }
        await verify(locator.verifyIsElementDisplayed("checkinPrompt", 5000));
    });
})