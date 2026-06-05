import React from "react";
import { Inbox } from "lucide-react";

export const EmptyState = ({
  icon: Icon = Inbox,
  title = "No items found",
  message = "Please check back later or modify your filters.",
  children
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-white rounded-lg border border-brand-border">
      <Icon className="w-12 h-12 text-gray-300 mb-4" />
      <h3 className="text-lg font-semibold text-brand-dark mb-1">{title}</h3>
      <p className="text-brand-muted text-sm max-w-sm mb-6">{message}</p>
      {children}
    </div>
  );
};
