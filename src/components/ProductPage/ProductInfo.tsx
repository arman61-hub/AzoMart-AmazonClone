"use client";

import React, { useState } from "react";
import { ShoppingCart, ShieldCheck, Truck, RotateCcw, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import StarRating from "../ui/StarRating";
import QuantitySelector from "../ui/QuantitySelector";
import { useCartStore } from "@/store/useCartStore";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCartStore();
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      await addToCart(product.id, qty);
      setIsAdding(false);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 2000);
    } catch (err) {
      console.error("Failed to add items to cart", err);
      setIsAdding(false);
    }
  };

  const savedAmount = product.originalPrice - product.price;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-sans">
      {/* Left 2 Columns: Title, Rating, Price, Features */}
      <div className="lg:col-span-2 space-y-4">
        {/* Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
          {product.title}
        </h1>

        {/* Brand */}
        <div className="text-sm font-semibold text-amazon-river hover:underline cursor-pointer">
          Brand: {product.brand}
        </div>

        {/* Ratings and count */}
        <div className="border-b border-gray-200 pb-3 flex items-center">
          <StarRating
            rating={product.ratingAvg}
            reviewsCount={product.ratingCount}
            showText={true}
            size={16}
          />
        </div>

        {/* Pricing Area */}
        <div className="border-b border-gray-200 pb-4 space-y-2">
          {product.discount > 0 ? (
            <div className="flex items-baseline space-x-2">
              <span className="text-red-600 text-2xl font-light">-{product.discount}%</span>
              <span className="text-3xl font-extrabold text-gray-900">
                {formatPrice(product.price)}
              </span>
            </div>
          ) : (
            <span className="text-3xl font-extrabold text-gray-900">
              {formatPrice(product.price)}
            </span>
          )}

          {product.discount > 0 && (
            <div className="text-sm text-gray-500">
              M.R.P.: <span className="line-through">{formatPrice(product.originalPrice)}</span>
              <span className="text-gray-900 font-semibold ml-2">
                Save {formatPrice(savedAmount)} ({product.discount}%)
              </span>
            </div>
          )}
          <div className="text-xs text-gray-600 bg-gray-100 py-1.5 px-3 rounded inline-block">
            Inclusive of all taxes
          </div>
        </div>

        {/* Features bullet list */}
        <div className="space-y-2.5">
          <h3 className="text-sm font-extrabold text-gray-900">About this item</h3>
          <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1.5">
            {product.features.map((feat, idx) => (
              <li key={idx} className="leading-normal">
                {feat}
              </li>
            ))}
          </ul>
        </div>

        {/* Description summary */}
        <div className="pt-4 border-t border-gray-200 space-y-2">
          <h3 className="text-sm font-extrabold text-gray-900">Product Description</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Right Column: Floating Buy Card */}
      <div className="lg:col-span-1">
        <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 font-sans text-sm sticky top-20">
          {/* Active Price */}
          <div>
            <span className="text-2xl font-extrabold text-gray-900">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Delivery terms */}
          <div className="space-y-1.5 text-xs text-gray-700">
            <div className="flex items-center space-x-1">
              <Truck size={14} className="text-gray-500" />
              <span>
                FREE delivery <span className="font-bold">Tomorrow</span>. Order within 12 hrs.
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPinText size={14} />
              <span className="text-amazon-river hover:underline cursor-pointer">
                Deliver to India
              </span>
            </div>
          </div>

          {/* Stock availability banner */}
          <div>
            {product.stock > 3 ? (
              <span className="text-green-700 text-lg font-bold">In Stock</span>
            ) : product.stock > 0 ? (
              <span className="text-orange-700 text-base font-bold">
                Only {product.stock} left in stock - order soon.
              </span>
            ) : (
              <span className="text-red-700 text-lg font-bold">Currently Unavailable</span>
            )}
          </div>

          {/* Quantity selector (enabled if in stock) */}
          {product.stock > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-gray-600 font-medium">Quantity:</span>
              <QuantitySelector
                quantity={qty}
                maxStock={product.stock}
                onChange={setQty}
                disabled={isAdding}
              />
            </div>
          )}

          {/* Checkout CTA actions */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleAddToCart}
              disabled={isAdding || product.stock === 0}
              className={`w-full py-2.5 rounded-full font-bold flex items-center justify-center space-x-2 border border-none shadow-sm transition-all outline-none cursor-pointer text-sm ${
                product.stock === 0
                  ? "bg-gray-250 text-gray-400 cursor-not-allowed"
                  : justAdded
                  ? "bg-green-600 hover:bg-green-700 text-white animate-pulse"
                  : "bg-amazon-yellow hover:bg-amazon-yellow-hover text-amazon-dark active:scale-[0.98]"
              }`}
            >
              {isAdding ? (
                <div className="w-5 h-5 border-2 border-amazon-dark border-t-transparent rounded-full animate-spin"></div>
              ) : justAdded ? (
                <>
                  <Check size={16} className="stroke-[2.5]" />
                  <span>Added to Cart!</span>
                </>
              ) : product.stock === 0 ? (
                <span>Out of Stock</span>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>

          {/* Secure transaction, shipping from */}
          <div className="border-t border-gray-150 pt-3 space-y-2 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>Ships from</span>
              <span className="font-semibold text-gray-700">AzoMart.com</span>
            </div>
            <div className="flex justify-between">
              <span>Sold by</span>
              <span className="font-semibold text-amazon-river hover:underline cursor-pointer">
                {product.brand} Retail Private Ltd
              </span>
            </div>
          </div>

          {/* Assurances Icons strip */}
          <div className="flex justify-around items-center pt-3 border-t border-gray-150 text-[10px] text-center text-amazon-river font-medium leading-tight">
            <div className="flex flex-col items-center max-w-[70px]">
              <div className="bg-gray-100 p-2 rounded-full mb-1">
                <RotateCcw size={16} />
              </div>
              <span>7-Day Replacement</span>
            </div>
            <div className="flex flex-col items-center max-w-[70px]">
              <div className="bg-gray-100 p-2 rounded-full mb-1">
                <Truck size={16} />
              </div>
              <span>AzoMart Delivered</span>
            </div>
            <div className="flex flex-col items-center max-w-[70px]">
              <div className="bg-gray-100 p-2 rounded-full mb-1">
                <ShieldCheck size={16} />
              </div>
              <span>Secure Transaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple internal helper icon to prevent crash
function MapPinText(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size || "16"}
      height={props.size || "16"}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
