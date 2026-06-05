import React from "react";
import { Outlet } from "react-router-dom";
import { TopBar } from "./TopBar";
import { Header } from "./Header";
import { MobileMenu } from "./MobileMenu";
import { Footer } from "./Footer";
import { SidebarLeft } from "./SidebarLeft";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Global overlay components (implemented next)
import { QuickViewModal } from "../shop/QuickViewModal";
import { CompareBar } from "../shop/CompareBar";

export const StorefrontLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Left Sidebar Category Drawer */}
      <SidebarLeft />

      {/* Top Banner Bar */}
      <TopBar />

      {/* Main Navigation Header */}
      <Header />

      {/* Slide-in Mobile Drawer */}
      <MobileMenu />

      {/* Dynamic Page Outlets */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer Links & Copyright */}
      <Footer />

      {/* Global Modals & Anchors */}
      <QuickViewModal />
      <CompareBar />
    </div>
  );
};
export default StorefrontLayout;
