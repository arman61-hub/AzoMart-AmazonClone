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
    <div className="bg-gray-50 min-h-screen py-8 font-sans print:bg-white print:py-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        {/* Success Splash Card */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 shadow-sm flex flex-col items-center text-center space-y-4 print:border-none print:shadow-none">
          <div className="w-14 h-14 bg-green-100 rounded-full flex justify-center items-center text-green-600 animate-bounce">
            <Check size={36} className="stroke-[3]" />
          </div>

          <div className="space-y-1">
            <h1 className="text-xl sm:text-2xl font-bold text-green-700">
              Order Placed, Thank You!
            </h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Confirmation and dispatch details will be sent shortly.
            </p>
          </div>

          {/* Quick Order Info Panel */}
          <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200 text-xs sm:text-sm w-full max-w-xl font-semibold text-gray-700 leading-normal justify-around">
            <div className="py-2.5 sm:py-0 sm:px-4 text-center">
              <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                Order Number
              </span>
              <span className="font-extrabold text-gray-900">{order.orderNumber}</span>
            </div>
            <div className="py-2.5 sm:py-0 sm:px-4 text-center">
              <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                Estimated Delivery
              </span>
              <span className="text-green-700 font-extrabold">{formattedDeliveryDate}</span>
            </div>
            <div className="py-2.5 sm:py-0 sm:px-4 text-center">
              <span className="text-gray-400 block text-[10px] uppercase font-bold tracking-wider mb-1">
                Method
              </span>
              <span className="font-extrabold text-gray-900">{order.paymentMethod}</span>
            </div>
          </div>

          {/* CTA Actions */}
          <div className="flex flex-wrap gap-3 pt-3 print:hidden">
            <Link
              href="/"
              className="bg-amazon hover:bg-amazon-yellow-hover text-amazon-dark font-bold px-6 py-2.5 rounded-full text-xs flex items-center space-x-1.5 shadow-sm cursor-pointer active:scale-95 transition-all outline-none"
            >
              <span>Continue Shopping</span>
              <ArrowRight size={14} className="stroke-[2.5]" />
            </Link>

            <button
              onClick={handlePrint}
              className="bg-white hover:bg-gray-50 border border-gray-300 font-bold px-6 py-2.5 rounded-full text-xs flex items-center space-x-1.5 shadow-sm text-gray-700 cursor-pointer active:scale-95 transition-all outline-none"
            >
              <Printer size={14} />
              <span>Print Receipt</span>
            </button>
          </div>
        </div>

        {/* Detailed Receipt Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 print:border-none print:shadow-none">
          {/* Shipping Details */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center space-x-1.5 border-b border-gray-150 pb-1.5">
              <MapPin size={16} className="text-gray-400" />
              <span>Delivery Address</span>
            </h3>
            <div className="text-xs text-gray-650 leading-relaxed font-medium">
              <span className="font-bold text-gray-900 block">{order.fullName}</span>
              <span>{order.addressLine1}</span>
              {order.addressLine2 && <span className="block">{order.addressLine2}</span>}
              <span>
                {order.city}, {order.state} - {order.zipCode}
              </span>
              <span className="block mt-1">Phone: {order.phone}</span>
            </div>
          </div>

          {/* Shipping Status */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center space-x-1.5 border-b border-gray-150 pb-1.5">
              <Truck size={16} className="text-gray-400" />
              <span>Delivery Details</span>
            </h3>
            <div className="text-xs text-gray-650 leading-relaxed font-medium space-y-1">
              <div className="flex items-center space-x-1 font-bold text-green-700">
                <CheckCircle2 size={14} />
                <span>Standard Doorstep Shipping</span>
              </div>
              <p>Delivery scheduled for {formattedDeliveryDate}.</p>
              <p className="text-[10px] text-gray-500">
                Signature required upon Cash on Delivery package arrival.
              </p>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 text-sm flex items-center space-x-1.5 border-b border-gray-150 pb-1.5">
              <span>Payment Details</span>
            </h3>
            <div className="space-y-2 text-xs font-medium text-gray-650">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="text-gray-900">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-gray-900">
                  {order.shippingCost === 0 ? "FREE" : formatPrice(order.shippingCost)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax (GST 8%):</span>
                <span className="text-gray-900">{formatPrice(order.tax)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-red-750 border-t border-gray-150 pt-2">
                <span>Grand Total:</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchased Items details list */}
        <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm space-y-4 print:border-none print:shadow-none">
          <h3 className="font-bold text-gray-900 text-sm border-b border-gray-150 pb-2 flex items-center space-x-2">
            <ShoppingBag size={16} className="text-gray-400" />
            <span>Items Purchased</span>
          </h3>

          <div className="divide-y divide-gray-150">
            {order.items?.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex justify-between items-center space-x-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 bg-white border border-gray-200 rounded p-1 flex justify-center items-center overflow-hidden shrink-0">
                    <img
                      src={item.image || "/placeholder.png"}
                      alt={item.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-gray-800 line-clamp-1 max-w-[280px] sm:max-w-xl">
                      {item.title}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                      Qty: {item.quantity} @ {formatPrice(item.priceAtPurchase)} each
                    </span>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-950">
                  {formatPrice(item.priceAtPurchase * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
