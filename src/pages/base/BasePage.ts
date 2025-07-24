/**
 * BasePage - Base class with common methods for mobile automation
 * Works for both Android and iOS
 */
export class BasePage {
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
  async tapElement(selector: string): Promise<void> {
    const element = await this.waitForElement(selector);
    await element.click();
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
   * Swipe up
   * @param distance - Swipe distance (0-1)
   */
  async swipeUp(distance: number = 0.5): Promise<void> {
    const { width, height } = await driver.getWindowSize();
    const startX = width / 2;
    const startY = height * 0.8;
    const endY = height * (0.8 - distance);

    await driver.performActions([
      {
        type: "pointer",
        id: "finger",
        parameters: { pointerType: "touch" },
        actions: [
          { type: "pointerMove", duration: 0, x: startX, y: startY },
          { type: "pointerDown", button: 0 },
          { type: "pointerMove", duration: 500, x: startX, y: endY },
          { type: "pointerUp", button: 0 },
        ],
      },
    ]);

    await driver.releaseActions();
  }

  /**
   * Swipe down
   * @param distance - Swipe distance (0-1)
   */
  async swipeDown(distance: number = 0.5): Promise<void> {
    try {
      console.log("[SWIPE] Starting swipe down...");

      const windowSize = await driver.getWindowRect();
      const centerX = windowSize.width / 2;
      const startY = windowSize.height * 0.3; 
      const endY = windowSize.height * (0.3 + distance);

      await driver.performActions([
        {
          type: "pointer",
          id: "finger", 
          parameters: { pointerType: "touch" },
          actions: [
            { type: "pointerMove", duration: 0, x: centerX, y: startY },
            { type: "pointerDown", button: 0 },
            { type: "pointerMove", duration: 800, x: centerX, y: endY },
            { type: "pointerUp", button: 0 },
          ],
        },
      ]);

      await driver.releaseActions();
      await driver.pause(2000);
      console.log("[SWIPE] Swipe down completed");
    } catch (error) {
      console.log(`Error swiping down: ${error}`);
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
    const { width, height } = await driver.getWindowSize();
    const startY = height / 2;

    let startX: number, endX: number;

    if (direction === "left") {
      startX = width * 0.8;
      endX = width * (0.8 - distance);
    } else {
      startX = width * 0.2;
      endX = width * (0.2 + distance);
    }

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

      console.log(`✅ Element found and displayed: ${selector}`);
      return true;
    } catch (error) {
      console.log(`❌ Element not displayed: ${selector} - ${error.message}`);
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
}
