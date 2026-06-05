import React, { createContext, useState, useEffect, useMemo } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("buxaa_cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem("buxaa_coupon");
    return saved ? JSON.parse(saved) : null;
  });

  const [discount, setDiscount] = useState(() => {
    const saved = localStorage.getItem("buxaa_discount");
    return saved ? parseFloat(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("buxaa_cart", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("buxaa_coupon", JSON.stringify(coupon));
    localStorage.setItem("buxaa_discount", discount.toString());
  }, [coupon, discount]);

  const addItem = (product, qty = 1, variant = "") => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && item.variant === variant
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].qty += qty;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images ? product.images[0] : "",
            variant: variant,
            qty: qty
          }
        ];
      }
    });
  };

  const removeItem = (id, variant = "") => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.variant === variant)));
  };

  const updateQty = (id, qty, variant = "") => {
    if (qty <= 0) {
      removeItem(id, variant);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.variant === variant ? { ...item, qty: qty } : item
      )
    );
  };

  const applyCoupon = (code) => {
    if (code.toUpperCase() === "BUXAA20") {
      setCoupon(code.toUpperCase());
      return { success: true, message: "Coupon applied successfully (20% Off!)" };
    }
    return { success: false, message: "Invalid coupon code" };
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    setDiscount(0);
  };

  // derived values
  const itemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.qty, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [items]);

  // Recalculate discount based on subtotal when items or coupon changes
  useEffect(() => {
    if (coupon === "BUXAA20") {
      setDiscount(parseFloat((subtotal * 0.20).toFixed(2)));
    } else {
      setDiscount(0);
    }
  }, [subtotal, coupon]);

  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal > 75 ? 0 : 9.99; // Free shipping over $75
  }, [subtotal]);

  const total = useMemo(() => {
    return parseFloat((subtotal - discount + shipping).toFixed(2));
  }, [subtotal, discount, shipping]);

  return (
    <CartContext.Provider
      value={{
        items,
        coupon,
        discount,
        shipping,
        itemCount,
        subtotal,
        total,
        addItem,
        removeItem,
        updateQty,
        applyCoupon,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
