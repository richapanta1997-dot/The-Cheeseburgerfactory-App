# 🚀 Deployment Checklist - Supabase Integration Complete

Use this checklist to verify your Supabase + QR Code implementation is ready for production.

## ✅ Pre-Deployment Checklist

### 1. Supabase Setup
- [ ] Supabase account created
- [ ] Project created in Supabase
- [ ] Database schema executed (`SUPABASE_SCHEMA.sql`)
- [ ] All tables created successfully
- [ ] Sample rewards added to `rewards` table
- [ ] Row Level Security (RLS) enabled on all tables
- [ ] Database indexes created

**Verify**: Go to Supabase → Table Editor → Check all tables exist

### 2. Authentication Configuration
- [ ] Google OAuth configured in Google Cloud Console
- [ ] OAuth Client ID and Secret created
- [ ] Redirect URI added: `https://YOUR_PROJECT.supabase.co/auth/v1/callback`
- [ ] Google provider enabled in Supabase Authentication
- [ ] Client ID and Secret added to Supabase
- [ ] OAuth consent screen configured
- [ ] Test domains added to authorized domains

**Verify**: Test sign-in flow in development

### 3. Environment Variables
- [ ] `.env` file created (not committed to git)
- [ ] `VITE_SUPABASE_URL` set correctly
- [ ] `VITE_SUPABASE_ANON_KEY` set correctly
- [ ] `VITE_GOOGLE_CLIENT_ID` set (optional, if using backup)
- [ ] `.env.example` updated with new variables
- [ ] `.gitignore` includes `.env`

**Verify**: Run `cat .env` and check values

### 4. Code Integration
- [ ] AuthContext provider wrapped around app
- [ ] Supabase client initialized
- [ ] Auth state management working
- [ ] QR code generation implemented
- [ ] Loyalty points fetching from database
- [ ] Rewards loading from database
- [ ] Sign in/out functionality working
- [ ] Protected routes implemented
- [ ] Error handling in place
- [ ] Loading states implemented

**Verify**: Test entire user flow

### 5. Testing

#### Authentication Flow
- [ ] User can click "Sign in with Google"
- [ ] Google OAuth popup appears
- [ ] User can select Google account
- [ ] Redirect back to app after auth
- [ ] User profile loads correctly
- [ ] Loyalty account auto-created (0 points, Bronze)
- [ ] User can sign out
- [ ] Session persists on page reload

#### QR Code Functionality
- [ ] QR code displays in profile
- [ ] QR code contains correct JSON structure
- [ ] QR code scannable with phone camera
- [ ] userId extracted correctly from scan
- [ ] Customer ID displayed below QR code
- [ ] QR code has sufficient size (200x200px)
- [ ] Error correction level is High

#### Loyalty System
- [ ] Points display (0 for new users)
- [ ] Tier badge shows correct tier
- [ ] Progress bar displays correctly
- [ ] Rewards load from database
- [ ] Rewards show point requirements
- [ ] Redeem button enabled/disabled correctly
- [ ] "How to Earn Points" section shows

#### Database Operations
- [ ] User profile created on signup
- [ ] Loyalty account created automatically
- [ ] Transactions table ready for entries
- [ ] Rewards visible in app
- [ ] RLS policies prevent unauthorized access

**Testing Tools**:
- QR Decoder: https://zxing.org/w/decode
- Supabase Table Editor
- Browser DevTools Console

### 6. Performance
- [ ] Initial load time < 2 seconds
- [ ] Time to Interactive < 3 seconds
- [ ] No console errors
- [ ] No console warnings (or documented)
- [ ] Images optimized
- [ ] Bundle size optimized
- [ ] Lighthouse score > 90

### 7. Mobile Optimization
- [ ] App responsive on mobile
- [ ] Bottom navigation accessible
- [ ] QR code visible without zooming
- [ ] Buttons touch-friendly (44x44px minimum)
- [ ] Text readable without zooming
- [ ] No horizontal scrolling

### 8. Documentation
- [ ] README.md updated
- [ ] Setup guides complete
- [ ] API documentation (if applicable)
- [ ] Environment variables documented
- [ ] Troubleshooting guide available
- [ ] Admin panel guide ready

### 9. Security
- [ ] Environment variables not in source control
- [ ] API keys secured
- [ ] RLS policies tested
- [ ] HTTPS enforced
- [ ] OAuth redirect URIs restricted
- [ ] CORS configured correctly
- [ ] No sensitive data in QR codes

### 10. Production Environment Setup
- [ ] Production Supabase project created (or use same)
- [ ] Production environment variables set
- [ ] OAuth redirect URI updated for production domain
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active
- [ ] Email confirmations enabled (optional)
- [ ] Rate limiting configured
- [ ] Backup strategy in place

## 🚀 Deployment Steps

### Step 1: Build Application
```bash
# Test production build locally
pnpm build
pnpm preview

# Verify no errors
# Test critical flows
```

### Step 2: Deploy to Hosting Platform

#### Option A: Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Deploy to production
vercel --prod
```

#### Option B: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
pnpm build

# Deploy
netlify deploy --prod --dir=dist

# Set environment variables in Netlify dashboard
```

#### Option C: Other Hosting
1. Build: `pnpm build`
2. Upload `dist/` folder
3. Set environment variables in platform
4. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`
   - Node version: 18 or higher

### Step 3: Post-Deployment

#### Verify Deployment
- [ ] Production URL accessible
- [ ] HTTPS working
- [ ] Sign in with Google works
- [ ] QR code generates
- [ ] Points display correctly
- [ ] All features functional

#### Update OAuth
- [ ] Add production domain to Google Console
- [ ] Update redirect URI in Supabase
- [ ] Test OAuth flow in production
- [ ] Remove test domains from authorized domains

#### Monitor
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Configure analytics (Google Analytics, Mixpanel)
- [ ] Set up uptime monitoring
- [ ] Enable Supabase logging
- [ ] Create dashboard for key metrics

### Step 4: Train Staff
- [ ] Show staff how customers get QR codes
- [ ] Explain point calculation (10 per $1)
- [ ] Demonstrate QR scanning (when admin panel ready)
- [ ] Provide troubleshooting guide
- [ ] Create quick reference card

## 📊 Launch Checklist

### Soft Launch (Beta)
- [ ] Invite 10-20 test customers
- [ ] Monitor for issues
- [ ] Collect feedback
- [ ] Fix critical bugs
- [ ] Adjust rewards if needed
- [ ] Test at peak times

### Public Launch
- [ ] Announce on social media
- [ ] Email existing customers
- [ ] In-store signage
- [ ] Staff training complete
- [ ] Support channels ready
- [ ] Monitor closely for first week

## 🔍 Post-Launch Monitoring

### Daily (First Week)
- [ ] Check Supabase logs
- [ ] Monitor sign-up rate
- [ ] Check for errors in Sentry
- [ ] Review customer feedback
- [ ] Verify QR scanning working (when available)

### Weekly
- [ ] Review analytics
- [ ] Check reward redemption rates
- [ ] Monitor tier progression
- [ ] Review transaction logs
- [ ] Optimize based on data

### Monthly
- [ ] Review reward effectiveness
- [ ] Adjust point thresholds if needed
- [ ] Add new rewards based on demand
- [ ] Performance optimization
- [ ] Security audit

## 🐛 Troubleshooting Common Issues

### Issue: "Supabase Not Configured"
**Solution**:
1. Check `.env` file exists
2. Verify environment variables set
3. Restart dev server
4. Check build logs for variable loading

### Issue: Google Sign-In Fails
**Solution**:
1. Verify OAuth redirect URI matches
2. Check Google Console credentials
3. Ensure Google provider enabled in Supabase
4. Clear browser cache and try again

### Issue: QR Code Not Displaying
**Solution**:
1. Check user is authenticated
2. Verify `qrcode.react` installed
3. Check browser console for errors
4. Test with different browser

### Issue: Loyalty Account Not Created
**Solution**:
1. Check database trigger exists
2. Run schema again if needed
3. Manually create account in Table Editor
4. Check Supabase logs for errors

### Issue: Points Not Updating
**Solution**:
1. Implement admin panel to award points
2. Manually update via SQL:
   ```sql
   SELECT add_loyalty_points(
     'user-id-here',
     100,
     'Test points'
   );
   ```
3. Check RLS policies not blocking

## 📈 Success Metrics

Track these KPIs:

### User Engagement
- Daily Active Users (DAU)
- Sign-up rate
- QR code usage
- App opens per user

### Loyalty Program
- Points awarded per day
- Rewards redeemed per week
- Average points per user
- Tier distribution
- Time to first reward

### Technical
- App load time
- Error rate
- API response time
- Uptime percentage

### Business
- Increased order frequency
- Average order value
- Customer retention rate
- Referral rate

## 🎯 Next Steps After Launch

1. **Week 1**: Monitor closely, fix critical bugs
2. **Week 2**: Build admin panel (see `LOYALTY_TRACKING_GUIDE.md`)
3. **Week 3**: Implement QR scanning for staff
4. **Month 1**: Review analytics, optimize rewards
5. **Month 2**: Add push notifications
6. **Month 3**: Launch referral program

## 📞 Support Contacts

### Technical Issues
- Supabase Support: support@supabase.io
- Hosting Support: (Your hosting provider)

### Documentation
- Supabase Docs: https://supabase.com/docs
- Project Docs: See README.md

### Internal
- Dev Team: (Your contact)
- Admin Training: (Your contact)

## ✅ Final Pre-Launch Checklist

**Critical (Must Have)**
- [x] Supabase integrated
- [x] Authentication working
- [x] QR codes generating
- [x] Points displaying
- [x] Database schema deployed
- [x] Environment variables set
- [x] Security policies active

**Important (Should Have)**
- [ ] Admin panel (in progress)
- [ ] Error monitoring
- [ ] Analytics tracking
- [ ] Staff training
- [ ] Support documentation

**Nice to Have (Can Wait)**
- [ ] Push notifications
- [ ] Email receipts
- [ ] Advanced analytics
- [ ] Social sharing

---

## 🎉 You're Ready!

If all critical items are checked, you're ready to launch the customer-facing app!

**Status**: Customer app ✅ Complete | Admin panel ⏳ Next Phase

**What customers can do now**:
- ✅ Sign up with Google
- ✅ Get loyalty account
- ✅ View their QR code
- ✅ See available rewards
- ✅ Track points (once awarded)

**What staff need next**:
- ⏳ Admin panel to scan QR codes
- ⏳ Interface to award points
- See `LOYALTY_TRACKING_GUIDE.md` for options

---

**Congratulations on completing the Supabase integration!** 🎊

The foundation is solid. Now focus on the admin panel to complete the points awarding workflow.
