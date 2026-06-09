import { HealthDataPage } from "../HealthDataPage";
import { assertAllTrue } from "../../helpers/assertAllTrue";

/**
 * Android implementation of the Health Data page.
 * Defines Android-specific locators and behavior.
 */
export class AndroidHealthDataPage extends HealthDataPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,
            healthPrompt: { type: "text", value: "About Health & \nLocation Data" },
            paperClipIcon: { type: "className", value: "android.widget.Button", instance: 0 },
        }
    }

    async selectHealthData() {
        await assertAllTrue(this.verifyIsElementDisplayed("healthPrompt"));

        this.entryTypes = [
            'Weather', 'Sleep', 'Steps', 'Exercise', 'Meditation', 'Water', 'Caffeine', 'Alcohol'
        ];

        let i = 1;
        let toggle;
        for (const entry of this.entryTypes) {
            const label = `${entry} Tracking`;

            await assertAllTrue(this.verifyIsElementDisplayed({ type: "text", value: label }));

            toggle = await $(`//android.widget.TextView[@text="${label}"]/following-sibling::android.view.View`);
            await this.tapElement(toggle);

            await this.swipeVertical("up", 0.2);
            await driver.pause(500);
        }
        
        await this.tapButton("closeButton");
        await driver.pause(1000);

        for (const entry of this.entryTypes) {
            await assertAllTrue(this.verifyIsElementDisplayed({type: "text", value: entry}));
            await this.swipeVertical("up", 0.1);
        };
    }

    async completeHealthData(){
        await assertAllTrue(this.verifyIsElementDisplayed("dataPrompt"));
        await this.tapButton("paperClipIcon");

        await this.selectHealthData();

        await this.tapButton("save");
    }


}
