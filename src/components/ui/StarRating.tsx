import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  showText?: boolean;
  reviewsCount?: number;
}

export default function StarRating({
  rating,
  size = 16,
  showText = false,
  reviewsCount,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.4 && rating % 1 <= 0.8;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center text-amber-500">
        {/* Full Stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            className="fill-amber-500 stroke-amber-500"
          />
        ))}

        {/* Half Star */}
        {hasHalfStar && (
          <div className="relative inline-block">
            <Star size={size} className="text-gray-300 fill-gray-300" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
              <Star size={size} className="fill-amber-500 stroke-amber-500" />
            </div>
          </div>
        )}

        {/* Empty Stars */}
        {Array.from({ length: Math.max(0, emptyStars) }).map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-gray-300 fill-gray-100" />
        ))}
      </div>

      {showText && (
        <span className="text-sm font-medium text-amazon-river hover:underline cursor-pointer ml-1">
          {rating.toFixed(1)} {reviewsCount !== undefined && `(${reviewsCount} reviews)`}
        </span>
      )}
    </div>
  );
}
