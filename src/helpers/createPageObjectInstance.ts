/**
 * Creates and returns a page object instance based on the given key and platform (Android or iOS).
 *
 * @param {string} key - The page name key, e.g. "checkin", "friends", "health", "login", "onboarding", "reflect", "settings".
 * @throws {Error} Throws an error if the key is not recognized.
 * @returns {object} The page object instance for the current platform.
 */
export function createPageObjectInstance(key: string): any {
    const platformFromDriver = driver.capabilities.platformName;
    const platform = platformFromDriver === "Android" ? "Android" : "iOS";

    console.log(`[createPAGE] Running on platform: ${platform}`);
  
    let page: string;

    switch (key) {
        case "checkin":
            page = "CheckinPage";
            break;
        case "friends":
            page = "FriendsPage";
            break;
        case "health":
            page = "HealthDataPage";
            break;
        case "login":
            page = "LoginPage";
            break;
        case "onboarding":
            page = "OnboardingPage";
            break;
        case "reflect":
            page = "ReflectPage";
            break;
        case "settings":
            page = "SettingsPage";
            break;
        default:
            throw new Error(`Unknown page key: ${key}`);
    }

    try{
        const module = require(`../pages/${platform}/${page}`);
        const className = `${platform}${page}`;
        const PageClass = module[className];

        console.log(`Creating instance of class: ${className} from module ../pages/${platform}/${page}`);

        return new PageClass();
    }
    catch (error) {
        console.error("Error during create instance of page object:", error);
        throw error;
    }
}