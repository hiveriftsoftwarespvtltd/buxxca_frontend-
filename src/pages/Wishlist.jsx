import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/ProductCard';
import { Heart } from 'lucide-react';
import Swal from 'sweetalert2';

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);


  // Load products on start
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const raw = await res.json();
          const normalized = raw.map(p => {
            if (p.notes) {
              const toArr = (n) => Array.isArray(n) ? n : (n || '').split(',').map(s => s.trim()).filter(Boolean);
              p.notes = {
                top:   toArr(p.notes.top),
                heart: toArr(p.notes.heart),
                base:  toArr(p.notes.base)
              };
            } else {
              p.notes = { top: [], heart: [], base: [] };
            }
            if (!p.sizes || p.sizes.length === 0) {
              p.sizes = (p.variants || []).map(v => v.size).filter(Boolean);
              if (p.sizes.length === 0) p.sizes = ['50ml'];
            }
            if (!p.selectedSize) {
              p.selectedSize = (p.variants && p.variants[0]) ? p.variants[0].size : p.sizes[0];
            }
            if (!p.description) {
              p.description = `<p>Discover ${p.name}, a premium bag from BUXAA.</p>`;
            }
            if (!p.slug) {
              p.slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            }
            return p;
          });
          setProducts(normalized);
        }
      } catch (e) {
        console.log('Using default fallback products data.', e);
      }
    };
    fetchProducts();
  }, []);

  // Filter products by wishlist IDs
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));
  // Discover More: products NOT in wishlist
  const discoverProducts = products.filter(p => !wishlist.includes(p.id)).slice(0, 4);

  const handleAddAllToCart = () => {
    wishlistProducts.forEach(p => {
      addToCart({ ...p, selectedSize: p.sizes?.[0] || '50ml' });
    });
    showToast(`All ${wishlistProducts.length} items added to cart!`, 'success');
  };

  const handleClearWishlist = async () => {
    const result = await Swal.fire({
      title: 'Clear Wishlist?',
      text: 'Are you sure you want to clear your entire wishlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#666666',
      background: '#FFFFFF',
      color: '#04152F'
    });

    if (result.isConfirmed) {
      wishlistProducts.forEach(p => toggleWishlist(p.id));
      showToast('Wishlist cleared.', 'success');
    }
  };

  return (
    <div className="page-transition">
      <Helmet>
        <title>My Wishlist | BUXAA</title>
        <meta name="description" content="Manage your favorite saved backpacks, suitcases, and work briefcases on BUXAA." />
      </Helmet>
      {/* ── Page Hero ── */}
      <div
        className="page-hero has-banner"
        style={{
          backgroundImage: `url('/images/MyWishlistbanner.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dark overlay for text readability when image is set */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(10,35,77,0.72) 0%, rgba(26,18,8,0.60) 100%)',
          zIndex: 0
        }} />
        <div
          className="container"
          style={{
            maxWidth: '1600px', margin: '0 auto', padding: '0 2rem',
            position: 'relative', zIndex: 1,
            textAlign: 'center',
            width: '100%',
          }}
        >
          <div className="breadcrumb" style={{
            fontSize: '0.82rem',
            color: 'rgba(255,255,255,0.75)',
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.25rem'
          }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.75)' }}>Home</Link>
            <span> › </span>
            <span>My Wishlist</span>
          </div>
          <h1 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.5rem',
            margin: '0 0 0.5rem',
            color: '#FFFFFF',
            textShadow: '0 2px 12px rgba(0,0,0,0.4)'
          }}>
            My Wishlist
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.85)',
            margin: '0 auto',
            maxWidth: '600px',
            textAlign: 'center'
          }}>Your saved bags and gear — curated with love</p>
        </div>
      </div>

      <main className="container" style={{ maxWidth: '1600px', margin: '0 auto', padding: '3rem 2rem' }}>

        {/* Empty State */}
        {wishlistProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <Heart size={64} className="text-[var(--text-pale)] mb-6 mx-auto" />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: 'var(--text-dark)', marginBottom: '0.75rem' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: 'var(--text-light)', maxWidth: '380px', margin: '0 auto 2rem', lineHeight: '1.7', fontSize: '0.9rem' }}>
              Save your favorite items and come back to them anytime.
            </p>
            <Link to="/shop" className="btn btn-gold">Explore Bags & Gear →</Link>
          </div>
        ) : (
          <>
            {/* Wishlist Header — count + action buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
                {wishlistProducts.length} item{wishlistProducts.length > 1 ? 's' : ''} saved
              </span>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleAddAllToCart}
                  className="btn btn-gold btn-sm"
                >
                  Add All to Cart
                </button>
                <button
                  onClick={handleClearWishlist}
                  className="btn btn-outline btn-sm"
                  style={{ color: 'var(--text-light)' }}
                >
                  Clear Wishlist
                </button>
              </div>
            </div>

            {/* Wishlist Grid */}
            <div className="grid-4" id="wishlist-grid">
              {wishlistProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        {/* ── Discover More ── */}
        {discoverProducts.length > 0 && (
          <section style={{ marginTop: '5rem' }}>
            <div className="section-header">
              <span className="section-eyebrow">Discover More</span>
              <h2>You Might Also Love</h2>
            </div>
            <div className="grid-4" id="discover-more">
              {discoverProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
