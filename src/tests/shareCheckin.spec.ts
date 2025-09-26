import { CheckinPage } from "../pages/flows/CheckinPage";
import { doLoginFlow } from "../helpers/loginFlow";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { verify } from "../helpers/testVerification";
import { whichPlatform } from "../helpers/whichPlatform";

describe("Create check-in then share checkin", () => {
    let checkinPage : CheckinPage;
    let locator;

    beforeAll(async () => {
        locator = await whichPlatform();
        checkinPage = await new CheckinPage(locator);
        
        await skipOnboardingFlow();
        await doLoginFlow(locator);
    },90000);

    it("Should complete the check-in and share", async () => {
        await checkinPage.QuadrantsStep();

        await checkinPage.tapEmotion("blueQuadrant", "boredEmotion");

        await checkinPage.tagsAndJournalStep("This is a test journal entry.", true);

        await checkinPage.dataAndSaveStep();

        if(locator.isAndroidPlatform) {
            await checkinPage.completeCheckin();

            await locator.tapButton("friends");
            await locator.tapButton("imFeelingText");
        }

        await locator.verifyIsElementDisplayed("shareModalPrompt");
        await driver.pause(2000); // wait for the modal to stabilyze
        await locator.tapButton("justFeeling");
        await locator.tapButton("selectAllButton");
        await locator.tapButton("share");

        if(locator.isAndroidPlatform) { 
            await verify(locator.verifyIsElementDisplayed("imFeelingText"));
        }
        else {
            await checkinPage.completeCheckin();
        }
    })
})