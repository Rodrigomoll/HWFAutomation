import { BaseLocators } from "./BaseLocators";

export class AndroidLocators extends BaseLocators {
    constructor() {
        super();

        this.elements = {
            ...this.elements,
            // Texts / Prompt
            introPrompt: { type: "text", value: "How We Feel-\nA Journal for\nYour Wellbeing" },
            patternsPrompt: { type: "text", value: "And over time, spot patterns to gain insight" },
            freeInfoPrompt: { type: "text", value: "It’s free!\nMade possible\nby donations" },
            welcomePrompt: { type: "text", value: "Hi and welcome\nto HWF!" },
            explorePrompt: { type: "text", value: "Before jumping in,\nlet’s explore why you’re here." },
            helpPrompt: { type: "text", value: "Great! How We Feel will help you:" },
            firstCheckinPrompt: { type: "text", value: "Let’s do your \nfirst check in" },
            describePrompt: { type: "text", value: "Describe what might be causing you to feel\npleased …" },
            completePrompt: { type: "text", value: "First check-in complete" },
            frecuencyPrompt: { type: "text", value: "How often do you want to check in?" },
            widgetPrompt: { type: "text", value: "Check in anytime with the How We Feel widget" },
            tryStrategyPrompt: { type: "text", value: "Finally, let\'s try a strategy" },
            alarmAccessDescription: { type: "text", value: "Alarms & Reminders access is required in order to set an exact reminder time, otherwise an approximate reminder time will be used." },
            quickCheckin: { type: "text", value: "Quick check in" },
            emotionalToolsPrompt: { type: "text", value: "Want to change how you feel?\nExplore tools for emotional\nregulation!" },

            // Modals
            accessModal: { type: "text", value: "Special App Access required" },

            // Inputs
            textInput: { type: "className", value: "android.widget.ScrollView" },

            // Buttons
            getStarted: { type: "text", value: "Get started"},
            settings: { type: "description", value: "Settings" },
            settingsPrompt: { type: "text", value: "Settings" },
            journalEntry: { type: "text", value: "Add Journal Entry" },
            howWeFeel: { type: "text", value: "How We Feel" },
            allowSettings: { type: "text", value: "Allow setting alarms and reminders" },
            navigateBack: { type: "partialMatch", value: "Navigate up" }, // ~ le puso eso como ios
            addWidget: { type: "text", value: "Add widget" },
            addToHome: { type: "text", value: "Add to home screen" },
            notRightNow: { type: "text", value: "Not right now" },
            next: { type: "description", value: "Next" },

            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            /// checkin Page
            checkinText: { type: "text", value: "Check in", instance: 0 },
            newCheckin: { type: "description", value: "New check In" },

            // Quadrants
            quadrantPrompt: { type: "text", value: "Tap the color that best describes how you feel right now" },
            redQuadrant: { type: "text", value: "High Energy\nUnpleasant" },
            blueQuadrant: { type: "text", value: "Low Energy\nUnpleasant" },


            // Tags
            tagPrompt: { type: "contains", value: "What were you doing when you felt" },
            themesTag: { type: "text", value: "Themes" },
            peopleTag: { type: "text", value: "People" },
            placesTag: { type: "text", value: "Places" },

            // Theme tags
            drivingTag: { type: "text", value: "Driving" },
            myselfTag: { type: "text", value: "By Myself" },
            commutingTag: { type: "text", value: "Commuting" },

            // Journal entry
            journalPrompt: { type: "contains", value: "Describe what might be causing you to feel" },

            // Reflect
            reflectPrompt: { type: "text", value: "Reflect" },
            suggestedActions: { type: "text", value: "[icon] Suggested actions" },
            affirmations: { type: "text", value: "[icon] Affirmations" },
            insights: { type: "text", value: "[icon] Insight" },

            // Feelings
            searchInput: { type: "text", value: "Search feelings to add" },

            // Data entries
            dataPrompt: { type: "text", value: "Time, weather, \nsleep & exercise" },

            // Buttons
            microphone: { type: "description", value: "Open microphone" },
            camera: { type: "description", value: "Open camera" },
            reflect: { type: "description", value: "Reflect" },
            addFeeling: { type: "className", value: "android.view.View", instance: 4 },
            goDeeper: { type: "text", value: "Go Deeper" },
            done: { type: "text", value: "Done" },
            paperClipIcon: { type: "className", value: "android.widget.Button", instance: 0 },
            save: { type: "text", value: "Save" },
            tools: { type: "text", value: "Tools", instance: 0 },
            notNow: { type: "text", value: "Not now" },
            notShare: { type: "text", value: "Don't Share", instance: 1 },

            // Card
            imFeelingText: { type: "text", value: "I\'m feeling" },
            editText: { type: "className", value: "android.widget.EditText" },
            threeDots: { type: "className", value: "android.widget.Button", instance: 4 },
            delete: { type: "text", value: "Delete Check-In" },
            confirm: { type: "text", value: "Yes" },

            healthPrompt: { type: "text", value: "About Health & \nLocation Data" },
            closeButton: { type: "description", value: "Close" },

            // Friends
            signInPrompt: { type: "text", value: "Create an account to invite a friend" },
            signIn: { type: "text", value: "Sign in with Google" },
            signInModal: { type: "resource", value: "com.google.android.gms:id/title" },
            accountEmail: { type: "resource", value: "com.google.android.gms:id/account_display_name" },
            addFriendPrompt: { type: "text", value: "Now, let\'s add a friend" },
            justFeeling: { type: "text", value: "Just the feeling" },

            // AI
            aiToggle: { type: "className", value: "android.view.View", instance: 4 },
            aiEnablePrompt: { type: "text", value: "Enable AI Features in How We Feel" },
            enableAI: { type: "text", value: "Enable AI Features" },
            back: { type: "description", value: "Back" },
            finish: { type: "text", value: "Finish" },

            // Sharing
            account: {type: "className", value: "android.view.View", instance: 4},
            sharing: {type: "text", value: "Sharing"},
            alwaysAskToggle: {type: "className", value: "android.view.View", instance: 15},
            shareEmotionsModal: {type: "text", value: "Share your emotions with friends"},
            close: {type: "className", value: "android.widget.Button", instance: 0},
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
    
}