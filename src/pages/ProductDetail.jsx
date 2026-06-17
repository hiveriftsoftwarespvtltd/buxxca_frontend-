import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import Swal from 'sweetalert2';
import { formatPrice, getImageUrl } from '../constants/storeData';
import ProductCard from '../components/ProductCard';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  Sparkles, 
  Hash, 
  Gem, 
  Compass, 
  User, 
  Check,
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Star
} from 'lucide-react';


export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Gallery & configuration state
  const [activeImg, setActiveImg] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description', 'reviews', 'shipping'

  // Dynamic reviews state
  const [reviewsList, setReviewsList] = useState([
    { id: 1, name: 'Priya Sharma', rating: 5, date: 'March 2026', text: 'Absolutely amazing backpack! Fits my laptop, chargers, and two days of clothes easily. Material quality and stitching is top-notch.', verified: true },
    { id: 2, name: 'Ananya Singh', rating: 5, date: 'February 2026', text: 'The best travel duffel I have owned. The shoe compartment is super useful and the premium canvas looks very premium.', verified: true },
    { id: 3, name: 'Meera Nair', rating: 4, date: 'January 2026', text: 'Beautiful bag. The packaging is also gorgeous — perfect as a gift. Only giving 4 stars because I wish they had more color options!', verified: true }
  ]);

  // Review Form State
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formText, setFormText] = useState('');

  const { addToCart } = useCart();
  const { toggleWishlist, hasItem } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Load product by slug — fetch all products and filter (works on all servers)
  useEffect(() => {
    if (!slug) return;
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');

        const allProducts = await res.json();

        // Match by slug or name-derived slug
        const raw = allProducts.find((p) => p.slug === slug) ||
          allProducts.find((p) =>
            p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
          );

        if (raw) {
          // Normalize notes
          if (raw.notes) {
            const toArr = (n) => Array.isArray(n) ? n : (n || '').split(',').map((s) => s.trim()).filter(Boolean);
            raw.notes = { top: toArr(raw.notes.top), heart: toArr(raw.notes.heart), base: toArr(raw.notes.base) };
          } else {
            raw.notes = { top: [], heart: [], base: [] };
          }
          if (!raw.sizes || raw.sizes.length === 0) {
            raw.sizes = (raw.variants || []).map((v) => v.size).filter(Boolean);
            if (raw.sizes.length === 0) raw.sizes = ['One Size'];
          }
          if (!raw.description) raw.description = `<p>Discover ${raw.name}, a premium bag from BUXAA.</p>`;

          setProduct(raw);
          setActiveImg(raw.img);
          setSelectedSize(raw.sizes[0] || 'One Size');
          setQuantity(1);

          // Related products (same category, exclude current)
          const related = allProducts
            .filter((r) => r.id !== raw.id && r.category === raw.category)
            .slice(0, 4);
          setRelatedProducts(related);
        }
      } catch (e) {
        console.error('Failed to fetch product:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // Show loading spinner while fetching
  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          width: '48px', height: '48px', border: '3px solid var(--border)',
          borderTop: '3px solid var(--gold)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ color: 'var(--text-light)', fontSize: '0.88rem', letterSpacing: '0.1em' }}>Loading product details...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-24 text-center font-sans">
        <ShoppingBag size={40} className="text-[var(--text-pale)] mb-3 mx-auto" />
        <h2 className="font-serif text-lg font-bold text-[#1A1208]">Product Not Found</h2>
        <p className="text-xs text-[#8A7A5A] mt-2 mb-6">The requested product could not be found in our database.</p>
        <Link to="/shop" className="bg-[#C9A84C] hover:bg-[#8B6914] text-white text-xs font-bold tracking-widest uppercase py-3 px-8 rounded-sm transition-colors duration-300">Back to Shop</Link>
      </div>
    );
  }

  // Manage Variant Price adjustments dynamically from product variants
  const basePrice = product.price;
  const getPriceForSize = () => {
    if (product.variants && product.variants.length > 0) {
      const match = product.variants.find(v => v.size === selectedSize);
      if (match) return match.price;
    }
    return basePrice;
  };
  const currentPrice = getPriceForSize();
  const hasOriginalPrice = product.originalPrice !== null && product.originalPrice !== undefined;
  const originalPriceForSize = hasOriginalPrice
    ? (() => {
        const ratio = basePrice > 0 ? (currentPrice / basePrice) : 1;
        return Math.round(product.originalPrice * ratio);
      })()
    : null;

  const handleAddToCart = () => {
    // Override product price temporarily matching the size selected
    const adjustedProduct = { ...product, price: currentPrice };
    addToCart(adjustedProduct, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    // Override product price temporarily matching the size selected and add to cart
    const adjustedProduct = { ...product, price: currentPrice };
    addToCart(adjustedProduct, selectedSize, quantity);
    navigate('/cart');
  };

  const handleReviewFormSubmit = (e) => {
    e.preventDefault();
    if (formName.trim() && formText.trim()) {
      const newReview = {
        id: reviewsList.length + 1,
        name: formName,
        rating: Number(formRating),
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        text: formText,
        verified: false
      };
      setReviewsList(prev => [newReview, ...prev]);
      Swal.fire({
        title: 'Review Submitted! 🌟',
        text: 'Thank you for your feedback! Your review has been submitted successfully.',
        icon: 'success',
        confirmButtonColor: '#D4A23A',
        background: '#FFFFFF',
        color: '#04152F'
      });
      setFormName('');
      setFormText('');
    }
  };


  return (
    <div className="page-transition">
      <Helmet>
        <title>{`${product.name} | BUXAA Premium`}</title>
        <meta
          name="description"
          content={`Shop ${product.name} at BUXAA. ${product.subtitle || ''}${
            Array.isArray(product.notes?.top) && product.notes.top.length > 0
              ? ` Crafted with ${product.notes.top.join(', ')}.`
              : ''
          }${
            Array.isArray(product.notes?.heart) && product.notes.heart.length > 0
              ? ` Capacity: ${product.notes.heart.join(', ')}.`
              : ''
          }`}
        />
      </Helmet>
      
      {/* Breadcrumbs */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '1200px' }}>
        <div className="breadcrumb" style={{ fontSize: '0.82rem', color: 'var(--text-light)', margin: '1.5rem 0' }}>
          <Link to="/" style={{ color: 'var(--text-light)' }}>Home</Link><span> › </span>
          <Link to="/shop" style={{ color: 'var(--text-light)' }}>Shop</Link><span> › </span>
          <span>{product.name}</span>
        </div>

        {/* Product Detail */}
        <div className="product-detail" style={{ gap: '3rem' }}>
          
          {/* Gallery */}
          <div className="product-gallery">
            <div className="gallery-main">
              <img src={getImageUrl(activeImg)} alt={product.name} />
              <button className="gallery-zoom-btn" onClick={() => window.open(getImageUrl(activeImg), '_blank')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Search size={16} /></button>
            </div>
            {product.imgs && product.imgs.length > 0 && (
              <div className="gallery-thumbs">
                {product.imgs.map((img, i) => (
                  <button
                    key={i}
                    className={`gallery-thumb ${activeImg === img ? 'active' : ''}`}
                    onClick={() => setActiveImg(img)}
                    aria-label={`View image ${i+1}`}
                  >
                    <img src={getImageUrl(img)} alt={`${product.name} view ${i+1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
            {/* Added specs block on desktop left side */}
            <div className="product-extra-specs" style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              {/* Product Specifications Card */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '4px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '1rem', fontWeight: 'bold', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginTop: 0 }}>Product Specifications</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-light)' }}>SKU</span>
                    <strong style={{ color: 'var(--text-dark)' }}>BX-TRV-05</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-light)' }}>Volume / Capacity</span>
                    <strong style={{ color: 'var(--text-dark)' }}>45L to 85L Expandable</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-light)' }}>Material</span>
                    <strong style={{ color: 'var(--text-dark)' }}>Polycarbonate</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed var(--border)', paddingBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--text-light)' }}>Usage</span>
                    <strong style={{ color: 'var(--text-dark)' }}>Journey Essential</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.25rem' }}>
                    <span style={{ color: 'var(--text-light)' }}>Availability</span>
                    <strong style={{ color: '#27AE60', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle2 size={14} /> In Stock (35 units)
                    </strong>
                  </div>
                </div>
              </div>

              {/* Service & Warranty Card */}
              <div style={{ background: '#FFFFFF', border: '1px solid var(--border)', borderRadius: '4px', padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: '1rem', fontWeight: 'bold', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem', marginTop: 0 }}>Service & Warranty</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <Truck size={18} style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: 'var(--text-dark)', display: 'block' }}>Free Delivery</strong>
                      <span style={{ color: 'var(--text-light)' }}>Enjoy complimentary delivery on all orders above ₹2,999.</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <RotateCcw size={18} style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: 'var(--text-dark)', display: 'block' }}>30-Day Easy Returns</strong>
                      <span style={{ color: 'var(--text-light)' }}>Hassle-free return window. Exchange or get refund within 30 days.</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <ShieldCheck size={18} style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: 'var(--text-dark)', display: 'block' }}>100% Authentic Quality</strong>
                      <span style={{ color: 'var(--text-light)' }}>Genuine product sourced directly from BUXAA production house.</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <ShieldCheck size={18} style={{ color: '#27AE60', marginTop: '2px', flexShrink: 0 }} />
                    <div>
                      <strong style={{ color: '#27AE60', display: 'block' }}>BUXAA 2-Year Warranty</strong>
                      <span style={{ color: 'var(--text-light)', display: 'block', marginTop: '0.25rem', fontSize: '0.8rem', lineHeight: '1.4' }}>
                        This item is covered under our 2-year quality warranty against any stitch breaks, zipper malfunctions, or material tears.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Info */}
          <div className="product-info">
            <div className="product-info-brand">{product.brand}</div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', margin: '0 0 0.5rem', color: 'var(--text-dark)', lineHeight: 1.25 }}>{product.name}</h1>
            <p className="product-info-subtitle">{product.subtitle}</p>
            
            <div className="product-info-rating">
              <span className="star-rating-fill">{'★'.repeat(Math.floor(product.rating))}</span>
              <span className="text-gold" style={{ fontWeight: 700, color: 'var(--gold)', marginLeft: '0.5rem' }}>{product.rating}</span>
              <a href="#reviews" className="review-count" style={{ fontSize: '0.85rem', color: 'var(--text-light)', textDecoration: 'underline', marginLeft: '0.5rem' }}>
                ({product.reviews} Reviews)
              </a>
            </div>

            <div className="product-info-price">
              <span className="price-current" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 700 }}>{formatPrice(currentPrice)}</span>
              {hasOriginalPrice && originalPriceForSize && (
                <>
                  <span className="price-original" style={{ textDecoration: 'line-through', color: 'var(--text-pale)', marginLeft: '1rem' }}>{formatPrice(originalPriceForSize)}</span>
                  <span className="price-discount" style={{ color: '#C0392B', fontWeight: 700, marginLeft: '1rem' }}>{product.discount}% OFF</span>
                </>
              )}
            </div>

            {/* Size Selection */}
            <div className="product-options">
              <span className="option-label">Size: <span>{selectedSize}</span></span>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${size === selectedSize ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>{/* end product-options */}

            {/* Bag Specifications Preview */}
            <div style={{ background: 'var(--cream)', borderRadius: '4px', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border)' }}>
              <span className="option-label" style={{ display: 'block', marginBottom: '0.75rem' }}>Bag Specifications</span>
              <div className="scent-notes-grid">
                <div className="scent-notes-item">
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem', color: 'var(--gold)' }}><ShieldCheck size={20} /></div>
                  <div style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Material</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-mid)', fontWeight: 'bold' }}>{Array.isArray(product.notes?.top) ? product.notes.top.join(', ') : (product.notes?.top || '—')}</div>
                </div>
                <div className="scent-notes-item middle">
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem', color: 'var(--gold)' }}><Compass size={20} /></div>
                  <div style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Capacity</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-mid)', fontWeight: 'bold' }}>{Array.isArray(product.notes?.heart) ? product.notes.heart.join(', ') : (product.notes?.heart || '—')}</div>
                </div>
                <div className="scent-notes-item">
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.25rem', color: 'var(--gold)' }}><Sparkles size={20} /></div>
                  <div style={{ fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '0.25rem' }}>Key Features</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-mid)', fontWeight: 'bold' }}>{Array.isArray(product.notes?.base) ? product.notes.base.join(', ') : (product.notes?.base || '—')}</div>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="product-add-to-cart">
              <div className="qty-control" style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} style={{ background: 'transparent', border: 'none', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer' }}>−</button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                  style={{ width: '50px', border: 'none', textAlign: 'center', fontSize: '0.9rem', outline: 'none' }}
                />
                <button onClick={() => setQuantity(prev => prev + 1)} style={{ background: 'transparent', border: 'none', width: '40px', height: '40px', fontSize: '1.2rem', cursor: 'pointer' }}>+</button>
              </div>
              <button className="btn btn-gold flex items-center justify-center gap-1.5" onClick={handleAddToCart}>
                <ShoppingBag size={16} /> Add to Cart
              </button>
              <button
                className={`product-wishlist-btn ${hasItem(product.id) ? 'active' : ''}`}
                onClick={() => toggleWishlist(product.id)}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {hasItem(product.id) ? <Heart size={18} fill="currentColor" className="text-[#DC2626]" /> : <Heart size={18} />}
              </button>
            </div>
            
            <button 
              onClick={handleBuyNow} 
              className="btn btn-outline btn-full" 
              style={{ marginBottom: '2rem', display: 'block', width: '100%', textAlign: 'center' }}
            >
              Buy Now → Go to Cart
            </button>

            {/* Product Meta */}
            <div className="product-meta">
              <span className="flex items-center gap-1.5"><Hash size={14} className="text-[var(--gold)]" /> <strong>SKU:</strong> {product.sku || `BX-${product.id}`}</span>
              <span className="flex items-center gap-1.5"><Gem size={14} className="text-[var(--gold)]" /> <strong>Volume/Capacity:</strong> {product.concentration || 'One Size'}</span>
              <span className="flex items-center gap-1.5"><Compass size={14} className="text-[var(--gold)]" /> <strong>Material:</strong> {product.scentFamily ? (product.scentFamily.charAt(0).toUpperCase()+product.scentFamily.slice(1)) : ''}</span>
              <span className="flex items-center gap-1.5"><User size={14} className="text-[var(--gold)]" /> <strong>Usage:</strong> {product.gender ? (product.gender.charAt(0).toUpperCase()+product.gender.slice(1)) : ''}</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-[var(--gold)]" /> <strong>In Stock:</strong> {product.stock} units</span>
            </div>

            {/* Delivery Info */}
            <div className="delivery-info-container" style={{ background: 'var(--ivory)', borderRadius: '4px', border: '1px solid var(--border)', fontSize: '0.82rem', marginBottom: '1.25rem' }}>
              <span className="delivery-info-item"><Truck size={14} className="text-[#27AE60]" style={{ flexShrink: 0 }} /> Free delivery above ₹2,999</span>
              <span className="delivery-info-item"><RotateCcw size={14} className="text-[var(--gold-dark)]" style={{ flexShrink: 0 }} /> 30-day easy returns</span>
              <span className="delivery-info-item"><ShieldCheck size={14} className="text-[#27AE60]" style={{ flexShrink: 0 }} /> 100% authentic</span>
            </div>

            {/* Quality & Warranty Guarantee */}
            <div style={{ 
              display: 'flex', 
              gap: '0.75rem', 
              padding: '1.1rem 1.25rem', 
              background: 'rgba(201, 168, 76, 0.06)', 
              borderRadius: '6px', 
              border: '1px dashed var(--gold)',
              borderLeft: '4px solid var(--gold)',
              fontSize: '0.85rem', 
              lineHeight: '1.6',
              marginBottom: '2rem',
              alignItems: 'flex-start',
              boxShadow: '0 4px 15px rgba(26, 18, 8, 0.02)'
            }}>
              <ShieldCheck size={18} style={{ color: 'var(--gold-dark)', marginTop: '2px', flexShrink: 0 }} />
              <div>
                <span style={{ 
                  fontWeight: 700, 
                  textTransform: 'uppercase', 
                  fontSize: '0.72rem', 
                  letterSpacing: '0.08em', 
                  color: 'var(--gold-dark)', 
                  display: 'block', 
                  marginBottom: '0.25rem' 
                }}>
                  BUXAA 2-Year Warranty
                </span>
                <span style={{ color: 'var(--text-mid)', fontWeight: 500, fontSize: '0.83rem' }}>
                  This item is covered under our 2-year quality warranty against any stitch breaks, zipper malfunctions, or material tears.
                </span>
              </div>
            </div>

            {/* Tabs */}
            <div className="product-tabs">
              <div className="tab-buttons">
                <button className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`} onClick={() => setActiveTab('description')}>Description</button>
                <button className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Reviews ({reviewsList.length})</button>
                <button className={`tab-btn ${activeTab === 'shipping' ? 'active' : ''}`} onClick={() => setActiveTab('shipping')}>Shipping &amp; Returns</button>
              </div>
              
              <div className={`tab-content ${activeTab === 'description' ? 'active' : ''}`}>
                <div className="product-description-html" dangerouslySetInnerHTML={{ __html: product.description || '<p>A premium bag from BUXAA.</p>' }} />
              </div>
              
              <div className={`tab-content ${activeTab === 'reviews' ? 'active' : ''}`} id="reviews">
                
                {/* Reviews breakdown & form */}
                <div className="reviews-summary">
                  <div className="reviews-overall">
                    <div className="big-score" style={{ fontFamily: 'Playfair Display, serif', fontSize: '4rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1 }}>{product.rating}</div>
                    <div className="star-rating-fill" style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{'★'.repeat(Math.floor(product.rating))}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>{reviewsList.length} reviews</div>
                  </div>
                  <div className="reviews-breakdown">
                    {[
                      { star: 5, pct: 85 },
                      { star: 4, pct: 15 },
                      { star: 3, pct: 0 },
                      { star: 2, pct: 0 },
                      { star: 1, pct: 0 }
                    ].map(d => (
                      <div key={d.star} className="breakdown-bar" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                        <span className="breakdown-label" style={{ fontSize: '0.8rem', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>{d.star} ★</span>
                        <div className="breakdown-track" style={{ flex: 1, height: '6px', background: 'var(--warm-gray)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div className="breakdown-fill" style={{ height: '100%', background: 'var(--gold)', borderRadius: '3px', width: `${d.pct}%` }}></div>
                        </div>
                        <span className="breakdown-pct" style={{ fontSize: '0.78rem', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>{d.pct}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {reviewsList.map(r => (
                  <div key={r.id} className="review-item">
                    <div className="review-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">{r.name.charAt(0)}</div>
                        <div>
                          <div className="reviewer-name">
                            {r.name} {r.verified && <span style={{ color: '#22C55E', fontSize: '0.75rem', marginLeft: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}><Check size={10} strokeWidth={3} /> Verified</span>}
                          </div>
                          <div className="review-date">{r.date}</div>
                        </div>
                      </div>
                      <span className="star-rating-fill" aria-label={`${r.rating} stars`}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <p className="review-text">{r.text}</p>
                  </div>
                ))}

                {/* Write Review Form */}
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', marginBottom: '1rem' }}>Write a Review</h4>
                  <form onSubmit={handleReviewFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Your Rating</label>
                      <select
                        value={formRating}
                        onChange={(e) => setFormRating(Number(e.target.value))}
                        style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', borderRadius: '2px', outline: 'none' }}
                      >
                        <option value="5">5 Stars - Excellent</option>
                        <option value="4">4 Stars - Highly Recommended</option>
                        <option value="3">3 Stars - Good</option>
                        <option value="2">2 Stars - Satisfactory</option>
                        <option value="1">1 Star - Disappointed</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Your Name</label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', borderRadius: '2px', outline: 'none' }}
                      />
                    </div>
                    <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Your Review</label>
                      <textarea
                        required
                        rows="3"
                        placeholder="Share your experience with this product..."
                        value={formText}
                        onChange={(e) => setFormText(e.target.value)}
                        style={{ padding: '0.65rem 1rem', border: '1px solid var(--border)', borderRadius: '2px', outline: 'none' }}
                      />
                    </div>
                    <button type="submit" className="btn btn-gold" style={{ display: 'block', width: 'max-content', padding: '0.75rem 2rem' }}>Submit Review</button>
                  </form>
                </div>

              </div>
              
              <div className={`tab-content ${activeTab === 'shipping' ? 'active' : ''}`}>
                <h4 style={{ marginBottom: '1rem', fontFamily: 'Playfair Display, serif', fontSize: '1.2rem' }}>Shipping Information</h4>
                <ul>
                  <li>Free standard shipping on orders above ₹2,999</li>
                  <li>Standard shipping (5–7 business days): ₹99</li>
                  <li>Express shipping (2–3 business days): ₹199</li>
                  <li>Same-day delivery available in select cities</li>
                </ul>
                <h4 style={{ margin: '1.5rem 0 1rem', fontFamily: 'Playfair Display, serif', fontSize: '1.2rem' }}>Returns &amp; Exchanges</h4>
                <ul>
                  <li>30-day hassle-free returns on unused products</li>
                  <li>Exchange within 7 days for different size/variant</li>
                  <li>Contact us at <a href="mailto:Buxaacustomercare@gmail.com" style={{ color: 'var(--gold-dark)', textDecoration: 'underline' }}>Buxaacustomercare@gmail.com</a></li>
                </ul>
              </div>
            </div>

          </div>

        </div>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <section className="section" style={{ padding: '4rem 0' }}>
            <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <span className="section-eyebrow" style={{ fontSize: '0.72rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', display: 'block', marginBottom: '0.5rem', fontWeight: 700 }}>You May Also Love</span>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.25rem', color: 'var(--text-dark)' }}>Related Products</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </section>
        )}

      </main>

    </div>
  );
}
