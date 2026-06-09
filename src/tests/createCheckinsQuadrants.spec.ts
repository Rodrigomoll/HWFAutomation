import { completeBasicCheckin } from "../helpers/completeBasicCheckin";
import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { assertAllTrue } from "../helpers/assertAllTrue";

describe('Test emotions commands', () => {
    let onboardingPage;

    beforeAll(async () => {
        onboardingPage = createPageObjectInstance("onboarding");
        
        // Setup to skip all onboarding flow and start creating our check-ins
        await onboardingPage.skipOnboardingFlow();
    });

    it("Should create pleased check-in (yellow)", async () => {
        await assertAllTrue(completeBasicCheckin('pleased', "Feeling great today! 😊"));
    });

    it("Should create uneasy check-in (red)", async () => {
        await assertAllTrue(completeBasicCheckin('uneasy', "Feeling stressed about work 😰"));
    });

    it("Should create calm check-in (green)", async () => {
        await assertAllTrue(completeBasicCheckin('calm', "Peaceful morning meditation 😌"));
    });

    it("Should create bored check-in (blue)", async () => {
        await assertAllTrue(completeBasicCheckin('bored', "Nothing interesting happening 😴"));
    });
})