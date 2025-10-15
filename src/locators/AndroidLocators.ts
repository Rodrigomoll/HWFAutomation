import { BaseLocators } from "./BaseLocators";

/**
 * Locator definitions and selector logic for the Android platform.
 *
 * Extends the shared BaseLocators class and implements Android-specific
 * selector building and status verification.
 */
export class AndroidLocators extends BaseLocators {
    constructor() {
        super();

        this.elements = {
            ...this.elements,
            
            getStarted: { type: "text", value: "Get started"},
            emotionalToolsPrompt: { type: "text", value: "Want to change how you feel?\nExplore tools for emotional\nregulation!" },
            textInput: { type: "className", value: "android.widget.ScrollView" },
            next: { type: "description", value: "Next" },
            settings: { type: "description", value: "Settings" },
            editText: { type: "className", value: "android.widget.EditText" },
            imFeelingText: { type: "text", value: "I\'m feeling" },
            closeButton: { type: "description", value: "Close" },
            done: { type: "text", value: "Done" },
            finish: { type: "text", value: "Finish" },
            save: { type: "text", value: "Save" },
            dataPrompt: { type: "text", value: "Time, weather, \nsleep & exercise" },
            newCheckin: { type: "description", value: "New check In" },
            tools: { type: "text", value: "Tools", instance: 0 },
        }
    }

    async buildSelector(
        element: string | { type: string; value: string; instance?: number }
    ): Promise<string> {
        let type: string, value: string, instance: number | undefined;

        if (typeof element === "string") {
            const definedElement = this.elements[element];
            if (!definedElement) {
                throw new Error(`Element '${element}' is not defined in this.elements`);
            }
            ({ type, value, instance } = definedElement);
        } else {
            ({ type, value, instance } = element);
        }   

        let selector = "";
        
        switch (type) {
            case "text":
                selector = `new UiSelector().text("${value}")`;
                break;
            case "partialMatch":
                selector = `~${value}`;
                break;
            case "className":
                selector = `new UiSelector().className("${value}")`;
                break;
            case "description":
                selector = `new UiSelector().description("${value}")`;
                break;
            case "contains":
                selector = `new UiSelector().textContains("${value}")`;
                break;
            case "resource":
                selector = `new UiSelector().resourceId("${value}")`;
                break;
            default:
                throw new Error(`Unknown selector type: ${type}`);
        }

        if (instance !== undefined) {
            selector += `.instance(${instance})`;
        }

        return `android=${selector}`;
    }

    async verifyStatusElement(element){
        const val = await element.getAttribute("checked");
        return val === "true";
    }
    
}