import { Capabilities } from '@wdio/types';
import * as dotenv from 'dotenv';
import { registerCheckinCommands } from './src/commands/android/checkinCommands';

dotenv.config();

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: [
        './src/tests/android/onboardingSkip.spec.ts',
        './src/tests/android/onboardingComplete.spec.ts',
        './src/tests/android/createCheckin.spec.ts',
        './src/tests/android/createCheckinsQuadrants.spec.ts',
        './src/tests/android/editCheckin.spec.ts',
        './src/tests/android/deleteCheckin.spec.ts'
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
    reporters: ['spec'],
    
    jasmineOpts: {
        defaultTimeoutInterval: parseInt(process.env.COMMAND_TIMEOUT || '60000')
    },

    before: async (capabilities, specs) => {
        registerCheckinCommands();
    }
};