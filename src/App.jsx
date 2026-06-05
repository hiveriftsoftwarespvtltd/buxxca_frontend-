import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import { StorefrontLayout } from "./components/storefront/layout/StorefrontLayout";
import { DashboardLayout } from "./components/dashboard/layout/DashboardLayout";

// Storefront Pages
import { HomePage } from "./pages/storefront/HomePage";
import { ShopGridPage } from "./pages/storefront/ShopGridPage";
import { ProductDetailPage } from "./pages/storefront/ProductDetailPage";
import { CartPage } from "./pages/storefront/CartPage";
import { CheckoutPage } from "./pages/storefront/CheckoutPage";
import { WishlistPage } from "./pages/storefront/WishlistPage";
import { ComparePage } from "./pages/storefront/ComparePage";
import { LoginPage } from "./pages/storefront/LoginPage";
import { BlogPage } from "./pages/storefront/BlogPage";
import { BlogSinglePage } from "./pages/storefront/BlogSinglePage";
import { AccountPage } from "./pages/storefront/AccountPage";
import { ContactPage } from "./pages/storefront/ContactPage";
import { AboutPage } from "./pages/storefront/AboutPage";
import { CareersPage } from "./pages/storefront/CareersPage";
import { RegisterPage } from "./pages/storefront/RegisterPage";
import { TermPage } from "./pages/storefront/TermPage";
import { Error404Page } from "./pages/storefront/Error404Page";

// Dashboard Pages
import { DashboardHome } from "./pages/dashboard/DashboardHome";
import { ProductsListPage } from "./pages/dashboard/ProductsListPage";
import { OrderDetailPage } from "./pages/dashboard/OrderDetailPage";
import { AddProduct1Page } from "./pages/dashboard/AddProduct1Page";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { UIProvider } from "./context/UIContext";
import { CompareProvider } from "./context/CompareContext";

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              <UIProvider>
                <Routes>
                  
                  {/* ── STOREFRONT CLIENT ROUTING ── */}
                  <Route element={<StorefrontLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home-2" element={<HomePage />} />
                    <Route path="/home-3" element={<HomePage />} />
                    <Route path="/home-4" element={<HomePage />} />
                    <Route path="/home-5" element={<HomePage />} />
                    <Route path="/home-6" element={<HomePage />} />
                    <Route path="/home-7" element={<HomePage />} />
                    <Route path="/home-8" element={<HomePage />} />
                    <Route path="/home-9" element={<HomePage />} />
                    <Route path="/home-10" element={<HomePage />} />
                    
                    <Route path="/shop" element={<ShopGridPage />} />
                    <Route path="/shop/grid-2" element={<ShopGridPage />} />
                    <Route path="/shop/list" element={<ShopGridPage />} />
                    <Route path="/shop/list-2" element={<ShopGridPage />} />
                    <Route path="/shop/fullwidth" element={<ShopGridPage />} />
                    
                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                    <Route path="/product/:slug/v2" element={<ProductDetailPage />} />
                    <Route path="/product/:slug/v3" element={<ProductDetailPage />} />
                    <Route path="/product/:slug/v4" element={<ProductDetailPage />} />
                    
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/compare" element={<ComparePage />} />
                    <Route path="/account" element={<AccountPage />} />
                    
                    <Route path="/blog" element={<BlogPage />} />
                    <Route path="/blog/v2" element={<BlogPage />} />
                    <Route path="/blog/list" element={<BlogPage />} />
                    <Route path="/blog/big" element={<BlogPage />} />
                    <Route path="/blog/:slug" element={<BlogSinglePage />} />
                    
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/careers" element={<CareersPage />} />
                    <Route path="/terms" element={<TermPage />} />
                    <Route path="/404" element={<Error404Page />} />
                    
                    <Route path="*" element={<Navigate to="/404" replace />} />
                  </Route>

                  {/* ── ADMIN WORKSPACE ROUTING ── */}
                  <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardHome />} />
                    <Route path="products" element={<ProductsListPage />} />
                    <Route path="products/grid" element={<ProductsListPage />} />
                    <Route path="products/grid-2" element={<ProductsListPage />} />
                    <Route path="products/add" element={<AddProduct1Page />} />
                    <Route path="products/add/v2" element={<AddProduct1Page />} />
                    <Route path="products/add/v3" element={<AddProduct1Page />} />
                    <Route path="products/add/v4" element={<AddProduct1Page />} />
                    
                    <Route path="orders" element={<DashboardHome />} />
                    <Route path="orders/v2" element={<DashboardHome />} />
                    <Route path="orders/:id" element={<OrderDetailPage />} />
                    <Route path="orders/:id/tracking" element={<OrderDetailPage />} />
                    <Route path="orders/:id/invoice" element={<OrderDetailPage />} />
                    
                    <Route path="categories" element={<ProductsListPage />} />
                    <Route path="sellers" element={<DashboardHome />} />
                    <Route path="sellers/list" element={<DashboardHome />} />
                    <Route path="sellers/:id" element={<DashboardHome />} />
                    <Route path="transactions" element={<DashboardHome />} />
                    <Route path="transactions/v2" element={<DashboardHome />} />
                    <Route path="transactions/:id" element={<DashboardHome />} />
                    
                    <Route path="reviews" element={<DashboardHome />} />
                    <Route path="brands" element={<DashboardHome />} />
                    <Route path="settings" element={<DashboardHome />} />
                    <Route path="settings/v2" element={<DashboardHome />} />
                    
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Route>

                </Routes>
              </UIProvider>
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
