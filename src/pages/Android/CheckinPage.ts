import { CheckinPage } from "../CheckinPage";
import { assertAllTrue } from "../../helpers/assertAllTrue";

/**
 * Android-specific implementation of the CheckinPage.
 * 
 * Contains locators and interaction methods tailored for
 * the Android platform UI elements and behaviors.
 * 
 * Extends the generic CheckinPage with Android platform details.
 */
export class AndroidCheckinPage extends CheckinPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,

            quadrantPrompt: { type: "text", value: "Tap the color that best describes how you feel right now" },
            redQuadrant: { type: "text", value: "High Energy\nUnpleasant" },
            blueQuadrant: { type: "text", value: "Low Energy\nUnpleasant" },
            tagPrompt: { type: "contains", value: "What were you doing when you felt" },
            themesTag: { type: "text", value: "Themes" },
            peopleTag: { type: "text", value: "People" },
            placesTag: { type: "text", value: "Places" },
            drivingTag: { type: "text", value: "Driving" },
            myselfTag: { type: "text", value: "By Myself" },
            commutingTag: { type: "text", value: "Commuting" },
            journalPrompt: { type: "contains", value: "Describe what might be causing you to feel" },
            microphone: { type: "description", value: "Open microphone" },
            camera: { type: "description", value: "Open camera" },
            reflect: { type: "description", value: "Reflect" },
            reflectPrompt: { type: "text", value: "Reflect" },
            addFeeling: { type: "className", value: "android.view.View", instance: 4 },
            searchInput: { type: "text", value: "Search feelings to add" },
            threeDots: { type: "className", value: "android.widget.Button", instance: 4 },
            delete: { type: "text", value: "Delete Check-In" },
            confirm: { type: "text", value: "Yes" },
            notNow: { type: "text", value: "Not now" },
        }
    }
    
    async tapEmotionInQuadrant(emotion: 'pleased' | 'uneasy' | 'calm' | 'bored'){
        await this.tapButton(emotion);
    }

    async verifyAndSelectTags() {
        await assertAllTrue(this.verifyIsElementDisplayed("tagPrompt"));
        await this.selectDefaultTags();
        await this.tapButton("next");
    }

    async addJournalEntry(input: string, next: boolean = true) {
        if(!(await this.verifyIsElementDisplayed("journalPrompt") 
                && await this.verifyIsElementDisplayed("microphone")
                && await this.verifyIsElementDisplayed("camera"))){
            await this.swipeVertical("down", 0.6);
        }

        await this.enterTextJournal("textInput", input);

        await this.tapButton(next ? "next" : "reflect");
    }

    async verifyDataPromptVisible(){
        await assertAllTrue(this.verifyIsElementDisplayed("dataPrompt"));
    }

    async completeCheckIn() {
        await this.verifyDataPromptVisible();
        await this.tapButton("save");
    }

    async dismissModalIfVisible(){
        if(await this.verifyIsElementDisplayed("reflectPrompt") && await this.verifyIsElementDisplayed("notNow", 2000))
            await this.tapButton("notNow");
    }

    async verifyEmotionMainScreen(emotion: string): Promise<void> {
        await assertAllTrue(this.verifyIsElementDisplayed("imFeelingText") && this.verifyIsElementDisplayed(emotion));
        await this.tapButton(emotion);
    }

    async getJournalInputLocator() {
        return "editText";
    }

    async buildDateSelector(yesterday: boolean, date: string, type: string): Promise<string> {
        return await this.locator.buildSelector({type: "contains", value: date});
    }

    async scrollToPreviousDateInCarousel(): Promise<void> {
        const dateElement = await this.waitForElement(await this.getFormattedDateSelector(false, "short"));
        
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

    async saveAction(){
        await this.tapButton("save");
        await this.tapButton("save");
    }

    async addEmotion(){
        await this.tapButton("addFeeling");
    }

    async confirmDeletion(){
        await this.tapButton("confirm");
    }

    async saveJournalEntry(text: string){
        await assertAllTrue(this.verifyIsElementDisplayed({type: "text", value: text}));
        await this.saveAction();
    }

}