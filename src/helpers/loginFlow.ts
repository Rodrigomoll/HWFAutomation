import { verify } from "./testVerification";

export async function doLoginFlow(locator):Promise<void> {
    try{
        await locator.tapButton("friends");
        await verify(locator.verifyIsElementDisplayed("sharePrompt"));

        await locator.tapButton("getStarted");
        await verify(locator.verifyIsElementDisplayed("signInPrompt"));

        await locator.tapButton("signIn");

        if(locator.isAndroidPlatform) await verify(locator.verifyIsElementDisplayed("signInModal"));

        await locator.tapButton("accountEmail");
        
        if(locator.isAndroidPlatform) {
            await driver.pause(2000);
            await locator.verifyIsElementDisplayed("addFriendPrompt", 6000);
            await locator.tapButton("done");
        }
        else {
            await locator.tapButton("continue");
        }

        await locator.tapButton("checkin");
    }
    catch (error) {
        console.error("Error during login flow:", error);
        throw error;
    }
}