import { CheckinPage } from "../pages/flows/CheckinPage";
import { whichPlatform } from "../helpers/whichPlatform";

let isFirstTooltipHandled = false;
let checkinCount = 0;

export async function doCheckinWithEmotionsFlow(emotion: 'pleased' | 'uneasy' | 'calm' | 'bored', journalText: string) {
    const locator = await whichPlatform();
    const checkinPage = await new CheckinPage(locator);
    checkinCount++;

    try{
        await driver.pause(2000);
        //await locator.tapButton("newCheckin");
        await checkinPage.QuadrantsStep();

        switch(emotion) {
            case 'pleased':
                // High Energy + Pleasant
                await checkinPage.tapEmotion("yellowQuadrant", "pleasedEmotion");
                break;
            case 'uneasy':
                // High Energy + Pleasant
                await checkinPage.tapEmotion("redQuadrant", "uneasyEmotion");
                break;
            case 'calm':
                // Low Energy + Pleasant
                await checkinPage.tapEmotion("greenQuadrant", "calmEmotion");
                break;
            case 'bored':
                // Low Energy + Unpleasant
                await checkinPage.tapEmotion("blueQuadrant", "boredEmotion");
                break;
        }

        await driver.pause(1000);

        await checkinPage.tagsAndJournalStep(journalText, true);
        await checkinPage.dataAndSaveStep();

        if (!isFirstTooltipHandled) {
            const tooltipWasPresent = await checkinPage.handleChangeTooltip();
            if (tooltipWasPresent) {
                isFirstTooltipHandled = true;
            } 
        }

        if(locator.isAndroidPlatform && await locator.verifyIsElementDisplayed("reflectPrompt")){
            await checkinPage.dismissReflectModalIfPresent();
        }

        if(!locator.isAndroidPlatform && locator.verifyIsElementDisplayed("closeButton")){
            await locator.tapButton("closeButton");
        }

        await checkinPage.isCheckinCompleted();
    }
    catch (error) {
        console.error("Error during checkin with emotions flow:", error);
    }
}