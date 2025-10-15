import { FriendsPage } from "../FriendsPage";
import { verifyCheckInHomeScreen } from "../../helpers/verifyCheckInHomeScreen";
import { assertAllTrue } from "../../helpers/assertAllTrue";

/**
 * Android implementation of the Friends page.
 * Defines Android-specific locators and behavior.
 */
export class AndroidFriendsPage extends FriendsPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,
            justFeeling: { type: "text", value: "Just the feeling" },
        }
    }

    async selectFriendsTab(){
        await this.tapButton("friends");
        await this.tapButton("imFeelingText");

        await verifyCheckInHomeScreen();
    }

    async verifyEmotionScreen(): Promise<boolean> {
        await driver.pause(5000);

        return await this.verifyIsElementDisplayed("imFeelingText");
    }
}