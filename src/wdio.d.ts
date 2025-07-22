// src/wdio.d.ts

declare global {
    namespace WebdriverIO {
        interface Browser {
            createCheckinWithEmotion(emotion: 'pleased' | 'uneasy' | 'calm' | 'bored', journalText: string): Promise<void>;
        }
    }
}

export {};