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
        // try {
        //     const isModalNotifDisplayed = await friendsPage.isModalNotifDisplayed();
        //     if( isModalNotifDisplayed) {
        //         await friendsPage.tapAllowButton();
        //     }
        // }
        // catch (error){
        //     console.error("Modal not displaying:", error);       
        // }
        await friendsPage.tapDoneButton();
        await friendsPage.tapCheckinTab();
    }
    catch (error) {
        console.error("Error during login flow:", error);
    }
}