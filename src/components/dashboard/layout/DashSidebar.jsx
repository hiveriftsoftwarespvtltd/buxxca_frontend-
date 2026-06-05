import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const DashSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isActive = (path) => {
    if (path === "/dashboard") return location.pathname === "/dashboard";
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="navbar-aside" id="offcanvas_aside">
      <div className="aside-top">
        <Link className="brand-wrap" to="/dashboard">
          <img className="logo" src="/dash-assets/imgs/theme/logo.svg" alt="Evara Dashboard" />
        </Link>
        <div>
          <button
            className="btn btn-icon btn-aside-minimize"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <i className="text-muted material-icons md-menu_open"></i>
          </button>
        </div>
      </div>

      <nav>
        <ul className="menu-aside">
          {/* Dashboard */}
          <li className={`menu-item ${isActive("/dashboard") && location.pathname === "/dashboard" ? "active" : ""}`}>
            <Link className="menu-link" to="/dashboard">
              <i className="icon material-icons md-home"></i>
              <span className="text">Dashboard</span>
            </Link>
          </li>

          {/* Products */}
          <li className={`menu-item has-submenu ${isActive("/dashboard/products") || isActive("/dashboard/categories") ? "active" : ""}`}>
            <a
              className="menu-link"
              href="#products"
              onClick={(e) => { e.preventDefault(); toggleMenu("products"); }}
            >
              <i className="icon material-icons md-shopping_bag"></i>
              <span className="text">Products</span>
            </a>
            <div className={`submenu ${openMenus.products ? "show" : ""}`} style={{ display: openMenus.products ? "block" : "none" }}>
              <Link to="/dashboard/products">Product List</Link>
              <Link to="/dashboard/products/grid">Product grid</Link>
              <Link to="/dashboard/products/grid-2">Product grid 2</Link>
              <Link to="/dashboard/categories">Categories</Link>
            </div>
          </li>

          {/* Orders */}
          <li className={`menu-item has-submenu ${isActive("/dashboard/orders") ? "active" : ""}`}>
            <a
              className="menu-link"
              href="#orders"
              onClick={(e) => { e.preventDefault(); toggleMenu("orders"); }}
            >
              <i className="icon material-icons md-shopping_cart"></i>
              <span className="text">Orders</span>
            </a>
            <div className="submenu" style={{ display: openMenus.orders ? "block" : "none" }}>
              <Link to="/dashboard/orders">Order list 1</Link>
              <Link to="/dashboard/orders/v2">Order list 2</Link>
              <Link to="/dashboard/orders/SK2540">Order detail</Link>
              <Link to="/dashboard/orders/SK2540/tracking">Order tracking</Link>
              <Link to="/dashboard/orders/SK2540/invoice">Invoice</Link>
            </div>
          </li>

          {/* Sellers */}
          <li className={`menu-item has-submenu ${isActive("/dashboard/sellers") ? "active" : ""}`}>
            <a
              className="menu-link"
              href="#sellers"
              onClick={(e) => { e.preventDefault(); toggleMenu("sellers"); }}
            >
              <i className="icon material-icons md-store"></i>
              <span className="text">Sellers</span>
            </a>
            <div className="submenu" style={{ display: openMenus.sellers ? "block" : "none" }}>
              <Link to="/dashboard/sellers">Sellers cards</Link>
              <Link to="/dashboard/sellers/list">Sellers list</Link>
              <Link to="/dashboard/sellers/1">Seller profile</Link>
            </div>
          </li>

          {/* Add Product */}
          <li className={`menu-item has-submenu ${isActive("/dashboard/products/add") ? "active" : ""}`}>
            <a
              className="menu-link"
              href="#addproduct"
              onClick={(e) => { e.preventDefault(); toggleMenu("addProduct"); }}
            >
              <i className="icon material-icons md-add_box"></i>
              <span className="text">Add product</span>
            </a>
            <div className="submenu" style={{ display: openMenus.addProduct ? "block" : "none" }}>
              <Link to="/dashboard/products/add">Add product 1</Link>
              <Link to="/dashboard/products/add/v2">Add product 2</Link>
              <Link to="/dashboard/products/add/v3">Add product 3</Link>
              <Link to="/dashboard/products/add/v4">Add product 4</Link>
            </div>
          </li>

          {/* Transactions */}
          <li className={`menu-item has-submenu ${isActive("/dashboard/transactions") ? "active" : ""}`}>
            <a
              className="menu-link"
              href="#transactions"
              onClick={(e) => { e.preventDefault(); toggleMenu("transactions"); }}
            >
              <i className="icon material-icons md-monetization_on"></i>
              <span className="text">Transactions</span>
            </a>
            <div className="submenu" style={{ display: openMenus.transactions ? "block" : "none" }}>
              <Link to="/dashboard/transactions">Transaction 1</Link>
              <Link to="/dashboard/transactions/v2">Transaction 2</Link>
              <Link to="/dashboard/transactions/SK2540">Transaction Details</Link>
            </div>
          </li>

          {/* Account */}
          <li className={`menu-item has-submenu ${isActive("/dashboard/settings") ? "active" : ""}`}>
            <a
              className="menu-link"
              href="#account"
              onClick={(e) => { e.preventDefault(); toggleMenu("account"); }}
            >
              <i className="icon material-icons md-person"></i>
              <span className="text">Account</span>
            </a>
            <div className="submenu" style={{ display: openMenus.account ? "block" : "none" }}>
              <Link to="/login">User login</Link>
              <Link to="/register">User registration</Link>
            </div>
          </li>

          {/* Reviews */}
          <li className={`menu-item ${isActive("/dashboard/reviews") ? "active" : ""}`}>
            <Link className="menu-link" to="/dashboard/reviews">
              <i className="icon material-icons md-comment"></i>
              <span className="text">Reviews</span>
            </Link>
          </li>

          {/* Brands */}
          <li className={`menu-item ${isActive("/dashboard/brands") ? "active" : ""}`}>
            <Link className="menu-link" to="/dashboard/brands">
              <i className="icon material-icons md-stars"></i>
              <span className="text">Brands</span>
            </Link>
          </li>

          {/* Statistics (disabled) */}
          <li className="menu-item">
            <a className="menu-link" href="#" style={{ opacity: 0.5, cursor: "not-allowed" }}>
              <i className="icon material-icons md-pie_chart"></i>
              <span className="text">Statistics</span>
            </a>
          </li>
        </ul>

        <hr />

        <ul className="menu-aside">
          {/* Settings */}
          <li className={`menu-item has-submenu ${isActive("/dashboard/settings") ? "active" : ""}`}>
            <a
              className="menu-link"
              href="#settings"
              onClick={(e) => { e.preventDefault(); toggleMenu("settings"); }}
            >
              <i className="icon material-icons md-settings"></i>
              <span className="text">Settings</span>
            </a>
            <div className="submenu" style={{ display: openMenus.settings ? "block" : "none" }}>
              <Link to="/dashboard/settings">Setting sample 1</Link>
              <Link to="/dashboard/settings/v2">Setting sample 2</Link>
            </div>
          </li>

          {/* View Storefront */}
          <li className="menu-item">
            <Link className="menu-link" to="/">
              <i className="icon material-icons md-local_offer"></i>
              <span className="text">Storefront</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
export default DashSidebar;
