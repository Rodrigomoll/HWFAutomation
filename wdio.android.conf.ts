import { Capabilities } from '@wdio/types';
import * as dotenv from 'dotenv';

dotenv.config();

console.log("=== WDIO CONFIG DEBUG ===");
console.log("COMMAND_TIMEOUT:", process.env.COMMAND_TIMEOUT);
console.log("Calculated timeout:", parseInt(process.env.COMMAND_TIMEOUT || '60000'));

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: [
        './src/tests/onboardingSkip.spec.ts',
        './src/tests/onboardingComplete.spec.ts',
        './src/tests/createCheckin.spec.ts',
        './src/tests/createCheckinsQuadrants.spec.ts',
        './src/tests/editCheckin.spec.ts',
        './src/tests/deleteCheckin.spec.ts',
        './src/tests/createCheckinPastdate.spec.ts',
        './src/tests/createCheckinHealthData.spec.ts',
        './src/tests/shareCheckin.spec.ts',
        './src/tests/createCheckinMultipleFeelings.spec.ts',
        './src/tests/createCheckinReflect.spec.ts',
        './src/tests/createCheckinWithTakeaways.spec.ts'
    ],
    maxInstances: 1,
    
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '16.0',
        'appium:app': process.env.ANDROID_APP_PATH || './apps/android/howwefeel.apk',
        'appium:appPackage': process.env.ANDROID_PACKAGE_NAME || 'org.howwefeel.moodmeter.dev',
        'appium:appActivity': process.env.ANDROID_ACTIVITY || 'org.howwefeel.moodmeter.screens.main.MainActivity',
        'appium:autoAcceptAlerts': true,
        'appium:autoGrantPermissions': true
    }],

    hostname: 'localhost',
    port:  parseInt(process.env.APPIUM_PORT_ANDROID || '4723'),
    
    logLevel: 'info',
    framework: 'jasmine',  
    services: ['appium'],
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results-android',
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