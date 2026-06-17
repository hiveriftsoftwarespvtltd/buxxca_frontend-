import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { formatPrice } from '../constants/storeData';
import { Check, CheckCircle2, Package, Truck, Gift, Mail, Phone, Loader2 } from 'lucide-react';


export default function OrderConfirmation() {
  const location = useLocation();
  const {
    orderId      = 'BXX-2407',
    customerName = 'Guest Customer',
    totalAmount  = 4999,
    email        = '',
    address      = 'Not Specified'
  } = location.state || {};

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Extract orderId from URL query parameter or location state
  const queryParams = new URLSearchParams(location.search);
  const urlOrderId = queryParams.get('orderId');
  const finalOrderId = urlOrderId || orderId;

  useEffect(() => {
    setLoading(true);
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const found = data.find(o => o.id === finalOrderId);
          if (found) {
            setOrder(found);
          }
        }
      })
      .catch(err => console.error('Error fetching order tracking details:', err))
      .finally(() => setLoading(false));
  }, [finalOrderId]);

  const displayOrderId = order ? order.id : finalOrderId;
  const displayCustomerName = order ? order.customer : customerName;
  const displayTotalAmount = order ? order.total : totalAmount;
  const displayEmail = order ? order.email : email;
  const displayAddress = order ? order.address : address;
  const displayStatus = order ? order.status : 'pending';

  // Helper to determine status stage
  const getStatusStage = (status) => {
    const s = (status || '').toLowerCase().trim();
    if (s === 'delivered' || s === 'completed' || s === 'complete') return 4;
    if (s === 'shipped' || s === 'out for delivery' || s === 'dispatched') return 3;
    if (s === 'packed' || s === 'being packed' || s === 'ready') return 2;
    return 1; // pending / processing / confirmed
  };

  const currentStage = getStatusStage(displayStatus);

  if (loading && urlOrderId) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60vh', background: 'var(--ivory)' }}>
        <Helmet>
          <title>Order Placed Successfully | BUXAA</title>
          <meta name="description" content="Thank you for shopping at BUXAA. Your order is confirmed and is being processed." />
        </Helmet>
        <Loader2 className="animate-spin text-[var(--gold)] mb-4" size={32} />
        <p className="text-sm font-semibold text-[var(--text-light)]">Fetching Order Tracking Information...</p>
      </div>
    );
  }

  return (
    <div className="page-transition">
      <Helmet>
        <title>Order Placed Successfully | BUXAA</title>
        <meta name="description" content="Thank you for shopping at BUXAA. Your order is confirmed and is being processed." />
      </Helmet>
      <main className="container">

        <div className="order-confirm-page page">

          {/* ── Success Icon — uses legacy .order-confirm-icon CSS with gold pulse ── */}
          <div className="order-confirm-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={28} strokeWidth={3} className="text-[#C9A84C]" /></div>

          <span className="section-eyebrow">Your BUXAA Order Has Been Confirmed</span>

          <h1 style={{ fontSize: '2.2rem', margin: '0.5rem 0' }}>
            Your BUXAA Order Has Been Confirmed
          </h1>

          <p style={{ color: 'var(--text-light)', maxWidth: '500px', margin: '0 auto 1rem', lineHeight: '1.7' }}>
            We've received your order and sent a confirmation email. Our team is now preparing your order for shipment.
          </p>

          {/* ── Order Number — uses legacy .order-confirm-number CSS ── */}
          <div className="order-confirm-number" id="order-number">
            {displayOrderId}
          </div>

          <p style={{ color: 'var(--text-pale)', fontSize: '0.85rem', marginBottom: '2rem' }}>
            Please keep this order number for tracking. Confirmation sent to your email.
          </p>

          {/* ── Tracking Steps — exact legacy .order-tracking-steps structure ── */}
          <div className="order-tracking-steps">

            <div className={`tracking-step ${currentStage >= 1 ? 'active' : ''}`}>
              <div className="tracking-step-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}><CheckCircle2 size={16} /></div>
              <div className="tracking-step-label">Order<br />Confirmed</div>
            </div>

            <div className={`tracking-connector ${currentStage >= 2 ? 'active' : ''}`}></div>

            <div className={`tracking-step ${currentStage >= 2 ? 'active' : ''}`}>
              <div className="tracking-step-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}><Package size={16} /></div>
              <div className="tracking-step-label">Being<br />Packed</div>
            </div>

            <div className={`tracking-connector ${currentStage >= 3 ? 'active' : ''}`}></div>

            <div className={`tracking-step ${currentStage >= 3 ? 'active' : ''}`}>
              <div className="tracking-step-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}><Truck size={16} /></div>
              <div className="tracking-step-label">Out for<br />Delivery</div>
            </div>

            <div className={`tracking-connector ${currentStage >= 4 ? 'active' : ''}`}></div>

            <div className={`tracking-step ${currentStage >= 4 ? 'active' : ''}`}>
              <div className="tracking-step-icon" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'inherit' }}><Gift size={16} /></div>
              <div className="tracking-step-label">Delivered<br />to You</div>
            </div>

          </div>

          {/* ── Order Info Box ── */}
          <div style={{
            background: 'var(--white)', border: '1px solid var(--border)',
            borderRadius: '4px', padding: '1.5rem', textAlign: 'left',
            maxWidth: '600px', margin: '0 auto 2rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
          }}>
            <h4 style={{
              fontFamily: 'Playfair Display, serif', fontSize: '0.85rem',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              color: 'var(--text-dark)', borderBottom: '1px solid var(--border)',
              paddingBottom: '0.75rem', marginBottom: '1rem'
            }}>
              Order Information
            </h4>
            <div className="order-info-grid">
              <div>
                <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.78rem', marginBottom: '0.2rem' }}>Order ID Number</span>
                <strong style={{ color: 'var(--text-dark)', fontSize: '0.95rem' }}>{displayOrderId}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.78rem', marginBottom: '0.2rem' }}>Total Amount Paid</span>
                <strong style={{ color: 'var(--gold-dark)', fontSize: '0.95rem' }}>{formatPrice(displayTotalAmount)}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.78rem', marginBottom: '0.2rem' }}>Recipient Name</span>
                <strong style={{ color: 'var(--text-dark)' }}>{displayCustomerName}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.78rem', marginBottom: '0.2rem' }}>Email Confirmation</span>
                <strong style={{ color: 'var(--text-dark)', wordBreak: 'break-word' }}>{displayEmail || 'Sent to registered address'}</strong>
              </div>
              <div className="order-info-full">
                <span style={{ color: 'var(--text-light)', display: 'block', fontSize: '0.78rem', marginBottom: '0.2rem' }}>Shipping Address</span>
                <strong style={{ color: 'var(--text-dark)', lineHeight: '1.6' }}>{displayAddress}</strong>
              </div>
            </div>
          </div>

          {/* ── 3 Info Cards — exact legacy structure ── */}
          <div className="order-info-cards">
            <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--gold-dark)', marginBottom: '0.5rem' }}><Truck size={32} /></div>
              <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Estimated Delivery</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>5–7 Business Days</span>
            </div>
            <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--gold-dark)', marginBottom: '0.5rem' }}><Mail size={32} /></div>
              <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Confirmation Sent</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>Check your inbox</span>
            </div>
            <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--gold-dark)', marginBottom: '0.5rem' }}><Phone size={32} /></div>
              <strong style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Need Assistance?</strong>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>01149409211</span>
            </div>
          </div>

          {/* ── CTA Buttons — exact legacy structure ── */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0' }}>
            <Link to="/shop" className="btn btn-gold" id="continue-shopping-btn">
              Continue Shopping →
            </Link>
            <Link to="/account" className="btn btn-outline" id="view-orders-btn">
              View My Orders
            </Link>
          </div>

          {/* ── Quote Box — exact legacy structure ── */}
          <div style={{
            marginTop: '3rem', padding: '2rem',
            background: 'linear-gradient(135deg, var(--text-dark), var(--text-mid))',
            borderRadius: '4px', maxWidth: '600px', margin: '3rem auto 0',
            textAlign: 'center'
          }}>
            <p style={{
              fontFamily: 'Playfair Display, serif',
              fontStyle: 'italic',
              fontSize: '1.1rem',
              color: 'var(--gold-light)',
              lineHeight: '1.7',
              margin: 0
            }}>
              "Every journey starts with a single step. We're honored to be part of yours.<br />
              Thank you for choosing BUXAA."
            </p>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-pale)', marginTop: '0.75rem', display: 'block' }}>
              — The BUXAA Team
            </span>
          </div>

        </div>
      </main>
    </div>
  );
}
