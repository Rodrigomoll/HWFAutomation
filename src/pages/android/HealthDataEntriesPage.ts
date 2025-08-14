import { BasePage } from "../base/BasePage";

export class HealthDataEntriesPages extends BasePage {

    private readonly elements = {
        screen : {
            title: 'new UiSelector().text("About Health & \nLocation Data")',
        },
        trackingTitles: {
            weather: 'new UiSelector().text("Weather Tracking")',
            sleep: 'new UiSelector().text("Sleep Tracking")',
            steps: 'new UiSelector().text("Steps Tracking")',
            exercise: 'new UiSelector().text("Exercise Tracking")',
            meditation: 'new UiSelector().text("Meditation Tracking")',
            water: 'new UiSelector().text("Water Tracking")',
            caffeine: 'new UiSelector().text("Caffeine Tracking")',
            alcohol: 'new UiSelector().text("Alcohol Tracking")'
        },
        toggles: {
            weather: 'new UiSelector().className("android.view.View").instance(6)',
            sleep: 'new UiSelector().className("android.view.View").instance(8)',
            steps: 'new UiSelector().className("android.view.View").instance(10)',
            exercise: 'new UiSelector().className("android.view.View").instance(12)',
            meditation: 'new UiSelector().className("android.view.View").instance(14)',
            water: 'new UiSelector().className("android.view.View").instance(16)',
            caffeine: 'new UiSelector().className("android.view.View").instance(18)',
            alcohol: 'new UiSelector().className("android.view.View").instance(20)',
        },
        enabledEntries: {
            weather: 'new UiSelector().text("Weather")',
            sleep: 'new UiSelector().text("Sleep")',
            steps: 'new UiSelector().text("Steps")',
            exercise: 'new UiSelector().text("Exercise")',
            meditation: 'new UiSelector().text("Meditation")',
            water: 'new UiSelector().text("Water")',
            caffeine: 'new UiSelector().text("Caffeine")',
            alcohol: 'new UiSelector().text("Alcohol")'
        },
        buttons: {
            close: '~Close'
        }
    };

    private readonly trackingTitleOrder = [
        'weather', 'sleep', 'steps', 'exercise', 'meditation', 'water', 'caffeine', 'alcohol'
    ]as const;

    private readonly toggleOrder = [
        'alcohol', 'caffeine', 'water', 'meditation', 'exercise', 'steps', 'sleep', 'weather'
    ]as const; 

    private readonly enabledEntriesFirstGroup = [
        'weather', 'sleep', 'steps', 'exercise', 'meditation', 'water'
    ] as const;

    private readonly enabledEntriesSecondGroup = [
        'caffeine', 'alcohol'
    ] as const;

    async areHealthDataEntriesScreen(): Promise<boolean> {
        const titleDisplayed = await this.isElementDisplayed(`android=${this.elements.screen.title}`);
        await this.swipeUp(0.5);
        await driver.pause(500);

        const trackingResults = await Promise.all(
            this.trackingTitleOrder.map(type => 
                this.isElementDisplayed(`android=${this.elements.trackingTitles[type]}`)
            )
        );

        return titleDisplayed && trackingResults.every(result => result);
    }

    async isHealthDataEntriesEnabled(): Promise<boolean> {
        const firstGroupResults = await Promise.all(
            this.enabledEntriesFirstGroup.map(type =>
                this.isElementDisplayed(`android=${this.elements.enabledEntries[type]}`)
            )
        );
        await this.swipeUp(0.2);

        const secondGroupResults = await Promise.all(
            this.enabledEntriesSecondGroup.map(type => 
                this.isElementDisplayed(`android=${this.elements.enabledEntries[type]}`)
            )
        );
        await driver.pause(1000);

        return [...firstGroupResults, ...secondGroupResults].every(result => result);
    }

    async tapWeatherToggle(): Promise<void>{
        await this.tapElement(`android=${this.elements.toggles.weather}`);
    }

    async tapSleepToggle(): Promise<void>{
        await this.tapElement(`android=${this.elements.toggles.sleep}`);
    }

    async tapStepsToggle(): Promise<void>{
        await this.tapElement(`android=${this.elements.toggles.steps}`);
    }

    async tapExerciseToggle(): Promise<void>{
        await this.tapElement(`android=${this.elements.toggles.exercise}`);
    }

    async tapMeditationToggle(): Promise<void>{
        await this.tapElement(`android=${this.elements.toggles.meditation}`);
    }

    async tapWaterToggle(): Promise<void>{
        await this.tapElement(`android=${this.elements.toggles.water}`);
    }

    async tapCaffeineToggle(): Promise<void>{
        await this.tapElement(`android=${this.elements.toggles.caffeine}`);
    }

    async tapAlcoholToggle(): Promise<void>{
        await this.tapElement(`android=${this.elements.toggles.alcohol}`);
    }

    async enableHealthDataEntries(): Promise<void> {
        console.log("Enabling Health Data Entries...");
        for(const toggleType of this.toggleOrder){
            console.log(`Toggling ${toggleType}...`);

            switch(toggleType){
                case 'alcohol':
                    await this.tapAlcoholToggle();
                    break;
                case 'caffeine':
                    await this.tapCaffeineToggle();
                    break;
                case 'water':
                    await this.tapWaterToggle();
                    break;
                case 'meditation':
                    await this.tapMeditationToggle();
                    break;
                case 'exercise':
                    await this.tapExerciseToggle();
                    break;
                case 'steps':
                    await this.tapStepsToggle();
                    break;
                case 'sleep':
                    await this.tapSleepToggle();
                    break;
                case 'weather':
                    await this.tapWeatherToggle();
                    break;
                }
            }
        console.log("Health Data Entries toggled successfully.");
    }
    
    async tapCloseButton(): Promise<void>{
        await this.tapElement(this.elements.buttons.close);
    }
    async configureHealthDataEntries(): Promise<void> {
        await this.enableHealthDataEntries();
        await this.tapCloseButton();
    }
}
