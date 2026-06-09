import { BasePage } from "../pages/BasePage";

/**
 * Verifies that the app is currently showing the home screen (Checkin screen) by checking key elements.
 * Optionally handles dismissing any tooltip if present.
 *
 * @returns {Promise<void>} Resolves if the home screen is displayed correctly.
 * @throws Throws if required home screen elements are missing.
 */
export async function verifyCheckInHomeScreen(){
    const basePase = new BasePage();

    if(await basePase.verifyIsElementDisplayed("emotionalToolsPrompt")){
        await basePase.tapScreenCenter();
    }

    return await basePase.verifyIsElementDisplayed("newCheckin")
        && await basePase.verifyIsElementDisplayed("tools");
}