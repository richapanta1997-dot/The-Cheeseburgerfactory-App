# 🔑 Your API Keys & Credentials

## 📱 **Supabase API Credentials**

### ✅ **Your Supabase Project:**

**Project ID:**
```
qaaxcjxcufsguaiabmmv
```

**Public Anon Key (Safe to use in frontend):**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhYXhjanhjdWZzZ3VhaWFibW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMDU2NzgsImV4cCI6MjA4NDY4MTY3OH0.e20_6TgRS5IxwySidB_v9rlugcZHUHtc-tL847Q9ito
```

**Supabase URL:**
```
https://qaaxcjxcufsguaiabmmv.supabase.co
```

**Supabase Dashboard:**
```
https://supabase.com/dashboard/project/qaaxcjxcufsguaiabmmv
```

---

## 🔐 **Google OAuth (Needs Setup)**

### ⚠️ **Action Required:**

Your Google OAuth Client ID is currently set to placeholder:
```
YOUR_GOOGLE_CLIENT_ID_HERE
```

**Location:** `/src/app/components/google-auth.tsx` (line 21)

---

## 🚨 **To Get Your Google OAuth Working:**

### **Step 1: Get Google Client ID**

1. Go to: https://console.cloud.google.com/
2. Create a new project (or select existing)
3. Enable "Google+ API"
4. Go to: Credentials → Create Credentials → OAuth Client ID
5. Application Type: **Web application**
6. Authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - Your production URL (when deployed)
7. Authorized redirect URIs:
   - `http://localhost:5173`
   - Your production URL
8. Click **Create**
9. Copy your **Client ID**

### **Step 2: Add to Your App**

Open `/src/app/components/google-auth.tsx` and replace line 21:

```tsx
// Change this:
const clientId = 'YOUR_GOOGLE_CLIENT_ID_HERE';

// To this (with your actual ID):
const clientId = '123456789-abc123xyz.apps.googleusercontent.com';
```

---

## 🔐 **For Supabase Backend:**

Your backend server needs the **Service Role Key** (not the public key above).

**Where to find it:**
1. Go to Supabase Dashboard
2. Project Settings → API
3. Copy "service_role" key (keep this secret!)

**This key is already configured in your Supabase Edge Functions** via environment variable `SUPABASE_SERVICE_ROLE_KEY`.

---

## 📝 **Environment Variables (for deployment):**

When deploying to production (Vercel, Netlify, etc.), set these:

```bash
VITE_SUPABASE_URL=https://qaaxcjxcufsguaiabmmv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhYXhjanhjdWZzZ3VhaWFibW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxMDU2NzgsImV4cCI6MjA4NDY4MTY3OH0.e20_6TgRS5IxwySidB_v9rlugcZHUHtc-tL847Q9ito
VITE_GOOGLE_CLIENT_ID=your_actual_google_client_id
```

---

## 🎯 **Quick Reference:**

| Service | What You Have | Status |
|---------|---------------|--------|
| **Supabase** | ✅ Project ID & Keys | ✅ Working |
| **Google OAuth** | ❌ Needs Client ID | ⚠️ Needs Setup |
| **Backend Server** | ✅ Configured | ✅ Working |

---

## 🔒 **Security Notes:**

### ✅ **Safe to Share:**
- Supabase Public Anon Key
- Supabase Project ID
- Google OAuth Client ID

### 🚨 **NEVER SHARE:**
- Supabase Service Role Key
- Google OAuth Client Secret
- API keys in `.env` files

---

## 🚀 **For Capacitor Mobile Apps:**

Your mobile apps will use the **same API keys** as your web app. No changes needed!

The keys are already configured in:
- `/utils/supabase/info.tsx` (Supabase)
- `/src/app/components/google-auth.tsx` (Google - needs your Client ID)

---

## 📞 **Need Help?**

### **Supabase Issues:**
- Dashboard: https://supabase.com/dashboard
- Docs: https://supabase.com/docs

### **Google OAuth Issues:**
- Console: https://console.cloud.google.com/
- Setup Guide: https://developers.google.com/identity/oauth2/web/guides/get-google-api-clientid

---

## ✅ **Next Steps:**

1. **If deploying web app:** Set environment variables
2. **If using Google sign-in:** Get Google Client ID (see above)
3. **If publishing mobile:** Keys work automatically!

---

**Your Supabase is already set up and working! 🎉**
**Just need to add Google OAuth Client ID for social login.**
