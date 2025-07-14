import { BasePage } from "../base/BasePage";

export class OnboardingCompletePage extends BasePage{
    private firstSetupScreen = {
        title: "~Before jumping in,\nlet's explore why you're here.",
        firstOption: '~I want to feel more positive around others',
        continueButton: '//XCUIElementTypeStaticText[@name="Continue"]'
    }
    private secondSetupScreen = {
        title: '~Great! How We\nFeel will help you:',
        continueButton: '//XCUIElementTypeStaticText[@name="Continue"]'
    }

    private thirdSetupScreen = {
        title: '~Let’s do your\nfirst check-in',
        highEnergyPleasantButton: '~High Energy\nPleasant'
    }

    private fourthSetupScreen = {
        pleasedEmotion: '~Pleased',
        tapArrowRight: '~TagArrowRight'
    }

    private fifthSetupScreen = {
        titleEmotion: '~pleased',
        journalEntry: '~Add Journal Entry',
        tagScreen: '//XCUIElementTypeTextField[@value="Eating"]',
        completeCheckin: '//XCUIElementTypeStaticText[@name="Complete check-in"]'
    }

    private journalEntryScreen = {
        title: '~Explore why you might be feeling pleased',
        textInput: '//XCUIElementTypeTextView',
        finishButton: '//XCUIElementTypeButton[@name="Finish"]'
    }

    private sixthSetupScreen = {
        title: '~Remember to check in regularly to spot patterns',
        continueButton: '//XCUIElementTypeButton[@name="Continue"]'
    }

    private seventhSetupScreen = {
        title: '~How often do you\nwant to check in?',
        twicePerDay: '~2 per day (recommended)',
        continueButton: '//XCUIElementTypeStaticText[@name="Continue"]'

    }

    private eigththSetupScreen = {
        title: '~What time do you want to be reminded?',
        continueButton: '//XCUIElementTypeStaticText[@name="Continue"]'
    }

    private ninthSetupScreen = {
        titleButton: '//XCUIElementTypeStaticText[@name="Add the widget"]',
        widgetButton: '//XCUIElementTypeStaticText[@name="Add the widget"]'
    }

    private widgetScreen = {
        closeButton: '//XCUIElementTypeNavigationBar[@name="HowWeFeel_Moodmeter.DeadSimpleVideoView"]/XCUIElementTypeButton'
    }

    private checkinScreen = {
        messageWelcome: '~Want to change how you feel? Explore tools for emotional regulation!'
    }

    async isFirstSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.firstSetupScreen.title);
    }
    async tapOnFirstOption(): Promise<void>{
        await this.tapElement(this.firstSetupScreen.firstOption);
    }

    async tapContinueFirstScreen(): Promise<void>{
        await this.tapElement(this.firstSetupScreen.continueButton);
    }

    async isSecondSetupScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.secondSetupScreen.title)
    }

    async tapContinueSecondScreen(): Promise<void>{
        await this.tapElement(this.secondSetupScreen.continueButton);
    }

    async isThirdSetupScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.thirdSetupScreen.title);
    }

    async tapHighEnergyPleasantButton(): Promise<void>{
        await this.tapElement(this.thirdSetupScreen.highEnergyPleasantButton);
    }

    async isFourthSetupScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.fourthSetupScreen.pleasedEmotion);
    }

    async tapOnPleasedEmotion(): Promise<void>{
        await this.tapElement(this.fourthSetupScreen.pleasedEmotion);
    }

    async tapOnArrowRight(): Promise<void>{
        await this.tapElement(this.fourthSetupScreen.tapArrowRight);
    }

    async isFifthSetupScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.fifthSetupScreen.titleEmotion);
    }

    async tapOnJournalEntry(): Promise<void>{
        await this.tapElement(this.fifthSetupScreen.journalEntry);
    }

    async tapOnTagsScreen(): Promise<void> {
        await this.tapElement(this.fifthSetupScreen.tagScreen);
    }

    async tapOnCompleteCheckin(): Promise<void> {
        await this.tapElement(this.fifthSetupScreen.completeCheckin);
    }

    async journalEntryScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.journalEntryScreen.title);
    }

    async enterTextJournal(text: string): Promise<void> {
        await this.enterText(this.journalEntryScreen.textInput, text, true);
    }

    async tapFinishButton(): Promise<void> {
        await this.tapElement(this.journalEntryScreen.finishButton);
    }

    async isSixthSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.sixthSetupScreen.title);
    }

    async tapContinueSixthScreen(): Promise<void> {
        await this.tapElement(this.sixthSetupScreen.continueButton);
    }

    async isSeventhSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.seventhSetupScreen.title);
    }

    async tapOnTwicePerDay(): Promise<void> {
        await this.tapElement(this.seventhSetupScreen.twicePerDay);
        await this.tapElement(this.seventhSetupScreen.continueButton);
    }

    async isEighthSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.eigththSetupScreen.title);
    }

    async tapContinueEighthScreen(): Promise<void> {
        await this.tapElement(this.eigththSetupScreen.continueButton);
    }

    async isNinthSetupScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.ninthSetupScreen.titleButton);
    }

    async tapAddWidgetButton(): Promise<void> {
        await this.tapElement(this.ninthSetupScreen.widgetButton);
    }

    async tapCloseButton(): Promise<void> {
        await this.tapElement(this.widgetScreen.closeButton);
    }

    async isMessageDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.checkinScreen.messageWelcome);
    }

    async tapScreenCheckin(): Promise<void> {
        await this.tapElement(this.checkinScreen.messageWelcome);
    }
}