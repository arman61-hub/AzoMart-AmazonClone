export interface Category {
  id: number;
  name: string;
  slug: string;
  image?: string | null;
  products?: Product[];
  _count?: {
    products: number;
  };
}

export interface Review {
  id: number;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  productId: number;
  product?: Product;
  createdAt: string;
}

export interface Product {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  brand: string;
  images: string[];
  stock: number;
  features: string[];
  ratingAvg: number;
  ratingCount: number;
  isFeatured: boolean;
  categoryId: number;
  category?: Category;
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: number;
  userId: string;
  quantity: number;
  productId: number;
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  quantity: number;
  priceAtPurchase: number;
  title: string;
  image: string;
  orderId: number;
  productId: number;
  product?: Product;
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  paymentMethod: string;
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  status: string;
  items: OrderItem[];
  createdAt: string;
}

export interface CartStoreState {
  items: CartItem[];
  isLoading: boolean;
  cartCount: number;
  subtotal: number;
  tax: number;
  shippingCost: number;
  totalAmount: number;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  clearCart: () => void;
}
