import React from "react";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../../../hooks/useCart";
import { formatPrice } from "../../../utils/formatPrice";

export const MiniCart = ({ onClose }) => {
  const { items, subtotal, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="p-4 text-center text-brand-muted text-sm w-72">
        Your shopping cart is empty.
      </div>
    );
  }

  return (
    <div className="p-4 w-80 bg-white rounded-md shadow-lg border border-brand-border">
      {/* Scrollable list */}
      <div className="max-h-60 overflow-y-auto divide-y divide-brand-border pr-1 custom-scrollbar">
        {items.map((item) => (
          <div key={`${item.id}-${item.variant}`} className="flex gap-3 py-3 items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 rounded object-cover border border-brand-border"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <Link
                to={`/product/${item.id}`}
                onClick={onClose}
                className="text-xs font-semibold text-brand-dark hover:text-brand-primary block truncate"
              >
                {item.name}
              </Link>
              {item.variant && (
                <p className="text-[10px] text-brand-muted">Variant: {item.variant}</p>
              )}
              <p className="text-xs font-semibold text-brand-gold mt-0.5">
                {item.qty} × {formatPrice(item.price)}
              </p>
            </div>
            <button
              onClick={() => removeItem(item.id, item.variant)}
              className="text-gray-400 hover:text-red-500 p-1 transition-colors"
              aria-label="Remove item"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-brand-border pt-3 mt-2">
        <div className="flex justify-between items-center text-sm font-semibold text-brand-dark mb-4">
          <span>Subtotal</span>
          <span className="text-brand-primary font-bold">{formatPrice(subtotal)}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link
            to="/cart"
            onClick={onClose}
            className="text-center bg-brand-light text-brand-dark text-xs font-bold py-2 rounded border border-brand-border hover:bg-gray-200 transition-colors"
          >
            View Cart
          </Link>
          <Link
            to="/checkout"
            onClick={onClose}
            className="text-center bg-brand-primary text-white text-xs font-bold py-2 rounded hover:bg-blue-800 transition-colors"
          >
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MiniCart;
