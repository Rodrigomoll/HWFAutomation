import { CheckinPage } from "../pages/flows/CheckinPage";
import { verify } from "./testVerification";

export async function doReflectFlow(takeaways: boolean, toolTip: boolean) {
    const checkinPage = await new CheckinPage().init();

    try{
        // Setup to skip all onboarding flow and start creating our check-ins
        await checkinPage.QuadrantsStep();
        await checkinPage.tapUneasyEmotion();
        await driver.pause(1000);

        await checkinPage.tagsAndJournalReflectStep("This is a test journal entry with reflection feature.");

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
                await checkinPage.completeReflectStep2(toolTip);
                await driver.pause(1000);
                break;
            }
            else{
                await verify(checkinPage.verifyIsElementDisplayed("writeText"));
                await checkinPage.inputText("reflectInput", reflectionText[i]);

                if( i < reflectionText.length - 1){
                    await checkinPage.tapElementButton("goDeeperButton");
                    isLimitReached = await checkinPage.isUsageLimitReached();
                    await driver.pause(1000);
                }
                else{
                    await checkinPage.tapElementButton("finishButton");
                    if(takeaways) {
                        await verify(checkinPage.areTakeawaysDisplayed());
                        await checkinPage.tapAllButtons();
                    }
                    await checkinPage.completeReflectStep(toolTip);
                    await driver.pause(1000);
                }
            }
        }
    }
    catch (error) {
        console.error("Error during reflect flow:", error);
    }
}