import * as dotenv from 'dotenv';
dotenv.config();

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./src/tests/**/*.spec.ts'],
    maxInstances: 1,
    
    capabilities: [{
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 15',
        'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '18.3',
        'appium:app': process.env.IOS_APP_PATH || './apps/ios/HowWeFeel.app',
        'appium:bundleId': process.env.IOS_BUNDLE_ID || 'org.howwefeel.HowWeFeel-Moodmeter',
        'appium:autoAcceptAlerts': true, 
        'appium:autoDismissAlerts': false
    }],

    hostname: 'localhost',
    port: 4724,
    
    logLevel: 'info',
    framework: 'jasmine',
    services: [
        ['appium', {
            args: {
                port: 4724, 
                basePath: '/'
            }
        }]
    ],
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results-ios',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            addConsoleLogs: true
        }]
    ],
    
    jasmineOpts: {
        defaultTimeoutInterval: parseInt(process.env.COMMAND_TIMEOUT || '60000')
    }
};