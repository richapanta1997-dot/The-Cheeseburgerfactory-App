# Cheeseburger Factory App - Deployment Checklist

## Pre-Submission Checklist

### ✅ Legal & Documentation
- [ ] Privacy Policy written and hosted on public URL
- [ ] Terms of Service written (optional but recommended)
- [ ] Contact email set up (e.g., support@cheeseburger-factory.com)
- [ ] Support website/page created
- [ ] Refund policy documented (if applicable)

### ✅ App Store Assets

#### Icons
- [ ] iOS App Icon: 1024x1024px (PNG, no transparency, no rounded corners)
- [ ] Android App Icon: 512x512px (PNG, can have transparency)
- [ ] All icon sizes generated for various devices

#### Screenshots (iOS)
- [ ] iPhone 6.7" (iPhone 14 Pro Max, iPhone 15 Pro Max) - Required
- [ ] iPhone 6.5" (iPhone 11 Pro Max, iPhone XS Max) - Required
- [ ] iPhone 5.5" (iPhone 8 Plus) - Required
- [ ] iPad Pro 12.9" (6th gen) - Required if supporting iPad
- [ ] iPad Pro 12.9" (2nd gen) - Required if supporting iPad

#### Screenshots (Android)
- [ ] Phone screenshots (minimum 2, up to 8) - 1080x1920px
- [ ] 7-inch tablet screenshots (optional) - 1920x1080px
- [ ] 10-inch tablet screenshots (optional) - 2560x1600px
- [ ] Feature graphic: 1024x500px (REQUIRED)
- [ ] Promo video (optional) - YouTube link

### ✅ App Information

#### App Store (iOS)
- [ ] App name (max 30 characters): "Cheeseburger Factory"
- [ ] Subtitle (max 30 characters): e.g., "Order & Earn Rewards"
- [ ] Description (max 4000 characters)
- [ ] Keywords (max 100 characters, comma-separated)
- [ ] Primary category: Food & Drink
- [ ] Secondary category (optional)
- [ ] Age rating completed
- [ ] Copyright information
- [ ] What's new in this version (for updates)

#### Google Play (Android)
- [ ] App name (max 50 characters): "Cheeseburger Factory"
- [ ] Short description (max 80 characters)
- [ ] Full description (max 4000 characters)
- [ ] Primary category: Food & Drink
- [ ] Content rating completed
- [ ] Target audience and content selected

### ✅ Developer Accounts
- [ ] Apple Developer Account ($99/year) - Enrolled and active
- [ ] Google Play Developer Account ($25 one-time) - Registered
- [ ] Both accounts verified with payment methods
- [ ] Tax information completed (both platforms)

### ✅ Technical Configuration

#### General
- [ ] App runs without crashes on all target devices
- [ ] All features tested thoroughly
- [ ] App handles no internet connection gracefully
- [ ] Error messages are user-friendly
- [ ] Loading states implemented
- [ ] App tested on real devices (not just simulators)

#### iOS Specific
- [ ] Bundle ID created: com.cheeseburger.factory
- [ ] Provisioning profiles generated
- [ ] App built and archived in Xcode
- [ ] App uploaded to App Store Connect
- [ ] iOS version compatibility set (minimum iOS 13.0)
- [ ] Supported device families selected

#### Android Specific
- [ ] Package name: com.cheeseburger.factory
- [ ] App Bundle (.aab) or APK signed
- [ ] Version code and version name set
- [ ] Target SDK set to latest (API 34 for Android 14)
- [ ] Minimum SDK set (API 26 - Android 8.0)
- [ ] App signing configured

### ✅ Integrations & APIs

#### Google Sign-In
- [ ] OAuth client IDs created for iOS
- [ ] OAuth client IDs created for Android
- [ ] Consent screen configured in Google Cloud Console
- [ ] Redirect URIs configured for mobile apps
- [ ] Tested on both platforms

#### Supabase
- [ ] Production Supabase project created
- [ ] Database tables created with proper schema
- [ ] Row Level Security (RLS) policies configured
- [ ] API keys secured (using environment variables)
- [ ] OAuth providers configured in Supabase dashboard
- [ ] Email templates customized (if using email auth)
- [ ] Tested with production environment

#### External Ordering Link
- [ ] Abacus ordering link verified: https://ou.abacus.co/en/Store/5972057/
- [ ] Link opens correctly in mobile browsers
- [ ] Discussed with Apple (external payment system is acceptable for physical goods)

### ✅ App Functionality Testing

#### Core Features
- [ ] Google Sign-In works on iOS
- [ ] Google Sign-In works on Android
- [ ] Location selector functions properly
- [ ] Find Us page shows all locations correctly
- [ ] Get Directions opens Google Maps
- [ ] Call functionality works (phone numbers)
- [ ] Order Now button opens external link
- [ ] Menu displays all items correctly
- [ ] Loyalty points display correctly
- [ ] Favorites can be saved and viewed

#### Performance
- [ ] App loads in under 3 seconds
- [ ] Images load efficiently
- [ ] Smooth scrolling on menu pages
- [ ] No memory leaks
- [ ] Battery usage is reasonable

#### Permissions
- [ ] Location permission requested properly (with explanation)
- [ ] Location permission can be denied (app still works)
- [ ] All permission requests have descriptive text

### ✅ Compliance

#### iOS App Review Guidelines
- [ ] App doesn't crash or have major bugs
- [ ] App is complete and fully functional
- [ ] All links work properly
- [ ] Privacy Policy accessible from app
- [ ] No prohibited content
- [ ] Follows Human Interface Guidelines
- [ ] Uses Apple's standard UI elements appropriately

#### Google Play Policies
- [ ] Privacy Policy hosted on accessible URL
- [ ] App doesn't contain malware
- [ ] Appropriate content rating
- [ ] Follows Material Design guidelines (recommended)
- [ ] No deceptive behavior
- [ ] Proper permission usage declarations

### ✅ App Store Listing Optimization (ASO)

#### Keywords to Target
- [ ] Cheeseburger
- [ ] Burger delivery
- [ ] Fast food
- [ ] Restaurant rewards
- [ ] Food ordering
- [ ] Loyalty program
- [ ] [Your city names]: Burwood, Parramatta, Sydney, Bondi, Chatswood

#### Compelling Description Written
- [ ] Highlights key features (ordering, rewards, multiple locations)
- [ ] Includes customer benefits
- [ ] Uses relevant keywords naturally
- [ ] Has clear call-to-action

### ✅ Marketing Assets Ready
- [ ] Promo video created (optional but recommended)
- [ ] Press kit prepared
- [ ] Social media graphics
- [ ] Launch announcement prepared
- [ ] Email campaign ready (if you have a mailing list)

### ✅ Post-Launch Preparation

#### Monitoring Tools
- [ ] Firebase Analytics integrated
- [ ] Crash reporting set up (Firebase Crashlytics)
- [ ] App Store Connect analytics access
- [ ] Google Play Console analytics access
- [ ] Customer support email monitored

#### Update Plan
- [ ] Bug fix process defined
- [ ] Feature update roadmap created
- [ ] Version numbering strategy decided
- [ ] Release notes template prepared

### ✅ Beta Testing (Highly Recommended)
- [ ] TestFlight setup for iOS beta testing
- [ ] Internal testing track on Google Play
- [ ] Beta testers invited (friends, family, employees)
- [ ] Feedback collected and addressed
- [ ] At least 1-2 weeks of beta testing completed

---

## Submission Steps

### iOS (App Store)

1. **Prepare**
   - [ ] Build and archive app in Xcode
   - [ ] Upload to App Store Connect

2. **Configure**
   - [ ] Complete all app information
   - [ ] Upload screenshots and icon
   - [ ] Add privacy policy URL
   - [ ] Answer App Privacy questions
   - [ ] Set pricing (Free)
   - [ ] Select territories

3. **Submit**
   - [ ] Submit for review
   - [ ] Monitor status in App Store Connect
   - [ ] Respond to any review feedback within 48 hours

4. **Expected Timeline:** 1-3 days for initial review

### Android (Google Play)

1. **Prepare**
   - [ ] Build signed App Bundle (.aab)
   - [ ] Upload to Google Play Console

2. **Configure**
   - [ ] Complete store listing
   - [ ] Upload graphics and screenshots
   - [ ] Add privacy policy URL
   - [ ] Complete content rating questionnaire
   - [ ] Complete Data safety section
   - [ ] Select countries
   - [ ] Set pricing (Free)

3. **Submit**
   - [ ] Submit for review
   - [ ] Monitor status in Google Play Console
   - [ ] Respond to any review feedback

4. **Expected Timeline:** Few hours to 1 day for initial review

---

## Emergency Contacts

### If App Gets Rejected

**Common iOS Rejection Reasons:**
- Privacy Policy issues
- Bugs or crashes
- Incomplete features
- Guideline violations

**Common Android Rejection Reasons:**
- Privacy Policy missing or not accessible
- Deceptive content
- Broken functionality
- Policy violations

### Support Resources
- Apple Developer Support: https://developer.apple.com/support/
- Google Play Support: https://support.google.com/googleplay/android-developer/

---

## Post-Launch Checklist (After Approval)

- [ ] App is live on App Store
- [ ] App is live on Google Play
- [ ] Both store links tested and working
- [ ] Social media announcement posted
- [ ] Website updated with app download links
- [ ] Press release sent (if applicable)
- [ ] Monitor reviews and ratings daily
- [ ] Respond to user reviews
- [ ] Track download numbers
- [ ] Monitor crash reports
- [ ] Plan first update based on user feedback

---

**Good luck with your submission! 🚀**
