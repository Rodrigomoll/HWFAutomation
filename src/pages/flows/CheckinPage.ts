import { verify } from "../../helpers/testVerification";

export class CheckinPage {
    public locator;

    constructor(locator) {
        this.locator = locator;
    }

    //////////////// Functions repetidas

    async areAllQuadrantsDisplayed(): Promise<boolean> {
        return (await this.locator.verifyIsElementDisplayed("redQuadrant") 
            && await this.locator.verifyIsElementDisplayed("yellowQuadrant")
            && await this.locator.verifyIsElementDisplayed("blueQuadrant")
            && await this.locator.verifyIsElementDisplayed("greenQuadrant"));
    }

    async QuadrantsStep() {
        await driver.pause(2000);
        await verify(this.locator.verifyIsElementDisplayed("newCheckin"));
        await this.locator.tapButton("newCheckin");
        await verify(this.locator.verifyIsElementDisplayed("quadrantPrompt"), this.areAllQuadrantsDisplayed());
    }

    async selectTags() {
        await this.locator.tapButton("drivingTag");
        await this.locator.tapButton("myselfTag");
        await this.locator.tapButton("commutingTag");
    }

    async areThemesDisplayed(): Promise<boolean> {
        return (await this.locator.verifyIsElementDisplayed("themesTag") 
            && await this.locator.verifyIsElementDisplayed("peopleTag")
            && await this.locator.verifyIsElementDisplayed("placesTag"));
    }

    async tagsStep() {
        await verify(this.locator.verifyIsElementDisplayed("tagPrompt"));

        if(!this.locator.isAndroidPlatform){
            await this.locator.swipeVertical("up", 0.6);
        } 
        await verify(this.areThemesDisplayed());
        await this.selectTags();

        if(this.locator.isAndroidPlatform) await this.locator.tapButton("next");
    }

    async isJournalScreenDisplayed(): Promise<boolean> {
        if(this.locator.isAndroidPlatform){
            return (await this.locator.verifyIsElementDisplayed("journalPrompt") 
                && await this.locator.verifyIsElementDisplayed("microphone")
                && await this.locator.verifyIsElementDisplayed("camera"));
        }
        else {
            return await this.locator.verifyIsElementDisplayed("journalEntry");
        }
    }

    async journalStep(input: string, next: boolean = true) {
        if(!await this.isJournalScreenDisplayed()){
            await this.locator.swipeVertical("down", 0.6);
        }

        if(!this.locator.isAndroidPlatform) await this.locator.tapButton("journalEntry");

        await this.locator.enterTextJournal("textInput", input);

        if(this.locator.isAndroidPlatform) await this.locator.tapButton(next ? "next" : "reflect");
        else await this.locator.tapButton(next ? "finish" : "deeper");

        if(!this.locator.isAndroidPlatform && await this.locator.verifyIsElementDisplayed("reflectModal")){
            await this.locator.tapButton("continue");
            await verify(this.locator.verifyIsElementDisplayed("aiEnablePrompt"));
            await this.locator.tapButton("enableAI");
        }
    }

    async tagsAndJournalStep(input: string, next: boolean) {
        await this.tagsStep();
        await this.journalStep(input, next);
    } 
    
    async handleChangeTooltip(): Promise<boolean> {
        const tooltipPresent = await this.locator.verifyIsElementDisplayed("emotionalToolsPrompt");

        if (tooltipPresent) {
            await this.locator.tapScreenCenter();
            return true;
        }
        return false;
    }

    async isCheckinCompleted(): Promise<boolean> {
        try {
            return (await this.locator.verifyIsElementDisplayed("newCheckin")
                && await this.locator.verifyIsElementDisplayed("tools"));
        } catch (error) {
            return false;
        }
    }

    async completeCheckin(again: boolean = true){
        if (await this.handleChangeTooltip()) {
            await verify(this.isCheckinCompleted());
        }
        if(again) await verify(this.isCheckinCompleted());
    }

    async dataAndSaveStep() {
        if(this.locator.isAndroidPlatform){
            await verify(this.locator.verifyIsElementDisplayed("dataPrompt"));
            await this.locator.tapButton("save");
        }
        else {
            await this.locator.tapButton("complete");
        }
    }

    async completeReflectStep(done: boolean = true, toolTip: boolean) {
        if(this.locator.isAndroidPlatform) {
            await this.locator.tapButton(done ? "done" : "finish");
            await this.locator.tapButton("next");
        }
        else {
            await this.locator.tapButton(done ? "done" : "goFinish");
            await driver.pause(1000);

            if(await this.locator.verifyIsElementDisplayed("done")) await this.locator.tapButton("done");
            if(await this.locator.verifyIsElementDisplayed("finish")) await this.locator.tapButton("finish");
        }

        await this.dataAndSaveStep();

        if(!this.locator.isAndroidPlatform && await this.locator.verifyIsElementDisplayed("closeButton")){
            await this.locator.tapButton("closeButton");
        }

        if(this.locator.isAndroidPlatform && await this.locator.verifyIsElementDisplayed("save")){
            await this.locator.tapButton("save");
        }

        await driver.pause(2000);
        
        if(toolTip) await this.completeCheckin(true);
    }
    
///// Emotions

    async tapEmotion(quadrant: string | null, emotion: string): Promise<boolean> {
        try{
            if(quadrant) await this.locator.tapButton(quadrant);
            await verify(this.locator.verifyIsElementDisplayed(emotion));
            await this.locator.tapButton(emotion);

            if(!this.locator.isAndroidPlatform) await this.locator.tapButton(emotion);

            return true;
        } catch (error) {
            return false;
        }
    }


    ////////////////
    // card

    async isCheckinDisplayed(emotion: string): Promise<boolean> {
        await this.locator.swipeVertical("up", 0.7);
        await browser.pause(1000);

        if(this.locator.isAndroidPlatform) {
            return await this.locator.verifyIsElementDisplayed("imFeelingText") && await this.locator.verifyIsElementDisplayed(emotion);
        }
        else {
            return await this.locator.verifyIsElementDisplayed(emotion);
        }
    }

    async isCheckinCardDisplayed(emotion: string): Promise<boolean> {
        return (await this.locator.verifyIsElementDisplayed(emotion));
    }

    async editJournalEntry(newText: string): Promise<void> {
        const element = await this.locator.waitFor(this.locator.isAndroidPlatform ? "editText" : "textInput");
        await element.setValue(newText);
        await driver.pause(1000);
    }

    async editJournalFlow(emotion: string, newText: string): Promise<void> {
        await this.locator.tapButton(emotion);
        await driver.pause(2000);

        await this.editJournalEntry(newText);

        await this.locator.tapButton("save");
        await driver.pause(2000);
    }

    async deleteCheckinFlow(): Promise<void> {
        await this.locator.tapButton("threeDots");
        await driver.pause(2000);

        await this.locator.tapButton("delete");
        await driver.pause(2000);

        await this.locator.tapButton("confirm");
        await driver.pause(2000);
    }

    async verifyIsNewElementDisplayed(
        type: string,
        element: string,
        timeout?: number
    ): Promise<boolean> {
        return await this.locator.verifyIsElementDisplayed({ type: type, value: element }, timeout ?? null);
    }

    // others

    async displayColorsCategory(): Promise<boolean> {
        return (await this.locator.verifyIsElementDisplayed("yellowEmotions")
            && await this.locator.verifyIsElementDisplayed("greenEmotions")
            && await this.locator.verifyIsElementDisplayed("blueEmotions")
            && await this.locator.verifyIsElementDisplayed("redEmotions"));
    }

    async dismissReflectModalIfPresent(): Promise<boolean> {
        const modalPresent = await this.locator.verifyIsElementDisplayed("notNow", 2000);
        if (modalPresent) {
            await this.locator.tapButton("notNow");
            return true;
        } else {
            return false;
        }
    }

    async isUsageLimitReached(): Promise<boolean> {
        try{
            if(this.locator.isAndroidPlatform) {
                return await this.locator.verifyIsElementDisplayed({type: "text", value: "Usage limit reached. Please try again tomorrow."});
            }
            else {
                return await this.locator.verifyIsElementDisplayed({type: "text", value: "We couldn't connect to our AI provider. Are you connected to the internet?"});
            }
        }catch(error){
            return false;
        }
    }

    async areTakeawaysDisplayed(): Promise<void> {

        await this.locator.swipeVertical("up", 2.0);
        await driver.pause(2000);
        await this.locator.swipeVertical("up", 0.5);
        await driver.pause(2000);
        const timeout = 10000;

        await verify(this.locator.verifyIsElementDisplayed("affirmations", timeout),
            this.locator.verifyIsElementDisplayed("insights", timeout),
            this.locator.verifyIsElementDisplayed("suggestedActions", timeout));
    }

    async tapAllButtons(): Promise<void> {
        if(this.locator.isAndroidPlatform){
            for (let i = 0; i < 3; i++) {
                await this.locator.tapButton({type: "className", value: "android.widget.Button", instance: i });
            }
        }
        else {
            for (let i = 2; i < 5; i++) {
                await this.locator.tapButton({type: "component", value: `//XCUIElementTypeApplication[@name="How We Feel"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[4]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeOther[${i}]/XCUIElementTypeOther/XCUIElementTypeButton` });
            }
        }
    }

    async tapButtonByInstance(instance: number): Promise<void> {
        await this.locator.tapElement(await this.locator.buildSelector({type: "className", value: "android.widget.", instance: instance}));
    }

    async generateDateTimeSelector(yesterday: boolean, type: "long" | "short"): Promise<string> {
        const date = new Date();
        if(yesterday) date.setDate(date.getDate() - 1);

        const day = date.getDate();
        const dayName = date.toLocaleString("default", { weekday: type });
        const monthName = date.toLocaleString("default", { month: type });

        if(this.locator.isAndroidPlatform){
            return await this.locator.buildSelector({type: "contains", value: `${dayName} ${monthName} ${day}`});
        }
        else {
            if(yesterday){
                return await this.locator.buildSelector({type: "text", value: `${dayName} ${monthName} ${day}`});
            }
            else {
                return await this.locator.buildSelector({type: type === "long" ? "contains" : "wheel", value: "Today"});
            }
        }
    }

    async tapDateTimeDisplay(): Promise<void> {
        await this.locator.tapElement(await this.generateDateTimeSelector(false, "long"));
    }

    async isPreviousDateDisplayed(): Promise<boolean> {
        return await this.locator.isElementDisplayed(await this.generateDateTimeSelector(true, "short"));
    }

    async selectPreviousDateInCarousel(): Promise<void> {
        const dateElement = await this.locator.waitForElement(await this.generateDateTimeSelector(false, "short"));

        if(this.locator.isAndroidPlatform){

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
        }
        else {
            await driver.execute('mobile: selectPickerWheelValue', {
                element: dateElement.elementId,
                order: 'previous',
                offset: 0.15
            });

            await browser.pause(1000);

            const newValue = await dateElement.getAttribute("value");
            console.log("Valor actual:", newValue);
        }
        await browser.pause(1000);
    }

}