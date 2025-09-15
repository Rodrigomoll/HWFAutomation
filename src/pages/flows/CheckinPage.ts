import { BasePage } from "../base/BasePage";
import { AndroidLocators } from "../../locators/AndroidLocators";
//import { iOSLocators } from "../../locators/iOSLocators";
import { verify } from "../../helpers/testVerification";

export class CheckinPage extends BasePage {
    private locators!: AndroidLocators; // | iOSLocators;
    //private isAndroidPlatform!: boolean;

    private elements!: {
        checkinPrompt: string;
        checkinText: string;
        newCheckin: string;

        quadrantPrompt: string;
        redQuadrant: string;
        yellowQuadrant: string;
        blueQuadrant: string;
        greenQuadrant: string;

        pleasedEmotion: string;
        pleasedDescription: string;
        uneasyEmotion: string;
        calmEmotion: string;
        boredEmotion: string;

        tagPrompt: string;
        themesTag: string;
        peopleTag: string;
        placesTag: string;

        drivingTag: string;
        myselfTag: string;
        commutingTag: string;

        journalPrompt: string;
        journalInput: string;

        reflectPrompt: string;
        writeText: string;
        reflectInput: string;
        suggestedActions: string;
        affirmations: string;
        insights: string;

        searchInput: string;
        yellowEmotions: string;
        absorbedEmotion: string;
        greenEmotions: string;
        acceptedEmotion: string;
        blueEmotions: string;
        abandonedEmotion: string;
        redEmotions: string;
        afraidEmotion: string;

        dataPrompt: string;
        changeToolTip: string;

        nextButton: string;
        microphoneButton: string;
        cameraButton: string;
        reflectButton: string;
        addFeelingButton: string;
        goDeeperButton: string;
        finishButton: string;
        doneButton: string;
        paperClipIcon: string;
        saveButton: string;
        toolsButton: string;
        notNowButton: string;
        notShareButton: string;

        imFeelingText: string;
        editText: string;
        threeDotsButton: string;
        deleteButton: string;
        confirmButton: string;
        uneasyEmotion2: string;
        calmEmotion2: string;
        uneasyText: string;
        calmText: string;
    };

    async init() {
        //this.isAndroidPlatform = await this.isAndroid();

        this.locators = new AndroidLocators();

        this.elements = {
            // Checkin
            checkinPrompt: await this.locators.selectValue("contains", "How are you feeling this"),
            checkinText: await this.locators.selectValue("text", "Check in") + await this.locators.selectValue("instance", "0"),
            newCheckin: await this.locators.selectValue("description", "New check In"),

            // Quadrants
            quadrantPrompt: await this.locators.selectValue("text", "Tap the color that best describes how you feel right now"),
            redQuadrant: await this.locators.selectValue("text", "High Energy\nUnpleasant"),
            yellowQuadrant: await this.locators.selectValue("text", "High Energy\nPleasant"),
            blueQuadrant: await this.locators.selectValue("text", "Low Energy\nUnpleasant"),
            greenQuadrant: await this.locators.selectValue("text", "Low Energy\nPleasant"),

            // Emotions
            pleasedEmotion: await this.locators.selectValue("text", "Pleased"),
            pleasedDescription: await this.locators.selectValue("text", "feeling content and happy about a particular situation or person"),
            uneasyEmotion: await this.locators.selectValue("text", "Uneasy"),
            calmEmotion: await this.locators.selectValue("text", "Calm"),
            boredEmotion: await this.locators.selectValue("text", "Bored"),

            // Tags
            tagPrompt: await this.locators.selectValue("contains", "What were you doing when you felt"),
            themesTag: await this.locators.selectValue("text", "Themes"),
            peopleTag: await this.locators.selectValue("text", "People"),
            placesTag: await this.locators.selectValue("text", "Places"),

            // Theme tags
            drivingTag: await this.locators.selectValue("text", "Driving"),
            myselfTag: await this.locators.selectValue("text", "By Myself"),
            commutingTag: await this.locators.selectValue("text", "Commuting"),

            // Journal entry
            journalPrompt: await this.locators.selectValue("contains", "Describe what might be causing you to feel"),
            journalInput: await this.locators.selectValue("className", "android.widget.ScrollView"),

            // Reflect
            reflectPrompt: await this.locators.selectValue("text", "Reflect"),
            writeText: await this.locators.selectValue("text", "Write"),
            reflectInput: await this.locators.selectValue("className", "android.widget.EditText"),
            suggestedActions: await this.locators.selectValue("text", "[icon] Suggested actions"),
            affirmations: await this.locators.selectValue("text", "[icon] Affirmations"),
            insights: await this.locators.selectValue("text", "[icon] Insight"),

            // Feelings
            searchInput: await this.locators.selectValue("text", "Search feelings to add"),
            yellowEmotions: await this.locators.selectValue("text", "Yellow"),
            absorbedEmotion: await this.locators.selectValue("text", "Absorbed"),
            greenEmotions: await this.locators.selectValue("text", "Green"),
            acceptedEmotion: await this.locators.selectValue("text", "Accepted"),
            blueEmotions: await this.locators.selectValue("text", "Blue"),
            abandonedEmotion: await this.locators.selectValue("text", "Abandoned"),
            redEmotions: await this.locators.selectValue("text", "Red"),
            afraidEmotion: await this.locators.selectValue("text", "Afraid"),

            // Data entries
            dataPrompt: await this.locators.selectValue("text", "Time, weather, \nsleep & exercise"),

            // Complete
            changeToolTip: await this.locators.selectValue("contains", "Want to change how you feel"),

            // Buttons
            nextButton: await this.locators.selectValue("description", "Next"),
            microphoneButton: await this.locators.selectValue("description", "Open microphone"),
            cameraButton: await this.locators.selectValue("description", "Open camera"),
            reflectButton: await this.locators.selectValue("description", "Reflect"),
            addFeelingButton: await this.locators.selectValue("className", "android.view.View") + await this.locators.selectValue("instance", "4"),
            goDeeperButton: await this.locators.selectValue("text", "Go Deeper"),
            finishButton: await this.locators.selectValue("text", "Finish"),
            doneButton: await this.locators.selectValue("text", "Done"),
            paperClipIcon: await this.locators.selectValue("className", "android.widget.Button") + await this.locators.selectValue("instance", "0"),
            saveButton: await this.locators.selectValue("text", "Save"),
            toolsButton: await this.locators.selectValue("text", "Tools") + await this.locators.selectValue("instance", "0"),
            notNowButton: await this.locators.selectValue("text", "Not now"),
            notShareButton: await this.locators.selectValue("text", "Don't Share") + await this.locators.selectValue("instance", "1"),


            // Card
            imFeelingText: await this.locators.selectValue("text", "I’m feeling"),
            editText: await this.locators.selectValue("className", "android.widget.EditText"),
            threeDotsButton: await this.locators.selectValue("className", "android.widget.Button") + await this.locators.selectValue("instance", "4"),
            deleteButton: await this.locators.selectValue("text", "Delete Check-In"),
            confirmButton: await this.locators.selectValue("text", "Yes"),
            uneasyEmotion2: await this.locators.selectValue("text", "uneasy"),
            calmEmotion2: await this.locators.selectValue("text", "calm"),
            uneasyText: await this.locators.selectValue("text", "Feeling stressed about work"),
            calmText: await this.locators.selectValue("text", "Feeling peaceful and relaxed today."),
        };

        return this;
    }

    async verifyIsElementDisplayed(
        element: keyof typeof this.elements,
        timeout?: number
    ): Promise<boolean> {
        return await this.isElementDisplayed(await this.locators.buildSelector(this.elements[element]), timeout ?? null);
    }

    async tapElementButton(
        button: keyof typeof this.elements,
        timeout?: number
    ): Promise<void> {
        await this.tapElement(await this.locators.buildSelector(this.elements[button]), timeout ?? null);
    }

    async waitFor(
        element: keyof typeof this.elements,
        timeout?: number
    ): Promise<void> {
        await this.waitForElement(await this.locators.buildSelector(this.elements[element]), timeout ?? null);
    }

    async inputText(input: string, text: string) {
        await this.enterText(await this.locators.buildSelector(this.elements[input]), text, true);
    }

    //////////////// Functions repetidas
    async QuadrantsStep() {
        await verify(this.verifyIsElementDisplayed("checkinPrompt")
                    , this.verifyIsElementDisplayed("checkinText")
                    , this.verifyIsElementDisplayed("newCheckin"));
        
        await this.tapElementButton("newCheckin");

        await verify(this.verifyIsElementDisplayed("quadrantPrompt"), this.areAllQuadrantsDisplayed());
    }

    async tagsStep() {
        await verify(this.verifyIsElementDisplayed("tagPrompt"), this.areThemesDisplayed())
        await this.selectTags();
        await this.tapElementButton("nextButton");
    }

    async journalStep(input: string) {
        await verify(this.isJournalScreenDisplayed());
        await this.inputText("journalInput", input);
        await this.tapElementButton("nextButton");
    }

    async journalReflectStep(input: string) {
        await verify(this.isJournalScreenDisplayed());
        await this.inputText("journalInput", input);
        await this.tapElementButton("reflectButton");
    }

    async tagsAndJournalStep(input: string) {
        await this.tagsStep();
        await this.journalStep(input);
    }

    async tagsAndJournalReflectStep(input: string) {
        await this.tagsStep();
        await this.journalReflectStep(input);
    }

    async completeCheckin(again: boolean = true){
        if (await this.handleChangeTooltip()) {
            await verify(this.isCheckinCompleted());
        }
        if(again) await verify(this.isCheckinCompleted());
    }

    async dataAndSaveStep() {
        await verify(this.verifyIsElementDisplayed("dataPrompt"));
        await this.tapElementButton("saveButton");
    }

    async completeReflectStep(toolTip: boolean) {
        await this.tapElementButton("doneButton");
        await this.tapElementButton("nextButton");
        await verify(this.verifyIsElementDisplayed("dataPrompt"));
        await browser.pause(2000); // wait for the AI processing to complete
        await this.tapElementButton("saveButton");
        await browser.pause(2000); // wait for the save action to complete
        
        if(toolTip) await this.completeCheckin(true);
    }
    
    async completeReflectStep2(toolTip: boolean) {
        await this.tapElementButton("finishButton");
        await this.tapElementButton("nextButton");
        await verify(this.verifyIsElementDisplayed("dataPrompt"));
        await browser.pause(2000); // wait for the AI processing to complete
        await this.tapElementButton("saveButton");
        await browser.pause(2000); // wait for the save action to complete

        if(toolTip) await this.completeCheckin(false);
    }
///// otras

    async areAllQuadrantsDisplayed(): Promise<boolean> {
        return (await this.verifyIsElementDisplayed("redQuadrant") 
            && await this.verifyIsElementDisplayed("yellowQuadrant")
            && await this.verifyIsElementDisplayed("blueQuadrant")
            && await this.verifyIsElementDisplayed("greenQuadrant"));
    }

    async tapPleasedEmotion(quadrant: boolean): Promise<boolean> {
        try{
            if(quadrant) await this.tapElementButton("yellowQuadrant");
            await verify(this.verifyIsElementDisplayed("pleasedEmotion"), this.verifyIsElementDisplayed("pleasedDescription"));
            await this.tapElementButton("pleasedEmotion");
            return true;
        } catch (error) {
            return false;
        }
    }

    async tapUneasyEmotion(): Promise<boolean> {
        try{
            await this.tapElementButton("redQuadrant");
            await verify(this.verifyIsElementDisplayed("uneasyEmotion"));
            await this.tapElementButton("uneasyEmotion");
            return true;
        } catch (error) {
            return false;
        }
    }

    async tapBoredEmotion(): Promise<boolean> {
        try{
            await this.tapElementButton("blueQuadrant");
            await verify(this.verifyIsElementDisplayed("boredEmotion"));
            await this.tapElementButton("boredEmotion");
            return true;
        } catch (error) {
            return false;
        }
    }

    async tapCalmEmotion(): Promise<boolean> {
        try{
            await this.tapElementButton("greenQuadrant");
            await verify(this.verifyIsElementDisplayed("calmEmotion"));
            await this.tapElementButton("calmEmotion");
            return true;
        } catch (error) {
            return false;
        }
    }

    async areThemesDisplayed(): Promise<boolean> {
        return (await this.verifyIsElementDisplayed("themesTag") 
            && await this.verifyIsElementDisplayed("peopleTag")
            && await this.verifyIsElementDisplayed("placesTag"));
    }

    async selectTags() {
        await this.tapElementButton("drivingTag");
        await this.tapElementButton("myselfTag");
        await this.tapElementButton("commutingTag");
    }

    async isJournalScreenDisplayed(): Promise<boolean> {
        return (await this.verifyIsElementDisplayed("journalPrompt") 
            && await this.verifyIsElementDisplayed("microphoneButton")
            && await this.verifyIsElementDisplayed("cameraButton"));
    }

    async handleChangeTooltip(): Promise<boolean> {
        const tooltipPresent = await this.verifyIsElementDisplayed("changeToolTip");

        if (tooltipPresent) {
            await this.tapScreenCenter();
            return true;
        }
        return false;
    }

    async isCheckinCompleted(): Promise<boolean> {
        try {
            return (await this.verifyIsElementDisplayed("checkinPrompt") 
                && await this.verifyIsElementDisplayed("reflectPrompt")
                && await this.verifyIsElementDisplayed("toolsButton"));
        } catch (error) {
            return false;
        }
    }

    ////////////////
    // card

    async isCheckinDisplayed(emotion: "uneasyEmotion2" | "calmEmotion2"): Promise<boolean> {
        const mainTitleDisplayed = await this.verifyIsElementDisplayed("checkinPrompt");
        await this.swipeVertical("up", 0.7);
        await browser.pause(1000);
        return mainTitleDisplayed && await this.verifyIsElementDisplayed("imFeelingText") && await this.verifyIsElementDisplayed(emotion);
    }

    async isCheckinCardDisplayed(emotion: "uneasyEmotion2" | "calmEmotion2"): Promise<boolean> {
        return (await this.verifyIsElementDisplayed(emotion)
            && await this.verifyIsElementDisplayed("drivingTag")
            && await this.verifyIsElementDisplayed("myselfTag")
            && await this.verifyIsElementDisplayed("commutingTag")
        );
    }

    async editJournalEntry(newText: string): Promise<void> {
        const element = await this.waitForElement(await this.locators.buildSelector(this.elements.editText));
        await element.setValue(newText);
        await driver.pause(1000);
    }

    async deleteCheckinFlow(): Promise<void> {
        await this.tapElementButton("threeDotsButton");
        await driver.pause(2000);

        await this.tapElementButton("deleteButton");
        await driver.pause(2000);

        await this.tapElementButton("confirmButton");
        await driver.pause(2000);
    }

    async editJournalFlow(emotion: "uneasyEmotion2" | "calmEmotion2", newText: string): Promise<void> {
        await this.tapElementButton(emotion);
        await driver.pause(2000);

        await this.editJournalEntry(newText);

        await this.tapElementButton("saveButton");
        await driver.pause(2000);
    }


    async verifyIsNewElementDisplayed(
        element: string,
        timeout?: number
    ): Promise<boolean> {
        return await this.isElementDisplayed(await this.locators.buildSelector(await this.locators.selectValue("text", element)), timeout ?? null);
    }


    // others
    async generateCurrentDateTimeSelector(): Promise<string> {
        const now = new Date();

        const dayName = now.toLocaleString("default", { weekday: "long" });
        const monthName = now.toLocaleString("default", { month: "long" });
        const day = now.getDate();

        const formatDate = `${dayName} ${monthName} ${day}`;
        return `new UiSelector().textContains("${formatDate}")`;
    }

    generatePreviousDisplayDateSelector(): string {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        const dayName = yesterday.toLocaleString("default", { weekday: "long" });
        const monthName = yesterday.toLocaleString("default", { month: "long" });
        const day = yesterday.getDate();

        const dateOnly = `${dayName} ${monthName} ${day}`;

        return `new UiSelector().textContains("${dateOnly}")`;
    }

    generateCarouselDateSelector(): string {
        const now = new Date();

        const dayName = now.toLocaleString("default", { weekday: "short" });
        const monthName = now.toLocaleString("default", { month: "short" });
        const day = now.getDate();

        const dateText = `${dayName} ${monthName} ${day}`;
        return `new UiSelector().text("${dateText}")`;
    }

    async displayColorsCategory(): Promise<boolean> {
        return (await this.verifyIsElementDisplayed("yellowEmotions")
            && await this.verifyIsElementDisplayed("greenEmotions")
            && await this.verifyIsElementDisplayed("blueEmotions")
            && await this.verifyIsElementDisplayed("redEmotions"));
    }

    async isUsageLimitReached(): Promise<boolean> {
        try{
            const usageLimitSelector = `new UiSelector().text("Usage limit reached. Please try again tomorrow.")`;
            const element = await $(`android=${usageLimitSelector}`);

            return await element.isDisplayed();
        }catch(error){
            return false;
        }
    }

    async areTakeawaysDisplayed(): Promise<boolean> {
        try {
            const timeout = 10000;
            await this.waitFor("suggestedActions", timeout);
            await this.swipeVertical("up", 0.5);
            await this.waitFor("affirmations", timeout);
            await this.waitFor("insights", timeout);
            await browser.pause(1000);
            return true;
        } catch (error) {
            return false;
        }
    }

    async tapButtonByInstance(instance: number): Promise<void> {
        await this.tapElement(`android=new UiSelector().className("android.widget.Button").instance(${instance})`);
    }

    // Tapping the buttons with instances 0, 1, and 2
    async tapAllButtons(): Promise<void> {
        for (let i = 0; i < 3; i++) {
            await this.locators.selectValue("className", "android.view.Button") + await this.locators.selectValue("instance", `${i}`);
        }
    }

    async dismissReflectModalIfPresent(): Promise<boolean> {
        const modalPresent = await this.verifyIsElementDisplayed("notNowButton", 2000);
        if (modalPresent) {
            await this.tapElementButton("notNowButton");
            return true;
        } else {
            return false;
        }
    }

    async tapDateTimeDisplay(date?: Date): Promise<void> {
        const dateTimeSelector = await this.generateCurrentDateTimeSelector();
        await this.tapElement(`android=${dateTimeSelector}`);
    }

    async isPreviousDateDisplayed(): Promise<boolean> {
        const previousDateSelector = this.generatePreviousDisplayDateSelector();
        return await this.isElementDisplayed(`android=${previousDateSelector}`);
    }

    async selectPreviousDateInCarousel(): Promise<void> {
        const dateSelector = this.generateCarouselDateSelector();
        const dateElement = await this.waitForElement(`android=${dateSelector}`);

        const elementLocation = await dateElement.getLocation();
        const elementSize = await dateElement.getSize();

        // SWIPE DOWN to select previous date in date carousel
        const centerX = elementLocation.x + elementSize.width / 2
        const startY = elementLocation.y + elementSize.height * 0.1;
        const endY = elementLocation.y + elementSize.height * 2;

        await driver.performActions([
            {
                type: "pointer",
                id: "finger",
                parameters: { pointerType: "touch" },
                actions: [
                    { type: "pointerMove", duration: 0, x: centerX, y: startY },
                    { type: "pointerDown", button: 0 },
                    { type: "pointerMove", duration: 800, x: centerX, y: endY },
                    { type: "pointerUp", button: 0 },
                ],
            },
        ]);

        await driver.releaseActions();
        await browser.pause(1000);
    }



}