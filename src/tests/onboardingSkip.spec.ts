import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { assertAllTrue } from "../helpers/assertAllTrue";

describe("Onboarding skip flow", () => {
  let onboardingPage;

  beforeAll(async () => {
    onboardingPage = createPageObjectInstance("onboarding");
  });

  it("Skip onboarding flow", async () => {
    await assertAllTrue(onboardingPage.skipOnboardingFlow());
  });
});