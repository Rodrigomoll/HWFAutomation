import { OnboardingSkipPage } from "../../pages/ios/OnboardingSkipPage";

describe("Onboarding Flow", () => {
  let onboardingSkipPage: OnboardingSkipPage;

  beforeAll(async () => {
    onboardingSkipPage = new OnboardingSkipPage();
  });

  describe("First Screen interaction", () => {
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

    it('Should display and interact with fourth onboarding screen', async () => {
      expect(await onboardingSkipPage.isFourthScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapContinueFourthScreen();
    });

    it('Should display and interact with fifth onboarding screen', async () => {
      expect(await onboardingSkipPage.isFifthScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapContinueFifthScreen();
    });

    it('Should display and interact with sixth onboarding screen', async () => {
      expect(await onboardingSkipPage.isSixthScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapAcceptButton();
      console.log('paso la prueba')
    });

    it('Should display and interact with seventh onboarding screen', async () => {
      expect(await onboardingSkipPage.isSeventhScreenDisplayed()).toBe(true);
      await onboardingSkipPage.tapSkipButton();
    });

    it('Should display modal title after skipping onboarding', async () => {
      expect(await onboardingSkipPage.isTitleModalDisplayed()).toBe(true);
      await onboardingSkipPage.tapSkipSetupButton();
    });
    it('Should display moodmeter title after skipping', async () => {
        expect(await onboardingSkipPage.isMoodMeterTitleDisplayed()).toBe(true);
    })
  });
});
