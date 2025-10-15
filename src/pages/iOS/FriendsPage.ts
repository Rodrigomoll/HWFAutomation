import { FriendsPage } from "../FriendsPage";
import { verifyCheckInHomeScreen } from "../../helpers/verifyCheckInHomeScreen";

/**
 * iOS implementation of the Friends page.
 * Defines iOS-specific locators and behavior.
 */
export class iOSFriendsPage extends FriendsPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,
            justFeeling: { type: "text", value: "Just the\nfeeling" },
        }
    }

    async selectFriendsTab(){
        // Not applicable
    }

    async verifyEmotionScreen(): Promise<boolean> {
        return await verifyCheckInHomeScreen();
    }
}