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
            quadrantPrompt: { type: "text", value: "moodmeter_pulsars_title_label" },
            redQuadrant: { type: "text", value: "moodmeter_quadrant_label_0" },
            blueQuadrant: { type: "text", value: "svg_moodmeter_cell_bored" },
            greenQuadrant: { type: "text", value: "svg_moodmeter_cell_calm" },
            checkinPrompt: { type: "contains", value: "How are you feeling this" },
            uneasyEmotion: { type: "text", value: "svg_moodmeter_cell_uneasy" },
            uneasyEmotionLabel: { type: "text", value: "fullscreen_checkin_moods_label" },
            uneasyText: { type: "text", value: "checkin_journal_note_text" },
            calmEmotion: { type: "text", value: "moodmeter_quadrant_label_3" },
            calmEmotionLabel: { type: "text", value: "calm" },
            boredEmotion: { type: "text", value: "moodmeter_quadrant_label_2" },
            absorbedEmotion: { type: "text", value: "Absorbed" },
            yellowEmotions: { type: "text", value: "Yellow" },
            tagPrompt: { type: "text", value: "checkin_details_feeling_label" },
            themesTag: { type: "component", value: `//*[@name="What are you doing?" or @name="¿Qué estás haciendo?"]` },
            peopleTag: { type: "component", value: `//*[@name="Who are you with?" or @name="¿Con quién estás?"]` },
            placesTag: { type: "component", value: `//*[@name="Where are you?" or @name="¿Dónde estás?"]` },
            drivingTag: { type: "component", value: `//*[@value="Driving" or @value="Conduciendo"]` },
            myselfTag: { type: "component", value: `//*[@value="By Myself" or @value="Por mí mismo"]` },
            commutingTag: { type: "component", value: `//*[@value="Commuting" or @value="De camino al trabajo"]` },
            deeper: { type: "text", value: "journal_editor_reflect_button" },
            aiEnablePrompt: { type: "component", value: `//*[@name="Do you want to use AI features?" or @name="¿Quieres utilizar las funciones de IA??"]` },
            enableAI: { type: "component", value: `//*[@name="Enable AI features" or @name="Habilitar las funciones de IA"]` },
            checkinCard: { type: "text", value: "checkin_card_title_label" },
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
        await assertAllTrue(this.verifyIsElementDisplayed("checkinCard"));
        await this.tapButton("checkinCard");
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