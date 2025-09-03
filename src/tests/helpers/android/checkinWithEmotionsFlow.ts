import { CreateCheckinPage } from "../../../pages/android/CreateCheckinPage";

let isFirstTooltipHandled = false;
let checkinCount = 0;

export async function doCheckinWithEmotionsFlow(emotion: 'pleased' | 'uneasy' | 'calm' | 'bored', journalText: string) {
    const createCheckinPage = new CreateCheckinPage();
    checkinCount++;

    try{
        console.log(`[COMMAND] creating checkin with journal text: ${journalText}`);

        await createCheckinPage.tapNewCheckinButton();

        switch(emotion) {
            case 'pleased':
                // High Energy + Pleasant
                await createCheckinPage.tapYellowQuadrant();
                await createCheckinPage.tapPleasedEmotion();
                break;
            case 'uneasy':
                // High Energy + Pleasant
                await createCheckinPage.tapRedQuadrant(); 
                await createCheckinPage.tapUneasyEmotion(); 
                break;
            case 'calm':
                // Low Energy + Pleasant
                await createCheckinPage.tapGreenQuadrant(); 
                await createCheckinPage.tapCalmEmotion(); 
                break;
            case 'bored':
                // Low Energy + Unpleasant
                await createCheckinPage.tapBlueQuadrant(); 
                await createCheckinPage.tapBoredEmotion(); 
                break;
        }
        await createCheckinPage.selectTags();
        await createCheckinPage.tapNextButton();
        await createCheckinPage.enterTextJournal(journalText);
        await createCheckinPage.tapNextButton();
        await createCheckinPage.tapSaveButton();

        if (!isFirstTooltipHandled) {
            const tooltipWasPresent = await createCheckinPage.handleFirstTimeTooltip();
            if (tooltipWasPresent) {
                isFirstTooltipHandled = true;
            } 
        }

        if(checkinCount >= 3){
            await createCheckinPage.dismissReflectModalIfPresent();
        }
        await createCheckinPage.isCheckinCompleted();

        console.log(`[COMMAND] checkin created with journal text`)
    }
    catch (error) {
        console.error("Error during checkin with emotions flow:", error);
    }
}