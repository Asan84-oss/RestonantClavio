/**
 * ============================================================
 * MONETBIL PAYMENT CONFIGURATION
 * ============================================================
 * 
 * This file manages all payment-related configuration.
 * Credentials are loaded from environment variables to prevent
 * exposing secrets in the public GitHub repository.
 * 
 * SETUP:
 * 1. Copy .env.example to .env.local
 * 2. Fill in your actual Monetbil credentials from your dashboard
 * 3. Never commit .env.local to version control
 * 
 * ENVIRONMENT VARIABLES:
 * - VITE_MONETBIL_SERVICE_KEY: Your Monetbil service identifier
 * - VITE_MONETBIL_SERVICE_SECRET: Your Monetbil secret key
 * - VITE_MONETBIL_ENVIRONMENT: 'test' or 'production'
 * - VITE_RESTAURANT_WHATSAPP: Target WhatsApp number (with country code, no +)
 * 
 * REDIRECT URLS:
 * - Success: /success (after payment completion)
 * - Cancel: /cancel (if user closes payment modal)
 * 
 * MONETBIL WIDGET v2.1 API:
 * - Base URL: https://monetbil.com{service_key}
 * - Operators: CM_MTNMOBILEMONEY, CM_ORANGEMONEY
 * ============================================================
 */

// Monetbil Operator Constants (Widget v2.1 API)
export const MONETBIL_OPERATORS = {
  MTN_MOOMO: 'CM_MTNMOBILEMONEY',
  ORANGE_MONEY: 'CM_ORANGEMONEY',
} as const;

export type MonetbilOperator = typeof MONETBIL_OPERATORS[keyof typeof MONETBIL_OPERATORS];

export interface PaymentConfig {
  serviceKey: string;
  serviceSecret: string;
  environment: 'test' | 'production';
  currency: string;
  successUrl: string;
  cancelUrl: string;
  merchantName: string;
  restaurantWhatsApp: string | null;
}

/**
 * Load payment configuration from environment variables
 * Falls back to test mode if credentials are missing
 */
export const getPaymentConfig = (): PaymentConfig => {
  const config: PaymentConfig = {
    // Service credentials from environment
    serviceKey: import.meta.env.VITE_MONETBIL_SERVICE_KEY || 'test_service_key',
    serviceSecret: import.meta.env.VITE_MONETBIL_SERVICE_SECRET || 'test_service_secret',
    
    // Environment: 'test' for sandbox, 'production' for live
    environment: (import.meta.env.VITE_MONETBIL_ENVIRONMENT as 'test' | 'production') || 'test',
    
    // Currency (XAF for Cameroon)
    currency: 'XAF',
    
    // Redirect URLs after payment
    successUrl: '/success',
    cancelUrl: '/cancel',
    
    // Merchant display name
    merchantName: 'Clavio Akwa',
    
    // Target WhatsApp number for order dispatch
    // Format: country code + number, no + or spaces (e.g., "2376XXXXXXXX")
    // Returns null if not configured (strict validation)
    restaurantWhatsApp: import.meta.env.VITE_RESTAURANT_WHATSAPP || null,
  };

  return config;
};

/**
 * Check if payment system is properly configured
 */
export const isPaymentConfigured = (): boolean => {
  const config = getPaymentConfig();
  return (
    config.serviceKey !== 'test_service_key' &&
    config.serviceSecret !== 'test_service_secret'
  );
};

/**
 * Build the Monetbil Widget v2.1 API URL
 * Format: https://api.monetbil.com/widget/v2.1/{VITE_MONETBIL_SERVICE_KEY}
 * Uses Vite environment variable directly
 */
export const getMonetbilApiUrl = (): string => {
  const serviceKey = import.meta.env.VITE_MONETBIL_SERVICE_KEY;
  if (!serviceKey) {
    console.error('[Clavio Akwa] CRITICAL: VITE_MONETBIL_SERVICE_KEY is not configured');
    return '';
  }
  return `https://api.monetbil.com/widget/v2.1/${serviceKey}`;
};

/**
 * Build the WhatsApp deep-link URL for order dispatch
 * Uses import.meta.env.VITE_RESTAURANT_WHATSAPP directly
 * Includes strict validation for the WhatsApp number
 * 
 * @throws Error if WhatsApp number is not configured
 */
export const buildWhatsAppUrl = (message: string): string => {
  // Fetch target phone number directly from Vite environment variable
  const whatsappNumber = import.meta.env.VITE_RESTAURANT_WHATSAPP;
  
  // Strict validation: throw error if WhatsApp number is not configured
  if (!whatsappNumber) {
    const errorMsg = '[Clavio Akwa] CRITICAL: VITE_RESTAURANT_WHATSAPP environment variable is not configured. WhatsApp dispatch disabled. Please set this variable in your .env.local file.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  
  // Validate phone number format (should be digits only with country code)
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(whatsappNumber)) {
    const errorMsg = `[Clavio Akwa] CRITICAL: VITE_RESTAURANT_WHATSAPP value "${whatsappNumber}" is invalid. Expected format: digits only with country code (e.g., "2376XXXXXXXX").`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  
  // Properly encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
};

/**
 * Check if WhatsApp dispatch is available
 * Uses import.meta.env.VITE_RESTAURANT_WHATSAPP directly
 */
export const isWhatsAppConfigured = (): boolean => {
  return !!import.meta.env.VITE_RESTAURANT_WHATSAPP;
};
