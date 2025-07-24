import { OnboardingCompletePage } from "../../pages/android/OnboardingCompletePage";
import { doOnboardingCompleteFlow } from "../helpers/android/onboardingCompleteFlow";
import { verify } from "../helpers/android/test-verification";

describe("Onboarding Complete Flow", () => {
  let onboardingCompletePage: OnboardingCompletePage;

  beforeAll(async () => {
    onboardingCompletePage = new OnboardingCompletePage();
     // Setup for first steps of onboarding and continue with the onboarding flow
    await doOnboardingCompleteFlow();
  });

  describe("Complete onboarding flow", () => {
    it("Should complete all onboarding flow", async () => {
      await verify(onboardingCompletePage.isFirstSetupScreenDisplayed());
      await onboardingCompletePage.tapFirstOption();
      await onboardingCompletePage.tapContinueFirstScreen();

      await verify(onboardingCompletePage.isSecondSetupScreenDisplayed());
      await onboardingCompletePage.tapContinueSecondScreen();

      await verify(onboardingCompletePage.checkThirdBar(),onboardingCompletePage.isThirdSetupScreenDisplayed());
      await onboardingCompletePage.tapHighEnergyPleasantButton();
      await onboardingCompletePage.tapOnPleasedEmotion();

      await verify(onboardingCompletePage.checkFourthBar(),onboardingCompletePage.isFourthSetupScreenDisplayed());
      await onboardingCompletePage.enterTextJournal("This is a test journal entry.");
      await onboardingCompletePage.tapNextButton();

      await verify(onboardingCompletePage.checkFifthBar(),onboardingCompletePage.isFifthSetupScreenDisplayed());
      await onboardingCompletePage.tapContinueFifthScreen();

      await verify(onboardingCompletePage.checkSixthBar(),onboardingCompletePage.isSixthSetupScreenDisplayed());
      await onboardingCompletePage.tapContinueSixthScreen();

      await verify(onboardingCompletePage.checkSeventhBar(),onboardingCompletePage.isSeventhSetupScreenDisplayed());
      await onboardingCompletePage.tapContinueSeventhScreen();

      const dialogAppeared = await onboardingCompletePage.isAlarmAndRemindersDialogScreenDisplayed();
      if(dialogAppeared){
        await verify(onboardingCompletePage.isDialogDescriptionDisplayed());
        await onboardingCompletePage.tapSettingsButton();
        await onboardingCompletePage.tapNavigateBackButton();
        await onboardingCompletePage.tapNavigateBackButton();
        await onboardingCompletePage.tapContinueSeventhScreen();
      }

      await verify(onboardingCompletePage.checkEighthBar(),onboardingCompletePage.isEighthSetupScreenDisplayed());
      await onboardingCompletePage.tapContinueEighthScreen();

      await verify(onboardingCompletePage.isWidgetModalScreenDisplayed(),onboardingCompletePage.isWidgetModalSubtitleDisplayed());
      await onboardingCompletePage.tapAddWidgetButton();
      await onboardingCompletePage.tapAddHomeScreenButton();

      await verify(onboardingCompletePage.checkNinethBar(),onboardingCompletePage.isNinethSetupScreenDisplayed());
      await onboardingCompletePage.tapNotNowButton();

      await verify(onboardingCompletePage.isMessageDisplayed());
      await onboardingCompletePage.tapScreenCheckin();
    });
  });
});