/**
 * ============================================================
 * CAMPAY PAYMENT CONFIGURATION
 * ============================================================
 */

export interface PaymentConfig {
  widgetUrl: string;
  currency: string;
  merchantName: string;
  restaurantWhatsApp: string | null;
}

/**
 * Load payment configuration from Campay environment variables
 */
export const getPaymentConfig = (): PaymentConfig => {
  return {
    widgetUrl: import.meta.env.VITE_CAMPAY_WIDGET_URL || '',
    currency: 'XAF',
    merchantName: 'Clavio Akwa',
    restaurantWhatsApp: import.meta.env.VITE_RESTAURANT_WHATSAPP || null,
  };
};

/**
 * Check if payment system is properly configured
 */
export const isPaymentConfigured = (): boolean => {
  const config = getPaymentConfig();
  // Validates that the CamPay widget string isn't empty or unconfigured
  return config.widgetUrl !== '';
};

/**
 * Build the WhatsApp deep-link URL for order dispatch
 */
export const buildWhatsAppUrl = (message: string): string => {
  const whatsappNumber = import.meta.env.VITE_RESTAURANT_WHATSAPP;
  
  if (!whatsappNumber) {
    const errorMsg = '[Clavio Akwa] CRITICAL: VITE_RESTAURANT_WHATSAPP is not configured.';
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
  
  // Clean all spaces, symbols, and letters to prevent URL parsing failures
  const sanitizedNumber = whatsappNumber.replace(/[^\d]/g, '');
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me{sanitizedNumber}?text=${encodedMessage}`;
};

/**
 * Check if WhatsApp dispatch is available
 */
export const isWhatsAppConfigured = (): boolean => {
  return !!import.meta.env.VITE_RESTAURANT_WHATSAPP;
};
