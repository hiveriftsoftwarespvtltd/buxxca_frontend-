import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { User, Heart, ShoppingBag, Search, X, Truck, MapPin, Phone } from 'lucide-react';

export default function Header() {
  const [showBanner, setShowBanner] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('buxaa-user'));

  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(!!localStorage.getItem('buxaa-user'));
    };
    window.addEventListener('storage', checkAuth);
    window.addEventListener('auth-change', checkAuth);
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('auth-change', checkAuth);
    };
  }, []);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('buxaa-user'));
  }, [location]);

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Travel Bags', path: '/shop?cat=travel-bags' },
    { label: 'All Bags & Gear', path: '/shop?cat=laptop-bags' },
    { label: 'Corporate Gifting', path: '/shop?cat=corporate-gifting' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* ── Top Announcement Banner ── */}
      {showBanner && (
        <div className="top-banner">
          <div className="top-banner-inner">
            <div className="top-banner-left">
              <Truck size={14} style={{ marginRight: '0.4rem' }} />
              <span>Free Shipping on Orders Above ₹10,000</span>
            </div>
            <div className="top-banner-right">
              <Link to="/account" className="top-banner-link">
                <MapPin size={12} style={{ marginRight: '0.25rem' }} />
                <span>Track Order</span>
              </Link>
              <span className="top-banner-sep">|</span>
              <Link to="/about" className="top-banner-link">
                <Phone size={12} style={{ marginRight: '0.25rem' }} />
                <span>Support</span>
              </Link>
              {!isLoggedIn && (
                <>
                  <span className="top-banner-sep">|</span>
                  <Link to="/account" className="top-banner-link">
                    <User size={12} style={{ marginRight: '0.25rem' }} />
                    <span>Create Account</span>
                  </Link>
                </>
              )}
            </div>
          </div>
          <span className="close-banner" onClick={() => setShowBanner(false)}>✕</span>
        </div>
      )}

      {/* ── Navbar ── */}
      <nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="nav-inner">

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`nav-mobile-toggle ${isMobileMenuOpen ? 'open' : ''}`}
            aria-label="Toggle menu"
            style={{ border: 'none', background: 'transparent' }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center' }} onClick={handleLogoClick}>
            <img
              src="/images/buxaa-logo.png?v=2"
              alt="Buxaa"
              className="nav-logo-img"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            {navItems.map((item) => (
              <li key={item.label} style={{ listStyle: 'none' }}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => {
                    const currentFullPath = location.pathname + location.search;
                    if (item.path === '/') {
                      return currentFullPath === '/' ? 'active' : '';
                    }
                    return currentFullPath === item.path ? 'active' : '';
                  }}
                  onClick={(e) => {
                    if (item.path === '/' && location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Action Icons */}
          <div className="nav-actions" style={{ position: 'relative' }}>
            <button
              className="nav-icon-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none' }}
            >
              <Search size={20} strokeWidth={1.5} />
            </button>
            
            {/* ── Premium Dropdown Search ── */}
            {isSearchOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: '0',
                  width: '320px',
                  background: '#FFFFFF',
                  border: '1px solid #EAEAEA',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  padding: '1rem',
                  zIndex: 50,
                  animation: 'fadeIn 0.2s ease-out forwards'
                }}
              >
                <form 
                  onSubmit={(e) => { handleSearchSubmit(e); setIsSearchOpen(false); }} 
                  style={{ display: 'flex', alignItems: 'center', background: '#F5F5F5', borderRadius: '4px', padding: '0.25rem 0.5rem' }}
                >
                  <Search size={16} color="#0A234D" style={{ opacity: 0.6 }} />
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    style={{
                      border: 'none',
                      background: 'transparent',
                      width: '100%',
                      padding: '0.5rem',
                      outline: 'none',
                      fontSize: '0.9rem',
                      color: '#0A234D'
                    }}
                  />
                  <button 
                    type="button" 
                    onClick={() => setIsSearchOpen(false)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
                  >
                    <X size={16} color="#0A234D" style={{ opacity: 0.6 }} />
                  </button>
                </form>
              </div>
            )}

            <Link to="/wishlist" className="nav-icon-btn" aria-label="Wishlist" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={20} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="nav-badge">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="nav-icon-btn" aria-label="Cart" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartCount > 0 && (
                <span className="nav-badge">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="nav-icon-btn" aria-label="Account" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Login / Register">
              <User size={20} strokeWidth={1.5} />
            </Link>
          </div>

        </div>
      </nav>

      {/* ── Mobile Sidebar Drawer Menu ── */}
      {isMobileMenuOpen && (
        <>
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="mobile-nav-overlay open"
          />
          <nav className="mobile-nav open" style={{ display: 'block' }}>
            <div className="nav-logo" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src="/images/buxaa-logo.png?v=2" alt="Buxaa" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
                {/* <span className="logo-name" style={{ margin: 0 }}>Buxaa</span> */}
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={1.8} style={{ color: 'var(--text-dark)' }} />
              </button>
            </div>

            <form onSubmit={handleSearchSubmit} className="nav-search" style={{ width: '100%', marginBottom: '1.5rem' }}>
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', minWidth: 0 }}
              />
              <button type="submit" style={{ border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: '0 0.75rem' }}>
                <Search size={16} strokeWidth={1.8} style={{ color: 'var(--gold-dark)' }} />
              </button>
            </form>

            <NavLink
              to="/"
              end
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop?cat=travel-bags"
              className={({ isActive }) => (location.pathname + location.search) === '/shop?cat=travel-bags' ? 'active' : ''}
            >
              Travel Bags
            </NavLink>
            <NavLink
              to="/shop?cat=laptop-bags"
              className={({ isActive }) => (location.pathname + location.search) === '/shop?cat=laptop-bags' ? 'active' : ''}
            >
              All Bags & Gear
            </NavLink>
            <NavLink
              to="/shop?cat=corporate-gifting"
              className={({ isActive }) => (location.pathname + location.search) === '/shop?cat=corporate-gifting' ? 'active' : ''}
            >
              Corporate Gifting
            </NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>
            <NavLink to="/wishlist">My Wishlist</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/account">My Account</NavLink>
          </nav>
        </>
      )}
    </>
  );
}
