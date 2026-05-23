"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Category } from "@/types";

export default function CategoryBar() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const res = await fetch("/api/categories");
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Failed to load category bar items", err);
      }
    }
    loadCategories();
  }, []);

  return (
    <div className="bg-amazon-light text-white text-sm h-10 px-4 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-hide font-sans">
      <div className="flex items-center space-x-4">
        {/* All Hamburger Menu */}
        <Link
          href="/"
          className="flex items-center font-bold hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded transition-all cursor-pointer"
        >
          <Menu size={18} className="mr-1.5" />
          All
        </Link>

        {/* Dynamic categories links */}
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/?category=${cat.slug}`}
            className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded transition-all"
          >
            {cat.name}
          </Link>
        ))}

        {/* Static promo links */}
        <span className="text-gray-300">|</span>
        <Link
          href="/"
          className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded transition-all"
        >
          Today's Deals
        </Link>
        <Link
          href="/"
          className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded transition-all"
        >
          Customer Service
        </Link>
        <Link
          href="/"
          className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded transition-all hidden md:inline"
        >
          Gift Cards
        </Link>
        <Link
          href="/"
          className="hover:outline hover:outline-1 hover:outline-white px-2 py-1 rounded transition-all hidden lg:inline"
        >
          Sell
        </Link>
      </div>

      <div className="hidden md:flex items-center text-xs font-semibold text-amazon-yellow pr-2">
        <span>Save on daily essentials with AzoMart</span>
      </div>
    </div>
  );
}
