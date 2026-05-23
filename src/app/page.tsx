"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product } from "@/types";
import FilterSidebar from "@/components/Home/FilterSidebar";
import ProductGrid from "@/components/Home/ProductGrid";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import HeroCarousel from "@/components/Home/HeroCarousel";


function HomePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 1,
  });

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const minRating = searchParams.get("minRating") || "";
  const sortBy = searchParams.get("sortBy") || "newest";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          search,
          category,
          minPrice,
          maxPrice,
          minRating,
          sortBy,
          page,
          limit: "8",
        });
        const res = await fetch(`/api/products?${query.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products);
          setPagination(data.pagination);
        }
      } catch (err) {
        console.error("Failed to load products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [search, category, minPrice, maxPrice, minRating, sortBy, page]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", e.target.value);
    params.set("page", "1");
    router.push(`/?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pagination.totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#EAEDED] flex flex-col font-sans pb-16">
      {/* Hero Carousel Banner Section */}
      <HeroCarousel />

      {/* Main Grid Section with Sidebar */}
      <div className="max-w-[1480px] mx-auto w-full px-2 sm:px-4 flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-4 mt-[-20px] sm:mt-[-60px] md:mt-[-100px] lg:mt-[-130px] relative z-10">


        {/* Sidebar Filters */}
        <FilterSidebar />

        {/* Products Results Pane */}
        <div className="flex-grow flex flex-col">
          {/* Sorting / Results Count strip */}
          <div className="bg-white border border-gray-200 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-sm mb-5 text-sm font-sans text-gray-700">
            <div className="font-semibold mb-2 sm:mb-0">
              {loading ? (
                <span>Searching products...</span>
              ) : (
                <span>
                  Showing {products.length === 0 ? 0 : (pagination.page - 1) * pagination.limit + 1}-
                  {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                  {search && ` for "${search}"`}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="sort-select" className="text-gray-500 font-medium whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="bg-gray-50 border border-gray-300 rounded px-2 py-1 cursor-pointer outline-none font-semibold text-gray-800 text-xs focus:ring-1 focus:ring-amazon"
              >
                <option value="newest">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="rating_desc">Avg. Customer Review</option>
              </select>
            </div>
          </div>

          {/* Dynamic Grid / Loader */}
          {loading ? (
            <div className="flex justify-center items-center py-32 bg-white border border-gray-200 rounded-lg shadow-sm w-full">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <ProductGrid products={products} />
          )}

          {/* Pagination Controls */}
          {!loading && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-8 font-sans">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className={`px-4 py-2 border rounded-md text-xs font-semibold select-none cursor-pointer ${
                  pagination.page === 1
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white hover:bg-gray-50 border-gray-300 active:scale-95 text-gray-850 transition-all"
                }`}
              >
                Previous
              </button>

              {Array.from({ length: pagination.totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 border rounded-md text-xs font-bold transition-all cursor-pointer ${
                      pagination.page === pageNum
                        ? "bg-amazon border-amazon text-amazon-dark"
                        : "bg-white hover:bg-gray-50 border-gray-300 active:scale-95 text-gray-850"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className={`px-4 py-2 border rounded-md text-xs font-semibold select-none cursor-pointer ${
                  pagination.page === pagination.totalPages
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-white hover:bg-gray-50 border-gray-300 active:scale-95 text-gray-850 transition-all"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center py-40">
        <LoadingSpinner size="lg" />
      </div>
    }>
      <HomePageContent />
    </Suspense>
  );
}
