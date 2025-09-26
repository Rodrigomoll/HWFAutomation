export async function deactivateShare(locator):Promise<void>{
    await locator.tapButton("settings");

    if(locator.isAndroidPlatform) {
        await locator.tapButton("account");
    }

    await locator.tapButton("sharing");
    await locator.tapButton("notShare");

    if(await locator.verifyIsActive("alwaysAskToggle")){
        await locator.tapButton("alwaysAskToggle");
    }

    await locator.tapButton("back");

    if(locator.isAndroidPlatform) {
        await locator.tapButton("back");
        await locator.tapButton("closeButton");
    }
    else {
        locator.tapButton("back");
    }

    await driver.pause(1000);
}
// This function enables AI settings in the app by navigating through the settings menu,