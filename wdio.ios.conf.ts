import { Capabilities } from '@wdio/types';
import * as dotenv from 'dotenv';
import path from "node:path";
dotenv.config();

export const config: WebdriverIO.Config = {
    runner: 'local',
    specs: ['./src/tests/*.spec.ts'],
    maxInstances: 1,
    specFileRetries: 1,
    specFileRetriesDelay: 1000,
    specFileRetriesDeferred: false,
    
    capabilities: [{
        platformName: 'iOS',
        'appium:automationName': 'XCUITest',
        'appium:deviceName': process.env.IOS_DEVICE_NAME || 'iPhone 16',
        'appium:platformVersion': process.env.IOS_PLATFORM_VERSION || '18.6',
        'appium:app': process.env.IOS_APP_PATH || './apps/ios/HowWeFeelMoodmeter.app',
        'appium:bundleId': process.env.IOS_BUNDLE_ID || 'org.howwefeel.HowWeFeel-Moodmeter',
        'appium:autoAcceptAlerts': true, 
        'appium:autoDismissAlerts': false,

        'appium:wdaStartupRetries': 3,
        'appium:wdaStartupRetryInterval': 15000,
        'appium:newCommandTimeout': 300,
        'appium:noReset': true,
        'appium:fullReset': false,

        // 'appium:noReset': false,
        // 'appium:fullReset': true,
        'appium:language': 'en', //es //en
        'appium:locale': 'EN' //ES //EN
    }],

    hostname: 'localhost',
    port: 4724,
    
    logLevel: 'debug',
    framework: 'jasmine',
    services: [
        ['appium', {
            args: {
                port: 4724, 
                basePath: '/'
            }
        }],
        [
            '@wdio/visual-service',
            {
                baselineFolder: path.join(process.cwd(), 'tests_img', 'baseline'),
                screenshotPath: path.join(process.cwd(), 'tmp'),
                savePerInstance: true,
                autoSaveBaseline: true,
                //formatImageName: '{tag}-{logName}-{width}x{height}',
                createJsonReport: true
            }
        ],
    ],
    reporters: ['spec'],
    
    jasmineOpts: {
        defaultTimeoutInterval: parseInt(process.env.COMMAND_TIMEOUT || '2000000')
    }
};