import { CreateCheckinPage } from "../../pages/android/CreateCheckinPage";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";

describe("Create Checkin Page", () => {
    let createCheckinPage: CreateCheckinPage;

    beforeAll(async () => {
        createCheckinPage = new CreateCheckinPage();

        await doOnboardingSetup();//setup to skip all onboarding flow and start creating our check-ins
    });

    it("Should display the Create Checkin page", async () => {
        await verify (createCheckinPage.isTitleDisplayed(), createCheckinPage.isCheckinTextDisplayed(), createCheckinPage.isCheckinButtonDisplayed());
        await createCheckinPage.tapNewCheckinButton();

        await verify(createCheckinPage.isQuadrantScreenDisplayed(), createCheckinPage.allQuadrantsDisplayed());
        await createCheckinPage.tapYellowQuadrant();

        await verify(createCheckinPage.isPleasedEmotionDisplayed());
        await createCheckinPage.tapPleasedEmotion();

        await verify(createCheckinPage.tagScreenDisplayed(), createCheckinPage.isThemesTextDisplayed())
        await createCheckinPage.selectTags();
        await createCheckinPage.tapNextButton();

        await verify(createCheckinPage.isJournalScreenDisplayed());
        await createCheckinPage.enterTextJournal("This is a test journal entry.");
        await createCheckinPage.tapNextButton();

        await verify(createCheckinPage.dataEntriesScreenDisplayed());
        await createCheckinPage.tapSaveButton();
        
        if (await createCheckinPage.handleFirstTimeTooltip()) {
            await verify(createCheckinPage.isCheckinCompleted());
        }
        await verify(createCheckinPage.isCheckinCompleted());
    });
});