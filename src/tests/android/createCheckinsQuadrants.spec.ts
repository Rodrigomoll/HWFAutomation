import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";
import { doCheckinWithEmotionsFlow } from "../helpers/android/checkinWithEmotionsFlow";

describe('Test emotions commands', () => {

    beforeAll(async () => {
        await doOnboardingSetup();
    });

    it("Should create pleased check-in (yellow)", async () => {
        await doCheckinWithEmotionsFlow('pleased', "Feeling great today! 😊");
    });

    it("Should create uneasy check-in (red)", async () => {
        await doCheckinWithEmotionsFlow('uneasy', "Feeling stressed about work 😰");
    });

    it("Should create calm check-in (green)", async () => {
        await doCheckinWithEmotionsFlow('calm', "Peaceful morning meditation 😌");
    });

    it("Should create bored check-in (blue)", async () => {
        await doCheckinWithEmotionsFlow('bored', "Nothing interesting happening 😴");
    });
})