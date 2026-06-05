import React from "react";

export const Badge = ({ text }) => {
  if (!text) return null;

  let bgClass = "bg-brand-primary text-white";
  const normalized = text.toLowerCase();

  if (normalized.includes("sale") || normalized.includes("off") || normalized.includes("%")) {
    bgClass = "bg-red-500 text-white";
  } else if (normalized.includes("hot") || normalized.includes("trend")) {
    bgClass = "bg-orange-500 text-white";
  } else if (normalized.includes("new")) {
    bgClass = "bg-brand-gold text-white";
  }

  return (
    <span className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded ${bgClass}`}>
      {text}
    </span>
  );
};
