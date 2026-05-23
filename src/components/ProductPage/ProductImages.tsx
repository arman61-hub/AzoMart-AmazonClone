"use client";

import React, { useState } from "react";

interface ProductImagesProps {
  images: string[];
  title: string;
}

export default function ProductImages({ images, title }: ProductImagesProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const productImages = images.length > 0 ? images : ["/placeholder.png"];

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 font-sans select-none w-full">
      {/* Thumbnails Sidebar */}
      {productImages.length > 1 && (
        <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 order-2 md:order-1 overflow-x-auto md:overflow-x-visible">
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
                className="w-full h-full object-contain"
              />
            </button>
          ))}
        </div>
      )}

      {/* Active Large Image Display */}
      <div className="flex-grow bg-white border border-gray-200 rounded-lg p-6 flex justify-center items-center h-[350px] sm:h-[450px] order-1 md:order-2 w-full relative overflow-hidden group">
        <img
          src={productImages[activeIdx]}
          alt={title}
          className="max-w-full max-h-full object-contain hover:scale-105 transition-all duration-300"
        />
      </div>
    </div>
  );
}
