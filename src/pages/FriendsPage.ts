import { BasePage } from "./BasePage";
import { assertAllTrue } from "../helpers/assertAllTrue";

/**
 * Abstract base class representing the Friends page within the app.
 * Contains core elements and common functionality for sharing emotions
 * and interacting with the friends tab.
 */
export abstract class FriendsPage extends BasePage {
    constructor() {
        super();
        this.init();

        // Define key UI elements specific to the Friends page
        this.locator.elements = {
            ...this.locator.elements,

            selectAllButton: { type: "text", value: "Select all" },
            shareWith: { type: "contains", value: "Share with" },
        }
    }

    /**
     * Switches the UI to the Friends tab.
     */
    abstract selectFriendsTab(): Promise<void>;
    
    /**
     * Shares the current emotion with friends by:
     * - Opening the Friends tab
     * - Waiting for the share modal
     * - Selecting all friends
     * - Confirming the share action
     * - Verifying the emotion screen is shown
     */
    async shareEmotion(){
        await this.selectFriendsTab();

        await assertAllTrue(this.verifyIsElementDisplayed("shareModalPrompt"));
        await driver.pause(2000); // wait for the modal to stabilyze
        await this.tapButton("justFeeling");
        await this.tapButton("selectAllButton");
        await this.tapButton("shareWith");

        return await this.verifyEmotionScreen();
    }

    /**
     * Checks that the emotion screen is displayed after sharing.
     */
    abstract verifyEmotionScreen(): Promise<boolean>;
}