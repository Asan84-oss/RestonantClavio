/**
 * ============================================================
 * CHECKOUT MODAL - MONETBIL PAYMENT INTEGRATION
 * ============================================================
 * 
 * Handles the complete checkout flow:
 * 1. Displays cart summary with items and total
 * 2. Collects customer information
 * 3. Triggers Monetbil payment widget
 * 4. Shows loading states to prevent duplicate orders
 * 5. Redirects to success/cancel pages
 * 
 * PAYMENT FLOW:
 * - User clicks "Payer par Mobile Money"
 * - Monetbil widget overlay appears
 * - User selects MTN MoMo or Orange Money
 * - After payment, redirected to /success or /cancel
 * ============================================================
 */

import { useState, useEffect } from 'react';
import { X, ShoppingCart, CreditCard, Phone, User, Loader2, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getPaymentConfig, isPaymentConfigured } from '../config/payment';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, total, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isPaymentConfigured()) {
      alert('Configuration de paiement manquante. Veuillez contacter le support.');
      return;
    }

    setIsProcessing(true);

    try {
      const config = getPaymentConfig();
      
      // Prepare order data for Monetbil
      const orderData = {
        amount: total,
        currency: config.currency,
        customer_name: customerInfo.name,
        customer_phone: customerInfo.phone,
        customer_email: customerInfo.email,
        items: items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        reference: `CLAVIO-${Date.now()}`,
        description: `Commande Clavio Akwa - ${items.length} article(s)`,
      };

      // Store order data in sessionStorage for success page
      sessionStorage.setItem('lastOrder', JSON.stringify(orderData));

      // Create Monetbil form dynamically
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://api.monetbil.com/v1/payment';
      form.target = '_self';
      
      // Add Monetbil required fields
      const fields = {
        service_key: config.serviceKey,
        amount: total,
        currency: config.currency,
        item_name: orderData.description,
        item_description: orderData.description,
        return_url: `${window.location.origin}${config.successUrl}`,
        cancel_url: `${window.location.origin}${config.cancelUrl}`,
        notify_url: `${window.location.origin}/api/payment/notify`,
        // Customer info
        first_name: customerInfo.name.split(' ')[0] || customerInfo.name,
        last_name: customerInfo.name.split(' ').slice(1).join(' ') || '',
        phone: customerInfo.phone,
        email: customerInfo.email,
        // Custom reference
        ref: orderData.reference,
      };

      // Append fields to form
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      // Submit form to Monetbil
      document.body.appendChild(form);
      form.submit();
      
      // Clear cart after successful submission
      clearCart();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-bg-primary/95 backdrop-blur-sm"
        onClick={onClose}
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
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 text-text-secondary hover:text-text-primary transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handlePayment} className="p-6 space-y-6">
          {/* Order Summary */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-accent" />
              Résumé de la commande
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

          {/* Customer Information */}
          <div>
            <h3 className="text-text-primary font-semibold mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-accent" />
              Vos informations
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-text-secondary text-sm mb-1.5">Nom complet *</label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Votre nom"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1.5">Téléphone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="+237 6XX XXX XXX"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                />
              </div>
              <div>
                <label className="block text-text-secondary text-sm mb-1.5">Email (optionnel)</label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-2.5 bg-bg-primary border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all text-sm"
                />
              </div>
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
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing || items.length === 0}
            className="w-full px-6 py-4 bg-accent hover:bg-accent-dark disabled:bg-bg-elevated disabled:text-text-muted text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Traitement en cours...</span>
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
          </p>
        </form>
      </div>
    </div>
  );
}
