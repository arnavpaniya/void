"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ArrowUpRight } from "lucide-react";
import { DETAILED_PRODUCTS } from "@/lib/productData";
import { toggleWishlistItem, isItemInWishlist, getStoredWishlist } from "@/lib/wishlistStore";

interface TrendingSectionProps {
  onQuickAdd?: (name: string, size: string, price: number) => void;
}

export function TrendingSection({ onQuickAdd }: TrendingSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<Record<string, number>>({});
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    const stored = getStoredWishlist();
    const map: Record<string, boolean> = {};
    stored.forEach((item) => {
      map[item.id] = true;
    });
    setWishlist(map);

    const handleSync = () => {
      const updated = getStoredWishlist();
      const updatedMap: Record<string, boolean> = {};
      updated.forEach((item) => {
        updatedMap[item.id] = true;
      });
      setWishlist(updatedMap);
    };

    window.addEventListener("void-wishlist-updated", handleSync);
    return () => window.removeEventListener("void-wishlist-updated", handleSync);
  }, []);

  const filteredProducts = DETAILED_PRODUCTS.filter((prod) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "core") return prod.priceINR <= 2900;
    if (activeFilter === "master") return prod.priceINR > 2900;
    return true;
  });

  const handleSelectColor = (e: React.MouseEvent, productId: string, colorIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColors((prev) => ({ ...prev, [productId]: colorIdx }));
  };

  const toggleWishlist = (product: typeof DETAILED_PRODUCTS[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlistItem({
      id: product.id,
      name: product.name,
      priceINR: product.priceINR,
      originalPriceINR: product.originalPriceINR,
      image: product.images[0]?.src || "/images/products/product_01_on_air.jpg",
      gsm: "Heavyweight Knit",
      category: product.subtitle || "Archival Drop",
      addedAt: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <section className="relative w-full py-20 sm:py-28 px-4 sm:px-8 lg:px-12 bg-[#F5F4F0] text-[#111111]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <span className="text-[10px] sm:text-xs font-space-mono uppercase tracking-[0.25em] text-neutral-500 block mb-2">
              CURATED DROPS · ARCHIVE EDITIONS
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl text-black tracking-tight leading-none">
              <span className="font-sans font-black uppercase">Current </span>
              <span className="font-bodoni-moda italic font-normal">Editions</span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans mt-3 max-w-xl leading-relaxed">
              Engineered with Tirupur combed cotton, 1.25-inch rib neckbands, and dense pigment screenprinting.
              Click any piece to inspect multi-angle views, color finishes, and size measurements.
            </p>
          </div>

          {/* Minimalist Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-200/60 border border-black/5 self-start md:self-auto">
            {[
              { id: "all", label: "ALL EDITIONS" },
              { id: "core", label: "CORE ARCHIVE" },
              { id: "master", label: "MASTER PRINTS" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-space-mono uppercase tracking-wider transition-all cursor-pointer ${
                  activeFilter === tab.id
                    ? "bg-black text-white font-bold shadow-sm"
                    : "text-neutral-600 hover:text-black hover:bg-white/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid: Pure Luxury Editorial Presentation (No Popup, No Hover Size Buttons) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-10">
          {filteredProducts.map((product) => {
            const isHovered = hoveredCard === product.id;
            const currentColorIdx = selectedColors[product.id] || 0;
            const isWishlisted = !!wishlist[product.id];

            // Primary image & secondary hover image
            const primaryImage = product.images[0]?.src || "/images/products/product_01_on_air.jpg";
            const hoverImage = product.images[1]?.src || primaryImage;

            return (
              <Link
                key={product.id}
                href={`/shop/${product.id}`}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ position: "relative", display: "block", overflow: "hidden" }}
                className="group relative flex flex-col justify-between rounded-3xl bg-white border border-black/8 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 cursor-pointer block"
              >
                {/* 1. Visual Photography Stage */}
                <div
                  className="relative w-full aspect-[4/5] overflow-hidden bg-[#ECE9E2]"
                  style={{ position: "relative", width: "100%", aspectRatio: "4/5", overflow: "hidden" }}
                >
                  {/* Primary Product Photo */}
                  <Image
                    src={primaryImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={`object-cover object-center transition-all duration-700 ease-out ${
                      isHovered && hoverImage !== primaryImage
                        ? "opacity-0 scale-105"
                        : "opacity-100 group-hover:scale-105"
                    }`}
                  />

                  {/* Secondary Photo Crossfade on Hover (shows back or graphic artwork) */}
                  {hoverImage !== primaryImage && (
                    <Image
                      src={hoverImage}
                      alt={`${product.name} alternate view`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-cover object-center transition-all duration-700 ease-out absolute inset-0 ${
                        isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                      }`}
                    />
                  )}

                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-60 pointer-events-none" />

                  {/* Top Float: Minimalist Wishlist Button */}
                  <button
                    onClick={(e) => toggleWishlist(product, e)}
                    className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-black/5 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-white shadow-sm transition-all duration-300"
                    aria-label="Save to wishlist"
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isWishlisted
                          ? "fill-rose-500 text-rose-500 stroke-rose-500 scale-110"
                          : "hover:scale-110"
                      }`}
                    />
                  </button>
                </div>

                {/* 2. Card Editorial Information (Below Photo) */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 space-y-4 bg-white">
                  <div>
                    {/* Category Subtitle & Rating */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-space-mono uppercase tracking-[1.5px] text-neutral-400">
                        {product.subtitle}
                      </span>

                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500 stroke-none" />
                        <span className="text-xs font-space-mono font-bold text-black">
                          {product.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    {/* Clean Product Title */}
                    <h3 className="text-base sm:text-lg font-bold text-black font-sans tracking-tight leading-snug group-hover:text-neutral-700 transition-colors">
                      {product.name}
                    </h3>
                  </div>

                  {/* Price, Color Dots, and Circular Action Arrow */}
                  <div className="pt-3 border-t border-black/8 flex items-center justify-between gap-3">
                    {/* Price Block */}
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg sm:text-xl font-bold font-space-mono text-black">
                        ₹{product.priceINR.toLocaleString("en-IN")}
                      </span>
                      {product.originalPriceINR > product.priceINR && (
                        <span className="text-xs font-space-mono text-neutral-400 line-through">
                          ₹{product.originalPriceINR.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>

                    {/* Right side: Color dots + Circular Action Button */}
                    <div className="flex items-center gap-3">
                      {/* Color Dots */}
                      <div className="flex items-center gap-1.5">
                        {product.colors.map((c, cIdx) => (
                          <button
                            key={c.name}
                            onClick={(e) => handleSelectColor(e, product.id, cIdx)}
                            className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                              currentColorIdx === cIdx
                                ? "ring-2 ring-black ring-offset-1 scale-110"
                                : "border-neutral-300 opacity-70 hover:opacity-100"
                            }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>

                      {/* Circular Action Arrow */}
                      <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shrink-0 bg-neutral-50 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-300">
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default TrendingSection;
