import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { assertAllTrue } from "../helpers/assertAllTrue";

//import { Eyes, Target } from '@applitools/eyes-webdriverio';

describe("Onboarding skip flow", () => {
  let onboardingPage;
  // let eyes;

  beforeAll(async () => {
    onboardingPage = createPageObjectInstance("onboarding");
    // eyes = new Eyes();
  });

  it("Skip onboarding flow", async () => {
    //const locale = await onboardingPage.isSpanishFlow() ? 'ES' : 'EN';

    // await eyes.open(
    //   browser,
    //   "HowWeFeel",
    //   `Skip Onboarding flow Android - ${locale}`
    // );
    
    await assertAllTrue(onboardingPage.skipOnboardingFlow()); // eyes

    //await onboardingPage.setupInitialOnboardingFlow(true); //, eyes);
    
    
    //await browser.pause(1500);

    // await eyes.check(
    //   "Finish screen",
    //   Target.window().layout()
    // );

    // await eyes.close();
  });

  // afterAll(async () => {
  //   await eyes.abortIfNotClosed();
  // });
});