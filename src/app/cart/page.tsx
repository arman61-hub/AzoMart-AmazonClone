"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import QuantitySelector from "@/components/ui/QuantitySelector";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    isLoading,
    subtotal,
    cartCount,
    shippingCost,
    tax,
    totalAmount,
    fetchCart,
    updateQuantity,
    removeFromCart,
  } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleProceedToCheckout = () => {
    router.push("/checkout");
  };

  // Eligibility for FREE Delivery
  const isFreeDeliveryEligible = subtotal > 500;
  const remainingForFreeDelivery = 500 - subtotal;

  if (isLoading && items.length === 0) {
    return (
      <div className="flex-grow flex justify-center items-center py-40">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>

        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white border border-gray-200 rounded-lg p-10 text-center shadow-sm max-w-4xl mx-auto space-y-4">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex justify-center items-center mx-auto text-gray-400">
              <ShoppingBag size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Your AzoMart Cart is empty</h2>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Your Shopping Cart lives to serve. Give it purpose — fill it with electronics, books, fashion, home essentials and more.
            </p>
            <div className="pt-2">
              <Link
                href="/"
                className="bg-amazon-yellow hover:bg-amazon-yellow-hover text-amazon-dark font-semibold px-6 py-2.5 rounded-full text-sm shadow-sm transition-all duration-200 cursor-pointer active:scale-95 inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          /* Main Cart split layout */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            {/* Left Columns: Items List */}
            <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm space-y-6">
              {/* FREE Shipping guidelines message */}
              <div className="border-b border-gray-150 pb-4">
                {isFreeDeliveryEligible ? (
                  <div className="flex items-start space-x-2.5 text-green-700 text-xs sm:text-sm font-semibold leading-normal">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    <div>
                      <span>Your order qualifies for FREE Delivery.</span>
                      <span className="text-gray-500 font-normal ml-1">
                        Select this option at checkout.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start space-x-2.5 text-[#c45500] text-xs sm:text-sm font-semibold leading-normal">
                    <div className="w-5 h-5 bg-orange-100 rounded-full flex justify-center items-center text-[#c45500] shrink-0 mt-0.5 text-xs font-black">
                      i
                    </div>
                    <div>
                      <span>Add {formatPrice(remainingForFreeDelivery)} more of eligible items for FREE Delivery.</span>
                      <Link href="/" className="text-amazon-river hover:underline font-normal ml-1 hover:text-red-700">
                        Continue shopping
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart List */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5">
                    {/* Item Image */}
                    <Link href={`/product/${item.productId}`} className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-white border border-gray-200 rounded p-2 flex justify-center items-center mx-auto sm:mx-0 overflow-hidden relative">
                      <img
                        src={item.product.images[0] || "/placeholder.png"}
                        alt={item.product.title}
                        className="max-w-full max-h-full object-contain"
                      />
                    </Link>

                    {/* Item Details */}
                    <div className="flex-grow flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 items-start mb-1">
                          <Link
                            href={`/product/${item.productId}`}
                            className="text-base font-bold text-gray-900 hover:text-amazon-river hover:underline line-clamp-2 leading-snug"
                          >
                            {item.product.title}
                          </Link>
                          <span className="text-lg font-extrabold text-gray-900 shrink-0 mt-1 sm:mt-0">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>

                        {/* Brand & Stock status */}
                        <span className="text-xs text-gray-500 block mb-1">Brand: {item.product.brand}</span>
                        <div className="text-xs">
                          {item.product.stock > 0 ? (
                            <span className="text-green-700 font-semibold">In Stock</span>
                          ) : (
                            <span className="text-red-700 font-semibold">Out of Stock</span>
                          )}
                        </div>
                      </div>

                      {/* Controls Area (Qty select, Remove) */}
                      <div className="flex flex-wrap items-center gap-4 mt-4">
                        <QuantitySelector
                          quantity={item.quantity}
                          maxStock={item.product.stock}
                          onChange={(newQty) => updateQuantity(item.productId, newQty)}
                        />

                        <span className="text-gray-300">|</span>

                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-xs text-amazon-river hover:text-red-700 font-semibold flex items-center space-x-1 cursor-pointer hover:underline border-none outline-none"
                        >
                          <Trash2 size={14} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtotal row */}
              <div className="border-t border-gray-150 pt-4 flex justify-between items-center text-sm sm:text-base font-sans">
                <span className="text-gray-500">
                  Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"}):
                </span>
                <span className="text-lg font-extrabold text-gray-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            {/* Right Column: Order Summary Panel */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 font-sans text-sm">
                {/* Eligibility header */}
                {isFreeDeliveryEligible && (
                  <div className="flex items-center space-x-1 text-green-700 text-xs font-semibold">
                    <CheckCircle2 size={14} />
                    <span>Your order ships for FREE</span>
                  </div>
                )}

                {/* Subtotal summary price */}
                <div>
                  <span className="text-gray-500 font-medium block">
                    Subtotal ({cartCount} {cartCount === 1 ? "item" : "items"}):
                  </span>
                  <span className="text-2xl font-extrabold text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {/* Price breakdown */}
                <div className="border-t border-gray-150 pt-3 space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="font-semibold text-gray-800">
                      {shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Tax (GST 8%)</span>
                    <span className="font-semibold text-gray-800">{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-gray-900 border-t border-gray-150 pt-2">
                    <span>Order Total</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>

                {/* Proceed to Checkout Button */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-2.5 rounded-full font-bold bg-amazon-yellow hover:bg-amazon-yellow-hover text-amazon-dark active:scale-[0.98] transition-all flex items-center justify-center space-x-2 border border-none shadow-sm cursor-pointer text-sm outline-none"
                >
                  <span>Proceed to Buy</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Secure transaction info */}
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm flex items-center space-x-3 text-xs text-gray-500 leading-tight">
                <ShieldCheck size={28} className="text-gray-400 shrink-0" />
                <span>
                  Secure transaction. All payments are processed safely via cash on delivery (COD) default gateway.
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
