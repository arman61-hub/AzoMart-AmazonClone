"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-amazon-light text-white font-sans mt-auto">
      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        className="w-full bg-[#37475a] hover:bg-[#485769] text-xs font-semibold py-3.5 transition-all text-center border-none cursor-pointer outline-none block"
      >
        Back to top
      </button>

      {/* Main links container */}
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs leading-normal">
        <div>
          <h3 className="font-bold text-sm mb-3">Get to Know Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/" className="hover:underline">About AzoMart</Link></li>
            <li><Link href="/" className="hover:underline">Careers</Link></li>
            <li><Link href="/" className="hover:underline">Press Releases</Link></li>
            <li><Link href="/" className="hover:underline">AzoMart Science</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm mb-3">Connect with Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/" className="hover:underline">Facebook</Link></li>
            <li><Link href="/" className="hover:underline">Twitter</Link></li>
            <li><Link href="/" className="hover:underline">Instagram</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm mb-3">Make Money with Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/" className="hover:underline">Sell on AzoMart</Link></li>
            <li><Link href="/" className="hover:underline">Sell under AzoMart Accelerator</Link></li>
            <li><Link href="/" className="hover:underline">Protect and Build Your Brand</Link></li>
            <li><Link href="/" className="hover:underline">Become an Affiliate</Link></li>
            <li><Link href="/" className="hover:underline">Fulfilment by AzoMart</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-sm mb-3">Let Us Help You</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/" className="hover:underline">Your Account</Link></li>
            <li><Link href="/" className="hover:underline">Returns Centre</Link></li>
            <li><Link href="/" className="hover:underline">100% Purchase Protection</Link></li>
            <li><Link href="/" className="hover:underline">AzoMart App Download</Link></li>
            <li><Link href="/" className="hover:underline">Help</Link></li>
          </ul>
        </div>
      </div>

      {/* Trademark bottom area */}
      <div className="bg-amazon-dark border-t border-gray-700 py-6 text-center text-xs text-gray-400">
        <div className="flex justify-center items-center space-x-6 mb-3">
          <Link href="/" className="text-white font-extrabold text-lg tracking-tight">
            azo<span className="text-amazon">mart</span>
          </Link>
          <span className="text-[10px] text-gray-500">English (Global)</span>
        </div>
        <div className="flex justify-center space-x-3 text-[10px] mb-2">
          <Link href="/" className="hover:underline">Conditions of Use & Sale</Link>
          <Link href="/" className="hover:underline">Privacy Notice</Link>
          <Link href="/" className="hover:underline">Interest-Based Ads</Link>
        </div>
        <p className="text-[10px]">
          &copy; 2026, AzoMart.in, Inc. or its affiliates. Built entirely from scratch for academic pair programming.
        </p>
      </div>
    </footer>
  );
}
