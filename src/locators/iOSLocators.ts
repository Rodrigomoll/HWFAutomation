import { BaseLocators } from "./BaseLocators";

/**
 * Locator definitions and selector logic for the iOS platform.
 *
 * Extends the shared BaseLocators class and implements iOS-specific
 * selector building and status verification.
 */
export class iOSLocators extends BaseLocators {
    constructor() {
        super();

        this.elements = {
            ...this.elements,
            
            getStarted: { type: "text", value: "Get Started"},
            emotionalToolsPrompt: { type: "text", value: "Want to change how you feel? Explore tools for emotional regulation!" },
            textInput: { type: "textView", value: null },
            settings: { type: "text", value: "SettingsButton" },
            finish: { type: "button", value: "Finish" },
            journalEntry: { type: "text", value: "Add Journal Entry" },
            closeButton: { type: "text", value: "Close" },
            newCheckin: { type: "text", value: "CheckInButton" },
            tools: { type: "button", value: "Tools" },
        }
    }

    async buildSelector(
        element: string | { type: string; value: string; }
    ): Promise<string> {
        let type: string, value: string;

        if (typeof element === "string") {
            const definedElement = this.elements[element];
            if (!definedElement) {
                throw new Error(`Element '${element}' is not defined in this.elements`);
            }
            ({ type, value } = definedElement);
        } else {
            ({ type, value } = element);
        }   

        let selector = "";

        switch (type) {
            case "text":
                selector = `~${value}`;
                break;
            case "textView":
                selector = `//XCUIElementTypeTextView`;
                if(value) selector += `[@value="${value}"]`;
                break;
            case "button":
                selector = `//XCUIElementTypeButton[@name="${value}"]`;
                break;
            case "component":
                selector = `${value}`;
                break;
            case "navigation":
                selector = `//XCUIElementTypeNavigationBar[@name="${value}"]/XCUIElementTypeButton`;
                break;
            case "image":
                selector = `//XCUIElementTypeImage[@name="${value}"]`;
                break;
            case "static":
                selector = `//XCUIElementTypeStaticText[@name="${value}"]`;
                break;
            case 'contains':
                selector = `//XCUIElementTypeStaticText[contains(@label, "${value}")]`;
                break;
            case 'field':
                selector = `//XCUIElementTypeTextField[@value="${value}"]`;
                break;
            case 'wheel':
                selector = `//XCUIElementTypePickerWheel[@value="${value}"]`;
                break;
            default:
                throw new Error(`Unknown selector type: ${type}`);
        }

        return `${selector}`;
    }

    async verifyStatusElement(element){
        const val = await element.getAttribute("value");
        return val === "1";
    }

}