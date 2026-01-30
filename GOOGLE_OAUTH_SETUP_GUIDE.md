# 🔐 Google OAuth Setup Guide - Cheeseburger Factory App

## ⚠️ CRITICAL: This setup is REQUIRED for customer sign-in to work!

Follow these steps exactly to enable Google login in your app.

---

## 📋 **STEP 1: Create Google Cloud Project**

### 1.1 Go to Google Cloud Console
Visit: https://console.cloud.google.com

### 1.2 Create New Project
1. Click the project dropdown (top-left)
2. Click **"New Project"**
3. Name it: **"Cheeseburger Factory App"**
4. Click **"Create"**
5. Wait for project creation (30 seconds)

### 1.3 Select Your Project
1. Click the project dropdown again
2. Select **"Cheeseburger Factory App"**

---

## 📋 **STEP 2: Enable Google+ API**

### 2.1 Navigate to APIs
1. In the left sidebar, click **"APIs & Services"** → **"Library"**
2. Search for: **"Google+ API"**
3. Click on **"Google+ API"**
4. Click the blue **"ENABLE"** button
5. Wait for API to be enabled

---

## 📋 **STEP 3: Configure OAuth Consent Screen**

### 3.1 Navigate to OAuth Consent
1. Left sidebar → **"APIs & Services"** → **"OAuth consent screen"**

### 3.2 Choose User Type
1. Select **"External"**
2. Click **"CREATE"**

### 3.3 Fill in App Information
**App name:** Cheeseburger Factory  
**User support email:** Your email  
**App logo:** (Optional - upload your logo)  
**Developer contact email:** Your email  

Click **"SAVE AND CONTINUE"**

### 3.4 Scopes (Leave Default)
Click **"SAVE AND CONTINUE"**

### 3.5 Test Users (Optional)
Add test emails if needed  
Click **"SAVE AND CONTINUE"**

### 3.6 Summary
Click **"BACK TO DASHBOARD"**

---

## 📋 **STEP 4: Create OAuth Credentials**

### 4.1 Navigate to Credentials
1. Left sidebar → **"APIs & Services"** → **"Credentials"**

### 4.2 Create OAuth Client ID
1. Click **"+ CREATE CREDENTIALS"**
2. Select **"OAuth client ID"**

### 4.3 Application Type
Select: **"Web application"**

### 4.4 Name Your Client
Name: **Cheeseburger Factory Web App**

### 4.5 Add Authorized Redirect URIs
**CRITICAL:** Add BOTH of these URLs:

```
https://[YOUR-SUPABASE-PROJECT-ID].supabase.co/auth/v1/callback
https://thecheeseburgerfactoryapp.vercel.app
```

**How to find your Supabase Project ID:**
1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Look for **Project URL**: `https://XXXXX.supabase.co`
5. The `XXXXX` is your project ID

### 4.6 Create
1. Click **"CREATE"**
2. A popup appears with your credentials

### 4.7 **SAVE THESE CREDENTIALS!**
**Client ID:** (starts with something like `123456789-abc.apps.googleusercontent.com`)  
**Client Secret:** (looks like `GOCSPX-xxxxxxxxxxxxx`)  

⚠️ **KEEP THESE SAFE!** You'll need them in the next step.

---

## 📋 **STEP 5: Configure Supabase**

### 5.1 Go to Supabase Dashboard
Visit: https://supabase.com/dashboard

### 5.2 Select Your Project
Click on your Cheeseburger Factory project

### 5.3 Navigate to Authentication
Left sidebar → **Authentication** → **Providers**

### 5.4 Find Google Provider
Scroll down and click on **"Google"**

### 5.5 Enable Google
Toggle the switch to **ON** (should turn green)

### 5.6 Enter Google Credentials
**Client ID:** (paste from Step 4.7)  
**Client Secret:** (paste from Step 4.7)  

### 5.7 Configure URLs
**Site URL:**
```
https://thecheeseburgerfactoryapp.vercel.app
```

**Redirect URLs (one per line):**
```
https://thecheeseburgerfactoryapp.vercel.app
https://thecheeseburgerfactoryapp.vercel.app/**
http://localhost:5173
```

### 5.8 Save
Click **"Save"** button

---

## 📋 **STEP 6: Configure Vercel Environment Variables**

### 6.1 Go to Vercel Dashboard
Visit: https://vercel.com/dashboard

### 6.2 Select Your Project
Click on **"The-Cheeseburgerfactory-App"** project

### 6.3 Navigate to Settings
Click **"Settings"** tab

### 6.4 Environment Variables
Click **"Environment Variables"** in the left sidebar

### 6.5 Add Supabase URL
**Name:** `VITE_SUPABASE_URL`  
**Value:** `https://[YOUR-PROJECT-ID].supabase.co`  
**Environment:** Production, Preview, Development (check all)  
Click **"Save"**

### 6.6 Add Supabase Anon Key
**Name:** `VITE_SUPABASE_ANON_KEY`  
**Value:** (Get this from Supabase Dashboard → Settings → API → anon public key)  
**Environment:** Production, Preview, Development (check all)  
Click **"Save"**

### 6.7 Redeploy
1. Go to **"Deployments"** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete

---

## ✅ **STEP 7: Test Google Sign-In**

### 7.1 Open Your Live App
Visit: https://thecheeseburgerfactoryapp.vercel.app

### 7.2 Click "Sign In"
Top-right corner of the app

### 7.3 Click "Sign in with Google"
A Google popup should appear

### 7.4 Select Your Google Account
Choose your account

### 7.5 Grant Permission
Click **"Allow"** when asked for permissions

### 7.6 Success!
You should be redirected back to the app, signed in!

---

## 🎉 **YOU'RE DONE!**

Customers can now:
- ✅ Sign in with Google
- ✅ Earn loyalty points
- ✅ View their profile
- ✅ Redeem rewards
- ✅ See their QR code

---

## 🐛 **Troubleshooting**

### Error: "Redirect URI mismatch"
**Fix:** Make sure you added the EXACT redirect URI in Google Cloud Console (Step 4.5)

### Error: "Provider is not enabled"
**Fix:** Make sure you enabled Google in Supabase (Step 5.5)

### Sign-in popup doesn't appear
**Fix:** Check browser popup blocker settings

### Can't find Supabase Project ID
**Fix:** Go to Supabase Dashboard → Settings → API → look for "Project URL"

---

## 📞 **Need Help?**

If you're stuck:
1. Double-check all URLs match exactly
2. Make sure environment variables are set in Vercel
3. Try redeploying the app
4. Clear browser cache and try again

---

**Setup Time:** ~15-20 minutes  
**Difficulty:** Medium  
**Required:** YES - App won't work without this!
