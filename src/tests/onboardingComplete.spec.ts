import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { assertAllTrue } from "../helpers/assertAllTrue";

describe("Onboarding complete flow", () => {
  let onboardingPage;

  beforeAll(async () => {
    onboardingPage = createPageObjectInstance("onboarding");
  });

  it("Complete onboarding flow", async () => {
    await assertAllTrue(onboardingPage.completeOnboardingFlow());
  });
});