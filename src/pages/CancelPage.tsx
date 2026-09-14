/**
 * ============================================================
 * PAYMENT CANCEL PAGE
 * ============================================================
 * 
 * Graceful return handler when user closes the payment modal
 * or cancels the transaction. Guides them back to their cart.
 * 
 * BEHAVIOR:
 * - Shows a friendly message (no blame)
 * - Offers to return to cart to retry
 * - Preserves cart data (not cleared on cancel)
 * - Provides alternative contact options
 * ============================================================
 */

import { XCircle, ArrowLeft, MessageCircle, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Cancel Card */}
        <div className="gradient-card border border-border rounded-3xl p-8 sm:p-10 text-center shadow-2xl">
          {/* Cancel Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-500/10 border-2 border-yellow-500/30 flex items-center justify-center">
            <XCircle className="w-10 h-10 text-yellow-500" />
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-text-primary mb-3">
            Paiement Annulé
          </h1>
          <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-8">
            Pas de souci ! Votre commande est toujours dans votre panier.
            Vous pouvez réessayer quand vous le souhaitez.
          </p>

          {/* Info Box */}
          <div className="bg-bg-primary rounded-2xl border border-border p-5 mb-6 text-left">
            <h3 className="text-text-primary font-semibold text-sm mb-3">Que s'est-il passé ?</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent text-xs mt-0.5">•</span>
                <span className="text-text-secondary text-xs">Vous avez fermé la fenêtre de paiement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent text-xs mt-0.5">•</span>
                <span className="text-text-secondary text-xs">Aucun montant n'a été débité de votre compte</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent text-xs mt-0.5">•</span>
                <span className="text-text-secondary text-xs">Votre panier est intact et prêt pour une nouvelle tentative</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/#menu"
              className="flex-1 px-5 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              <ShoppingCart className="w-4 h-4" />
              Retour au panier
            </Link>
            <a
              href="https://wa.me/237000000000?text=Bonjour%20Clavio%20Akwa%2C%20j'ai%20un%20probl%C3%A8me%20avec%20mon%20paiement."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-5 py-3 bg-bg-card border border-border hover:border-accent/30 text-text-primary font-semibold rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Contacter le support
            </a>
          </div>

          {/* Alternative Payment Info */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-text-muted text-xs mb-3">Autres options de paiement :</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://wa.me/237000000000?text=Bonjour%2C%20je%20souhaite%20r%C3%A9server%20une%20table%20au%20Clavio%20Akwa."
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent text-xs transition-colors"
              >
                Réserver via WhatsApp
              </a>
              <span className="text-text-muted">•</span>
              <a
                href="tel:+237000000000"
                className="text-text-secondary hover:text-accent text-xs transition-colors"
              >
                Appeler directement
              </a>
            </div>
          </div>
        </div>

        {/* Home Link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-accent text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
