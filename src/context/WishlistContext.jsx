import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('buxaa-wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const { showToast } = useToast();

  useEffect(() => {
    localStorage.setItem('buxaa-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    let active = false;
    setWishlist(prev => {
      const idx = prev.indexOf(productId);
      if (idx === -1) {
        showToast('Added to wishlist! ❤️', '❤️');
        active = true;
        return [...prev, productId];
      } else {
        showToast('Removed from wishlist', '✨');
        return prev.filter(id => id !== productId);
      }
    });
    return active;
  };

  const hasItem = (productId) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, hasItem, count: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
