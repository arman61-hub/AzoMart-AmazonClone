import { create } from "zustand";
import { CartItem } from "@/types";
import { calculateInclusiveTax } from "@/lib/utils";

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  
  // Computed values
  cartCount: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;

  // Actions
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => void;
}

const calculateTotals = (items: CartItem[]) => {
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
  // Tax calculated dynamically based on product categories (inclusive)
  const tax = items.reduce(
    (sum, item) => sum + calculateInclusiveTax(item.product.price, item.product.category?.slug || "") * item.quantity,
    0
  );
  
  // Free shipping over ₹500, otherwise ₹99
  const shippingCost = subtotal > 500 || subtotal === 0 ? 0 : 99;
  
  // Inclusive tax: The subtotal already includes the tax, so total is just subtotal + shipping!
  const totalAmount = subtotal + shippingCost;

  return {
    cartCount,
    subtotal,
    tax,
    shippingCost,
    totalAmount,
  };
};


export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isLoading: false,
  cartCount: 0,
  subtotal: 0,
  tax: 0,
  shippingCost: 0,
  totalAmount: 0,

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/cart");
      if (res.ok) {
        const items: CartItem[] = await res.json();
        set({ 
          items, 
          isLoading: false,
          ...calculateTotals(items)
        });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      console.error("Failed to fetch cart", err);
      set({ isLoading: false });
    }
  },

  addToCart: async (productId: number, quantity = 1) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (res.ok) {
        const items: CartItem[] = await res.json();
        set({ 
          items, 
          isLoading: false,
          ...calculateTotals(items)
        });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      console.error("Failed to add to cart", err);
      set({ isLoading: false });
    }
  },

  updateQuantity: async (productId: number, quantity: number) => {
    if (quantity <= 0) {
      await get().removeFromCart(productId);
      return;
    }
    set({ isLoading: true });
    try {
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });
      if (res.ok) {
        const items: CartItem[] = await res.json();
        set({ 
          items, 
          isLoading: false,
          ...calculateTotals(items)
        });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      console.error("Failed to update quantity", err);
      set({ isLoading: false });
    }
  },

  removeFromCart: async (productId: number) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/cart?productId=${productId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const items: CartItem[] = await res.json();
        set({ 
          items, 
          isLoading: false,
          ...calculateTotals(items)
        });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      console.error("Failed to remove from cart", err);
      set({ isLoading: false });
    }
  },

  clearCart: () => {
    set({
      items: [],
      cartCount: 0,
      subtotal: 0,
      tax: 0,
      shippingCost: 0,
      totalAmount: 0,
      isLoading: false
    });
  }
}));
