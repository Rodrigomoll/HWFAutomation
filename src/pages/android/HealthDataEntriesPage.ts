import { BasePage } from "../base/BasePage";

export class HealthDataEntriesPages extends BasePage {
    private healthDataEntriesScreen = {
        title: 'new UiSelector().text("About Health & \nLocation Data")',
        weatherTitle: 'new UiSelector().text("Weather Tracking")',
        sleepTitle: 'new UiSelector().text("Sleep Tracking")',
        stepsTitle: 'new UiSelector().text("Steps Tracking")',
        exerciseTitle: 'new UiSelector().text("Exercise Tracking")',
        meditationTitle: 'new UiSelector().text("Meditation Tracking")',
        waterTitle: 'new UiSelector().text("Water Tracking")',
        caffeineTitle: 'new UiSelector().text("Caffeine Tracking")',
        alcoholTitle: 'new UiSelector().text("Alcohol Tracking")'
    }

    private trackingToggles = {
        weatherToggle : 'new UiSelector().className("android.view.View").instance(6)',
        sleepToggle : 'new UiSelector().className("android.view.View").instance(8)',
        stepsToggle : 'new UiSelector().className("android.view.View").instance(10)',
        exerciseToggle : 'new UiSelector().className("android.view.View").instance(12)',
        meditationToggle : 'new UiSelector().className("android.view.View").instance(14)',
        waterToggle : 'new UiSelector().className("android.view.View").instance(16)',
        caffeineToggle : 'new UiSelector().className("android.view.View").instance(18)',
        alcoholToggle : 'new UiSelector().className("android.view.View").instance(20)',
        closeButton: '~Close'
    }

    private healthDataEntriesEnabled = {
        weatherEntry : 'new UiSelector().text("Weather")',
        sleepEntry : 'new UiSelector().text("Sleep")',
        stepsEntry : 'new UiSelector().text("Steps")',
        exerciseEntry : 'new UiSelector().text("Exercise")',
        meditationEntry : 'new UiSelector().text("Meditation")',
        waterEntry : 'new UiSelector().text("Water")',
        caffeineEntry : 'new UiSelector().text("Caffeine")',
        alcoholEntry : 'new UiSelector().text("Alcohol")'
    }

    async areHealthDataEntriesScreen(): Promise<boolean>{
        const titleDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesScreen.title}`);
        await this.swipeUp(0.5);
        const weatherTitleDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesScreen.weatherTitle}`);
        const sleepTitleDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesScreen.sleepTitle}`);
        const stepsTitleDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesScreen.stepsTitle}`);
        const exerciseTitleDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesScreen.exerciseTitle}`);
        const meditationTitleDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesScreen.meditationTitle}`);
        const waterTitleDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesScreen.waterTitle}`);
        const caffeineTitleDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesScreen.caffeineTitle}`);
        const alcoholTitleDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesScreen.alcoholTitle}`);
        return titleDisplayed && weatherTitleDisplayed && sleepTitleDisplayed && stepsTitleDisplayed &&
            exerciseTitleDisplayed && meditationTitleDisplayed && waterTitleDisplayed &&
            caffeineTitleDisplayed && alcoholTitleDisplayed;
    }

    async isHealthDataScreenDisplayed(): Promise<boolean>{
        const weatherEntryDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesEnabled.weatherEntry}`);
        const sleepEntryDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesEnabled.sleepEntry}`);
        const stepsEntryDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesEnabled.stepsEntry}`);
        const exerciseEntryDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesEnabled.exerciseEntry}`);
        const meditationEntryDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesEnabled.meditationEntry}`);
        const waterEntryDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesEnabled.waterEntry}`);
        await this.swipeUp(0.2);
        const caffeineEntryDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesEnabled.caffeineEntry}`);
        const alcoholEntryDisplayed = await this.isElementDisplayed(`android=${this.healthDataEntriesEnabled.alcoholEntry}`);
        return weatherEntryDisplayed && sleepEntryDisplayed && stepsEntryDisplayed && exerciseEntryDisplayed &&
            meditationEntryDisplayed && waterEntryDisplayed && caffeineEntryDisplayed && alcoholEntryDisplayed;
    }

    async tapWeatherToggle(): Promise<void>{
        await this.tapElement(`android=${this.trackingToggles.weatherToggle}`);
    }

    async tapSleepToggle(): Promise<void>{
        await this.tapElement(`android=${this.trackingToggles.sleepToggle}`);
    }

    async tapStepsToggle(): Promise<void>{
        await this.tapElement(`android=${this.trackingToggles.stepsToggle}`);
    }

    async tapExerciseToggle(): Promise<void>{
        await this.tapElement(`android=${this.trackingToggles.exerciseToggle}`);
    }

    async tapMeditationToggle(): Promise<void>{
        await this.tapElement(`android=${this.trackingToggles.meditationToggle}`);
    }

    async tapWaterToggle(): Promise<void>{
        await this.tapElement(`android=${this.trackingToggles.waterToggle}`);
    }

    async tapCaffeineToggle(): Promise<void>{
        await this.tapElement(`android=${this.trackingToggles.caffeineToggle}`);
    }

    async tapAlcoholToggle(): Promise<void>{
        await this.tapElement(`android=${this.trackingToggles.alcoholToggle}`);
    }

    async enableHealthDataEntries(): Promise<void> {
        await this.tapAlcoholToggle();
        await this.tapCaffeineToggle();
        await this.tapWaterToggle();
        await this.tapMeditationToggle();
        await this.tapExerciseToggle();
        await this.tapStepsToggle();
        await this.tapSleepToggle();
        await this.tapWeatherToggle();
    }
    
    async tapCloseButton(): Promise<void>{
        await this.tapElement(this.trackingToggles.closeButton);
    }
}
