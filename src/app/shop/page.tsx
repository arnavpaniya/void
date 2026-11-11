"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Heart,
  ShoppingBag,
  Star,
  Check,
  Flame,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";
import { DETAILED_PRODUCTS } from "@/lib/productData";
import { DetailedProduct } from "@/components/commerce/TShirtProductModal";
import { Header } from "@/components/commerce/Header";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { VoidFooter } from "@/components/commerce/VoidFooter";
import { EDITIONS, CartItem, WishlistItem } from "@/lib/types";

// Category definitions matching the reference image layout
interface CategoryCard {
  id: string;
  name: string;
  count: string;
  image: string;
  filterKey: string;
}

const CATEGORIES: CategoryCard[] = [
  {
    id: "cat-1",
    name: "Outerwear & Knits",
    count: "8 pieces",
    image: "/images/editorial_model.jpg",
    filterKey: "outerwear",
  },
  {
    id: "cat-2",
    name: "Archival Boxy Tees",
    count: "6 pieces",
    image: "/images/products/product_01_on_air.jpg",
    filterKey: "boxy",
  },
  {
    id: "cat-3",
    name: "Motorsport & Tech",
    count: "5 pieces",
    image: "/images/products/product_02_mazda_duo.jpg",
    filterKey: "motorsport",
  },
  {
    id: "cat-4",
    name: "Terracotta & Mineral",
    count: "4 pieces",
    image: "/images/products/product_06_dvc_sunset.jpg",
    filterKey: "terracotta",
  },
  {
    id: "cat-5",
    name: "Obsidian Monolith",
    count: "7 pieces",
    image: "/images/products/product_04_street_jutsu_urban.jpg",
    filterKey: "monolith",
  },
  {
    id: "cat-6",
    name: "Raw Bone Edition",
    count: "5 pieces",
    image: "/images/products/product_05_street_jutsu_white.jpg",
    filterKey: "bone",
  },
  {
    id: "cat-7",
    name: "Typographic Architecture",
    count: "6 pieces",
    image: "/images/products/product_08_liniker_duo.jpg",
    filterKey: "typography",
  },
  {
    id: "cat-8",
    name: "Vault Runway Pieces",
    count: "3 pieces",
    image: "/images/hero_runway_catwalk.jpg",
    filterKey: "vault",
  },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"trending" | "price-asc" | "price-desc" | "rating">("trending");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Cart & Drawer states
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "wish-01",
      name: "Edition 01 · Modernist 'On Air' Boxy Tee",
      priceINR: 2890,
      originalPriceINR: 3890,
      image: "/images/products/product_01_on_air.jpg",
      gsm: "300 GSM",
      category: "Heavyweight Tee",
      addedAt: "Just now",
    },
  ]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return DETAILED_PRODUCTS.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.story.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (selectedCategory === "all") return true;
      if (selectedCategory === "boxy") return product.name.toLowerCase().includes("boxy") || product.name.toLowerCase().includes("tee");
      if (selectedCategory === "motorsport") return product.name.toLowerCase().includes("mazda") || product.name.toLowerCase().includes("forceps");
      if (selectedCategory === "terracotta") return product.name.toLowerCase().includes("sunset") || product.name.toLowerCase().includes("dvc");
      if (selectedCategory === "outerwear") return product.priceINR >= 2950;
      if (selectedCategory === "monolith") return product.name.toLowerCase().includes("urban") || product.name.toLowerCase().includes("air");
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.priceINR - b.priceINR;
      if (sortBy === "price-desc") return b.priceINR - a.priceINR;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  const handleSelectSize = (productId: string, size: string) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product: DetailedProduct, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const size = selectedSizes[product.id] || "02 / M";
    const matchedEdition = EDITIONS[0];

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.edition.name === product.name && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.edition.name === product.name && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          edition: {
            ...matchedEdition,
            id: product.id,
            name: product.name,
            priceINR: product.priceINR,
            graphicUrl: product.images[0]?.src || "/images/products/product_01_on_air.jpg",
          },
          size,
          quantity: 1,
        },
      ];
    });

    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1500);
    setCartOpen(true);
  };

  const toggleWishlist = (product: DetailedProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const isWished = wishlist[product.id];
    setWishlist((prev) => ({ ...prev, [product.id]: !isWished }));

    if (!isWished) {
      setWishlistItems((prev) => [
        ...prev,
        {
          id: product.id,
          name: product.name,
          priceINR: product.priceINR,
          originalPriceINR: product.originalPriceINR,
          image: product.images[0]?.src || "/images/products/product_01_on_air.jpg",
          gsm: "300 GSM",
          category: "Heavyweight Tee",
          addedAt: "Just now",
        },
      ]);
    } else {
      setWishlistItems((prev) => prev.filter((item) => item.id !== product.id));
    }
  };

  const scrollToGrid = (catKey: string) => {
    setSelectedCategory(catKey);
    const element = document.getElementById("the-edits");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F0] text-[#111111] flex flex-col selection:bg-neutral-300 selection:text-black">
      {/* Universal Header with Navigation */}
      <Header
        activeEdition={EDITIONS[0]}
        editions={EDITIONS}
        onSelectEdition={() => {}}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        currency="INR"
        onToggleCurrency={() => {}}
        wishlistCount={wishlistItems.length}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full pt-28 sm:pt-36 pb-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* 1. HERO BREADCRUMB & MIXED TYPOGRAPHIC HEADER (Exact match to Reference Screenshot 1) */}
        <section className="mb-14 sm:mb-20">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-6"
          >
            <Link href="/" className="hover:text-black transition-colors">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-black font-semibold">Collections</span>
          </motion.div>

          {/* Heading & Subtitle Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-black/10">
            {/* Massive Mixed Typography Heading: Collect-ions */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl tracking-tight text-black leading-none">
                <span className="font-sans font-bold">Collect</span>
                <span className="font-editorial-serif italic font-normal">ions</span>
              </h1>
            </motion.div>

            {/* Right Side Editorial Copy & Filter Pills */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-md flex flex-col items-start lg:items-end text-left lg:text-right space-y-4"
            >
              <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                Every category and curated edit in one place. Pick a starting point — or let our stylists do the work.
              </p>

              {/* Quick Filter Pill Group */}
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-neutral-200/60 border border-black/5 shadow-inner">
                {[
                  { label: "Everyone", key: "all" },
                  { label: "Heavyweight Boxy", key: "boxy" },
                  { label: "Motorsport", key: "motorsport" },
                ].map((pill) => (
                  <button
                    key={pill.key}
                    onClick={() => scrollToGrid(pill.key)}
                    className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                      selectedCategory === pill.key
                        ? "bg-black text-white font-bold shadow-sm"
                        : "text-neutral-600 hover:text-black hover:bg-white/40"
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. "SHOP BY CATEGORY" SECTION (Exact match to Reference Screenshot 1) */}
        <section className="mb-24 sm:mb-32">
          <div className="flex items-center justify-between mb-8 sm:mb-10">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl text-black font-sans"
            >
              <span className="font-bold">Shop by </span>
              <span className="font-editorial-serif italic font-normal">category</span>
            </motion.h2>

            <button
              onClick={() => scrollToGrid("all")}
              className="text-xs font-mono underline underline-offset-4 text-neutral-600 hover:text-black transition-colors"
            >
              View everything
            </button>
          </div>

          {/* 4-Column Responsive Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: (idx % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => scrollToGrid(category.filterKey)}
                className="group cursor-pointer rounded-3xl bg-white border border-black/5 overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col justify-between"
              >
                {/* Visual Image Container with Hover Scale */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
                </div>

                {/* Bottom Bar: Title, Count & Action Circle */}
                <div className="p-4 sm:p-5 flex items-center justify-between gap-2 bg-white">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-black font-sans group-hover:text-neutral-700 transition-colors">
                      {category.name}
                    </h3>
                    <span className="text-[10px] sm:text-xs font-mono text-neutral-400 block mt-0.5">
                      {category.count}
                    </span>
                  </div>

                  {/* Circle Action Button with Diagonal Arrow */}
                  <div className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center shrink-0 bg-neutral-50 group-hover:bg-black group-hover:text-white transition-all duration-300 group-hover:border-black">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3. "THE EDITS" CURATED SECTION (Exact match to Reference Screenshots 2 & 3) */}
        <section id="the-edits" className="mb-24 sm:mb-32 space-y-20 sm:space-y-28">
          <div className="border-b border-black/10 pb-6">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-neutral-400 block mb-2">
              CURATED BY THE STUDIO
            </span>
            <h2 className="text-3xl sm:text-4xl text-black">
              <span className="font-sans font-bold">The </span>
              <span className="font-editorial-serif italic font-normal">edits</span>
            </h2>
          </div>

          {/* EDIT 01: The Trench / Modernist Edit (Image Left, Content Right) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
          >
            {/* Image on Left (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 shadow-xl border border-black/5 group">
                <Image
                  src="/images/editorial_model.jpg"
                  alt="The Modernist Edit"
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>

            {/* Content on Right (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-editorial-serif italic text-3xl sm:text-4xl text-neutral-400 block">
                01
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                OUTERWEAR & DRAPE
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-black font-sans">
                The Trench <span className="font-editorial-serif italic font-normal">Edit</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                Brushed wool, cotton gabardine and soft tailoring — the coats that carry you from monsoon to winter.
              </p>

              {/* Mini Product List Widget (3 Items) */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    name: "Sage Wool Trench",
                    price: "₹12,990",
                    image: "/images/products/product_01_on_air.jpg",
                  },
                  {
                    name: "Tailored Mac Coat",
                    price: "₹13,490",
                    originalPrice: "₹15,990",
                    image: "/images/products/product_04_street_jutsu_urban.jpg",
                  },
                  {
                    name: "Oversized Studio Blazer",
                    price: "₹9,490",
                    image: "/images/products/product_08_liniker_duo.jpg",
                  },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={`/shop/${DETAILED_PRODUCTS[i]?.id || "prod-01"}`}
                    className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-neutral-100/80 transition-colors cursor-pointer group/item border border-transparent hover:border-black/5"
                  >
                    <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover/item:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-black truncate group-hover/item:underline underline-offset-2">
                        {item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-mono font-bold text-neutral-800">
                          {item.price}
                        </span>
                        {item.originalPrice && (
                          <span className="text-[10px] font-mono text-neutral-400 line-through">
                            {item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => scrollToGrid("outerwear")}
                  className="px-6 py-3 rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-mono uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Shop the edit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* EDIT 02: The Knit Shop (Content Left, Image Right - Alternating!) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
          >
            {/* Content on Left (5 cols) */}
            <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
              <span className="font-editorial-serif italic text-3xl sm:text-4xl text-neutral-400 block">
                02
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                KNITWEAR & MILL SPECS
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-black font-sans">
                The Knit <span className="font-editorial-serif italic font-normal">Shop</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                Alpaca crews, merino rollnecks and chunky cables. Featherlight warmth with a lived-in hand.
              </p>

              {/* Mini Product List Widget (3 Items) */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    name: "Cloud Knit Crew",
                    price: "₹5,490",
                    image: "/images/products/product_02_mazda_duo.jpg",
                  },
                  {
                    name: "Merino Turtleneck",
                    price: "₹4,290",
                    image: "/images/products/product_03_forceps_neon.jpg",
                  },
                  {
                    name: "Ivory Cable Sweater",
                    price: "₹6,290",
                    image: "/images/products/product_07_rooster_art_tee.jpg",
                  },
                ].map((item, i) => (
                  <Link
                    key={i}
                    href={`/shop/${DETAILED_PRODUCTS[i + 1]?.id || "prod-02"}`}
                    className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-neutral-100/80 transition-colors cursor-pointer group/item border border-transparent hover:border-black/5"
                  >
                    <div className="relative w-12 h-14 rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover group-hover/item:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-black truncate group-hover/item:underline underline-offset-2">
                        {item.name}
                      </h4>
                      <span className="text-xs font-mono font-bold text-neutral-800 mt-0.5 block">
                        {item.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => scrollToGrid("boxy")}
                  className="px-6 py-3 rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-mono uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Shop the edit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => scrollToGrid("boxy")}
                  className="px-5 py-3 rounded-full bg-neutral-200/80 hover:bg-neutral-300 text-black text-xs font-mono uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                >
                  View
                </button>
              </div>
            </div>

            {/* Image on Right (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 shadow-xl border border-black/5 group">
                <Image
                  src="/images/products/product_02_mazda_duo.jpg"
                  alt="The Knit Shop"
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>
          </motion.div>

          {/* EDIT 03: Denim Reworked (Image Left, Content Right) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center"
          >
            {/* Image on Left (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-100 shadow-xl border border-black/5 group">
                <Image
                  src="/images/products/product_06_dvc_sunset.jpg"
                  alt="Denim Reworked"
                  fill
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>

            {/* Content on Right (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-editorial-serif italic text-3xl sm:text-4xl text-neutral-400 block">
                03
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                DENIM & MINERAL DYES
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-black font-sans">
                Denim, <span className="font-editorial-serif italic font-normal">reworked</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                Wide-leg raw selvedge, carpenter details and natural indigo washes tailored for everyday structural wear.
              </p>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => scrollToGrid("terracotta")}
                  className="px-6 py-3 rounded-full bg-black text-white hover:bg-neutral-800 text-xs font-mono uppercase tracking-wider transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Shop the edit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 4. DUAL FULL-BLEED EDITORIAL BANNERS (Exact match to Reference Screenshot 4) */}
        <section className="mb-24 sm:mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Left Card: Soft tailoring, easy knits */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-900 shadow-xl group cursor-pointer"
              onClick={() => scrollToGrid("boxy")}
            >
              <Image
                src="/images/editorial_model.jpg"
                alt="Women's Soft Tailoring"
                fill
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-white space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/70 block">
                  WOMEN
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight">
                  Soft tailoring, <span className="font-editorial-serif italic font-normal">easy knits</span>
                </h3>
                <div>
                  <button className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono font-bold hover:bg-neutral-100 transition-all shadow-md active:scale-95 cursor-pointer">
                    Shop women
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Right Card: Denim, coats & the perfect tee */}
            <motion.div
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-neutral-900 shadow-xl group cursor-pointer"
              onClick={() => scrollToGrid("boxy")}
            >
              <Image
                src="/images/hero_runway_catwalk.jpg"
                alt="Men's Denim & Coats"
                fill
                className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105 brightness-[0.88]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

              <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10 text-white space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/70 block">
                  MEN
                </span>
                <h3 className="text-2xl sm:text-4xl font-bold font-sans tracking-tight">
                  Denim, coats & the <span className="font-editorial-serif italic font-normal">perfect tee</span>
                </h3>
                <div>
                  <button className="px-5 py-2.5 rounded-full bg-white text-black text-xs font-mono font-bold hover:bg-neutral-100 transition-all shadow-md active:scale-95 cursor-pointer">
                    Shop men
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Cart & Wishlist Drawers */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency="INR"
        onUpdateQuantity={(index, newQty) => {
          if (newQty <= 0) {
            setCartItems((prev) => prev.filter((_, i) => i !== index));
          } else {
            setCartItems((prev) => {
              const copy = [...prev];
              copy[index].quantity = newQty;
              return copy;
            });
          }
        }}
        onUpdateSize={(index, newSize) => {
          setCartItems((prev) => {
            const copy = [...prev];
            copy[index].size = newSize;
            return copy;
          });
        }}
        onRemoveItem={(index) => {
          setCartItems((prev) => prev.filter((_, i) => i !== index));
        }}
      />

      {/* Clean Bone Footer */}
      <VoidFooter preset="bone" />
    </div>
  );
}
