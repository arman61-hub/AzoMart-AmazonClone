"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, ArrowLeft, Star } from "lucide-react";
import { Product, Review } from "@/types";
import ProductImages from "@/components/ProductPage/ProductImages";
import ProductInfo from "@/components/ProductPage/ProductInfo";
import ReviewCard from "@/components/ProductPage/ReviewCard";
import SimilarProducts from "@/components/ProductPage/SimilarProducts";
import StarRating from "@/components/ui/StarRating";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProductDetails() {
      if (!id) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product);
          setSimilarProducts(data.similarProducts);
        } else {
          setError("Failed to fetch product details. It may not exist.");
        }
      } catch (err) {
        console.error("Failed to load product page details", err);
        setError("An unexpected network error occurred.");
      } finally {
        setLoading(false);
      }
    }
    loadProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-grow flex justify-center items-center py-40 bg-gray-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center font-sans">
        <div className="bg-white border border-gray-200 rounded-lg p-10 shadow-sm">
          <h2 className="text-xl font-bold text-red-650 mb-3">Product Load Error</h2>
          <p className="text-gray-500 mb-6">{error || "Product could not be loaded."}</p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-amazon hover:bg-amazon-yellow-hover text-amazon-dark font-semibold px-5 py-2 rounded-full text-sm"
          >
            <ArrowLeft size={16} />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate percentage ratios for reviews breakups
  const reviews = product.reviews || [];
  const starCounts = [0, 0, 0, 0, 0, 0]; // Index maps to stars count (1-5)
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) {
      starCounts[r.rating]++;
    }
  });

  const totalReviews = reviews.length;

  return (
    <div className="bg-gray-50 min-h-screen pb-16 font-sans">
      {/* Breadcrumbs Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center space-x-1.5 text-xs text-gray-500 font-medium overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-amazon-river hover:underline">
          Home
        </Link>
        <ChevronRight size={12} className="text-gray-400 shrink-0" />
        <Link
          href={`/?category=${product.category?.slug}`}
          className="hover:text-amazon-river hover:underline"
        >
          {product.category?.name || "Department"}
        </Link>
        <ChevronRight size={12} className="text-gray-400 shrink-0" />
        <span className="text-gray-700 truncate font-semibold">
          {product.title}
        </span>
      </div>

      {/* Main Container grid split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Core Product Layout (Images & Info) */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Product Gallery Images (left 2 cols in md) */}
          <div className="md:col-span-2">
            <ProductImages images={product.images} title={product.title} />
          </div>

          {/* Product Purchasing Specifications info (right 3 cols in md) */}
          <div className="md:col-span-3">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Similar Products Recommendation Carousel Grid */}
        <SimilarProducts products={similarProducts} />

        {/* Customer Reviews Section split layout */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Aggregated Statistics Card */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">Customer reviews</h3>

            <div className="flex items-center space-x-2">
              <StarRating rating={product.ratingAvg} size={18} />
              <span className="text-base font-bold text-gray-900">
                {product.ratingAvg.toFixed(1)} out of 5
              </span>
            </div>

            <div className="text-xs text-gray-500">
              {totalReviews} global customer ratings
            </div>

            {/* Stars breakup sliders */}
            <div className="space-y-2 pt-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = starCounts[stars];
                const percentage =
                  totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;

                return (
                  <button
                    key={stars}
                    onClick={() => {}}
                    className="flex items-center w-full text-xs text-amazon-river hover:text-red-700 hover:underline cursor-pointer group text-left"
                  >
                    <span className="w-10 shrink-0 font-medium">
                      {stars} star
                    </span>
                    <div className="flex-grow bg-gray-150 h-5 rounded overflow-hidden mx-2.5 border border-gray-200 relative">
                      <div
                        className="bg-amazon h-full rounded transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="w-8 text-right font-medium shrink-0">
                      {percentage}%
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Review guidelines info block */}
            <div className="pt-4 border-t border-gray-150 space-y-1.5 text-xs text-gray-500 leading-normal">
              <h4 className="font-bold text-gray-700">Review this product</h4>
              <p>Share your thoughts with other customers</p>
              <button className="w-full text-center py-1.5 bg-white border border-gray-300 rounded hover:bg-gray-50 font-semibold cursor-pointer active:scale-95 transition-all text-gray-800 shadow-sm mt-2">
                Write a product review
              </button>
            </div>
          </div>

          {/* Right Columns: Customer Reviews lists */}
          <div className="md:col-span-2 space-y-2">
            <h3 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-150">
              Top reviews from India
            </h3>

            {reviews.length === 0 ? (
              <div className="py-8 text-gray-500 text-sm font-medium">
                No reviews yet. Be the first to write a review!
              </div>
            ) : (
              <div className="divide-y divide-gray-150">
                {reviews.map((rev) => (
                  <ReviewCard key={rev.id} review={rev} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
