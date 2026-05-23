"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImagesProps {
  images: string[];
  title: string;
}

export default function ProductImages({ images, title }: ProductImagesProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const productImages = images.length > 0 ? images : ["/placeholder.png"];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % productImages.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 font-sans select-none w-full">
      {/* Thumbnails Sidebar */}
      {productImages.length > 1 && (
        <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 order-2 md:order-1 overflow-x-auto md:overflow-x-visible py-1">
          {productImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIdx(idx)}
              className={`w-14 h-14 p-1 bg-white border-2 rounded-md hover:border-amazon transition-all shrink-0 cursor-pointer overflow-hidden ${
                activeIdx === idx ? "border-amazon shadow-sm" : "border-gray-250"
              }`}
            >
              <img
                src={img}
                alt={`${title} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Active Large Image Display with Carousel controls */}
      <div className="flex-grow bg-white border border-gray-200 rounded-lg p-6 flex justify-center items-center h-[350px] sm:h-[450px] order-1 md:order-2 w-full relative overflow-hidden group">
        <img
          src={productImages[activeIdx]}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-all duration-500 ease-in-out"
        />

        {/* Carousel controls (Arrows) */}
        {productImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full flex justify-center items-center shadow-md text-gray-700 hover:text-amazon-dark active:scale-90 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={22} className="stroke-[2.5]" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white border border-gray-200 rounded-full flex justify-center items-center shadow-md text-gray-700 hover:text-amazon-dark active:scale-90 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-10"
              aria-label="Next image"
            >
              <ChevronRight size={22} className="stroke-[2.5]" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/30 px-3 py-1.5 rounded-full backdrop-blur-xs">
              {productImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    activeIdx === idx ? "bg-amazon w-4" : "bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
