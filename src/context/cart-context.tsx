
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';
import type { CartItem } from '@/lib/types';

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string, variantId: string | null) => void;
  updateQuantity: (itemId: string, variantId: string | null, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

const getCartItemId = (itemId: string, variantId: string | null) => {
  return variantId ? `${itemId}-${variantId}` : `${itemId}-null`;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<{ [key: string]: CartItem }>({});

  const addItem = useCallback((itemToAdd: CartItem) => {
    const cartItemId = getCartItemId(itemToAdd.id, itemToAdd.variant?.id || null);
    setItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[cartItemId]) {
        newItems[cartItemId] = {
          ...newItems[cartItemId],
          quantity: newItems[cartItemId].quantity + (itemToAdd.quantity || 1),
        };
      } else {
        newItems[cartItemId] = { ...itemToAdd, quantity: itemToAdd.quantity || 1 };
      }
      return newItems;
    });
  }, []);

  const removeItem = useCallback((itemId: string, variantId: string | null) => {
    const cartItemId = getCartItemId(itemId, variantId);
    setItems((prevItems) => {
      const { [cartItemId]: _, ...rest } = prevItems;
      return rest;
    });
  }, []);

  const updateQuantity = useCallback((itemId: string, variantId: string | null, quantity: number) => {
    const cartItemId = getCartItemId(itemId, variantId);
    setItems((prevItems) => {
      const newItems = { ...prevItems };
      if (quantity <= 0) {
        delete newItems[cartItemId];
      } else if (newItems[cartItemId]) {
        newItems[cartItemId] = { ...newItems[cartItemId], quantity };
      }
      return newItems;
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems({});
  }, []);

  const cartItemsArray = useMemo(() => Object.values(items), [items]);

  const cartCount = useMemo(() => {
    return cartItemsArray.reduce((count, item) => count + item.quantity, 0);
  }, [cartItemsArray]);

  const subtotal = useMemo(() => {
    return cartItemsArray.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItemsArray]);

  return (
    <CartContext.Provider value={{ items: cartItemsArray, addItem, removeItem, updateQuantity, clearCart, cartCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};
