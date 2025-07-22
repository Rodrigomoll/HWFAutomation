import { CreateCheckinPage } from "../../pages/android/CreateCheckinPage";

export function registerCheckinCommands(){
    browser.addCommand("createCheckinWithEmotion", async (emotion: 'pleased' | 'uneasy' | 'calm' | 'bored', journalText: string) => {
        const createCheckinPage = new CreateCheckinPage();

        console.log(`[COMMAND] creating checkin with journal text: ${journalText}`);

        await createCheckinPage.tapNewCheckinButton();

        switch(emotion) {
            case 'pleased':
                await createCheckinPage.tapYellowQuadrant(); // High Energy + Pleasant
                await createCheckinPage.tapPleasedEmotion();
                break;
            case 'uneasy':
                await createCheckinPage.tapRedQuadrant(); // High Energy + Pleasant
                // TODO: Necesitarías tapExcitedEmotion() si existe
                await createCheckinPage.tapUneasyEmotion(); // Por ahora usar pleased
                break;
            case 'calm':
                await createCheckinPage.tapGreenQuadrant(); // Low Energy + Pleasant
                // TODO: Necesitarías tapCalmEmotion() si existe
                await createCheckinPage.tapCalmEmotion(); // Por ahora usar pleased
                break;
            case 'bored':
                await createCheckinPage.tapBlueQuadrant(); // Low Energy + Unpleasant
                // TODO: Necesitarías tapSadEmotion() si existe
                await createCheckinPage.tapBoredEmotion(); // Por ahora usar pleased
                break;
        }
        await createCheckinPage.selectTags();
        await createCheckinPage.tapNextButton();
        await createCheckinPage.enterTextJournal(journalText);
        await createCheckinPage.tapNextButton();
        await createCheckinPage.tapSaveButton();

        console.log(`[COMMAND] checkin created with journal text`)
    });
}