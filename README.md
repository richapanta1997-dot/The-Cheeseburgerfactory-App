# 🍔 Cheeseburger Factory - Loyalty & Ordering App

A production-ready mobile-first restaurant loyalty app with Google authentication, QR codes, and real-time points tracking.

> **⚠️ IMPORTANT**: Before running the app, you must configure your Supabase credentials. See [Setup Instructions](#-quick-start) below.

## ✨ Features

### For Customers
- 🔐 **Google Sign-In** - Quick, secure authentication
- 📱 **QR Code** - Personal QR code for earning points
- 🏆 **Loyalty Points** - Earn 10 points per $1 spent
- 🎁 **Rewards** - Redeem points for discounts & free items
- 🥇 **Tier System** - Bronze → Silver → Gold → Platinum
- 📍 **Multiple Locations** - Find nearby restaurants
- 🍔 **Full Menu** - Browse all items with prices
- 🔗 **Easy Ordering** - Quick link to external ordering system

### Technical Features
- ⚡ **Real-time Data** - Powered by Supabase
- 🔒 **Row Level Security** - Your data is private
- 📊 **Transaction History** - Full audit trail
- 🎨 **Mobile-First Design** - Optimized for phones
- 🚀 **Fast Performance** - Built with Vite + React
- ♿ **Accessible** - WAI-ARIA compliant components

## 📸 Screenshots

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│  Sign In    │  │    Home     │  │   Profile   │  │   Rewards   │
│   Screen    │  │    View     │  │  + QR Code  │  │   Catalog   │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
# or: npm install
```

### 2. Set Up Supabase
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Run `SUPABASE_SCHEMA.sql` in SQL Editor
4. Enable Google OAuth in Authentication

**Detailed instructions**: See [`SUPABASE_SETUP_GUIDE.md`](./SUPABASE_SETUP_GUIDE.md)

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env with your Supabase credentials
```

### 4. Start Development Server
```bash
pnpm dev
# or: npm run dev
```

Open http://localhost:5173 and sign in! 🎉

**Full walkthrough**: See [`QUICK_START.md`](./QUICK_START.md)

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [`QUICK_START.md`](./QUICK_START.md) | Get running in 10 minutes |
| [`SUPABASE_SETUP_GUIDE.md`](./SUPABASE_SETUP_GUIDE.md) | Complete Supabase setup |
| [`QR_CODE_REFERENCE.md`](./QR_CODE_REFERENCE.md) | QR code implementation |
| [`LOYALTY_TRACKING_GUIDE.md`](./LOYALTY_TRACKING_GUIDE.md) | Admin panel options |
| [`SYSTEM_ARCHITECTURE.md`](./SYSTEM_ARCHITECTURE.md) | Technical architecture |
| [`IMPLEMENTATION_SUMMARY.md`](./IMPLEMENTATION_SUMMARY.md) | What was built |

## 🏗️ Project Structure

```
cheeseburger-factory/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main app with auth
│   │   └── components/
│   │       ├── auth-screen.tsx        # Sign-in screen
│   │       ├── profile-view.tsx       # Profile + QR code
│   │       ├── loyalty-card.tsx       # Points & rewards
│   │       └── ...                    # Other components
│   ├── contexts/
│   │   └── auth-context.tsx           # Auth state management
│   └── lib/
│       └── supabase.ts                # Supabase client
│
├── SUPABASE_SCHEMA.sql                # Database schema
├── SUPABASE_SETUP_GUIDE.md           # Setup instructions
├── QR_CODE_REFERENCE.md              # QR implementation
├── QUICK_START.md                    # Quick start guide
└── .env.example                      # Environment template
```

## 🔧 Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Vite** - Build tool
- **Radix UI** - Accessible components
- **qrcode.react** - QR generation

### Backend
- **Supabase** - Backend as a Service
  - PostgreSQL database
  - Authentication
  - Row Level Security
  - Real-time subscriptions

### Authentication
- **Google OAuth** - Via Supabase
- **JWT Tokens** - Secure sessions

## 💾 Database Schema

```sql
Tables:
├── user_profiles       -- User information
├── loyalty_accounts    -- Points & tiers
├── loyalty_transactions -- Transaction history
├── rewards             -- Rewards catalog
├── redeemed_rewards    -- Redemption tracking
├── favorites           -- Favorite items
└── order_history       -- Past orders

Functions:
├── add_loyalty_points()       -- Award points
├── redeem_loyalty_points()    -- Redeem rewards
├── admin_adjust_points()      -- Manual adjustments
└── update_loyalty_tier()      -- Auto tier updates

Triggers:
├── Auto-create loyalty account on signup
└── Auto-update tier on point changes
```

## 🎯 How It Works

### 1. Customer Signs Up
```
Sign in with Google → Account created → Loyalty account auto-generated
```

### 2. Customer Gets QR Code
```
Go to Profile → See unique QR code → Contains user ID
```

### 3. Customer Earns Points
```
Show QR at checkout → Staff scans → Points awarded
```

### 4. Points Calculate Automatically
```
Order: $25.50 → Points: 255 (10 per $1)
```

### 5. Tiers Update Automatically
```
Earn points → Reach threshold → Tier upgrades
Bronze (0) → Silver (250) → Gold (500) → Platinum (1000)
```

## 🔐 Security

- ✅ **Row Level Security** - Users see only their data
- ✅ **OAuth via Supabase** - Secure token management
- ✅ **Environment Variables** - No secrets in code
- ✅ **HTTPS Only** - Encrypted connections
- ✅ **Transaction Logging** - Full audit trail
- ✅ **JWT Validation** - Every request verified

## 🧪 Testing

### Customer Flow
```bash
# Start app
pnpm dev

# Test:
1. Sign in with Google ✓
2. View profile ✓
3. See QR code ✓
4. Check points (0 initially) ✓
5. Browse menu ✓
6. View rewards ✓
7. Sign out ✓
```

### QR Code
```bash
# Generate QR code
1. Sign in → Go to Profile
2. Take screenshot of QR
3. Test with online decoder: https://zxing.org/w/decode
4. Verify JSON output
```

## 📦 Build & Deploy

### Build for Production
```bash
pnpm build
# Output: dist/
```

### Deploy Options

**Vercel** (Recommended)
```bash
vercel --prod
```

**Netlify**
```bash
netlify deploy --prod
```

**Other Platforms**
- Upload `dist/` folder
- Set environment variables
- Configure build command: `pnpm build`

### Before Deploying
- [ ] Set production environment variables
- [ ] Update OAuth redirect URIs
- [ ] Test in production mode locally
- [ ] Enable Supabase email confirmations
- [ ] Set up error monitoring

## 🎨 Customization

### Add Your Locations
Edit `src/app/App.tsx`:
```typescript
const LOCATIONS: Location[] = [
  {
    id: 'your-location',
    name: 'Your Location Name',
    address: '123 Main St',
    distance: '2.5 km',
    hours: 'Mon-Sun: 11:00 AM - 10:00 PM',
    phone: '(02) 1234 5678'
  },
  // Add more...
];
```

### Customize Rewards
Edit Supabase `rewards` table:
```sql
INSERT INTO rewards (name, description, points_required, reward_type)
VALUES ('Your Reward', 'Description', 300, 'free_item');
```

### Change Branding
- Logo: Update in `src/app/components/auth-screen.tsx`
- Colors: Edit `src/styles/theme.css`
- Font: Update `src/styles/fonts.css`

## 🛠️ Development

### Available Scripts
```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm preview      # Preview production build
```

### Environment Variables
```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
```

## ❓ Troubleshooting

### "Supabase Not Configured"
- Verify `.env` file exists
- Check environment variables are set
- Restart dev server

### Google Sign-In Not Working
- Check OAuth redirect URI matches
- Verify Google provider enabled in Supabase
- Clear browser cache

### QR Code Not Showing
- Ensure user is signed in
- Check `qrcode.react` is installed
- Check browser console for errors

### Points Not Updating
- Verify loyalty account exists in database
- Check Supabase RLS policies
- Try signing out and back in

**More solutions**: See [`SUPABASE_SETUP_GUIDE.md`](./SUPABASE_SETUP_GUIDE.md#troubleshooting)

## 🗺️ Roadmap

### ✅ Phase 1 - Complete
- [x] Google authentication
- [x] User profiles
- [x] QR code generation
- [x] Loyalty points display
- [x] Rewards catalog

### 📋 Phase 2 - Next
- [ ] Admin panel
- [ ] QR code scanner
- [ ] Point awarding interface
- [ ] Transaction history
- [ ] Customer lookup

See [`LOYALTY_TRACKING_GUIDE.md`](./LOYALTY_TRACKING_GUIDE.md) for implementation options.

### 🚀 Phase 3 - Future
- [ ] Push notifications
- [ ] Email receipts
- [ ] Referral program
- [ ] Birthday rewards
- [ ] Analytics dashboard

## 📊 Analytics

### Track These Metrics
- Sign-ups per day
- Active users
- Points awarded
- Rewards redeemed
- Most popular rewards
- Average points per user

### Recommended Tools
- Google Analytics
- Supabase Analytics
- Mixpanel
- Amplitude

## 🤝 Contributing

This is a private project, but you can:
1. Report issues
2. Suggest features
3. Submit pull requests
4. Improve documentation

## 📄 License

Private project for Cheeseburger Factory.

## 🙋 Support

### Need Help?
1. Check documentation files above
2. Review Supabase logs
3. Check browser console
4. Search existing issues

### Useful Links
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)

## 🎉 Credits

Built with:
- React
- Supabase
- Tailwind CSS
- Radix UI
- qrcode.react
- Vite

## 📝 Notes

### Current State
- ✅ Customer app fully functional
- ✅ Authentication working
- ✅ QR codes generated
- ⏳ Admin panel pending (manual point awards via database)
- ⏳ POS integration pending

### Next Steps
1. Build admin panel (see `LOYALTY_TRACKING_GUIDE.md`)
2. Test QR scanning end-to-end
3. Train staff on system
4. Launch to beta users
5. Collect feedback and iterate

---

**Made with ❤️ for Cheeseburger Factory**

Start earning rewards today! 🍔✨