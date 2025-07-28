import { CreateCheckinPage } from "../../pages/android/CreateCheckinPage";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";

describe("Create Checkin Past Date Page", () => {
    let checkinPastDate: CreateCheckinPage;

    beforeAll(async () => {
        checkinPastDate = new CreateCheckinPage();
        //setup to skip all onboarding flow and start creating our check-ins
        await doOnboardingSetup();
    });

    it("Should display the Create Checkin page", async () => {
        await verify(checkinPastDate.isTitleDisplayed(), checkinPastDate.isCheckinTextDisplayed(), checkinPastDate.isCheckinButtonDisplayed());
        await checkinPastDate.tapNewCheckinButton();

        await verify(checkinPastDate.isQuadrantScreenDisplayed(), checkinPastDate.allQuadrantsDisplayed());
        await checkinPastDate.tapBlueQuadrant();

        await verify(checkinPastDate.isBoredEmotionDisplayed());
        await checkinPastDate.tapBoredEmotion();

        await verify(checkinPastDate.tagScreenDisplayed(), checkinPastDate.isThemesTextDisplayed())
        await checkinPastDate.selectTags();
        await checkinPastDate.tapNextButton();

        await verify(checkinPastDate.isJournalScreenDisplayed());
        await checkinPastDate.enterTextJournal("This is a test journal entry.");
        await checkinPastDate.tapNextButton();

        await verify(checkinPastDate.dataEntriesScreenDisplayed());
        await checkinPastDate.tapDateTimeDisplay();
        await checkinPastDate.selectPreviousDateInCarousel();
        await checkinPastDate.tapSaveButton();
        await checkinPastDate.tapSaveButton();

        await verify(checkinPastDate.isPreviousDateDisplayed());

        if (await checkinPastDate.handleFirstTimeTooltip()) {
            await verify(checkinPastDate.isCheckinCompleted());
        }
        await verify(checkinPastDate.isCheckinCompleted());
    });
})