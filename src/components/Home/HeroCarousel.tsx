"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&auto=format&fit=crop&q=80",
    tag: "Super Saving Days",
    title: "Up to 60% Off Essentials",
    desc: "Explore deals on electronics, best-selling books, trendy fashion, sports gear, and premium home appliances.",
  },
  {
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&auto=format&fit=crop&q=80",
    tag: "Beauty & Personal Care",
    title: "Glow Up Everyday Essentials",
    desc: "Nourish your skin with clinical vitamin C serums, hydrate hair with organic Argan shampoos, and groom with precision.",
  },
  {
    image: "https://images.unsplash.com/photo-1522211988038-6fcbb8c12c7e?w=1600&auto=format&fit=crop&q=80",
    tag: "Bestselling Reads",
    title: "Nourish Your Mind & Spirit",
    desc: "Explore life-changing advice in Atomic Habits, master focus with Deep Work, and invest smart with Psychology of Money.",
  },
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1600&auto=format&fit=crop&q=80",
    tag: "Electronics Carnival",
    title: "Up to 70% Off Audio & Tech",
    desc: "Grab limited-time deals on active noise-cancelling wireless headphones, AMOLED fitness trackers, and 4K projectors.",
  },
  {
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=80",
    tag: "Fashion Styling Sale",
    title: "Revamp Your Look",
    desc: "Enjoy up to 50% off on premium combed cotton slim tees, butt-soft high compression yoga leggings, and wayfarers.",
  },
  {
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&auto=format&fit=crop&q=80",
    tag: "Home & Kitchen Essentials",
    title: "Smart Solutions for Living",
    desc: "Cook healthy with digital air fryers, program fresh morning coffee brews, or relieve neck pain with contour pillows.",
  },
  {
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1600&auto=format&fit=crop&q=80",
    tag: "Sports & Fitness Fest",
    title: "Elevate Your Workouts",
    desc: "Unleash your potential with non-slip TPE yoga mats, chrome steel adjustable dumbbell sets, and camping gear.",
  },
  
];

export default function HeroCarousel() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startAutoPlay = () => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % banners.length);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    stopAutoPlay();
    setCurrentIdx((prev) => (prev - 1 + banners.length) % banners.length);
    startAutoPlay();
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    stopAutoPlay();
    setCurrentIdx((prev) => (prev + 1) % banners.length);
    startAutoPlay();
  };

  return (
    <div
      className="relative w-full h-[220px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden select-none bg-amazon-dark group"
      onMouseEnter={stopAutoPlay}
      onMouseLeave={startAutoPlay}
    >
      {/* Sliding Images */}
      {banners.map((banner, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentIdx ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover opacity-65"
          />
          {/* Content Card Fading */}
          <div className="absolute bottom-16 sm:bottom-28 md:bottom-36 left-4 md:left-12 text-white drop-shadow-lg z-20">
            <span className="bg-amazon text-amazon-dark text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded shadow-sm">
              {banner.tag}
            </span>
            <h2 className="text-xl sm:text-3xl md:text-5xl font-black mt-2 leading-tight max-w-xl">
              {banner.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-250 mt-2 max-w-lg hidden sm:block leading-relaxed">
              {banner.desc}
            </p>
          </div>
        </div>
      ))}

      {/* Bottom Gradient Fade - blends perfectly with the new #EAEDED page background */}
      <div className="absolute bottom-0 left-0 right-0 h-[60px] sm:h-[120px] md:h-[160px] lg:h-[200px] bg-gradient-to-t from-[#EAEDED] via-transparent to-transparent z-15 pointer-events-none"></div>
      {/* Left Navigation Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-[40%] transform -translate-y-1/2 h-[80px] sm:h-[150px] w-8 sm:w-14 flex items-center justify-center text-white hover:text-amazon z-30 cursor-pointer outline-none border-none bg-transparent hover:bg-black/10 transition-all active:scale-95"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-7 h-7 sm:w-11 sm:h-11 stroke-[1.5]" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-[40%] transform -translate-y-1/2 h-[80px] sm:h-[150px] w-8 sm:w-14 flex items-center justify-center text-white hover:text-amazon z-30 cursor-pointer outline-none border-none bg-transparent hover:bg-black/10 transition-all active:scale-95"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-7 h-7 sm:w-11 sm:h-11 stroke-[1.5]" />
      </button>
    </div>
  );
}

