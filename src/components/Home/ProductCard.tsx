"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ShoppingCart, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import StarRating from "../ui/StarRating";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Stop navigation to details page
    e.stopPropagation();
    setIsAdding(true);
    try {
      await addToCart(product.id, 1);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (err) {
      console.error("Add to cart error:", err);
      setIsAdding(false);
    }
  };

  const handleCardClick = () => {
    router.push(`/product/${product.id}`);
  };

  // Prime delivery simulation
  const isPrimeEligible = product.price > 500;

  return (
    <div
      onClick={handleCardClick}
      className="bg-white border border-gray-200 rounded-lg flex flex-col p-4 shadow-sm hover:shadow-lg transition-all duration-300 relative group h-full cursor-pointer"
    >
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block relative w-full pt-[100%] overflow-hidden mb-3">
        <img
          src={product.images[0] || "/placeholder.png"}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />
        {product.discount > 0 && (
          <span className="absolute top-0 left-0 bg-red-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-br shadow-sm">
            {product.discount}% OFF
          </span>
        )}
      </Link>

      {/* Product Title */}
      <Link
        href={`/product/${product.id}`}
        className="text-sm font-medium text-gray-800 hover:text-amazon-river hover:underline line-clamp-2 min-h-[40px] mb-1 font-sans"
      >
        {product.title}
      </Link>

      {/* Brand */}
      <span className="text-xs text-gray-500 mb-1">{product.brand}</span>

      {/* Star Rating */}
      <div className="mb-2">
        <StarRating
          rating={product.ratingAvg}
          reviewsCount={product.ratingCount}
          showText={true}
          size={14}
        />
      </div>

      {/* Price Section */}
      <div className="flex items-baseline space-x-1.5 mb-1.5 font-sans">
        <span className="text-xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        {product.discount > 0 && (
          <>
            <span className="text-xs text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          </>
        )}
      </div>

      {/* Prime Badge / Delivery info */}
      <div className="flex flex-col text-xs text-gray-500 mb-4 space-y-0.5 leading-tight">
        {isPrimeEligible ? (
          <div className="flex items-center space-x-1">
            <span className="font-extrabold italic text-blue-600 text-[10px]">prime</span>
            <span>Get it tomorrow</span>
          </div>
        ) : (
          <span>Ships in 2-3 days</span>
        )}
        <span>FREE Delivery over ₹500</span>
      </div>

      {/* Add To Cart button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || product.stock === 0}
        className={`w-full py-1.5 px-3 rounded-full text-xs font-semibold flex items-center justify-center space-x-1.5 border border-none shadow-sm transition-all outline-none mt-auto cursor-pointer ${
          product.stock === 0
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : justAdded
            ? "bg-green-600 hover:bg-green-700 text-white"
            : "bg-amazon-yellow hover:bg-amazon-yellow-hover text-amazon-dark active:scale-[0.98]"
        }`}
      >
        {isAdding ? (
          <div className="w-4 h-4 border-2 border-amazon-dark border-t-transparent rounded-full animate-spin"></div>
        ) : justAdded ? (
          <>
            <Check size={14} className="stroke-[2.5]" />
            <span>Added!</span>
          </>
        ) : product.stock === 0 ? (
          <span>Out of Stock</span>
        ) : (
          <>
            <ShoppingCart size={14} />
            <span>Add to Cart</span>
          </>
        )}
      </button>
    </div>
  );
}
