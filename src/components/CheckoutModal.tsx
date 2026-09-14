/**
 * ============================================================
 * CHECKOUT MODAL - MONETBIL PAYMENT + WHATSAPP DISPATCH
 * ============================================================
 * 
 * Complete checkout flow with business automation:
 * 1. Displays cart summary + reservation info
 * 2. Validates all required fields (no empty/zero submissions)
 * 3. Triggers Monetbil payment widget
 * 4. Listens for success/fail callbacks
 * 5. On success: compiles order, dispatches to WhatsApp
 * 6. On cancel: preserves cart, returns user to modal
 * 
 * PAYMENT FLOW:
 * - User fills reservation form (stored in CartContext)
 * - User adds items to cart
 * - User clicks "Commander" → modal opens
 * - User clicks "Payer" → Monetbil widget opens
 * - On success → WhatsApp auto-dispatch + redirect to /success
 * - On cancel → cart preserved, user returns to modal
 * ============================================================
 */

import { useState, useEffect } from 'react';
import { X, ShoppingCart, CreditCard, Phone, User, Loader2, Shield, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useMonetbil } from '../hooks/useMonetbil';
import { isPaymentConfigured } from '../config/payment';
import {
  compileOrder,
  validateOrder,
  dispatchToWhatsApp,
  storeOrderForSuccessPage,
} from '../utils/orderProcessor';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, reservation, clearCart, closeCheckout } = useCart();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [orderCompiled, setOrderCompiled] = useState(false);

  // Monetbil payment hook
  const { initiatePayment, isProcessing, error: paymentError, resetError } = useMonetbil({
    onSuccess: (transactionId, reference) => {
      // Compile final order with transaction ID
      const order = compileOrder(reservation, items, transactionId);
      
      // Store for success page
      storeOrderForSuccessPage(order);
      
      // Dispatch to WhatsApp (Option A)
      dispatchToWhatsApp(order);
      
      // Clear cart after successful payment
      clearCart();
      
      // Mark as compiled and redirect to success page
      setOrderCompiled(true);
      
      // Redirect to success page after brief delay
      setTimeout(() => {
        window.location.href = `/success?ref=${order.reference}&tx=${transactionId}`;
      }, 1500);
    },
    onCancel: () => {
      // Cart is preserved - user can retry
      console.log('Payment cancelled - cart preserved');
    },
    onError: (error) => {
      console.error('Payment error:', error);
      setValidationErrors([error]);
    },
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Clear validation errors when modal opens
  useEffect(() => {
    if (isOpen) {
      setValidationErrors([]);
      setOrderCompiled(false);
      resetError();
    }
  }, [isOpen, resetError]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate order
    const validation = validateOrder(reservation, items);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    // Check payment configuration
    if (!isPaymentConfigured()) {
      setValidationErrors(['Configuration de paiement manquante. Veuillez contacter le support.']);
      return;
    }

    // Clear previous errors
    setValidationErrors([]);

    // Compile order (without transaction ID yet)
    const order = compileOrder(reservation, items);

    // Initiate Monetbil payment
    await initiatePayment({
      amount: order.total,
      currency: order.currency,
      customerName: order.customer.name,
      customerPhone: order.customer.phone,
      customerEmail: order.customer.email,
      description: `Commande Clavio Akwa - ${items.length} article(s) - ${order.reference}`,
      reference: order.reference,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-primary/95 backdrop-blur-sm"
        onClick={!isProcessing ? onClose : undefined}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto gradient-card border border-border rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-bg-card border-b border-border p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-text-primary font-semibold text-lg">Finaliser la Commande</h2>
              <p className="text-text-secondary text-xs">Paiement sécurisé par Mobile Money</p>
            </div>
          </div>
          {!isProcessing && (
            <button
              onClick={onClose}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content */}
        <form onSubmit={handlePayment} className="p-6 space-y-6">
          {/* Validation Errors */}
          {validationErrors.length > 0 && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-500 font-semibold text-sm mb-1">Erreur de validation</p>
                  <ul className="space-y-1">
                    {validationErrors.map((error, i) => (
                      <li key={i} className="text-red-400 text-xs">{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Payment Error */}
          {paymentError && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-500 font-semibold text-sm">Erreur de paiement</p>
                  <p className="text-red-400 text-xs mt-1">{paymentError}</p>
                </div>
              </div>
            </div>
          )}

          {/* Order Success State */}
          {orderCompiled && (
            <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
              <Loader2 className="w-8 h-8 text-green-500 animate-spin mx-auto mb-3" />
              <p className="text-green-500 font-semibold">Paiement réussi !</p>
              <p className="text-text-secondary text-sm mt-2">
                Redirection vers la page de confirmation...
              </p>
              <p className="text-text-muted text-xs mt-2">
                WhatsApp s'ouvre automatiquement pour confirmer votre commande
              </p>
            </div>
          )}

          {/* Reservation Summary */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-accent" />
              Réservation
            </h3>
            <div className="p-4 bg-bg-primary rounded-lg border border-border/50 space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary text-sm">Client</span>
                <span className="text-text-primary text-sm font-medium">{reservation.name || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary text-sm">Téléphone</span>
                <span className="text-text-primary text-sm font-medium">{reservation.phone || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary text-sm">Date & Heure</span>
                <span className="text-text-primary text-sm font-medium">
                  {reservation.date && reservation.time ? `${reservation.date} à ${reservation.time}` : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary text-sm">Personnes</span>
                <span className="text-text-primary text-sm font-medium">{reservation.guests}</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-accent" />
              Commande
            </h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-bg-primary rounded-lg border border-border/50"
                >
                  <div className="flex-1">
                    <p className="text-text-primary text-sm font-medium">{item.name}</p>
                    <p className="text-text-muted text-xs">
                      {item.quantity} × {item.price}
                    </p>
                  </div>
                  <p className="text-accent font-semibold text-sm">
                    {((parseInt(item.price.replace(/[^\d]/g, '')) || 0) * item.quantity).toLocaleString()} XAF
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-text-secondary font-medium">Total</span>
              <span className="text-accent font-bold text-xl">{total.toLocaleString()} XAF</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              Méthode de paiement
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-bg-primary border border-border rounded-lg text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <p className="text-text-primary text-sm font-medium">MTN MoMo</p>
              </div>
              <div className="p-4 bg-bg-primary border border-border rounded-lg text-center">
                <div className="w-12 h-12 mx-auto mb-2 bg-orange-500/10 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <p className="text-text-primary text-sm font-medium">Orange Money</p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-start gap-3 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
            <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-text-primary text-sm font-medium">Paiement 100% sécurisé</p>
              <p className="text-text-secondary text-xs mt-1">
                Vos informations sont protégées par le chiffrement SSL. Transaction traitée par Monetbil.
                Après paiement, votre commande sera automatiquement envoyée au restaurant via WhatsApp.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || orderCompiled || items.length === 0}
            className="w-full px-6 py-4 bg-accent hover:bg-accent-dark disabled:bg-bg-elevated disabled:text-text-muted text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Traitement en cours...</span>
              </>
            ) : orderCompiled ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Confirmation...</span>
              </>
            ) : (
              <>
                <CreditCard className="w-5 h-5" />
                <span>Payer {total.toLocaleString()} XAF</span>
              </>
            )}
          </button>

          {/* Terms */}
          <p className="text-text-muted text-xs text-center">
            En cliquant sur "Payer", vous acceptez nos conditions générales de vente.
            Votre commande sera envoyée au restaurant via WhatsApp après confirmation du paiement.
          </p>
        </form>
      </div>
    </div>
  );
}
