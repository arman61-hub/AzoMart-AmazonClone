"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Category } from "@/types";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to load search categories", err);
      }
    }
    fetchCategories();
  }, []);

  // Sync state with URL query parameters
  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "all");
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) {
      params.set("search", searchQuery.trim());
    }
    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    router.push(`/?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-grow max-w-none h-10 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-amazon"
    >

      {/* Category Dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="h-full px-3 text-xs text-gray-700 bg-gray-100 hover:bg-gray-200 border-r border-gray-300 outline-none cursor-pointer max-w-[130px] font-sans"
      >
        <option value="all">All Departments</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search AzoMart"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-grow px-4 text-sm text-black outline-none font-sans"
      />

      {/* Search Button */}
      <button
        type="submit"
        aria-label="Search button"
        className="h-full w-12 flex justify-center items-center bg-amazon hover:bg-amazon-yellow-hover text-amazon-dark cursor-pointer transition-all border-none outline-none"
      >
        <Search size={20} className="stroke-[2.5]" />
      </button>
    </form>
  );
}
