# Loyalty Points Tracking System - Implementation Guide

## Overview
Since your app displays the menu and links to external ordering (Abacus), you need a system to track loyalty points per customer. Here are your options:

---

## 🎯 Option 1: Manual Point Management (Simplest)

### How It Works:
1. Customer orders through Abacus link
2. Restaurant staff manually awards points through admin panel
3. Points sync automatically to customer's app

### Pros:
- ✅ Simple to implement
- ✅ Full control over point awards
- ✅ No integration needed with Abacus

### Cons:
- ❌ Manual work required
- ❌ Potential for human error
- ❌ Slower point crediting

### Implementation Steps:
1. Set up Supabase database (use SUPABASE_SCHEMA.sql)
2. Create admin web panel for staff
3. Train staff to award points after each order

---

## 🎯 Option 2: QR Code Scanning (Recommended)

### How It Works:
1. Customer shows QR code from app at checkout
2. Staff scans QR code with tablet/phone
3. Points automatically awarded based on purchase amount

### Pros:
- ✅ Quick and easy
- ✅ Automatic point calculation
- ✅ Professional experience
- ✅ Reduces errors

### Cons:
- ❌ Requires QR scanner app/device
- ❌ More development needed

### Implementation:
- Each user gets unique QR code with their user ID
- Staff scanning app adds points to that user
- Real-time sync to customer's app

---

## 🎯 Option 3: Order Reference Integration (Most Automated)

### How It Works:
1. Customer orders through Abacus with their registered email
2. You periodically export orders from Abacus
3. Script matches orders to users and awards points

### Pros:
- ✅ Fully automated
- ✅ No manual work
- ✅ Most accurate

### Cons:
- ❌ Requires Abacus API access or manual exports
- ❌ Delayed point crediting
- ❌ More complex setup

---

## 💡 Recommended Approach for You

**Start with Option 1 + QR Codes (hybrid)**

### Phase 1: Launch (Manual Management)
- Use admin panel for point management
- Award points manually based on receipts
- Get customer feedback

### Phase 2: Add QR Scanning
- Implement QR code in app
- Staff scans at checkout
- Automatic point awards

### Phase 3: Full Automation (Optional)
- Integrate with Abacus API if available
- Automatic point sync from orders

---

## 📊 Point Calculation Rules

### Standard Points:
- **1 point per $1 spent** (10% return value)
- Example: $20 order = 20 points

### Bonus Points:
- **Sign-up bonus:** 100 points
- **First order:** 50 bonus points
- **Birthday month:** 2x points
- **Referral:** 100 points each

### Tier Multipliers:
- **Bronze (0-1,999 lifetime pts):** 1x points
- **Silver (2,000-4,999 lifetime pts):** 1.2x points
- **Gold (5,000-9,999 lifetime pts):** 1.5x points
- **Platinum (10,000+ lifetime pts):** 2x points

### Redemption Values:
- **100 points** = $5 value
- **200 points** = $10 value
- Or redeem for specific items (free fries, burger, etc.)

---

## 🔧 Technical Implementation

### 1. Set Up Supabase

**Create a Supabase project:**
1. Go to https://supabase.com
2. Create new project
3. Run the SQL from `SUPABASE_SCHEMA.sql`
4. Enable Google OAuth in Authentication settings

**Get your credentials:**
- Project URL: `https://xxxxx.supabase.co`
- Anon key: `eyJhbGc...`
- Service role key: `eyJhbGc...` (for admin functions)

### 2. Configure Environment Variables

Create `.env` file:
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
```

### 3. Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### 4. Key Database Functions

The schema includes these functions you can call from your app:

**Award Points:**
```sql
SELECT add_loyalty_points(
  'user-uuid',           -- User ID
  50,                    -- Points to add
  'Purchase at Burwood', -- Description
  'ORDER-12345'          -- Optional order reference
);
```

**Redeem Points:**
```sql
SELECT redeem_loyalty_points(
  'user-uuid',           -- User ID
  100,                   -- Points to redeem
  'Free Small Fries'     -- Description
);
```

**Admin Adjust Points:**
```sql
SELECT admin_adjust_points(
  'user-uuid',           -- User ID
  -50,                   -- Points (negative to deduct)
  'Refund for order',    -- Reason
  'admin-uuid'           -- Admin who made change
);
```

---

## 📱 User Experience Flow

### Customer Journey:
1. **Sign up** → Get 100 bonus points
2. **Browse menu** → See items and prices
3. **Click "Order Now"** → Go to Abacus
4. **Complete order** → Show confirmation to staff
5. **Staff awards points** → Through admin panel or QR scan
6. **Check app** → See updated points balance
7. **Redeem rewards** → Use points for free items/discounts

### Staff Journey (Manual):
1. **Customer completes order** on Abacus
2. **Staff logs into admin panel**
3. **Search for customer** by email/phone
4. **Award points** based on order total
5. **Customer sees update** in real-time

### Staff Journey (QR Scan):
1. **Customer shows QR code** at checkout
2. **Staff scans with device**
3. **Enter order amount**
4. **Points auto-awarded** based on amount
5. **Customer gets notification**

---

## 🛠️ Admin Panel Requirements

You'll need a separate admin web app with these features:

### Admin Dashboard:
- [ ] Search customers by email/phone/name
- [ ] View customer's point balance and history
- [ ] Award points (with reason)
- [ ] Deduct points (refunds, adjustments)
- [ ] View all transactions
- [ ] Export reports (daily, weekly, monthly)
- [ ] Manage rewards catalog
- [ ] View redeemed rewards

### Security:
- Admin authentication
- Role-based access (manager vs staff)
- Audit log of all point changes
- Approval workflow for large adjustments

**Want me to create the admin panel code for you?**

---

## 📊 Reports & Analytics

### Key Metrics to Track:
1. **Total loyalty members**
2. **Active members** (ordered in last 30 days)
3. **Average points per customer**
4. **Points awarded vs redeemed**
5. **Most popular rewards**
6. **Tier distribution** (Bronze/Silver/Gold/Platinum)
7. **Redemption rate** (% of customers who redeem)
8. **Lifetime value by tier**

### Supabase Dashboard Queries:

**Total Members:**
```sql
SELECT COUNT(*) FROM loyalty_accounts;
```

**Points Awarded Today:**
```sql
SELECT SUM(points_change) 
FROM loyalty_transactions 
WHERE transaction_type = 'earned' 
AND DATE(created_at) = CURRENT_DATE;
```

**Top Customers:**
```sql
SELECT u.full_name, l.lifetime_points, l.tier
FROM loyalty_accounts l
JOIN user_profiles u ON u.id = l.user_id
ORDER BY l.lifetime_points DESC
LIMIT 10;
```

---

## 🔐 Security Considerations

### Row Level Security (RLS):
- ✅ Already configured in schema
- ✅ Users can only see their own data
- ✅ Admins have elevated permissions

### API Key Safety:
- ✅ Use anon key in mobile app (safe)
- ❌ Never expose service role key in app
- ✅ Use service role key only in admin panel backend

### Fraud Prevention:
- [ ] Set maximum points per transaction
- [ ] Flag suspicious activity (too many points)
- [ ] Require admin approval for large adjustments
- [ ] Log all admin actions
- [ ] Set daily point earning limits

---

## 🚀 Quick Start Checklist

### Initial Setup (30 minutes):
- [ ] Create Supabase project
- [ ] Run SUPABASE_SCHEMA.sql
- [ ] Enable Google OAuth
- [ ] Get API keys
- [ ] Add environment variables to app

### App Integration (2-3 hours):
- [ ] Install Supabase client
- [ ] Create Supabase service file
- [ ] Update App.tsx to fetch real loyalty data
- [ ] Add Google Sign-In
- [ ] Test with your own account

### Admin Panel (1 day):
- [ ] Create simple admin web app
- [ ] Add customer search
- [ ] Add point management UI
- [ ] Test point awarding
- [ ] Train staff

### Testing (1 day):
- [ ] Create test accounts
- [ ] Award points manually
- [ ] Test tier upgrades
- [ ] Test reward redemption
- [ ] Test across devices

---

## 💬 Common Questions

**Q: Can customers earn points retroactively?**
A: Yes! Admin can add points with past dates in description.

**Q: What if customer loses their phone?**
A: Points are tied to their Google account. Just sign in on new device.

**Q: Can customers transfer points?**
A: Not recommended for security. But you can add this feature if needed.

**Q: How do we prevent fraud?**
A: Use the security measures listed above + monitor unusual activity.

**Q: Can we change point values later?**
A: Yes! Just update the point calculation in your admin panel.

**Q: Do points expire?**
A: You can add expiration logic. Currently they don't expire.

---

## 📞 Need Help?

Would you like me to:
1. ✅ **Connect your app to Supabase** (set up authentication & data fetching)
2. ✅ **Create the admin panel** for staff to manage points
3. ✅ **Add QR code generation** for each customer
4. ✅ **Create staff scanning app** for QR codes
5. ✅ **Set up automated reports** and analytics

Let me know what you'd like to implement first!
