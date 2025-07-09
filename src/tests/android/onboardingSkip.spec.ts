import { OnboardingPage } from "../../pages/android/OnboardingSkipPage";

describe("Onboarding Tests", () => {
  let onboardingPage: OnboardingPage;

  beforeAll(async () => {
    onboardingPage = new OnboardingPage();
  });

  describe("First Screen interaction", () => {
    it("Should display and interact with first onboarding screen", async () => {
      expect(await onboardingPage.isFirstScreenDisplayed()).toBe(true);
      await onboardingPage.tapGetStarted();
    });

    it("Should display and interact with second onboarding screen", async () => {
      expect(await onboardingPage.isSecondScreenDisplayed()).toBe(true);
      await onboardingPage.tapContinueSecondScreen();
    });

    it("Should display and interact with third onboarding screen", async () => {
      expect(await onboardingPage.isThirdScreenDisplayed()).toBe(true);
      await onboardingPage.tapContinueThirdScreen();
    });

    it("Should display and interact with fourth onboarding screen", async () => {
      expect(await onboardingPage.isFourthScreenDisplayed());
      await onboardingPage.tapContinueFourthScreen();
    });

    it("Should display and interact with fifth onboarding screen", async () => {
      expect(await onboardingPage.isFifthScreenDisplayed()).toBe(true);
      await onboardingPage.tapContinueFifthScreen();
    });

    it("Should display and interact with sixth onboarding screen", async () => {
      expect(await onboardingPage.isSixthScreenDisplayed()).toBe(true);
      await onboardingPage.tapIAccept();
    });

    it("Should display and interact with seventh onboarding screen", async () => {
      expect(await onboardingPage.isSeventhScreenDisplayed()).toBe(true);
      await onboardingPage.tapSkipSetup();
    });

    it("Should display modal title after skipping onboarding", async () => {
      expect(await onboardingPage.isSeventhScreenModalDisplayed()).toBe(true);
      await onboardingPage.tapSkipSetupModal();
    });

    it("Should display privacy modal after skipping", async () => {
      if (await onboardingPage.isPrivacyModalDisplayed()) {
          expect(await onboardingPage.isPrivacyModalDisplayed()).toBe(true);
          await onboardingPage.tapAcceptPrivacyModal();
      }
    });
  });
});
