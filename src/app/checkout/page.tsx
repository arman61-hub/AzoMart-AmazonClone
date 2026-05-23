"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, CreditCard, ShieldCheck, ShoppingBag, MapPin, Truck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function CheckoutPage() {
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
    clearCart,
  } = useCartStore();

  const [formData, setFormData] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Redirect if cart is empty and not loading
  useEffect(() => {
    if (!isLoading && items.length === 0 && !isSuccess) {
      router.push("/cart");
    }
  }, [isLoading, items, router, isSuccess]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors as user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = "Full name is required";
    if (!formData.addressLine1.trim()) errors.addressLine1 = "Street address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.state.trim()) errors.state = "State/Province is required";
    if (!formData.zipCode.trim()) errors.zipCode = "PIN Code/Postal Code is required";
    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^\+?([0-9]{2})?[-. ]?([0-9]{10})$/.test(formData.phone.trim().replace(/\s+/g, ""))) {
      errors.phone = "Enter a valid 10-digit phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const order = await res.json();
        setIsSuccess(true);
        clearCart(); // Clear local zustand cart
        router.push(`/order-confirmation/${order.id}`);
      } else {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to process order. Please try again.");
      }
    } catch (err) {
      console.error("Order submission failed", err);
      setErrorMessage("A network error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading && items.length === 0) {
    return (
      <div className="flex-grow flex justify-center items-center py-40">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Distraction-free Checkout Banner title */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 flex items-center">
            Checkout <span className="text-xs sm:text-sm text-gray-500 font-normal ml-2">({cartCount} {cartCount === 1 ? "item" : "items"})</span>
          </h1>
          <div className="flex items-center space-x-1.5 text-gray-500 text-sm font-semibold select-none">
            <Lock size={16} />
            <span>Secure Checkout</span>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-4 mb-6 leading-normal font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Form & Address Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Shipping Address */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-150 pb-2 flex items-center space-x-2">
                <MapPin size={18} className="text-amazon" />
                <span>1. Shipping Address</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-bold text-gray-800 mb-1">
                    Full Name (First and Last name)
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon ${
                      formErrors.fullName ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.fullName && (
                    <span className="text-xs text-red-650 mt-1 font-semibold">{formErrors.fullName}</span>
                  )}
                </div>

                {/* Address Line 1 */}
                <div className="sm:col-span-2">
                  <label htmlFor="addressLine1" className="block text-xs font-bold text-gray-800 mb-1">
                    Street Address / Flat House No.
                  </label>
                  <input
                    type="text"
                    id="addressLine1"
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    placeholder="Flat, House no., Building, Company, Apartment"
                    className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon ${
                      formErrors.addressLine1 ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.addressLine1 && (
                    <span className="text-xs text-red-650 mt-1 font-semibold">{formErrors.addressLine1}</span>
                  )}
                </div>

                {/* Address Line 2 */}
                <div className="sm:col-span-2">
                  <label htmlFor="addressLine2" className="block text-xs font-bold text-gray-800 mb-1">
                    Area / Colony / Street Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="addressLine2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleInputChange}
                    placeholder="Area, Colony, Street, Sector, Village"
                    className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon"
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className="block text-xs font-bold text-gray-800 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon ${
                      formErrors.city ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.city && (
                    <span className="text-xs text-red-650 mt-1 font-semibold">{formErrors.city}</span>
                  )}
                </div>

                {/* State */}
                <div>
                  <label htmlFor="state" className="block text-xs font-bold text-gray-800 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="e.g. Maharashtra"
                    className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon ${
                      formErrors.state ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.state && (
                    <span className="text-xs text-red-650 mt-1 font-semibold">{formErrors.state}</span>
                  )}
                </div>

                {/* Pin Code */}
                <div>
                  <label htmlFor="zipCode" className="block text-xs font-bold text-gray-800 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="6-digit pincode"
                    className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon ${
                      formErrors.zipCode ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.zipCode && (
                    <span className="text-xs text-red-650 mt-1 font-semibold">{formErrors.zipCode}</span>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-gray-800 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="10-digit mobile number"
                    className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon ${
                      formErrors.phone ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                    }`}
                  />
                  {formErrors.phone && (
                    <span className="text-xs text-red-650 mt-1 font-semibold">{formErrors.phone}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-150 pb-2 flex items-center space-x-2">
                <CreditCard size={18} className="text-amazon" />
                <span>2. Payment Method</span>
              </h2>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  defaultChecked
                  className="mt-1 accent-amazon cursor-pointer"
                />
                <label htmlFor="cod" className="flex flex-col cursor-pointer select-none leading-normal">
                  <span className="font-bold text-gray-900 text-sm">Cash on Delivery (COD)</span>
                  <span className="text-xs text-gray-500 mt-0.5">
                    Pay securely in cash or via digital UPI scanners right at your doorstep upon package arrival.
                  </span>
                </label>
              </div>
            </div>

            {/* Step 3: Review Items */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 sm:p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-gray-900 border-b border-gray-150 pb-2 flex items-center space-x-2">
                <ShoppingBag size={18} className="text-amazon" />
                <span>3. Review items & delivery</span>
              </h2>

              <div className="divide-y divide-gray-150">
                {items.map((item) => (
                  <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center justify-between space-x-4">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-12 h-12 bg-white border border-gray-200 rounded p-1 flex justify-center items-center overflow-hidden shrink-0">
                        <img
                          src={item.product.images[0] || "/placeholder.png"}
                          alt={item.product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="leading-snug">
                        <span className="text-xs sm:text-sm font-semibold text-gray-800 line-clamp-1 max-w-[280px] sm:max-w-md">
                          {item.product.title}
                        </span>
                        <span className="text-xs text-gray-500">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-gray-955">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Floating Summary & Checkout CTA */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-4 font-sans text-sm sticky top-20">
              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-2.5 rounded-full font-bold flex items-center justify-center space-x-2 border border-none shadow-sm transition-all outline-none cursor-pointer text-sm ${
                  submitting
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-amazon-yellow hover:bg-amazon-yellow-hover text-amazon-dark active:scale-[0.98]"
                }`}
              >
                {submitting ? (
                  <div className="w-5 h-5 border-2 border-amazon-dark border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <span>Place your order (COD)</span>
                )}
              </button>

              <div className="text-[10px] text-gray-500 text-center leading-normal">
                By placing your order, you agree to AzoMart's conditions of use and sale privacy terms.
              </div>

              <div className="border-t border-gray-150 pt-3">
                <h3 className="font-bold text-gray-900 text-sm mb-2.5">Order Summary</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Items ({cartCount}):</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping & handling:</span>
                    <span>{shippingCost === 0 ? "FREE" : formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>GST (Included):</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-red-700 border-t border-gray-150 pt-2.5">
                    <span>Order Total:</span>
                    <span>{formatPrice(totalAmount)}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-150 pt-3 text-[10px] text-gray-500 leading-normal space-y-2">
                <div className="flex items-start space-x-1.5">
                  <Truck size={14} className="text-gray-400 shrink-0 mt-0.5" />
                  <span>Doorstep delivery within 24 hours of dispatch.</span>
                </div>
                <div className="flex items-start space-x-1.5">
                  <ShieldCheck size={14} className="text-gray-400 shrink-0 mt-0.5" />
                  <span>AzoMart A-to-z Guarantee protection included.</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
