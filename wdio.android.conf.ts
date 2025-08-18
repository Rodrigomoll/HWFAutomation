import { Capabilities } from '@wdio/types';
import * as dotenv from 'dotenv';
import { registerCheckinCommands } from './src/commands/android/checkinCommands';

dotenv.config();

console.log("=== WDIO CONFIG DEBUG ===");
console.log("COMMAND_TIMEOUT:", process.env.COMMAND_TIMEOUT);
console.log("Calculated timeout:", parseInt(process.env.COMMAND_TIMEOUT || '60000'));

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: [
        './src/tests/android/onboardingSkip.spec.ts',
        './src/tests/android/onboardingComplete.spec.ts',
        './src/tests/android/createCheckin.spec.ts',
        './src/tests/android/createCheckinsQuadrants.spec.ts',
        './src/tests/android/editCheckin.spec.ts',
        './src/tests/android/deleteCheckin.spec.ts',
        './src/tests/android/createCheckinPastdate.spec.ts',
        './src/tests/android/createCheckinHealthData.spec.ts',
        './src/tests/android/shareCheckin.spec.ts',
        './src/tests/android/createCheckinMultipleFeelings.spec.ts',
        './src/tests/android/createCheckinReflect.spec.ts',
        './src/tests/android/createCheckinWithTakeaways.spec.ts',
    ],
    maxInstances: 1,
    
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '14.0',
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
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            addConsoleLogs: true
        }]
    ],
    
    jasmineOpts: {
        defaultTimeoutInterval: parseInt(process.env.COMMAND_TIMEOUT || '60000')
    },

    before: async (capabilities, specs) => {
        registerCheckinCommands();
    },

    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
};