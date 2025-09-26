import { BasePage } from "../pages/base/BasePage";
import { AndroidLocators } from "../locators/AndroidLocators";
import { iOSLocators } from "../locators/iOSLocators";

export async function whichPlatform() : Promise<AndroidLocators | iOSLocators> {
    const basePage = new BasePage();

    if(await basePage.isAndroid()){
        return new AndroidLocators();
    }
    else {
        return new iOSLocators();
    }

}