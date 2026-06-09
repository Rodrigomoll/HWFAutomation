import { assertAllTrue } from "../../helpers/assertAllTrue";
import { SettingsPage } from "../SettingsPage";

/**
 * Android implementation of the Settings page.
 * Defines Android-specific locators and behavior.
 */
export class AndroidSettingsPage extends SettingsPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,

            sharing: {type: "text", value: "Sharing"},
            notShare: { type: "className", value: "android.view.View", instance: 6 },
            alwaysAskToggle: {type: "className", value: "android.view.View", instance: 11},
            back: { type: "description", value: "Back" },
            settingsPrompt: { type: "text", value: "Settings" },
            account: {type: "className", value: "android.view.View", instance: 4},
            aiToggle: { type: "className", value: "android.view.View", instance: 4 },
            aiEnablePrompt: { type: "text", value: "Enable AI Features in How We Feel" },
            enableAI: { type: "text", value: "Enable AI Features" },
            uniqueText: { type: "text", value: "Unique feelings" },
        }
    }

    async selectAccount():Promise<void>{
        if(await this.verifyIsElementDisplayed("uniqueText", 5000)){
            await this.tapButton("closeButton");
        }
        
        await this.tapButton("account", 2000);
    }

    async tapBack(){
        await this.tapButton("back");
        await this.tapButton("closeButton");
    }

    async tapClose(){
        await this.tapButton("closeButton");
        await this.tapBack();
    }

    async enableAItoggle(){
        await this.tapButton("aiToggle");
        await assertAllTrue(this.verifyIsElementDisplayed("reflectModal"));
        await this.tapButton("getStarted");
        await assertAllTrue(this.verifyIsElementDisplayed("aiEnablePrompt"));
        await this.tapButton("enableAI");

        await this.tapBack();
    }

}