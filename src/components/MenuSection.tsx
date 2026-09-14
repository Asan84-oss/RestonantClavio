/**
 * ============================================================
 * INTERACTIVE DIGITAL MENU COMPONENT
 * ============================================================
 * 
 * Fully responsive, tabbed menu with real-time client-side
 * switching. Connected to global CartContext for state management.
 * 
 * FEATURES:
 * - Three categories: Grillades, Cocktails, Bruschettas
 * - Smooth tab transitions without page reloads
 * - Image cards with hover effects
 * - Clear pricing in XAF
 * - "Ajouter" buttons connected to cart
 * - Floating cart bar with checkout CTA
 * - Mobile-optimized grid layout
 * ============================================================
 */

import { useState } from 'react';
import { ShoppingCart, Flame, Sparkles, Plus, Minus } from 'lucide-react';
import { menuCategories, type MenuItem } from '../data/menuData';
import { useCart } from '../context/CartContext';
import CheckoutModal from './CheckoutModal';

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState('grillades');
  const { items, total, itemCount, addToCart, removeFromCart, updateQuantity, isCheckoutOpen, openCheckout, closeCheckout } = useCart();

  const currentCategory = menuCategories.find((cat) => cat.id === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item);
  };

  const getItemQuantity = (itemId: number): number => {
    const cartItem = items.find((i) => i.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <section id="menu" className="py-16 lg:py-24 bg-bg-primary relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-accent text-xs font-medium tracking-wider uppercase">
              Menu Digital
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Nos Spécialités
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Des saveurs authentiques sublimées par notre chef. Grillades au feu de bois,
            cocktails signature et tapas raffinés — l'excellence culinaire au sommet d'Akwa.
          </p>
        </div>

        {/* Interactive Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 lg:mb-12">
          {menuCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`group relative px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-105'
                  : 'bg-bg-card text-text-secondary hover:text-text-primary hover:bg-bg-elevated border border-border hover:border-accent/30'
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                <span>{category.label}</span>
              </span>
              
              {/* Active indicator dot */}
              {activeCategory === category.id && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Category Subtitle */}
        {currentCategory && (
          <div className="text-center mb-8">
            <p className="text-text-secondary text-sm sm:text-base italic">
              {currentCategory.subtitle}
            </p>
          </div>
        )}

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {currentCategory?.items.map((item) => {
            const quantity = getItemQuantity(item.id);
            return (
              <div
                key={item.id}
                className="menu-card group gradient-card border border-border hover:border-accent/30 rounded-2xl overflow-hidden"
              >
                {/* Image Container */}
                {item.image && (
                  <div className="relative h-48 sm:h-52 overflow-hidden bg-bg-elevated">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="menu-card-image w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent" />
                    
                    {/* Tags */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.tag && (
                        <span className="px-2.5 py-1 bg-accent/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                          {item.tag}
                        </span>
                      )}
                      {item.isNew && (
                        <span className="px-2.5 py-1 bg-green-500/90 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                          Nouveau
                        </span>
                      )}
                    </div>

                    {/* Spicy Indicator */}
                    {item.spicy && (
                      <div className="absolute top-3 right-3">
                        <Flame className="w-5 h-5 text-red-500 fill-red-500 drop-shadow-lg" />
                      </div>
                    )}
                  </div>
                )}

                {/* Content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-text-primary font-semibold text-base sm:text-lg mb-2 group-hover:text-accent transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div>
                      <p className="text-accent font-bold text-lg">{item.price}</p>
                    </div>
                    
                    {/* Quantity Controls or Add Button */}
                    {quantity > 0 ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-bg-elevated border border-border hover:border-accent/30 text-text-secondary hover:text-accent rounded-full transition-all"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-text-primary font-semibold text-sm w-6 text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-8 h-8 flex items-center justify-center bg-accent hover:bg-accent-dark text-white rounded-full transition-all"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent text-accent hover:text-white text-sm font-semibold rounded-full transition-all duration-300 border border-accent/20 hover:border-accent hover:scale-105"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Ajouter</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cart Summary Bar */}
        {itemCount > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-md">
            <div className="flex items-center justify-between gap-3 px-5 py-3.5 bg-accent text-white rounded-2xl shadow-2xl shadow-accent/40">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">{itemCount} {itemCount === 1 ? 'article' : 'articles'}</p>
                  <p className="text-white/80 text-xs">{total.toLocaleString()} XAF</p>
                </div>
              </div>
              <button
                onClick={openCheckout}
                className="px-4 py-2 bg-white text-accent font-semibold rounded-xl text-sm hover:bg-white/90 transition-colors whitespace-nowrap"
              >
                Commander
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-bg-card border border-border">
            <div className="text-center sm:text-left">
              <p className="text-text-primary font-semibold">Envie de tout voir ?</p>
              <p className="text-text-secondary text-sm">Consultez notre menu complet sur place ou commandez en ligne</p>
            </div>
            <a
              href="#booking"
              className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-white text-sm font-semibold rounded-full transition-all whitespace-nowrap"
            >
              Réserver & Commander
            </a>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal isOpen={isCheckoutOpen} onClose={closeCheckout} />
    </section>
  );
}
