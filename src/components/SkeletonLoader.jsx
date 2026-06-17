import React from 'react';

// Premium Shimmering skeleton loader for Product Cards
export function ProductCardSkeleton() {
  return (
    <div 
      className="product-card animate-pulse" 
      style={{ 
        overflow: 'hidden', 
        position: 'relative',
        background: 'var(--white)',
        border: '1px solid var(--border)',
        borderRadius: '4px'
      }}
    >
      {/* Image Container Placeholder */}
      <div 
        className="product-card-image bg-[#E8DFC8]/30" 
        style={{ 
          height: '320px', 
          width: '100%',
          display: 'block'
        }}
      />

      {/* Product Details Placeholder */}
      <div className="product-card-info" style={{ padding: '1.25rem', pointerEvents: 'none' }}>
        {/* Brand */}
        <div className="h-3 w-16 bg-[#E8DFC8]/50 rounded mb-2"></div>
        {/* Name */}
        <div className="h-5 w-3/4 bg-[#E8DFC8]/60 rounded mb-2"></div>
        {/* Meta (Concentration/Scent Family) */}
        <div className="h-3.5 w-1/2 bg-[#E8DFC8]/40 rounded mb-3"></div>
        {/* Rating Stars */}
        <div className="h-3.5 w-24 bg-[#E8DFC8]/50 rounded mb-4"></div>

        {/* Footer (Price and Add Button) */}
        <div className="flex justify-between items-center mt-4 pt-3" style={{ borderTop: '1px solid var(--cream)' }}>
          <div className="flex gap-2 items-center">
            <div className="h-5 w-16 bg-[#E8DFC8]/60 rounded"></div>
            <div className="h-3.5 w-10 bg-[#E8DFC8]/30 rounded"></div>
          </div>
          <div className="h-8 w-8 bg-[#E8DFC8]/60 rounded" style={{ borderRadius: '4px' }}></div>
        </div>
      </div>
    </div>
  );
}

// Premium Shimmering skeleton loader for Category Grid Cards
export function CategoryCardSkeleton() {
  return (
    <div 
      className="category-card animate-pulse bg-[#E8DFC8]/30" 
      style={{ 
        minHeight: '220px', 
        display: 'block', 
        position: 'relative',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid var(--border)'
      }}
    >
      <div className="category-overlay" style={{ background: 'rgba(26, 18, 8, 0.03)' }} />
      <div className="category-info" style={{ pointerEvents: 'none', position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', zIndex: 5 }}>
        <div className="h-5 w-28 bg-[#FFFDF7]/50 rounded mb-2"></div>
        <div className="h-3.5 w-20 bg-[#FFFDF7]/30 rounded"></div>
      </div>
    </div>
  );
}
