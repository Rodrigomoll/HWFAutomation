import { ReflectPage } from "../ReflectPage";
import { verifyCheckInHomeScreen } from "../../helpers/verifyCheckInHomeScreen";

/**
 * iOS implementation of the Reflect page.
 * Defines iOS-specific locators and behavior.
 */
export class iOSReflectPage extends ReflectPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,

            suggestedActions: { type: "text", value: "     Suggested action" },
            affirmations: { type: "text", value: "     Affirmations" },
            insights: { type: "text", value: "     Insight" },
            goDeeper: { type: "component", value: `//XCUIElementTypeApplication[@name="How We Feel"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[4]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeButton[2]` },
            goFinish: { type: "component", value: `(//XCUIElementTypeButton[@name="Finish"])[2]` },
            done: { type: "component", value: `//XCUIElementTypeButton[@name="Done"]` },
            prueba: { type: "component", value: `//XCUIElementTypeApplication[@name="How We Feel"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[4]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeCollectionView/XCUIElementTypeCell[3]` },

        }
    }

    async isUsageLimitReached(): Promise<boolean> {
        return await this.verifyIsElementDisplayed({type: "text", value: "We couldn't connect to our AI provider. Are you connected to the internet?"});
    }

    async completeReflectStep(done: boolean = true, toolTip: boolean) {
        await this.tapButton(done ? "done" : "goFinish");
        await driver.pause(1000);

        if(await this.verifyIsElementDisplayed("done")) await this.tapButton("done");
        if(await this.verifyIsElementDisplayed("finish")) await this.tapButton("finish");        

        await this.checkinPage.completeCheckIn();

        if(await this.verifyIsElementDisplayed("closeButton")){
            await this.tapButton("closeButton");
        }

        await driver.pause(2000);
        
        if(toolTip) await verifyCheckInHomeScreen();
    }

    async tapAllTakeawaysButtons(): Promise<void> {
        for (let i = 2; i < 5; i++) {
            await this.tapButton({type: "component", value: `//XCUIElementTypeApplication[@name="How We Feel"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[4]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[1]/XCUIElementTypeScrollView/XCUIElementTypeOther[1]/XCUIElementTypeOther[${i}]/XCUIElementTypeOther/XCUIElementTypeButton` });
        }
    }

    async getJournalInputKey() {
        return "prueba";
    }

    async tapFinish(){
        await this.tapButton("goFinish");
    }

    async dismissShareModal() {
        // Not applicable
    }

}