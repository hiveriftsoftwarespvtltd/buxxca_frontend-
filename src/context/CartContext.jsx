import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('buxaa-cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const stored = localStorage.getItem('buxaa-applied-coupon');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('buxaa-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('buxaa-applied-coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('buxaa-applied-coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product, size, quantity = 1) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id && item.size === size);
      if (existingIdx !== -1) {
        const nextItems = [...prev];
        nextItems[existingIdx].quantity += quantity;
        showToast(`${product.name} quantity updated! 🛍️`, '🛍️');
        return nextItems;
      } else {
        showToast(`${product.name} added to cart! 🛍️`, '🛍️');
        return [...prev, {
          id: product.id,
          name: product.name,
          brand: product.brand,
          price: product.price,
          img: product.img,
          size,
          quantity,
          slug: product.slug
        }];
      }
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
    showToast('Item removed from cart', '✨');
  };

  const updateQty = (id, size, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCount = () => cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const getSubtotal = () => cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const subtotal = getSubtotal();

  useEffect(() => {
    if (appliedCoupon && subtotal < appliedCoupon.minSubtotal) {
      setAppliedCoupon(null);
      showToast(`Coupon removed: requires minimum subtotal of ₹${appliedCoupon.minSubtotal.toLocaleString('en-IN')}`, '⚠️');
    }
  }, [subtotal, appliedCoupon]);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      count: getCount(),
      subtotal,
      appliedCoupon,
      setAppliedCoupon
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
