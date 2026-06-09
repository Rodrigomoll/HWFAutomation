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
            
            yellowQuadrant: { type: "text", value: "svg_moodmeter_cell_pleased" },
            pleasedEmotion: { type: "text", value: "svg_moodmeter_cell_pleased" },
            emotionalToolsPrompt: { type: "text", value: "tooltip_view_description" },
            textInput: { type: "textView", value: null },
            settings: { type: "text", value: "SettingsButton" },
            finish: { type: "button", value: "journal_editor_done_button" },
            journalEntry: { type: "component", value: `//*[@name="Add Journal Entry" or @name="Entrada de diario"]` },
            complete: { type: "component", value: `//*[@name="Complete check-in" or @name="Check-in completado"]` },
            closeButton: { type: "text", value: "Close" },
            newCheckin: { type: "text", value: "checkin_circle_checkin_button" },
            tools: { type: "component", value: `//*[@name="Tools" or @name="Herramientas"]` },
            reflectModal: { type: "text", value: "reflect_promo_introducing_label" },
            continue: { type: "component", value: `//*[@name="Continue" or @name="Continuar"]`},
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