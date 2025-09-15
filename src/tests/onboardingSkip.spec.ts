import { skipOnboardingFlow } from "../helpers/skipOnboardingFlow";

it("Onboarding Skip Flow", async () => {
    //setup to skip all onboarding flow and start creating our check-ins
    await skipOnboardingFlow();
});