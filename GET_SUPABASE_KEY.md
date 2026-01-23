# 🔑 How to Get Your Supabase Anon Key

## Quick Fix

You provided: `sb_publishable_9qCej-TImtquYuiLsbR02w_NaMLGeDj`

❌ This is **NOT** a valid Supabase anon key.

✅ Supabase anon keys look like this:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhYXhjanhjdWZzZ3VhaWFibW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2MzQ2NTg0NTIsImV4cCI6MTk1MDIzNDQ1Mn0...
```
(Much longer, starts with `eyJ`)

## Step-by-Step Instructions

### Option 1: Direct Link (Fastest)
Click this link to go directly to your API settings:
👉 https://supabase.com/dashboard/project/qaaxcjxcufsguaiabmmv/settings/api

### Option 2: Manual Navigation
1. Go to https://supabase.com/dashboard
2. Click on your project: **qaaxcjxcufsguaiabmmv**
3. Click **Settings** (gear icon) in the left sidebar
4. Click **API**
5. Look for the section **Project API keys**
6. Find the key labeled **`anon` `public`**
7. Click the **Copy** button next to it
8. Paste it into your `.env` file

## What You Should See

In the Supabase dashboard under **Project API keys**, you'll see:

```
┌─────────────────────────────────────────────────────┐
│ Project API keys                                     │
├─────────────────────────────────────────────────────┤
│                                                      │
│ anon public                                          │
│ This key is safe to use in a browser if you have    │
│ enabled Row Level Security for your tables and      │
│ configured policies.                                 │
│                                                      │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...│
│ [Copy] [Reveal]                                      │
│                                                      │
│ service_role secret                                  │
│ This key has the ability to bypass Row Level        │
│ Security. Never share it publicly.                   │
│                                                      │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...│
│ [Copy] [Reveal]                                      │
└─────────────────────────────────────────────────────┘
```

**Copy the `anon public` key** (the first one, NOT the service_role key!)

## Update Your .env File

1. Open `.env` in your project root
2. Replace the line:
   ```env
   VITE_SUPABASE_ANON_KEY=YOUR_ACTUAL_ANON_KEY_HERE
   ```
   
   With:
   ```env
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3... (your actual key)
   ```

3. Save the file

4. Restart your dev server:
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   npm run dev
   # or
   pnpm dev
   ```

## Verify It Works

After updating and restarting:

1. Open http://localhost:5173
2. You should see the **Sign in with Google** screen (not an error)
3. If you still see "Supabase Not Configured", check:
   - `.env` file is in the project root (not in `src/`)
   - Variable names start with `VITE_` (not `EXPO_PUBLIC_`)
   - No extra spaces around the `=` sign
   - The key is on one line (no line breaks)

## Common Mistakes

❌ **Wrong prefix:**
```env
EXPO_PUBLIC_SUPABASE_URL=...  # This is for Expo/React Native
REACT_APP_SUPABASE_URL=...     # This is for Create React App
```

✅ **Correct prefix for this project:**
```env
VITE_SUPABASE_URL=...          # This is for Vite
VITE_SUPABASE_ANON_KEY=...
```

❌ **Wrong key:**
```env
VITE_SUPABASE_ANON_KEY=sb_publishable_xxx  # Too short, wrong format
```

✅ **Correct key:**
```env
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # Long JWT token
```

## Still Having Issues?

### Check the .env file format:
```bash
# View your .env file:
cat .env

# Should look like this:
VITE_SUPABASE_URL=https://qaaxcjxcufsguaiabmmv.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFhYXhjanhjdWZzZ3VhaWFibW12Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2MzQ2NTg0NTIsImV4cCI6MTk1MDIzNDQ1Mn0.abc123...
```

### Check environment is loaded:
```bash
# In your browser console (after starting dev server):
console.log(import.meta.env.VITE_SUPABASE_URL);
// Should show: https://qaaxcjxcufsguaiabmmv.supabase.co

console.log(import.meta.env.VITE_SUPABASE_ANON_KEY);
// Should show: eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

### Restart is required:
Environment variables are loaded only when the dev server starts.
If you change `.env`, you MUST restart the server.

## Security Note

✅ **Safe to commit:** `.env.example`
❌ **Never commit:** `.env`

The `.env` file is already in `.gitignore`, so it won't be accidentally committed.

The `anon` key is safe to expose in your frontend code because:
- It only works with Row Level Security (RLS) enabled
- Users can only access their own data (enforced by RLS policies)
- It cannot perform admin operations

## Next Steps

Once you have the correct key:

1. ✅ App loads without "Supabase Not Configured" error
2. ✅ Sign in with Google works
3. ✅ Loyalty points display
4. ✅ QR code appears in profile

Then you're ready to test the full app! 🎉
