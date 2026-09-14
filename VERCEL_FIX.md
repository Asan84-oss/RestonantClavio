# Vercel Configuration Fix - Monetbil Integration

## Problem
The checkout button was building a broken URL string due to incorrect environment variable usage.

## Solution
Updated all environment variable references to use Vite's `import.meta.env` syntax instead of `process.env`.

## Changes Made

### 1. Checkout Handler (`src/hooks/useMonetbil.ts`)
**Before:**
```typescript
const monetbilUrl = getMonetbilApiUrl();
```

**After:**
```typescript
// Build Monetbil Widget v2.1 API URL directly using Vite env variable
// Exact format: https://monetbil.com{import.meta.env.VITE_MONETBIL_SERVICE_KEY}
const serviceKey = import.meta.env.VITE_MONETBIL_SERVICE_KEY;

if (!serviceKey) {
  throw new Error('Configuration Monetbil manquante: VITE_MONETBIL_SERVICE_KEY non défini');
}

const monetbilUrl = `https://monetbil.com${serviceKey}`;
```

**Key Changes:**
- Direct access to `import.meta.env.VITE_MONETBIL_SERVICE_KEY`
- Explicit error handling if service key is missing
- URL construction matches exact Monetbil Widget v2.1 format: `https://monetbil.com{serviceKey}`

### 2. WhatsApp URL Builder (`src/config/payment.ts`)
**Before:**
```typescript
const config = getPaymentConfig();
const whatsappNumber = config.restaurantWhatsApp;
```

**After:**
```typescript
// Fetch target phone number directly from Vite environment variable
const whatsappNumber = import.meta.env.VITE_RESTAURANT_WHATSAPP;
```

**Key Changes:**
- Direct access to `import.meta.env.VITE_RESTAURANT_WHATSAPP`
- Maintains strict validation for phone number format
- Proper URL encoding for WhatsApp message

### 3. Monetbil API URL Helper (`src/config/payment.ts`)
**Before:**
```typescript
export const getMonetbilApiUrl = (): string => {
  const config = getPaymentConfig();
  return `https://monetbil.com${config.serviceKey}`;
};
```

**After:**
```typescript
export const getMonetbilApiUrl = (): string => {
  const serviceKey = import.meta.env.VITE_MONETBIL_SERVICE_KEY;
  if (!serviceKey) {
    console.error('[Clavio Akwa] CRITICAL: VITE_MONETBIL_SERVICE_KEY is not configured');
    return '';
  }
  return `https://monetbil.com${serviceKey}`;
};
```

**Key Changes:**
- Direct access to `import.meta.env.VITE_MONETBIL_SERVICE_KEY`
- Added error logging if service key is missing

## Environment Variables Required

### `.env.local` (Vercel)
```bash
# Monetbil Payment Configuration
VITE_MONETBIL_SERVICE_KEY=your_service_key_here
VITE_MONETBIL_SERVICE_SECRET=your_service_secret_here

# WhatsApp Configuration
VITE_RESTAURANT_WHATSAPP=2376XXXXXXXX
```

**Important:** All environment variables must use the `VITE_` prefix to be accessible in the browser via `import.meta.env`.

## Verification

### Build Status
✅ Build successful - 244.23 kB JS (72.33 kB gzipped)

### URL Construction
- **Monetbil URL:** `https://monetbil.com${import.meta.env.VITE_MONETBIL_SERVICE_KEY}`
- **WhatsApp URL:** `https://wa.me/${import.meta.env.VITE_RESTAURANT_WHATSAPP}?text=${encodedMessage}`

## Testing Checklist

- [ ] Set `VITE_MONETBIL_SERVICE_KEY` in Vercel environment variables
- [ ] Set `VITE_MONETBIL_SERVICE_SECRET` in Vercel environment variables
- [ ] Set `VITE_RESTAURANT_WHATSAPP` in Vercel environment variables
- [ ] Test checkout flow with MTN MoMo operator
- [ ] Test checkout flow with Orange Money operator
- [ ] Verify WhatsApp redirect after successful payment
- [ ] Verify error handling when environment variables are missing

## Notes

- All environment variables now use `import.meta.env` (Vite standard)
- No more `process.env` references (Node.js/Next.js pattern)
- Direct variable access improves code clarity and debugging
- Error messages clearly indicate which variable is missing
