import React from "react";
import { User } from "lucide-react";
import { Review } from "@/types";
import StarRating from "../ui/StarRating";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Format Date beautifully
  const formattedDate = new Date(review.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white border-b border-gray-150 py-4 space-y-2 font-sans text-sm w-full last:border-b-0">
      {/* User Name & Profile */}
      <div className="flex items-center space-x-2">
        <div className="bg-gray-200 text-gray-500 p-1.5 rounded-full">
          <User size={16} />
        </div>
        <span className="font-semibold text-gray-800 text-xs">
          {review.userName}
        </span>
      </div>

      {/* Star Rating & Review Title */}
      <div className="flex items-center space-x-2">
        <StarRating rating={review.rating} size={14} />
        <span className="font-extrabold text-gray-900 text-xs">
          {review.title}
        </span>
      </div>

      {/* Date & Verified Purchase */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 text-xs text-gray-500 leading-tight">
        <span>Reviewed in India on {formattedDate}</span>
        <span className="hidden sm:inline">|</span>
        <span className="text-[#c45500] font-bold">Verified Purchase</span>
      </div>

      {/* Comment */}
      <p className="text-gray-700 leading-relaxed text-sm pt-1">
        {review.comment}
      </p>

      {/* Helpful button simulation */}
      <div className="flex items-center space-x-3 pt-1 text-xs">
        <button className="bg-white hover:bg-gray-50 border border-gray-300 rounded-md px-3 py-1 font-semibold cursor-pointer active:scale-95 transition-all text-gray-700 shadow-sm">
          Helpful
        </button>
        <span className="text-gray-400">|</span>
        <span className="text-gray-500 hover:text-amazon-river cursor-pointer hover:underline">
          Report abuse
        </span>
      </div>
    </div>
  );
}
