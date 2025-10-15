import { CheckinPage } from "../CheckinPage";
import { assertAllTrue } from "../../helpers/assertAllTrue";

/**
 * iOS-specific implementation of the CheckinPage.
 * 
 * Contains locators and interaction methods tailored for
 * the iOS platform UI elements and behaviors.
 * 
 * Extends the generic CheckinPage with iOS platform details.
 */
export class iOSCheckinPage extends CheckinPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,
            quadrantPrompt: { type: "text", value: "Tap the color that best describes\nhow you feel right now" },
            redQuadrant: { type: "text", value: "High Energy \nUnpleasant" },
            blueQuadrant: { type: "text", value: "Low Energy \nUnpleasant" },
            tagPrompt: { type: "text", value: "I’m feeling" },
            themesTag: { type: "text", value: "What are you doing?" },
            peopleTag: { type: "text", value: "Who are you with?" },
            placesTag: { type: "text", value: "Where are you?" },
            drivingTag: { type: "field", value: "Driving" },
            myselfTag: { type: "field", value: "By Myself" },
            commutingTag: { type: "field", value: "Commuting" },
            deeper: { type: "text", value: "Go deeper" },
            aiEnablePrompt: { type: "text", value: "Do you want to use AI features?" },
            enableAI: { type: "text", value: "Enable AI features" },
            agoTiming: { type: "contains", value: "ago" },
            addEmotion: { type: "static", value: "Add Emotion" },
            searchInput: { type: "component", value: `(//XCUIElementTypeButton[@name="SearchButton"])[2]` },
            updateTime: { type: "text", value: "Update Time" },
            threeDots: { type: "component", value: "//XCUIElementTypeWindow/XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeButton[2]" },
            delete: { type: "text", value: "Delete check-in" },
        }
    }

    async tapEmotionInQuadrant(emotion: 'pleased' | 'uneasy' | 'calm' | 'bored'){
        await this.tapButton(emotion);
        await this.tapButton(emotion);
    }

    async verifyAndSelectTags() {
        await assertAllTrue(this.verifyIsElementDisplayed("tagPrompt"));
        await this.swipeVertical("up", 0.6);
        await this.selectDefaultTags();
    }

    async addJournalEntry(input: string, next: boolean = true) {
        if(!(await this.verifyIsElementDisplayed("journalEntry"))){
            await this.swipeVertical("down", 0.6);
        }

        await this.tapButton("journalEntry");

        await this.enterTextJournal("textInput", input);

        await this.tapButton(next ? "finish" : "deeper");

        if(await this.verifyIsElementDisplayed("reflectModal")){
            await this.tapButton("continue");
            await assertAllTrue(this.verifyIsElementDisplayed("aiEnablePrompt"));
            await this.tapButton("enableAI");
        }
    }

    async verifyDataPromptVisible(){
        // Not applicable
    }

    async completeCheckIn() {
        await this.tapButton("complete");
    }

    async dismissModalIfVisible(){
        if(await this.verifyIsElementDisplayed("closeButton"))
            await this.tapButton("closeButton");
    }

    async verifyEmotionMainScreen(): Promise<void> {
        await assertAllTrue(this.verifyIsElementDisplayed("agoTiming"));
        await this.tapButton("agoTiming");
    }

    async getJournalInputLocator() {
        return "textInput";
    }

    async buildDateSelector(yesterday: boolean, date: string, type: string): Promise<string> {
        if(yesterday){
            return await this.locator.buildSelector({type: "text", value: date});
        }
        else {
            return await this.locator.buildSelector({type: type === "long" ? "contains" : "wheel", value: "Today"});
        }
    }

    async scrollToPreviousDateInCarousel(): Promise<void> {
        const dateElement = await this.waitForElement(await this.getFormattedDateSelector(false, "short"));
        
        await driver.execute('mobile: selectPickerWheelValue', {
            element: dateElement.elementId,
            order: 'previous',
            offset: 0.15
        });
        
        await browser.pause(1000);
    }

    async saveAction(){
        await this.tapButton("updateTime");
        await this.tapButton("complete");
        await driver.pause(2000);
    }

    async addEmotion(){
        await this.swipeVertical("down", 0.6);
        await this.tapButton("addEmotion");
    }

    async confirmDeletion(){
        await this.swipeVertical("down", 1);
        await driver.pause(20000);
    }

    async saveJournalEntry(text: string){
        await assertAllTrue(this.verifyIsElementDisplayed({type: "textView", value: text}));
        await this.tapButton("finish", 200);
    }

}