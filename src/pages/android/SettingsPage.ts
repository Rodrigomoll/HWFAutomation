import { BasePage } from "../base/BasePage";


export class SettingsPage extends BasePage {
    private settingsMenu = {
        settingsButton: '~Settings',
        title: 'new UiSelector().text("Settings")',
        aiSettingsOption: 'new UiSelector().text("AI settings")',
        aiEnableToggleButton: 'new UiSelector().className("android.view.View").instance(4)',//This selector could be changed to a better name
        reflectModalTitle: 'new UiSelector().text("Introducing")',
        getStartedButton: 'new UiSelector().text("Get started")',
        aiEnableFeatureTitle: 'new UiSelector().text("Enable AI Features in How We Feel")',
        enableAIFeaturesButton: 'new UiSelector().text("Enable AI Features")',
        backButton: '~Back',
        closeButton: '~Close'
    }

    async tapSettingsButton(): Promise<void> {
        await this.tapElement(this.settingsMenu.settingsButton);
    }

    async isSettingsScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.settingsMenu.title}`);
    }

    async tapAISettingsOption(): Promise<void> {
        await this.tapElement(`android=${this.settingsMenu.aiSettingsOption}`)
    }

    async tapEnableAIToggleButton(): Promise<void> {
        await this.tapElement(`android=${this.settingsMenu.aiEnableToggleButton}`);
    }

    async isReflectModalDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.settingsMenu.reflectModalTitle}`);
    }

    async tapGetStartedButton(): Promise<void> {
        await this.tapElement(`android=${this.settingsMenu.getStartedButton}`);
    }

    async isAIEnableFeatureTitleDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.settingsMenu.aiEnableFeatureTitle}`);
    }

    async tapEnableAIFeaturesButton(): Promise<void> {
        await this.tapElement(`android=${this.settingsMenu.enableAIFeaturesButton}`);
    }
    async tapBackButton(): Promise<void> {
        await this.tapElement(this.settingsMenu.backButton);
    }

    async tapCloseButton(): Promise<void> {
        await this.tapElement(this.settingsMenu.closeButton);
    }
}
