import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Briefcase,
  Laptop,
  Backpack,
  Compass,
  ShoppingBag,
  Folder,
  Gift,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { getImageUrl } from '../../constants/storeData';

const iconMap = {
  'backpacks': Backpack,
  'laptop-bags': Laptop,
  'travel-bags': Briefcase,
  'sling-bags': Compass,
  'corporate-gifting': Gift,
  'organizers': Folder,
  'gym-sports': ShoppingBag,
  'premium-collection': Sparkles,
};

const descMap = {
  'backpacks': 'Casual, travel & office backpacks',
  'laptop-bags': 'Office, messenger & sleeves',
  'travel-bags': 'Travel organizers, weekender & more',
  'sling-bags': 'Crossbody, mini & travel slings',
  'corporate-gifting': 'Custom gifting & bulk orders',
  'organizers': 'Gadget, cable & utility cases',
  'gym-sports': 'Gym bags, sports duffels & shoe bags',
  'premium-collection': 'Latest premium designs & trending series',
};

export default function CategoriesGrid() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const VISIBLE = 8;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/categories?t=' + Date.now());
        if (res.ok) {
          const raw = await res.json();
          setCategories(raw);
        }
      } catch (err) {
        console.error('Error fetching categories for grid:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-[#F5F5F5]">
        <div className="max-w-[1600px] mx-auto px-6 text-center">
          <p style={{ color: 'var(--text-light)', fontSize: '0.88rem' }}>Loading collections...</p>
        </div>
      </section>
    );
  }

  const total = categories.length;
  const showCarousel = total > VISIBLE;
  const canGoLeft = currentIndex > 0;
  const canGoRight = showCarousel && currentIndex < total - VISIBLE;

  const slideLeft = () => setCurrentIndex((p) => Math.max(p - 1, 0));
  const slideRight = () => setCurrentIndex((p) => Math.min(p + 1, total - VISIBLE));

  // Shared card renderer — same sizes as the original grid
  const renderCard = (cat, idx) => {
    const IconComponent = iconMap[cat.slug] || Sparkles;
    const desc = (cat.subItems && cat.subItems.length > 0)
      ? cat.subItems.join(', ')
      : (descMap[cat.slug] || cat.name);
    return (
      <div
        key={idx}
        onClick={() => navigate(cat.slug ? `/shop?cat=${cat.slug}` : '/shop')}
        className="group flex flex-col items-center text-center cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
      >
        {/* Top icon circle — same as original */}
        <div className="relative w-16 h-16 rounded-full bg-white flex items-center justify-center text-[#0A234D] border border-gray-200 group-hover:bg-[#0A234D] group-hover:text-white transition-all duration-300 shadow-sm z-10">
          <IconComponent size={22} className="transform group-hover:scale-110 transition-transform" />
        </div>

        {/* Circular image — overlaps icon, same as original */}
        <div className="relative -mt-6 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-gray-200 bg-white shadow-md group-hover:shadow-lg transition-all duration-300">
          <img
            src={getImageUrl(cat.img)}
            alt={cat.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-[#04152F]/10 group-hover:bg-[#04152F]/30 transition-colors" />
        </div>

        {/* Name */}
        <h4 className="mt-3 font-semibold text-sm text-[#1E1E1E] group-hover:text-[#D4A23A] font-sans transition-colors line-clamp-1">
          {cat.name}
        </h4>
        {/* Desc */}
        <span className="mt-1 text-[10px] text-gray-500 font-sans leading-tight max-w-[100px] line-clamp-2">
          {desc}
        </span>
      </div>
    );
  };

  return (
    <section className="py-16 bg-[#F5F5F5]">
      <div className="max-w-[1600px] mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="block text-[#D4A23A] font-semibold tracking-[0.2em] text-xs font-sans uppercase mb-2">
              PREMIUM COLLECTION
            </span>
            <h2 className="text-2xl md:text-4xl font-bold font-serif text-[#1E1E1E]">
              Discover stylish &amp; functional bags
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-wider text-[#0A234D] hover:text-[#D4A23A] transition-colors duration-300"
          >
            View All Categories &rarr;
          </Link>
        </div>

        {/* ── MOBILE swipe strip (below 1024px) ── */}
        <div
          className="flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 lg:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat, idx) => (
            <div key={idx} style={{ flex: '0 0 112px' }}>
              {renderCard(cat, idx)}
            </div>
          ))}
        </div>

        {/* ── DESKTOP (1024px+) ── */}
        {/* Using inline style display block to guarantee it's never accidentally hidden */}
        <div style={{ display: 'block' }} className="max-lg:!hidden">

          {showCarousel ? (
            /* Carousel when > 8 categories */
            <div style={{ position: 'relative' }}>

              {/* Prev button */}
              <button
                onClick={slideLeft}
                disabled={!canGoLeft}
                style={{
                  position: 'absolute',
                  left: '-22px',
                  top: '80px',
                  zIndex: 20,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: canGoLeft ? '#fff' : '#f5f5f5',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: canGoLeft ? '#0A234D' : '#d1d5db',
                  cursor: canGoLeft ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { if (canGoLeft) { e.currentTarget.style.background = '#0A234D'; e.currentTarget.style.color = '#fff'; }}}
                onMouseLeave={e => { e.currentTarget.style.background = canGoLeft ? '#fff' : '#f5f5f5'; e.currentTarget.style.color = canGoLeft ? '#0A234D' : '#d1d5db'; }}
                aria-label="Previous"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Next button */}
              <button
                onClick={slideRight}
                disabled={!canGoRight}
                style={{
                  position: 'absolute',
                  right: '-22px',
                  top: '80px',
                  zIndex: 20,
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: canGoRight ? '#fff' : '#f5f5f5',
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: canGoRight ? '#0A234D' : '#d1d5db',
                  cursor: canGoRight ? 'pointer' : 'not-allowed',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { if (canGoRight) { e.currentTarget.style.background = '#0A234D'; e.currentTarget.style.color = '#fff'; }}}
                onMouseLeave={e => { e.currentTarget.style.background = canGoRight ? '#fff' : '#f5f5f5'; e.currentTarget.style.color = canGoRight ? '#0A234D' : '#d1d5db'; }}
                aria-label="Next"
              >
                <ChevronRight size={20} />
              </button>

              {/* Clipping window */}
              <div style={{ overflow: 'hidden' }}>
                {/*
                  Track:
                  - Each item is exactly 1/8th of container (same as original grid-cols-8)
                  - Track is N/8 times wider than container
                  - Translate by currentIndex × (1/N of track) = currentIndex/8 × container width
                */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'nowrap',
                    width: `${(total / VISIBLE) * 100}%`,
                    transform: `translateX(-${(currentIndex / total) * 100}%)`,
                    transition: 'transform 0.5s ease-in-out',
                  }}
                >
                  {categories.map((cat, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: `${100 / total}%`,
                        flexShrink: 0,
                        padding: '0 8px',
                        boxSizing: 'border-box',
                      }}
                    >
                      {renderCard(cat, idx)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dot indicators */}
              {total - VISIBLE > 0 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
                  {Array.from({ length: total - VISIBLE + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      style={{
                        height: '8px',
                        width: i === currentIndex ? '24px' : '8px',
                        borderRadius: '9999px',
                        background: i === currentIndex ? '#0A234D' : '#d1d5db',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        padding: 0,
                      }}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

          ) : (
            /* Static grid when ≤ 8 — exactly like original */
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 md:gap-4">
              {categories.map((cat, idx) => renderCard(cat, idx))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
