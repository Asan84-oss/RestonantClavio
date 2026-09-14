/**
 * ============================================================
 * ORDER PROCESSOR - BUSINESS AUTOMATION LAYER
 * ============================================================
 * 
 * Handles the complete order lifecycle:
 * 1. Compiles reservation data + cart items into unified order
 * 2. Validates all required fields (no empty submissions)
 * 3. Formats WhatsApp receipt message
 * 4. Dispatches to restaurant WhatsApp via deep-link
 * 
 * USAGE:
 * import { compileOrder, validateOrder, dispatchToWhatsApp } from '../utils/orderProcessor';
 * ============================================================
 */

import type { CartItem } from '../context/CartContext';
import { buildWhatsAppUrl } from '../config/payment';

export interface ReservationData {
  name: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  guests: string;
  occasion?: string;
  notes?: string;
}

export interface CompiledOrder {
  reference: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  reservation: {
    date: string;
    time: string;
    guests: string;
    occasion?: string;
    notes?: string;
  };
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    price: string;
    priceNumeric: number;
    subtotal: number;
  }>;
  total: number;
  currency: string;
  transactionId?: string;
  timestamp: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Parse price string to numeric value
 * Handles formats like "7 500 XAF", "7,500 XAF", "7500"
 */
export const parsePrice = (priceString: string): number => {
  const numericString = priceString.replace(/[^\d]/g, '');
  return parseInt(numericString, 10) || 0;
};

/**
 * Generate unique order reference
 */
const generateReference = (): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `CLAVIO-${timestamp}-${random}`;
};

/**
 * Compile reservation data + cart items into unified order object
 */
export const compileOrder = (
  reservation: ReservationData,
  cartItems: CartItem[],
  transactionId?: string
): CompiledOrder => {
  const items = cartItems.map((item) => {
    const priceNumeric = parsePrice(item.price);
    return {
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      priceNumeric,
      subtotal: priceNumeric * item.quantity,
    };
  });

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  return {
    reference: generateReference(),
    customer: {
      name: reservation.name,
      phone: reservation.phone,
      email: reservation.email,
    },
    reservation: {
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests,
      occasion: reservation.occasion,
      notes: reservation.notes,
    },
    items,
    total,
    currency: 'XAF',
    transactionId,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Validate order data - prevents empty submissions and zero-value checkouts
 */
export const validateOrder = (
  reservation: ReservationData,
  cartItems: CartItem[]
): ValidationResult => {
  const errors: string[] = [];

  // Validate reservation fields
  if (!reservation.name || reservation.name.trim().length < 2) {
    errors.push('Le nom du client est requis');
  }

  if (!reservation.phone || reservation.phone.trim().length < 8) {
    errors.push('Le numéro de téléphone est requis');
  }

  if (!reservation.date) {
    errors.push('La date de réservation est requise');
  }

  if (!reservation.time) {
    errors.push("L'heure d'arrivée est requise");
  }

  if (!reservation.guests || parseInt(reservation.guests) < 1) {
    errors.push('Le nombre de personnes doit être au moins 1');
  }

  // Validate cart items
  if (!cartItems || cartItems.length === 0) {
    errors.push('Votre panier est vide. Ajoutez au moins un article.');
  }

  // Validate total > 0
  const total = cartItems.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.quantity;
  }, 0);

  if (total <= 0) {
    errors.push('Le montant total doit être supérieur à 0 XAF');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Format order into WhatsApp receipt message
 */
export const formatWhatsAppMessage = (order: CompiledOrder): string => {
  const lines: string[] = [];

  // Header
  lines.push('🎉 Nouvelle Réservation Confirmée - Clavio Akwa 🎉');
  lines.push('');

  // Customer info
  lines.push(`👤 Client: ${order.customer.name}`);
  lines.push(`📞 Contact: ${order.customer.phone}`);
  if (order.customer.email) {
    lines.push(`📧 Email: ${order.customer.email}`);
  }
  lines.push('');

  // Reservation details
  lines.push(`📅 Date/Heure: ${order.reservation.date} à ${order.reservation.time}`);
  lines.push(`👥 Personnes: ${order.reservation.guests}`);
  if (order.reservation.occasion) {
    lines.push(`🎊 Occasion: ${order.reservation.occasion}`);
  }
  lines.push('');

  // Order items
  lines.push('🛒 Commande:');
  order.items.forEach((item) => {
    lines.push(`• ${item.quantity} x ${item.name} (${item.priceNumeric.toLocaleString()} XAF)`);
  });
  lines.push('');

  // Total
  lines.push(`💰 Total Payé: ${order.total.toLocaleString()} XAF`);

  // Transaction ID
  if (order.transactionId) {
    lines.push(`🔑 Réf Paiement: ${order.transactionId}`);
  }

  // Reference
  lines.push(`📋 Réf Commande: ${order.reference}`);
  lines.push('');

  // Footer
  lines.push('---');
  lines.push('Merci de votre confiance ! À très bientôt au Clavio Akwa 🍽️');

  return lines.join('\n');
};

/**
 * Dispatch order to WhatsApp via deep-link
 * Opens WhatsApp with pre-filled message
 * 
 * @throws Error if WhatsApp number is not configured
 */
export const dispatchToWhatsApp = (order: CompiledOrder): void => {
  const message = formatWhatsAppMessage(order);
  
  // buildWhatsAppUrl will throw if not configured
  const whatsappUrl = buildWhatsAppUrl(message);
  
  // Open WhatsApp in new tab (preserves current page for receipt)
  window.open(whatsappUrl, '_blank');
};

/**
 * Store order in sessionStorage for success page retrieval
 */
export const storeOrderForSuccessPage = (order: CompiledOrder): void => {
  try {
    sessionStorage.setItem('lastOrder', JSON.stringify(order));
  } catch (error) {
    console.error('Failed to store order in sessionStorage:', error);
  }
};

/**
 * Retrieve stored order from sessionStorage
 */
export const retrieveStoredOrder = (): CompiledOrder | null => {
  try {
    const stored = sessionStorage.getItem('lastOrder');
    if (stored) {
      return JSON.parse(stored);
    }
    return null;
  } catch (error) {
    console.error('Failed to retrieve order from sessionStorage:', error);
    return null;
  }
};

/**
 * Clear stored order from sessionStorage
 */
export const clearStoredOrder = (): void => {
  try {
    sessionStorage.removeItem('lastOrder');
  } catch (error) {
    console.error('Failed to clear order from sessionStorage:', error);
  }
};
