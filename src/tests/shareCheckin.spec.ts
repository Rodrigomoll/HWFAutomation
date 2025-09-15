import { CheckinPage } from "../pages/flows/CheckinPage";
import { FriendsPage } from "../pages/flows/FriendsPage";
import { doLoginFlow } from "../helpers/loginFlow";
import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";
import { verify } from "../helpers/testVerification";

describe("Create check-in then share checkin", () => {
    let checkinPage : CheckinPage;
    let friendsPage : FriendsPage;

    beforeAll(async () => {
        checkinPage = await new CheckinPage().init();
        friendsPage = await new FriendsPage().init();
        
        await skipOnboardingFlow();
        await doLoginFlow();
    },90000);

    it("Should complete the check-in and share", async () => {
        await checkinPage.QuadrantsStep();

        await checkinPage.tapBoredEmotion();

        await checkinPage.tagsAndJournalStep("This is a test journal entry.");

        await checkinPage.dataAndSaveStep();
        
        await checkinPage.completeCheckin();

        await friendsPage.completeShareFlow();
        await verify(friendsPage.verifyIsElementDisplayed("feelingPrompt"));
    })
})