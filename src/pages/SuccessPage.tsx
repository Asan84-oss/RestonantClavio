/**
 * ============================================================
 * PAYMENT SUCCESS PAGE
 * ============================================================
 * 
 * Displays a premium confirmation card after successful payment.
 * Shows order receipt details and reassures the customer that
 * their table/meal is secured.
 * 
 * DATA SOURCES:
 * - URL params: ?ref=ORDER_REF&tx=TRANSACTION_ID
 * - sessionStorage: lastOrder (compiled order data)
 * - Falls back to generic message if no data available
 * ============================================================
 */

import { useEffect, useState } from 'react';
import { Check, Download, ArrowLeft, Phone, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { retrieveStoredOrder, clearStoredOrder, type CompiledOrder } from '../utils/orderProcessor';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState<CompiledOrder | null>(null);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    // Read URL params
    const txParam = searchParams.get('tx');
    const refParam = searchParams.get('ref');
    if (txParam) setTransactionId(txParam);
    if (refParam) setReference(refParam);

    // Retrieve order data from sessionStorage
    const storedOrder = retrieveStoredOrder();
    if (storedOrder) {
      setOrder(storedOrder);
      // Clear after reading (one-time display)
      clearStoredOrder();
    }
  }, [searchParams]);

  const handlePrintReceipt = () => {
    window.print();
  };

  const displayRef = reference || order?.reference || '—';
  const displayTx = transactionId || order?.transactionId || '—';

  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Success Card */}
        <div className="gradient-card border border-accent/30 rounded-3xl p-8 sm:p-10 text-center shadow-2xl shadow-accent/10">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 border-2 border-accent/30 flex items-center justify-center animate-pulse-glow">
            <Check className="w-10 h-10 text-accent" />
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            Paiement Confirmé !
          </h1>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8">
            Merci pour votre commande. Votre table et vos plats sont réservés.
            À très bientôt au Clavio Akwa !
          </p>

          {/* Transaction Details */}
          <div className="bg-bg-primary rounded-2xl border border-border p-5 mb-6 text-left">
            <h3 className="text-text-primary font-semibold text-sm mb-4 flex items-center gap-2">
              <Check className="w-4 h-4 text-accent" />
              Détails de la transaction
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-xs">Réf. Commande</span>
                <span className="text-text-primary text-sm font-mono font-medium">{displayRef}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-xs">Réf. Paiement</span>
                <span className="text-accent text-sm font-mono font-medium">{displayTx}</span>
              </div>
              {order && (
                <>
                  <div className="flex justify-between items-center pt-3 border-t border-border/50">
                    <span className="text-text-secondary text-xs">Client</span>
                    <span className="text-text-primary text-sm font-medium">{order.customer.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary text-xs">Montant</span>
                    <span className="text-accent text-sm font-bold">{order.total.toLocaleString()} XAF</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Order Items */}
          {order && order.items.length > 0 && (
            <div className="bg-bg-primary rounded-2xl border border-border p-5 mb-6 text-left">
              <h3 className="text-text-primary font-semibold text-sm mb-4">Votre commande</h3>
              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-text-primary text-sm">{item.name}</p>
                      <p className="text-text-muted text-xs">Qté: {item.quantity}</p>
                    </div>
                    <p className="text-text-secondary text-sm">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WhatsApp Confirmation Notice */}
          <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-xl mb-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💬</span>
              <div className="text-left">
                <p className="text-text-primary text-sm font-medium">Confirmation WhatsApp envoyée</p>
                <p className="text-text-secondary text-xs mt-1">
                  Votre commande a été automatiquement transmise au restaurant.
                  Vous recevrez une confirmation de leur part sous peu.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/"
              className="flex-1 px-5 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            {order && (
              <button
                onClick={handlePrintReceipt}
                className="flex-1 px-5 py-3 bg-bg-card border border-border hover:border-accent/30 text-text-primary font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                Reçu
              </button>
            )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 text-center">
          <p className="text-text-muted text-xs mb-3">Besoin d'aide ? Contactez-nous :</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-text-secondary text-xs">
            <a href="tel:+237000000000" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>+237 6XX XXX XXX</span>
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>Rue Mermoz, Akwa</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>17h - 2h</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
