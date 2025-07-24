import { BasePage } from "../base/BasePage";

export class CreateCheckinPage extends BasePage {
    private checkinScreen = {
        title: 'new UiSelector().textContains("How are you feeling this")',
        checkinText: 'new UiSelector().text("Check in").instance(0)',
        newCheckinButton: "~New check In",
    };

    private quadrantScreen = {
        title:'new UiSelector().text("Tap the color that best describes how you feel right now")',
        quadrantRed: 'new UiSelector().text("High Energy\nUnpleasant")',
        quadrantYellow: 'new UiSelector().text("High Energy\nPleasant")',
        quadrantBlue: 'new UiSelector().text("Low Energy\nUnpleasant")',
        quadrantGreen: 'new UiSelector().text("Low Energy\nPleasant")',
    };

    private moodmeterScreen = {
        //yellow quadrant
        pleasedEmotion: 'new UiSelector().text("Pleased")',
        //red quadrant
        uneasyEmotion: 'new UiSelector().text("Uneasy")',
        //green quadrant
        calmEmotion: 'new UiSelector().text("Calm")',
        //blue quadrant
        boredEmotion: 'new UiSelector().text("Bored")',
        emotionDescription: 'new UiSelector().text("feeling content and happy about a particular situation or person")',
    };

    private tagsScreen = {
        title: 'new UiSelector().text("What were you doing when you felt pleased")',
        tagsTheme: 'new UiSelector().text("Themes")',
        tagsPeople: 'new UiSelector().text("People")',
        tagsPlace: 'new UiSelector().text("Places")',
    }

    private tagsOptions = {
        themeDriving: 'new UiSelector().text("Driving")',
        themePeople: 'new UiSelector().text("By Myself")',
        themePlaces: 'new UiSelector().text("Commuting")',
        nextButton: '~Next'
    }

    private journalEntryScreen = {
        title: 'new UiSelector().text("Describe what might be causing you to feel\npleased …")',
        textInput: 'new UiSelector().className("android.widget.ScrollView")',
        microphoneButton: '~Open microphone',
        cameraButton: '~Open camera',
        nextButton: 'new UiSelector().description("Next")'
    }

    private dataEntriesScreen = {
        title: 'new UiSelector().text("Time, weather, \nsleep & exercise")',
        saveButton: 'new UiSelector().text("Save")'
    }

    private checkinCompletedScreen = {
        feelingTitle: 'new UiSelector().textContains("How are you feeling this")',
        reflectButton: 'new UiSelector().text("Reflect")',
        toolsButton: 'new UiSelector().text("Tools").instance(0)',
        firstTimeToolTip: 'new UiSelector().textContains("Want to change how you feel")'
    }

    private reflectModal = {
        notNowButton: 'new UiSelector().text("Not now")'
    }

    async isTitleDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.checkinScreen.title}`);
    }
    async isCheckinTextDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.checkinScreen.checkinText}`);
    }
    async isCheckinButtonDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(this.checkinScreen.newCheckinButton);
    }
    async tapNewCheckinButton(): Promise<void> {
        await this.tapElement(this.checkinScreen.newCheckinButton);
    }

    async isQuadrantScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.quadrantScreen.title}`);
    }
    async allQuadrantsDisplayed(): Promise<boolean> {
        const redDisplayed = await this.isElementDisplayed(`android=${this.quadrantScreen.quadrantRed}`);
        const yellowDisplayed = await this.isElementDisplayed(`android=${this.quadrantScreen.quadrantYellow}`);
        const blueDisplayed = await this.isElementDisplayed(`android=${this.quadrantScreen.quadrantBlue}`);
        const greenDisplayed = await this.isElementDisplayed(`android=${this.quadrantScreen.quadrantGreen}`);
    return redDisplayed && yellowDisplayed && blueDisplayed && greenDisplayed;
    }
    
    async tapYellowQuadrant(): Promise<void> {
        await this.tapElement(`android=${this.quadrantScreen.quadrantYellow}`);
    }

    async tapRedQuadrant(): Promise<void> {
        await this.tapElement(`android=${this.quadrantScreen.quadrantRed}`);
    }

    async tapGreenQuadrant(): Promise<void> {
        await this.tapElement(`android=${this.quadrantScreen.quadrantGreen}`);
    }

    async tapBlueQuadrant(): Promise<void> {
        await this.tapElement(`android=${this.quadrantScreen.quadrantBlue}`);
    }

    async isPleasedEmotionDisplayed(): Promise<boolean> {
        const emotionDisplayed = await this.isElementDisplayed(`android=${this.moodmeterScreen.pleasedEmotion}`);
        const descriptionDisplayed = await this.isElementDisplayed(`android=${this.moodmeterScreen.emotionDescription}`);
        return emotionDisplayed && descriptionDisplayed;
    }

    async tapPleasedEmotion(): Promise<void> {
        await this.tapElement(`android=${this.moodmeterScreen.pleasedEmotion}`);
    }

    async isUneasyEmotionDisplayed(): Promise<boolean> {
        const emotionDisplayed = await this.isElementDisplayed(`android=${this.moodmeterScreen.uneasyEmotion}`);
        return emotionDisplayed;
    }

    async tapUneasyEmotion(): Promise<void> {
        await this.tapElement(`android=${this.moodmeterScreen.uneasyEmotion}`);
    }

    async isCalmEmotionDisplayed(): Promise<boolean> {
        const emotionDisplayed = await this.isElementDisplayed(`android=${this.moodmeterScreen.calmEmotion}`);
        return emotionDisplayed;
    }

    async tapCalmEmotion(): Promise<void> {
        await this.tapElement(`android=${this.moodmeterScreen.calmEmotion}`);
    }

    async isBoredEmotionDisplayed(): Promise<boolean> {
        const emotionDisplayed = await this.isElementDisplayed(`android=${this.moodmeterScreen.boredEmotion}`);
        return emotionDisplayed;
    }

    async tapBoredEmotion(): Promise<void> {
        await this.tapElement(`android=${this.moodmeterScreen.boredEmotion}`);
    }

    async tagScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.tagsScreen.title}`);
    }

    async isThemesTextDisplayed(): Promise<boolean> {
        const themesTextDisplayed = await this.isElementDisplayed(`android=${this.tagsScreen.tagsTheme}`);
        const themesPeopleDisplayed = await this.isElementDisplayed(`android=${this.tagsScreen.tagsPeople}`);
        const themesPlaceDisplayed = await this.isElementDisplayed(`android=${this.tagsScreen.tagsPlace}`);
    return themesTextDisplayed && themesPeopleDisplayed  && themesPlaceDisplayed;
    }

    async selectTags(): Promise<void> {
        await this.tapElement(`android=${this.tagsOptions.themeDriving}`);
        await this.tapElement(`android=${this.tagsOptions.themePeople}`);
        await this.tapElement(`android=${this.tagsOptions.themePlaces}`);
    }

    async tapNextButton(): Promise<void> {
        await this.tapElement(this.tagsOptions.nextButton);
    }

    async isJournalScreenDisplayed(): Promise<boolean> {
        const titleDisplayed = await this.isElementDisplayed(`android=${this.journalEntryScreen.title}`);
        const microButtonDisplayed = await this.isElementDisplayed(this.journalEntryScreen.microphoneButton);
        const cameraButtonDisplayed = await this.isElementDisplayed(this.journalEntryScreen.cameraButton);
        return titleDisplayed && microButtonDisplayed && cameraButtonDisplayed;
    }

    async enterTextJournal(text: string): Promise<void> {
        await this.enterText(`android=${this.journalEntryScreen.textInput}`, text, true);
    }

    async dataEntriesScreenDisplayed(): Promise<boolean> {
        return await this.isElementDisplayed(`android=${this.dataEntriesScreen.title}`)
    }

    async tapSaveButton(): Promise<void> {
        await this.tapElement(`android=${this.dataEntriesScreen.saveButton}`)
    }

    async handleFirstTimeTooltip(): Promise<boolean> {
            const tooltipPresent = await this.isElementDisplayed(`android=${this.checkinCompletedScreen.firstTimeToolTip}`);
            
            if (tooltipPresent) {
                await this.tapScreenCenter();
                return true;
            }
            return false;
    }   

    async isCheckinCompleted(): Promise<boolean> {
        try{
            const titleDisplayed = await this.isElementDisplayed(`android=${this.checkinCompletedScreen.feelingTitle}`);
            const reflectButtonDisplayed = await this.isElementDisplayed(`android=${this.checkinCompletedScreen.reflectButton}`);
            const toolsButtonDisplated = await this.isElementDisplayed(`android=${this.checkinCompletedScreen.toolsButton}`);
            return titleDisplayed && reflectButtonDisplayed && toolsButtonDisplated;
        }
        catch(error){
            return false;
        }
    }

    async dismissReflectModalIfPresent(): Promise<boolean> {
        const modalPresent = await this.isElementDisplayed(`android=${this.reflectModal.notNowButton}`);
        if (modalPresent) {
            await this.tapElement(`android=${this.reflectModal.notNowButton}`);
            return true
        }
        else{
            return false
        }
    }
}