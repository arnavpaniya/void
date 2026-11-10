"use client";

import React, { useState } from "react";
import { Plus, Check, ShieldCheck, Sparkles } from "lucide-react";
import { Edition } from "@/lib/types";

interface ProductDetailsProps {
  edition: Edition;
  currency: "INR" | "USD";
  onAddToCart: (edition: Edition, size: string) => void;
}

const SIZES = [
  { id: "1", label: "01", fit: "Oversized S/M (Chest 44\")" },
  { id: "2", label: "02", fit: "Boxy L (Chest 48\")" },
  { id: "3", label: "03", fit: "Monumental XL (Chest 52\")" },
  { id: "4", label: "04", fit: "Exaggerated XXL (Chest 56\")" },
];

export function ProductDetails({
  edition,
  currency,
  onAddToCart,
}: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState("2");
  const [added, setAdded] = useState(false);

  const price = currency === "INR" ? `₹${edition.priceINR}` : `$${edition.priceUSD}`;

  const handleAdd = () => {
    onAddToCart(edition, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div className="w-full max-w-sm pointer-events-auto flex flex-col gap-5 p-6 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 shadow-2xl text-white">
      {/* Title & Price Header */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-1">
          <span className="tracking-widest uppercase">{edition.subtitle}</span>
          <span className="text-neutral-300 font-serif italic text-sm">
            {edition.devanagariName}
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold tracking-tight font-sans">
            {edition.name}
          </h2>
          <span className="text-xl font-mono font-semibold text-white">
            {price}
          </span>
        </div>
      </div>

      {/* Description & Story */}
      <p className="text-xs leading-relaxed text-neutral-300 font-light">
        {edition.story}
      </p>

      {/* Fabric Heritage Specs */}
      <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-white/5 border border-white/5 text-[10px] font-mono">
        <div>
          <span className="text-neutral-500 block">WEIGHT</span>
          <span className="text-neutral-200">{edition.fabricSpecs.weight}</span>
        </div>
        <div>
          <span className="text-neutral-500 block">KNIT</span>
          <span className="text-neutral-200">{edition.fabricSpecs.knit}</span>
        </div>
        <div>
          <span className="text-neutral-500 block">YARN</span>
          <span className="text-neutral-200">{edition.fabricSpecs.yarn}</span>
        </div>
        <div>
          <span className="text-neutral-500 block">ORIGIN</span>
          <span className="text-neutral-200">{edition.fabricSpecs.origin}</span>
        </div>
      </div>

      {/* Size Selector */}
      <div>
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
          <span>SELECT SIZE</span>
          <span className="text-[11px] text-neutral-400">
            {SIZES.find((s) => s.id === selectedSize)?.fit}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {SIZES.map((size) => {
            const isSelected = size.id === selectedSize;
            return (
              <button
                key={size.id}
                onClick={() => setSelectedSize(size.id)}
                className={`py-2 text-center rounded-lg text-xs font-mono font-medium transition-all ${
                  isSelected
                    ? "bg-white text-black shadow-md scale-102 font-bold"
                    : "bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {size.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add To Bag Action */}
      <button
        onClick={handleAdd}
        disabled={added}
        className={`w-full py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 font-bold ${
          added
            ? "bg-emerald-500 text-black shadow-lg"
            : "bg-white text-black hover:bg-neutral-200 active:scale-98 shadow-xl"
        }`}
      >
        {added ? (
          <>
            <Check className="w-4 h-4 stroke-[2.5]" />
            <span>ADDED TO BAG</span>
          </>
        ) : (
          <>
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>ACQUIRE PIECE — {price}</span>
          </>
        )}
      </button>

      {/* Guarantees */}
      <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-neutral-400 pt-1 border-t border-white/5">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-neutral-400" />
          Domestic Express Delivery
        </span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-neutral-400" />
          Numbered Edition
        </span>
      </div>
    </div>
  );
}
