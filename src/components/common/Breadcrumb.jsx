import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex py-3 text-brand-muted text-xs md:text-sm bg-gray-50 px-4 rounded-md mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-brand-muted hover:text-brand-primary">
            <Home className="w-3.5 h-3.5 mr-1" />
            Home
          </Link>
        </li>
        {items &&
          items.map((item, idx) => {
            const isLast = idx === items.length - 1;
            return (
              <li key={idx} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-0.5 text-gray-400" />
                {isLast ? (
                  <span className="font-semibold text-brand-dark max-w-[150px] md:max-w-none truncate">{item.name}</span>
                ) : (
                  <Link to={item.path} className="text-brand-muted hover:text-brand-primary truncate max-w-[150px] md:max-w-none">
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
      </ol>
    </nav>
  );
};
