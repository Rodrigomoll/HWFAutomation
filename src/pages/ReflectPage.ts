import { createPageObjectInstance } from "../helpers/createPageObjectInstance";
import { assertAllTrue } from "../helpers/assertAllTrue";
import { BasePage } from "./BasePage";

/**
 * Handles the reflection flow shown after completing a check-in.
 * Allows journaling, showing insights, and saving takeaways.
 */
export abstract class ReflectPage extends BasePage {
    protected checkinPage;
    protected settingsPage;

    constructor() {
        super();
        this.checkinPage = createPageObjectInstance("checkin");
        this.settingsPage = createPageObjectInstance("settings");
        this.init();

        // Define key UI elements specific to the Reflect page
        this.locator.elements = {
            ...this.locator.elements,
        }
    }

    /**
     * Checks if the user has reached the daily reflection limit.
     * Used to prevent further journaling beyond allowed usage.
     */
    abstract isUsageLimitReached(): Promise<boolean>;

    /**
     * Finalizes the reflection session depending on the current state.
     * May continue to check-in completion or skip based on flow context.
     * 
     * @param done - Indicates whether the reflection is complete.
     * @param toolTip - Whether to trigger a post-reflection home tooltip.
     */
    abstract completeReflectStep(done: boolean, toolTip: boolean): Promise<void>;

    /**
     * Verifies that key takeaway sections (affirmations, insights, suggested actions)
     * are visible after completing a reflection session.
     */
    async areTakeawaysDisplayed(): Promise<void> {
        await this.swipeVertical("up", 2.0);
        await driver.pause(2000);
        await this.swipeVertical("up", 0.5);
        await driver.pause(2000);
        const timeout = 10000;

        await assertAllTrue(this.verifyIsElementDisplayed("affirmations", timeout),
            this.verifyIsElementDisplayed("insights", timeout),
            this.verifyIsElementDisplayed("suggestedActions", timeout));
    }

    /**
     * Taps all visible buttons related to takeaways shown after the reflection session.
     * Includes affirmations, insights, and suggested actions.
     */
    abstract tapAllTakeawaysButtons(): Promise<void>;

    /**
     * Returns the key used to locate the journal input field during reflection.
     */
    abstract getJournalInputKey(): Promise<string>;

    /**
     * Taps the final button to complete the reflection journal entry.
     */
    abstract tapFinish(): Promise<void>;

    /**
     * Executes a single reflection cycle, including:
     * - Emotion selection
     * - Tagging and journaling
     * - Optional deep journaling loops
     * - Handling limits and finishing flow
     * - Interacting with takeaways when required
     * 
     * @param takeaways - Whether to validate and interact with takeaways at the end.
     * @param toolTip - Whether to validate home screen tooltip after completion.
     */
    async doReflectFlow(takeaways: boolean, toolTip: boolean) {
        try{
            await this.checkinPage.selectEmotionFromQuadrant("uneasy");
            await driver.pause(1000);

            await this.checkinPage.completeTagsAndJournalEntry("This is a test journal entry with reflection feature.", false);

            let isLimitReached = await this.isUsageLimitReached();

            const times = 5;

            for(let i = 0; i < times; i++){
                if(isLimitReached){
                    await this.completeReflectStep(false, toolTip);
                    await driver.pause(1000);
                    break;
                }
                else{
                    await driver.pause(2000); //textInput
                    await this.enterTextJournal(await this.getJournalInputKey(), `This is a test ${i+1}`);

                    if( i < times - 1){
                        await this.tapButton("goDeeper");
                        isLimitReached = await this.isUsageLimitReached();
                        await driver.pause(1000);
                    }
                    else{
                        await this.tapFinish();

                        if(takeaways) {
                            await driver.pause(2000);
                            await this.areTakeawaysDisplayed();
                            await this.tapAllTakeawaysButtons();
                        }
                        await this.completeReflectStep(true, toolTip);
                        await driver.pause(1000);
                    }
                }
            }
        }
        catch (error) {
            console.error("Error during reflect flow:", error);
        }
    }

    /**
     * Dismisses the optional modal prompting the user to share emotions with friends,
     * if it appears during the last reflection session.
     */
    abstract dismissShareModal(): Promise<void>;

    /**
     * Executes the full reflection flow multiple times.
     * Simulates the user completing several reflection entries, optionally verifying takeaways.
     * Also handles the share modal at the end of the sequence.
     * 
     * @param takeaways - Whether to verify and interact with the takeaways section during the flow.
     */
    async completeReflectFlow(takeaways: boolean):Promise<boolean> {
        try{
            await this.doReflectFlow(takeaways, true); // First check-in

            await this.settingsPage.deactivateShare();
            
            for(let i=0; i<5; i++){
                await this.doReflectFlow(takeaways, false);
            }

            // In the last one could be displayed the modal of sharing
            await this.dismissShareModal();
            
            await this.doReflectFlow(takeaways, false);
            return true;
        }
        catch (error) {
            console.error("Error during complete reflect flow:", error);
            return false;
        }
    }

}