import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { assertAllTrue } from "../helpers/assertAllTrue";

describe("Create check-in then share checkin", () => {
    let loginPage, checkinPage, friendsPage, onboardingPage;

    beforeAll(async () => {
        loginPage = createPageObjectInstance("login");
        checkinPage = createPageObjectInstance("checkin");
        friendsPage = createPageObjectInstance("friends");
        onboardingPage = createPageObjectInstance("onboarding");
        
        await onboardingPage.skipOnboardingFlow();
        await loginPage.signIn();
    },90000);

    it("Should complete the check-in and share", async () => {
        await checkinPage.selectEmotionFromQuadrant("bored");

        await checkinPage.completeTagsAndJournalEntry("This is a test journal entry.", true);

        await checkinPage.completeCheckIn();

        await assertAllTrue(friendsPage.shareEmotion());
    })
})