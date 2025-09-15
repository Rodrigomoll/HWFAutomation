export class AndroidLocators {

    async buildSelector(selector: string){
        return `android=${selector}`;
    }

    async selectValue(type: string, value: string) {
        if(type === "text") return `new UiSelector().text("${value}")`;
        else if(type === "partialMatch") return `~${value}`;
        else if(type === "className") return `new UiSelector().className("${value}")`;
        else if(type === "description") return `new UiSelector().description("${value}")`;
        else if(type === "contains") return `new UiSelector().textContains("${value}")`;
        else if(type === "instance") return `.instance(${value})`;
        else if(type === "resource") return `new UiSelector().resourceId("${value}")`;
    }
    
}