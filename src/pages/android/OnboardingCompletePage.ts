import { BasePage } from "../base/BasePage";

export class OnboardingCompletePage extends BasePage{
    private firstSetupScreen = {
        title: 'new UiSelector().text("Before jumping in,\nlet’s explore why you’re here.")',
        firstOption: 'new UiSelector().text("I want to feel more positive around others")',
        continueButton: 'new UiSelector().text("Continue")'
    }

    private secondSetupScreen = {
        title: 'new UiSelector().text("Great! How We Feel will help you:")',
        continueButton: 'new UiSelector().text("Continue")'
    }

    private thirdSetupScreen = {
        thirdProgressBar: 'new UiSelector().text("3/10")',
        title: 'new UiSelector().text("Let’s do your \nfirst check in")',
        highEnergyPleasantButton: 'new UiSelector().text("High Energy\nPleasant")'
    }

    private moodmeterSetupScreen = {
        pleasedEmotion: 'new UiSelector().text("Pleased")',
    }

    private fourthSetupScreen = {
        fourthProgressBar: 'new UiSelector().text("4/10")',
        title: 'new UiSelector().text("Describe what might be causing you to feel\npleased …")',
        textInput: 'new UiSelector().className("android.widget.ScrollView")',
        nextButton: 'new UiSelector().description("Next")'
    }

    private fifthSetupScreen = {
        fifthProgressBar: 'new UiSelector().text("5/10")',
        title: 'new UiSelector().text("First check-in complete")',
        continueButton: 'new UiSelector().text("Continue")'
    }

    private sixthSetupScreen = {
        sixthProgressBar: 'new UiSelector().text("6/10")',
        title: 'new UiSelector().text("How often do you want to check in?")',
        twicePerDay: 'new UiSelector().text("2 per day (recommended)")',
        continueButton: 'new UiSelector().text("Continue")'
    }

    private seventhSetupScreen = {
        seventhProgressBar: 'new UiSelector().text("7/10")',
        title: 'new UiSelector().text("What time do you want to be reminded?")',
        continueButton: 'new UiSelector().text("Continue")'
    }

    private alarmAndRemindersDialogScreen = {
        title: 'new UiSelector().text("Special App Access required")',
        description: 'new UiSelector().text("Alarms & Reminders access is required in order to set an exact reminder time, otherwise an approximate reminder time will be used.")',
        settingsButton: 'new UiSelector().text("Settings")',
        howWeFeelButton: 'new UiSelector().text("How We Feel")',
        allowSettingsButton: 'new UiSelector().text("Allow setting alarms and reminders")',
        navigateBackButton: '~Navigate up',
    }
    private eighthSetupScreen = {
        eighthProgressBar: 'new UiSelector().text("8/10")',
        title: 'new UiSelector().text("Check in anytime with the How We Feel widget")',
        continueButton: 'new UiSelector().text("Continue")'
    }

    private widgetModalScreen = {
        title: 'new UiSelector().text("Quick check in")',
        subTitle: 'new UiSelector().text("Check in anytime with the How We Feel Widget")',
        addButton: 'new UiSelector().text("Add widget")',
        addHomeScreen: 'new UiSelector().text("Add to home screen")'
    }

    private ninethSetupScreen = {
        ninethProgressBar: 'new UiSelector().text("9/10")',
        title: 'new UiSelector().text("Finally, let\'s try a strategy")',
        notNowButton: 'new UiSelector().text("Not right now")'
    }

    private checkinScreen = {
        messageWelcome: 'new UiSelector().text("Want to change how you feel?\nExplore tools for emotional\nregulation!")'
    }

    async isFirstSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.firstSetupScreen.title}`);
    }

    async tapFirstOption(): Promise<void> {
        await this.tapElement(`android=${this.firstSetupScreen.firstOption}`);
    }

    async tapContinueFirstScreen(): Promise<void> {
        await this.tapElement(`android=${this.firstSetupScreen.continueButton}`);
    }

    async isSecondSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.secondSetupScreen.title}`);
    }

    async tapContinueSecondScreen(): Promise<void> {
        await this.tapElement(`android=${this.secondSetupScreen.continueButton}`);
    }

    async checkThirdBar(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.thirdSetupScreen.thirdProgressBar}`)
    }

    async isThirdSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.thirdSetupScreen.title}`);
    }
    async tapHighEnergyPleasantButton(): Promise<void> {
        await this.tapElement(`android=${this.thirdSetupScreen.highEnergyPleasantButton}`);
    }

    async tapOnPleasedEmotion(): Promise<void> {
        await this.tapElement(`android=${this.moodmeterSetupScreen.pleasedEmotion}`);
    }

    async checkFourthBar(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.fourthSetupScreen.fourthProgressBar}`)
    }
    async isFourthSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.fourthSetupScreen.title}`);
    }

    async enterTextJournal(text: string): Promise<void> {
        await this.enterText(`android=${this.fourthSetupScreen.textInput}`, text, true);
    }

    async tapNextButton(): Promise<void> {
        await this.tapElement(`android=${this.fourthSetupScreen.nextButton}`);
    }

    async checkFifthBar(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.fifthSetupScreen.fifthProgressBar}`);
    }

    async isFifthSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.fifthSetupScreen.title}`);
    }

    async tapContinueFifthScreen(): Promise<void> {
        await this.tapElement(`android=${this.fifthSetupScreen.continueButton}`);
    }

    async checkSixthBar(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.sixthSetupScreen.sixthProgressBar}`);
    }

    async isSixthSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.sixthSetupScreen.title}`);
    }

    async tapTwicePerDay(): Promise<void> {
        await this.tapElement(`android=${this.sixthSetupScreen.twicePerDay}`);
    }

    async tapContinueSixthScreen(): Promise<void> {
        await this.tapElement(`android=${this.sixthSetupScreen.continueButton}`);
    }

    async checkSeventhBar(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.seventhSetupScreen.seventhProgressBar}`);
    }

    async isSeventhSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.seventhSetupScreen.title}`);
    }

    async isAlarmAndRemindersDialogScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(`android=${this.alarmAndRemindersDialogScreen.title}`,3000);
    }

    async isDialogDescriptionDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.alarmAndRemindersDialogScreen.description}`);
    }

    async tapSettingsButton(): Promise<void> {
        await this.tapElement(`android=${this.alarmAndRemindersDialogScreen.settingsButton}`);
        await this.tapElement(`android=${this.alarmAndRemindersDialogScreen.howWeFeelButton}`);
        await this.tapElement(`android=${this.alarmAndRemindersDialogScreen.allowSettingsButton}`);
    }
    async tapNavigateBackButton(): Promise<void> {
        await this.tapElement(this.alarmAndRemindersDialogScreen.navigateBackButton);
    }
    
    async tapContinueSeventhScreen(): Promise<void> {
        await this.tapElement(`android=${this.seventhSetupScreen.continueButton}`);
    }

    async checkEighthBar(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.eighthSetupScreen.eighthProgressBar}`);
    }

    async isEighthSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.eighthSetupScreen.title}`);
    }

    async tapContinueEighthScreen(): Promise<void> {
        await this.tapElement(`android=${this.eighthSetupScreen.continueButton}`);
    }

    async isWidgetModalScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.widgetModalScreen.title}`);
    }
    async isWidgetModalSubtitleDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.widgetModalScreen.subTitle}`);
    }

    async tapAddWidgetButton(): Promise<void> {
        await this.tapElement(`android=${this.widgetModalScreen.addButton}`);
    }

    async tapAddHomeScreenButton(): Promise<void> {
        await this.tapElement(`android=${this.widgetModalScreen.addHomeScreen}`);
    }

    async checkNinethBar(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.ninethSetupScreen.ninethProgressBar}`);
    }
    async isNinethSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.ninethSetupScreen.title}`);
    }

    async tapNotNowButton(): Promise<void> {
        await this.tapElement(`android=${this.ninethSetupScreen.notNowButton}`);
    }

    async isMessageDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.checkinScreen.messageWelcome}`);
    }

    async tapScreenCheckin(): Promise<void> {
        await this.tapElement(`android=${this.checkinScreen.messageWelcome}`);
    }
}