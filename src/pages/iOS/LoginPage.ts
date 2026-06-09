import { LoginPage } from "../LoginPage";

/**
 * iOS implementation of the Login page.
 * Defines iOS-specific locators and behavior.
 */
export class iOSLoginPage extends LoginPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,
            signInPrompt: { type: "text", value: "Sign in / Create account" },
            signIn: { type: "text", value: "Continue with Google" },
            accountEmail: { type: "component", value: "//XCUIElementTypeLink" },
        }
    }

    async selectAccountEmail(){
        await this.tapButton("accountEmail");
        await this.tapButton("continue");
    }

}