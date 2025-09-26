import { BaseLocators } from "./BaseLocators";

export class iOSLocators extends BaseLocators {
    constructor() {
        super();

        this.elements = {
            ...this.elements,
            // Texts / Prompt
            introPrompt: { type: "text", value: "How We Feel—\nA Journal for\nYour Wellbeing" },
            patternsPrompt: { type: "text", value: "And over time, spot patterns to gain insights" },
            freeInfoPrompt: { type: "text", value: "It’s free—\nMade possible by donations" },
            explorePrompt: { type: "text", value: "Before jumping in,\nlet's explore why you're here." },
            helpPrompt: { type: "text", value: "Great! How We\nFeel will help you:" },
            firstCheckinPrompt: { type: "text", value: "Let’s do your\nfirst check-in" },
            explorePleasedPrompt: { type: "text", value: "Explore why you might be feeling pleased" },
            completePrompt: { type: "text", value: "Remember to check in regularly to spot patterns" },
            frecuencyPrompt: { type: "text", value: "How often do you\nwant to check in?" },
            reminderPrompt: { type: "text", value: "What time do you want to be reminded?" },
            emotionalToolsPrompt: { type: "text", value: "Want to change how you feel? Explore tools for emotional regulation!" },

            // Modals

            // Inputs
            textInput: { type: "textView", value: null },

            // Buttons
            getStarted: { type: "text", value: "Get Started"},
            close: { type: "navigation", value: "HowWeFeel_Moodmeter.DeadSimpleVideoView" },
            closeButton: { type: "text", value: "Close" },
            arrowRight: { type: "text", value: "TagArrowRight" },
            twicePerDay: { type: "text", value: "2 per day (recommended)" },
            addWidget: { type: "text", value: "Add the widget" },
            journalEntry: { type: "text", value: "Add Journal Entry" },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            /// checkin Page
            newCheckin: { type: "text", value: "CheckInButton" },
            checkinSaved: { type: "text", value: "Check-in saved" },

            // Quadrants
            quadrantPrompt: { type: "text", value: "Tap the color that best describes\nhow you feel right now" },
            redQuadrant: { type: "text", value: "High Energy \nUnpleasant" },
            blueQuadrant: { type: "text", value: "Low Energy \nUnpleasant" },

            // Tags
            tagPrompt: { type: "text", value: "I’m feeling" },
            themesTag: { type: "text", value: "What are you doing?" },
            peopleTag: { type: "text", value: "Who are you with?" },
            placesTag: { type: "text", value: "Where are you?" },

            // Theme tags
            drivingTag: { type: "field", value: "Driving" },
            myselfTag: { type: "field", value: "By Myself" },
            commutingTag: { type: "field", value: "Commuting" },

            agoTiming: { type: "contains", value: "ago" },

            reflectPrompt: { type: "button", value: "Reflect" },
            tools: { type: "button", value: "Tools" },
            threeDots: { type: "component", value: "//XCUIElementTypeWindow/XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeButton[2]" },
            delete: { type: "text", value: "Delete check-in" },
            updateTime: { type: "text", value: "Update Time" },
            filter: { type: "text", value: "Filter" },
            healthData: { type: "text", value: "Health Data" },
            attachment: { type: "text", value: "Attachment" },
            addEmotion: { type: "static", value: "Add Emotion" },

            searchInput: { type: "component", value: `(//XCUIElementTypeButton[@name="SearchButton"])[2]` },

            // Friends
            signInPrompt: { type: "text", value: "Sign in / Create account" },
            signIn: { type: "text", value: "Continue with Google" },
            accountEmail: { type: "component", value: "//XCUIElementTypeLink" },
            justFeeling: { type: "text", value: "Just the\nfeeling" },

            // Settings
            settings: { type: "text", value: "SettingsButton" },
            settingsPrompt: { type: "text", value: "Settings" },

            // AI
            aiToggle: { type: "component", value: `//XCUIElementTypeSwitch` },
            aiEnablePrompt: { type: "text", value: "Do you want to use AI features?" },
            enableAI: { type: "text", value: "Enable AI features" },
            back: { type: "component", value: "//XCUIElementTypeButton" },

            // Reflect
            deeper: { type: "text", value: "Go deeper" },
            goDeeper: { type: "component", value: `//XCUIElementTypeApplication[@name="How We Feel"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[4]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[3]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeButton[2]` },
            suggestedActions: { type: "text", value: "     Suggested action" },
            affirmations: { type: "text", value: "     Affirmations" },
            insights: { type: "text", value: "     Insight" },
            prueba: { type: "component", value: `//XCUIElementTypeApplication[@name="How We Feel"]/XCUIElementTypeWindow[1]/XCUIElementTypeOther[4]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther[2]/XCUIElementTypeOther[2]/XCUIElementTypeCollectionView/XCUIElementTypeCell[3]` },
            finish: { type: "button", value: "Finish" },
            goFinish: { type: "component", value: `(//XCUIElementTypeButton[@name="Finish"])[2]` },

            done: { type: "component", value: `//XCUIElementTypeButton[@name="Done"]` },

            // Sharing
            sharing: {type: "button", value: "Friends & Sharing"},
            notShare: {type: "text", value: "Don't Share"},
            alwaysAskToggle: {type: "component", value: "//XCUIElementTypeSwitch"},
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

        if (instance !== undefined) {
            //selector += `.instance(${instance})`;
        }

        return `${selector}`;
    }

}