import { BasePage } from "../base/BasePage";

export class CheckinCardPage extends BasePage{
    private readonly commonElements = {
        mainTitle: 'new UiSelector().textContains("How are you feeling this")',
        imFeelingText: 'new UiSelector().text("I’m feeling")',
        saveButton: 'new UiSelector().text("Save")',
        editText: 'new UiSelector().className("android.widget.EditText")',
        threeDotsButton: 'new UiSelector().className("android.widget.Button").instance(4)',
        deleteButton: 'new UiSelector().text("Delete Check-In")',
        confirmButton: 'new UiSelector().text("Yes")'
    };

    private readonly emotions = {
        uneasy : 'new UiSelector().text("uneasy")',
        calm : 'new UiSelector().text("calm")'
    };

    private readonly journalTexts = {
        uneasy : 'new UiSelector().text("Feeling stressed about work")',
        calm : 'new UiSelector().text("Feeling peaceful and relaxed today.")'
    };

    private readonly tags = {
        driving : 'new UiSelector().text("Driving")',
        byMyself : 'new UiSelector().text("By Myself")',
        commuting : 'new UiSelector().text("Commuting")'
    }

    private async isCheckinDisplayed(emotionType : 'uneasy' | 'calm'): Promise<boolean> {
        const mainTitleDisplayed = await this.isElementDisplayed(`android=${this.commonElements.mainTitle}`);
        await this.swipeVertical("up", 0.7);
        await browser.pause(1000);
        const imFeelingTextDisplayed = await this.isElementDisplayed(`android=${this.commonElements.imFeelingText}`);
        const emotionTextDisplayed = await this.isElementDisplayed(`android=${this.emotions[emotionType]}`);
        return mainTitleDisplayed && imFeelingTextDisplayed && emotionTextDisplayed;
    }

    private async isCheckinCardDisplayed(emotionType : 'uneasy' | 'calm'): Promise<boolean> {
        const journalEntryTextDisplayed = await this.isElementDisplayed(`android=${this.journalTexts[emotionType]}`);
        const tagDrivingDisplayed = await this.isElementDisplayed(`android=${this.tags.driving}`);
        const tagPeopleDisplayed = await this.isElementDisplayed(`android=${this.tags.byMyself}`);
        const tagPlacesDisplayed = await this.isElementDisplayed(`android=${this.tags.commuting}`);
        return journalEntryTextDisplayed && tagDrivingDisplayed && tagPeopleDisplayed && tagPlacesDisplayed;
    }

    private async tapEmotion(emotionType : 'uneasy' | 'calm'): Promise<void> {
        await this.tapElement(`android=${this.emotions[emotionType]}`);
        await driver.pause(2000);
    }

    async isCheckinUneasyDisplayed(): Promise<boolean> {
        return this.isCheckinDisplayed('uneasy');
    }

    async isCheckinCalmDisplayed(): Promise<boolean> {
        return this.isCheckinDisplayed('calm');
    }

    async tapUneasyCheckin(): Promise<void> {
        await this.tapEmotion('uneasy');
    }

    async tapCalmCheckin(): Promise<void> {
        await this.tapEmotion('calm');
    }

    async isUneasyCheckinCardDisplayed(): Promise<boolean> {
        return this.isCheckinCardDisplayed('uneasy');
    }

    async isCalmCheckinCardDisplayed(): Promise<boolean> {
        return this.isCheckinCardDisplayed('calm');
    }

    async tapJournalEntry(emotionType: 'uneasy' | 'calm' = 'uneasy'): Promise<void> {
        await this.tapElement(`android=${this.journalTexts[emotionType]}`);
        await driver.pause(2000);
    }

    async isJournalEntryDisplayed(emotionType: 'uneasy' | 'calm' = 'uneasy'): Promise<boolean> {
        return this.isElementDisplayed(`android=${this.journalTexts[emotionType]}`);
    }

    async editJournalEntry(newText: string): Promise<void> {
        const element = await this.waitForElement(`android=${this.commonElements.editText}`);
        await element.setValue(newText);
        await driver.pause(1000);
    }

    async isEditedJournalEntryDisplayed(newText: string, timeout: number = 5000): Promise<boolean> {
        return this.isElementDisplayed(`android=new UiSelector().text("${newText}")`);
    }

    async saveJournalEntry(): Promise<void> {
        await this.tapElement(`android=${this.commonElements.saveButton}`);
        await driver.pause(1000);
    }

    async tapThreeButton(): Promise<void> {
        await this.tapElement(`android=${this.commonElements.threeDotsButton}`);
        await driver.pause(2000);
    }

    async displayDeleteButton(): Promise<boolean> {
        return this.isElementDisplayed(`android=${this.commonElements.deleteButton}`);
    }

    async tapDeleteButton(): Promise<void> {
        await this.tapElement(`android=${this.commonElements.deleteButton}`);
        await driver.pause(2000);
    }

    async confirmDelete(): Promise<void> {
        await this.tapElement(`android=${this.commonElements.confirmButton}`);
        await driver.pause(2000);
    }

    async isBackToMainScreen(timeout: number = 5000): Promise<boolean> {
        return this.isElementDisplayed(`android=${this.commonElements.mainTitle}`, timeout);
    }

    async deleteCheckinFlow(): Promise<void> {
        await this.tapThreeButton();
        await this.tapDeleteButton();
        await this.confirmDelete();
    }

    async editJournalFlow(newText: string, emotionType: 'uneasy' | 'calm' = 'uneasy'): Promise<void> {
        await this.tapJournalEntry();
        await this.editJournalEntry(newText);
        await this.saveJournalEntry();
    }
}