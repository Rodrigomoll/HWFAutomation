import { LoginPage } from "../LoginPage";
import { assertAllTrue } from "../../helpers/assertAllTrue";

/**
 * Android implementation of the Login page.
 * Defines Android-specific locators and behavior.
 */
export class AndroidLoginPage extends LoginPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,
            signInPrompt: { type: "text", value: "Create an account to invite a friend" },
            signIn: { type: "text", value: "Sign in with Google" },
            signInModal: { type: "resource", value: "com.google.android.gms:id/title" },
            accountEmail: { type: "resource", value: "com.google.android.gms:id/account_display_name" },
            addFriendPrompt: { type: "text", value: "Now, let\'s add a friend" },
        }
    }

    async selectAccountEmail(){
        await assertAllTrue(this.verifyIsElementDisplayed("signInModal"));

        await this.tapButton("accountEmail");
        
        await driver.pause(2000);
        await assertAllTrue(this.verifyIsElementDisplayed("addFriendPrompt", 6000));
        await this.tapButton("done");
    }

}