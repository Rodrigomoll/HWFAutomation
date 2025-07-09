# HWF Automation 

**Automated testing suite for How We Feel mobile application**

Test automation framework built with **WebdriverIO**, **TypeScript**, and **Appium** for iOS and Android onboarding flows.

## 📱 Platform Coverage

| Platform | Status | Test Flows | Duration |
|----------|--------|------------|----------|
| iOS      | Complete | Skip + Complete Flow | 1-2 min |
| Android  | Partial | Skip Flow only | 20 sec |

## 🚀 Quick Start

### Installation
```bash
git clone https://github.com/Rodrigomoll/HWFAutomation.git
cd HWFAutomation
npm install
```

### Running Tests
```bash
# Simple commands
npm run ios          # All iOS tests
npm run android      # All Android tests  
npm run both         # Both platforms

# Specific flows
npm run ios:skip        # iOS skip flow (2-3 min)
npm run ios:complete    # iOS complete flow (5-7 min)
npm run android:skip    # Android skip flow (2-3 min)

# Start Appium server
npm run start
```
## 📱 App Files

**Important:** App files are not included in this repository due to size limitations.

- **Android APK**: Contact dev team, place in `apps/android/`
- **iOS App**: Get from dev team/Xcode, place in `apps/ios/`

## Project Structure

```
HWF-AUTOMATIONTWO/
├── apps/                    # App files (.apk/.app)
│   ├── android/            
│   └── ios/                
├── src/
│   ├── pages/              # Page Object Models
│   │   ├── android/        # Android page objects
│   │   ├── ios/            # iOS page objects
│   │   └── base/           # Base page class
│   └── tests/              # Test specifications
│       ├── android/        # Android test files
│       └── ios/            # iOS test files
├── wdio.android.conf.ts    # Android config
├── wdio.ios.conf.ts        # iOS config
└── package.json            # Scripts and dependencies
```

## 🧪 Test Details

### iOS Tests ✅
**Skip Flow** (`onboardingSkip.spec.ts`)
- 9 onboarding screens with skip setup option
- Duration: 1 minute

**Complete Flow** (`onboardingComplete.spec.ts`)  
- 17 screens including full setup process:
  - User preferences and first check-in
  - Emotion selection and journal entry
  - Notification permissions and scheduling
  - Widget setup
- Duration: 1-2 minutes

### Android Tests ⚠️
**Skip Flow** (`onboardingSkip.spec.ts`)
- 7 onboarding screens with basic skip functionality
- Duration: 20 seconds
- **Limitation**: Cannot access moodmeter features

**Complete Flow**: **Blocked** - requires testTags for moodmeter access

## 🛠 Setup Requirements

### Prerequisites
- Node.js (LTS recommended)
- Appium v2.0+
- iOS Simulator or Android Emulator
- App files placed in respective `apps/` directories

### Configuration
Create `.env` file with device and app paths:
```env
IOS_DEVICE_NAME=iPhone 15
ANDROID_DEVICE_NAME=Pixel_7_API_34
IOS_APP_PATH=./apps/ios/HowWeFeel.app
ANDROID_APP_PATH=./apps/android/howwefeel.apk
```

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

---

**Repository**: https://github.com/Rodrigomoll/HWFAutomation  
**Team**: HWF QA Team