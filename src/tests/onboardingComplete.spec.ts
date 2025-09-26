import { setupInitialOnboardingFlow } from "../helpers/setupInitialOnboardingFlow";
import { verify } from "../helpers/testVerification";
import { whichPlatform } from "../helpers/whichPlatform";

describe("Onboarding Complete Flow", () => {
  let locator;

  beforeAll(async () => {
    locator = await whichPlatform();
     // Setup for first steps of onboarding and continue with the onboarding flow
    await setupInitialOnboardingFlow(locator, false);
  });

  describe("Complete onboarding flow", () => {
    it("Should complete all onboarding flow", async () => {
      await verify(locator.verifyIsElementDisplayed("explorePrompt"));
    
      await locator.tapButton("positiveOption");
      await locator.tapButton("continue");

      await verify(locator.verifyIsElementDisplayed("helpPrompt"));
      await locator.tapButton("continue");

      await driver.pause(1000);

      await verify(locator.verifyIsElementDisplayed("firstCheckinPrompt"));
      await locator.tapButton("yellowQuadrant");
      await locator.tapButton("pleasedEmotion");

      if(locator.isAndroidPlatform){
        await verify(locator.verifyIsElementDisplayed("describePrompt"));
        await locator.enterTextJournal("textInput", "This is a test journal entry.");
        await locator.tapButton("next");
      }
      else{
        await locator.tapButton("arrowRight");
        await locator.tapButton("journalEntry");
        await verify(locator.verifyIsElementDisplayed("explorePleasedPrompt"));
        await locator.enterTextJournal("textInput", "Exploring my pleased emotion with a test.");
        await locator.tapButton("finish");
        await locator.tapButton("complete");
      }

      await verify(locator.verifyIsElementDisplayed("completePrompt"));
      await locator.tapButton("continue");

      await verify(locator.verifyIsElementDisplayed("frecuencyPrompt"));
      if(!locator.isAndroidPlatform) await locator.tapButton("twicePerDay");
      await locator.tapButton("continue");

      await verify(locator.verifyIsElementDisplayed("reminderPrompt"));
      await locator.tapButton("continue");

      if(locator.isAndroidPlatform && await locator.verifyIsElementDisplayed("accessModal")){
        await verify(locator.verifyIsElementDisplayed("alarmAccessDescription"));
        await locator.tapButton("settings");
        await locator.tapButton("howWeFeel");
        await locator.tapButton("allowSettings");
        await locator.tapButton("navigateBack");
        await locator.tapButton("navigateBack");
        await locator.tapButton("continue");
      }

      if(locator.isAndroidPlatform) {
        await verify(locator.verifyIsElementDisplayed("widgetPrompt"));
        await locator.tapButton("continue");

        await verify(locator.verifyIsElementDisplayed("quickCheckin"));
        await locator.tapButton("addWidget");
        await locator.tapButton("addToHome");

        await driver.pause(1000);

        await verify(locator.verifyIsElementDisplayed("tryStrategyPrompt"));
        await locator.tapButton("notRightNow");
      }
      else{
        await locator.tapButton("addWidget");
        await locator.tapButton("close");
      }

      await locator.tapButton("emotionalToolsPrompt");
    });
  });
});