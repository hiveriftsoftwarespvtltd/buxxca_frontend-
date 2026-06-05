import React from "react";
import { Star } from "lucide-react";

export const RatingStars = ({ rating = 0, count }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4;
  
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-brand-gold">
        {[...Array(5)].map((_, i) => {
          if (i < fullStars) {
            return <Star key={i} className="w-3.5 h-3.5 fill-current" />;
          } else if (i === fullStars && hasHalfStar) {
            return (
              <div key={i} className="relative w-3.5 h-3.5 overflow-hidden">
                <Star className="absolute top-0 left-0 w-3.5 h-3.5 text-gray-300" />
                <div className="absolute top-0 left-0 w-[50%] h-full overflow-hidden">
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
            );
          } else {
            return <Star key={i} className="w-3.5 h-3.5 text-gray-300" />;
          }
        })}
      </div>
      {count !== undefined && (
        <span className="text-xs text-brand-muted">({count})</span>
      )}
    </div>
  );
};
