# Paystack Setup Instructions

## The Issue
Your Paystack integration is failing with a "400 Bad Request" error because the public key in your `.env` file is invalid.

## Root Cause
The error message from Paystack API is: "Please enter a valid Key"
Both test keys in your project are not actual valid Paystack keys.

## Solution Steps

### 1. Get a Real Paystack Account (Recommended)
1. Go to https://paystack.com/
2. Sign up for a free account
3. Verify your account (may require business verification for live keys)
4. Go to Settings > API Keys & Webhooks
5. Copy your **Test Public Key** (starts with `pk_test_`)
6. Update your `.env` file:
   ```
   VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_actual_key_here
   ```

### 2. Alternative: Use Mock Implementation (Temporary)
If you can't get a real Paystack account right now, you can use the mock backend:

1. Update `src/components/PaystackButton.tsx` to always use mock payment
2. The backend at `http://localhost:5000` already returns mock success responses

### 3. Test the Fix
1. Restart your development server: `npm run dev`
2. Go to `/debug-paystack` route to test the configuration
3. Try making a test payment

## Current Status
- ❌ Invalid Paystack public key
- ✅ Backend API working (mock responses)
- ✅ Environment variables loading correctly
- ✅ Payment validation logic working
- ✅ React-Paystack library properly installed

## Quick Fix for Development
If you just want to test the UI without real payments, you can temporarily disable Paystack validation by setting a flag in the PaystackButton component.

## Files Modified
- `.env` - Updated public key
- `src/lib/payments.ts` - Fixed configuration
- `src/components/PaystackButton.tsx` - Added better error handling
- `src/components/PaystackDebug.tsx` - Created debug tool

## Next Steps
1. Get a valid Paystack test key from https://paystack.com/
2. Replace the key in `.env`
3. Restart the dev server
4. Test at `http://localhost:8080/debug-paystack`