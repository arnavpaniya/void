"use client";

import React, { useState, useRef, useEffect } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export interface DripProduct {
  id: string;
  rank: number;
  name: string;
  category: string;
  priceINR: number;
  originalPriceINR: number;
  image: string;
  tag: string;
  description: string;
}

const TOP_10_PRODUCTS: DripProduct[] = [
  {
    id: "drip-1",
    rank: 1,
    name: "Edition 01 — Modernist 'On Air' Heavyweight Tee",
    category: "Heavyweight Boxy Knit",
    priceINR: 2890,
    originalPriceINR: 3990,
    image: "/images/products/product_01_on_air.jpg",
    tag: "Atelier Bestseller",
    description: "Combed long-staple Indian cotton with vibrant typographic chest print.",
  },
  {
    id: "drip-2",
    rank: 2,
    name: "Edition 02 — Mazda RX 1992 Technical Tee",
    category: "Vintage Automotive Archive",
    priceINR: 3190,
    originalPriceINR: 4290,
    image: "/images/products/product_02_mazda_duo.jpg",
    tag: "Highsnobiety Feature",
    description: "Dual-model studio cut featuring high-density blueprint back graphics.",
  },
  {
    id: "drip-3",
    rank: 3,
    name: "Edition 03 — Flawless With Forceps Neon Tee",
    category: "Graphic Screenprint",
    priceINR: 2990,
    originalPriceINR: 3890,
    image: "/images/products/product_03_forceps_neon.jpg",
    tag: "Cult Favorite",
    description: "Electric lime screenprint on pitch black combed cotton jersey.",
  },
  {
    id: "drip-4",
    rank: 4,
    name: "Edition 04 — Street Jutsu Urban Dragon Tee",
    category: "Raw Boxy Streetwear",
    priceINR: 2790,
    originalPriceINR: 3690,
    image: "/images/products/product_04_street_jutsu_urban.jpg",
    tag: "Essential Cut",
    description: "Monochrome dragon iconography with drop-shoulder streetwear geometry.",
  },
  {
    id: "drip-5",
    rank: 5,
    name: "Edition 05 — Street Jutsu Raw Bone Tee",
    category: "Unbleached Cotton",
    priceINR: 2690,
    originalPriceINR: 3490,
    image: "/images/products/product_05_street_jutsu_white.jpg",
    tag: "Dual Cut",
    description: "Clean chest typography on unbleached natural combed yarn.",
  },
  {
    id: "drip-6",
    rank: 6,
    name: "Edition 06 — DVC Sunset Silhouette Tee",
    category: "Golden Hour Heavyweight",
    priceINR: 2890,
    originalPriceINR: 3790,
    image: "/images/products/product_06_dvc_sunset.jpg",
    tag: "Editorial Pick",
    description: "Substantial 1.25-inch rib neckband and relaxed streetwear drape.",
  },
  {
    id: "drip-7",
    rank: 7,
    name: "Edition 07 — Ajichart Heritage 1986 Tee",
    category: "Multi-Color Screenprint",
    priceINR: 3390,
    originalPriceINR: 4490,
    image: "/images/products/product_07_rooster_art_tee.jpg",
    tag: "Master Printmaker",
    description: "Intricate 6-color back screenprint with Thai typographic accents.",
  },
  {
    id: "drip-8",
    rank: 8,
    name: "Edition 08 — Liniker Leopard Accent Duo Tee",
    category: "Twin Model Editorial",
    priceINR: 3090,
    originalPriceINR: 4190,
    image: "/images/products/product_08_liniker_duo.jpg",
    tag: "Archive Grail",
    description: "Double model presentation highlighting structural shoulder seams.",
  },
];

export function TopDripCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef(0);
  const touchDeltaXRef = useRef(0);

  const activeProduct = TOP_10_PRODUCTS[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : TOP_10_PRODUCTS.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < TOP_10_PRODUCTS.length - 1 ? prev + 1 : 0));
  };

  // Auto-sliding loop with increased speed
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOP_10_PRODUCTS.length);
    }, 1800);

    return () => clearInterval(interval);
  }, [isPaused]);

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchDeltaXRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchDeltaXRef.current = e.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (touchDeltaXRef.current > 45) {
      handlePrev();
    } else if (touchDeltaXRef.current < -45) {
      handleNext();
    }
  };

  return (
    <section
      id="trending"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full py-24 px-4 sm:px-8 lg:px-12 bg-[#F5F4F0] text-[#111111] overflow-hidden select-none"
    >
      {/* 1. Backdrop Wall Grid: Crisp, architectural, and clearly visible */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.11) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.11) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.25) 75%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 45%, rgba(0,0,0,0.25) 75%, transparent 100%)",
        }}
      />

      {/* 2. 3D Perspective Ground Grid Plane: Clearly visible, razor-sharp floor */}
      <div
        className="absolute inset-x-[-25%] bottom-0 h-[480px] sm:h-[600px] pointer-events-none overflow-hidden"
        style={{
          perspective: "540px",
          perspectiveOrigin: "50% 0%",
        }}
      >
        <div
          className="w-full h-[220%] origin-top"
          style={{
            transform: "rotateX(70deg) translateZ(0)",
            transformStyle: "preserve-3d",
            maskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,1) 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 10%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,1) 100%)",
          }}
        >
          {/* Moving Grid Texture with GPU Translation & Crisp Contrast */}
          <div
            className="w-full h-full animate-grid-gpu"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.20) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.20) 1px, transparent 1px)
              `,
              backgroundSize: "64px 64px",
            }}
          />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto flex flex-col items-center z-10">
        {/* Header: Outline "TOP 10" with Centered Blue Script "cultured" (Exact Reference Match) */}
        <div className="text-center mb-12 relative">
          <div className="relative inline-flex items-center justify-center">
            {/* Outlined TOP 10 */}
            <h2
              className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tight uppercase leading-none font-sans text-transparent select-none"
              style={{
                WebkitTextStroke: "2.5px #111111",
              }}
            >
              TOP 10
            </h2>

            {/* Symmetrically Centered Script "cultured" in Royal Blue */}
            <span
              className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl md:text-7xl font-serif italic font-bold tracking-tight text-[#2563EB] drop-shadow-sm pointer-events-none select-none whitespace-nowrap"
              style={{
                fontFamily: "Georgia, 'Times New Roman', serif",
                transform: "rotate(-3deg)",
              }}
            >
              cultured
            </span>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-neutral-600 font-light tracking-wide">
            Best selling drip around the world. Refreshed weekly.
          </p>
        </div>

        {/* 3D Perspective Floating Images Track (Zero background boxes, zero image numbers) */}
        <div
          className="relative w-full h-[340px] sm:h-[400px] flex items-center justify-center touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {TOP_10_PRODUCTS.map((product, idx) => {
            const distance = idx - activeIndex;
            const absDist = Math.abs(distance);

            if (absDist > 3) return null;

            const isCenter = distance === 0;
            const translateX = distance * (typeof window !== "undefined" && window.innerWidth < 640 ? 120 : 220);
            const translateZ = -absDist * 160;
            const rotateY = distance * -12;
            const scale = isCenter ? 1.35 : Math.max(0.65, 1 - absDist * 0.22);
            const opacity = isCenter ? 1 : Math.max(0.35, 1 - absDist * 0.32);
            const zIndex = 30 - absDist * 5;

            return (
              <div
                key={product.id}
                onClick={() => setActiveIndex(idx)}
                className="absolute flex flex-col items-center justify-center cursor-pointer transition-all duration-700 ease-out"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Floating Product Image (No background card, no rank number badge) */}
                <div className="relative w-44 h-60 sm:w-56 sm:h-72 flex items-center justify-center">
                  {/* Soft Ground Contact Shadow */}
                  <div
                    className={`absolute -bottom-3 w-3/4 h-5 rounded-full bg-black/60 blur-md transition-all duration-500 ${
                      isCenter ? "opacity-90 scale-110" : "opacity-30 scale-75"
                    }`}
                  />

                  {/* Pure Floating Cutout/Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Details Card with Arrow Navigation (Exact Reference Match) */}
        <div className="relative w-full max-w-md mx-auto mt-6 flex items-center justify-center gap-3">
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white text-black border border-neutral-300 shadow-md flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all z-20 shrink-0 cursor-pointer"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Reference Match Card */}
          <div className="flex-1 p-5 rounded-2xl bg-white text-black border border-neutral-200/80 shadow-xl flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold font-sans text-neutral-900 line-clamp-1">
                  {activeProduct.name}
                </h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-base font-black font-mono text-black">
                    ₹{activeProduct.priceINR.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-mono text-neutral-400 line-through">
                    ₹{activeProduct.originalPriceINR.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Wishlist Heart Icon */}
              <button
                onClick={(e) => toggleWishlist(activeProduct.id, e)}
                className="p-1.5 text-neutral-400 hover:text-black transition-colors cursor-pointer"
                aria-label="Save to Wishlist"
              >
                <Heart
                  className={`w-4 h-4 ${
                    wishlist[activeProduct.id] ? "fill-black text-black" : ""
                  }`}
                />
              </button>
            </div>

            <div className="text-[11px] font-mono text-neutral-500">
              EMI @INR {Math.round(activeProduct.priceINR / 4)}/Month
            </div>

            {/* Black Solid Button: Explore */}
            <a
              href={`/shop/${activeProduct.id.replace("drip-", "prod-0")}`}
              className="w-full py-3 rounded-xl bg-black hover:bg-neutral-800 text-white font-sans text-xs font-bold uppercase tracking-wider text-center transition-all cursor-pointer shadow-sm"
            >
              Explore
            </a>
          </div>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white text-black border border-neutral-300 shadow-md flex items-center justify-center hover:bg-neutral-100 active:scale-95 transition-all z-20 shrink-0 cursor-pointer"
            aria-label="Next item"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Small Progress Indicator Track Underneath */}
        <div className="w-32 h-1 bg-neutral-300 rounded-full mt-4 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300 rounded-full"
            style={{
              width: `${((activeIndex + 1) / TOP_10_PRODUCTS.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default TopDripCarousel;