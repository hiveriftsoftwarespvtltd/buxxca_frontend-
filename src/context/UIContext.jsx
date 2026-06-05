import React, { createContext, useState } from "react";

export const UIContext = createContext();

export const UIProvider = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [compareBarVisible, setCompareBarVisible] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  const toggleFilterSidebar = () => setFilterSidebarOpen((prev) => !prev);
  const openQuickView = (product) => setQuickViewProduct(product);
  const closeQuickView = () => setQuickViewProduct(null);

  return (
    <UIContext.Provider
      value={{
        mobileMenuOpen,
        filterSidebarOpen,
        quickViewProduct,
        compareBarVisible,
        toggleMobileMenu,
        toggleFilterSidebar,
        openQuickView,
        closeQuickView,
        setCompareBarVisible,
        setMobileMenuOpen,
        setFilterSidebarOpen
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
