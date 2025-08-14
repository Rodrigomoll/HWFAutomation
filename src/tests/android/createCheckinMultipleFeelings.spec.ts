import { CreateCheckinPage } from "../../pages/android/CreateCheckinPage";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";

describe("Create check-in with multiple feelings", () => {
    let createCheckinPage : CreateCheckinPage;

    beforeAll(async () => {
        createCheckinPage = new CreateCheckinPage();
        // Setup to skip all onboarding flow and start creating our check-ins
        await doOnboardingSetup();
    })

    it("Should create a check-in with multiple feelings", async () => {
        await verify(createCheckinPage.isTitleDisplayed(), createCheckinPage.isCheckinTextDisplayed(), createCheckinPage.isCheckinButtonDisplayed());
        await createCheckinPage.tapNewCheckinButton();

        await verify(createCheckinPage.isQuadrantScreenDisplayed(),createCheckinPage.allQuadrantsDisplayed());
        await createCheckinPage.tapRedQuadrant();

        await verify(createCheckinPage.isUneasyEmotionDisplayed());
        await createCheckinPage.tapUneasyEmotion();

        await verify(createCheckinPage.tagScreenDisplayed(), createCheckinPage.isThemesTextDisplayed());
        await createCheckinPage.selectTags();
        await createCheckinPage.tapNextButton();

        await createCheckinPage.tapAddFeelingButton();
        await createCheckinPage.isSearchFeelingScreenDisplayed();

        await verify(createCheckinPage.displayColorsCategory());
        await createCheckinPage.tapYellowCategory();
        await createCheckinPage.tapAbsorbedEmotion();

        await verify(createCheckinPage.isJournalScreenDisplayed());
        await createCheckinPage.enterTextJournal("This is a test journal entry.");
        await createCheckinPage.tapNextButton();

        await verify(createCheckinPage.dataEntriesScreenDisplayed());
        await createCheckinPage.tapSaveButton();
        
        if (await createCheckinPage.handleFirstTimeTooltip()) {
            await verify(createCheckinPage.isCheckinCompleted());
        }
        await verify(createCheckinPage.isCheckinCompleted());
    })
})