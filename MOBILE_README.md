# UrbanNest Mobile App

This is a React + Vite + TypeScript web application that has been converted to a native mobile app using CapacitorJS by Ionic.

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

### Installation

1. Install dependencies:
```bash
npm install
```

2. Build and sync for mobile:
```bash
npm run cap:build
```

## 📱 Mobile Development

### Available Scripts

- `npm run cap:build` - Build web app and sync with mobile platforms
- `npm run cap:ios` - Open iOS project in Xcode
- `npm run cap:android` - Open Android project in Android Studio
- `npm run cap:run:ios` - Build and run on iOS simulator/device
- `npm run cap:run:android` - Build and run on Android emulator/device
- `npm run cap:sync` - Sync web assets to mobile platforms

### iOS Development

1. Install CocoaPods (if not already installed):
```bash
sudo gem install cocoapods
```

2. Navigate to iOS directory and install pods:
```bash
cd ios/App
pod install
cd ../..
```

3. Open iOS project:
```bash
npm run cap:ios
```

### Android Development

1. Install Android Studio and SDK
2. Set up Android environment variables
3. Open Android project:
```bash
npm run cap:android
```

## 🔧 Configuration

### Capacitor Configuration

The app is configured in `capacitor.config.ts`:
- App ID: `com.urbannest.app`
- App Name: `UrbanNest`
- Web Directory: `dist` (Vite build output)

### Mobile-Specific Features

The app includes several mobile-specific features:

1. **Capacitor Plugins**:
   - App lifecycle management
   - Haptic feedback
   - Keyboard handling
   - Status bar configuration
   - Splash screen management

2. **Mobile CSS Classes**:
   - `.mobile-safe-area` - Safe area insets for notched devices
   - `.mobile-scroll` - Smooth scrolling on mobile
   - `.mobile-tap-highlight` - Remove tap highlights
   - `.mobile-button` - Minimum touch target size (44px)

3. **Platform Detection**:
   - Automatic platform detection
   - Native vs web platform handling

## 📦 Build Process

1. **Web Build**: Vite builds the React app to `dist/` directory
2. **Capacitor Sync**: Copies web assets to native platforms
3. **Native Build**: Use Xcode/Android Studio to build native apps

## 🎨 Mobile UI Considerations

The app has been optimized for mobile with:
- Touch-friendly button sizes (minimum 44px)
- Safe area support for notched devices
- Proper keyboard handling
- Mobile-optimized scrolling
- Responsive design that works on all screen sizes

## 🚀 Deployment

### iOS App Store
1. Build release version in Xcode
2. Archive and upload to App Store Connect
3. Submit for review

### Google Play Store
1. Build release APK/AAB in Android Studio
2. Upload to Google Play Console
3. Submit for review

## 🔍 Development Tips

- Use `npm run cap:build` after making web changes
- Test on both iOS and Android devices/simulators
- Use browser dev tools for initial testing
- Check Capacitor logs for native-specific issues

## 📚 Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Ionic Documentation](https://ionicframework.com/docs)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)



