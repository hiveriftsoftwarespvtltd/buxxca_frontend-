import React from "react";
import { Link } from "react-router-dom";

export const MegaMenu = ({ children = [], isOpen, onClose }) => {
  if (!isOpen || children.length === 0) return null;

  // Let's divide children into columns (4 columns max for balance)
  const columns = [];
  const colSize = Math.ceil(children.length / 3);

  for (let i = 0; i < children.length; i += colSize) {
    columns.push(children.slice(i, i + colSize));
  }

  return (
    <div
      className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-brand-border py-6 z-40 transition-all duration-300 transform opacity-100 translate-y-0"
      onMouseLeave={onClose}
    >
      <div className="container mx-auto px-4 grid grid-cols-4 gap-8">
        {columns.map((col, idx) => (
          <div key={idx} className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold border-b border-brand-border pb-1">
              Links Group {idx + 1}
            </h4>
            <ul className="space-y-2">
              {col.map((child) => (
                <li key={child.title}>
                  <Link
                    to={child.path}
                    onClick={onClose}
                    className="text-sm text-brand-dark hover:text-brand-primary block hover:translate-x-1 transition-transform"
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Promo banner inside the mega menu */}
        <div className="bg-brand-light p-4 rounded-md flex flex-col justify-between border border-brand-border">
          <div>
            <span className="text-[10px] font-bold uppercase text-brand-primary tracking-wider bg-blue-100 px-2 py-0.5 rounded">
              Special Offer
            </span>
            <h5 className="font-bold text-brand-dark mt-2 text-md">Voyager Series</h5>
            <p className="text-xs text-brand-muted mt-1">
              Engineered polycarbonate carry-ons starting from $149.
            </p>
          </div>
          <Link
            to="/shop"
            onClick={onClose}
            className="text-xs text-brand-gold font-bold hover:underline mt-4 block"
          >
            Shop Collection →
          </Link>
        </div>
      </div>
    </div>
  );
};
export default MegaMenu;
