"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Check,
  Package,
} from "lucide-react";
import { Header } from "@/components/commerce/Header";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { VoidFooter } from "@/components/commerce/VoidFooter";
import { EDITIONS, Edition, CartItem, WishlistItem } from "@/lib/types";
import {
  getStoredWishlist,
  removeFromWishlist,
  saveWishlist,
} from "@/lib/wishlistStore";

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  // Sync wishlist from localStorage
  useEffect(() => {
    setItems(getStoredWishlist());

    const handleUpdate = () => {
      setItems(getStoredWishlist());
    };

    window.addEventListener("void-wishlist-updated", handleUpdate);
    return () => window.removeEventListener("void-wishlist-updated", handleUpdate);
  }, []);

  const formatPrice = (inr: number) =>
    currency === "INR"
      ? `₹${inr.toLocaleString("en-IN")}`
      : `$${Math.round(inr / 60)}`;

  const totalValue = items.reduce((acc, item) => acc + item.priceINR, 0);

  const handleSizeSelect = (itemId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [itemId]: size }));
  };

  const handleRemove = (id: string) => {
    removeFromWishlist(id);
  };

  const handleAddToCart = (item: WishlistItem) => {
    const size = selectedSizes[item.id] || "02";
    
    // Find matching edition or create fallback edition
    const matchedEdition = EDITIONS.find((e) =>
      item.name.toLowerCase().includes(e.name.toLowerCase())
    ) || {
      ...EDITIONS[0],
      name: item.name,
      priceINR: item.priceINR,
      priceUSD: Math.round(item.priceINR / 60),
    };

    setCartItems((prev) => {
      const existing = prev.find(
        (ci) => ci.edition.id === matchedEdition.id && ci.size === size
      );
      if (existing) {
        return prev.map((ci) =>
          ci.edition.id === matchedEdition.id && ci.size === size
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prev, { edition: matchedEdition, size, quantity: 1 }];
    });

    // Remove from wishlist after moving to bag
    handleRemove(item.id);

    setAddedItemNotice(item.name);
    setTimeout(() => setAddedItemNotice(null), 3000);
    setCartOpen(true);
  };

  const handleMoveAllToBag = () => {
    items.forEach((item) => {
      const size = selectedSizes[item.id] || "02";
      const matchedEdition = EDITIONS.find((e) =>
        item.name.toLowerCase().includes(e.name.toLowerCase())
      ) || {
        ...EDITIONS[0],
        name: item.name,
        priceINR: item.priceINR,
        priceUSD: Math.round(item.priceINR / 60),
      };

      setCartItems((prev) => {
        const existing = prev.find(
          (ci) => ci.edition.id === matchedEdition.id && ci.size === size
        );
        if (existing) {
          return prev.map((ci) =>
            ci.edition.id === matchedEdition.id && ci.size === size
              ? { ...ci, quantity: ci.quantity + 1 }
              : ci
          );
        }
        return [...prev, { edition: matchedEdition, size, quantity: 1 }];
      });
    });

    saveWishlist([]);
    setCartOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#F5F4F0] text-[#111111] font-sans selection:bg-neutral-300 selection:text-black">
      {/* Claymorphic Floating Header */}
      <Header
        editions={EDITIONS}
        activeEdition={EDITIONS[0]}
        onSelectEdition={() => {}}
        currency={currency}
        onToggleCurrency={() =>
          setCurrency((prev) => (prev === "INR" ? "USD" : "INR"))
        }
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        wishlistCount={items.length}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={(index, qty) => {
          if (qty <= 0) {
            setCartItems((prev) => prev.filter((_, i) => i !== index));
          } else {
            setCartItems((prev) =>
              prev.map((item, i) =>
                i === index ? { ...item, quantity: qty } : item
              )
            );
          }
        }}
        onRemoveItem={(index) => {
          setCartItems((prev) => prev.filter((_, i) => i !== index));
        }}
      />

      {/* Main Wishlist Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-12 pt-36 sm:pt-44 pb-24">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-6 uppercase tracking-wider">
          <Link href="/" className="hover:text-black transition-colors">
            ATELIER
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <Link href="/shop" className="hover:text-black transition-colors">
            SHOP
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          <span className="text-black font-semibold">SAVED PIECES</span>
        </nav>

        {/* Hero Headline Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-xs font-mono tracking-[0.25em] text-neutral-500 uppercase">
                PERSONAL ARCHIVE VAULT
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-black uppercase leading-[0.95]">
              SAVED PIECES
            </h1>
            <p className="font-bodoni-moda italic text-xl sm:text-2xl text-neutral-600 mt-2">
              शू न्य · Your curated selection of architectural streetwear silhouettes.
            </p>
          </div>

          {/* Quick Vault Stats & Move All Action */}
          {items.length > 0 && (
            <div className="flex flex-wrap items-center gap-4">
              <div className="px-4 py-2.5 rounded-xl bg-white border border-black/10 shadow-sm text-xs font-mono">
                <span className="text-neutral-500">VAULT VALUE: </span>
                <span className="font-bold text-black font-mono">
                  {formatPrice(totalValue)}
                </span>
                <span className="text-neutral-400 text-[10px] ml-2">
                  ({items.length} {items.length === 1 ? "PIECE" : "PIECES"})
                </span>
              </div>

              <button
                type="button"
                onClick={handleMoveAllToBag}
                className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all shadow-md active:scale-95 inline-flex items-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>MOVE ALL TO BAG</span>
              </button>
            </div>
          )}
        </div>

        {/* Added to Bag Toast Notice */}
        {addedItemNotice && (
          <div className="mt-6 px-4 py-3 rounded-xl bg-black text-white text-xs font-mono flex items-center justify-between shadow-xl animate-fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>
                Moved <strong className="text-amber-300">{addedItemNotice}</strong> into your shopping bag.
              </span>
            </div>
            <button
              onClick={() => setCartOpen(true)}
              className="underline underline-offset-4 hover:text-amber-300 text-[11px] uppercase tracking-wider"
            >
              VIEW BAG ↵
            </button>
          </div>
        )}

        {/* Wishlist Items Grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mt-10">
            {items.map((item) => {
              const activeSize = selectedSizes[item.id] || "02";
              return (
                <article
                  key={item.id}
                  className="group relative flex flex-col bg-white rounded-2xl border border-black/10 hover:border-black/30 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#ECEAE3]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Top Tag Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-white font-mono text-[10px] tracking-widest uppercase">
                        {item.category || "LIMITED DROP"}
                      </span>
                    </div>

                    {/* Remove Button (Red Trash/Heart) */}
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      title="Remove from saved vault"
                      aria-label="Remove item"
                      className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 hover:bg-rose-50 text-neutral-600 hover:text-rose-600 flex items-center justify-center shadow-md transition-all active:scale-90 z-10 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Quick Explore Overlay Link */}
                    <Link
                      href="/shop"
                      className="absolute inset-0 z-0"
                      aria-label={`View details for ${item.name}`}
                    />
                  </div>

                  {/* Card Content & Action Area */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between bg-white">
                    <div>
                      <div className="flex items-baseline justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-mono tracking-wider text-neutral-500 uppercase">
                          ARCHIVAL EDITION
                        </span>
                        <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                          AVAILABLE TO MILL
                        </span>
                      </div>

                      <h2 className="font-sans font-bold text-lg text-black tracking-tight leading-snug group-hover:text-[#B34728] transition-colors">
                        <Link href="/shop">{item.name}</Link>
                      </h2>

                      {/* Pricing */}
                      <div className="flex items-baseline gap-2.5 mt-2">
                        <span className="text-xl font-bold font-mono text-black">
                          {formatPrice(item.priceINR)}
                        </span>
                        {item.originalPriceINR && (
                          <span className="text-xs font-mono text-neutral-400 line-through">
                            {formatPrice(item.originalPriceINR)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Streetwear Proportion / Size Selector */}
                    <div className="mt-5 pt-4 border-t border-black/10">
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-600 mb-2 uppercase">
                        <span>SELECT SIZE</span>
                        <span className="text-neutral-400">BOXY STREETWEAR CUT</span>
                      </div>

                      <div className="grid grid-cols-4 gap-2">
                        {["01", "02", "03", "04"].map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => handleSizeSelect(item.id, sz)}
                            className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all cursor-pointer ${
                              activeSize === sz
                                ? "bg-black text-white border-black shadow-sm"
                                : "bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-black/40"
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>

                      {/* Add to Bag Button */}
                      <button
                        type="button"
                        onClick={() => handleAddToCart(item)}
                        className="w-full mt-3 py-3 rounded-xl bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer group/btn"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 transition-transform group-hover/btn:scale-110" />
                        <span>MOVE TO BAG · SIZE {activeSize}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 sm:py-28 flex flex-col items-center justify-center text-center max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-inner mb-6">
              <Heart className="w-9 h-9 text-neutral-400 stroke-[1.5]" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-sans font-bold uppercase text-black tracking-tight mb-2">
              YOUR VAULT IS EMPTY
            </h2>
            <p className="font-bodoni-moda italic text-neutral-600 mb-8">
              You haven&apos;t saved any archival pieces yet. Explore the current drops and preserve your favorite fits.
            </p>

            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-full bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-lg active:scale-95 inline-flex items-center gap-2"
            >
              <span>EXPLORE ALL DROPS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Curated Recommendations Section */}
        <section className="mt-24 pt-16 border-t border-black/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
                RECOMMENDED FROM ATELIER
              </span>
              <h3 className="text-2xl sm:text-3xl font-sans font-bold uppercase text-black tracking-tight mt-1">
                COMPLEMENTARY ARCHIVAL DROPS
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono uppercase tracking-wider text-black hover:text-[#B34728] underline underline-offset-4 inline-flex items-center gap-1 font-semibold"
            >
              <span>VIEW FULL ATELIER CATALOG</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {EDITIONS.slice(0, 3).map((edition) => (
              <Link
                key={edition.id}
                href={`/shop/${edition.id}`}
                className="group block p-4 rounded-2xl bg-white/60 hover:bg-white border border-black/10 hover:border-black/30 shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#ECEAE3] mb-4">
                  <Image
                    src={edition.graphicUrl}
                    alt={edition.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/80 text-white font-mono text-[9px] uppercase tracking-wider">
                    {edition.subtitle}
                  </div>
                </div>
                <h4 className="font-sans font-bold text-base text-black group-hover:text-[#B34728] transition-colors">
                  {edition.name}
                </h4>
                <p className="text-xs font-mono text-neutral-500 mt-1">
                  {formatPrice(edition.priceINR)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <VoidFooter />
    </div>
  );
}
