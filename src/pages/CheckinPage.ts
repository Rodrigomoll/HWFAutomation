import { assertAllTrue } from "../helpers/assertAllTrue";
import { BasePage } from "./BasePage";

/**
 * Abstract base class for implementing the check-in flow across platforms.
 *
 * This class defines the main actions and steps a user performs during the
 * check-in process, including selecting emotions, tags, journal entry,
 * modifying dates, and deleting previous check-ins.
 *
 * Subclasses (iOS/Android) must implement all platform-specific behavior,
 * especially around UI selectors and native interaction differences.
 */
export abstract class CheckinPage extends BasePage {

    constructor() {
        super();
        this.init();

        // Define key UI elements specific to the Checkin page
        this.locator.elements = {
            ...this.locator.elements,

            checkinPrompt: { type: "contains", value: "How are you feeling this" },
            greenQuadrant: { type: "text", value: "Low Energy\nPleasant" },
            uneasyEmotion: { type: "text", value: "Uneasy" },
            uneasyEmotionLabel: { type: "text", value: "uneasy" },
            uneasyText: { type: "text", value: "Feeling stressed about work" },
            calmEmotion: { type: "text", value: "Calm" },
            calmEmotionLabel: { type: "text", value: "calm" },
            boredEmotion: { type: "text", value: "Bored" },
            absorbedEmotion: { type: "text", value: "Absorbed" },
            yellowEmotions: { type: "text", value: "Yellow" },
        }
    }

    /**
     * Taps the specified emotion inside the quadrant grid.
     * 
     * @param emotion - Name of the emotion to select.
     */
    abstract tapEmotionInQuadrant(emotion: string): Promise<void>;

    /**
     * Selects the appropriate quadrant on the emotion grid based on the emotion type.
     * Then verifies that the expected emotion option is displayed.
     * 
     * @param emotion - One of: 'pleased', 'uneasy', 'calm', or 'bored'.
     */
    async selectEmotionFromQuadrant(emotion: 'pleased' | 'uneasy' | 'calm' | 'bored'): Promise<void> {
        try{
            await driver.pause(2000);
            await assertAllTrue(this.verifyIsElementDisplayed("newCheckin"));
            await this.tapButton("newCheckin");

            await assertAllTrue(this.verifyIsElementDisplayed("quadrantPrompt")
                && this.verifyIsElementDisplayed("redQuadrant") 
                && this.verifyIsElementDisplayed("blueQuadrant")
                && this.verifyIsElementDisplayed("yellowQuadrant")
                && this.verifyIsElementDisplayed("greenQuadrant"));

            let quadrant;
            switch(emotion){
                case 'pleased':
                    // High Energy + Pleasant
                    quadrant = "yellowQuadrant";
                    break;
                case 'uneasy':
                    // High Energy + Pleasant
                    quadrant = "redQuadrant";
                    break;
                case 'calm':
                    // Low Energy + Pleasant
                    quadrant = "greenQuadrant";
                    break;
                case 'bored':
                    // Low Energy + Unpleasant
                    quadrant = "blueQuadrant";
                    break;
            }

            emotion = emotion + "Emotion";
            if(quadrant) await this.tapButton(quadrant);
            await assertAllTrue(this.verifyIsElementDisplayed(emotion));

            await this.tapEmotionInQuadrant(emotion);
        } catch (error) {
            console.error("Error during select emotion in quadrant:", error);
            throw error;
        }
    }

    /**
     * Verifies that the tag prompt is visible and selects tags across categories.
     * Then proceeds to the next step in the check-in flow.
     */
    abstract verifyAndSelectTags(): Promise<void>;

    /**
     * Selects default tags manually for testing:
     * - "Driving" (theme), "By Myself" (people), "Commuting" (places).
     */
    async selectDefaultTags() {
        await assertAllTrue(this.verifyIsElementDisplayed("themesTag") 
            && this.verifyIsElementDisplayed("peopleTag")
            && this.verifyIsElementDisplayed("placesTag"));

        await this.tapButton("drivingTag");
        await this.tapButton("myselfTag");
        await this.tapButton("commutingTag");
    }

    /**
     * Adds text to the journal entry screen.
     * After entering the text, taps a button to proceed to the next step
     * (e.g., "next" or "reflect").
     * 
     * @param input - Text content to enter in the journal.
     * @param next - Whether to continue the flow by tapping the next button.
     */
    abstract addJournalEntry(input: string, next: boolean): Promise<void>;

    /**
     * Combines the steps of verifying tags and entering a journal entry
     * into a single flow.
     * 
     * @param input - Journal entry content.
     * @param next - Whether to continue after journal entry.
     */
    async completeTagsAndJournalEntry(input: string, next: boolean) {
        await this.verifyAndSelectTags();
        await this.addJournalEntry(input, next);
    }

    /**
     * Dismisses modal popups that might interrupt the flow (e.g. reflect prompt).
     * Safe to call regardless of whether a modal is currently shown.
     */
    abstract dismissModalIfVisible(): Promise<void>;

    /**
     * Verifies that the data prompt (before saving the check-in) is visible.
     * Should be called before attempting to save.
     */
    abstract verifyDataPromptVisible();

    /**
     * Completes the check-in by verifying the data prompt and tapping save.
     */
    abstract completeCheckIn();

    /**
     * Verifies that a specific emotion appears on the main check-in screen
     * after submission. Also taps it to confirm presence.
     * 
     * @param emotion - The emotion key to verify (e.g., "calm", "bored").
     */
    abstract verifyEmotionMainScreen(emotion: string|null): Promise<void>;

    /**
     * Scrolls to check if a previously submitted emotion check-in is visible.
     * Taps it to confirm visibility.
     * 
     * @param emotion - The emotion to look for.
     * @returns True if the emotion check-in is displayed.
     */
    async isCheckinDisplayed(emotion: string): Promise<boolean> {
        await this.swipeVertical("up", 0.7);
        await browser.pause(1000);

        await this.verifyEmotionMainScreen(emotion);

        await this.tapButton(emotion);
        return (await this.verifyIsElementDisplayed(emotion));
    }

    /**
     * Returns the key or selector for the journal entry input field,
     * used to update an existing entry.
     */
    abstract getJournalInputLocator(): Promise<string>;

    /**
     * Updates the text of a journal entry and saves the result.
     * 
     * @param newText - New journal content to set.
     */
    async updateJournalEntryText(newText: string): Promise<void> {
        const element = await this.waitFor(await this.getJournalInputLocator());
        await element.setValue(newText);
        await driver.pause(1000);

        await this.saveJournalEntry(newText);
    }

    /**
     * Verifies the journal text is displayed, then saves the entry.
     * 
     * @param text - Text to validate and save.
     */
    abstract saveJournalEntry(text: string): Promise<void>;

    /**
     * Builds a formatted selector string to find a date in the check-in carousel.
     * 
     * @param yesterday - Whether to target the previous day.
     * @param date - Formatted date string.
     * @param type - Format type: "long" or "short".
     */
    abstract buildDateSelector(yesterday: boolean | null, date: string, type: string): Promise<string>;

    /**
     * Returns a selector string for the current or previous date
     * in the specified format, based on the device locale.
     * 
     * @param yesterday - Whether to use the previous date.
     * @param type - Format style: "long" or "short".
     * @returns Selector-ready formatted string.
     */
    async getFormattedDateSelector(yesterday: boolean, type: "long" | "short"){
        const date = new Date();
        if(yesterday) date.setDate(date.getDate() - 1);

        const day = date.getDate();
        const dayName = date.toLocaleString("default", { weekday: type });
        const monthName = date.toLocaleString("default", { month: type });

        return await this.buildDateSelector(yesterday, `${dayName} ${monthName} ${day}`, type);
    }
    
    /**
     * Scrolls the date carousel down to reveal the previous date.
     * Intended to allow users to view or edit past check-ins.
     */
    abstract scrollToPreviousDateInCarousel();

    /**
     * Taps the necessary buttons to save an action.
     */
    abstract saveAction();

    /**
     * Selects the previous check-in date from the carousel,
     * verifies the date, and saves the result.
     */
    async selectPreviousCheckinDate(){
        await this.verifyDataPromptVisible();

        await this.tapElement(await this.getFormattedDateSelector(false, "long"));
        await this.scrollToPreviousDateInCarousel();

        await this.saveAction();

        await assertAllTrue(this.isElementDisplayed(await this.getFormattedDateSelector(true, "short")));
    }

    /**
     * Taps the UI element to add a new emotion to a check-in.
     */
    abstract addEmotion();

    /**
     * Confirms deletion of a check-in after triggering the delete flow.
     */
    abstract confirmDeletion(): Promise<void>;

    /**
     * Deletes a submitted check-in by tapping the menu, selecting delete,
     * and confirming the action.
     */
    async deleteCheckin(): Promise<void> {
        await this.tapButton("threeDots");
        await driver.pause(2000);

        await this.tapButton("delete");
        await driver.pause(2000);

        await this.confirmDeletion();
        await driver.pause(5000);
    }

}