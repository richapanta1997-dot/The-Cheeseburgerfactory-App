# QR Code System Reference

## Overview

Each customer who signs up gets a unique QR code displayed in their profile. This QR code encodes their user information and can be scanned by staff to award loyalty points after a purchase.

## QR Code Contents

The QR code contains a JSON object with the following structure:

```json
{
  "userId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "customer@example.com",
  "type": "loyalty",
  "timestamp": 1706025600000
}
```

### Fields:
- **userId**: Unique identifier for the customer (UUID from Supabase auth)
- **email**: Customer's email address
- **type**: Always "loyalty" (for future expansion)
- **timestamp**: Unix timestamp when QR code was generated

## Where to Find QR Code

### In the App:
1. Customer opens the Cheeseburger Factory app
2. Signs in with Google
3. Navigates to **Profile** tab (bottom navigation, user icon)
4. Scrolls down to "Your Loyalty QR Code" card
5. QR code is displayed prominently

### QR Code Specifications:
- **Size**: 200x200 pixels
- **Error Correction**: High (Level H - 30% recovery)
- **Format**: SVG (scalable, high quality)
- **Border**: 24px white border for scanning reliability

## Customer Usage Flow

```
1. Customer places order at counter or online
   ↓
2. Staff asks for loyalty QR code
   ↓
3. Customer opens app → Profile → Shows QR code
   ↓
4. Staff scans QR code
   ↓
5. System identifies customer by userId
   ↓
6. Staff enters order total
   ↓
7. Points are calculated (10 points per $1)
   ↓
8. Points are added to customer's account
   ↓
9. Customer sees updated points in app
```

## Implementation Details

### Frontend (Customer App)

Location: `/src/app/components/profile-view.tsx`

```tsx
import { QRCodeSVG } from 'qrcode.react';

<QRCodeSVG
  value={JSON.stringify({
    userId: user.id,
    email: user.email,
    type: 'loyalty',
    timestamp: Date.now(),
  })}
  size={200}
  level="H"
  includeMargin={false}
/>
```

### Backend (Admin Panel - To Be Built)

When scanning the QR code, you'll receive the JSON string. Parse it and use the `userId` to award points:

```typescript
// Example admin panel code
const scannedData = JSON.parse(qrCodeValue);
const userId = scannedData.userId;
const orderTotal = 25.50; // From POS or manual entry
const pointsToAward = Math.floor(orderTotal * 10); // 255 points

// Call Supabase function to add points
await supabase.rpc('add_loyalty_points', {
  p_user_id: userId,
  p_points: pointsToAward,
  p_description: `Purchase - $${orderTotal}`,
  p_order_reference: 'ORDER-12345'
});
```

## Staff Scanning Options

### Option 1: Web-Based Admin Panel (Recommended)
- Build a simple web app for staff
- Uses device camera to scan QR codes
- Directly integrates with Supabase
- See `LOYALTY_TRACKING_GUIDE.md` for full implementation

### Option 2: Mobile App Scanner
- Use a generic QR scanner app
- Copy the userId from scanned result
- Manually enter in admin web interface

### Option 3: Integrated POS System
- Integrate QR scanning into existing POS
- Automatic point calculation
- Requires API integration (see `LOYALTY_TRACKING_GUIDE.md`)

## Security Considerations

✅ **QR Code is not a secret**: Anyone can scan it  
✅ **Admin auth required**: Only authenticated staff can award points  
✅ **Timestamp included**: Can validate QR code freshness (optional)  
✅ **User cannot manipulate**: Points only added by admin  
✅ **Audit trail**: All transactions logged in `loyalty_transactions` table

## Testing QR Codes

### Desktop Testing:
1. Open app in browser
2. Sign in and go to Profile
3. Take screenshot of QR code
4. Use online QR decoder: https://zxing.org/w/decode
5. Verify JSON output matches expected format

### Mobile Testing:
1. Open app on mobile device
2. Use another phone's camera app to scan
3. Verify decoded data is correct JSON

### Admin Panel Testing:
1. Build simple test page with camera access
2. Use `html5-qrcode` library to scan
3. Display decoded userId
4. Verify it matches the customer's ID

## Database Tables Involved

### loyalty_accounts
```sql
SELECT * FROM loyalty_accounts WHERE user_id = '<scanned-userId>';
```
Returns current points, tier, lifetime points

### loyalty_transactions
```sql
INSERT INTO loyalty_transactions (user_id, points_change, transaction_type, description)
VALUES ('<scanned-userId>', 255, 'earned', 'Purchase - $25.50');
```
Records the point transaction

### Using the Helper Function
```sql
-- Easier way: Use the provided function
SELECT add_loyalty_points(
  '<scanned-userId>',
  255,
  'Purchase - $25.50',
  'ORDER-12345'
);
```

## QR Code Library

The app uses **qrcode.react** for QR code generation:

```bash
# Already installed in package.json
npm install qrcode.react
# or
pnpm install qrcode.react
```

Documentation: https://www.npmjs.com/package/qrcode.react

## Alternative: Barcode Format

If you prefer linear barcodes over QR codes, you can use:

```tsx
import Barcode from 'react-barcode';

<Barcode 
  value={user.id} 
  format="CODE128"
  width={2}
  height={80}
/>
```

Install with: `npm install react-barcode`

## Troubleshooting

### QR Code Not Displaying
- Check that user is logged in
- Verify `qrcode.react` is installed
- Check browser console for errors

### QR Code Not Scanning
- Increase QR code size
- Ensure good lighting
- Clean camera lens
- Try different QR scanner app

### Invalid Data After Scan
- Verify JSON format in code
- Check for special characters in email
- Test with online QR decoder first

## Example QR Code Data

```json
{
  "userId": "a3bb189e-8bf9-3888-9912-ace4e6543002",
  "email": "john.doe@gmail.com",
  "type": "loyalty",
  "timestamp": 1706025600000
}
```

This translates to:
- **Customer**: John Doe
- **User ID**: a3bb189e-8bf9-3888-9912-ace4e6543002
- **Generated**: January 23, 2024

## Next Steps

1. ✅ QR codes are now generated for all users
2. ⬜ Build admin panel to scan QR codes (see `LOYALTY_TRACKING_GUIDE.md`)
3. ⬜ Train staff on scanning process
4. ⬜ Test end-to-end flow
5. ⬜ Monitor `loyalty_transactions` table for accuracy

## Support

For questions about:
- **QR Code Generation**: Check `/src/app/components/profile-view.tsx`
- **Admin Scanning**: See `LOYALTY_TRACKING_GUIDE.md`
- **Database Functions**: See `SUPABASE_SCHEMA.sql`
