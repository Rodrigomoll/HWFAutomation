import { CreateCheckinPage } from "../../pages/android/CreateCheckinPage"
import { enableAISettings } from "../helpers/android/enableAISettings";
import { doLoginFlow } from "../helpers/android/loginFlow";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";

describe("Create check-in with reflection and takeaways feature", () => {
    let createCheckin : CreateCheckinPage;
    beforeAll(async () => {
        createCheckin = new CreateCheckinPage();

        await doOnboardingSetup();
        await doLoginFlow();
        await enableAISettings();
    });
    it("Should create a check-in with reflection and takeaways feature", async () => {
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
            console.log("Check-in completed without reflection due to usage limit");
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
            await verify(createCheckin.areTakeawaysDisplayed());
            await createCheckin.tapAllButtons();
            await createCheckin.tapDoneButton();
            await createCheckin.tapNextButton();
            await verify(createCheckin.dataEntriesScreenDisplayed());
            await browser.pause(2000); // wait for the AI processing to complete
            await createCheckin.tapSaveButton();
            await browser.pause(2000); // wait for the save action to complete
            if (await createCheckin.handleFirstTimeTooltip()) {
                await verify(createCheckin.isCheckinCompleted());
            }
            await verify(createCheckin.isCheckinCompleted());
        }
    });

});
