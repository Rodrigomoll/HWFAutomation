import { doOnboardingSetup } from "../helpers/android/onboardingSkipSetup";

describe('Test emotions commands', () => {

    beforeAll(async () => {
        await doOnboardingSetup();
    });

    it("Should create pleased check-in (yellow)", async () => {
        await browser.createCheckinWithEmotions('pleased', "Feeling great today! 😊");
    });

    it("Should create uneasy check-in (red)", async () => {
        await browser.createCheckinWithEmotions('uneasy', "Feeling stressed about work 😰");
    });

    it("Should create calm check-in (green)", async () => {
        await browser.createCheckinWithEmotions('calm', "Peaceful morning meditation 😌");
    });

    it("Should create bored check-in (blue)", async () => {
        await browser.createCheckinWithEmotions('bored', "Nothing interesting happening 😴");
    });
})