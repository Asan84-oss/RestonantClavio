/**
 * ============================================================
 * MONETBIL WIDGET HOOK - CALLBACK ENGINE
 * ============================================================
 * 
 * Manages the Monetbil payment widget lifecycle:
 * 1. Initializes the widget with order data
 * 2. Listens for postMessage events from the widget iframe
 * 3. Extracts transaction_id on success
 * 4. Handles cancellation without clearing cart
 * 5. Provides loading states to prevent duplicate orders
 * 
 * USAGE:
 * const { initiatePayment, isProcessing, error } = useMonetbil({
 *   onSuccess: (transactionId) => { ... },
 *   onCancel: () => { ... },
 *   onError: (error) => { ... }
 * });
 * ============================================================
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getPaymentConfig } from '../config/payment';

interface MonetbilEvent {
  type: string;
  data?: {
    status?: string;
    transaction_id?: string;
    reference?: string;
    amount?: number;
    error?: string;
  };
}

interface UseMonetbilOptions {
  onSuccess?: (transactionId: string, reference: string) => void;
  onCancel?: () => void;
  onError?: (error: string) => void;
}

interface UseMonetbilReturn {
  initiatePayment: (orderData: PaymentOrderData) => Promise<void>;
  isProcessing: boolean;
  error: string | null;
  resetError: () => void;
}

interface PaymentOrderData {
  amount: number;
  currency: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  description: string;
  reference: string;
}

export function useMonetbil(options: UseMonetbilOptions = {}): UseMonetbilReturn {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const optionsRef = useRef(options);

  // Keep options ref current
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  /**
   * Handle postMessage events from Monetbil widget
   */
  const handleMessage = useCallback((event: MessageEvent) => {
    // Verify origin (Monetbil domains)
    const allowedOrigins = [
      'https://widget.monetbil.com',
      'https://test.widget.monetbil.com',
      'https://monetbil.com',
    ];

    if (!allowedOrigins.some((origin) => event.origin.startsWith(origin))) {
      return;
    }

    const message = event.data as MonetbilEvent;

    // Handle different event types
    if (message.type === 'monetbil_payment_success' || message.data?.status === 'success') {
      const transactionId = message.data?.transaction_id || message.data?.reference || '';
      setIsProcessing(false);
      optionsRef.current.onSuccess?.(transactionId, message.data?.reference || '');
    } else if (message.type === 'monetbil_payment_cancel' || message.data?.status === 'cancel') {
      setIsProcessing(false);
      optionsRef.current.onCancel?.();
    } else if (message.type === 'monetbil_payment_error' || message.data?.status === 'error') {
      const errorMessage = message.data?.error || 'Erreur de paiement';
      setError(errorMessage);
      setIsProcessing(false);
      optionsRef.current.onError?.(errorMessage);
    }
  }, []);

  // Listen for postMessage events
  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  /**
   * Initiate payment via Monetbil widget
   */
  const initiatePayment = useCallback(async (orderData: PaymentOrderData) => {
    try {
      setIsProcessing(true);
      setError(null);

      const config = getPaymentConfig();

      // Check if widget script is loaded
      if (typeof window === 'undefined') {
        throw new Error('Window not available');
      }

      // Create payment form dynamically
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://api.monetbil.com/v1/payment';
      form.target = '_blank'; // Open in new tab/window

      // Required Monetbil fields
      const fields: Record<string, string> = {
        service_key: config.serviceKey,
        amount: orderData.amount.toString(),
        currency: orderData.currency,
        item_name: orderData.description,
        item_description: orderData.description,
        return_url: `${window.location.origin}${config.successUrl}`,
        cancel_url: `${window.location.origin}${config.cancelUrl}`,
        notify_url: `${window.location.origin}/api/payment/notify`,
        ref: orderData.reference,
        // Customer info
        first_name: orderData.customerName.split(' ')[0] || orderData.customerName,
        last_name: orderData.customerName.split(' ').slice(1).join(' ') || '',
        phone: orderData.customerPhone,
        email: orderData.customerEmail || '',
      };

      // Append fields to form
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      // Submit form to Monetbil
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);

      // Note: isProcessing will be set to false by the message handler
      // or when user returns to the page

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur inconnue';
      setError(errorMessage);
      setIsProcessing(false);
      optionsRef.current.onError?.(errorMessage);
    }
  }, []);

  /**
   * Reset error state
   */
  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    initiatePayment,
    isProcessing,
    error,
    resetError,
  };
}
