import * as dotenv from 'dotenv';
dotenv.config();

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./src/tests/*.spec.ts'],

    maxInstances: 2,
    specFileRetries: 5,
    specFileRetriesDelay: 1000,
    specFileRetriesDeferred: false,

    capabilities: [
        {
            platformName: 'Android',
            'appium:automationName': 'UiAutomator2',
            'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
            'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '16.0',
            'appium:app': process.env.ANDROID_APP_PATH || './apps/android/howwefeel.apk',
            'appium:appPackage': process.env.ANDROID_PACKAGE_NAME || 'org.howwefeel.moodmeter.dev',
            'appium:appActivity': process.env.ANDROID_ACTIVITY || 'org.howwefeel.moodmeter.screens.main.MainActivity',
            'appium:autoAcceptAlerts': true,
            'appium:autoGrantPermissions': true,
        },
        {
            platformName: 'iOS',
            'appium:automationName': 'XCUITest',
            'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 15',
            'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '18.3',
            'appium:app': process.env.IOS_APP_PATH || './apps/ios/HowWeFeel.app',
            'appium:bundleId': process.env.IOS_BUNDLE_ID || 'org.howwefeel.HowWeFeel-Moodmeter',
            'appium:autoAcceptAlerts': true,
            'appium:autoDismissAlerts': false,
            // 'appium:noReset': false,
            // 'appium:fullReset': true
        }
    ],
    
    hostname: 'localhost',
    port: 4723,
    
    logLevel: 'info',
    framework: 'jasmine',
    services: ['appium'],

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            addConsoleLogs: true
        }]
    ],

    jasmineOpts: {
        defaultTimeoutInterval: parseInt(process.env.COMMAND_TIMEOUT || '60000')
    },
    
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
};
