import { BasePage } from "../base/BasePage";

export class CheckinListPage extends BasePage{
    private checkinUneasyElements = {
        mainTitle: 'new UiSelector().textContains("How are you feeling this")',
        imFeelingText: 'new UiSelector().text("I’m feeling")',
        uneasyText: 'new UiSelector().text("uneasy")'
    }

    private checkinCalmElements = {
        mainTitle: 'new UiSelector().textContains("How are you feeling this")',
        imFeelingText: 'new UiSelector().text("I’m feeling")',
        calmText: 'new UiSelector().text("calm")'
    }

    private checkinUneasyCardElements = {
        journalEntryText: 'new UiSelector().text("Feeling stressed about work")',
        tagDriving: 'new UiSelector().text("Driving")',
        tagPeople: 'new UiSelector().text("By Myself")',
        tagPlaces: 'new UiSelector().text("Commuting")',
        saveButton: 'new UiSelector().text("Save")'
    }

    private checkinCalmCardElements = {
        journalEntryText: 'new UiSelector().text("Feeling peaceful and relaxed today.")',
        tagDriving: 'new UiSelector().text("Driving")',
        tagPeople: 'new UiSelector().text("By Myself")',
        tagPlaces: 'new UiSelector().text("Commuting")',
        threeButton: 'new UiSelector().className("android.widget.Button").instance(4)',
        deleteButton: 'new UiSelector().text("Delete Check-In")',
        confirmButton: 'new UiSelector().text("Yes")'
    }

    async isCheckinUneasyDisplayed(): Promise<boolean> {
        const mainTitleDisplayed = await this.isElementDisplayed(`android=${this.checkinUneasyElements.mainTitle}`);
        await this.swipeUp(0.7);
        const imFeelingTextDisplayed = await this.isElementDisplayed(`android=${this.checkinUneasyElements.imFeelingText}`)
        const emotionTextDisplayed = await this.isElementDisplayed(`android=${this.checkinUneasyElements.uneasyText}`)
        return mainTitleDisplayed && imFeelingTextDisplayed && emotionTextDisplayed;
    }

    async isCheckinCalmDisplayed(): Promise<boolean> {
        const mainTitleDisplayed = await this.isElementDisplayed(`android=${this.checkinCalmElements.mainTitle}`);
        await this.swipeUp(0.7);
        const imFeelingTextDisplayed = await this.isElementDisplayed(`android=${this.checkinCalmElements.imFeelingText}`);
        const emotionTextDisplayed = await this.isElementDisplayed(`android=${this.checkinCalmElements.calmText}`);
        return mainTitleDisplayed && imFeelingTextDisplayed && emotionTextDisplayed;
    }

    async tapUneasyCheckin(): Promise<void>{
        await this.tapElement(`android=${this.checkinUneasyElements.uneasyText}`);
        await driver.pause(3000);
    }

    async tapCalmCheckin(): Promise<void>{
        await this.tapElement(`android=${this.checkinCalmElements.calmText}`);
        await driver.pause(3000);
    }

    async isUneasyCheckinCardDisplayed(): Promise<boolean> {
        const journalEntryTextDisplayed = await this.isElementDisplayed(`android=${this.checkinUneasyCardElements.journalEntryText}`);
        const tagDrivingDisplayed = await this.isElementDisplayed(`android=${this.checkinUneasyCardElements.tagDriving}`);
        const tagPeopleDisplayed = await this.isElementDisplayed(`android=${this.checkinUneasyCardElements.tagPeople}`);
        const tagPlacesDisplayed = await this.isElementDisplayed(`android=${this.checkinUneasyCardElements.tagPlaces}`);
        return journalEntryTextDisplayed && tagDrivingDisplayed && tagPeopleDisplayed && tagPlacesDisplayed;
    }

    async isCalmCheckinCardDisplayed(): Promise<boolean> {
        const journalEntryTextDisplayed = await this.isElementDisplayed(`android=${this.checkinCalmCardElements.journalEntryText}`);
        const tagDrivingDisplayed = await this.isElementDisplayed(`android=${this.checkinCalmCardElements.tagDriving}`);
        const tagPeopleDisplayed = await this.isElementDisplayed(`android=${this.checkinCalmCardElements.tagPeople}`);
        const tagPlacesDisplayed = await this.isElementDisplayed(`android=${this.checkinCalmCardElements.tagPlaces}`);
        return journalEntryTextDisplayed && tagDrivingDisplayed && tagPeopleDisplayed && tagPlacesDisplayed;
    }

    async tapJournalEntry(): Promise<void> {
        await this.tapElement(`android=${this.checkinUneasyCardElements.journalEntryText}`);
        await driver.pause(2000);
    }

    async isJournalEntryDisplayed(): Promise<boolean> {
        const journalDisplayed = await this.isElementDisplayed(`android=${this.checkinUneasyCardElements.journalEntryText}`);
        return journalDisplayed;
    }

    async editJournalEntry(newText: string): Promise<void> {
        
        const element = await this.waitForElement('android=new UiSelector().className("android.widget.EditText")');
        
        await element.setValue(newText);
        await driver.pause(1000);
    }

    async isEditedJournalEntryDisplayed(newText: string): Promise<boolean> {
        const editedTextDisplayed = await this.isElementDisplayed(`android=new UiSelector().text("${newText}")`, 5000)
        return editedTextDisplayed; 
    }

    async saveJournalEntry(): Promise<void> {
        await this.tapElement(`android=${this.checkinUneasyCardElements.saveButton}`);
    }

    async tapThreeButton(): Promise<void> {
        await this.tapElement(`android=${this.checkinCalmCardElements.threeButton}`);
        await driver.pause(2000);
    }

    async displayDeleteButton(): Promise<boolean> {
        const deleteButtonDisplayed = await this.isElementDisplayed(`android=${this.checkinCalmCardElements.deleteButton}`);
        return deleteButtonDisplayed;
    }

    async tapDeleteButton(): Promise<void> {
        await this.tapElement(`android=${this.checkinCalmCardElements.deleteButton}`);
        await driver.pause(2000);
    }

    async confirmDelete(): Promise<void> {
        await this.tapElement(`android=${this.checkinCalmCardElements.confirmButton}`);
        await driver.pause(2000);
    }

    async isBackToMainScreen(): Promise<boolean> {
        const mainTitleDisplayed = await this.isElementDisplayed(`android=${this.checkinCalmElements.mainTitle}`, 5000);
        return mainTitleDisplayed;
    }
}