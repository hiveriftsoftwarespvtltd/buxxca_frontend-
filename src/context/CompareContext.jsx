import React, { createContext, useState, useEffect } from "react";

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("buxaa_compare");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("buxaa_compare", JSON.stringify(items));
  }, [items]);

  const addToCompare = (product) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev;
      if (prev.length >= 4) {
        // Enforce max 4 items limit
        alert("You can compare up to 4 products only.");
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromCompare = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCompare = () => {
    setItems([]);
  };

  const isCompared = (id) => {
    return items.some((item) => item.id === id);
  };

  return (
    <CompareContext.Provider
      value={{
        items,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isCompared
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
