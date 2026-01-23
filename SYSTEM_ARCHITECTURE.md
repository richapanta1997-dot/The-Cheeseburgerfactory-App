# System Architecture - Cheeseburger Factory Loyalty App

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CUSTOMER APP                            │
│                   (React + TypeScript)                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Home       │  │   Menu       │  │  Favorites   │     │
│  │   View       │  │   View       │  │   View       │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────────────────────┐       │
│  │  Locations   │  │     Profile View             │       │
│  │  View        │  │  • User Info                 │       │
│  └──────────────┘  │  • QR Code Generator         │       │
│                     │  • Loyalty Stats             │       │
│                     │  • Rewards Catalog           │       │
│                     └──────────────────────────────┘       │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │          Authentication Context                 │        │
│  │  • Google OAuth via Supabase                   │        │
│  │  • Session Management                           │        │
│  │  • User State                                   │        │
│  └────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                           ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                        SUPABASE                              │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │              Authentication                     │        │
│  │  • Google OAuth Provider                       │        │
│  │  • JWT Token Management                        │        │
│  │  • Session Handling                            │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │            PostgreSQL Database                  │        │
│  │                                                 │        │
│  │  ┌──────────────┐  ┌──────────────┐          │        │
│  │  │ user_        │  │ loyalty_     │          │        │
│  │  │ profiles     │  │ accounts     │          │        │
│  │  └──────────────┘  └──────────────┘          │        │
│  │                                                 │        │
│  │  ┌──────────────┐  ┌──────────────┐          │        │
│  │  │ loyalty_     │  │ rewards      │          │        │
│  │  │ transactions │  │              │          │        │
│  │  └──────────────┘  └──────────────┘          │        │
│  │                                                 │        │
│  │  ┌──────────────┐  ┌──────────────┐          │        │
│  │  │ redeemed_    │  │ favorites    │          │        │
│  │  │ rewards      │  │              │          │        │
│  │  └──────────────┘  └──────────────┘          │        │
│  │                                                 │        │
│  │  Row Level Security (RLS) Enabled             │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │         Database Functions                      │        │
│  │  • add_loyalty_points()                        │        │
│  │  • redeem_loyalty_points()                     │        │
│  │  • admin_adjust_points()                       │        │
│  │  • update_loyalty_tier()                       │        │
│  │  • create_loyalty_account()                    │        │
│  └────────────────────────────────────────────────┘        │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │              Triggers                           │        │
│  │  • Auto-create loyalty account on signup       │        │
│  │  • Auto-update tier on point change            │        │
│  └────────────────────────────────────────────────┘        │
└─────────────────────────────────────────────────────────────┘
                           ↕ HTTPS
┌─────────────────────────────────────────────────────────────┐
│                   ADMIN PANEL (To Build)                     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  QR Code     │  │  Customer    │  │  Transaction │     │
│  │  Scanner     │  │  Lookup      │  │  History     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  Scans customer QR → Awards points → Logs transaction      │
└─────────────────────────────────────────────────────────────┘
                           ↕
┌─────────────────────────────────────────────────────────────┐
│              EXTERNAL ORDERING SYSTEM                        │
│                   (Abacus POS)                               │
│                                                              │
│  https://ou.abacus.co/en/Store/5972057/                    │
│                                                              │
│  • Customers place orders here                              │
│  • NOT integrated with loyalty (manual point award)        │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

```
App.tsx (AuthProvider wrapper)
├── AuthScreen (if not logged in)
│   └── Google Sign-In Button
│
└── MainApp (if logged in)
    ├── Home View
    │   ├── Location Selector
    │   ├── Featured Item
    │   ├── Quick Actions
    │   ├── Popular Items
    │   └── Order Now Button
    │
    ├── Menu View
    │   ├── Menu Item Cards
    │   └── Order Now Button
    │
    ├── Favorites View
    │   └── Favorite Item Cards
    │
    ├── Locations View
    │   └── Find Us Component
    │
    ├── Profile View (Loyalty)
    │   ├── ProfileView Component
    │   │   ├── User Avatar
    │   │   ├── User Info
    │   │   ├── QR Code (qrcode.react)
    │   │   ├── Customer ID
    │   │   ├── Account Stats
    │   │   └── Sign Out Button
    │   │
    │   └── LoyaltyCard Component
    │       ├── Points Display
    │       ├── Tier Badge
    │       ├── Progress Bar
    │       ├── Rewards List (from Supabase)
    │       └── How to Earn Points
    │
    └── Bottom Navigation
```

## Data Flow Diagrams

### Authentication Flow

```
User                    Frontend              Supabase Auth         Database
 │                         │                        │                  │
 │ Click Sign In           │                        │                  │
 │──────────────────────>  │                        │                  │
 │                         │                        │                  │
 │                         │ signInWithGoogle()     │                  │
 │                         │────────────────────────>                  │
 │                         │                        │                  │
 │                         │   Redirect to Google   │                  │
 │<─────────────────────────────────────────────────                  │
 │                         │                        │                  │
 │ Authorize with Google   │                        │                  │
 │──────────────────────────────────────────────────>                 │
 │                         │                        │                  │
 │                         │   Redirect to Supabase │                  │
 │<─────────────────────────────────────────────────                  │
 │                         │                        │                  │
 │                         │                        │ Create user      │
 │                         │                        │ in auth.users    │
 │                         │                        │──────────────────>
 │                         │                        │                  │
 │                         │                        │ Trigger: Create  │
 │                         │                        │ loyalty_account  │
 │                         │                        │──────────────────>
 │                         │                        │                  │
 │                         │   Redirect to App      │                  │
 │<─────────────────────────────────────────────────                  │
 │                         │                        │                  │
 │                         │ getUser()              │                  │
 │                         │────────────────────────>                  │
 │                         │                        │                  │
 │                         │ Return user + session  │                  │
 │                         │<───────────────────────                   │
 │                         │                        │                  │
 │                         │ getLoyaltyAccount()    │                  │
 │                         │────────────────────────────────────────────>
 │                         │                        │                  │
 │                         │      Return loyalty data                  │
 │                         │<───────────────────────────────────────────
 │                         │                        │                  │
 │ Show authenticated app  │                        │                  │
 │<────────────────────────                         │                  │
```

### QR Code Generation & Scanning Flow

```
Customer App              QR Library            Staff Scanner         Database
     │                        │                      │                    │
     │ Navigate to Profile    │                      │                    │
     │                        │                      │                    │
     │ Generate QR            │                      │                    │
     │───────────────────────>                       │                    │
     │                        │                      │                    │
     │ JSON Data:             │                      │                    │
     │ {userId, email}        │                      │                    │
     │                        │                      │                    │
     │    Display QR Code     │                      │                    │
     │<───────────────────────                       │                    │
     │                        │                      │                    │
     │ Show QR to staff       │                      │                    │
     │────────────────────────────────────────────>  │                    │
     │                        │                      │                    │
     │                        │  Staff scans QR code │                    │
     │                        │                      │                    │
     │                        │  Extract userId      │                    │
     │                        │                      │                    │
     │                        │  Enter order amount  │                    │
     │                        │                      │                    │
     │                        │  Calculate points    │                    │
     │                        │  (amount * 10)       │                    │
     │                        │                      │                    │
     │                        │      add_loyalty_points(userId, points)   │
     │                        │                      │────────────────────>
     │                        │                      │                    │
     │                        │                      │  Update loyalty_   │
     │                        │                      │  accounts table    │
     │                        │                      │                    │
     │                        │                      │  Insert transaction│
     │                        │                      │  record            │
     │                        │                      │                    │
     │                        │                      │  Update tier       │
     │                        │                      │  if threshold met  │
     │                        │                      │                    │
     │                        │      Success         │                    │
     │                        │                      │<───────────────────
     │                        │                      │                    │
     │  App auto-refreshes    │                      │  Confirm to staff  │
     │  (realtime or next load)                      │<──────────────────
     │                        │                      │                    │
     │  Show new points       │                      │                    │
     │<───────────────────────────────────────────── │                    │
```

### Points Calculation Flow

```
┌──────────────────────────────────────────────────────────┐
│                   Order Total: $25.50                     │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│           Calculate Points: $25.50 × 10 = 255            │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│  Call: add_loyalty_points(userId, 255, "Purchase")      │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│           Update loyalty_accounts table:                  │
│  • points = points + 255                                 │
│  • lifetime_points = lifetime_points + 255               │
│  • updated_at = NOW()                                    │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│        Insert into loyalty_transactions:                  │
│  • user_id                                               │
│  • points_change: +255                                   │
│  • transaction_type: 'earned'                            │
│  • description: "Purchase - $25.50"                      │
│  • order_reference: "ORDER-12345"                        │
│  • created_at: NOW()                                     │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│           Trigger: update_loyalty_tier()                  │
│  Check lifetime_points:                                  │
│  • < 250:    Bronze                                      │
│  • 250-500:  Silver                                      │
│  • 500-1000: Gold                                        │
│  • 1000+:    Platinum                                    │
└──────────────────────────────────────────────────────────┘
                           ↓
┌──────────────────────────────────────────────────────────┐
│              Customer sees updated points                 │
└──────────────────────────────────────────────────────────┘
```

## Security Architecture

### Row Level Security (RLS) Policies

```
┌─────────────────────────────────────────────────┐
│            user_profiles table                   │
├─────────────────────────────────────────────────┤
│  SELECT: auth.uid() = id                        │
│  UPDATE: auth.uid() = id                        │
│  INSERT: auth.uid() = id                        │
│  DELETE: None                                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│          loyalty_accounts table                  │
├─────────────────────────────────────────────────┤
│  SELECT: auth.uid() = user_id                   │
│  UPDATE: auth.uid() = user_id                   │
│  INSERT: None (auto-created by trigger)         │
│  DELETE: None                                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│        loyalty_transactions table                │
├─────────────────────────────────────────────────┤
│  SELECT: auth.uid() = user_id                   │
│  UPDATE: None                                   │
│  INSERT: Service role only                      │
│  DELETE: None                                   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│              rewards table                       │
├─────────────────────────────────────────────────┤
│  SELECT: is_active = true (public read)         │
│  UPDATE: Service role only                      │
│  INSERT: Service role only                      │
│  DELETE: Service role only                      │
└─────────────────────────────────────────────────┘
```

### Authentication Token Flow

```
┌──────────────────────────────────────────────────────┐
│  1. User signs in with Google                        │
└──────────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────┐
│  2. Supabase issues JWT access token                 │
│     • Expires in 1 hour                              │
│     • Contains user_id and metadata                  │
└──────────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────┐
│  3. Token stored in browser (httpOnly cookie)        │
└──────────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────┐
│  4. All API requests include token in Authorization  │
│     header: "Bearer <token>"                         │
└──────────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────┐
│  5. Supabase validates token on each request         │
└──────────────────────────────────────────────────────┘
                       ↓
┌──────────────────────────────────────────────────────┐
│  6. RLS policies use auth.uid() from token           │
└──────────────────────────────────────────────────────┘
```

## Technology Stack Details

### Frontend Stack
```
┌──────────────────────────────────────┐
│ React 18 + TypeScript                │
│ • Component-based architecture       │
│ • Type safety                        │
│ • Hooks for state management         │
└──────────────────────────────────────┘
          ↓
┌──────────────────────────────────────┐
│ Tailwind CSS v4                      │
│ • Utility-first styling              │
│ • Mobile-first responsive            │
│ • Custom theme                       │
└──────────────────────────────────────┘
          ↓
┌──────────────────────────────────────┐
│ Radix UI Components                  │
│ • Accessible primitives              │
│ • Unstyled, customizable             │
│ • WAI-ARIA compliant                 │
└──────────────────────────────────────┘
          ↓
┌──────────────────────────────────────┐
│ qrcode.react                         │
│ • QR code generation                 │
│ • SVG output                         │
│ • High error correction              │
└──────────────────────────────────────┘
          ↓
┌──────────────────────────────────────┐
│ Vite                                 │
│ • Fast dev server                    │
│ • Hot module replacement             │
│ • Optimized builds                   │
└──────────────────────────────────────┘
```

### Backend Stack
```
┌──────────────────────────────────────┐
│ Supabase                             │
│ • PostgreSQL database                │
│ • Built-in authentication            │
│ • Row Level Security                 │
│ • Real-time subscriptions            │
│ • Storage for files                  │
│ • Auto-generated REST API            │
└──────────────────────────────────────┘
```

## Environment Configuration

```
Development:
┌────────────────────────────────────┐
│ .env (gitignored)                  │
│ • VITE_SUPABASE_URL               │
│ • VITE_SUPABASE_ANON_KEY          │
│ • VITE_GOOGLE_CLIENT_ID           │
└────────────────────────────────────┘
          ↓
┌────────────────────────────────────┐
│ Vite loads env variables           │
│ Exposed as import.meta.env.*       │
└────────────────────────────────────┘
          ↓
┌────────────────────────────────────┐
│ Supabase client initialization     │
│ createClient(url, anonKey)         │
└────────────────────────────────────┘

Production:
┌────────────────────────────────────┐
│ Hosting platform env vars          │
│ (Vercel, Netlify, etc.)            │
└────────────────────────────────────┘
          ↓
┌────────────────────────────────────┐
│ Build-time replacement             │
│ Embedded in production bundle      │
└────────────────────────────────────┘
```

## Deployment Architecture

```
                    Internet
                       │
       ┌───────────────┼───────────────┐
       │               │               │
    Mobile         Desktop          Tablet
    Browser        Browser          Browser
       │               │               │
       └───────────────┼───────────────┘
                       │
                    HTTPS
                       │
       ┌───────────────┴───────────────┐
       │                               │
    Frontend CDN              Supabase Cloud
    (Vercel/Netlify)         (AWS/Database)
       │                               │
   React App                   PostgreSQL
   Static Assets              + Auth Server
   HTML/CSS/JS                + Storage
       │                               │
       └───────────────┬───────────────┘
                       │
               API Calls (REST)
               Authentication
               Database Queries
```

## State Management

```
┌─────────────────────────────────────────────┐
│          AuthContext (Global)                │
│  • user: User | null                        │
│  • session: Session | null                  │
│  • loading: boolean                         │
│  • signIn()                                 │
│  • signOut()                                │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│        MainApp (Component State)             │
│  • currentView: ViewType                    │
│  • loyaltyAccount: LoyaltyAccount | null    │
│  • selectedLocation: Location               │
│  • loadingLoyalty: boolean                  │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│    Child Components (Props)                  │
│  • Receive data from parent                 │
│  • Call callback functions                  │
│  • Local UI state only                      │
└─────────────────────────────────────────────┘
```

## Future Enhancements

```
Phase 1 (Current): ✅ Complete
├── Google Authentication
├── User Profiles
├── QR Codes
├── Loyalty Points Display
└── Rewards Catalog

Phase 2: Admin Panel
├── QR Scanner
├── Point Awarding
├── Customer Lookup
├── Transaction History
└── Reports

Phase 3: Advanced Features
├── Push Notifications
├── Email Alerts
├── Referral System
├── Birthday Rewards
└── Social Sharing

Phase 4: Integration
├── POS Integration
├── Online Ordering Integration
├── Automated Point Awards
└── Analytics Dashboard
```

## Performance Metrics

```
Target Performance:
┌─────────────────────────────┐
│ First Contentful Paint: <1s │
│ Time to Interactive: <2s    │
│ Largest Contentful Paint: <2.5s │
│ Cumulative Layout Shift: <0.1 │
└─────────────────────────────┘

Optimization Strategies:
• Code splitting with React.lazy()
• Image optimization
• Caching with service workers
• Minimize JavaScript bundle
• Efficient Supabase queries
• CDN for static assets
```

---

This architecture provides a scalable, secure, and maintainable foundation for the Cheeseburger Factory loyalty app!
