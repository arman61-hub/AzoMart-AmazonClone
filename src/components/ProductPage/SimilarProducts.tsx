"use client";

import React from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import StarRating from "../ui/StarRating";
import { Product } from "@/types";

interface SimilarProductsProps {
  products: Product[];
}

export default function SimilarProducts({ products }: SimilarProductsProps) {
  if (products.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm font-sans w-full mt-8">
      <h3 className="text-lg font-bold text-gray-900 border-b border-gray-150 pb-3 mb-4">
        Customers who viewed this item also viewed
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {products.map((prod) => (
          <Link
            key={prod.id}
            href={`/product/${prod.id}`}
            className="flex flex-col p-2 rounded hover:shadow-md transition-all duration-200 group hover:bg-gray-50 border border-transparent hover:border-gray-150"
          >
            {/* Image */}
            <div className="relative w-full pt-[100%] overflow-hidden mb-2 bg-white flex justify-center items-center">
              <img
                src={prod.images[0] || "/placeholder.png"}
                alt={prod.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-102 transition-all duration-300"
              />
            </div>

            {/* Title */}
            <span className="text-xs font-semibold text-amazon-river group-hover:text-red-700 group-hover:underline line-clamp-2 min-h-[32px] leading-tight mb-1">
              {prod.title}
            </span>

            {/* Stars */}
            <div className="mb-1 shrink-0">
              <StarRating rating={prod.ratingAvg} size={11} />
            </div>

            {/* Price */}
            <span className="text-sm font-bold text-gray-900 mt-auto">
              {formatPrice(prod.price)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
