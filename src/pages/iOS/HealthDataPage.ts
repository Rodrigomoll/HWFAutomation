import { HealthDataPage } from "../HealthDataPage";
import { assertAllTrue } from "../../helpers/assertAllTrue";

/**
 * iOS implementation of the Health Data page.
 * Defines iOS-specific locators and behavior.
 */
export class iOSHealthDataPage extends HealthDataPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,
            attachment: { type: "text", value: "Attachment" },
            filter: { type: "text", value: "Filter" },
            healthData: { type: "text", value: "Health Data" },
        }
    }

    async selectHealthData() {
        this.entryTypes = [
            'Weather', 'Sleep', 'Exercise', 'Meditation', 'Steps', 'Cycle', 'Alcohol', 'Water', 'Caffeine'
        ];

        for (const entry of this.entryTypes) {
            await assertAllTrue(this.verifyIsElementDisplayed({type: "text", value: entry}));
            await this.tapButton({type: "component", value: `(//XCUIElementTypeSwitch[@value="0"])[1]`});

            await this.swipeVertical("up", 0.2);
            await driver.pause(500);
        }

        await this.tapButton({type: "component", value: `(//XCUIElementTypeNavigationBar[@name="HowWeFeel_Moodmeter.CheckInOptionsView"])[3]/XCUIElementTypeButton`});
        await driver.pause(500);
        await this.tapButton("attachment");

        await Promise.all(
            this.entryTypes.map(async (entry) => {
                await assertAllTrue(this.verifyIsElementDisplayed({type: "text", value: entry}));
            })
        );
    }

    async completeHealthData(){
        await this.tapButton("filter");
        await this.tapButton("healthData");

        await this.selectHealthData();

        await this.tapButton("complete");
        await driver.pause(2000);
    }

}
