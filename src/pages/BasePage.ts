/**
 * BasePage - Base class with common methods for mobile automation
 * Works for both Android and iOS
 */
import { AndroidLocators } from "../locators/AndroidLocators";
import { iOSLocators } from "../locators/iOSLocators";

export class BasePage {
  protected locator: AndroidLocators | iOSLocators;

  constructor() {
    this.init();
  }

  init() {
    const platform = driver.capabilities.platformName;
    console.log(`[BasePage] Running on platform: ${platform}`);

    // Create locator based on platform
    if (platform === "Android") {
      this.locator = new AndroidLocators();
    } else if (platform === "iOS") {
      this.locator = new iOSLocators();
    } else {
      throw new Error(`Unsupported platform: ${platform}`);
    }
  }

  // ==========================================
  // ELEMENTS - Selector methods
  // ==========================================

  /**
   * Wait for an element to appear on screen
   * @param selector - Element selector
   * @param timeout - Maximum wait time (default: 10s)
   */
  async waitForElement(selector: string, timeout: number = 30000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  /**
   * Find element by text (works on both platforms)
   * @param text - Text to search
   */
  async findByText(text: string) {
    // Android XPath
    const androidSelector = `//*[@text="${text}"]`;
    // iOS XPath
    const iosSelector = `//*[@name="${text}" or @label="${text}"]`;

    const isAndroid = driver.capabilities.platformName === "Android";
    const selector = isAndroid ? androidSelector : iosSelector;

    return await this.waitForElement(selector);
  }

  /**
   * Find multiple elements
   * @param selector - Elements selector
   */
  async findElements(selector: string) {
    return await $$(selector);
  }

  // ==========================================
  // INTERACTIONS - Action methods
  // ==========================================

  /**
   * Tap/click on an element
   * @param selector - Element selector
   */
  async tapElement(selector: string, timeout?: number): Promise<void> {
    const element = await this.waitForElement(selector);
    await element.click();

    if(timeout) await this.wait(timeout);
  }

  /**
   * Tap on element by text
   * @param text - Element text
   */
  async tapByText(text: string): Promise<void> {
    const element = await this.findByText(text);
    await element.click();
  }

  async tapScreenCenter(): Promise<void> {
    try {
      const windowSize = await driver.getWindowRect();
      const centerX = windowSize.width / 2;
      const centerY = windowSize.height / 2;

      await driver.performActions([
        {
          type: "pointer",
          id: "finger",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: centerX, y: centerY },
            { type: "pointerDown", button: 0 },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);

      await driver.releaseActions();
      await driver.pause(500);
    } catch (error) {
      console.log(`Error tapping screen center: ${error}`);
      throw error;
    }
  }

  /**
   * Enter text in a field
   * @param selector - Field selector
   * @param text - Text to enter
   * @param clearFirst - Clear field before entering text
   */
  async enterText(
    selector: string,
    text: string,
    clearFirst: boolean = true
  ): Promise<void> {
    const element = await this.waitForElement(selector);

    if (clearFirst) {
      await element.clearValue();
    }

    await element.setValue(text);
  }

  /**
   * Get text from an element
   * @param selector - Element selector
   */
  async getText(selector: string): Promise<string> {
    const element = await this.waitForElement(selector);
    return await element.getText();
  }

  // ==========================================
  // NAVIGATION - Movement methods
  // ==========================================
  /**
   * Vertical swipe (up/down)
   * @param direction - 'up' or 'down'
   * @param distance - Swipe distance (0-1)
   */
  async swipeVertical(
    direction: "up" | "down",
    distance: number = 0.5
  ): Promise<void> {
    try {
      console.log(`[SWIPE] Starting swipe vertical (${direction}) ...`);
      
      const info = {
        up: [0.8, -1, 500],
        down: [0.3, 1, 800],
      };
      const [startRatio, multiplier, duration] = info[direction];

      const { width, height } = await driver.getWindowSize();
      const centerX = width / 2;
      const startY = height * startRatio;
      const endY = height * (startRatio + (multiplier * distance));

      await driver.performActions([
        {
          type: "pointer",
          id: "finger",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: centerX, y: startY },
            { type: "pointerDown", button: 0 },
            { type: "pointerMove", duration: duration, x: centerX, y: endY },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);

      await driver.releaseActions();
      if (direction === "down") await driver.pause(2000);

      console.log(`[SWIPE] Swipe vertical (${direction}) completed`);
    } catch (error) {
      console.log(`Error swiping vertical (${direction}): ${error}`);
      throw error;
    }
  }

  /**
   * Horizontal swipe (left/right)
   * @param direction - 'left' or 'right'
   * @param distance - Swipe distance (0-1)
   */
  async swipeHorizontal(
    direction: "left" | "right",
    distance: number = 0.5
  ): Promise<void> {
    try {
      console.log(`[SWIPE] Starting swipe horizontal (${direction}) ...`);

      const info = {
        up: [0.8, -1],
        down: [0.2, 1],
      };
      const [startRatio, multiplier] = info[direction];

      const { width, height } = await driver.getWindowSize();
      const startY = height / 2;
      const startX = width * startRatio;
      const endX = width * (startRatio + (multiplier * distance));

      await driver.performActions([
        {
          type: "pointer",
          id: "finger1",
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: startX, y: startY },
            { type: "pointerDown", button: 0 },
            { type: "pointerMove", duration: 500, x: endX, y: startY },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);

      await driver.releaseActions();
      console.log(`[SWIPE] Swipe horizontal (${direction}) completed`);
    } catch (error) {
      console.log(`Error swiping horizontal(${direction}) : ${error}`);
      throw error;
    }
  }

  // ==========================================
  // ASSERTIONS - Validation methods
  // ==========================================

  /**
   * Check if an element is visible
   * @param selector - Element selector
   */
  async isElementDisplayed(
    selector: string,
    timeout: number = 10000
  ): Promise<boolean> {
    try {
      console.log(
        `Checking if element is displayed: ${selector} (timeout: ${timeout}ms)`
      );

      const element = await driver.$(selector);

      await element.waitForDisplayed({
        timeout,
        timeoutMsg: `Element "${selector}" not displayed after ${timeout}ms`,
      });

      console.log(`Element found and displayed: ${selector}`);
      return true;
    } catch (error) {
      console.log(`Element not displayed: ${selector} - ${error.message}`);
      return false;
    }
  }

  /**
   * Check if an element exists (might not be visible)
   * @param selector - Element selector
   */
  async isElementExists(selector: string): Promise<boolean> {
    try {
      const elements = await $$(selector);
      return Array.isArray(elements) && elements.length > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify text in element
   * @param selector - Element selector
   * @param expectedText - Expected text
   */
  async verifyText(selector: string, expectedText: string): Promise<boolean> {
    try {
      const actualText = await this.getText(selector);
      return actualText.includes(expectedText);
    } catch (error) {
      return false;
    }
  }

  /**
   * Verify that an element contains specific text
   * @param text - Text to search
   */
  async verifyTextExists(text: string): Promise<boolean> {
    try {
      await this.findByText(text);
      return true;
    } catch (error) {
      return false;
    }
  }

  // ==========================================
  // WAITS - Synchronization methods
  // ==========================================

  /**
   * Wait for a fixed time
   * @param milliseconds - Time in milliseconds
   */
  async wait(milliseconds: number): Promise<void> {
    await driver.pause(milliseconds);
  }

  /**
   * Wait for an element to disappear
   * @param selector - Element selector
   * @param timeout - Maximum wait time
   */
  async waitForElementToDisappear(
    selector: string,
    timeout: number = 10000
  ): Promise<void> {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout, reverse: true });
  }

  /**
   * Wait for an element to be clickable
   * @param selector - Element selector
   */
  async waitForElementClickable(selector: string) {
    const element = await this.waitForElement(selector);
    await element.waitForEnabled();
    return element;
  }

  /**
   * Check if platform is Android
   */
  async isAndroid(): Promise<boolean> {
    const capabilities = driver.capabilities;
    return capabilities.platformName === "Android";
  }

  /**
   * Check if platform is iOS
   */
  async isIOS(): Promise<boolean> {
    const capabilities = driver.capabilities;
    return capabilities.platformName === "iOS";
  }

  // ==========================================
  // LOCATORS - Locator-based utility methods
  // ==========================================

  /**
   * Verifies if a UI element is visible on screen using its locator.
   *
   * @param element - The key or locator object to resolve the element.
   * @param timeout - Optional timeout to wait for the element.
   * @returns {Promise<boolean>} True if the element is visible.
   */
  async verifyIsElementDisplayed(element, timeout?: number): Promise<boolean> {
      return await this.isElementDisplayed(await this.locator.buildSelector(element), timeout ?? null);
  }

  /**
   * Taps on a UI element using its locator.
   *
   * @param element - The key or locator object to resolve the element.
   * @param timeout - Optional timeout to wait before tapping.
   * @returns {Promise<void>}
   */
  async tapButton(element, timeout?: number): Promise<void> {
      await this.tapElement(await this.locator.buildSelector(element), timeout ?? null);
  }

  /**
   * Enters text into a journal input field using its locator.
   *
   * @param element - The key or locator for the input field.
   * @param text - The text to be entered.
   * @returns {Promise<void>}
   */
  async enterTextJournal(element: string, text: string): Promise<void> {
      await this.enterText(await this.locator.buildSelector(element), text, true);
  }

  /**
   * Waits for an element to be present and ready on the screen using its locator.
   *
   * @param element - The key or locator object to resolve the element.
   * @param timeout - Optional timeout duration in milliseconds.
   * @returns {Promise<any>} The resolved element after it appears.
   */
  async waitFor(element, timeout?: number) {
      return await this.waitForElement(await this.locator.buildSelector(element), timeout ?? null);
  }
}