# Quick Start: Convert to Native App

This guide will help you convert your Cheeseburger Factory web app to native iOS and Android apps using Capacitor.

## Step 1: Install Capacitor

```bash
# Install Capacitor CLI and core
npm install @capacitor/core @capacitor/cli

# Initialize Capacitor in your project
npx cap init "Cheeseburger Factory" "com.cheeseburger.factory" --web-dir=dist
```

## Step 2: Install Platform-Specific Packages

```bash
# Install iOS platform
npm install @capacitor/ios
npx cap add ios

# Install Android platform
npm install @capacitor/android
npx cap add android

# Install useful plugins
npm install @capacitor/splash-screen @capacitor/status-bar @capacitor/browser @capacitor/geolocation @capacitor/app
```

## Step 3: Configure Your App

1. **Copy the example config:**
   - Rename `capacitor.config.example.ts` to `capacitor.config.ts`
   - Update the configuration values

2. **Update your package.json:**
   Add build scripts:
   ```json
   {
     "scripts": {
       "build": "vite build",
       "cap:ios": "npm run build && npx cap sync ios && npx cap open ios",
       "cap:android": "npm run build && npx cap sync android && npx cap open android",
       "cap:sync": "npm run build && npx cap sync"
     }
   }
   ```

## Step 4: Build Your Web App

```bash
npm run build
```

This creates the `dist` folder that Capacitor will use.

## Step 5: Sync to Native Projects

```bash
# Copy web assets to native projects
npx cap sync

# Or sync to specific platform
npx cap sync ios
npx cap sync android
```

## Step 6: Open Native IDEs

### For iOS (Requires Mac):
```bash
npx cap open ios
```

This opens Xcode. Then:
1. Select a development team (your Apple Developer account)
2. Choose a physical device or simulator
3. Click the Play button to run

### For Android:
```bash
npx cap open android
```

This opens Android Studio. Then:
1. Wait for Gradle sync to complete
2. Select a physical device or emulator
3. Click the Run button

## Step 7: Configure App Icons

### iOS:
1. In Xcode, navigate to: `App > Assets.xcassets > AppIcon`
2. Drag and drop your icons for each size
3. Or use online tool: https://www.appicon.co/

### Android:
1. In Android Studio, right-click `res` folder
2. New > Image Asset
3. Configure icon and generate all sizes

## Step 8: Configure Splash Screen

### iOS:
1. In Xcode: `App > Assets.xcassets > Splash`
2. Add your splash screen image

### Android:
1. Place splash image in: `android/app/src/main/res/drawable/splash.png`
2. Capacitor handles the rest

## Step 9: Configure Google Sign-In

### iOS:
1. In `ios/App/App/Info.plist`, add:
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>com.googleusercontent.apps.YOUR_CLIENT_ID</string>
    </array>
  </dict>
</array>
```

### Android:
1. Download `google-services.json` from Firebase Console
2. Place it in: `android/app/google-services.json`

## Step 10: Test on Real Devices

### iOS:
1. Connect iPhone via USB
2. Trust the computer on iPhone
3. In Xcode, select your device from the device list
4. Click Run (may need to configure signing)

### Android:
1. Enable Developer Mode on Android device
2. Enable USB Debugging
3. Connect device via USB
4. In Android Studio, select your device
5. Click Run

## Common Issues & Solutions

### Issue: "No Bundle URL present"
**Solution:** Make sure you ran `npm run build` and `npx cap sync`

### Issue: "Code signing required"
**Solution:** In Xcode, select your Team under Signing & Capabilities

### Issue: Google Sign-In not working
**Solution:** 
- Make sure you've configured OAuth for mobile in Google Cloud Console
- Add the correct reverse client ID to iOS Info.plist
- Add google-services.json to Android project

### Issue: White screen on app launch
**Solution:** 
- Check that webDir in capacitor.config.ts points to 'dist'
- Verify dist folder exists after build
- Check browser console in Xcode/Android Studio for errors

## Development Workflow

During development, use this workflow:

1. **Make changes to your React code**
2. **Build the web app:**
   ```bash
   npm run build
   ```
3. **Sync changes to native projects:**
   ```bash
   npx cap sync
   ```
4. **Rerun the app in Xcode/Android Studio**

For faster development, you can use live reload:
```bash
npm run dev
```
Then update capacitor.config.ts to point to your local server (for testing only).

## Building for Production

### iOS - Create Archive:
1. In Xcode, select "Any iOS Device" as target
2. Product > Archive
3. Once archived, click "Distribute App"
4. Choose "App Store Connect"
5. Follow the wizard

### Android - Create App Bundle:
1. In Android Studio: Build > Generate Signed Bundle / APK
2. Choose "Android App Bundle"
3. Create or select a keystore
4. Choose "release" build variant
5. Generate bundle

The .aab file will be in: `android/app/release/`

## Next Steps

1. ✅ Test thoroughly on both platforms
2. ✅ Configure app icons and splash screens
3. ✅ Set up Google Sign-In for mobile
4. ✅ Test on real devices
5. ✅ Prepare app store assets (screenshots, descriptions)
6. ✅ Submit to App Store and Google Play

## Useful Commands Reference

```bash
# Build web app
npm run build

# Sync changes to native projects
npx cap sync

# Open iOS in Xcode
npx cap open ios

# Open Android in Android Studio
npx cap open android

# Add a Capacitor plugin
npm install @capacitor/[plugin-name]

# Update Capacitor
npm install @capacitor/cli@latest @capacitor/core@latest
npx cap sync

# Clean and rebuild
rm -rf dist node_modules package-lock.json
npm install
npm run build
npx cap sync
```

## Resources

- **Capacitor Docs:** https://capacitorjs.com/docs
- **iOS Setup Guide:** https://capacitorjs.com/docs/ios
- **Android Setup Guide:** https://capacitorjs.com/docs/android
- **Plugin Marketplace:** https://capacitorjs.com/plugins

---

**Need Help?**
- Capacitor Discord: https://discord.gg/UPYqBNhHw
- Stack Overflow: Tag with [capacitor]
