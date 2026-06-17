import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/SkeletonLoader';
import {
  SCENT_FAMILIES,
  formatPrice,
} from '../constants/storeData';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Compass,
  Briefcase,
  Star
} from 'lucide-react';


export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtering & Sorting State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedScent, setSelectedScent] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [maxPrice, setMaxPrice] = useState(12000);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const location = useLocation();
  const navigate = useNavigate();

  // Load products & categories on start
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/products?t=' + Date.now());
        if (res.ok) {
          const raw = await res.json();
          const normalized = raw.map(p => {
            if (p.notes) {
              const toArr = (n) => Array.isArray(n) ? n : (n || '').split(',').map(s => s.trim()).filter(Boolean);
              p.notes = {
                top: toArr(p.notes.top),
                heart: toArr(p.notes.heart),
                base: toArr(p.notes.base)
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
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories?t=' + Date.now());
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setCategories(data);
          }
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Sync state with URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const cat = params.get('cat');
    if (cat) setSelectedCategory(cat);
    else setSelectedCategory('all');

    const scent = params.get('scent');
    if (scent) setSelectedScent(scent);
    else setSelectedScent('all');

    const gender = params.get('gender');
    if (gender) setSelectedGender(gender);
    else setSelectedGender('all');

    const search = params.get('search');
    if (search) {
      // Keep search filters, clear others to show search outcomes clearly
      setSelectedCategory('all');
      setSelectedScent('all');
      setSelectedGender('all');
    }

    setCurrentPage(1);
  }, [location.search]);

  // Read URL Search query
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  // Filter products logic
  const filteredProducts = products.filter(product => {
    // 1. Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchSubtitle = product.subtitle.toLowerCase().includes(q);
      const matchBrand = product.brand.toLowerCase().includes(q);
      const matchScent = product.scentFamily.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      if (!matchName && !matchSubtitle && !matchBrand && !matchScent && !matchCategory) {
        return false;
      }
    }

    // 2. Category
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // 3. Scent Family
    if (selectedScent !== 'all' && product.scentFamily !== selectedScent) {
      return false;
    }

    // 4. Gender
    if (selectedGender !== 'all' && product.gender !== selectedGender) {
      return false;
    }

    // 5. Price
    if (product.price > maxPrice) {
      return false;
    }

    return true;
  });

  // Sort products logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
    // Featured / Bestseller default
    return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
  });

  // Pagination bounds
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handleFilterClick = (type, value) => {
    const params = new URLSearchParams(location.search);
    params.delete('search'); // Clear search on explicit category click
    if (value === 'all') {
      params.delete(type);
    } else {
      params.set(type, value);
    }
    navigate(`/shop?${params.toString()}`);
  };

  const handleClearAll = () => {
    setMaxPrice(12000);
    setSortBy('featured');
    navigate('/shop');
  };

  // Dynamic category title and description lookup
  const getCategoryMeta = () => {
    let title = 'All Bags & Gear';
    let desc = 'Explore our complete collection of premium travel and business bags';
    let heroBg = null;

    if (selectedCategory === 'travel-bags' || selectedCategory === 'travel-collection') {
      title = 'Travel Bags';
      desc = 'Discover premium travel bags designed for business trips, weekend getaways, and everyday adventures. Built for comfort, organization, and durability wherever you go.';
      heroBg = '/images/Travelbagbanner.png';
    } else if (selectedCategory === 'laptop-bags' || selectedCategory === 'business-bags') {
      title = 'All Bags & Gear';
      desc = 'Discover premium bags and gear crafted for modern lifestyles, seamless travel, and everyday organization.';
      heroBg = '/images/bannerlaptopbag.png';
    } else if (selectedCategory === 'corporate-gifting') {
      title = 'Corporate Gifting';
      desc = 'Premium gifting solutions designed to leave a lasting impression on employees, clients, and business partners.';
      heroBg = '/images/giftbanner.png';
    } else if (selectedCategory !== 'all') {
      const cat = categories.find(c => c.slug === selectedCategory);
      if (cat) {
        title = cat.name;
        desc = `Explore our collection of premium ${cat.name.toLowerCase()}`;
      }
    }
    return { title, desc, heroBg };
  };

  const { title: pageTitle, desc: pageDesc, heroBg } = getCategoryMeta();

  return (
    <div className="page-transition">
      <Helmet>
        <title>{`${pageTitle} | BUXAA`}</title>
        <meta name="description" content={pageDesc} />
      </Helmet>

      {/* ── Mobile Filter Overlay ── */}
      {mobileFilterOpen && (
        <div
          onClick={() => setMobileFilterOpen(false)}
          style={{
            position: 'fixed', inset: 0, background: 'rgba(26,18,8,0.5)',
            zIndex: 1100, backdropFilter: 'blur(2px)'
          }}
        />
      )}

      {/* ── Page Hero ── */}
      <div
        className={`page-hero${heroBg ? ' has-banner' : ''}`}
        style={heroBg ? {
          backgroundImage: `url('${heroBg}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative',
          overflow: 'hidden',
        } : {}}
      >
        {/* Dark overlay for text readability when image is set */}
        {heroBg && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(10,35,77,0.72) 0%, rgba(26,18,8,0.60) 100%)',
            zIndex: 0
          }} />
        )}
        <div
          className="container"
          style={{
            maxWidth: '1600px', margin: '0 auto', padding: '0 2rem',
            position: 'relative', zIndex: 1,
            textAlign: heroBg ? 'center' : 'left',
            width: '100%',
          }}
        >
          <div className="breadcrumb" style={{
            fontSize: '0.82rem',
            color: heroBg ? 'rgba(255,255,255,0.75)' : 'var(--text-light)',
            marginBottom: '0.5rem',
            display: 'flex',
            justifyContent: heroBg ? 'center' : 'flex-start',
            gap: '0.25rem'
          }}>
            <Link to="/" style={{ color: heroBg ? 'rgba(255,255,255,0.75)' : 'var(--text-light)' }}>Home</Link><span> › </span><span>Shop</span>
          </div>
          <h1 id="shop-page-title" style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '2.5rem',
            margin: '0 0 0.5rem',
            color: heroBg ? '#FFFFFF' : 'var(--text-dark)',
            textShadow: heroBg ? '0 2px 12px rgba(0,0,0,0.4)' : 'none'
          }}>
            {pageTitle}
          </h1>
          <p style={{
            color: heroBg ? 'rgba(255,255,255,0.85)' : 'var(--text-light)',
            margin: heroBg ? '0 auto' : '0',
            maxWidth: '600px',
            textAlign: heroBg ? 'center' : 'left'
          }}>{pageDesc}</p>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <main className="container" style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 2rem' }}>

        {/* Mobile Filter Trigger */}
        <button
          className="mobile-filter-btn"
          onClick={() => setMobileFilterOpen(true)}
        >
          <span>⊞</span> Filters
          {(selectedCategory !== 'all' || selectedScent !== 'all' || selectedGender !== 'all') && (
            <span className="mobile-filter-badge">●</span>
          )}
        </button>

        <div className="shop-layout">

          {/* ── Filter Sidebar ── */}
          <aside className={`filter-sidebar${mobileFilterOpen ? ' mobile-open' : ''}`}>
            {/* Mobile sidebar header */}
            <div className="filter-sidebar-mobile-header">
              <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>Filters</span>
              <button onClick={() => setMobileFilterOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-dark)' }}>✕</button>
            </div>
            <div className="filter-sidebar-sticky">

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h4 style={{ margin: 0, fontFamily: 'Playfair Display, serif', fontSize: '1.1rem' }}>Filters</h4>
                <button className="filter-clear-all" onClick={handleClearAll} style={{ border: 'none', background: 'transparent' }}>
                  Clear All
                </button>
              </div>

              {/* Category */}
              <div className="filter-panel">
                <div className="filter-panel-title">
                  Category <span className="toggle-icon open">▾</span>
                </div>
                <div className="filter-options">
                  <label className="filter-option" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={selectedCategory === 'all'}
                      onChange={() => handleFilterClick('cat', 'all')}
                      style={{ accentColor: 'var(--gold)', width: '15px', height: '15px', cursor: 'pointer' }}
                    />
                    <label style={{ fontSize: '0.88rem', color: 'var(--text-mid)', cursor: 'pointer', flex: 1 }}>All</label>
                  </label>
                  {categories.map(c => (
                    <label key={c.id || c._id} className="filter-option" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedCategory === c.slug}
                        onChange={() => handleFilterClick('cat', c.slug)}
                        style={{ accentColor: 'var(--gold)', width: '15px', height: '15px', cursor: 'pointer' }}
                      />
                      <label style={{ fontSize: '0.88rem', color: 'var(--text-mid)', cursor: 'pointer', flex: 1 }}>{c.name}</label>
                      <span className="filter-count" style={{ fontSize: '0.75rem', color: 'var(--text-pale)', background: 'var(--warm-gray)', padding: '1px 6px', borderRadius: '10px' }}>
                        {c.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="filter-panel">
                <div className="filter-panel-title">
                  Material <span className="toggle-icon open">▾</span>
                </div>
                <div className="filter-options">
                  {(() => {
                    const MaterialIconMap = {
                      ShieldCheck,
                      Compass,
                      Briefcase,
                      Star,
                      Sparkles
                    };
                    return SCENT_FAMILIES.map(s => {
                      const IconComponent = MaterialIconMap[s.icon] || Sparkles;
                      return (
                        <label key={s.id} className="filter-option" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={selectedScent === s.id}
                            onChange={() => handleFilterClick('scent', selectedScent === s.id ? 'all' : s.id)}
                            style={{ accentColor: 'var(--gold)', width: '15px', height: '15px', cursor: 'pointer' }}
                          />
                          <IconComponent size={14} color="var(--gold-dark)" strokeWidth={1.75} style={{ opacity: 0.8 }} />
                          <label style={{ fontSize: '0.88rem', color: 'var(--text-mid)', cursor: 'pointer', flex: 1 }}>{s.name}</label>
                        </label>
                      );
                    });
                  })()}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-panel">
                <div className="filter-panel-title">
                  Price Range <span className="toggle-icon open">▾</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-light)' }}>
                  <span>₹500</span>
                  <span>Up to {formatPrice(maxPrice)}</span>
                </div>
              </div>

              {/* Bag Style / Usage */}
              <div className="filter-panel">
                <div className="filter-panel-title">
                  Style &amp; Usage <span className="toggle-icon open">▾</span>
                </div>
                <div className="filter-options">
                  {[
                    { label: 'All Usages', val: 'all' },
                    { label: 'Travel Gear', val: 'travel' },
                    { label: 'Daily Commute', val: 'commute' },
                    { label: 'Custom Gifting', val: 'custom' }
                  ].map(g => (
                    <label key={g.val} className="filter-option" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="gender"
                        checked={selectedGender === g.val}
                        onChange={() => handleFilterClick('gender', g.val)}
                        style={{ accentColor: 'var(--gold)', cursor: 'pointer' }}
                      />
                      <label style={{ fontSize: '0.88rem', color: 'var(--text-mid)', cursor: 'pointer', flex: 1 }}>{g.label}</label>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Mobile Apply button */}
            <div className="filter-sidebar-mobile-footer">
              <button
                className="btn btn-gold"
                style={{ width: '100%' }}
                onClick={() => setMobileFilterOpen(false)}
              >
                Show {totalItems} Result{totalItems !== 1 ? 's' : ''}
              </button>
            </div>

          </aside>

          {/* ── Products Area ── */}
          <div className="products-area">

            {/* Search outcome banner */}
            {searchQuery && (
              <div className="active-filters" style={{ marginBottom: '1.5rem', background: 'var(--cream)', border: '1px solid var(--border)', padding: '1rem', borderRadius: '4px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-mid)' }}>
                  Showing results for search: <strong>"{searchQuery}"</strong> ({totalItems} items found)
                </span>
                <button
                  onClick={handleClearAll}
                  style={{ border: 'none', background: 'transparent', marginLeft: 'auto', fontSize: '0.78rem', color: 'var(--gold-dark)', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Clear Search ✕
                </button>
              </div>
            )}

            {/* Toolbar */}
            <div className="products-toolbar">
              <span className="products-count">
                Showing {totalItems} product{totalItems !== 1 ? 's' : ''}
              </span>
              <div className="products-toolbar-right">
                <select
                  className="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
                <div className="view-toggle">
                  <button
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Grid view"
                  >
                    ⊞
                  </button>
                  {/* <button
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="List view"
                  >
                    ☰
                  </button> */}
                </div>
              </div>
            </div>

            {/* Products Grid / List */}
            {loading ? (
              <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                {Array.from({ length: 8 }).map((_, idx) => (
                  <ProductCardSkeleton key={idx} />
                ))}
              </div>
            ) : totalItems === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                <Search size={48} strokeWidth={1.2} style={{ color: 'var(--text-light)', margin: '0 auto 1.5rem', display: 'block' }} />
                <h3>No products found</h3>
                <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>Try adjusting your filters or search terms</p>
                <button className="btn btn-gold" onClick={handleClearAll}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`products-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
                {currentItems.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  ‹
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  ›
                </button>
              </div>
            )}

          </div>

        </div>
      </main>

    </div>
  );
}
