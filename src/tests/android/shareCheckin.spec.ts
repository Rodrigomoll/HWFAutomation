import { CreateCheckinPage } from "../../pages/android/CreateCheckinPage";
import { FriendsPage } from "../../pages/android/FriendsPage";
import { doLoginFlow } from "../helpers/android/loginFlow";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";


console.log("DEBUG - Environment variables:");
console.log("COMMAND_TIMEOUT:", process.env.COMMAND_TIMEOUT);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("Parsed timeout:", parseInt(process.env.COMMAND_TIMEOUT || '60000'));

describe("Create check-in then share checkin", () => {
    let createCheckinPage : CreateCheckinPage;
    let friendsPage : FriendsPage;

    beforeAll(async () => {
        createCheckinPage = new CreateCheckinPage();
        friendsPage = new FriendsPage();
        
        await doOnboardingSetup();
        await doLoginFlow();
    },90000);

    it("Should complete the check-in and share", async () => {
        await verify(createCheckinPage.isTitleDisplayed(), createCheckinPage.isCheckinTextDisplayed(), createCheckinPage.isCheckinButtonDisplayed());
        await createCheckinPage.tapNewCheckinButton();

        await verify(createCheckinPage.isQuadrantScreenDisplayed(), createCheckinPage.allQuadrantsDisplayed());
        await createCheckinPage.tapBlueQuadrant();

        await verify(createCheckinPage.isBoredEmotionDisplayed());
        await createCheckinPage.tapBoredEmotion();

        await verify(createCheckinPage.tagScreenDisplayed(), createCheckinPage.areThemesTextDisplayed());
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

        await friendsPage.completeShareFlow();
        await verify(friendsPage.isTitleCheckinCardDisplayed());
    })
})