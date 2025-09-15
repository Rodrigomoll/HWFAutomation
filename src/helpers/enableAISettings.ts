import { SettingsPage } from "../pages/flows/SettingsPage";
import { verify } from "./testVerification";


export async function enableAISettings():Promise<void>{
    const settingsPage = await new SettingsPage().init();

    try{
        await settingsPage.tapElementButton("settingsButton");
        await verify(settingsPage.verifyIsElementDisplayed("settingsPrompt"));

        await settingsPage.tapElementButton("aiOption");
        await driver.pause(1000);
        await settingsPage.tapElementButton("aiToggle");

        await verify(settingsPage.verifyIsElementDisplayed("reflectModal"));
        await settingsPage.tapElementButton("getStartedButton");

        await verify(settingsPage.verifyIsElementDisplayed("aiEnablePrompt"));
        await settingsPage.tapElementButton("enableAIButton");

        await settingsPage.tapElementButton("backButton");
        await settingsPage.tapElementButton("closeButton");
    }
    catch (error){
        console.error("Error during AI settings enable flow:", error);
    }
}
// This function enables AI settings in the app by navigating through the settings menu,