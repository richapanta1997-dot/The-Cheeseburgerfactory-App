
---

### **Google Play Store:**

1. **Create Google Play Developer Account** ($25 one-time)
   - https://play.google.com/console

2. **In Android Studio:**
   - Build → Generate Signed Bundle/APK
   - Create a keystore (keep it safe!)
   - Build Release AAB

3. **Play Console:**
   - Create new app
   - Upload AAB file
   - Add screenshots, description
   - Submit for review
   - Usually approved within hours!

---

## 🎨 **APP ICONS & SPLASH SCREENS:**

### **Create App Icons:**

You need icons in these sizes:
- **iOS:** 1024x1024px (App Store), various sizes for app
- **Android:** 512x512px (Play Store), various sizes

**Easy Tool:** https://www.appicon.co/
1. Upload one 1024x1024 image
2. Download all sizes
3. Replace in `ios/App/App/Assets.xcassets/AppIcon.appiconset/`
4. Replace in `android/app/src/main/res/` folders

---

## ⚡ **QUICK COMMANDS REFERENCE:**

```bash
# Add platforms (only needed once)
npm run cap:add:ios
npm run cap:add:android

# Open in IDE
npm run cap:ios        # Opens Xcode
npm run cap:android    # Opens Android Studio

# Sync after code changes
npm run cap:sync

# Just build web (no native)
npm run build
```

---

## 🔧 **TROUBLESHOOTING:**

### **iOS Issues:**

❌ **"Command PhaseScriptExecution failed"**
```bash
cd ios/App
pod install
cd ../..
npm run cap:sync
```

❌ **"Developer Mode disabled"**
- On iPhone: Settings → Privacy & Security → Developer Mode → Enable

---

### **Android Issues:**

❌ **"SDK location not found"**
- Open Android Studio → Preferences → Android SDK
- Note the SDK Location path
- Create `android/local.properties`:
```
sdk.dir=/Users/YourName/Library/Android/sdk
```

❌ **"Gradle build failed"**
```bash
cd android
./gradlew clean
cd ..
npm run cap:sync
```

---

## 🎯 **YOUR APP DETAILS:**

- **App Name:** Cheeseburger Factory
- **App ID:** com.cheeseburgerfactory.app
- **Web Directory:** dist
- **Platforms:** iOS & Android

---

## 📱 **NATIVE FEATURES YOU CAN ADD:**

Capacitor gives you access to:
- 📸 Camera
- 📍 Geolocation
- 📢 Push Notifications
- 💾 Local Storage
- 🔔 Haptic Feedback
- 📱 Device Info
- 🌐 Network Status
- And more!

**Install plugins:**
```bash
npm install @capacitor/camera
npm install @capacitor/geolocation
npm install @capacitor/push-notifications
```

---

## 🎉 **YOU'RE ALL SET!**

Your app is now ready to become a real iOS and Android app!

### **Next Steps:**
1. ✅ Run `npm run build`
2. ✅ Run `npm run cap:add:ios` (on Mac) or `npm run cap:add:android`
3. ✅ Open in Xcode/Android Studio
4. ✅ Test on simulator/emulator
5. ✅ Deploy to your phone
6. ✅ Publish to App Store & Play Store

**Need help?** Check out:
- Capacitor Docs: https://capacitorjs.com/docs
- iOS Guide: https://capacitorjs.com/docs/ios
- Android Guide: https://capacitorjs.com/docs/android

---

## 💡 **PRO TIPS:**

1. **Test on real devices** - simulators don't show everything
2. **Keep your keystore safe** - you can't publish updates without it
3. **Start with Android** - easier approval process
4. **Use TestFlight** for iOS beta testing
5. **Add analytics** early (Firebase, Mixpanel)

---

**Good luck with your mobile app launch! 🚀📱**
