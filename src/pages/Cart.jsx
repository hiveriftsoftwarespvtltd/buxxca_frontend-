import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, getImageUrl } from '../constants/storeData';
import ProductCard from '../components/ProductCard';
import { Sparkles, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, subtotal, appliedCoupon, setAppliedCoupon } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Coupon states
  const [couponInput, setCouponInput] = useState('');
  const [allCoupons, setAllCoupons] = useState([]);

  // Recommended products state
  const [recommended, setRecommended] = useState([]);

  // Fetch dynamic products to recommend some that are not in the cart
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        let allProducts = [];
        if (res.ok) {
          allProducts = await res.json();
        }
        // Filter out items already in the cart
        const cartIds = cartItems.map(item => item.id);
        const filtered = allProducts.filter(p => !cartIds.includes(p.id)).slice(0, 4);
        setRecommended(filtered);
      } catch (err) {
        console.error('Error fetching recommended products:', err);
        setRecommended([]);
      }
    };
    fetchProducts();
  }, [cartItems]);

  // Fetch active, non-expired coupons from the server
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const res = await fetch('/api/coupons');
        if (res.ok) {
          const data = await res.json();
          const now = new Date();
          const filtered = data.filter(c => c.isActive && (!c.expiryDate || new Date(c.expiryDate) > now));
          setAllCoupons(filtered);
        }
      } catch (err) {
        console.error('Error fetching coupons:', err);
      }
    };
    fetchCoupons();
  }, []);

  const fireConfetti = useCallback(() => {
    // Get coupon input position to shoot from there
    const inputEl = document.getElementById('coupon-input');
    const rect = inputEl?.getBoundingClientRect();
    const originX = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
    const originY = rect ? rect.top / window.innerHeight : 0.65;

    const COLORS = [
      '#FF4E91', '#FF9A3C', '#FFD93D', '#6BCB77',
      '#4D96FF', '#C77DFF', '#FF6B6B', '#00C9A7',
      '#FFB703', '#FFFFFF', '#C9A84C', '#E3B85A'
    ];

    const burst = (delay, ox, oy, count, spread, angle) => {
      setTimeout(() => {
        confetti({
          particleCount: count,
          spread,
          angle,
          origin: { x: ox, y: oy },
          colors: COLORS,
          scalar: 1.2,
          gravity: 0.9,
          ticks: 300,
          shapes: ['square', 'circle'],
          drift: 0
        });
      }, delay);
    };

    // Central mega-burst from input
    burst(0,   originX, originY, 160, 100, 90);
    // Left cannon
    burst(80,  0.1,     0.6,     90,  70,  60);
    // Right cannon
    burst(80,  0.9,     0.6,     90,  70,  120);
    // Top-left arc
    burst(200, 0.2,     0.3,     70,  80,  75);
    // Top-right arc
    burst(200, 0.8,     0.3,     70,  80,  105);
    // Final full-screen shower
    burst(400, 0.5,     0.2,     140, 180, 90);
  }, []);

  const applyCouponByCode = async (code) => {
    try {
      const savedUser = localStorage.getItem('buxaa-user');
      let email = undefined;
      if (savedUser) {
        try {
          email = JSON.parse(savedUser).email;
        } catch (e) {
          console.error(e);
        }
      }

      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal, email })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAppliedCoupon(data.coupon);
        fireConfetti();
        showToast(`🎉 Coupon "${data.coupon.code}" applied! ${data.coupon.desc}`, 'success');
        setCouponInput('');
      } else {
        showToast(data.message || '❌ Invalid coupon code', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Error validating coupon code', 'error');
    }
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    applyCouponByCode(code);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon discount removed', 'success');
  };

  // Pricing math matching legacy HTML exactly
  let discountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discountAmount = Math.round(subtotal * (appliedCoupon.value / 100));
      if (appliedCoupon.maxDiscount !== null && appliedCoupon.maxDiscount !== undefined) {
        discountAmount = Math.min(discountAmount, appliedCoupon.maxDiscount);
      }
    } else if (appliedCoupon.type === 'fixed') {
      discountAmount = appliedCoupon.value;
    }
  }

  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const shippingCharge = discountedSubtotal >= 10000 ? 0 : 99;
  const gstTax = Math.round(discountedSubtotal * 0.18);
  const finalTotal = discountedSubtotal + shippingCharge + gstTax;

  const handleProceedToCheckout = () => {
    const saved = localStorage.getItem('buxaa-user');
    if (!saved) {
      showToast('Please sign in to proceed to checkout.', 'error');
      navigate('/account?redirect=/checkout');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="page-transition" style={{ background: 'var(--ivory)', minHeight: '100vh' }}>
      <Helmet>
        <title>Shopping Cart | BUXAA</title>
        <meta name="description" content="Review your selected premium bags and travel gear in your cart before checking out." />
      </Helmet>
      
      {/* ── Page Hero ── */}
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link><span> › </span>
            <span>Shopping Cart</span>
          </div>
          <h1>Your Cart</h1>
          <p style={{ color: 'var(--text-light)', marginTop: '0.5rem', fontSize: '0.9rem' }}>
            Review your selected items and proceed to secure checkout. You're just one step away from your next journey.
          </p>
        </div>
      </div>

      <main className="container">
        
        {/* If cart is empty */}
        {cartItems.length === 0 ? (
          <div className="wishlist-empty" style={{ textAlignment: 'center', padding: '5rem 2rem', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="empty-icon" style={{ fontSize: '4rem', marginBottom: '1rem', opacity: 0.5 }}>🛍️</div>
            <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-mid)', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem' }}>Your cart is empty</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Looks like you haven't added any bags to your cart yet.</p>
            <Link to="/shop" className="btn btn-gold" style={{ padding: '0.8rem 2rem', fontSize: '0.85rem', tracking: '0.1em' }}>Explore Bags →</Link>
          </div>
        ) : (
          /* Cart Layout with items */
          <div className="cart-layout">
            
            {/* Left Side: Cart Items */}
            <div className="cart-items">
              <div className="cart-header">
                <span>Product</span>
                <span>Price</span>
                <span style={{ textAlign: 'center' }}>Quantity</span>
                <span>Total</span>
                <span></span>
              </div>

              {/* Items List */}
              <div id="cart-items-list">
                {cartItems.map((item, idx) => (
                  <div 
                    key={`${item.id}-${item.size}-${idx}`} 
                    className="cart-item"
                  >
                    <div className="cart-item-product">
                      <Link to={`/product/${item.slug}`}>
                        <img 
                          src={getImageUrl(item.img)} 
                          alt={item.name} 
                          className="cart-item-image" 
                        />
                      </Link>
                      <div>
                        <Link to={`/product/${item.slug}`} className="cart-item-name">
                          {item.name}
                        </Link>
                        <div className="cart-item-variant">
                          {item.brand} · {item.size}
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id, item.size)} 
                          style={{ background: 'none', border: 'none', fontSize: '0.78rem', color: 'var(--gold-dark)', textDecoration: 'underline', cursor: 'pointer', marginTop: '0.5rem', padding: 0, display: 'inline-block' }}
                        >
                          Remove
                        </button>
                      </div>
                    {/* Mobile-only: price + qty + total inline */}
                    <div className="cart-item-mobile-row" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 600 }}>{formatPrice(item.price)} ×</span>
                      <div className="qty-control" style={{ display: 'inline-flex', height: '28px' }}>
                        <button style={{ width: '26px', height: '28px', fontSize: '0.85rem' }} onClick={() => updateQty(item.id, item.size, item.quantity - 1)}>−</button>
                        <input type="number" value={item.quantity} min="1" readOnly aria-label="Quantity" style={{ width: '30px', height: '28px', fontSize: '0.78rem', textAlign: 'center' }} />
                        <button style={{ width: '26px', height: '28px', fontSize: '0.85rem' }} onClick={() => updateQty(item.id, item.size, item.quantity + 1)}>+</button>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-dark)' }}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    </div>

                    {/* Desktop columns — hidden on mobile via CSS */}
                    <div className="cart-item-price">{formatPrice(item.price)}</div>
                    <div className="cart-item-qty-desktop">
                      <div className="qty-control">
                        <button onClick={() => updateQty(item.id, item.size, item.quantity - 1)}>−</button>
                        <input type="number" value={item.quantity} min="1" readOnly aria-label="Quantity" />
                        <button onClick={() => updateQty(item.id, item.size, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <div className="cart-item-total">{formatPrice(item.price * item.quantity)}</div>

                    <button className="cart-remove" onClick={() => removeFromCart(item.id, item.size)} aria-label={`Remove ${item.name}`}>✕</button>
                  </div>
                ))}
              </div>
              
              {/* Cart Footer Options */}
              <div className="cart-footer" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <form className="coupon-form" onSubmit={handleApplyCoupon} id="coupon-form">
                    <input 
                      type="text" 
                      placeholder="Coupon code" 
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      id="coupon-input" 
                      aria-label="Coupon code" 
                    />
                    <button type="submit">
                      Apply
                    </button>
                  </form>
                  <Link to="/shop" style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 700 }}>
                    ← Continue Shopping
                  </Link>
                </div>


              </div>
            </div>

            {/* Right Side: Order Summary */}
            <aside className="cart-summary" aria-label="Order summary">
              <h3>Order Summary</h3>
              
              <div className="summary-line">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="summary-line" style={{ color: '#22C55E', alignItems: 'flex-start' }}>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      Coupon Discount
                      <button onClick={handleRemoveCoupon} style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', padding: 0, fontSize: '0.7rem', flexShrink: 0 }}>✕</button>
                    </span>
                    <span style={{
                      fontSize: '0.68rem', fontFamily: 'monospace', fontWeight: 700,
                      color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0',
                      borderRadius: '3px', padding: '1px 5px',
                      maxWidth: '120px', overflow: 'hidden',
                      textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      display: 'block'
                    }} title={appliedCoupon?.code}>
                      {appliedCoupon?.code}
                    </span>
                  </span>
                  <span style={{ flexShrink: 0 }}>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="summary-line">
                <span>Shipping</span>
                <span>
                  {shippingCharge === 0 ? 'FREE' : formatPrice(shippingCharge)}
                </span>
              </div>

              <div className="summary-line">
                <span>GST (18%)</span>
                <span>{formatPrice(gstTax)}</span>
              </div>

              <div className="summary-line total">
                <span>Total</span>
                <span className="price-current">{formatPrice(finalTotal)}</span>
              </div>

              <p className="summary-shipping-note" id="free-shipping-note" style={{ fontSize: '0.75rem', color: 'var(--gold-dark)', margin: '1rem 0 0', fontStyle: 'italic', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {shippingCharge > 0 ? (
                  `Add ${formatPrice(10000 - subtotal)} more for FREE shipping!`
                ) : (
                  <span>You have unlocked complimentary FREE shipping!</span>
                )}
              </p>

              <button 
                onClick={handleProceedToCheckout} 
                className="btn btn-gold btn-full" 
                style={{ marginTop: '1.25rem', width: '100%', cursor: 'pointer' }}
              >
                Proceed to Checkout →
              </button>

              <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                <p style={{ fontSize: '0.72rem', color: 'var(--text-pale)', margin: '0.5rem 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                  <Lock size={12} /> 100% Secure Checkout Secured Gateway
                </p>
              </div>
            </aside>

          </div>
        )}

        {/* ── Complete Your Collection / Recommended ── */}
        {recommended.length > 0 && (
          <section style={{ padding: '4rem 0 0' }} aria-label="Recommended products">
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-eyebrow" style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>You Might Like</span>
              <h2 className="section-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--text-dark)' }}>Complete Your Collection</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommended.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

      </main>

    </div>
  );
}
