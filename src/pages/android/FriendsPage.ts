import { BasePage } from "../base/BasePage";

// contains the elements from Friends tab
export class FriendsPage extends BasePage {
    private friendsScreen = {

        friendsTab : 'new UiSelector().text("Friends")',
        title: 'new UiSelector().text("Share your emotions with friends")',
        getStartedButton: 'new UiSelector().text("Get started")',
        signinTitle : 'new UiSelector().text("Create an account to invite a friend")',
        signinButton : 'new UiSelector().text("Sign in with Google")',
        doneButton : 'new UiSelector().text("Done")',
        checkinTab : 'new UiSelector().text("Check in")',
        checkinCard : 'new UiSelector().text("I\'m feeling")',
        feelingCard: 'new UiSelector().text("bored")',
        shareTitleModal : 'new UiSelector().text("Share your check-in?")',
        selectAllButton : 'new UiSelector().text("Select all")',
        shareButton : 'new UiSelector().textContains("Share with")',

        // Elements for Google Sign-in modal
        signinModalTitle : 'com.google.android.gms:id/title',
        accountEmail : 'com.google.android.gms:id/account_display_name',
        modalNotifTitle : 'com.android.permissioncontroller:id/permission_message',
        allowButton : 'com.android.permissioncontroller:id/permission_allow_button',
    };

    async tapFriendsTab(): Promise<void> {
        await this.tapElement(`android=${this.friendsScreen.friendsTab}`);
    }
    async isfriendsScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.friendsScreen.title}`);
    }

    async tapGetStartedButton(): Promise<void> {
        await this.tapElement(`android=${this.friendsScreen.getStartedButton}`);
    }

    async isSigninTitleDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.friendsScreen.signinTitle}`);
    }
    
    async tapSigninButton(): Promise<void> {
        await this.tapElement(`android=${this.friendsScreen.signinButton}`);
    }

    async isSigninModalDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=new UiSelector().resourceId("com.google.android.gms:id/title")`);
    }

    async tapEmailAccount(): Promise<void>{
        await this.tapElement(`android=new UiSelector().resourceId("com.google.android.gms:id/account_display_name")`);
    }

    async isModalNotifDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_message")`);
    }

    async tapAllowButton(): Promise<void> {
        await this.tapElement(`android=new UiSelector().resourceId("com.android.permissioncontroller:id/permission_allow_button")`);
    }

    async tapDoneButton(): Promise<void> {
        await this.tapElement(`android=${this.friendsScreen.doneButton}`)
    }

    async tapCheckinTab(): Promise<void> {
        await this.tapElement(`android=${this.friendsScreen.checkinTab}`);
    }

    async isTitleCheckinCardDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.friendsScreen.checkinCard}`);
    }

    async tapCheckinCard(): Promise<void> {
        await this.tapByText("I\'m feeling");
    }

    async isShareTitleModalDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.friendsScreen.shareTitleModal}`);
    }

    async tapSelectAllButton(): Promise<void> {
        return await this.tapElement(`android=${this.friendsScreen.selectAllButton}`);
    }

    async tapShareButton(): Promise<void> {
        await this.tapElement(`android=${this.friendsScreen.shareButton}`);
    }
}