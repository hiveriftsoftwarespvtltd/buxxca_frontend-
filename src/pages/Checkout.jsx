import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatPrice, getImageUrl } from '../constants/storeData';
import { 
  Home as HomeIcon, 
  MapPin, 
  Phone, 
  Plus, 
  Smartphone, 
  CreditCard, 
  Globe, 
  Banknote, 
  Lock, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Check, 
  Loader2,
  ShoppingBag,
  RotateCcw
} from 'lucide-react';


export default function Checkout() {
  const { cartItems, count: cartCount, subtotal, clearCart, appliedCoupon, setAppliedCoupon } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Multi-step workflow state
  const [currentStep, setCurrentStep] = useState(1); // 1 = Address, 2 = Payment

  // Address Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [billingState, setBillingState] = useState('');
  const [pincode, setPincode] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);

  // Billing Address Form States
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billFirstName, setBillFirstName] = useState('');
  const [billLastName, setBillLastName] = useState('');
  const [billPhone, setBillPhone] = useState('');
  const [billAddress1, setBillAddress1] = useState('');
  const [billAddress2, setBillAddress2] = useState('');
  const [billCity, setBillCity] = useState('');
  const [billState, setBillState] = useState('');
  const [billPincode, setBillPincode] = useState('');
  const [selectedBillingAddressId, setSelectedBillingAddressId] = useState('');

  // User Profile Saved Addresses Integration
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('buxaa-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');

  const populateAddressFields = (addr) => {
    setFirstName(addr.firstName || '');
    setLastName(addr.lastName || '');
    setPhone(addr.phone || '');
    setAddress1(addr.address1 || '');
    setAddress2(addr.address2 || '');
    setCity(addr.city || '');
    setBillingState(addr.state || '');
    setPincode(addr.pincode || '');
  };

  const populateBillingAddressFields = (addr) => {
    setBillFirstName(addr.firstName || '');
    setBillLastName(addr.lastName || '');
    setBillPhone(addr.phone || '');
    setBillAddress1(addr.address1 || '');
    setBillAddress2(addr.address2 || '');
    setBillCity(addr.city || '');
    setBillState(addr.state || '');
    setBillPincode(addr.pincode || '');
  };

  const handleAddressSelect = (addrId) => {
    setSelectedAddressId(addrId);
    if (addrId === 'new') {
      setFirstName('');
      setLastName('');
      setPhone('');
      setAddress1('');
      setAddress2('');
      setCity('');
      setBillingState('');
      setPincode('');
    } else {
      const selected = savedAddresses.find(addr => addr.id === addrId);
      if (selected) {
        populateAddressFields(selected);
      }
    }
  };

  const handleBillingAddressSelect = (addrId) => {
    setSelectedBillingAddressId(addrId);
    if (addrId === 'new') {
      setBillFirstName('');
      setBillLastName('');
      setBillPhone('');
      setBillAddress1('');
      setBillAddress2('');
      setBillCity('');
      setBillState('');
      setBillPincode('');
    } else {
      const selected = savedAddresses.find(addr => addr.id === addrId);
      if (selected) {
        populateBillingAddressFields(selected);
      }
    }
  };

  React.useEffect(() => {
    if (!user) {
      showToast('Please sign in to proceed to checkout.', 'error');
      navigate('/account?redirect=/checkout');
    }
  }, [user, navigate]);

  React.useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
      fetch(`/api/customers/addresses?email=${encodeURIComponent(user.email)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.success && Array.isArray(data.addresses)) {
            setSavedAddresses(data.addresses);
            const defaultAddr = data.addresses.find(addr => addr.isDefault);
            if (defaultAddr) {
              setSelectedAddressId(defaultAddr.id);
              populateAddressFields(defaultAddr);
              
              setSelectedBillingAddressId(defaultAddr.id);
              populateBillingAddressFields(defaultAddr);
            }
          }
        })
        .catch(err => console.error('Error loading saved addresses:', err));
    }
  }, [user]);

  // Payment Form State
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'upi', 'card', 'netbanking', 'cod'
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardholderName, setCardholderName] = useState('');

  const [loading, setLoading] = useState(false);

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
  
  // Payment fee: Cash on delivery has a ₹50 additional fee
  const paymentFee = paymentMethod === 'cod' ? 50 : 0;
  const finalTotal = discountedSubtotal + shippingCharge + gstTax + paymentFee;

  // Mock savings calculation from legacy HTML
  const totalSavings = cartItems.reduce((acc, item) => {
    return acc + (item.originalPrice ? (item.originalPrice - item.price) * item.quantity : 0);
  }, 0);

  const handleContinueToPayment = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone || !address1 || !city || !billingState || !pincode) {
      showToast('Please fill in all required shipping address fields.', 'error');
      return;
    }
    if (phone.length !== 10) {
      showToast('Shipping phone number must be exactly 10 digits.', 'error');
      return;
    }
    if (pincode.length !== 6 || isNaN(pincode)) {
      showToast('Please enter a valid 6-digit shipping PIN code.', 'error');
      return;
    }

    if (!sameAsShipping) {
      if (!billFirstName || !billLastName || !billPhone || !billAddress1 || !billCity || !billState || !billPincode) {
        showToast('Please fill in all required billing address fields.', 'error');
        return;
      }
      if (billPhone.length !== 10) {
        showToast('Billing phone number must be exactly 10 digits.', 'error');
        return;
      }
      if (billPincode.length !== 6 || isNaN(billPincode)) {
        showToast('Please enter a valid 6-digit billing PIN code.', 'error');
        return;
      }
    }

    setCurrentStep(2);
    showToast('Address configurations validated. Choose your payment method.', 'success');
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !phone || !address1 || !city || !billingState || !pincode) {
      showToast('Please ensure all shipping address fields are complete.', 'error');
      setCurrentStep(1);
      return;
    }
    if (phone.length !== 10) {
      showToast('Shipping phone number must be exactly 10 digits.', 'error');
      setCurrentStep(1);
      return;
    }

    if (!sameAsShipping) {
      if (!billFirstName || !billLastName || !billPhone || !billAddress1 || !billCity || !billState || !billPincode) {
        showToast('Please ensure all billing address fields are complete.', 'error');
        setCurrentStep(1);
        return;
      }
      if (billPhone.length !== 10) {
        showToast('Billing phone number must be exactly 10 digits.', 'error');
        setCurrentStep(1);
        return;
      }
    }

    if (paymentMethod === 'upi' && !upiId) {
      showToast('Please fill in your UPI ID.', 'warning');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber || !expiry || !cvv || !cardholderName) {
        showToast('Please fill in all card details.', 'warning');
        return;
      }
      const rawCard = cardNumber.replace(/\s/g, '');
      if (rawCard.length !== 16) {
        showToast('Card number must be exactly 16 digits.', 'warning');
        return;
      }
      if (cvv.length !== 3) {
        showToast('CVV must be exactly 3 digits.', 'warning');
        return;
      }
    }

    setLoading(true);

    const shippingAddressObj = {
      id: selectedAddressId !== 'new' ? selectedAddressId : `ADR-${Date.now()}-ship`,
      firstName,
      lastName,
      phone,
      address1,
      address2,
      city,
      state: billingState,
      pincode
    };

    const billingAddressObj = sameAsShipping 
      ? shippingAddressObj 
      : {
          id: selectedBillingAddressId !== 'new' ? selectedBillingAddressId : `ADR-${Date.now()}-bill`,
          firstName: billFirstName,
          lastName: billLastName,
          phone: billPhone,
          address1: billAddress1,
          address2: billAddress2,
          city: billCity,
          state: billState,
          pincode: billPincode
        };

    const orderPayload = {
      customerId: user?.id || '',
      customer: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      address1,
      address2,
      city,
      state: billingState,
      pincode,
      itemsCount: cartCount,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        img: item.img
      })),
      subtotal,
      tax: gstTax,
      shipping: shippingCharge,
      total: finalTotal,
      paymentMethod,
      shippingAddress: shippingAddressObj,
      billingAddress: billingAddressObj,
      couponCode: appliedCoupon ? appliedCoupon.code : '',
      discount: discountAmount
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.orderId) {
          // Proactively save address to customer database if checkmark is checked
          if (saveAddress && user && user.email) {
            try {
              // Save shipping
              await fetch('/api/customers/addresses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: user.email,
                  address: { ...shippingAddressObj, isDefault: false, type: 'shipping' }
                })
              });

              // Save billing if different
              if (!sameAsShipping) {
                await fetch('/api/customers/addresses', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    email: user.email,
                    address: { ...billingAddressObj, isDefault: false, type: 'billing' }
                  })
                });
              }
            } catch (saveErr) {
              console.error('Error saving address during checkout:', saveErr);
            }
          }

          showToast('Order placed successfully! Thank you.', 'success');
          clearCart();
          setAppliedCoupon(null);
          navigate('/order-confirm', {
            state: {
              orderId: data.orderId,
              customerName: orderPayload.customer,
              totalAmount: finalTotal,
              email: orderPayload.email,
              address: `${address1}, ${city}, ${billingState} - ${pincode}`
            }
          });
        } else {
          showToast('Failed to place order. Please try again.', 'error');
        }
      } else {
        showToast('Server error. Please try again.', 'error');
      }
    } catch (err) {
      console.error('Submit order error:', err);
      showToast('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const val = value.replace(/\D/g, '').substring(0, 16);
    return val.replace(/(.{4})/g, '$1 ').trim();
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-24 text-center font-sans">
        <Helmet>
          <title>Secure Checkout | BUXAA</title>
          <meta name="description" content="Complete your order securely on BUXAA. Enter shipping and billing details." />
        </Helmet>
        <ShoppingBag size={40} className="text-[var(--text-pale)] mb-3 mx-auto" />
        <h2 className="font-serif text-lg font-bold text-[#1A1208]">Checkout - Cart is Empty</h2>
        <p className="text-xs text-[#8A7A5A] mt-2 mb-6">Please add some items to your cart before proceeding.</p>
        <Link to="/shop" className="bg-[#C9A84C] hover:bg-[#8B6914] text-white text-xs font-bold tracking-widest uppercase py-3 px-8 rounded-sm transition-colors">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="page-transition" style={{ background: 'var(--ivory)', minHeight: '100vh' }}>
      <Helmet>
        <title>Secure Checkout | BUXAA</title>
        <meta name="description" content="Complete your order securely on BUXAA. Enter shipping and billing details." />
      </Helmet>
      
      {/* ── Progress Banner ── */}
      <div className="page-hero" style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border)', background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="breadcrumb" style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
            <Link to="/" style={{ color: 'var(--text-light)' }}>Home</Link><span> › </span>
            <Link to="/cart" style={{ color: 'var(--text-light)' }}>Cart</Link><span> › </span>
            <span style={{ color: 'var(--text-dark)', fontWeight: 700 }}>Checkout</span>
          </div>
          
          {/* Progress Steps */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: '1.5rem', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div 
                onClick={() => setCurrentStep(1)}
                style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', 
                  background: 'var(--gold)', color: 'white', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '0.85rem', fontWeight: 700, margin: '0 auto', cursor: 'pointer' 
                }}
              >
                {currentStep > 1 ? <Check size={16} /> : '1'}
              </div>
              <div style={{ fontSize: '0.72rem', marginTop: '0.25rem', color: 'var(--gold-dark)', fontWeight: 700 }}>Address</div>
            </div>
            <div style={{ width: '80px', height: '2px', background: currentStep >= 2 ? 'var(--gold)' : 'var(--border)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                background: currentStep >= 2 ? 'var(--gold)' : 'var(--border)', 
                color: currentStep >= 2 ? 'white' : 'var(--text-light)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '0.85rem', fontWeight: 700, margin: '0 auto' 
              }}>
                2
              </div>
              <div style={{ fontSize: '0.72rem', marginTop: '0.25rem', color: currentStep >= 2 ? 'var(--gold-dark)' : 'var(--text-light)', fontWeight: currentStep >= 2 ? 700 : 'normal' }}>Payment</div>
            </div>
            <div style={{ width: '80px', height: '2px', background: 'var(--border)' }}></div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                background: 'var(--border)', color: 'var(--text-light)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                fontSize: '0.85rem', fontWeight: 700, margin: '0 auto' 
              }}>
                3
              </div>
              <div style={{ fontSize: '0.72rem', marginTop: '0.25rem', color: 'var(--text-light)' }}>Confirm</div>
            </div>
          </div>
        </div>
      </div>

      <main className="container" style={{ maxWidth: '1600px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div className="checkout-layout">
          
          {/* ── Left: Forms ── */}
          <div className="checkout-form-section" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Step 1: Address */}
            <div className="checkout-step" id="step-address" style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px' }}>
              <div 
                className="checkout-step-header" 
                onClick={() => setCurrentStep(1)}
                style={{ 
                  padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', 
                  display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer',
                  background: currentStep === 1 ? 'var(--cream)' : 'transparent'
                }}
              >
                <div style={{ 
                  width: '28px', height: '28px', borderRadius: '50%', 
                  background: currentStep > 1 ? '#27AE60' : 'var(--gold)', 
                  color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '0.8rem', fontWeight: 700 
                }}>
                  {currentStep > 1 ? <Check size={14} /> : '1'}
                </div>
                <h4 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', color: 'var(--text-dark)' }}>Delivery Address</h4>
                {currentStep > 1 && firstName && (
                  <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'var(--text-light)' }}>
                    {firstName}, {city} - {pincode}
                  </span>
                )}
              </div>
              
              {currentStep === 1 && (
                <div className="checkout-step-body" style={{ padding: '2rem' }}>
                    {savedAddresses.length > 0 && (
                      <div className="saved-addresses-selector" style={{ marginBottom: '1.5rem', padding: '1.25rem', background: '#FFFDF7', border: '1.5px solid var(--gold-light)', borderRadius: '2px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.5rem' }}>
                          <HomeIcon size={14} className="text-[var(--gold)]" /> Choose a Saved Olfactory Delivery Location:
                        </label>
                        <select 
                          className="form-control"
                          value={selectedAddressId}
                          onChange={(e) => handleAddressSelect(e.target.value)}
                          style={{ borderColor: 'var(--gold)', borderWidth: '1.5px', background: 'var(--white)', cursor: 'pointer', outline: 'none' }}
                        >
                          {savedAddresses.map(addr => (
                            <option key={addr.id} value={addr.id}>
                              {addr.isDefault ? '[Primary] ' : ''}{addr.firstName} {addr.lastName} — {addr.address1}, {addr.city} ({addr.pincode})
                            </option>
                          ))}
                          <option value="new">Deliver to a New/Different Location</option>
                        </select>
                      </div>
                    )}

                    <form onSubmit={handleContinueToPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="checkout-form-row">
                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>First Name *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          required 
                          placeholder="Enter your first name"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Last Name *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          required 
                          placeholder="Enter your last name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Email Address *</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        required 
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Phone Number *</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        required 
                        placeholder="Enter your phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Address Line 1 *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        required 
                        placeholder="House No., Street Name"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Address Line 2 (Optional)</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Apartment, Suite, etc."
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>

                    <div className="checkout-form-row">
                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>City *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          required 
                          placeholder="Enter your city"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>State *</label>
                        <select 
                          className="form-control" 
                          required
                          value={billingState}
                          onChange={(e) => setBillingState(e.target.value)}
                        >
                          <option value="">Select State</option>
                          <option>Maharashtra</option>
                          <option>Delhi</option>
                          <option>Karnataka</option>
                          <option>Tamil Nadu</option>
                          <option>Gujarat</option>
                          <option>Rajasthan</option>
                          <option>West Bengal</option>
                          <option>Uttar Pradesh</option>
                          <option>Telangana</option>
                          <option>Punjab</option>
                          <option>Kerala</option>
                          <option>Haryana</option>
                        </select>
                      </div>
                    </div>

                    <div className="checkout-form-row">
                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>PIN Code *</label>
                        <input 
                          type="text" 
                          className="form-control" 
                          required 
                          maxLength="6"
                          placeholder="Enter your PIN code"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                        />
                      </div>
                      <div className="form-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Country</label>
                        <input type="text" className="form-control" value="India" readOnly style={{ background: 'var(--cream)', cursor: 'not-allowed' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1rem 0', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                      <input 
                        type="checkbox" 
                        id="same-as-shipping" 
                        checked={sameAsShipping}
                        onChange={(e) => setSameAsShipping(e.target.checked)}
                        style={{ accentColor: 'var(--gold)', cursor: 'pointer' }} 
                      />
                      <label htmlFor="same-as-shipping" style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-dark)', cursor: 'pointer' }}>
                        Billing address is the same as shipping address
                      </label>
                    </div>

                    {!sameAsShipping && (
                      <div className="billing-address-section animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1.5px solid var(--gold-light)', background: '#FFFDF7', padding: '1.5rem', borderRadius: '2px', marginTop: '0.5rem' }}>
                        <h4 className="font-serif text-md font-bold text-[var(--text-dark)] border-b border-[var(--border)] pb-2 m-0 flex items-center gap-1.5">
                          <HomeIcon size={14} className="text-[var(--gold)]" /> Billing Details
                        </h4>

                        {savedAddresses.length > 0 && (
                          <div className="saved-addresses-selector" style={{ marginBottom: '0.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.35rem' }}>
                              Choose a Saved Billing Address:
                            </label>
                            <select 
                              className="form-control"
                              value={selectedBillingAddressId}
                              onChange={(e) => handleBillingAddressSelect(e.target.value)}
                              style={{ borderColor: 'var(--gold)', borderWidth: '1.5px', background: 'var(--white)', cursor: 'pointer', outline: 'none' }}
                            >
                              {savedAddresses.map(addr => (
                                <option key={addr.id} value={addr.id}>
                                  {addr.firstName} {addr.lastName} — {addr.address1}, {addr.city} ({addr.pincode})
                                </option>
                              ))}
                              <option value="new">Enter a New Billing Address</option>
                            </select>
                          </div>
                        )}

                        <div className="checkout-form-row">
                          <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>First Name *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              required={!sameAsShipping}
                              placeholder="Enter your first name"
                              value={billFirstName}
                              onChange={(e) => setBillFirstName(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Last Name *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              required={!sameAsShipping}
                              placeholder="Enter your last name"
                              value={billLastName}
                              onChange={(e) => setBillLastName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Billing Phone Number *</label>
                          <input 
                            type="tel" 
                            className="form-control" 
                            required={!sameAsShipping}
                            placeholder="Enter your phone number"
                            value={billPhone}
                            onChange={(e) => setBillPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                          />
                        </div>

                        <div className="form-group">
                          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Billing Address Line 1 *</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            required={!sameAsShipping}
                            placeholder="House No., Street Name"
                            value={billAddress1}
                            onChange={(e) => setBillAddress1(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Billing Address Line 2 (Optional)</label>
                          <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Apartment, Suite, etc."
                            value={billAddress2}
                            onChange={(e) => setBillAddress2(e.target.value)}
                          />
                        </div>

                        <div className="checkout-form-row">
                          <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Billing City *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              required={!sameAsShipping}
                              placeholder="Enter your city"
                              value={billCity}
                              onChange={(e) => setBillCity(e.target.value)}
                            />
                          </div>
                          <div className="form-group">
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Billing State *</label>
                            <select 
                              className="form-control" 
                              required={!sameAsShipping}
                              value={billState}
                              onChange={(e) => setBillState(e.target.value)}
                            >
                              <option value="">Select State</option>
                              <option>Maharashtra</option>
                              <option>Delhi</option>
                              <option>Karnataka</option>
                              <option>Tamil Nadu</option>
                              <option>Gujarat</option>
                              <option>Rajasthan</option>
                              <option>West Bengal</option>
                              <option>Uttar Pradesh</option>
                              <option>Telangana</option>
                              <option>Punjab</option>
                              <option>Kerala</option>
                              <option>Haryana</option>
                            </select>
                          </div>
                        </div>

                        <div className="checkout-form-row">
                          <div className="form-group" style={{ maxWidth: '50%' }}>
                            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-mid)', marginBottom: '0.35rem' }}>Billing PIN Code *</label>
                            <input 
                              type="text" 
                              className="form-control" 
                              required={!sameAsShipping}
                              maxLength="6"
                              placeholder="Enter your PIN code"
                              value={billPincode}
                              onChange={(e) => setBillPincode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                            />
                          </div>
                        </div>
                      </div>
                    )}



                    <button type="submit" className="btn btn-gold" style={{ cursor: 'pointer' }}>
                      Continue to Payment
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Step 2: Payment */}
            <div className="checkout-step" id="step-payment" style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px' }}>
              <div 
                className="checkout-step-header" 
                onClick={() => currentStep === 2 ? null : setCurrentStep(2)}
                style={{ 
                  padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', 
                  display: 'flex', alignItems: 'center', gap: '1rem', cursor: currentStep > 1 ? 'pointer' : 'default',
                  background: currentStep === 2 ? 'var(--cream)' : 'transparent'
                }}
              >
                <div style={{ 
                  width: '28px', height: '28px', borderRadius: '50%', 
                  background: currentStep === 2 ? 'var(--gold)' : 'var(--border)', 
                  color: currentStep === 2 ? 'white' : 'var(--text-light)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontSize: '0.8rem', fontWeight: 700 
                }}>
                  2
                </div>
                <h4 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '1.15rem', color: currentStep >= 2 ? 'var(--text-dark)' : 'var(--text-light)' }}>Payment Method</h4>
              </div>

              {currentStep === 2 && (
                <div className="checkout-step-body" style={{ padding: '2rem' }}>
                  <div className="payment-methods" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* COD */}
                    <div 
                      className="payment-method active"
                      style={{ 
                        border: '2px solid var(--gold)',
                        background: 'var(--cream)',
                        padding: '1.25rem', borderRadius: '4px', display: 'flex', gap: '1rem', alignItems: 'center'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', color: 'var(--gold-dark)' }}><Banknote size={24} /></div>
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-dark)' }}>Cash on Delivery</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>Pay when your order arrives (+₹50 fee)</div>
                      </div>
                    </div>
                  </div>

                  {/* COD Info */}
                  <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--cream)', borderRadius: '4px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-mid)', margin: 0 }}>
                      <Check size={14} className="text-[#27AE60] mt-0.5 flex-shrink-0" />
                      <span>Pay securely at your doorstep via Cash, Cards or UPI once delivery arrives.</span>
                    </div>
                  </div>

                  <button 
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="btn btn-gold" 
                    style={{ marginTop: '1.5rem', width: '100%', cursor: loading ? 'not-allowed' : 'pointer' }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2"><Loader2 className="animate-spin" size={16} /> Submitting Secure Order...</span>
                    ) : (
                      <span className="flex items-center justify-center gap-2"><Lock size={16} /> Place Order Securely</span>
                    )}
                  </button>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-pale)', textAlign: 'center', marginTop: '0.75rem' }}>
                    <span className="flex items-center justify-center gap-1.5"><Lock size={12} /> Your payment is secured with 256-bit SSL encryption</span>
                  </p>
                </div>
              )}
            </div>

          </div>

          {/* ── Right: Order Summary ── */}
          <aside className="checkout-summary" style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: '4px', padding: '1.5rem', height: 'fit-content' }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.35rem', color: 'var(--text-dark)', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>Order Summary</h3>
            
            {/* Items scroll */}
            <div className="checkout-order-items" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', padding: '6px 6px 0 6px' }}>
              {cartItems.map((item, idx) => (
                <div key={idx} className="checkout-order-item" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="checkout-order-item-img" style={{ position: 'relative', width: '50px', height: '50px', flexShrink: 0, overflow: 'visible' }}>
                    <img 
                      src={getImageUrl(item.img)} 
                      alt={item.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px', border: '1px solid var(--border)' }} 
                    />
                    <span 
                      className="item-qty-badge"
                      style={{ 
                        position: 'absolute', top: '-6px', right: '-6px', 
                        background: 'var(--gold)', color: 'white', 
                        width: '18px', height: '18px', borderRadius: '50%', 
                        fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        fontWeight: 700 
                      }}
                    >
                      {item.quantity}
                    </span>
                  </div>
                  <div className="checkout-order-item-name" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dark)', flexGrow: 1 }}>
                    {item.name}
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-pale)', fontWeight: 'normal' }}>{item.size}</div>
                  </div>
                  <span className="checkout-order-item-price" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations lines */}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <div className="summary-line" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.6rem', color: 'var(--text-mid)' }}>
                <span>Subtotal ({cartCount} items)</span>
                <span style={{ fontWeight: 700 }}>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-line" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', fontSize: '0.82rem', marginBottom: '0.6rem', color: '#22C55E' }}>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                    <span>Coupon Discount</span>
                    <span style={{
                      fontSize: '0.68rem', fontFamily: 'monospace', fontWeight: 700,
                      color: '#16a34a', background: '#f0fdf4', border: '1px solid #bbf7d0',
                      borderRadius: '3px', padding: '1px 5px',
                      maxWidth: '150px', overflow: 'hidden',
                      textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      display: 'block'
                    }} title={appliedCoupon?.code}>
                      {appliedCoupon?.code}
                    </span>
                  </span>
                  <span style={{ fontWeight: 700, flexShrink: 0 }}>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="summary-line" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.6rem', color: 'var(--text-mid)' }}>
                <span>Shipping</span>
                <span style={{ fontWeight: 700 }}>{shippingCharge === 0 ? 'FREE' : formatPrice(shippingCharge)}</span>
              </div>
              <div className="summary-line" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.6rem', color: 'var(--text-mid)' }}>
                <span>GST (18%)</span>
                <span style={{ fontWeight: 700 }}>{formatPrice(gstTax)}</span>
              </div>
              {paymentMethod === 'cod' && (
                <div className="summary-line" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.6rem', color: 'var(--text-mid)' }}>
                  <span>COD Handling Fee</span>
                  <span style={{ fontWeight: 700 }}>{formatPrice(50)}</span>
                </div>
              )}
              <div className="summary-line total" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700, marginTop: '1rem', paddingTop: '1rem', borderTop: '1px dashed var(--border)', color: 'var(--text-dark)' }}>
                <span>Total Amount</span>
                <span className="price-current" style={{ color: 'var(--gold-dark)', fontSize: '1.2rem', fontFamily: 'Playfair Display, serif' }}>{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Savings Banner */}
            {totalSavings > 0 && (
              <div style={{ marginTop: '1.25rem', padding: '0.75rem 1rem', background: 'var(--gold-pale)', borderRadius: '4px', border: '1px solid var(--gold-light)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                  <span>You save <strong>{formatPrice(totalSavings)}</strong> on this order!</span>
                </div>
              </div>
            )}

            {/* Badges assurances */}
            <div style={{ marginTop: '1.25rem', fontSize: '0.78rem', color: 'var(--text-light)', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldCheck size={14} className="text-[#27AE60]" /> <span>100% Authentic Products Only</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Truck size={14} className="text-[var(--gold-dark)]" /> <span>Fast Track Delivery Across India</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><RotateCcw size={14} className="text-[var(--gold-dark)]" /> <span>Easy 30-Day Moneyback Return Policy</span></div>
            </div>
          </aside>

        </div>
      </main>

    </div>
  );
}
