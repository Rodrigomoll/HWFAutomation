import { BasePage } from "../base/BasePage";
import { AndroidLocators } from "../../locators/AndroidLocators";
//import { iOSLocators } from "../../locators/iOSLocators";

export class FriendsPage extends BasePage {
    private locators!: AndroidLocators; // | iOSLocators;
    //private isAndroidPlatform!: boolean;

    private elements!: {
        checkinPrompt: string;
        friendsPrompt: string;
        sharePrompt: string;
        signInPrompt: string;
        feelingPrompt: string;
        shareModalPrompt: string;
        getStartedButton: string;
        signInButton: string;
        doneButton: string;
        selectAllButton: string;
        shareButton: string;
        signInModal: string;
        accountEmail: string;
        addFriendPrompt: string;
        alwaysAskToggle: string;
        closeButton: string;
        shareEmotionsModal: string;
        closeButton2: string;
    }

    async init() {
        //this.isAndroidPlatform = await this.isAndroid();

        this.locators = new AndroidLocators();

        this.elements = {
            checkinPrompt: await this.locators.selectValue("text", "Check in"),
            friendsPrompt: await this.locators.selectValue("text", "Friends"),
            sharePrompt: await this.locators.selectValue("text", "Share your emotions with friends"),
            signInPrompt: await this.locators.selectValue("text", "Create an account to invite a friend"),
            feelingPrompt: await this.locators.selectValue("text", "I\'m feeling"),
            shareModalPrompt: await this.locators.selectValue("text", "Share your check-in?"),

            // Buttons
            getStartedButton: await this.locators.selectValue("text", "Get started"),
            signInButton: await this.locators.selectValue("text", "Sign in with Google"),
            doneButton: await this.locators.selectValue("text", "Done"),
            selectAllButton: await this.locators.selectValue("text", "Select all"),
            shareButton: await this.locators.selectValue("contains", "Share with"),
            signInModal: await this.locators.selectValue("resource", "com.google.android.gms:id/title"),
            accountEmail: await this.locators.selectValue("resource", "com.google.android.gms:id/account_display_name"),
            addFriendPrompt: await this.locators.selectValue("text", "Now, let\'s add a friend"),
            alwaysAskToggle: await this.locators.selectValue("className", "android.view.View") + await this.locators.selectValue("instance", "15"),
            closeButton: await this.locators.selectValue("description", "Close"),
            shareEmotionsModal: await this.locators.selectValue("text", "Share your emotions with friends"),
            closeButton2: await this.locators.selectValue("className", "android.widget.Button") + await this.locators.selectValue("instance", "0"),
        };

        return this;
    };

    async verifyIsElementDisplayed(
        element: keyof typeof this.elements,
        timeout?: number
    ): Promise<boolean> {
        return await this.isElementDisplayed(await this.locators.buildSelector(this.elements[element]), timeout ?? null);
    }

    async tapElementButton(
        button: keyof typeof this.elements,
        timeout?: number
    ): Promise<void> {
        await this.tapElement(await this.locators.buildSelector(this.elements[button]), timeout ?? null);
    }

    async waitFor(
        element: keyof typeof this.elements,
        timeout?: number
    ): Promise<void> {
        await this.waitForElement(await this.locators.buildSelector(this.elements[element]), timeout ?? null);
    }

    async verifyIsActive(
        element: keyof typeof this.elements
    ): Promise<boolean> {
        const checkedAttr = await $(await this.locators.buildSelector(this.elements[element]));
        await driver.pause(1000);
        const val = await checkedAttr.getAttribute("checked");
        return val === "true";
    }

    async waitForAddFriendModal(timeout: number = 30000): Promise<void> {
        console.log(`[MODAL] Waiting up to ${timeout/1000}s for 'Add Friend' modal...`);

        try{
            const startTime = Date.now();
            await this.waitFor("addFriendPrompt", timeout);

            const elapsedTime = Date.now() - startTime;
            console.log(`[MODAL] 'Add Friend' modal appeared after ${(elapsedTime/1000).toFixed(1)} seconds`);
            await this.waitFor("doneButton",1000)
        }
        catch (error) {
            console.error(`[MODAL] 'Add Friend' modal did not appear within ${timeout/1000} seconds`);

            const pageSource = await driver.getPageSource();
            console.log("📱 [DEBUG] Page contains 'friend':", pageSource.includes('friend'));
            console.log("📱 [DEBUG] Page contains 'add':", pageSource.includes('add'));
            
            await driver.saveScreenshot('./modal-add-friend-timeout.png');
            throw error;
        }
    }

    async completeShareFlow(): Promise<void> {
        await this.tapElementButton("friendsPrompt");
        await this.tapElementButton("feelingPrompt");
        await this.verifyIsElementDisplayed("shareModalPrompt");
        await driver.pause(2000); // wait for the modal to stabilyze
        await this.tapElementButton("selectAllButton");
        await this.tapElementButton("shareButton");
    }
}