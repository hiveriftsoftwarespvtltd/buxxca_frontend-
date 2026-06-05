import React from "react";
import { X } from "lucide-react";
import { formatPrice } from "../../../utils/formatPrice";

export const ActiveFilters = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const { category, priceRange, brands = [], minRating, colors = [] } = activeFilters;

  const hasPriceFilter = priceRange && (priceRange[0] > 0 || priceRange[1] < 500);
  const hasActive = category || hasPriceFilter || brands.length > 0 || minRating || colors.length > 0;

  if (!hasActive) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-brand-dark">
      <span className="text-brand-muted font-semibold mr-1">Active Filters:</span>

      {/* Category chip */}
      {category && (
        <span className="inline-flex items-center gap-1 bg-brand-light border border-brand-border px-2 py-1 rounded-full font-bold">
          <span>Category: {category}</span>
          <button onClick={() => onRemoveFilter("category")} className="text-brand-muted hover:text-red-500">
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      )}

      {/* Price chip */}
      {hasPriceFilter && (
        <span className="inline-flex items-center gap-1 bg-brand-light border border-brand-border px-2 py-1 rounded-full font-bold">
          <span>Price: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</span>
          <button onClick={() => onRemoveFilter("priceRange")} className="text-brand-muted hover:text-red-500">
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      )}

      {/* Brands chips */}
      {brands.map((b) => (
        <span key={b} className="inline-flex items-center gap-1 bg-brand-light border border-brand-border px-2 py-1 rounded-full font-bold">
          <span>Brand: {b}</span>
          <button onClick={() => onRemoveFilter("brands", b)} className="text-brand-muted hover:text-red-500">
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}

      {/* Rating chip */}
      {minRating && (
        <span className="inline-flex items-center gap-1 bg-brand-light border border-brand-border px-2 py-1 rounded-full font-bold">
          <span>Rating: {minRating}★ &amp; Up</span>
          <button onClick={() => onRemoveFilter("minRating")} className="text-brand-muted hover:text-red-500">
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      )}

      {/* Colors chips */}
      {colors.map((c) => (
        <span key={c} className="inline-flex items-center gap-1 bg-brand-light border border-brand-border px-2 py-1 rounded-full font-bold">
          <span>Color: {c}</span>
          <button onClick={() => onRemoveFilter("colors", c)} className="text-brand-muted hover:text-red-500">
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}

      {/* Clear all link */}
      <button
        onClick={onClearAll}
        className="text-[11px] text-red-500 hover:text-red-700 font-bold hover:underline ml-1"
      >
        Clear All
      </button>

    </div>
  );
};
export default ActiveFilters;
