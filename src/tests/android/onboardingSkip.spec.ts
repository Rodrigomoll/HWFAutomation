import { OnboardingSkipPage } from "../../pages/android/OnboardingSkipPage";

describe("Onboarding Tests", () => {
  let onboardingSkipPage: OnboardingSkipPage;

  beforeAll(async () => {
    onboardingSkipPage = new OnboardingSkipPage();
  });

  describe("First Screen interaction", () => {
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
      await onboardingSkipPage.tapSkipSetup();
    });

    it("Should display modal title after skipping onboarding", async () => {
      expect(await onboardingSkipPage.isSeventhScreenModalDisplayed()).toBe(true);
      await onboardingSkipPage.tapSkipSetupModal();
    });

    it("Should display privacy modal after skipping", async () => {
      if (await onboardingSkipPage.isPrivacyModalDisplayed()) {
          expect(await onboardingSkipPage.isPrivacyModalDisplayed()).toBe(true);
          await onboardingSkipPage.tapAcceptPrivacyModal();
      }
    });
  });
});
