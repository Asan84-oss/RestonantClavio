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
 * ============================================================
 */

export interface PaymentConfig {
  serviceKey: string;
  serviceSecret: string;
  environment: 'test' | 'production';
  currency: string;
  successUrl: string;
  cancelUrl: string;
  merchantName: string;
  restaurantWhatsApp: string;
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
    restaurantWhatsApp: import.meta.env.VITE_RESTAURANT_WHATSAPP || '237600000000',
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
 * Get the Monetbil widget URL based on environment
 */
export const getMonetbilUrl = (): string => {
  const config = getPaymentConfig();
  return config.environment === 'production'
    ? 'https://widget.monetbil.com'
    : 'https://test.widget.monetbil.com';
};

/**
 * Build the WhatsApp deep-link URL for order dispatch
 */
export const buildWhatsAppUrl = (message: string): string => {
  const config = getPaymentConfig();
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${config.restaurantWhatsApp}?text=${encodedMessage}`;
};
