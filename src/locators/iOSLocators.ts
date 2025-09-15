export class iOSLocators {

    async buildSelector(selector: string){
        return `${selector}`;
    }

    async selectValue(type: string, value: string|void) {
        if(type === "text") return `~${value}`;
        else if(type === "textView") return `//XCUIElementTypeTextView`;
        else if(type === "button") return `//XCUIElementTypeButton[@name="${value}"]`;
        else if(type === "navigation") return `//XCUIElementTypeNavigationBar[@name="${value}"]/XCUIElementTypeButton`;
    }

}