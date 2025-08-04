import { CreateCheckinPage } from "../../pages/android/CreateCheckinPage";
import { FriendsPage } from "../../pages/android/FriendsPage";
import { doLoginFlow } from "../helpers/android/loginFlow";
import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { verify } from "../helpers/android/test-verification";


describe("Create check-in then share checkin", () => {
    let createCheckinPage : CreateCheckinPage;
    let friendsPage : FriendsPage;

    beforeAll(async () => {
        createCheckinPage = new CreateCheckinPage();
        friendsPage = new FriendsPage();
        await doOnboardingSetup();
        await doLoginFlow();
    });

    it("Should complete the check-in and share", async () => {
        await verify(createCheckinPage.isTitleDisplayed(), createCheckinPage.isCheckinTextDisplayed(), createCheckinPage.isCheckinButtonDisplayed());
        await createCheckinPage.tapNewCheckinButton();

        await verify(createCheckinPage.isQuadrantScreenDisplayed(), createCheckinPage.allQuadrantsDisplayed());
        await createCheckinPage.tapBlueQuadrant();

        await verify(createCheckinPage.isBoredEmotionDisplayed());
        await createCheckinPage.tapBoredEmotion();

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

        await friendsPage.tapFriendsTab();
        await verify(friendsPage.isTitleCheckinCardDisplayed());
        await friendsPage.tapCheckinCard();

        await verify(friendsPage.isShareTitleModalDisplayed());

        await friendsPage.tapSelectAllButton();
        await friendsPage.tapShareButton();
        await verify(friendsPage.isTitleCheckinCardDisplayed());
    })
})