import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useToast } from '../context/ToastContext';
import { Mail } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useToast();
  const location = useLocation();

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      Swal.fire({
        title: 'Subscribed! 🎉',
        html: `Thank you for subscribing! We have sent a welcome email to <strong style="color: #D4A23A;">${email}</strong>.`,
        icon: 'success',
        confirmButtonText: 'Awesome',
        confirmButtonColor: '#D4A23A',
        background: '#FFFFFF',
        color: '#04152F'
      });
      setEmail('');
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        
        {/* ── Newsletter Row ── */}
        <div className="footer-newsletter-row">
          <div className="footer-newsletter-left">
            <div className="newsletter-icon-wrap">
              <Mail size={24} className="text-[#D4A23A]" />
            </div>
            <div className="newsletter-text-wrap">
              <h3>Travel Smarter with BUXAA</h3>
              <p>Receive travel tips, product updates, and exclusive member benefits.</p>
            </div>
          </div>
          <form onSubmit={handleSubscribe} className="footer-newsletter-right">
            <input
              type="email"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="btn-gold">
              Get Updates
            </button>
          </form>
        </div>

        {/* ── Main Footer Grid ── */}
        <div className="footer-grid">

          {/* Column 1: Brand Info */}
          <div className="footer-col footer-brand">
            <Link to="/" className="footer-logo-wrap" onClick={handleLogoClick}>
              <img
                src="/images/buxaa-logo.png?v=2"
                alt="BUXAA"
                className="footer-logo-img"
              />
            </Link>
            <p className="footer-tagline">
              Premium bags & storage solutions crafted for modern travelers and professionals.
            </p>
            {/* Social Icons */}
            <div className="footer-social-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.107C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.387.511a3.003 3.003 0 0 0-2.11 2.107C0 8.053 0 12 0 12s0 3.947.503 5.837a3.003 3.003 0 0 0 2.11 2.107c1.882.511 9.387.511 9.387.511s7.505 0 9.387-.511a3.003 3.003 0 0 0 2.11-2.107C24 15.947 24 12 24 12s0-3.947-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Explore BUXAA */}
          <div className="footer-col">
            <h5>EXPLORE BUXAA</h5>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/shop">Our Collections</Link></li>
              <li><Link to="/shop?sort=new">New Arrivals</Link></li>
              <li><Link to="/shop?filter=bestseller">Best Sellers</Link></li>
              <li><Link to="/shop?cat=corporate-gifting">Corporate Gifting</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="footer-col">
            <h5>CUSTOMER SERVICE</h5>
            <ul className="footer-links">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/refund-policy">Refund Policy</Link></li>
              <li><Link to="/terms-conditions">Terms & Conditions</Link></li>
              <li><Link to="/account">Track Your Order</Link></li>
            </ul>
          </div>

          {/* Column 4: My Account */}
          <div className="footer-col">
            <h5>MY ACCOUNT</h5>
            <ul className="footer-links">
              <li><Link to="/account">My Account</Link></li>
              <li><Link to="/account?tab=orders">Order History</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/account">Login / Register</Link></li>
              <li><Link to="/account?tab=addresses">Manage Addresses</Link></li>
              <li><Link to="/contact">Support Center</Link></li>
            </ul>
          </div>

          {/* Column 5: Download App & Payments */}
          <div className="footer-col footer-col-apps">
            {/* <h5>DOWNLOAD OUR APP</h5>
            <div className="app-download-badges">
              <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="app-badge">
                <img 
                  src="/images/google-play.svg" 
                  alt="Get it on Google Play" 
                />
              </a>
              <a href="https://apple.com" target="_blank" rel="noopener noreferrer" className="app-badge">
                <img 
                  src="/images/app-store.svg" 
                  alt="Download on the App Store" 
                />
              </a>
            </div> */}
            <div className="payment-accept-section">
              <span className="payment-title">WE ACCEPT</span>
              <div className="payment-logos">
                <div className="pay-logo-card">
                  <img src="/images/visa.png" alt="VISA" />
                </div>
                <div className="pay-logo-card">
                  <img src="/images/mastercard.svg" alt="Mastercard" />
                </div>
                <div className="pay-logo-card font-bold text-[8px] text-[#0A234D] flex items-center justify-center bg-white px-1">
                  RuPay
                </div>
                <div className="pay-logo-card">
                  <img src="/images/upi.svg" alt="UPI" />
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Footer Bottom Strip ── */}
        <div className="footer-bottom">
          <div className="footer-bottom-links">
            <Link to="/about">Our Story</Link>
            <span>|</span>
            <Link to="/shop?cat=travel-bags">Travel Bags</Link>
            <span>|</span>
            <Link to="/shop?sort=new">New Arrivals</Link>
            <span>|</span>
            <Link to="/shop?filter=bestseller">Best Sellers</Link>
            <span>|</span>
            <Link to="/about">Support</Link>
          </div>
          <p className="footer-copyright">
            © {new Date().getFullYear()} BUXAA. All rights reserved. Developed by <a href="https://hiverift.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>hiverift.com</a>
          </p>
        </div>

      </div>
    </footer>
  );
}


