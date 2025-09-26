import { CheckinPage } from "../pages/flows/CheckinPage";
import { whichPlatform } from "../helpers/whichPlatform";

export async function doReflectFlow(takeaways: boolean, toolTip: boolean) {
    const locator = await whichPlatform();
    const checkinPage = await new CheckinPage(locator);

    try{
        // Setup to skip all onboarding flow and start creating our check-ins
        await checkinPage.QuadrantsStep();
        await checkinPage.tapEmotion("redQuadrant", "uneasyEmotion");
        await driver.pause(1000);

        await checkinPage.tagsAndJournalStep("This is a test journal entry with reflection feature.", false);

        let isLimitReached = await checkinPage.isUsageLimitReached();

        const reflectionText = [
            "This is a test 1",
            "This is a test 2",
            "This is a test 3",
            "This is a test 4",
            "This is a test 5"
        ];

        for(let i = 0; i < reflectionText.length; i++){
            if(isLimitReached){
                await checkinPage.completeReflectStep(false, toolTip);
                await driver.pause(1000);
                break;
            }
            else{
                await driver.pause(2000); //textInput
                await locator.enterTextJournal(locator.isAndroidPlatform ? "editText" : "prueba", reflectionText[i]);

                if( i < reflectionText.length - 1){
                    await locator.tapButton("goDeeper");
                    isLimitReached = await checkinPage.isUsageLimitReached();
                    await driver.pause(1000);
                }
                else{
                    await locator.tapButton(locator.isAndroidPlatform ? "finish" : "goFinish");
                    if(takeaways) {
                        await checkinPage.areTakeawaysDisplayed();
                        await checkinPage.tapAllButtons();
                    }
                    await checkinPage.completeReflectStep(true, toolTip);
                    await driver.pause(1000);
                }
            }
        }
    }
    catch (error) {
        console.error("Error during reflect flow:", error);
    }
}