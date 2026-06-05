import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../../../hooks/useCart";
import { useWishlist } from "../../../hooks/useWishlist";
import { useCompare } from "../../../hooks/useCompare";
import { useAuth } from "../../../hooks/useAuth";
import { useUI } from "../../../hooks/useUI";

export const Header = () => {
  const { items: cartItems, itemCount, total = 0, removeItem } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { items: compareItems } = useCompare();
  const { user, logout } = useAuth();
  const { toggleMobileMenu } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  const [sticky, setSticky] = useState(false);
  const [searchCat, setSearchCat] = useState("All categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close account dropdown on outside click using ref
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const catParam = searchCat !== "All categories" ? `&category=${encodeURIComponent(searchCat)}` : "";
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}${catParam}`);
  };

  return (
    <header className={`header sticky-bar ${sticky ? "stick" : ""}`}>
      <div className="container">
        <div className="main-header">
          <div className="header-left">
            {/* Styled BUXAA Logo */}
            <div className="header-logo">
              <Link className="d-flex" to="/">
                <img alt="BUXAA" src="/assets/imgs/template/buxaa-logo.png" style={{ maxHeight: "45px", objectFit: "contain" }} />
              </Link>
            </div>

            {/* Search Bar */}
            <div className="header-search">
              <div className="box-header-search">
                <form className="form-search" onSubmit={handleSearchSubmit}>
                  <div className="box-category">
                    <select
                      className="select-active font-xs border-none bg-transparent outline-none cursor-pointer"
                      value={searchCat}
                      onChange={(e) => setSearchCat(e.target.value)}
                      style={{ border: "none", background: "none", outline: "none", fontSize: "12px", color: "#4f5d77" }}
                    >
                      <option value="All categories">All categories</option>
                      <option value="Computers Accessories">Computers Accessories</option>
                      <option value="Cell Phones">Cell Phones</option>
                      <option value="Gaming Gatgets">Gaming Gatgets</option>
                      <option value="Smart watches">Smart watches</option>
                      <option value="Wired Headphone">Wired Headphone</option>
                      <option value="Mouse Keyboard">Mouse Keyboard</option>
                      <option value="Headphone">Headphone</option>
                      <option value="Bluetooth devices">Bluetooth devices</option>
                      <option value="Cloud Software">Cloud Software</option>
                    </select>
                  </div>
                  <div className="box-keysearch">
                    <input
                      className="form-control font-xs"
                      type="text"
                      placeholder="Search for items..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Main Navigation menu */}
            <div className="header-nav">
              <nav className="nav-main-menu d-none d-xl-block">
                <ul className="main-menu">
                  <li>
                    <Link className={location.pathname === "/" && !location.search ? "active" : ""} to="/">Home</Link>
                  </li>
                  <li>
                    <Link className={location.search.includes("Travel%20Bags") ? "active" : ""} to="/shop?category=Travel%20Bags">Travel Collection</Link>
                  </li>
                  <li>
                    <Link className={location.search.includes("Laptop%20Bags") ? "active" : ""} to="/shop?category=Laptop%20Bags">Business Bags</Link>
                  </li>
                  <li>
                    <Link className={location.search.includes("Corporate%20Collection") ? "active" : ""} to="/shop?category=Corporate%20Collection">Corporate Gifting</Link>
                  </li>
                  <li>
                    <Link className={location.pathname === "/about" ? "active" : ""} to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link className={location.pathname === "/contact" ? "active" : ""} to="/contact">Contact Us</Link>
                  </li>
                </ul>
              </nav>

              {/* Hamburger Icon for Mobile — always visible on smaller screens */}
              <button
                className="burger-icon burger-icon-white"
                onClick={toggleMobileMenu}
                aria-label="Open mobile menu"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "5px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  borderRadius: "4px",
                  minWidth: "36px",
                  minHeight: "36px",
                }}
              >
                <span style={{ display: "block", width: "22px", height: "2px", background: "#253D4E", borderRadius: "2px", transition: "all 0.3s" }} />
                <span style={{ display: "block", width: "22px", height: "2px", background: "#253D4E", borderRadius: "2px", transition: "all 0.3s" }} />
                <span style={{ display: "block", width: "14px", height: "2px", background: "#253D4E", borderRadius: "2px", transition: "all 0.3s" }} />
              </button>
            </div>

            {/* Header Shop Utilities */}
            <div className="header-shop">
              {/* Account Dropdown — exact same as original HTML template */}
              <div
                ref={accountRef}
                className="d-inline-block box-dropdown-cart"
              >
                {/* Account trigger — same as original: span.icon-account */}
                <span
                  className="font-lg icon-list icon-account"
                  onClick={() => setAccountOpen((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                >
                  <span>Account</span>
                </span>

                {/* Dropdown — always in DOM, shown via dropdown-open class (matches original CSS) */}
                <div className={`dropdown-account${accountOpen ? " dropdown-open" : ""}`}>
                  <ul>
                    <li>
                      <Link to="/account?tab=notification" onClick={() => setAccountOpen(false)}>
                        My Account
                      </Link>
                    </li>
                    <li>
                      <Link to="/account?tab=order-tracking" onClick={() => setAccountOpen(false)}>
                        Order Tracking
                      </Link>
                    </li>
                    <li>
                      <Link to="/account?tab=orders" onClick={() => setAccountOpen(false)}>
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link to="/account?tab=wishlist" onClick={() => setAccountOpen(false)}>
                        My Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link to="/account?tab=setting" onClick={() => setAccountOpen(false)}>
                        Setting
                      </Link>
                    </li>
                    {user?.role === "admin" && (
                      <li>
                        <Link to="/dashboard" onClick={() => setAccountOpen(false)} style={{ color: "#3BB77E", fontWeight: "700" }}>
                          Admin Panel
                        </Link>
                      </li>
                    )}
                    <li>
                      {user ? (
                        <button
                          onClick={() => { logout(); setAccountOpen(false); }}
                          style={{ background: "none", border: "none", padding: 0, color: "#dc3545", cursor: "pointer", fontSize: "14px" }}
                        >
                          Sign out
                        </button>
                      ) : (
                        <Link to="/login" onClick={() => setAccountOpen(false)}>
                          Sign in
                        </Link>
                      )}
                    </li>
                  </ul>
                </div>
              </div>



              {/* Wishlist */}
              <Link className="font-lg icon-list icon-wishlist" to="/wishlist">
                <span>Wishlist</span>
                <span className="number-item font-xs">{wishlistItems.length}</span>
              </Link>

              {/* Cart Dropdown */}
              <div className="d-inline-block box-dropdown-cart">
                <Link className="font-lg icon-list icon-cart" to="/cart">
                  <span>Cart</span>
                  <span className="number-item font-xs">{itemCount}</span>
                </Link>
                <div className="dropdown-cart">
                  {cartItems.length > 0 ? (
                    <>
                      {cartItems.map((item) => (
                        <div className="item-cart mb-20" key={`${item.id}-${item.variant || ''}`}>
                          <div className="cart-image">
                            <img src={item.image} alt="BUXAA" />
                          </div>
                          <div className="cart-info">
                            <Link className="font-sm-bold color-brand-3" to={`/product/${item.slug}`}>
                              {item.name}
                            </Link>
                            <p>
                              <span className="color-brand-2 font-sm-bold">
                                {item.qty} x Rs. {Number(item.price || 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                              </span>
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id, item.variant)}
                            className="text-red-500 hover:text-red-700 ml-1 text-xs"
                            style={{ background: "none", border: "none" }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      <div className="border-bottom pt-0 mb-15"></div>
                      <div className="cart-total">
                        <div className="row">
                          <div className="col-6 text-start">
                            <span className="font-md-bold color-brand-3">Total</span>
                          </div>
                          <div className="col-6">
                            <span className="font-md-bold color-brand-1">Rs. {Number(total || 0).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span>
                          </div>
                        </div>
                        <div className="row mt-15">
                          <div className="col-6 text-start">
                            <Link className="btn btn-cart w-auto text-center" to="/cart">View cart</Link>
                          </div>
                          <div className="col-6">
                            <Link className="btn btn-buy w-auto text-center" to="/checkout">Checkout</Link>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-4 text-gray-500 text-xs">
                      Your cart is empty.
                    </div>
                  )}
                </div>
              </div>

              {/* Compare */}
              <Link className="font-lg icon-list icon-compare" to="/compare">
                <span>Compare</span>
                {compareItems.length > 0 && (
                  <span className="number-item font-xs bg-yellow-500">{compareItems.length}</span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
