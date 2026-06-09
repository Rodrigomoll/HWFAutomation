import { createPageObjectInstance } from "./createPageObjectInstance";
import { verifyCheckInHomeScreen } from "./verifyCheckInHomeScreen";

/**
 * Completes a basic check-in flow with a selected emotion and journal entry.
 *
 * This function:
 * - Selects a quadrant emotion.
 * - Adds tags and a journal entry.
 * - Completes the check-in.
 * - Verifies that the home screen is displayed after the flow.
 * - Handles the emotional tools tooltip only once (on the first call).
 *
 * @param {'pleased' | 'uneasy' | 'calm' | 'bored'} emotion - The emotion to select in the check-in quadrant.
 * @param {string} journalText - The text to enter in the journal entry.
 * @returns {Promise<void>} Resolves when the check-in flow is complete.
 */
export async function completeBasicCheckin(emotion: 'pleased' | 'uneasy' | 'calm' | 'bored', journalText: string) {
    const checkinPage = createPageObjectInstance("checkin");

    try{
        await driver.pause(2000);
        await checkinPage.selectEmotionFromQuadrant(emotion);
        await driver.pause(1000);

        await checkinPage.completeTagsAndJournalEntry(journalText, true);
        await checkinPage.completeCheckIn();

        await checkinPage.dismissModalIfVisible();
        return await verifyCheckInHomeScreen();
    }
    catch (error) {
        console.error("Error during `completeBasicCheckin`:", error);
        throw error;
    }
}