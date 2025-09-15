import { OnboardingCompletePage } from "../pages/flows/OnboardingCompletePage";
import { setupInitialOnboardingFlow } from "../helpers/setupInitialOnboardingFlow";
import { verify } from "../helpers/testVerification";
import { BasePage } from "../pages/base/BasePage";

describe("Onboarding Complete Flow", () => {
  let onboardingCompletePage: OnboardingCompletePage;
  let isAndroidPlatform: boolean;

  beforeAll(async () => {
    onboardingCompletePage = await new OnboardingCompletePage().init();
    isAndroidPlatform = await new BasePage().isAndroid();
     // Setup for first steps of onboarding and continue with the onboarding flow
    await setupInitialOnboardingFlow(false);
  });

  describe("Complete onboarding flow", () => {
    it("Should complete all onboarding flow", async () => {
      await verify(onboardingCompletePage.verifyIsElementDisplayed("firstPrompt"));
    
      await onboardingCompletePage.tapButton("firstOption");
      await onboardingCompletePage.tapButton("continue");

      await verify(onboardingCompletePage.verifyIsElementDisplayed("secondPrompt"));
      await onboardingCompletePage.tapButton("continue");

      await verify(onboardingCompletePage.verifyIsElementDisplayed("thirdPrompt"));
      await onboardingCompletePage.tapButton("pleasantOption");
      await onboardingCompletePage.tapButton("pleasedEmotion");

      if(isAndroidPlatform){
        await verify(onboardingCompletePage.verifyIsElementDisplayed("fourthPrompt"));
        await onboardingCompletePage.enterTextJournal("This is a test journal entry.");
        await onboardingCompletePage.tapButton("next");
      }
      else{
        await onboardingCompletePage.tapButton("arrowRight");
        await onboardingCompletePage.tapButton("journalEntry");
        await verify(onboardingCompletePage.verifyIsElementDisplayed("fourthPrompt"));
        await onboardingCompletePage.enterTextJournal("Exploring my pleased emotion with a test.");
        await onboardingCompletePage.tapButton("finish");
        await onboardingCompletePage.tapButton("complete");
      }

      await verify(onboardingCompletePage.verifyIsElementDisplayed("fifthPrompt"));
      await onboardingCompletePage.tapButton("continue");

      await verify(onboardingCompletePage.verifyIsElementDisplayed("sixthPrompt"));
      if(!isAndroidPlatform) await onboardingCompletePage.tapButton("twicePerDay");
      await onboardingCompletePage.tapButton("continue");

      await verify(onboardingCompletePage.verifyIsElementDisplayed("seventhPrompt"));
      await onboardingCompletePage.tapButton("continue");

      if(isAndroidPlatform && await onboardingCompletePage.verifyIsElementDisplayed("accessModal")){
        await verify(onboardingCompletePage.verifyIsElementDisplayed("alarmDescription"));
        await onboardingCompletePage.tapButton("settings");
        await onboardingCompletePage.tapButton("howWeFeel");
        await onboardingCompletePage.tapButton("allowSettings");
        await onboardingCompletePage.tapButton("navigateBack");
        await onboardingCompletePage.tapButton("navigateBack");
        await onboardingCompletePage.tapButton("continue");
      }

      await verify(onboardingCompletePage.verifyIsElementDisplayed("eigthPrompt"));

      if(isAndroidPlatform) {
        await onboardingCompletePage.tapButton("continue");

        await verify(onboardingCompletePage.verifyIsElementDisplayed("widget"),onboardingCompletePage.verifyIsElementDisplayed("widgetDescription"));
        await onboardingCompletePage.tapButton("addWidget");
        await onboardingCompletePage.tapButton("addToHome");

        await verify(onboardingCompletePage.verifyIsElementDisplayed("ninethPrompt"));
        await onboardingCompletePage.tapButton("notNow");
      }
      else{
        await onboardingCompletePage.tapButton("addWidget");
        await onboardingCompletePage.tapButton("close");
      }

      await onboardingCompletePage.tapButton("checkin");
    });
  });
});