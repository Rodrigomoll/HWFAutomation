/**
 * Abstract base class for defining UI element locators and platform-specific logic.
 *
 * This class holds a default set of shared elements and defines abstract methods
 * that must be implemented by platform-specific subclasses (e.g., AndroidLocators, iOSLocators).
 */
export abstract class BaseLocators {
    /**
     * Common UI elements used across navigation flows and test flows.
     * Subclasses can extend or override this object with platform-specific locators.
     * Each element includes its type, value, and optional instance.
     */
    public elements: Record<string, { type: string; value: string; instance?: number }> = {
        continue: { type: "text", value: "Continue"},
        yellowQuadrant: { type: "text", value: "High Energy\nPleasant" },
        pleasedEmotion: { type: "text", value: "Pleased" },
        complete: { type: "text", value: "Complete check-in" },
        reflectModal: { type: "text", value: "Introducing" },
        friends: { type: "text", value: "Friends" },
        shareModalPrompt: { type: "text", value: "Share your check-in?" },
    }

    /**
     * Builds a selector string from the provided element config.
     * Must be implemented by the subclass depending on platform (e.g., iOS or Android).
     *
     * @param selector - A string key or full element object from `this.elements`.
     * @returns {Promise<string>} A resolved selector string usable in tests.
     */
    abstract buildSelector(selector): Promise<string>;

    /**
     * Verifies the "active" state of a given UI element (e.g., checked, value).
     * Must be implemented by the subclass with platform-specific logic.
     *
     * @param element - The UI element to check.
     * @returns {Promise<boolean>} True if the element is in the expected active state.
     */
    abstract verifyStatusElement(element): Promise<boolean>;

    /**
     * Checks if a given element is active by evaluating its status.
     *
     * @param element - Element key.
     * @returns {Promise<boolean>} True if the element is active.
     */
    async verifyIsActive(element): Promise<boolean> {
        const checkedAttr = await $(await this.buildSelector(element));
        await driver.pause(1000);

        return await this.verifyStatusElement(checkedAttr);
    }
    
}