import { BasePage } from "../base/BasePage";

export class OnboardingSkipPage extends BasePage{
    private firstScreenOnboarding = {
        title: '~How We Feel—\nA Journal for\nYour Wellbeing',
        getStartedButton: '//XCUIElementTypeStaticText[@name="Get Started"]'
    }
    private secondScreenOnboarding = {
        title: '~Find words to identify your emotions',
        continueButton: '~Continue'
    }
    private thirdScreenOnboarding = {
        title: '~Try strategies to help you in the moment',
        continueButton: '~Continue'
    }
    private fourthScreenOnboarding = {
        title: '~And over time, spot patterns to gain insights',
        continueButton: '~Continue'
    }
    private fifthScreenOnboarding = {
        title: '~It’s free—\nMade possible by donations',
        continueButton: '~Continue'
    }
    private sixthScreenOnboarding = {
        title: '~Terms & Privacy',
        acceptButton: '//XCUIElementTypeStaticText[@name="I Accept"]'
    }
    private seventhScreenOnboarding = {
        skipTextbutton: '//XCUIElementTypeStaticText[@name="Skip setup"]',
        skipButton: '//XCUIElementTypeStaticText[@name="Skip setup"]',
        continueTap: '//XCUIElementTypeStaticText[@name="Continue"]'
    }
    private modalSeventhScreen = {
        title: '//XCUIElementTypeStaticText[@name="Are you sure you want to skip the setup?"]',
        skipSetupButton: '~Skip'
    }
    private moodMeterScreen = {
        title: '//XCUIElementTypeStaticText[contains(@name, "How are you feeling this")]'
    }

    async isFirstScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.firstScreenOnboarding.title);
    }
    async tapGetStartedButton(): Promise<void>{
        await this.tapElement(this.firstScreenOnboarding.getStartedButton)
    }

    async isSecondScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.secondScreenOnboarding.title)
    }
    
    async tapContinueSecondScreen(): Promise<void>{
        await this.tapElement(this.secondScreenOnboarding.continueButton)
    }

    async isThirdScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.thirdScreenOnboarding.title);
    }

    async tapContinueThirdScreen(): Promise<void>{
        await this.tapElement(this.thirdScreenOnboarding.continueButton)
    }

    async isFourthScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.fourthScreenOnboarding.title);
    }

    async tapContinueFourthScreen(): Promise<void>{
        await this.tapElement(this.fourthScreenOnboarding.continueButton)
    }

    async isFifthScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.fifthScreenOnboarding.title);
    }

    async tapContinueFifthScreen(): Promise<void>{
        await this.tapElement(this.fifthScreenOnboarding.continueButton)
    }

    async isSixthScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.sixthScreenOnboarding.title);
    }

    async tapAcceptButton(): Promise<void>{
        await this.tapElement(this.sixthScreenOnboarding.acceptButton);
    }

    async isSeventhScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.seventhScreenOnboarding.skipTextbutton);
    }

    async tapSkipButton(): Promise<void>{
        await this.tapElement(this.seventhScreenOnboarding.skipButton);
    }

    async tapContinueSeventhScreen(): Promise<void>{
        await this.tapElement(this.seventhScreenOnboarding.continueTap);
    }

    async isTitleModalDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.modalSeventhScreen.title);
    }

    async tapSkipSetupButton(): Promise<void>{
        await this.tapElement(this.modalSeventhScreen.skipSetupButton)
    }

    async isMoodMeterTitleDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(this.moodMeterScreen.title);
    }
}