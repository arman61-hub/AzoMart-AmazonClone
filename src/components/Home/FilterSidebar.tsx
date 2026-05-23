"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Star, X } from "lucide-react";
import { Category } from "@/types";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [customMin, setCustomMin] = useState("");
  const [customMax, setCustomMax] = useState("");

  const activeCategory = searchParams.get("category") || "all";
  const activeMinPrice = searchParams.get("minPrice") || "";
  const activeMaxPrice = searchParams.get("maxPrice") || "";
  const activeMinRating = searchParams.get("minRating") || "";

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to load sidebar categories", err);
      }
    }
    loadCategories();
  }, []);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); // Reset to page 1 on filter
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/?${params.toString()}`);
  };

  const handlePriceRangeSelect = (min: string, max: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (min) params.set("minPrice", min);
    else params.delete("minPrice");
    if (max) params.set("maxPrice", max);
    else params.delete("maxPrice");
    router.push(`/?${params.toString()}`);
  };

  const handleCustomPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (customMin) params.set("minPrice", customMin);
    else params.delete("minPrice");
    if (customMax) params.set("maxPrice", customMax);
    else params.delete("maxPrice");
    router.push(`/?${params.toString()}`);
  };

  const clearAllFilters = () => {
    setCustomMin("");
    setCustomMax("");
    router.push("/");
  };

  const isAnyFilterActive =
    activeCategory !== "all" ||
    activeMinPrice ||
    activeMaxPrice ||
    activeMinRating ||
    searchParams.get("search");

  return (
    <aside className="w-full md:w-56 bg-white p-4 rounded-lg border border-gray-200 shrink-0 font-sans h-fit">

      {/* Clear Filters Title & Mobile Toggle */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 md:border-none md:pb-0">
        <h2 className="text-sm font-extrabold text-gray-900">Filters</h2>
        <div className="flex items-center space-x-2 md:hidden">
          {isAnyFilterActive && (
            <button
              onClick={clearAllFilters}
              className="text-xs text-amazon-river hover:underline font-semibold flex items-center cursor-pointer mr-1"
            >
              <X size={12} className="mr-0.5" /> Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="text-xs bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-2.5 py-1 font-bold text-gray-800 transition-all cursor-pointer select-none"
          >
            {isOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {isAnyFilterActive && (
          <button
            onClick={clearAllFilters}
            className="text-xs text-amazon-river hover:underline font-semibold items-center cursor-pointer hidden md:flex"
          >
            <X size={12} className="mr-0.5" /> Clear All
          </button>
        )}
      </div>

      {/* Filter Options Content (Collapsable on Mobile) */}
      <div className={`${isOpen ? "block" : "hidden"} md:block mt-4 md:mt-5`}>

      {/* Category Section */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">
          Department
        </h3>
        <ul className="space-y-1.5 text-xs text-gray-700 font-medium">
          <li>
            <button
              onClick={() => updateFilters("category", "all")}
              className={`hover:text-amazon text-left cursor-pointer w-full ${
                activeCategory === "all" ? "text-amazon font-bold" : ""
              }`}
            >
              All Departments
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                onClick={() => updateFilters("category", cat.slug)}
                className={`hover:text-amazon text-left cursor-pointer w-full ${
                  activeCategory === cat.slug ? "text-amazon font-bold" : ""
                }`}
              >
                {cat.name} ({cat._count?.products || 0})
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Customer Review Section */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">
          Customer Review
        </h3>
        <ul className="space-y-2 text-xs">
          {[4, 3, 2, 1].map((rating) => (
            <li key={rating}>
              <button
                onClick={() => updateFilters("minRating", rating.toString())}
                className="flex items-center space-x-1 group text-left cursor-pointer w-full"
              >
                <div className="flex items-center text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < rating
                          ? "fill-amber-500 stroke-amber-500"
                          : "text-gray-300 fill-gray-100"
                      }`}
                    />
                  ))}
                </div>
                <span
                  className={`group-hover:text-amazon ml-1 ${
                    activeMinRating === rating.toString()
                      ? "text-amazon font-bold"
                      : "text-gray-700"
                  }`}
                >
                  & Up
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Section */}
      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-900 mb-2 uppercase tracking-wider">
          Price
        </h3>
        <ul className="space-y-1.5 text-xs text-gray-700 font-medium mb-3">
          <li>
            <button
              onClick={() => handlePriceRangeSelect("", "500")}
              className={`hover:text-amazon text-left cursor-pointer w-full ${
                activeMaxPrice === "500" && !activeMinPrice ? "text-amazon font-bold" : ""
              }`}
            >
              Under ₹500
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePriceRangeSelect("500", "2000")}
              className={`hover:text-amazon text-left cursor-pointer w-full ${
                activeMinPrice === "500" && activeMaxPrice === "2000" ? "text-amazon font-bold" : ""
              }`}
            >
              ₹500 - ₹2,000
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePriceRangeSelect("2000", "5000")}
              className={`hover:text-amazon text-left cursor-pointer w-full ${
                activeMinPrice === "2000" && activeMaxPrice === "5000" ? "text-amazon font-bold" : ""
              }`}
            >
              ₹2,000 - ₹5,000
            </button>
          </li>
          <li>
            <button
              onClick={() => handlePriceRangeSelect("5000", "")}
              className={`hover:text-amazon text-left cursor-pointer w-full ${
                activeMinPrice === "5000" && !activeMaxPrice ? "text-amazon font-bold" : ""
              }`}
            >
              Over ₹5,000
            </button>
          </li>
        </ul>

        {/* Custom Price Form */}
        <form onSubmit={handleCustomPriceSubmit} className="flex items-center space-x-1.5">
          <input
            type="number"
            placeholder="Min"
            value={customMin}
            onChange={(e) => setCustomMin(e.target.value)}
            className="w-16 border border-gray-300 rounded px-1.5 py-1 text-xs text-black outline-none focus:ring-1 focus:ring-amazon"
          />
          <span className="text-gray-400 text-xs">-</span>
          <input
            type="number"
            placeholder="Max"
            value={customMax}
            onChange={(e) => setCustomMax(e.target.value)}
            className="w-16 border border-gray-300 rounded px-1.5 py-1 text-xs text-black outline-none focus:ring-1 focus:ring-amazon"
          />
          <button
            type="submit"
            className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded px-2.5 py-1 text-xs font-semibold cursor-pointer active:scale-95 transition-all text-amazon-dark"
          >
            Go
          </button>
        </form>
      </div>
      </div>
    </aside>
  );
}
