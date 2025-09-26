import { CheckinPage } from "../pages/flows/CheckinPage";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { HealthDataEntriesPages } from "../pages/flows/HealthDataEntriesPage";
import { verify } from "../helpers/testVerification";
import { whichPlatform } from "../helpers/whichPlatform";

describe("Create Checkin Health Data Page", () => {
    let checkinPage : CheckinPage;
    let healthDataPage : HealthDataEntriesPages;
    let locator;

    beforeAll(async () => {
        locator = await whichPlatform();
        checkinPage = await new CheckinPage(locator);
        healthDataPage = await new HealthDataEntriesPages();

        await skipOnboardingFlow();
    });

    it("Should create a check-in with health data", async () => {
        await checkinPage.QuadrantsStep();

        await checkinPage.tapEmotion("redQuadrant", "uneasyEmotion");

        await checkinPage.tagsAndJournalStep("This is a test journal entry with health data entries.", true);

        if(locator.isAndroidPlatform) {
            await verify(locator.verifyIsElementDisplayed("dataPrompt"));
            await locator.tapButton("paperClipIcon");

            await healthDataPage.healthDataEntriesFlowAndroid(locator);
            await locator.tapButton("save");
        }
        else {
            await locator.tapButton("filter");
            await locator.tapButton("healthData");

            await healthDataPage.healthDataEntriesFlowIOS(locator);
            await locator.tapButton("complete");
        }

        await checkinPage.completeCheckin();
    })
})