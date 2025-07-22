import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";

describe('Test emotions commands', () => {

    beforeAll(async () => {
        await doOnboardingSetup();
    });

    it("Should create pleased check-in (yellow)", async () => {
        await browser.createCheckinWithEmotion('pleased', "Feeling great today! 😊");
    });

    it("Should create uneasy check-in (red)", async () => {
        await browser.createCheckinWithEmotion('uneasy', "Feeling stressed about work 😰");
    });

    it("Should create calm check-in (green)", async () => {
        await browser.createCheckinWithEmotion('calm', "Peaceful morning meditation 😌");
    });

    it("Should create bored check-in (blue)", async () => {
        await browser.createCheckinWithEmotion('bored', "Nothing interesting happening 😴");
    });
})