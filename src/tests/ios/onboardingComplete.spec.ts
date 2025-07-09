import { OnboardingSkipPage } from "../../pages/ios/OnboardingSkipPage";
import { OnboardingSetupPage } from "../../pages/ios/OnboardingSetupPage";

describe("Onboarding Complete Flow", () => {
  let onboardingSkipPage: OnboardingSkipPage;
  let setupPage: OnboardingSetupPage;

  beforeAll(async () => {
    onboardingSkipPage = new OnboardingSkipPage();
    setupPage = new OnboardingSetupPage();
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
      console.log("paso la prueba");
    });

    it("Should display and interact with seventh onboarding screen", async () => {
      expect(await onboardingSkipPage.isSeventhScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapContinueSeventhScreen();
    });

    it("Should display and interact with first setup screen", async () => {
      expect(await setupPage.isFirstSetupScreenDisplayed()).toBe(true);
      await setupPage.tapOnFirstOption();
      await setupPage.tapContinueFirstScreen();
    });
    it("Should display and interact with second setup screen", async () => {
      expect(await setupPage.isSecondSetupScreenDisplayed()).toBe(true);
      await setupPage.tapContinueSecondScreen();
    });

    it("Should display and interact with third setup screen", async () => {
      expect(await setupPage.isThirdSetupScreenDisplayed()).toBe(true);
      await setupPage.tapHighEnergyPleasantButton();
    });

    it("Should display and interact with fourth setup screen", async () => {
      expect(await setupPage.isFourthSetupScreenDisplayed()).toBe(true);
      await setupPage.tapOnPleasedEmotion();
      await setupPage.tapOnArrowRight();
    });

    it("Should display and interact with fifth setup screen", async () => {
      expect(await setupPage.isFifthSetupScreenDisplayed()).toBe(true);
      await setupPage.tapOnJournalEntry();
    });

    it("Should display and interact with journal entry screen", async () => {
      expect(await setupPage.journalEntryScreenDisplayed()).toBe(true);
      await setupPage.enterTextJournal(
        "Exploring my pleased emotion with a test"
      );
      await setupPage.tapFinishButton();
    });

    it("Should display and interact with tags screen", async () => {
      expect(await setupPage.isFifthSetupScreenDisplayed()).toBe(true);
      await setupPage.tapOnTagsScreen();
      await setupPage.tapOnCompleteCheckin();
    });

    it("Should complete the onboarding setup", async () => {
      expect(await setupPage.isSixthSetupScreenDisplayed()).toBe(true);
      await setupPage.tapContinueSixthScreen();
    });

    it("Should display with seventh screen setup screen", async () => {
      expect(await setupPage.isSeventhSetupScreenDisplayed()).toBe(true);
      await setupPage.tapOnTwicePerDay();
    });

    it("Should complete with eighth setup screen", async () => {
      expect(await setupPage.isEighthSetupScreenDisplayed()).toBe(true);
      await setupPage.tapContinueEighthScreen();
    });

    it("Should display with ninth setup screen", async () => {
      expect(await setupPage.isNinthSetupScreenDisplayed()).toBe(true);
      await setupPage.tapAddWidgetButton();
    });

    it("Should display with tenth setup screen", async () => {
      await setupPage.tapCloseButton();
    });

    it("Should display mood meter title after completing setup", async () => {
      expect(await setupPage.isMessageDisplayed()).toBe(true);
      await setupPage.tapScreenCheckin();
    });
  });
});