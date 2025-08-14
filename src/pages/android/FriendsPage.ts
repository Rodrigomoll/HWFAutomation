import { BasePage } from "../base/BasePage";

// contains the elements from Friends tab
export class FriendsPage extends BasePage {
    private readonly elements = {
        navigation: {
            friendsTab: 'new UiSelector().text("Friends")',
            checkinTab: 'new UiSelector().text("Check in")',
        },
        friendsScreen: {
            title: 'new UiSelector().text("Share your emotions with friends")',
            getStartedButton: 'new UiSelector().text("Get started")',
            signinTitle: 'new UiSelector().text("Create an account to invite a friend")',
            signinButton: 'new UiSelector().text("Sign in with Google")',
            doneButton: 'new UiSelector().text("Done")',
        },
        checkinCard: {
            feelingText: 'new UiSelector().text("I\'m feeling")',
            emotion: 'new UiSelector().text("bored")',
        },
        shareModal: {
            title: 'new UiSelector().text("Share your check-in?")',
            selectAllButton: 'new UiSelector().text("Select all")',
            shareButton: 'new UiSelector().textContains("Share with")',
        },
        googleSignin: {
            modalTitle: 'com.google.android.gms:id/title',
            accountEmail: 'com.google.android.gms:id/account_display_name',
        },
        permissions: {
            modalTitle: 'com.android.permissioncontroller:id/permission_message',
            allowButton: 'com.android.permissioncontroller:id/permission_allow_button',
        },
        modals: {
            addFriend: 'new UiSelector().text("Now, let\'s add a friend")',
        }
    };

    async tapFriendsTab(): Promise<void> {
        await this.tapElement(`android=${this.elements.navigation.friendsTab}`);
    }
    async isfriendsScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.elements.friendsScreen.title}`);
    }

    async tapGetStartedButton(): Promise<void> {
        await this.tapElement(`android=${this.elements.friendsScreen.getStartedButton}`);
    }

    async isSigninTitleDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.elements.friendsScreen.signinTitle}`);
    }
    
    async tapSigninButton(): Promise<void> {
        await this.tapElement(`android=${this.elements.friendsScreen.signinButton}`);
    }

    async isSigninModalDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=new UiSelector().resourceId("${this.elements.googleSignin.modalTitle}")`);
    }

    async tapEmailAccount(): Promise<void>{
        await this.tapElement(`android=new UiSelector().resourceId("${this.elements.googleSignin.accountEmail}")`);
    }

    async isModalNotifDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=new UiSelector().resourceId("${this.elements.permissions.modalTitle}")`);
    }

    async tapAllowButton(): Promise<void> {
        await this.tapElement(`android=new UiSelector().resourceId("${this.elements.permissions.allowButton}")`);
    }

    async waitForModalAddFriend(timeout: number = 30000): Promise<void> {
        console.log(`[MODAL] Waiting up to ${timeout/1000}s for 'Add Friend' modal...`);

        try{
            const startTime = Date.now();
            await this.waitForElement(`android=${this.elements.modals.addFriend}`, timeout);

            const elapsedTime = Date.now() - startTime;
            console.log(`[MODAL] 'Add Friend' modal appeared after ${(elapsedTime/1000).toFixed(1)} seconds`);
            await this.waitForElement(`android=${this.elements.friendsScreen.doneButton}`,1000)
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

    async tapDoneButton(): Promise<void> {
        await this.tapElement(`android=${this.elements.friendsScreen.doneButton}`)
    }

    async tapCheckinTab(): Promise<void> {
        await this.tapElement(`android=${this.elements.navigation.checkinTab}`);
    }

    async isTitleCheckinCardDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.elements.checkinCard.feelingText}`);
    }

    async tapCheckinCard(): Promise<void> {
        await this.tapElement(`android=${this.elements.checkinCard.feelingText}`);
    }

    async isShareTitleModalDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.elements.shareModal.title}`);
    }

    async tapSelectAllButton(): Promise<void> {
        return await this.tapElement(`android=${this.elements.shareModal.selectAllButton}`);
    }

    async tapShareButton(): Promise<void> {
        await this.tapElement(`android=${this.elements.shareModal.shareButton}`);
    }

    async completeShareFlow(): Promise<void> {
        await this.tapFriendsTab();
        await this.tapCheckinCard();
        await this.isShareTitleModalDisplayed();
        await driver.pause(2000); // wait for the modal to stabilyze
        await this.tapSelectAllButton();
        await this.tapShareButton();
    }
}