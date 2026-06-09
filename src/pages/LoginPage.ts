import { BasePage } from "./BasePage";
import { assertAllTrue } from "../helpers/assertAllTrue";

/**
 * Abstract class representing the Login screen and its flow.
 * Handles the sign-in process and related interactions like prompts and navigation.
 * Platform-specific logic, like selecting an email account.
 */
export abstract class LoginPage extends BasePage {
    constructor() {
        super();
        this.init();
        
        // Define key UI elements specific to the Login page
        this.locator.elements = {
            ...this.locator.elements,

            sharePrompt: { type: "text", value: "Share your emotions with friends" },
            checkin: { type: "text", value: "Check in" },
        }
    }

    /**
     * Handles the platform-specific interaction for selecting the user's email
     * account during login.
     */
    abstract selectAccountEmail(): Promise<void>;

    /**
     * Executes the complete login flow, including navigating through prompts,
     * signing in with an account, and verifying that the user reaches the main screen.
     */
    async signIn(){
        try{
            await this.tapButton("friends");
            await assertAllTrue(this.verifyIsElementDisplayed("sharePrompt"));

            await this.tapButton("getStarted");
            await assertAllTrue(this.verifyIsElementDisplayed("signInPrompt"));

            await this.tapButton("signIn");

            await this.selectAccountEmail();

            await this.tapButton("checkin");
        }
        catch (error) {
            console.error("Error during login flow:", error);
            throw error;
        }
    }

}