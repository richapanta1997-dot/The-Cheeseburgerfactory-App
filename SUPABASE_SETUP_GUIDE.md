# Supabase Setup Guide - Cheeseburger Factory Loyalty App

This guide will help you set up Supabase authentication and the loyalty system with QR code functionality.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Google Cloud Console account for OAuth setup

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in:
   - **Project Name**: Cheeseburger Factory
   - **Database Password**: (Create a strong password and save it)
   - **Region**: Choose closest to your users
4. Wait for project to be created (~2 minutes)

## Step 2: Run the Database Schema

1. In your Supabase project, go to **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy the entire contents of `SUPABASE_SCHEMA.sql` and paste it into the editor
4. Click **RUN** to execute the schema
5. You should see: "Success. No rows returned"

This creates all necessary tables:
- `user_profiles` - User information
- `loyalty_accounts` - Loyalty points and tiers
- `loyalty_transactions` - Point transaction history
- `rewards` - Available rewards catalog
- `redeemed_rewards` - Redeemed rewards tracking
- `favorites` - User favorite menu items
- `order_history` - Order records

## Step 3: Get Your Supabase Credentials

1. In your Supabase project, go to **Project Settings** (gear icon)
2. Click **API** in the left menu
3. Find these values:
   - **Project URL**: `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`

## Step 4: Configure Google OAuth

### In Google Cloud Console:

1. Go to https://console.cloud.google.com
2. Create a new project or select existing one
3. Go to **APIs & Services** → **OAuth consent screen**
4. Configure OAuth consent screen:
   - User Type: External
   - App name: Cheeseburger Factory
   - User support email: your email
   - Developer contact: your email
5. Go to **Credentials** → **Create Credentials** → **OAuth Client ID**
6. Application type: Web application
7. Add Authorized redirect URIs:
   ```
   https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback
   ```
   Replace `YOUR_PROJECT_ID` with your actual Supabase project ID
8. Save and copy the **Client ID** and **Client Secret**

### In Supabase:

1. Go to **Authentication** → **Providers** (left sidebar)
2. Find **Google** and click to expand
3. Toggle **Enable Sign in with Google**
4. Paste your Google **Client ID** and **Client Secret**
5. Click **Save**

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your values:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...your-anon-key-here

   # Google OAuth Configuration (optional - already configured in Supabase)
   VITE_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   ```

3. **Important**: Never commit the `.env` file to version control!

## Step 6: Test the Application

1. Start your development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

2. Open the app in your browser
3. You should see the sign-in screen
4. Click "Sign in with Google"
5. Complete the Google sign-in flow
6. You should be redirected back to the app, now logged in!

## Step 7: Verify Database Setup

After signing in for the first time:

1. Go to Supabase → **Table Editor**
2. Check the `user_profiles` table - you should see your user
3. Check the `loyalty_accounts` table - a loyalty account should be auto-created with 0 points and Bronze tier

## Features Enabled

✅ **Google Sign-In**: Users can authenticate with their Google account  
✅ **Loyalty Points**: Each user has their own loyalty account  
✅ **QR Code**: Users get a unique QR code in their profile  
✅ **Rewards Catalog**: Dynamic rewards loaded from Supabase  
✅ **Automatic Tier Calculation**: Tiers update based on lifetime points

## How the QR Code System Works

### For Customers:
1. Sign in to the app with Google
2. Go to Profile (bottom navigation)
3. See their QR code displayed
4. Show QR code to staff at checkout

### For Staff (Admin Panel):
The QR code contains the customer's user ID encoded in JSON:
```json
{
  "userId": "uuid-here",
  "email": "customer@example.com",
  "type": "loyalty",
  "timestamp": 1234567890
}
```

Staff can scan this QR code using:
- The admin panel (see `LOYALTY_TRACKING_GUIDE.md` for admin panel setup)
- Any QR scanner that can decode JSON
- A mobile scanner app that sends data to your admin system

## Next Steps

1. **Build the Admin Panel** (optional):
   - See `LOYALTY_TRACKING_GUIDE.md` for instructions
   - Create a staff interface to scan QR codes and award points

2. **Customize Rewards**:
   - Go to Supabase → **Table Editor** → `rewards`
   - Add, edit, or remove rewards
   - Changes appear immediately in the app

3. **Add More Locations**:
   - Edit `LOCATIONS` array in `/src/app/App.tsx`
   - Add your actual restaurant locations

4. **Configure for Production**:
   - Set up custom domain
   - Update OAuth redirect URIs
   - Set up Row Level Security policies (already done in schema)

## Troubleshooting

### "Supabase Not Configured" Error
- Make sure `.env` file exists
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
- Restart your dev server after changing `.env`

### Google Sign-In Not Working
- Verify redirect URI in Google Console matches Supabase
- Check that Google OAuth is enabled in Supabase Authentication
- Ensure Client ID and Secret are correctly entered in Supabase

### Loyalty Account Not Created
- Check Supabase logs: **Database** → **Logs**
- Verify the trigger was created: Run `SUPABASE_SCHEMA.sql` again
- Manually create account in Table Editor if needed

### Points Not Showing
- Verify user is logged in (check browser console)
- Check `loyalty_accounts` table for the user's entry
- Try signing out and back in

## Security Notes

🔒 **Row Level Security (RLS)**: Already enabled in schema  
🔒 **Users can only see their own data**: Enforced by RLS policies  
🔒 **API keys are environment variables**: Never exposed to git  
🔒 **OAuth tokens managed by Supabase**: Secure token handling

## Support

For issues with:
- **Supabase**: https://supabase.com/docs
- **Google OAuth**: https://developers.google.com/identity/protocols/oauth2
- **This app**: Check `LOYALTY_TRACKING_GUIDE.md` for admin panel setup

## Summary

You now have:
- ✅ Google authentication working
- ✅ User profiles auto-created on sign-up
- ✅ Loyalty accounts with points and tiers
- ✅ QR codes for each customer
- ✅ Dynamic rewards from database
- ✅ Secure, production-ready setup

**Next**: Build the admin panel to scan QR codes and award points! See `LOYALTY_TRACKING_GUIDE.md`.
