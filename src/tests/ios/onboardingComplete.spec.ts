import { OnboardingCompletePage } from "../../pages/ios/OnboardingCompletePage";
import { OnboardingSkipPage } from "../../pages/ios/OnboardingSkipPage";

describe("Onboarding Complete Flow", () => {
  let onboardingSkipPage: OnboardingSkipPage;
  let onboardingCompletePage: OnboardingCompletePage;

  beforeAll(async () => {
    onboardingSkipPage = new OnboardingSkipPage();
    onboardingCompletePage = new OnboardingCompletePage();
  });

  describe("Complete onboarding flow", () => {
    it("Should display and interact with first onboarding screen", async () => {
      expect(await onboardingSkipPage.isFirstScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapGetStartedButton();
    });

    it("Should display and interact with second onboarding screen", async () => {
      expect(await onboardingSkipPage.isSecondScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapContinueSecondScreen();
    });

    it("Should display and interact with third onboarding screen", async () => {
      expect(await onboardingSkipPage.isThirdScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapContinueThirdScreen();
    });

    it("Should display and interact with fourth onboarding screen", async () => {
      expect(await onboardingSkipPage.isFourthScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapContinueFourthScreen();
    });

    it("Should display and interact with fifth onboarding screen", async () => {
      expect(await onboardingSkipPage.isFifthScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapContinueFifthScreen();
    });

    it("Should display and interact with sixth onboarding screen", async () => {
      expect(await onboardingSkipPage.isSixthScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapAcceptButton();
    });

    it("Should display and interact with seventh onboarding screen", async () => {
      expect(await onboardingSkipPage.isSeventhScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapContinueSeventhScreen();
    });

    it("Should display and interact with first setup screen", async () => {
      expect(await onboardingCompletePage.isFirstSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapOnFirstOption();
      await onboardingCompletePage.tapContinueFirstScreen();
    });
    it("Should display and interact with second setup screen", async () => {
      expect(await onboardingCompletePage.isSecondSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapContinueSecondScreen();
    });

    it("Should display and interact with third setup screen", async () => {
      expect(await onboardingCompletePage.isThirdSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapHighEnergyPleasantButton();
    });

    it("Should display and interact with fourth setup screen", async () => {
      expect(await onboardingCompletePage.isFourthSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapOnPleasedEmotion();
      await onboardingCompletePage.tapOnArrowRight();
    });

    it("Should display and interact with fifth setup screen", async () => {
      expect(await onboardingCompletePage.isFifthSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapOnJournalEntry();
    });

    it("Should display and interact with journal entry screen", async () => {
      expect(await onboardingCompletePage.journalEntryScreenDisplayed()).toBe(true);
      await onboardingCompletePage.enterTextJournal(
        "Exploring my pleased emotion with a test"
      );
      await onboardingCompletePage.tapFinishButton();
    });

    it("Should display and interact with tags screen", async () => {
      expect(await onboardingCompletePage.isFifthSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapOnTagsScreen();
      await onboardingCompletePage.tapOnCompleteCheckin();
    });

    it("Should complete the onboarding setup", async () => {
      expect(await onboardingCompletePage.isSixthSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapContinueSixthScreen();
    });

    it("Should display with seventh screen setup screen", async () => {
      expect(await onboardingCompletePage.isSeventhSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapOnTwicePerDay();
    });

    it("Should complete with eighth setup screen", async () => {
      expect(await onboardingCompletePage.isEighthSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapContinueEighthScreen();
    });

    it("Should display with ninth setup screen", async () => {
      expect(await onboardingCompletePage.isNinthSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapAddWidgetButton();
    });

    it("Should display with tenth setup screen", async () => {
      await onboardingCompletePage.tapCloseButton();
    });

    it("Should display moodmeter title after completing setup", async () => {
      expect(await onboardingCompletePage.isMessageDisplayed()).toBe(true);
      await onboardingCompletePage.tapScreenCheckin();
    });
  });
});
