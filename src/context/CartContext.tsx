/**
 * ============================================================
 * CART CONTEXT - GLOBAL STATE MANAGEMENT
 * ============================================================
 * 
 * Provides a React Context for managing:
 * - Shopping cart state (items, quantities, totals)
 * - Reservation data (merged with cart for checkout)
 * - Checkout modal state
 * 
 * USAGE:
 * import { useCart } from '../context/CartContext';
 * const { items, total, reservation, setReservation, ... } = useCart();
 * ============================================================
 */

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { MenuItem } from '../data/menuData';
import type { ReservationData } from '../utils/orderProcessor';

export interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  // Cart state
  items: CartItem[];
  total: number;
  itemCount: number;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  
  // Reservation state (shared with booking form)
  reservation: ReservationData;
  setReservation: (data: Partial<ReservationData>) => void;
  clearReservation: () => void;
  
  // Checkout modal state
  isCheckoutOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const defaultReservation: ReservationData = {
  name: '',
  phone: '',
  email: '',
  date: '',
  time: '',
  guests: '2',
  occasion: '',
  notes: '',
};

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Parse price string to numeric value
 * Handles formats like "7 500 XAF", "7,500 XAF", "7500"
 */
const parsePrice = (priceString: string): number => {
  const numericString = priceString.replace(/[^\d]/g, '');
  return parseInt(numericString, 10) || 0;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [reservation, setReservationState] = useState<ReservationData>(defaultReservation);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addToCart = useCallback((item: MenuItem) => {
    setItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: number) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== itemId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const setReservation = useCallback((data: Partial<ReservationData>) => {
    setReservationState((prev) => ({ ...prev, ...data }));
  }, []);

  const clearReservation = useCallback(() => {
    setReservationState(defaultReservation);
  }, []);

  const openCheckout = useCallback(() => {
    setIsCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
  }, []);

  // Calculate totals
  const total = items.reduce((sum, item) => {
    const price = parsePrice(item.price);
    return sum + price * item.quantity;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        total,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        reservation,
        setReservation,
        clearReservation,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook to access cart context
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
