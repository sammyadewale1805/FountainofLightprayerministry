# Button Debug Guide 🔍

## Current Issue
Button is showing differently than expected. Let's identify exactly which button is being rendered and why.

## Debug Process

### Step 1: Open Browser Console
1. Go to your giving page: `http://localhost:8080/giving`
2. Open Developer Tools (F12) → Console tab
3. Fill out the payment form
4. Look for these specific logs:

### Step 2: Check Decision Variables
Look for: `🔍 BUTTON DECISION DEBUG:`

This will show:
```javascript
{
  'Paystack Key': 'pk_test_944a1b...' or 'NOT SET',
  'Mode': 'development',
  'isDevelopmentMock': true/false,
  'validationErrors': [...],
  'isConfigured': true/false, 
  'isReady': true/false,
  'isInitializing': true/false,
  'paymentData': { email, amount, purpose }
}
```

### Step 3: Identify Button Type
Look for one of these messages:

#### 🟠 Mock Button (Orange)
```
✅ FINAL: Rendering MOCK payment button (Orange)
Button text will be: Mock Pay ₦50,000 (Dev Mode)
```

#### 🔴 Disabled Button (Gray)  
```
✅ FINAL: Rendering DISABLED button (Gray)
Button text will be: Paystack not configured
```

#### 🟢 Initialization Button (Green)
```
✅ FINAL: Rendering INITIALIZATION button (Green)  
Button text will be: Continue to Payment (₦50,000)
```

#### 🟢 Actual Paystack Button (Green)
```
✅ FINAL: Rendering ACTUAL PAYSTACK button (Green)
Button text will be: Click to Pay ₦50,000
```

## Button Decision Tree

```
Is Paystack configured correctly?
├─ NO → Is in development mode?
│  ├─ YES → 🟠 MOCK BUTTON
│  └─ NO → 🔴 DISABLED BUTTON
└─ YES → Is payment initialized?
   ├─ NO → 🟢 INITIALIZATION BUTTON  
   └─ YES → 🟢 ACTUAL PAYSTACK BUTTON
```

## Common Issues & Solutions

### Issue 1: Seeing Mock Button Instead of Real Button
**Console shows:** `isDevelopmentMock: true`

**Cause:** Invalid or missing Paystack public key
**Solution:** Check `.env` file - ensure `VITE_PAYSTACK_PUBLIC_KEY` starts with `pk_test_`

### Issue 2: Seeing Disabled Button
**Console shows:** `validationErrors: [...]`

**Possible causes:**
- Missing email address
- Invalid amount (< ₦50)  
- Missing payment purpose
- Invalid Paystack public key

### Issue 3: Button Not Changing Text
**Console shows:** Multiple button renders with same type

**Cause:** State not updating correctly
**Solution:** Check if payment initialization is working

### Issue 4: Wrong Button Text
**Console shows:** Button text differs from actual display

**Cause:** Caching or component re-render issues
**Solution:** Hard refresh (Cmd/Ctrl + Shift + R)

## Expected Flow

### First Load:
1. `🔍 BUTTON DECISION DEBUG` → Shows configuration
2. `✅ FINAL: Rendering [BUTTON_TYPE]` → Shows which button
3. Button appears with correct text

### After First Click (if initialization button):  
1. `🔴 CLICK - State` → Shows click accepted
2. `🚀 INITIALIZE DEBUG` → Shows backend call
3. `✅ FINAL: Rendering ACTUAL PAYSTACK button` → New button appears

## Debug Commands

Restart dev server:
```bash
npm run dev
```

Check environment variables:
```bash
cat .env | grep PAYSTACK
```

Clear browser cache:
- Chrome: Settings → Privacy → Clear browsing data
- Or use incognito/private window

## Report Back With:
1. **Button color you see:** Orange/Gray/Green
2. **Button text you see:** Exact text shown
3. **Console debug output:** Copy the `🔍 BUTTON DECISION DEBUG` and `✅ FINAL:` messages

This will tell us exactly what's happening! 🎯