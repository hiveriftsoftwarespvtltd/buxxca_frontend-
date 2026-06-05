import React from "react";

export const Spinner = ({ size = "md", color = "primary" }) => {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  };

  const colorClasses = {
    primary: "border-brand-primary",
    gold: "border-brand-gold",
    white: "border-white"
  };

  return (
    <div className="flex items-center justify-center py-6">
      <div
        className={`animate-spin rounded-full border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
