import { CheckinPage } from "../pages/flows/CheckinPage";

let isFirstTooltipHandled = false;
let checkinCount = 0;

export async function doCheckinWithEmotionsFlow(emotion: 'pleased' | 'uneasy' | 'calm' | 'bored', journalText: string) {
    const checkinPage = await new CheckinPage().init();
    checkinCount++;

    try{
        await checkinPage.tapElementButton("newCheckin");
        await checkinPage.areAllQuadrantsDisplayed();

        switch(emotion) {
            case 'pleased':
                // High Energy + Pleasant
                await checkinPage.tapPleasedEmotion(true);
                break;
            case 'uneasy':
                // High Energy + Pleasant
                await checkinPage.tapUneasyEmotion(); 
                break;
            case 'calm':
                // Low Energy + Pleasant
                await checkinPage.tapCalmEmotion(); 
                break;
            case 'bored':
                // Low Energy + Unpleasant
                await checkinPage.tapBoredEmotion(); 
                break;
        }
        await checkinPage.tagsAndJournalStep(journalText);
        await checkinPage.tapElementButton("saveButton");

        if (!isFirstTooltipHandled) {
            const tooltipWasPresent = await checkinPage.handleChangeTooltip();
            if (tooltipWasPresent) {
                isFirstTooltipHandled = true;
            } 
        }

        if(await checkinPage.verifyIsElementDisplayed("reflectPrompt")){
            await checkinPage.dismissReflectModalIfPresent();
        }

        await checkinPage.isCheckinCompleted();
    }
    catch (error) {
        console.error("Error during checkin with emotions flow:", error);
    }
}