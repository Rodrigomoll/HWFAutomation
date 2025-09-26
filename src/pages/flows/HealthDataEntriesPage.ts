import { verify } from "../../helpers/testVerification";

export class HealthDataEntriesPages {
    public entryTypes; 

    async healthDataEntriesFlowAndroid(locator) {
        await locator.verifyIsElementDisplayed("healthPrompt");

        await locator.swipeVertical("up", 0.5);
        await driver.pause(500);

        this.entryTypes = [
            'Weather', 'Sleep', 'Steps', 'Exercise', 'Meditation', 'Water', 'Caffeine', 'Alcohol'
        ];

        await Promise.all(
            this.entryTypes.map(async (type) => {
                await locator.isElementDisplayed({type: "text", value: type + " Tracking"});
            })
        );

        for(let i = 6; i < 19; i+=4) {
            await locator.tapButton({type: "className", value: "android.view.View", instance: i});
        }

        await locator.swipeVertical("up", 1);
        await driver.pause(1000);
        await locator.tapButton({type: "className", value: "android.view.View", instance: 14});
        await locator.tapButton({type: "className", value: "android.view.View", instance: 16});

        await locator.swipeVertical("up", 0.2);
        await driver.pause(1000);
        await locator.tapButton({type: "className", value: "android.view.View", instance: 19});
        
        await locator.swipeVertical("up", 0.2);
        await driver.pause(1000);
        await locator.tapButton({type: "className", value: "android.view.View", instance: 20});
        
        await locator.tapButton("closeButton");

        const waterIndex = this.entryTypes.findIndex(type => type === "Water");

        const firstGroup = this.entryTypes.slice(0, waterIndex + 1);
        const secondGroup = this.entryTypes.slice(waterIndex + 1);

        await Promise.all(
            firstGroup.map(async (type) => {
                await locator.verifyIsElementDisplayed({type: "text", value: type});
            })
        );

        await locator.swipeVertical("up", 0.2);

        await Promise.all(
            secondGroup.map(async (type) => {
                await locator.verifyIsElementDisplayed({type: "text", value: type});
            })
        );

        await driver.pause(1000);
    }

    async healthDataEntriesFlowIOS(locator) {
        this.entryTypes = [
            'Weather', 'Sleep', 'Exercise', 'Meditation', 'Steps', 'Cycle', 'Alcohol', 'Water', 'Caffeine'
        ];

        for(let i = 1; i<10; i++) {
            await locator.verifyIsElementDisplayed({type: "text", value: this.entryTypes[i-1]});
            await locator.tapButton({type: "component", value: `(//XCUIElementTypeSwitch[@value="0"])[1]`});

            await locator.swipeVertical("up", 0.2);
            await driver.pause(500);
        }

        await locator.tapButton({type: "component", value: `(//XCUIElementTypeNavigationBar[@name="HowWeFeel_Moodmeter.CheckInOptionsView"])[3]/XCUIElementTypeButton`});
        await driver.pause(500);
        await locator.tapButton("attachment");

        await Promise.all(
            this.entryTypes.map(async (entry) => {
                await locator.verifyIsElementDisplayed({type: "text", value: entry});
            })
        );
    }

}
