import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUI } from "../../../hooks/useUI";
import { useAuth } from "../../../hooks/useAuth";
import { useCart } from "../../../hooks/useCart";

export const MobileMenu = () => {
  const { mobileMenuOpen, toggleMobileMenu } = useUI();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toggleMobileMenu();
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleLinkClick = () => toggleMobileMenu();

  const toggleSub = (key) => setOpenSubMenu(openSubMenu === key ? null : key);

  const navItems = [
    { title: "Home", path: "/" },
    {
      title: "Shop", hasChildren: true, key: "shop",
      children: [
        { title: "Travel Collection", path: "/shop?category=Travel%20Bags" },
        { title: "Business Bags", path: "/shop?category=Laptop%20Bags" },
        { title: "Backpacks", path: "/shop?category=Backpacks" },
        { title: "Sling Bags", path: "/shop?category=Sling%20Bags" },
        { title: "Duffel Bags", path: "/shop?category=Duffel%20Bags" },
        { title: "Organizer Pouches", path: "/shop?category=Organizer%20Pouches" },
      ]
    },
    { title: "Travel Collection", path: "/shop?category=Travel%20Bags" },
    { title: "Business Bags", path: "/shop?category=Laptop%20Bags" },
    { title: "Corporate Gifting", path: "/shop?category=Corporate%20Collection" },
    { title: "About Us", path: "/about" },
    { title: "Contact Us", path: "/contact" },
  ];

  const btnStyle = {
    background: "none", border: "none", padding: "11px 2px",
    width: "100%", textAlign: "left", cursor: "pointer",
    display: "block", fontSize: "14px", fontWeight: "600", color: "#253D4E"
  };

  return (
    <>
      {/* Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(14,14,14,0.7)",
            zIndex: 9998, transition: "opacity 0.3s"
          }}
          onClick={toggleMobileMenu}
        />
      )}

      {/* Drawer */}
      <div
        className={`mobile-header-active mobile-header-wrapper-style ${mobileMenuOpen ? "sidebar-visible" : ""}`}
        style={{ display: "block", zIndex: 9999 }}
      >
        <div className="mobile-header-wrapper-inner">
          <div className="mobile-header-content-area">

            {/* Logo + Close */}
            <div className="mobile-logo" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Link to="/" onClick={handleLinkClick} className="d-flex">
                <img
                  alt="BUXAA"
                  src="/assets/imgs/template/buxaa-logo.png"
                  style={{ maxHeight: "38px", objectFit: "contain" }}
                />
              </Link>
              <button
                onClick={toggleMobileMenu}
                style={{ background: "none", border: "none", cursor: "pointer", fontSize: "22px", color: "#4f5d77", lineHeight: 1, padding: "4px 8px" }}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div style={{ margin: "16px 0 8px" }}>
              <form onSubmit={handleSearchSubmit} style={{ position: "relative" }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog..."
                  className="form-control font-xs"
                  style={{ paddingRight: "40px", borderRadius: "4px" }}
                />
                <button
                  type="submit"
                  style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#4f5d77" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </button>
              </form>
            </div>

            <div className="perfect-scroll">
              {/* Navigation */}
              <div className="mobile-menu-wrap mobile-header-border">
                <nav className="mt-15">
                  <ul className="mobile-menu font-heading">
                    {navItems.map((item) => (
                      <li key={item.title} className={item.hasChildren ? "has-children" : ""}>
                        {item.hasChildren ? (
                          <>
                            <button
                              onClick={() => toggleSub(item.key)}
                              style={btnStyle}
                            >
                              {item.title}
                            </button>
                            {openSubMenu === item.key && (
                              <ul className="sub-menu" style={{ display: "block" }}>
                                {item.children.map((child) => (
                                  <li key={child.title}>
                                    <Link to={child.path} onClick={handleLinkClick}>
                                      {child.title}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </>
                        ) : (
                          <Link to={item.path} onClick={handleLinkClick}>
                            {item.title}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              {/* Account Section */}
              <div className="mobile-account">
                <div className="mobile-header-top">
                  <div className="user-account">
                    <Link to="/account" onClick={handleLinkClick}>
                      <img
                        src={user?.avatar || "/assets/imgs/template/ava_1.png"}
                        alt={user?.name || "User"}
                      />
                    </Link>
                    <div className="content">
                      <h6 className="user-name">
                        Hello, <span className="text-brand">{user?.name || "Steven Job"}!</span>
                      </h6>
                      <p className="font-xs text-muted">
                        {user ? `Role: ${user.role}` : "Welcome back"}
                      </p>
                    </div>
                  </div>
                </div>

                <ul className="mobile-menu">
                  <li>
                    <Link to="/account?tab=notification" onClick={handleLinkClick}>My Account</Link>
                  </li>
                  <li>
                    <Link to="/account?tab=order-tracking" onClick={handleLinkClick}>Order Tracking</Link>
                  </li>
                  <li>
                    <Link to="/account?tab=orders" onClick={handleLinkClick}>My Orders</Link>
                  </li>
                  <li>
                    <Link to="/account?tab=wishlist" onClick={handleLinkClick}>
                      My Wishlist
                      {itemCount > 0 && (
                        <span className="number-item font-xs" style={{ marginLeft: "6px" }}>{itemCount}</span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link to="/account?tab=setting" onClick={handleLinkClick}>Setting</Link>
                  </li>
                  {user?.role === "admin" && (
                    <li>
                      <Link to="/dashboard" onClick={handleLinkClick} style={{ color: "#1A3DAA", fontWeight: "700" }}>
                        Admin Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    {user ? (
                      <button
                        onClick={() => { logout(); toggleMobileMenu(); }}
                        style={{ background: "none", border: "none", padding: "11px 2px", cursor: "pointer", color: "#dc3545", fontSize: "14px", fontWeight: "600", display: "block", width: "100%", textAlign: "left" }}
                      >
                        Sign out
                      </button>
                    ) : (
                      <Link to="/login" onClick={handleLinkClick} style={{ color: "#3BB77E", fontWeight: "700" }}>
                        Sign in
                      </Link>
                    )}
                  </li>
                </ul>
              </div>

              {/* Promo Banner */}
              <div className="mobile-banner">
                <div className="bg-5 block-iphone" style={{ borderRadius: "8px", padding: "20px" }}>
                  <span className="color-brand-3 font-sm-lh32" style={{ display: "block", marginBottom: "4px" }}>
                    Starting from Rs. 1,299
                  </span>
                  <h3 className="font-xl mb-10">BUXAA Voyager Pro</h3>
                  <p className="font-base color-brand-3 mb-10">Carry-On Travel Bag</p>
                  <Link to="/shop" onClick={handleLinkClick} className="btn btn-arrow">
                    Shop Now
                  </Link>
                </div>
              </div>

              {/* Copyright */}
              <div className="site-copyright color-gray-400 mt-30">
                Copyright 2026 &copy; BUXAA - Travel in Style.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
