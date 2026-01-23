# 🚀 Quick Start Guide - Cheeseburger Factory Loyalty App

Get your loyalty app running in 10 minutes!

> **⚠️ CRITICAL**: This app requires Supabase configuration. You MUST complete steps 2-4 before the app will work.

## What You're Building

A mobile-first restaurant app with:
- ✅ Google Sign-In authentication
- ✅ Loyalty points system
- ✅ QR codes for each customer
- ✅ Dynamic rewards catalog
- ✅ Full menu with real prices
- ✅ Multiple location support

## Prerequisites

```bash
# Check you have these installed:
node --version  # Should be v16 or higher
npm --version   # or pnpm
```

## Step 1: Install Dependencies (1 minute)

```bash
# If using npm:
npm install

# If using pnpm (recommended):
pnpm install
```

## Step 2: Set Up Supabase (5 minutes)

### Quick Setup:
1. Go to https://supabase.com and create free account
2. Create new project
3. Go to SQL Editor → New Query
4. Copy entire contents of `SUPABASE_SCHEMA.sql` → Paste → Run
5. Go to Authentication → Providers → Enable Google
6. Get your Supabase URL and anon key from Project Settings → API

### Detailed Instructions:
See `SUPABASE_SETUP_GUIDE.md` for complete walkthrough

## Step 3: Configure Google OAuth (3 minutes)

1. Go to https://console.cloud.google.com
2. Create project → APIs & Services → Credentials
3. Create OAuth Client ID (Web application)
4. Add redirect URI: `https://YOUR_PROJECT_ID.supabase.co/auth/v1/callback`
5. Copy Client ID and Secret
6. Paste into Supabase → Authentication → Providers → Google

## Step 4: Environment Variables (1 minute)

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your values:
# VITE_SUPABASE_URL=https://xxxxx.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJhbG...
```

## Step 5: Start the App! (30 seconds)

```bash
npm run dev
# or
pnpm dev
```

Open http://localhost:5173 (or the URL shown in terminal)

## 🎉 You're Done!

You should see:
1. Beautiful sign-in screen
2. "Sign in with Google" button
3. After signing in → Full app with menu, loyalty points, and QR code!

## Testing Your Setup

### Test Authentication:
1. Click "Sign in with Google"
2. Choose your Google account
3. Should redirect back to app
4. Bottom nav should show "Profile"

### Test QR Code:
1. Click "Profile" (user icon) in bottom nav
2. Scroll down to "Your Loyalty QR Code"
3. You should see a QR code
4. Scan with phone camera - should show JSON with your userId

### Test Loyalty Points:
1. Go to Profile
2. Should see "0 points" and "Bronze Member"
3. Below: Available rewards from database
4. Shows tier progress bar

## What Each File Does

```
📦 Cheeseburger Factory App
├── 📄 SUPABASE_SCHEMA.sql           # Database tables and functions
├── 📄 SUPABASE_SETUP_GUIDE.md       # Complete setup instructions
├── 📄 QR_CODE_REFERENCE.md          # QR code implementation details
├── 📄 LOYALTY_TRACKING_GUIDE.md     # Admin panel options
├── 📄 .env.example                   # Environment variable template
│
├── 📁 src/
│   ├── 📁 app/
│   │   ├── App.tsx                   # Main app component (with auth)
│   │   └── 📁 components/
│   │       ├── auth-screen.tsx       # Sign-in screen
│   │       ├── profile-view.tsx      # QR code & profile display
│   │       ├── loyalty-card.tsx      # Points & rewards
│   │       └── ...                   # Other UI components
│   │
│   ├── 📁 contexts/
│   │   └── auth-context.tsx          # Authentication state management
│   │
│   └── 📁 lib/
│       └── supabase.ts               # Supabase client & helpers
```

## Common Issues & Fixes

### ❌ "Supabase Not Configured"
```bash
# Make sure .env file exists:
ls -la .env

# Check contents:
cat .env

# Restart dev server:
npm run dev
```

### ❌ Google Sign-In Not Working
1. Check redirect URI in Google Console
2. Verify it matches: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
3. Make sure Google provider is enabled in Supabase

### ❌ Loyalty Account Not Created
1. Check Supabase → Table Editor → `loyalty_accounts`
2. If empty, run `SUPABASE_SCHEMA.sql` again
3. The trigger should auto-create accounts on sign-up

### ❌ QR Code Not Showing
1. Make sure you're signed in
2. Check browser console for errors
3. Verify `qrcode.react` is installed:
   ```bash
   npm list qrcode.react
   ```

## Next Steps

### For Customers (Already Done! ✅):
- [x] Sign up with Google
- [x] View menu and prices
- [x] See loyalty points
- [x] Get QR code
- [x] Track rewards

### For Staff (To Do):
- [ ] Build admin panel to scan QR codes
- [ ] Award points after purchases
- [ ] See `LOYALTY_TRACKING_GUIDE.md` for options:
  - Manual admin panel
  - QR code scanner
  - API integration with POS

### Customization:
- [ ] Add your real restaurant locations (edit `LOCATIONS` in `App.tsx`)
- [ ] Customize rewards (edit `rewards` table in Supabase)
- [ ] Add your logo and branding
- [ ] Set up custom domain

## Key Features Implemented

### Authentication 🔐
- Google Sign-In via Supabase
- Automatic user profile creation
- Secure session management
- Sign out functionality

### Loyalty System 🏆
- Points calculation (10 points per $1)
- Automatic tier progression:
  - Bronze: 0-250 points
  - Silver: 250-500 points
  - Gold: 500-1000 points
  - Platinum: 1000+ points
- Lifetime points tracking
- Transaction history

### QR Codes 📱
- Unique QR per customer
- Contains userId for identification
- High error correction
- Scannable by any QR reader
- Used for point awards at checkout

### Menu & Ordering 🍔
- Full menu with categories
- Real prices from website
- "Order Now" links to Abacus ordering
- Popular items highlighted
- Mobile-optimized cards

### Rewards Catalog 🎁
- Dynamic rewards from database
- Point requirements
- Redemption system
- Active/inactive toggle
- Categories: discounts, free items, special offers

## Database Tables

Your Supabase project now has:

| Table | Purpose |
|-------|---------|
| `user_profiles` | User info (name, email, avatar) |
| `loyalty_accounts` | Points, tier, lifetime stats |
| `loyalty_transactions` | Every point earned/redeemed |
| `rewards` | Available rewards catalog |
| `redeemed_rewards` | User redemption history |
| `favorites` | Favorite menu items |
| `order_history` | Past orders (optional) |

## Testing Checklist

- [ ] App loads without errors
- [ ] Sign-in screen appears
- [ ] Google sign-in works
- [ ] Redirects back to app after auth
- [ ] Menu loads with all items
- [ ] "Order Now" opens external link
- [ ] Profile shows user info
- [ ] QR code displays
- [ ] QR code scans correctly
- [ ] Loyalty points show (0 initially)
- [ ] Rewards load from database
- [ ] Tier badge displays
- [ ] Sign out works

## Resources

- **Supabase Docs**: https://supabase.com/docs
- **QR Code Library**: https://www.npmjs.com/package/qrcode.react
- **Google OAuth**: https://developers.google.com/identity/protocols/oauth2
- **Tailwind CSS**: https://tailwindcss.com/docs

## Support Files

1. `SUPABASE_SETUP_GUIDE.md` - Complete Supabase setup
2. `QR_CODE_REFERENCE.md` - QR implementation details
3. `LOYALTY_TRACKING_GUIDE.md` - Admin panel options
4. `SUPABASE_SCHEMA.sql` - Database schema
5. `.env.example` - Environment variables template

## Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check (if using TypeScript)
npx tsc --noEmit
```

## Production Deployment

Before deploying:
1. ✅ Update OAuth redirect URIs for production domain
2. ✅ Set production environment variables
3. ✅ Test all features in production
4. ✅ Set up monitoring and error tracking
5. ✅ Configure custom domain in Supabase

## Security Checklist

- [x] Row Level Security (RLS) enabled
- [x] Users can only see their own data
- [x] API keys in environment variables
- [x] OAuth managed by Supabase
- [x] No sensitive data in QR codes
- [x] Admin functions require authentication

## Performance

- Mobile-first responsive design
- Fast loading with Vite
- Optimized bundle size
- Lazy loading where appropriate
- Efficient Supabase queries

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Safari (latest)
- ✅ Firefox (latest)
- ✅ Mobile browsers (iOS Safari, Chrome)

## Questions?

1. Check the relevant guide:
   - Setup issues → `SUPABASE_SETUP_GUIDE.md`
   - QR codes → `QR_CODE_REFERENCE.md`
   - Admin panel → `LOYALTY_TRACKING_GUIDE.md`

2. Check Supabase logs:
   - Project → Logs → Database/Auth

3. Check browser console for errors

---

## 🎊 Congratulations!

You now have a fully functional loyalty app with:
- Google authentication
- QR codes for customers
- Points tracking
- Rewards system
- Production-ready setup

**Next**: Build the admin panel to scan QR codes and award points!
See `LOYALTY_TRACKING_GUIDE.md` for three implementation options.