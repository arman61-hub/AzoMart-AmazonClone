"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Check, CheckCircle2, ArrowRight, Printer, ShoppingBag, MapPin, Truck } from "lucide-react";
import { Order } from "@/types";
import { formatPrice } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (!order) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [order, router]);

  useEffect(() => {
    async function fetchOrderDetails() {
      if (!id) return;
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/orders?id=${id}`);
        if (res.ok) {
          const data = await res.json();
          setOrder(data);
        } else {
          setError("Failed to locate order reference details.");
        }
      } catch (err) {
        console.error("Order load error", err);
        setError("Network error loading confirmation.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrderDetails();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex-grow flex justify-center items-center py-40">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center font-sans">
        <div className="bg-white border border-gray-200 rounded-lg p-10 shadow-sm">
          <h2 className="text-xl font-bold text-red-650 mb-3">Order Confirmation Error</h2>
          <p className="text-gray-500 mb-6">{error || "Order reference details not found."}</p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-amazon hover:bg-amazon-yellow-hover text-amazon-dark font-semibold px-5 py-2 rounded-full text-sm"
          >
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate delivery date simulation: Tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDeliveryDate = tomorrow.toLocaleDateString("en-IN", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-[#EAEDED] min-h-screen py-8 sm:py-12 font-sans print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4">
        {/* Main Unified Card */}
        <div className="bg-white border border-[#d5d9d9] shadow-sm rounded-lg p-6 sm:p-8 md:p-10 print:border-none print:shadow-none">
          
          {/* Green Success Alert Banner */}
          <div className="bg-[#f4faf7] border border-[#d1e7dd] text-[#0f5132] p-4 rounded-md flex items-center space-x-3.5 mb-8">
            <CheckCircle2 className="w-6 h-6 text-[#198754] shrink-0" />
            <div>
              <h2 className="font-bold text-[#198754] text-base leading-tight">
                Order placed, thank you!
              </h2>
              <p className="text-xs text-gray-500 mt-0.5 font-medium">
                Confirmation will be sent to your email.
              </p>
            </div>
          </div>

          {/* Two-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Left Column: Reference & Shipping */}
            <div className="md:col-span-7 space-y-6 text-[#0f1111]">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans">
                  Order Reference
                </h3>
                <div className="bg-[#f0f2f2] border border-[#d5d9d9] px-3 py-1.5 rounded inline-block text-xs font-semibold text-gray-800 font-sans shadow-sm select-none">
                  Order #{order.orderNumber || order.id}
                </div>
              </div>

              {/* Shipping Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 font-sans">
                  Shipping Information
                </h3>
                <div className="text-sm text-gray-800 space-y-0.5 font-medium leading-relaxed">
                  <p className="font-bold text-gray-950">{order.fullName}</p>
                  <p>{order.addressLine1}</p>
                  {order.addressLine2 && <p>{order.addressLine2}</p>}
                  <p>{order.city}, {order.state} {order.zipCode}</p>
                  <p>India</p>
                </div>

                {/* Estimated Delivery Box */}
                <div className="bg-[#f6f6f6] border border-[#e5e7eb] p-3 rounded-lg flex items-center space-x-2.5 mt-5 max-w-md shadow-sm select-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-orange-500 shrink-0 stroke-[1.8]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span className="text-xs font-bold text-gray-800 leading-normal">
                    Arriving {formattedDeliveryDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary Side Panel */}
            <div className="md:col-span-5">
              <div className="bg-[#f6f6f6] border border-[#e5e7eb] rounded-lg p-5 space-y-4 shadow-sm">
                <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2.5 font-sans">
                  Order Summary
                </h3>

                {/* List of Purchased Items */}
                <div className="space-y-2.5 text-xs text-gray-700 font-medium leading-normal max-h-[180px] overflow-y-auto pr-1">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-start space-x-2">
                      <span className="line-clamp-2 flex-grow text-gray-800">
                        {item.title}
                      </span>
                      <span className="shrink-0 text-gray-500 font-bold ml-1.5 whitespace-nowrap">
                        (Qty: {item.quantity})
                      </span>
                    </div>
                  ))}
                </div>

                {/* Payment Method */}
                <div className="border-t border-gray-200 pt-3 flex justify-between items-center text-xs font-semibold leading-normal">
                  <span className="text-gray-500">Payment Method:</span>
                  <span className="text-gray-800 font-bold">{order.paymentMethod}</span>
                </div>

                {/* Grand Total */}
                <div className="border-t border-gray-200 pt-3 flex justify-between items-baseline leading-normal">
                  <span className="text-sm font-bold text-gray-900">Total Paid:</span>
                  <span className="text-lg font-bold text-gray-900">
                    {formatPrice(order.totalAmount)}
                  </span>
                </div>

                {/* Action CTA Buttons */}
                <div className="space-y-2.5 pt-2.5 print:hidden select-none">
                  <Link
                    href="/"
                    className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#0f1111] font-bold py-2 rounded-md text-sm shadow-sm transition-all border border-[#fcd200] hover:border-[#f5c200] cursor-pointer text-center block w-full active:scale-[0.98] outline-none"
                  >
                    Continue Shopping
                  </Link>

                  <button
                    onClick={handlePrint}
                    className="bg-white hover:bg-[#f7fafa] border border-[#d5d9d9] font-bold py-2 rounded-md text-sm shadow-sm text-[#0f1111] cursor-pointer active:scale-[0.98] transition-all outline-none block w-full"
                  >
                    View or print receipt
                  </button>
                </div>
              </div>

              {/* Redirect countdown timer */}
              <div className="text-center mt-5 text-[11px] text-gray-500 font-medium italic animate-pulse print:hidden">
                Redirecting to Home page in <span className="font-bold text-red-650 font-mono text-xs">{countdown}</span> seconds...
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
