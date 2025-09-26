import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { verify } from "../helpers/testVerification";
import { whichPlatform } from "../helpers/whichPlatform";
import { doCheckinWithEmotionsFlow } from "../helpers/checkinWithEmotionsFlow";

describe("Create Checkin Past Date Page", () => {
    let checkinPage: CheckinPage;
    let locator;

    beforeAll(async () => {
        locator = await whichPlatform();
        checkinPage = await new CheckinPage(locator);

        //setup to skip all onboarding flow and start creating our check-ins
        await skipOnboardingFlow();
    });

    it("Should display the Create Checkin page", async () => {
        await checkinPage.QuadrantsStep();
        await checkinPage.tapEmotion("blueQuadrant", "boredEmotion");

        await checkinPage.tagsAndJournalStep("This is a test journal entry.", true);

        if(locator.isAndroidPlatform){
            await verify(locator.verifyIsElementDisplayed("dataPrompt"));
        }

        await checkinPage.tapDateTimeDisplay();
        await checkinPage.selectPreviousDateInCarousel();

        if(locator.isAndroidPlatform){
            await locator.tapButton("save");
            await locator.tapButton("save");
        }
        else {
            await locator.tapButton("updateTime");
            await locator.tapButton("complete");
            await driver.pause(2000);
        }

        await verify(checkinPage.isPreviousDateDisplayed());

        await checkinPage.completeCheckin();
    });
})