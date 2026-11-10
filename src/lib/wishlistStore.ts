"use client";

import { WishlistItem } from "./types";

const WISHLIST_STORAGE_KEY = "void_wishlist_items";

export const DEFAULT_WISHLIST: WishlistItem[] = [
  {
    id: "wish-01",
    name: "Edition 01 · Modernist Blueprint Boxy Tee",
    priceINR: 2890,
    originalPriceINR: 3890,
    image: "/images/products/product_01_on_air.jpg",
    gsm: "Heavyweight Knit",
    category: "Modernist Blueprint",
    addedAt: "2026-11-10",
  },
  {
    id: "wish-02",
    name: "Edition 02 · Terracotta Surya Oversized Tee",
    priceINR: 3190,
    originalPriceINR: 4290,
    image: "/images/products/product_02_twin.jpg",
    gsm: "Sun-Drenched Heavyweight",
    category: "Terracotta Surya",
    addedAt: "2026-11-09",
  },
  {
    id: "wish-03",
    name: "Edition 03 · Obsidian Monolith Heavyweight Tee",
    priceINR: 2990,
    originalPriceINR: 3990,
    image: "/images/products/product_03_studio.jpg",
    gsm: "Heavyweight Obsidian",
    category: "Obsidian Monolith",
    addedAt: "2026-11-08",
  },
];

export function getStoredWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return DEFAULT_WISHLIST;
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(DEFAULT_WISHLIST));
      return DEFAULT_WISHLIST;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : DEFAULT_WISHLIST;
  } catch {
    return DEFAULT_WISHLIST;
  }
}

export function saveWishlist(items: WishlistItem[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("void-wishlist-updated"));
  } catch {
    // Storage fallback
  }
}

export function addToWishlist(item: WishlistItem) {
  const current = getStoredWishlist();
  if (current.some((i) => i.id === item.id)) return;
  const updated = [item, ...current];
  saveWishlist(updated);
}

export function removeFromWishlist(id: string) {
  const current = getStoredWishlist();
  const updated = current.filter((i) => i.id !== id);
  saveWishlist(updated);
}

export function isItemInWishlist(id: string): boolean {
  const current = getStoredWishlist();
  return current.some((i) => i.id === id);
}

export function toggleWishlistItem(item: WishlistItem): boolean {
  const current = getStoredWishlist();
  const exists = current.some((i) => i.id === item.id);
  if (exists) {
    removeFromWishlist(item.id);
    return false;
  } else {
    addToWishlist(item);
    return true;
  }
}
