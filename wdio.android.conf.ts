import * as dotenv from 'dotenv';
dotenv.config();

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./src/tests/android/**/*.spec.ts'],
    maxInstances: 1,
    
    capabilities: [{
        platformName: 'Android',
        'appium:automationName': 'UiAutomator2',
        'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Android Emulator',
        'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '14.0',
        'appium:app': process.env.ANDROID_APP_PATH || './apps/android/howwefeel.apk',
        'appium:appPackage': process.env.ANDROID_PACKAGE_NAME || 'org.howwefeel.moodmeter.dev',
        'appium:appActivity': process.env.ANDROID_ACTIVITY || 'org.howwefeel.moodmeter.screens.main.MainActivity'
    }],

    hostname: 'localhost',
    port:  parseInt(process.env.APPIUM_PORT_IOS || '4723'),
    
    logLevel: 'info',
    framework: 'jasmine',  
    services: ['appium'],
    reporters: ['spec'],
    
    jasmineOpts: {
        defaultTimeoutInterval: parseInt(process.env.COMMAND_TIMEOUT || '60000')
    }
};