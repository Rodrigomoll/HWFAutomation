import { BasePage } from "../base/BasePage";
import { AndroidLocators } from "../../locators/AndroidLocators";
//import { iOSLocators } from "../../locators/iOSLocators";
import { verify } from "../../helpers/testVerification";

export class HealthDataEntriesPages extends BasePage {
    private locators!: AndroidLocators; // | iOSLocators;
    //private isAndroidPlatform!: boolean;

    private elements!: {
        healthPrompt: string;
        closeButton: string;
    }

    private entryTypes = [
                'Weather', 'Sleep', 'Steps', 'Exercise', 'Meditation', 'Water', 'Caffeine', 'Alcohol'
            ];

    async init() {
        //this.isAndroidPlatform = await this.isAndroid();

        this.locators = new AndroidLocators();

        this.elements = {
            healthPrompt: await this.locators.selectValue("text", "About Health & \nLocation Data"),
            closeButton: await this.locators.selectValue("description", "Close"),
        }

        return this;
    }

    async verifyIsElementDisplayed(
        element: keyof typeof this.elements
    ): Promise<boolean> {
        return await this.isElementDisplayed(await this.locators.buildSelector(this.elements[element]));
    }

    async tapElementButton(
        button: keyof typeof this.elements,
        timeout?: number
    ): Promise<void> {
        await this.tapElement(await this.locators.buildSelector(this.elements[button]), timeout ?? null);
    }

    async healthDataEntriesFlow() {
        await this.verifyIsElementDisplayed("healthPrompt");

        await this.swipeVertical("up", 0.5);
        await driver.pause(500);

        await Promise.all(
            this.entryTypes.map(async (type) => {
                await this.isElementDisplayed(await this.locators.buildSelector(await this.locators.selectValue("text", type + " Tracking")));
            })
        );

        const toggle = await this.locators.selectValue("className", "android.view.View");

        for(let i = 6; i < 19; i+=4) {
            await this.tapElement(await this.locators.buildSelector(toggle + await this.locators.selectValue("instance", `${i}`)));
        }

        await this.swipeVertical("up", 1);
        await driver.pause(1000);
        await this.tapElement(await this.locators.buildSelector(toggle + await this.locators.selectValue("instance", "14")));
        await this.tapElement(await this.locators.buildSelector(toggle + await this.locators.selectValue("instance", "16")));

        await this.swipeVertical("up", 0.2);
        await driver.pause(1000);
        await this.tapElement(await this.locators.buildSelector(toggle + await this.locators.selectValue("instance", "19")));
        
        await this.swipeVertical("up", 0.2);
        await driver.pause(1000);
        await this.tapElement(await this.locators.buildSelector(toggle + await this.locators.selectValue("instance", "20")));
        
        await this.tapElementButton("closeButton");

        const waterIndex = this.entryTypes.findIndex(type => type === "Water");

        const firstGroup = this.entryTypes.slice(0, waterIndex + 1);
        const secondGroup = this.entryTypes.slice(waterIndex + 1);

        await Promise.all(
            firstGroup.map(async (type) => {
                await this.isElementDisplayed(await this.locators.buildSelector(await this.locators.selectValue("text", type)));
            })
        );

        await this.swipeVertical("up", 0.2);

        await Promise.all(
            secondGroup.map(async (type) => {
                await this.isElementDisplayed(await this.locators.buildSelector(await this.locators.selectValue("text", type)));
            })
        );

        await driver.pause(1000);
    }

}
