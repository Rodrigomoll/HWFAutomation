import { SettingsPage } from "../../../pages/android/SettingsPage";
import { verify } from "./test-verification";


export async function enableAISettings():Promise<void>{
    const settingsPage = new SettingsPage();

    try{
        await settingsPage.tapSettingsButton();
        await verify(settingsPage.isSettingsScreenDisplayed());

        await settingsPage.tapAISettingsOption();
        await settingsPage.tapEnableAIToggleButton();

        await verify(settingsPage.isReflectModalDisplayed());
        await settingsPage.tapGetStartedButton();

        await verify(settingsPage.isAIEnableFeatureTitleDisplayed());
        await settingsPage.tapEnableAIFeaturesButton();

        await settingsPage.tapBackButton();
        await settingsPage.tapCloseButton();
    }
    catch (error){
        console.error("Error during AI settings enable flow:", error);
    }
}
// This function enables AI settings in the app by navigating through the settings menu,