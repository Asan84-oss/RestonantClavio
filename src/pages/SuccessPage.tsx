/**
 * ============================================================
 * PAYMENT SUCCESS PAGE
 * ============================================================
 * 
 * Displays a premium confirmation card after successful payment.
 * Shows order receipt details and reassures the customer that
 * their table/meal is secured.
 * 
 * DATA SOURCE:
 * - Reads order data from sessionStorage (set during checkout)
 * - Falls back to generic message if no data available
 * ============================================================
 */

import { useEffect, useState } from 'react';
import { Check, Download, ArrowLeft, Phone, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OrderData {
  amount: number;
  currency: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  items: Array<{
    id: number;
    name: string;
    quantity: number;
    price: string;
  }>;
  reference: string;
  description: string;
}

export default function SuccessPage() {
  const [order, setOrder] = useState<OrderData | null>(null);

  useEffect(() => {
    // Retrieve order data from sessionStorage
    const storedOrder = sessionStorage.getItem('lastOrder');
    if (storedOrder) {
      setOrder(JSON.parse(storedOrder));
      // Clear after reading
      sessionStorage.removeItem('lastOrder');
    }
  }, []);

  const handlePrintReceipt = () => {
    window.print();
  };

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

          {/* Order Details */}
          {order && (
            <div className="bg-bg-primary rounded-2xl border border-border p-5 mb-6 text-left">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-text-primary font-semibold text-sm">Reçu de commande</h3>
                <span className="text-text-muted text-xs">#{order.reference}</span>
              </div>

              {/* Items */}
              <div className="space-y-2 mb-4 pb-4 border-b border-border/50">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-text-primary text-sm">{item.name}</p>
                      <p className="text-text-muted text-xs">Qté: {item.quantity}</p>
                    </div>
                    <p className="text-text-secondary text-sm">{item.price}</p>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between">
                <span className="text-text-secondary font-medium text-sm">Total payé</span>
                <span className="text-accent font-bold text-lg">{order.amount.toLocaleString()} XAF</span>
              </div>
            </div>
          )}

          {/* Customer Info */}
          {order?.customer_name && (
            <div className="bg-bg-primary rounded-2xl border border-border p-4 mb-6 text-left">
              <p className="text-text-secondary text-xs mb-1">Commande pour</p>
              <p className="text-text-primary font-medium text-sm">{order.customer_name}</p>
              <p className="text-text-muted text-xs mt-1">{order.customer_phone}</p>
            </div>
          )}

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
