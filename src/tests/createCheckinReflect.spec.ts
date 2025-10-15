import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { assertAllTrue } from "../helpers/assertAllTrue";

describe("Create check-in with reflection feature", () => {
    let loginPage, reflectPage, settingsPage, onboardingPage;

    beforeAll(async () => {
        loginPage = createPageObjectInstance("login");
        reflectPage = createPageObjectInstance("reflect");
        settingsPage = createPageObjectInstance("settings");
        onboardingPage = createPageObjectInstance("onboarding");
        
        // Setup to skip all onboarding flow and start creating our check-ins
        await onboardingPage.skipOnboardingFlow();
        // Sign in to access AI features in the app.
        await loginPage.signIn();
    },90000);

    it("Should create a check-in with reflection feature", async() => {
        await settingsPage.enableAISettings();
        //await settingsPage.deactivateShare();

        await assertAllTrue(reflectPage.completeReflectFlow(false));
    });
})