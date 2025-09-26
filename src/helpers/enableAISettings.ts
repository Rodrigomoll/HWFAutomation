import { verify } from "./testVerification";

export async function enableAISettings(locator):Promise<void>{
    try{
        await locator.tapButton("settings");
        await verify(locator.verifyIsElementDisplayed("settingsPrompt"));

        await locator.tapButton("aiOption");
        await driver.pause(1000);

        if(locator.isAndroidPlatform) {
            await locator.tapButton("aiToggle");
            await verify(locator.verifyIsElementDisplayed("reflectModal"));
            await locator.tapButton("getStarted");
            await verify(locator.verifyIsElementDisplayed("aiEnablePrompt"));
            await locator.tapButton("enableAI");
        }

        await locator.tapButton("back");

        if(locator.isAndroidPlatform) await locator.tapButton("closeButton");
        else locator.tapButton("back");
    }
    catch (error){
        console.error("Error during AI settings enable flow:", error);
    }
}
// This function enables AI settings in the app by navigating through the settings menu,