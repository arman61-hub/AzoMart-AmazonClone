"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { MapPin, ShoppingCart, ShoppingBag } from "lucide-react";
import SearchBar from "./SearchBar";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const { cartCount, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <header className="bg-amazon-dark text-white h-16 px-4 flex items-center justify-between space-x-4 font-sans select-none sticky top-0 z-50 shadow-md">
      {/* Brand Logo */}
      <Link
        href="/"
        className="flex items-center hover:outline hover:outline-1 hover:outline-white p-1 rounded transition-all cursor-pointer mr-2 shrink-0"
      >
        <div className="flex flex-col items-start leading-none">
          <span className="text-xl font-extrabold tracking-tight flex items-center">
            azo<span className="text-amazon">mart</span>
          </span>
          <div className="flex items-center ml-0.5 mt-[-2px]">
            <span className="text-[9px] text-gray-300 font-medium">amazon clone</span>
            <div className="w-5 h-1 border-b-[2px] border-amazon rounded-full ml-1 animate-pulse"></div>
          </div>
        </div>
      </Link>

      {/* Deliver Address (India) */}
      <div className="hover:outline hover:outline-1 hover:outline-white p-1 rounded transition-all cursor-pointer hidden sm:flex items-center space-x-1 shrink-0">
        <MapPin size={18} className="text-gray-200 mt-2" />
        <div className="flex flex-col text-xs leading-tight">
          <span className="text-gray-300 font-light">Deliver to</span>
          <span className="font-bold text-sm">India</span>
        </div>
      </div>

      {/* Search Bar - Flex Grow */}
      <div className="flex-grow">
        <SearchBar />
      </div>

      {/* Account Info */}
      <div className="hover:outline hover:outline-1 hover:outline-white p-1 rounded transition-all cursor-pointer hidden md:flex flex-col text-xs leading-tight shrink-0">
        <span className="text-gray-300 font-light">Hello, Guest</span>
        <span className="font-bold text-sm">Account & Lists</span>
      </div>

      {/* Returns & Orders */}
      <Link
        href="/checkout"
        className="hover:outline hover:outline-1 hover:outline-white p-1 rounded transition-all cursor-pointer hidden sm:flex flex-col text-xs leading-tight shrink-0"
      >
        <span className="text-gray-300 font-light">Returns</span>
        <span className="font-bold text-sm">& Orders</span>
      </Link>

      {/* Shopping Cart Icon (Synced with Zustand) */}
      <Link
        href="/cart"
        className="hover:outline hover:outline-1 hover:outline-white p-1.5 rounded transition-all flex items-center space-x-1 shrink-0 relative cursor-pointer"
      >
        <div className="relative">
          <ShoppingCart size={28} className="text-white" />
          <span className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 bg-amazon text-amazon-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-amazon-dark shadow-sm">
            {cartCount}
          </span>
        </div>
        <span className="font-bold text-sm self-end mt-2 hidden lg:inline">Cart</span>
      </Link>
    </header>
  );
}
