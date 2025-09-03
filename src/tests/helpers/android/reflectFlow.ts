import { CreateCheckinPage } from "../../../pages/android/CreateCheckinPage";
import { enableAISettings } from "../../helpers/android/enableAISettings";
import { doLoginFlow } from "../../helpers/android/loginFlow"
import { doOnboardingSetup } from "../../helpers/android/onboardingSkipSetup";
import { verify } from "../../helpers/android/test-verification";

export async function doReflectFlow() {
    const createCheckin = new CreateCheckinPage();

    try{
        // Setup to skip all onboarding flow and start creating our check-ins
        await doOnboardingSetup();
        await doLoginFlow();
        await enableAISettings();

        await verify(createCheckin.isTitleDisplayed(), createCheckin.isCheckinTextDisplayed(), createCheckin.isCheckinButtonDisplayed());
        await createCheckin.tapNewCheckinButton();

        await verify(createCheckin.isQuadrantScreenDisplayed(), createCheckin.allQuadrantsDisplayed());
        await createCheckin.tapRedQuadrant();

        await verify(createCheckin.isUneasyEmotionDisplayed());
        await createCheckin.tapUneasyEmotion();

        await verify(createCheckin.tagScreenDisplayed(), createCheckin.areThemesTextDisplayed());
        await createCheckin.selectTags();
        await createCheckin.tapNextButton();

        await verify(createCheckin.isJournalScreenDisplayed());
        await createCheckin.enterTextJournal("This is a test journal entry with reflection feature.");
        await createCheckin.tapReflectButton();

        const isLimitReached = await createCheckin.isUsageLimitReached();

        if(isLimitReached) {
            await createCheckin.tapFinishButton();

            await createCheckin.tapNextButton();
            await verify(createCheckin.dataEntriesScreenDisplayed());

            await browser.pause(2000);

            await createCheckin.tapSaveButton();

            await browser.pause(2000);

            if (await createCheckin.handleFirstTimeTooltip()) {
                await verify(createCheckin.isCheckinCompleted());
            }
            await verify(createCheckin.isCheckinCompleted());
            console.log(" Check-in completed without reflection due to usage limit");
        }
        else{

            const reflectionText = [
                "This is a test 1",
                "This is a test 2",
                "This is a test 3",
                "This is a test 4",
                "This is a test 5"
            ];

            for(let i = 0; i < reflectionText.length; i++){
                if(isLimitReached){
                    await createCheckin.tapFinishButton();

                    await createCheckin.tapNextButton();
                    await verify(createCheckin.dataEntriesScreenDisplayed());

                    await browser.pause(2000); // wait for the AI processing to complete

                    await createCheckin.tapSaveButton();

                    await browser.pause(2000); // wait for the save action to complete
                    if (await createCheckin.handleFirstTimeTooltip()) {
                        await verify(createCheckin.isCheckinCompleted());
                    }
                }
                else{
                    await verify(createCheckin.displayWriteReflectInput());
                    await createCheckin.enterReflectText(reflectionText[i]);
    
                    if( i < reflectionText.length - 1){
                        await createCheckin.tapGoDeeperButton();
                    }
                    else{
                        await createCheckin.tapFinishButton();
                    }
                }
            }
        }
        return createCheckin;
    }
    catch (error) {
        console.error("Error during reflect flow:", error);
    }
}