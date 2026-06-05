import React from "react";
import { Link } from "react-router-dom";
import { X, BarChart2 } from "lucide-react";
import { useCompare } from "../../../hooks/useCompare";

export const CompareBar = () => {
  const { items, removeFromCompare, clearCompare } = useCompare();

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t-2 border-brand-primary shadow-2xl z-40 py-3 animate-fade-in">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side Message */}
        <div className="flex items-center gap-2">
          <BarChart2 className="w-5 h-5 text-brand-primary rotate-90" />
          <span className="text-xs font-bold text-brand-dark">
            Comparing {items.length} product{items.length > 1 ? "s" : ""} (Max 4)
          </span>
        </div>

        {/* Center Thumbnails */}
        <div className="flex items-center gap-4 overflow-x-auto max-w-full py-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="relative w-12 h-12 rounded border border-brand-border bg-gray-50 flex items-center justify-center p-1 flex-shrink-0 group"
            >
              <img src={item.images ? item.images[0] : ""} alt="" className="max-h-full max-w-full object-contain" />
              <button
                onClick={() => removeFromCompare(item.id)}
                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 transition-colors"
                aria-label="Remove from compare"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
          {/* Placeholders up to 4 */}
          {[...Array(Math.max(0, 4 - items.length))].map((_, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded border-2 border-dashed border-gray-200 flex items-center justify-center text-[10px] text-gray-300 font-bold"
            >
              +
            </div>
          ))}
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={clearCompare}
            className="text-xs text-brand-muted hover:text-brand-dark font-semibold px-3 py-2"
          >
            Clear All
          </button>
          <Link
            to="/compare"
            className="bg-brand-primary text-white text-xs font-bold px-5 py-2 rounded hover:bg-blue-800 transition-colors"
          >
            Compare Now
          </Link>
        </div>

      </div>
    </div>
  );
};
export default CompareBar;
