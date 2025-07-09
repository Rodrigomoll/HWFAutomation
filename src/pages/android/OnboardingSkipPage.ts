import { BasePage } from "../base/BasePage";

export class OnboardingPage extends BasePage {
    
    private firstScreenOnboarding = {
        title: 'new UiSelector().text("How We Feel-\nA Journal for\nYour Wellbeing")',
        getStartedButton: 'new UiSelector().text("Get started")',
    };

    private secondScreenOnboarding = {
        title: 'new UiSelector().text("Find words to identify your emotions")',
        continueButton: 'new UiSelector().text("Continue")',
    }

    private thirdScreenOnboarding = {
        title: 'new UiSelector().text("Try strategies to help you in the moment")',
        continueButton: 'new UiSelector().text("Continue")'
    }

    private fourthScreenOnboarding = {
        title: 'new UiSelector().text("And over time, spot patterns to gain insight")',
        continueButton: 'new UiSelector().text("Continue")'
    }

    private fifthScreenOnboarding = {
        title: 'new UiSelector().text("It’s free!\nMade possible\nby donations")',
        continueButton: 'new UiSelector().text("Continue")'
    }

    private sixthScreenOnboarding = {
        title: 'new UiSelector().text("Terms & Privacy")',
        continueButton: 'new UiSelector().text("I Accept")'
    }

    private seventhScreenOnboarding = {
        title: 'new UiSelector().text("Hi and welcome\nto HWF!")',
        skipSetUp: 'new UiSelector().text("Skip setup")'
    }

    private seventhScreenonboardingModal = {
        title: 'new UiSelector().text("Are you sure you want to skip the setup?")',
        skipSetUpButton: 'new UiSelector().text("Skip")'
    }

    private modalPrivacyModal = {
        title: 'new UiSelector().textContains("We\'ve updated our Privacy Policy")',
        acceptButton: 'new UiSelector().text("I Accept")',
    }

    async isFirstScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.firstScreenOnboarding.title}`);
    }

    async tapGetStarted(): Promise<void> {
        await this.tapElement(`android=${this.firstScreenOnboarding.getStartedButton}`);
    }

    async isSecondScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.secondScreenOnboarding.title}`);
    }

    async tapContinueSecondScreen(): Promise<void>{
        await this.tapElement(`android=${this.secondScreenOnboarding.continueButton}`);
    }

    async isThirdScreenDisplayed(): Promise<boolean>{
        return await this.isElementDisplayed(`android=${this.thirdScreenOnboarding.title}`);
    }

    async tapContinueThirdScreen(): Promise<void> {
        await this.tapElement(`android=${this.thirdScreenOnboarding.continueButton}`);
    }

    async isFourthScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.fourthScreenOnboarding.title}`);
    }

    async tapContinueFourthScreen(): Promise<void> {
        await this.tapElement(`android=${this.fourthScreenOnboarding.continueButton}`);
    }

    async isFifthScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.fifthScreenOnboarding.title}`);
    }

    async tapContinueFifthScreen(): Promise<void> {
        await this.tapElement(`android=${this.fifthScreenOnboarding.continueButton}`);
    }

    async isSixthScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.sixthScreenOnboarding.title}`);
    }

    async tapIAccept(): Promise<void> {
        await this.tapElement(`android=${this.sixthScreenOnboarding.continueButton}`);
    }

    async isSeventhScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.seventhScreenOnboarding.title}`);
    }

    async tapSkipSetup(): Promise<void> {
        await this.tapElement(`android=${this.seventhScreenOnboarding.skipSetUp}`);
    }

    async isSeventhScreenModalDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.seventhScreenonboardingModal.title}`);
    }

    async tapSkipSetupModal(): Promise<void> {
        await this.tapElement(`android=${this.seventhScreenonboardingModal.skipSetUpButton}`);
    }

    async isPrivacyModalDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.modalPrivacyModal.title}`);
    }

    async tapAcceptPrivacyModal(): Promise<void> {
        await this.tapElement(`android=${this.modalPrivacyModal.acceptButton}`);
    }
}