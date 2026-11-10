"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Minus,
  Plus,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Check,
  Sparkles,
  Gift,
  ArrowUpRight,
} from "lucide-react";
import { CartItem } from "@/lib/types";
import { EDITIONS } from "@/lib/types";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: "INR" | "USD";
  onUpdateQuantity: (index: number, newQty: number) => void;
  onUpdateSize?: (index: number, newSize: string) => void;
  onRemoveItem: (index: number) => void;
  onQuickAdd?: (editionId: string) => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onUpdateSize,
  onRemoveItem,
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [giftBox, setGiftBox] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((acc, item) => {
    const price = currency === "INR" ? item.edition.priceINR : item.edition.priceUSD;
    return acc + price * item.quantity;
  }, 0);

  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const giftBoxCost = giftBox ? (currency === "INR" ? 350 : 6) : 0;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + giftBoxCost);

  const freeShippingThreshold = currency === "INR" ? 3000 : 50;
  const freeShippingReached = rawSubtotal >= freeShippingThreshold;
  const freeShippingProgress = Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (cleanCode === "VOID10" || cleanCode === "ATELIER10") {
      setDiscountPercent(10);
      setPromoApplied(true);
      setPromoError("");
    } else if (cleanCode === "VOID20") {
      setDiscountPercent(20);
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid code. Try VOID10 for 10% off.");
    }
  };

  const formatPrice = (amount: number) =>
    currency === "INR" ? `₹${amount.toLocaleString("en-IN")}` : `$${amount}`;

  const totalItemCount = items.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Translucent Dark Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
      />

      {/* Claymorphic Warm Bone Luxury Slide-Over Drawer (Matches Website Theme) */}
      <aside
        aria-label="Shopping Bag Drawer"
        className="relative w-full max-w-md sm:max-w-lg h-full bg-[#F5F4F0] border-l border-black/10 sm:rounded-l-[32px] p-6 sm:p-7 flex flex-col justify-between z-10 shadow-[-25px_0_60px_rgba(0,0,0,0.18),-5px_0_20px_rgba(0,0,0,0.08)] text-[#111111] overflow-hidden"
      >
        {/* Subtle Ambient Radial Lighting */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#B34728]/5 blur-[100px] pointer-events-none rounded-full" />
        <div className="absolute bottom-20 left-0 w-72 h-72 bg-amber-500/5 blur-[100px] pointer-events-none rounded-full" />

        {/* ================= 1. CLAYMORPHIC HEADER ================= */}
        <div className="relative z-10 flex items-center justify-between pb-5 border-b border-black/10">
          <div className="flex items-center gap-3">
            {/* Clay Pill Bag Icon */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-white to-[#EAE8E2] border border-black/10 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),0_4px_10px_rgba(0,0,0,0.06)] flex items-center justify-center text-black">
              <ShoppingBag className="w-5 h-5 text-neutral-800" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-sans font-bold tracking-wider uppercase text-black">
                  SHOPPING BAG
                </h2>
                {/* Clay Counter Pill */}
                <span className="px-2.5 py-0.5 rounded-full bg-black/5 border border-black/10 text-neutral-800 font-mono text-[10px] font-bold shadow-[inset_0_1px_1.5px_rgba(0,0,0,0.04)]">
                  {totalItemCount}
                </span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 block tracking-widest mt-0.5">
                VOID ATELIER VAULT
              </span>
            </div>
          </div>

          {/* Tactile 3D Clay Close Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-neutral-100 border border-black/10 text-neutral-700 hover:text-black shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_2px_6px_rgba(0,0,0,0.06)] active:scale-90 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Close bag"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ================= 2. CLAYMORPHIC FREE COURIER METER ================= */}
        <div className="relative z-10 py-3.5 px-4 my-3 rounded-2xl bg-white border border-black/10 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),0_4px_12px_rgba(0,0,0,0.04)] space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="flex items-center gap-2 text-neutral-800">
              <Truck className={`w-4 h-4 ${freeShippingReached ? "text-emerald-600" : "text-[#B34728]"}`} />
              <span className="font-medium text-[11px]">
                {freeShippingReached
                  ? "✓ Free Domestic Air Courier Unlocked"
                  : `Add ${formatPrice(freeShippingThreshold - rawSubtotal)} for Free Courier`}
              </span>
            </span>
            <span className="font-bold text-[11px] text-neutral-600 font-mono">
              {freeShippingProgress}%
            </span>
          </div>

          {/* Deep Inset Clay Progress Groove */}
          <div className="w-full h-2 bg-neutral-200/80 rounded-full p-0.5 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.12)] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ease-out ${
                freeShippingReached
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                  : "bg-gradient-to-r from-[#B34728] via-[#D4704B] to-amber-500"
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* ================= 3. SCROLLABLE ITEMS OR LUXURY EMPTY STATE ================= */}
        <div className="relative z-10 flex-1 overflow-y-auto py-2 space-y-4 pr-1">
          {items.length === 0 ? (
            /* LUXURIOUS CLAYMORPHIC EMPTY STATE (WARM BONE PALETTE) */
            <div className="h-full flex flex-col items-center justify-center text-center px-4 py-8 select-none">
              {/* 3D Claymorphic Vault Emblem with Glow */}
              <div className="relative mb-6">
                <div className="absolute inset-0 rounded-full bg-amber-500/10 blur-2xl" />
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-b from-white to-[#E8E6E0] border border-black/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.05),0_15px_30px_rgba(0,0,0,0.08)] flex items-center justify-center text-neutral-800">
                  <ShoppingBag className="w-9 h-9 stroke-[1.4] text-neutral-800" />
                </div>
              </div>

              {/* Editorial Typography */}
              <h3 className="font-sans font-bold text-lg uppercase tracking-wider text-black">
                YOUR ATELIER BAG IS EMPTY
              </h3>
              <p className="font-bodoni-moda italic text-xs text-neutral-600 max-w-xs mt-2 leading-relaxed">
                Every edition is strictly limited to numbered production runs. Reserve your architectural silhouette before the archive closes.
              </p>

              {/* 3D Clay CTA Button */}
              <button
                type="button"
                onClick={onClose}
                className="mt-6 py-3 px-7 rounded-full bg-black text-white hover:bg-neutral-800 font-mono text-xs font-black uppercase tracking-widest shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_2px_3px_rgba(255,255,255,0.25)] active:scale-95 transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>DISCOVER CURRENT EDITIONS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Curated Archive Highlights Mini Tiles */}
              <div className="w-full mt-10 pt-6 border-t border-black/10 text-left">
                <div className="flex items-center justify-between text-[10px] font-mono tracking-widest text-neutral-500 uppercase mb-3 font-bold">
                  <span>ATELIER HIGHLIGHTS</span>
                  <Link
                    href="/shop"
                    onClick={onClose}
                    className="text-[#B34728] hover:text-black transition-colors"
                  >
                    EXPLORE ALL →
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {EDITIONS.slice(0, 2).map((ed) => (
                    <Link
                      key={ed.id}
                      href={`/shop/${ed.id}`}
                      onClick={onClose}
                      className="p-3 rounded-2xl bg-white hover:bg-neutral-50 border border-black/10 shadow-[0_4px_12px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,0.9)] transition-all group block"
                    >
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#EAE8E2] mb-2 border border-black/5">
                        <Image
                          src={ed.graphicUrl}
                          alt={ed.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <h4 className="text-xs font-bold text-black font-sans truncate group-hover:text-[#B34728] transition-colors">
                        {ed.name}
                      </h4>
                      <span className="text-[11px] font-mono text-neutral-500 block mt-0.5 font-bold">
                        {formatPrice(currency === "INR" ? ed.priceINR : ed.priceUSD)}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* POPULATED CLAYMORPHIC ITEM CARDS (WARM BONE PALETTE) */
            items.map((item, idx) => {
              const itemPrice = currency === "INR" ? item.edition.priceINR : item.edition.priceUSD;
              const itemTotal = itemPrice * item.quantity;

              return (
                <article
                  key={`${item.edition.id}-${item.size}-${idx}`}
                  className="p-4 rounded-2xl bg-white border border-black/10 shadow-[0_8px_20px_rgba(0,0,0,0.04),inset_0_1.5px_2px_rgba(255,255,255,0.9)] flex flex-col gap-3.5 transition-all hover:border-black/20"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Product Thumbnail with 3D Bevel */}
                      <div className="relative w-14 h-16 rounded-xl overflow-hidden border border-black/10 bg-[#EAE8E2] shrink-0 shadow-inner">
                        <Image
                          src={item.edition.graphicUrl || "/images/products/product_01_on_air.jpg"}
                          alt={item.edition.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h4 className="text-xs font-bold text-black font-sans leading-snug">
                          {item.edition.name}
                        </h4>
                        <span className="text-[10px] font-mono text-neutral-500 block mt-0.5">
                          300 GSM Heavyweight Combed Cotton
                        </span>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-xs font-mono font-bold text-black">
                            {formatPrice(itemTotal)}
                          </span>
                          {item.quantity > 1 && (
                            <span className="text-[10px] font-mono text-neutral-500">
                              ({formatPrice(itemPrice)} each)
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Clay Remove Button */}
                    <button
                      type="button"
                      onClick={() => onRemoveItem(idx)}
                      className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-rose-50 border border-black/5 hover:border-rose-200 text-neutral-500 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer shadow-sm active:scale-90"
                      title="Remove piece"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Size Selector & 3D Quantity Stepper */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-black/5 text-xs font-mono">
                    {/* Size Selector Pills */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-neutral-500 font-bold">SIZE:</span>
                      <div className="flex items-center gap-1">
                        {["01", "02", "03", "04"].map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => onUpdateSize?.(idx, sz)}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                              item.size === sz
                                ? "bg-black text-white font-bold shadow-sm"
                                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 3D Clay Quantity Pill (Minus - Num - Plus) */}
                    <div className="flex items-center rounded-xl bg-neutral-100 border border-black/10 px-1 py-0.5 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.06)]">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-black active:scale-90 transition-all cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-mono font-bold text-black">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-black active:scale-90 transition-all cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* ================= 4. PROMO CODE, SUMMARY & CHECKOUT ================= */}
        {items.length > 0 && (
          <div className="relative z-10 pt-4 border-t border-black/10 space-y-3.5">
            {/* Claymorphic Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="PROMO CODE (TRY: VOID10)"
                  disabled={promoApplied}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-xs font-mono uppercase text-black placeholder:text-neutral-400 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.04)] focus:outline-none focus:border-black"
                />
              </div>
              <button
                type="submit"
                disabled={promoApplied}
                className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold uppercase transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50"
              >
                {promoApplied ? <Check className="w-4 h-4 text-emerald-400" /> : "APPLY"}
              </button>
            </form>

            {promoError && (
              <p className="text-[10px] font-mono text-rose-500">{promoError}</p>
            )}

            {/* Claymorphic Gift Packaging Add-on */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-white border border-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_2px_6px_rgba(0,0,0,0.03)] cursor-pointer text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  checked={giftBox}
                  onChange={(e) => setGiftBox(e.target.checked)}
                  className="rounded bg-white border-black/20 text-[#B34728] focus:ring-0 accent-black cursor-pointer"
                />
                <span className="text-neutral-800 text-[11px] font-medium">
                  Archival Embossed Gift Packaging
                </span>
              </div>
              <span className="text-neutral-600 font-bold">
                +{formatPrice(currency === "INR" ? 350 : 6)}
              </span>
            </label>

            {/* Pricing Summary Lines */}
            <div className="space-y-1.5 text-xs font-mono pt-1">
              <div className="flex justify-between text-neutral-600">
                <span>SUBTOTAL</span>
                <span className="font-bold text-black">{formatPrice(rawSubtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>DISCOUNT ({discountPercent}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              {giftBox && (
                <div className="flex justify-between text-neutral-600">
                  <span>GIFT PACKAGING</span>
                  <span>+{formatPrice(giftBoxCost)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>AIR COURIER DISPATCH</span>
                <span className="text-emerald-700 font-bold">
                  {freeShippingReached ? "COMPLIMENTARY" : "₹150"}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-black pt-2.5 border-t border-black/10">
                <span>ESTIMATED TOTAL</span>
                <span className="text-base font-black tracking-tight">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* 3D Claymorphic Grand Acquisition Button */}
            <button
              type="button"
              onClick={() => {
                alert(`Proceeding to checkout with ${items.length} piece(s) — Total: ${formatPrice(finalTotal)}`);
              }}
              className="w-full py-4 rounded-2xl bg-black hover:bg-neutral-900 text-white font-mono text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-[0_12px_28px_rgba(0,0,0,0.2),inset_0_2px_3px_rgba(255,255,255,0.25)] hover:scale-[1.01] active:scale-98 cursor-pointer group"
            >
              <span>PROCEED TO SECURE CHECKOUT · {formatPrice(finalTotal)}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Authenticity & Dispatch Trust Badge */}
            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-neutral-500 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
              <span>Guaranteed Atelier Dispatch · 256-Bit Encrypted</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;
