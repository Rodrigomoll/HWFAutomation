# HWF Automation

**Automated testing suite for How We Feel mobile application**

Test automation framework built with **WebdriverIO**, **TypeScript**, and **Appium** for iOS and Android onboarding flows.

## 🚀 Quick Start

### Installation
```bash
git clone https://github.com/Rodrigomoll/HWFAutomation.git
cd HWFAutomation
npm install
```

### Environment Setup
Create a `.env` file in the root directory with these 4 variables:

```env
IOS_DEVICE_NAME=iPhone 15
ANDROID_DEVICE_NAME=Pixel 8 API VanillaIceCream
IOS_APP_PATH=./apps/ios/HowWeFeel.app
ANDROID_APP_PATH=./apps/android/howwefeel.apk
```

**What each variable does:**
- `IOS_DEVICE_NAME` → Your iOS simulator name
- `ANDROID_DEVICE_NAME` → Your Android emulator name  
- `IOS_APP_PATH` → Path to iOS app file
- `ANDROID_APP_PATH` → Path to Android APK file

**Find your device names:**
```bash
xcrun simctl list devices    # iOS simulators
emulator -list-avds         # Android emulators
```

> 💡 **That's it!** The framework uses smart defaults for everything else.

## 📱 App Files Setup

Create the following apps folder at the same level as the src folder:

```
apps/
├── android/
│   └── howwefeel.apk       # Get from dev team
└── ios/
    └── HowWeFeel.app       # Get from dev team/Xcode
```

> **Note**: App files are not included in this repository due to size limitations.

## ⚡ Running Tests

```bash
# Quick commands
npm run ios:skip        # iOS onboarding (1 min)
npm run android:skip    # Android onboarding (30-45 sec)
npm run both           # Both platforms

# All available commands
npm run ios            # All iOS tests
npm run android        # All Android tests
npm run ios:complete   # Full iOS setup flow (1-2 min)
```

## 📁 Project Structure

```
HWF-AUTOMATIONTWO/
├── apps/                    # App files (.apk/.app)
│   ├── android/            # Android APK files
│   └── ios/                # iOS app bundles
├── src/
│   ├── pages/              # Page Object Models
│   │   ├── android/        # Android page objects
│   │   ├── ios/            # iOS page objects
│   │   └── base/           # Base page class
│   └── tests/              # Test specifications
│       ├── android/        # Android test files
│       └── ios/            # iOS test files
├── wdio.android.conf.ts    # Android WebdriverIO config
├── wdio.ios.conf.ts        # iOS WebdriverIO config
├── .env.example            # Environment template
└── package.json            # Scripts and dependencies
```

## 🧪 Test Details

### iOS Tests ✅

**Skip Flow** (`onboardingSkip.spec.ts`)
- 9 onboarding screens with skip setup option
- Duration: 1-2 minutes

**Complete Flow** (`onboardingComplete.spec.ts`)
- 17 screens including full setup process:
  - User preferences and first check-in
  - Emotion selection and journal entry
  - Notification permissions and scheduling
  - Widget setup
- Duration: 5-7 minutes

### Android Tests ⚠️

**Skip Flow** (`onboardingSkip.spec.ts`)
- 7 onboarding screens with basic skip functionality
- Duration: 30-45 seconds
- **Limitation**: Cannot access moodmeter features

**Complete Flow**: **Blocked** - requires testTags for moodmeter access

## 📊 Platform Coverage

| Platform | Status   | Test Flows           | Duration |
| -------- | -------- | -------------------- | -------- |
| iOS      | Complete | Skip + Complete Flow | 1-2 min  |
| Android  | Partial  | Skip Flow only       | 30-45 sec |


## 📊 Test Scope

**✅ Covered:**
- Functional Testing (onboarding flows)
- UI/UX Testing (user interactions)
- Mobile Testing (platform-specific behaviors)
- Regression Testing (preventing breaks)

**❌ Not Covered:**
- Database Testing
- Security Testing

## 🚨 Known Issues

### Android Blocker

**Complete Flow**: Blocked due to missing testTags on moodmeter components. Development team needs to add automation identifiers for full Android testing.

**Required Action**: Add testTags to moodmeter UI components

```typescript
// Example implementation needed:
<TouchableOpacity testID="mood-very-happy">
<TextInput testID="journal-entry-input">
<Button testID="submit-mood-button">
```

### Recommendations

- **For Android**: Add testTags to moodmeter UI components
- **For CI/CD**: Framework ready for GitHub Actions integration

## 🤝 Development

### For Developers


```bash
# Technical commands
npm run test:ios            # All iOS tests
npm run test:android        # All Android tests
npm run test:ios:spec ./path/to/specific/test.ts

# Appium servers
npm run appium:ios          # Port 4724
npm run appium:android      # Port 4723
```

### Contributing

1. Follow existing Page Object Model patterns
2. Write granular tests (one action per test)
3. Test changes with `npm run both`
4. Submit pull request

**Repository**: https://github.com/Rodrigomoll/HWFAutomation  
**Team**: HWF QA Team