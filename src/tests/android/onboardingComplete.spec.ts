import { OnboardingCompletePage } from "../../pages/android/OnboardingCompletePage";
import { OnboardingSkipPage } from "../../pages/android/OnboardingSkipPage";

describe("Onboarding Complete Flow", () => {
  let onboardingCompletePage: OnboardingCompletePage;
  let onboardingSkipPage: OnboardingSkipPage;

  beforeAll(async () => {
    onboardingCompletePage = new OnboardingCompletePage();
    onboardingSkipPage = new OnboardingSkipPage();
  });

  describe("Complete onboarding flow", () => {
    it("Should display and interact with first onboarding screen", async () => {
      expect(await onboardingSkipPage.isFirstScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapGetStarted();
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
      expect(await onboardingSkipPage.isFourthScreenDisplayed());
      await onboardingSkipPage.tapContinueFourthScreen();
    });

    it("Should display and interact with fifth onboarding screen", async () => {
      expect(await onboardingSkipPage.isFifthScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapContinueFifthScreen();
    });

    it("Should display and interact with sixth onboarding screen", async () => {
      expect(await onboardingSkipPage.isSixthScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapIAccept();
    });

    it("Should display and interact with seventh onboarding screen", async () => {
      expect(await onboardingSkipPage.isSeventhScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapContinueSeventhScreen();
    });

    it("Should display and interact with first setup screen", async () => {
      expect(await onboardingCompletePage.isFirstSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapFirstOption();
      await onboardingCompletePage.tapContinueFirstScreen();
    });

    it("Should display and interact with second setup screen", async () => {
      expect(await onboardingCompletePage.isSecondSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapContinueSecondScreen();
    });

    it("Should display and interact with third setup screen", async () => {
      expect(await onboardingCompletePage.checkThirdBar()).toBe(true);
      expect(await onboardingCompletePage.isThirdSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.tapHighEnergyPleasantButton();
    });
    it("Should display and interact with moodmeter", async () => {
        await onboardingCompletePage.tapOnPleasedEmotion();
    });
    it("Should display and interact with fourth setup screen", async () => {
      expect(await onboardingCompletePage.checkFourthBar()).toBe(true);
      expect(await onboardingCompletePage.isFourthSetupScreenDisplayed()).toBe(true);
      await onboardingCompletePage.enterTextJournal("This is a test journal entry.");
      await onboardingCompletePage.tapNextButton();
    });
    it("Should display and interact with fifth setup screen", async () => {
        expect(await onboardingCompletePage.checkFifthBar()).toBe(true);
        expect(await onboardingCompletePage.isFifthSetupScreenDisplayed()).toBe(true);
        await onboardingCompletePage.tapContinueFifthScreen();
    });
    it("Should display and interact with sixth setup screen", async () => {
        expect (await onboardingCompletePage.checkSixthBar()).toBe(true);
        expect (await onboardingCompletePage.isSixthSetupScreenDisplayed()).toBe(true);
        await onboardingCompletePage.tapContinueSixthScreen();
    });
    it("Should display and interact with seventh setup screen", async () => {
        expect (await onboardingCompletePage.checkSeventhBar()).toBe(true);
        expect (await onboardingCompletePage.isSeventhSetupScreenDisplayed()).toBe(true);
        await onboardingCompletePage.tapContinueSeventhScreen();
    });
    it("Should complete and interact with eighth setup screen", async () => {
        expect (await onboardingCompletePage.checkEighthBar()).toBe(true);
        expect (await onboardingCompletePage.isEighthSetupScreenDisplayed()).toBe(true);
        await onboardingCompletePage.tapContinueEighthScreen();
    });
    it("Should interact the widget modal and add widget", async () => {
        expect (await onboardingCompletePage.isWidgetModalScreenDisplayed()).toBe(true);
        expect (await onboardingCompletePage.isWidgetModalSubtitleDisplayed()).toBe(true);
        await onboardingCompletePage.tapAddWidgetButton();
        await onboardingCompletePage.tapAddHomeScreenButton();
    });
    it("Should display and interact with ninth setup screen", async () => {
        expect(await onboardingCompletePage.checkNinethBar()).toBe(true);
        expect(await onboardingCompletePage.isNinethSetupScreenDisplayed()).toBe(true);
        await onboardingCompletePage.tapNotNowButton();
    });
    it("Should display moodmeter title after completing setup", async () => {
        expect(await onboardingCompletePage.isMessageDisplayed()).toBe(true);
        await onboardingCompletePage.tapScreenCheckin();
    })
  });
});
