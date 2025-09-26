import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { verify } from "../helpers/testVerification";
import { doCheckinWithEmotionsFlow } from "../helpers/checkinWithEmotionsFlow";
import { whichPlatform } from "../helpers/whichPlatform";


describe("Edit Checkin Page", () => {
    let checkinPage: CheckinPage;
    let locator;
    
    const UPDATED_TEXT = "Updated journal entry for the check-in.";

    beforeAll(async () => {
        locator = await whichPlatform();
        checkinPage = await new CheckinPage(locator);

        //setup to skip all onboarding flow and start creating our check-ins
        await skipOnboardingFlow();
    });

    it("Should create uneasy check-in (red)", async () => {
        await doCheckinWithEmotionsFlow('uneasy', "Feeling stressed about work");
    });

    it("Should display the Checkin and edit the journal entry of the check-in", async () => {
        if(locator.isAndroidPlatform){
            await verify(checkinPage.isCheckinDisplayed("uneasyEmotionLabel"));
            await locator.tapButton("uneasyEmotionLabel");
        }
        else {
            await verify(checkinPage.isCheckinDisplayed("agoTiming"));
            await locator.tapButton("agoTiming");
        }

        await verify(checkinPage.isCheckinCardDisplayed("uneasyEmotionLabel"));
        await locator.tapButton("uneasyText");
        await driver.pause(2000);

        await checkinPage.editJournalEntry(UPDATED_TEXT);
        if(locator.isAndroidPlatform) await verify(checkinPage.verifyIsNewElementDisplayed("text", UPDATED_TEXT));
        else await verify(checkinPage.verifyIsNewElementDisplayed("textView", UPDATED_TEXT));

        if(locator.isAndroidPlatform){
            await locator.tapButton("save", 200);
            await locator.tapButton("save", 200);
        }
        else {
            await locator.tapButton("finish", 200);
        }

        await verify(checkinPage.verifyIsNewElementDisplayed("text", UPDATED_TEXT));
    })
});