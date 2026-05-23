"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { MapPin, ShoppingCart } from "lucide-react";
import SearchBar from "./SearchBar";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
  const { cartCount, fetchCart } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <header className="bg-amazon-dark text-white w-full sticky top-0 z-50 shadow-md">
      {/* Upper Row: Logo, Accounts, Cart & Menu toggles */}
      <div className="h-[60px] px-2 sm:px-4 md:px-6 flex items-center justify-between space-x-2 md:space-x-4 font-sans select-none">
        
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center hover:outline hover:outline-1 hover:outline-white p-1 rounded transition-all cursor-pointer mr-1 shrink-0"
        >
          <div className="flex items-baseline leading-none">
            <span className="text-[23px] sm:text-[27px] font-extrabold tracking-tight text-white">
              azo<span className="text-amazon">mart</span>
            </span>
            <span className="text-[11px] font-bold text-amazon ml-0.5 self-end mb-0.5">.in</span>
          </div>
        </Link>

        {/* Deliver Address (Hidden on Mobile/Tablet) */}
        <div className="hover:outline hover:outline-1 hover:outline-white p-1 px-2 rounded transition-all cursor-pointer flex items-center space-x-1 shrink-0 select-none hidden lg:flex">
          <MapPin size={15} className="text-white mt-[12px] shrink-0" />
          <div className="flex flex-col text-[11px] leading-tight text-gray-300">
            <span className="font-normal">Delivering to India</span>
            <span className="font-bold text-white text-[13px]">Update location</span>
          </div>
        </div>

        {/* Search Bar - Flex Grow on Desktop, hidden on mobile/tablet */}
        <div className="flex-grow max-w-[820px] hidden lg:block">
          <React.Suspense fallback={<div className="bg-[#131921] h-10 w-full rounded animate-pulse"></div>}>
            <SearchBar />
          </React.Suspense>
        </div>

        {/* Indian Flag / Language Selector (Hidden on Mobile/Tablet/Small Desktop) */}
        <div className="hover:outline hover:outline-1 hover:outline-white p-2 rounded transition-all cursor-pointer flex items-center space-x-1 shrink-0 text-white select-none hidden lg:flex">
          <svg className="w-5 h-3.5 shadow-sm border border-gray-600 shrink-0" viewBox="0 0 3 2" aria-label="Indian Flag">
            <rect width="3" height="2" fill="#058837" />
            <rect width="3" height="1.33" fill="#FFFFFF" />
            <rect width="3" height="0.67" fill="#FF9933" />
            <circle cx="1.5" cy="1" r="0.2" fill="#000080" />
          </svg>
          <span className="font-extrabold text-[13px] tracking-wide ml-1">EN</span>
          <span className="text-[7px] text-gray-300 ml-0.5 mt-1">▼</span>
        </div>

        {/* Account Info */}
        <div className="hover:outline hover:outline-1 hover:outline-white p-1 px-2 rounded transition-all cursor-pointer flex flex-col leading-tight shrink-0 text-left select-none">
          <span className="text-gray-300 text-[10px] sm:text-[11px]">Hello, sign in</span>
          <div className="flex items-center space-x-0.5">
            <span className="font-bold text-white text-[12px] sm:text-[13px]">Account</span>
            <span className="text-[7px] text-gray-300 mt-1">▼</span>
          </div>
        </div>

        {/* Returns & Orders (Hidden on Mobile/Tablet) */}
        <Link
          href="/checkout"
          className="hover:outline hover:outline-1 hover:outline-white p-1 px-2 rounded transition-all cursor-pointer flex flex-col leading-tight shrink-0 text-left hidden lg:flex"
        >
          <span className="text-gray-300 text-[11px]">Returns</span>
          <span className="font-bold text-white text-[13px]">& Orders</span>
        </Link>

        {/* Shopping Cart Icon */}
        <Link
          href="/cart"
          className="hover:outline hover:outline-1 hover:outline-white p-1.5 px-2 rounded transition-all flex items-center shrink-0 cursor-pointer relative"
        >
          <div className="relative flex items-center">
            <div className="relative">
              <ShoppingCart size={30} className="text-white sm:w-[34px] sm:h-[34px]" />
              <span className="absolute top-[-7px] left-[11px] sm:left-[13px] text-amazon font-extrabold text-[14px] sm:text-[16px]">
                {cartCount}
              </span>
            </div>
            <span className="font-extrabold text-[13px] text-white self-end mb-1 ml-1 hidden lg:inline">Cart</span>
          </div>
        </Link>
      </div>

      {/* Lower Row: Search Bar on mobile and tablet */}
      <div className="px-3 pb-3 pt-1 block lg:hidden">
        <React.Suspense fallback={<div className="bg-[#131921] h-10 w-full rounded animate-pulse"></div>}>
          <SearchBar />
        </React.Suspense>
      </div>
    </header>
  );
}
