import { FriendsPage } from "../pages/flows/FriendsPage";

export async function deactivateShare():Promise<void>{
    const friendsPage = await new FriendsPage().init();

    try{
        await friendsPage.tapElementButton("friendsPrompt");
        await friendsPage.tapElementButton("feelingPrompt");

        if(await friendsPage.verifyIsActive("alwaysAskToggle")){
            await friendsPage.tapElementButton("alwaysAskToggle");
        }

        await friendsPage.tapElementButton("closeButton");
        await driver.pause(1000);
        await friendsPage.tapElementButton("checkinPrompt");
        
    }
    catch (error){
        console.error("Error during deactivating Share emotion flow:", error);
    }
}
// This function enables AI settings in the app by navigating through the settings menu,