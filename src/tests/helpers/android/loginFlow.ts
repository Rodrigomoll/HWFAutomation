import { FriendsPage } from "../../../pages/android/FriendsPage";
import { verify } from "./test-verification";


export async function doLoginFlow():Promise<void> {
    const friendsPage = new FriendsPage();

    try{
        await friendsPage.tapFriendsTab();
        await verify(friendsPage.isfriendsScreenDisplayed());

        await friendsPage.tapGetStartedButton();
        await verify(friendsPage.isSigninTitleDisplayed());

        await friendsPage.tapSigninButton();
        await verify(friendsPage.isSigninModalDisplayed());

        await friendsPage.tapEmailAccount();
        await friendsPage.waitForModalAddFriend();

        await friendsPage.tapDoneButton();
        await friendsPage.tapCheckinTab();
    }
    catch (error) {
        console.error("Error during login flow:", error);
        throw error;
    }
}