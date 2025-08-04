import { CreateCheckinPage } from "../../pages/android/CreateCheckinPage";
import { HealthDataEntriesPages } from "../../pages/android/HealthDataEntriesPage";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";

describe("Create Checkin Health Data Page", () => {
    let createCheckinPage : CreateCheckinPage;
    let healthDataPage : HealthDataEntriesPages;

    beforeAll(async () => {
        createCheckinPage = new CreateCheckinPage();
        healthDataPage = new HealthDataEntriesPages();
        await doOnboardingSetup();
    });

    it("Should create a check-in with health data", async () => {
        await verify(createCheckinPage.isTitleDisplayed(), createCheckinPage.isCheckinTextDisplayed(), createCheckinPage.isCheckinButtonDisplayed());
        await createCheckinPage.tapNewCheckinButton();

        await verify(createCheckinPage.isQuadrantScreenDisplayed(), createCheckinPage.allQuadrantsDisplayed());
        await createCheckinPage.tapRedQuadrant();

        await verify(createCheckinPage.isUneasyEmotionDisplayed());
        await createCheckinPage.tapUneasyEmotion();

        await verify(createCheckinPage.tagScreenDisplayed(), createCheckinPage.isThemesTextDisplayed());
        await createCheckinPage.selectTags();
        await createCheckinPage.tapNextButton();

        await verify(createCheckinPage.isJournalScreenDisplayed());
        await createCheckinPage.enterTextJournal("This is a test journal entry with health data entries.");
        await createCheckinPage.tapNextButton();

        await verify(createCheckinPage.dataEntriesScreenDisplayed());
        await createCheckinPage.tapPaperClipIcon();

        await verify(healthDataPage.areHealthDataEntriesScreen())
        await healthDataPage.enableHealthDataEntries();
        await healthDataPage.tapCloseButton();

        await verify(healthDataPage.isHealthDataScreenDisplayed())
        await createCheckinPage.tapSaveButton();

        if (await createCheckinPage.handleFirstTimeTooltip()) {
            await verify(createCheckinPage.isCheckinCompleted());
        }
        await verify(createCheckinPage.isCheckinCompleted());
    })
})