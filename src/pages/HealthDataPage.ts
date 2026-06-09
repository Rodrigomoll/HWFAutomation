import { BasePage } from "./BasePage";

/**
 * Abstract class representing the Health Data page.
 * Contains basic elements and methods to interact with health data selection and completion.
 */
export abstract class HealthDataPage extends BasePage {
    /**
     * List of health data categories the page should handle (e.g., Sleep, Water, Steps).
     */
    protected entryTypes;

    constructor() {
        super();
        this.init();

        // Define key UI elements specific to the Health Data page
        this.locator.elements = {
            ...this.locator.elements,
        }
    }

    /**
     * Navigates through and selects the different available health data types for the user.
     */
    abstract selectHealthData(): Promise<void>;

    /**
     * Completes the health data entry flow by selecting necessary data and saving it.
     */
    abstract completeHealthData(): Promise<void>;
}
