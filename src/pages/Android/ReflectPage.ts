import { ReflectPage } from "../ReflectPage";
import { verifyCheckInHomeScreen } from "../../helpers/verifyCheckInHomeScreen";

/**
 * Android implementation of the Reflect page.
 * Defines Android-specific locators and behavior.
 */
export class AndroidReflectPage extends ReflectPage {
    constructor() {
        super();

        this.locator.elements = {
            ...this.locator.elements,

            suggestedActions: { type: "text", value: "[icon] Suggested actions" },
            affirmations: { type: "text", value: "[icon] Affirmations" },
            insights: { type: "text", value: "[icon] Insight" },
            goDeeper: { type: "text", value: "Go Deeper" },
            shareEmotionsModal: {type: "text", value: "Share your emotions with friends"},
            close: {type: "className", value: "android.widget.Button", instance: 0},
        }
    }

    async isUsageLimitReached(): Promise<boolean> {
        return await this.verifyIsElementDisplayed({type: "text", value: "Usage limit reached. Please try again tomorrow."});
    }

    async completeReflectStep(done: boolean = true, toolTip: boolean) {
        await this.tapButton(done ? "done" : "finish");
        await this.tapButton("next");

        await this.checkinPage.completeCheckIn();

        if(await this.verifyIsElementDisplayed("save")){
            await this.tapButton("save");
        }

        await driver.pause(2000);
        
        if(toolTip) await verifyCheckInHomeScreen();
    }

    async tapAllTakeawaysButtons(): Promise<void> {
        for (let i = 0; i < 3; i++) {
            await this.tapButton({type: "className", value: "android.widget.Button", instance: i });
        }
    }

    async getJournalInputKey() {
        return "editText";
    }

    async tapFinish(){
        await this.tapButton("finish");
    }

    async dismissShareModal() {
        if(await this.verifyIsElementDisplayed("shareEmotionsModal")){
            await this.tapButton("close")
        }
        await driver.pause(1000);
    }

}