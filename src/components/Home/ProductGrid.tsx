"use client";

import React from "react";
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-20 px-4 text-center bg-white border border-gray-200 rounded-lg shadow-sm font-sans w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-2">No results found</h3>
        <p className="text-sm text-gray-500 max-w-md">
          Try checking your spelling, selecting another category, adjusting your price ranges, or removing your search queries.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
      {products.map((product) => (
        <div key={product.id} className="h-full">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}
