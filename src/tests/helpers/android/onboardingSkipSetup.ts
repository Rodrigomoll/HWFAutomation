import { OnboardingSkipPage } from "../../../pages/android/OnboardingSkipPage";

// This function completes the onboarding flow by interacting with first steps of the onboarding screens
// the methods comes from OnboardingSkipPage class then proceeds to the next steps to allow us to start
// creating our check-ins without completing the full onboarding flow

export async function doOnboardingSetup() {
  const onboardingSkipPage = new OnboardingSkipPage();

  try {
    await onboardingSkipPage.tapGetStarted();
    await new Promise((resolve) => setTimeout(resolve, 800));

    await onboardingSkipPage.tapContinueSecondScreen();
    await new Promise((resolve) => setTimeout(resolve, 800));

    await onboardingSkipPage.tapContinueThirdScreen();
    await new Promise((resolve) => setTimeout(resolve, 800));

    await onboardingSkipPage.tapContinueFourthScreen();
    await new Promise((resolve) => setTimeout(resolve, 800));

    await onboardingSkipPage.tapContinueFifthScreen();
    await new Promise((resolve) => setTimeout(resolve, 800));

    await onboardingSkipPage.tapIAccept();
    await new Promise((resolve) => setTimeout(resolve, 800));

    await onboardingSkipPage.tapSkipSetup();
    await new Promise((resolve) => setTimeout(resolve, 800));

    await onboardingSkipPage.tapSkipSetupModal();
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (await onboardingSkipPage.isPrivacyModalDisplayed()) {
      await onboardingSkipPage.tapAcceptPrivacyModal();
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
  } catch (error) {
    console.error("Error during onboarding setup:", error);
  }
}
