/**
 * ============================================================
 * MONETBIL WIDGET HOOK - CALLBACK ENGINE (v2.1 API)
 * ============================================================
 * 
 * Manages the Monetbil payment widget lifecycle:
 * 1. Initializes the widget with order data
 * 2. Listens for postMessage events from the widget iframe
 * 3. Extracts transaction_id on success
 * 4. Handles cancellation without clearing cart
 * 5. Provides loading states to prevent duplicate orders
 * 
 * MONETBIL WIDGET v2.1 API:
 * - Base URL: https://monetbil.com{service_key}
 * - Operators: CM_MTNMOBILEMONEY, CM_ORANGEMONEY
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
import type { MonetbilOperator } from '../config/payment';

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
  operator: MonetbilOperator; // Required: CM_MTNMOBILEMONEY or CM_ORANGEMONEY
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
   * Initiate payment via Monetbil Widget v2.1 API
   * URL structure: https://monetbil.com{VITE_MONETBIL_SERVICE_KEY}
   */
  const initiatePayment = useCallback(async (orderData: PaymentOrderData) => {
    try {
      setIsProcessing(true);
      setError(null);

      // Check if widget script is loaded
      if (typeof window === 'undefined') {
        throw new Error('Window not available');
      }

      // Validate operator
      if (!orderData.operator) {
        throw new Error('Opérateur de paiement non sélectionné');
      }

      // Build Monetbil Widget v2.1 API URL directly using Vite env variable
      // Exact format: https://monetbil.com{import.meta.env.VITE_MONETBIL_SERVICE_KEY}
      const serviceKey = import.meta.env.VITE_MONETBIL_SERVICE_KEY;
      
      if (!serviceKey) {
        throw new Error('Configuration Monetbil manquante: VITE_MONETBIL_SERVICE_KEY non défini');
      }
      
      const monetbilUrl = `https://monetbil.com${serviceKey}`;

      // Create payment form dynamically
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = monetbilUrl;
      form.target = '_blank'; // Open in new tab/window

      // Required Monetbil Widget v2.1 fields
      const fields: Record<string, string> = {
        // Core payment fields
        amount: orderData.amount.toString(),
        currency: orderData.currency,
        item_name: orderData.description,
        item_description: orderData.description,
        
        // Redirect URLs
        return_url: `${window.location.origin}/success`,
        cancel_url: `${window.location.origin}/cancel`,
        notify_url: `${window.location.origin}/api/payment/notify`,
        
        // Reference
        ref: orderData.reference,
        
        // Operator selection (required for Widget v2.1)
        operator: orderData.operator,
        
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
