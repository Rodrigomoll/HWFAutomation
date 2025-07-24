import { CreateCheckinPage } from "../../pages/android/CreateCheckinPage";


let isFirstTooltipHandled = false;

export function registerCheckinCommands(){
    browser.addCommand("createCheckinWithEmotions", async (emotion: 'pleased' | 'uneasy' | 'calm' | 'bored', journalText: string) => {
        const createCheckinPage = new CreateCheckinPage();

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
        await createCheckinPage.dismissReflectModalIfPresent();
        await createCheckinPage.isCheckinCompleted();

        console.log(`[COMMAND] checkin created with journal text`)
    });
}