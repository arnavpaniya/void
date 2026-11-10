"use client";

import React, { useState } from "react";
import { X, Heart, ShoppingBag, ArrowRight, Trash2 } from "lucide-react";
import { WishlistItem, Edition } from "@/lib/types";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: WishlistItem[];
  onRemove: (id: string) => void;
  onMoveToCart: (item: WishlistItem, size: string) => void;
  currency: "INR" | "USD";
}

export function WishlistDrawer({
  isOpen,
  onClose,
  items,
  onRemove,
  onMoveToCart,
  currency,
}: WishlistDrawerProps) {
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const formatPrice = (inr: number) =>
    currency === "INR" ? `₹${inr.toLocaleString("en-IN")}` : `$${Math.round(inr / 60)}`;

  const handleSizeSelect = (itemId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleAddToCart = (item: WishlistItem) => {
    const size = selectedSizes[item.id] || "02";
    onMoveToCart(item, size);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md h-full bg-[#0E0D0C] border-l border-white/10 p-6 flex flex-col justify-between z-10 shadow-2xl text-white">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-sm font-mono font-bold tracking-wider uppercase">
              SAVED PIECES ({items.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-neutral-400 hover:text-white cursor-pointer"
            aria-label="Close wishlist"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto py-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 space-y-3">
              <Heart className="w-12 h-12 opacity-25" />
              <p className="font-mono text-xs uppercase tracking-widest text-neutral-400">
                NO SAVED PIECES YET
              </p>
              <button
                onClick={onClose}
                className="text-xs font-mono text-white underline underline-offset-4 hover:text-neutral-300 cursor-pointer"
              >
                BROWSE RUNWAY EDITIONS
              </button>
            </div>
          ) : (
            items.map((item) => {
              const currentSize = selectedSizes[item.id] || "02";

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center p-1 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400">
                          {item.gsm} · {item.category}
                        </span>
                        <h4 className="text-xs font-bold text-white font-sans line-clamp-1">
                          {item.name}
                        </h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs font-mono font-bold text-white">
                            {formatPrice(item.priceINR)}
                          </span>
                          {item.originalPriceINR && (
                            <span className="text-[10px] font-mono text-neutral-500 line-through">
                              {formatPrice(item.originalPriceINR)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Size Selector and Add to Cart Button */}
                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      {["01", "02", "03", "04"].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => handleSizeSelect(item.id, sz)}
                          className={`w-6 h-6 rounded text-[9px] font-mono flex items-center justify-center transition-all ${
                            currentSize === sz
                              ? "bg-white text-black font-bold"
                              : "text-neutral-400 hover:text-white"
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-3 py-1.5 rounded-lg bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>MOVE TO BAG</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>SAVED TO CLIENT PROFILE</span>
            <button
              onClick={onClose}
              className="text-white hover:underline flex items-center gap-1"
            >
              <span>CONTINUE BROWSING</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistDrawer;
