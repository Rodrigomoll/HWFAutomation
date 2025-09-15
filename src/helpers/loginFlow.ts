import { FriendsPage } from "../pages/flows/FriendsPage";
import { verify } from "./testVerification";


export async function doLoginFlow():Promise<void> {
    const friendsPage = await new FriendsPage().init();

    try{
        await friendsPage.tapElementButton("friendsPrompt");
        await verify(friendsPage.verifyIsElementDisplayed("sharePrompt"));

        await friendsPage.tapElementButton("getStartedButton");
        await verify(friendsPage.verifyIsElementDisplayed("signInPrompt"));

        await friendsPage.tapElementButton("signInButton");
        await verify(friendsPage.verifyIsElementDisplayed("signInModal"));

        await friendsPage.tapElementButton("accountEmail");
        await friendsPage.waitForAddFriendModal();

        await friendsPage.tapElementButton("doneButton");
        await friendsPage.tapElementButton("checkinPrompt");
    }
    catch (error) {
        console.error("Error during login flow:", error);
        throw error;
    }
}