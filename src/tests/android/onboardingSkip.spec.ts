import { OnboardingSkipPage } from "../../pages/android/OnboardingSkipPage";
import { verify } from "../helpers/android/test-verification";

describe("Onboarding Tests", () => {
  let onboardingSkipPage: OnboardingSkipPage;

  beforeAll(async () => {
    onboardingSkipPage = new OnboardingSkipPage();
  });

  describe("First Screen interaction", () => {
    it("Should display and interact with onboarding flow", async () => {
      await verify(onboardingSkipPage.isFirstScreenDisplayed());
      await onboardingSkipPage.tapGetStarted();

      await verify(onboardingSkipPage.isSecondScreenDisplayed());
      await onboardingSkipPage.tapContinueSecondScreen();

      await verify(onboardingSkipPage.isThirdScreenDisplayed());
      await onboardingSkipPage.tapContinueThirdScreen();

      await verify(onboardingSkipPage.isFourthScreenDisplayed());
      await onboardingSkipPage.tapContinueFourthScreen();

      await verify(onboardingSkipPage.isFifthScreenDisplayed());
      await onboardingSkipPage.tapContinueFifthScreen();

      await verify(onboardingSkipPage.isSixthScreenDisplayed());
      await onboardingSkipPage.tapIAccept();

      await verify(onboardingSkipPage.isSeventhScreenDisplayed());
      await onboardingSkipPage.tapSkipSetup();

      await verify(onboardingSkipPage.isSeventhScreenModalDisplayed());
      await onboardingSkipPage.tapSkipSetupModal();

      if (await onboardingSkipPage.isPrivacyModalDisplayed()) {
        await verify(onboardingSkipPage.isPrivacyModalDisplayed());
        await onboardingSkipPage.tapAcceptPrivacyModal();
      }
    });
  });
});
