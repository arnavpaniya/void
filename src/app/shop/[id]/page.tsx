"use client";

import React, { useState, use, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Search,
  User,
  Menu,
  X,
  Star,
  Check,
  Ruler,
  Truck,
  RotateCcw,
  Plus,
  Minus,
  Copy,
  ChevronRight,
  ShieldCheck,
  Tag,
} from "lucide-react";
import { DETAILED_PRODUCTS } from "@/lib/productData";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { SizeGuideDrawer } from "@/components/commerce/SizeGuideDrawer";
import { VoidFooter } from "@/components/commerce/VoidFooter";
import { EDITIONS, CartItem, WishlistItem } from "@/lib/types";
import {
  toggleWishlistItem,
  isItemInWishlist,
  getStoredWishlist,
} from "@/lib/wishlistStore";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function SnitchStyleProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product =
    DETAILED_PRODUCTS.find((p) => p.id === id) || DETAILED_PRODUCTS[0];

  // Image & Selection States
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || "Obsidian Black"
  );
  const [selectedSize, setSelectedSize] = useState<string | null>("M");
  const [isWished, setIsWished] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Accordion Toggles (Delivery open by default as in reference Image 2)
  const [deliveryOpen, setDeliveryOpen] = useState(true);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const [returnsOpen, setReturnsOpen] = useState(false);

  // Pincode Delivery Check
  const [pincode, setPincode] = useState("");
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Promo Code Copied State
  const [codeCopied, setCodeCopied] = useState(false);

  // Cart & Wishlist Global Sync
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Sync Wishlist with localStorage
  useEffect(() => {
    setIsWished(isItemInWishlist(product.id));
    setWishlistCount(getStoredWishlist().length);

    const handleSync = () => {
      setIsWished(isItemInWishlist(product.id));
      setWishlistCount(getStoredWishlist().length);
    };

    window.addEventListener("void-wishlist-updated", handleSync);
    return () => window.removeEventListener("void-wishlist-updated", handleSync);
  }, [product.id]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("VOID10");
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2500);
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincode.trim() || pincode.length !== 6 || isNaN(Number(pincode))) {
      setPincodeStatus("error");
      return;
    }
    setPincodeStatus("success");
  };

  const handleToggleWishlist = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    toggleWishlistItem({
      id: product.id,
      name: product.name,
      priceINR: product.priceINR,
      originalPriceINR: product.originalPriceINR,
      image: product.images[0]?.src || "/images/products/product_01_on_air.jpg",
      gsm: "300 GSM Heavyweight",
      category: product.subtitle || "Oversized T-Shirt",
      addedAt: new Date().toISOString().split("T")[0],
    });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to bag");
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.edition.id === product.id && item.size === selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item.edition.id === product.id && item.size === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          edition: {
            ...EDITIONS[0],
            id: product.id,
            name: product.name,
            priceINR: product.priceINR,
            graphicUrl:
              product.images[0]?.src || "/images/products/product_01_on_air.jpg",
          },
          size: selectedSize,
          quantity: 1,
        },
      ];
    });

    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
    setCartOpen(true);
  };

  // Standard Snitch Sizing Array
  const AVAILABLE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

  // Related products for "YOU MAY ALSO LIKE" grid
  const relatedProducts = DETAILED_PRODUCTS.filter((p) => p.id !== product.id);

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-neutral-200 selection:text-black">
      {/* 1. TOP MINIMALIST HEADER (Matching Snitch Brand Header in Reference) */}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left: Mobile Menu Trigger */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Toggle navigation menu"
              className="p-2 text-neutral-800 hover:text-black cursor-pointer"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Center: Bold Brand Logo */}
          <Link
            href="/"
            className="font-sans font-black text-2xl sm:text-3xl tracking-[0.2em] uppercase text-black hover:opacity-85 transition-opacity"
          >
            VOID
          </Link>

          {/* Right: Functional Action Icons */}
          <div className="flex items-center gap-3 sm:gap-5 text-neutral-800">
            <Link
              href="/shop"
              aria-label="Search Catalog"
              className="p-1.5 hover:text-black transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setCartOpen(true)}
              aria-label="Shopping Bag"
              className="relative p-1.5 hover:text-black transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white text-[9px] font-bold font-mono flex items-center justify-center">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>

            <Link
              href="/wishlist"
              aria-label="Wishlist Vault"
              className="relative p-1.5 hover:text-black transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${
                  wishlistCount > 0 ? "fill-rose-500 text-rose-500" : ""
                }`}
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold font-mono flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              href="/account"
              aria-label="Client Account"
              className="p-1.5 hover:text-black transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Slide-over Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full p-6 flex flex-col justify-between shadow-2xl z-10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
                <span className="font-sans font-black text-xl tracking-widest uppercase">
                  VOID ATELIER
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full hover:bg-neutral-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 pt-6 text-sm font-sans font-semibold uppercase tracking-wider">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#B34728] transition-colors"
                >
                  Home Showcase
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#B34728] transition-colors"
                >
                  Shop All T-Shirts
                </Link>
                <Link
                  href="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#B34728] transition-colors flex items-center justify-between"
                >
                  <span>Saved Pieces</span>
                  <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-xs">
                    {wishlistCount}
                  </span>
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#B34728] transition-colors"
                >
                  My Account & Orders
                </Link>
                <Link
                  href="/legal/care-guide"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 hover:text-[#B34728] transition-colors"
                >
                  Care & Mill Specifications
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-neutral-200 text-xs text-neutral-500 font-mono">
              © 2026 VOID ATELIER PVT LTD. BOMBAY.
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN 2-COLUMN PDP LAYOUT (Matching Reference Images 1 & 2) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* ================= LEFT COLUMN: PRODUCT IMAGERY GALLERY (7 COLS) ================= */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Look Photo (Image 1 style) */}
            <div className="relative aspect-[3/4] w-full bg-[#F6F5F2] rounded-lg overflow-hidden">
              <Image
                src={product.images[0]?.src || "/images/products/product_01_on_air.jpg"}
                alt={product.name}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              {/* Floating Wishlist Heart Icon (Top Right on Image as in Reference 1) */}
              <button
                type="button"
                onClick={handleToggleWishlist}
                title="Save to Wishlist"
                aria-label="Save to Wishlist"
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-neutral-800 hover:text-black flex items-center justify-center shadow-sm transition-all active:scale-90 cursor-pointer"
              >
                <Heart
                  className={`w-5 h-5 transition-transform ${
                    isWished ? "fill-rose-500 text-rose-500" : "hover:scale-110"
                  }`}
                />
              </button>
            </div>

            {/* Detailed Shots Grid (Image 2 style: Texture close-up, collar, hem) */}
            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[4/5] bg-[#F6F5F2] rounded-lg overflow-hidden"
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover object-center hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 30vw"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[9px] uppercase tracking-wider">
                    {img.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Full Presentation Photo if available */}
            {product.images[3] && (
              <div className="relative aspect-[16/10] bg-[#F6F5F2] rounded-lg overflow-hidden">
                <Image
                  src={product.images[3].src}
                  alt={product.images[3].label}
                  fill
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[9px] uppercase tracking-wider">
                  {product.images[3].label}
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT COLUMN: STICKY PURCHASING DETAILS (5 COLS) ================= */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              
              {/* Product Title & Category */}
              <div>
                <h1 className="text-xl sm:text-2xl font-sans font-medium text-neutral-900 tracking-tight leading-snug">
                  {product.name}
                </h1>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">
                  100% Combed Cotton Oversized T-Shirt
                </p>
              </div>

              {/* Price Block */}
              <div className="space-y-0.5">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-bold font-sans text-neutral-950">
                    ₹{product.priceINR.toLocaleString("en-IN")}
                  </span>
                  {product.originalPriceINR && (
                    <span className="text-sm text-neutral-400 line-through font-medium">
                      ₹{product.originalPriceINR.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-neutral-500 font-sans">
                  *MRP Inclusive of all taxes
                </div>
              </div>

              {/* Ratings and Reviews Pill */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center gap-1 bg-neutral-950 text-white px-2 py-0.5 rounded font-bold font-mono text-[11px]">
                  <span>{product.rating}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <span className="text-neutral-600 font-medium">
                  <strong>70</strong> Ratings and <strong>22</strong> Reviews
                </span>
              </div>

              {/* Promotional Offer / Coupon Card (Blush peach box matching Reference 1) */}
              <div className="p-3.5 rounded-lg bg-[#FAF0EB] border border-[#F5DDD0] flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#E88065] text-white text-[11px] font-mono font-bold tracking-wider hover:bg-[#D46B50] transition-colors cursor-pointer"
                  >
                    <span>SHOP10</span>
                    <Copy className="w-3 h-3" />
                  </button>
                  {codeCopied && (
                    <span className="text-[11px] text-emerald-700 font-medium font-mono">
                      ✓ Code Copied!
                    </span>
                  )}
                </div>
                <p className="text-xs text-neutral-700 font-sans">
                  Enjoy 10% off on your next order above ₹3999
                </p>
              </div>

              {/* Selected Color & Colorway Thumbnails */}
              <div className="space-y-2.5 pt-1">
                <div className="text-xs font-sans text-neutral-800">
                  <span className="text-neutral-500">Selected Color</span> ·{" "}
                  <strong className="text-neutral-900">{selectedColor}</strong>
                </div>

                {/* Clickable mini photo cards of other color options */}
                <div className="flex items-center gap-3">
                  {product.colors.map((color, idx) => {
                    const isSelected = selectedColor === color.name;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color.name)}
                        className={`relative w-14 h-18 rounded border-2 overflow-hidden transition-all cursor-pointer ${
                          isSelected
                            ? "border-black shadow-sm ring-1 ring-black"
                            : "border-neutral-200 hover:border-neutral-400 opacity-80 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={
                            product.images[idx % product.images.length]?.src ||
                            product.images[0].src
                          }
                          alt={color.name}
                          fill
                          className="object-cover object-top"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizing Recommendation & Size Guide Link */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#B34728] font-medium">
                    <Ruler className="w-3.5 h-3.5" />
                    <span>We recommend one size smaller</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    className="font-bold text-neutral-900 hover:text-black underline underline-offset-4 tracking-wider text-[11px] uppercase cursor-pointer"
                  >
                    SIZE GUIDE
                  </button>
                </div>

                {/* Size Selector Grid (Bordered Rectangle Pills) */}
                <div className="grid grid-cols-6 gap-2">
                  {AVAILABLE_SIZES.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSize(sz)}
                        className={`py-3 text-xs font-sans font-bold border rounded transition-all cursor-pointer ${
                          isSelected
                            ? "bg-black text-white border-black shadow-sm"
                            : "bg-white text-neutral-800 border-neutral-300 hover:border-black"
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Free Delivery Promise Banner (Soft blush peach container) */}
              <div className="py-2.5 px-4 rounded bg-[#FAF2ED] text-center text-xs font-sans font-medium text-neutral-800">
                FREE 1-2 day delivery on 5k+ pincodes
              </div>

              {/* Primary ADD Button (Solid Black Rectangular Button) */}
              <div>
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded bg-black hover:bg-neutral-900 text-white font-sans text-sm font-bold uppercase tracking-widest transition-all active:scale-98 cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD +</span>
                </button>

                {addedNotice && (
                  <div className="mt-2 text-center text-xs font-mono text-emerald-700 font-bold">
                    ✓ Added to bag successfully!
                  </div>
                )}
              </div>

              {/* ================= ACCORDION MODULES (Reference Image 2) ================= */}
              <div className="pt-2 divide-y divide-neutral-200 border-t border-neutral-200">
                
                {/* 1. DELIVERY ACCORDION */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between text-xs font-bold font-sans uppercase tracking-wider text-neutral-900 cursor-pointer"
                  >
                    <span>DELIVERY</span>
                    <span>{deliveryOpen ? "—" : "+"}</span>
                  </button>

                  {deliveryOpen && (
                    <div className="mt-3.5 space-y-3">
                      <form
                        onSubmit={handleCheckPincode}
                        className="relative flex items-center border border-neutral-300 rounded overflow-hidden"
                      >
                        <input
                          type="text"
                          maxLength={6}
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          placeholder="Enter Pincode"
                          className="w-full py-2.5 px-3 text-xs font-sans text-neutral-900 placeholder:text-neutral-400 focus:outline-none"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2.5 text-xs font-bold font-sans text-[#E88065] hover:text-[#C55D42] tracking-wider uppercase cursor-pointer"
                        >
                          CHECK
                        </button>
                      </form>

                      {pincodeStatus === "success" && (
                        <div className="p-3 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                          ✓ Delivery available at <strong>{pincode}</strong> via BlueDart Air Express. Expected in 2 business days.
                        </div>
                      )}

                      {pincodeStatus === "error" && (
                        <div className="p-3 rounded bg-rose-50 border border-rose-200 text-xs text-rose-700">
                          Please enter a valid 6-digit Indian postal code.
                        </div>
                      )}

                      {!pincodeStatus && (
                        <div className="p-2.5 rounded bg-[#FDECE7] text-neutral-700 text-xs font-sans text-center">
                          Please select your size to check delivery date
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 2. DESCRIPTION & FIT ACCORDION */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => setDescriptionOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between text-xs font-bold font-sans uppercase tracking-wider text-neutral-900 cursor-pointer"
                  >
                    <span>DESCRIPTION & FIT</span>
                    <span>{descriptionOpen ? "—" : "+"}</span>
                  </button>

                  {descriptionOpen && (
                    <div className="mt-3 space-y-2.5 text-xs text-neutral-700 font-sans leading-relaxed">
                      <p>{product.story}</p>
                      <div className="pt-2 grid grid-cols-2 gap-2 text-neutral-600 font-mono text-[11px]">
                        <div><strong>FIT:</strong> Oversized Boxy Drop</div>
                        <div><strong>FABRIC:</strong> 100% Combed Cotton</div>
                        <div><strong>WEIGHT:</strong> 300 GSM Heavyweight</div>
                        <div><strong>NECK:</strong> 1.25&quot; Bound Rib Collar</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. REVIEWS ACCORDION */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => setReviewsOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between text-xs font-bold font-sans uppercase tracking-wider text-neutral-900 cursor-pointer"
                  >
                    <span>REVIEWS ({product.reviewCount})</span>
                    <span>{reviewsOpen ? "—" : "+"}</span>
                  </button>

                  {reviewsOpen && (
                    <div className="mt-3 space-y-3">
                      {product.reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="p-3 rounded bg-neutral-50 border border-neutral-200 space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-neutral-900">
                              {rev.author} · {rev.location}
                            </span>
                            <div className="flex text-amber-500">
                              {[...Array(rev.rating)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-amber-500" />
                              ))}
                            </div>
                          </div>
                          <p className="text-neutral-600 italic">
                            &ldquo;{rev.comment}&rdquo;
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 4. RETURNS ACCORDION */}
                <div className="py-4">
                  <button
                    type="button"
                    onClick={() => setReturnsOpen((prev) => !prev)}
                    className="w-full flex items-center justify-between text-xs font-bold font-sans uppercase tracking-wider text-neutral-900 cursor-pointer"
                  >
                    <span>RETURNS</span>
                    <span>{returnsOpen ? "—" : "+"}</span>
                  </button>

                  {returnsOpen && (
                    <div className="mt-3 text-xs text-neutral-700 font-sans leading-relaxed space-y-2">
                      <p>
                        Enjoy a <strong>7-Day Doorstep Exchange & Return</strong> window on all unworn pieces with tags attached.
                      </p>
                      <p className="text-neutral-500 text-[11px]">
                        Reverse pick-up is arranged automatically via our courier partners once initiated through your account.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              {/* NOTE: AI assistant (Ask Sid) is completely omitted per explicit user instruction */}
            </div>
          </div>
        </div>

        {/* ================= 3. YOU MAY ALSO LIKE SECTION (Reference Image 3) ================= */}
        <section className="mt-20 pt-12 border-t border-neutral-200">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold font-sans uppercase tracking-wider text-neutral-950">
              YOU MAY ALSO LIKE
            </h2>
          </div>

          {/* 5-Column High-Density Product Grid matching Snitch catalog */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {relatedProducts.slice(0, 5).map((item) => {
              const itemWished = isItemInWishlist(item.id);
              const discount = item.originalPriceINR
                ? Math.round(
                    ((item.originalPriceINR - item.priceINR) /
                      item.originalPriceINR) *
                      100
                  )
                : null;

              return (
                <div
                  key={item.id}
                  className="group flex flex-col bg-white rounded overflow-hidden"
                >
                  {/* Product Thumbnail with Hover & Wishlist */}
                  <div className="relative aspect-[3/4] w-full bg-[#F5F4F0] overflow-hidden">
                    <Link href={`/shop/${item.id}`} className="absolute inset-0">
                      <Image
                        src={
                          item.images[0]?.src ||
                          "/images/products/product_01_on_air.jpg"
                        }
                        alt={item.name}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      />
                    </Link>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlistItem({
                          id: item.id,
                          name: item.name,
                          priceINR: item.priceINR,
                          originalPriceINR: item.originalPriceINR,
                          image:
                            item.images[0]?.src ||
                            "/images/products/product_01_on_air.jpg",
                          gsm: "300 GSM Heavyweight",
                          category: item.subtitle,
                          addedAt: new Date().toISOString().split("T")[0],
                        });
                      }}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-700 flex items-center justify-center shadow-sm z-10 cursor-pointer"
                      title="Save piece"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          itemWished ? "fill-rose-500 text-rose-500" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {/* Card Details */}
                  <div className="pt-2.5 pb-2 flex flex-col space-y-1">
                    <h3 className="text-xs font-sans text-neutral-800 line-clamp-1 group-hover:text-black">
                      <Link href={`/shop/${item.id}`}>{item.name}</Link>
                    </h3>

                    {/* Pricing with Strikethrough & Discount */}
                    <div className="flex items-baseline gap-1.5 text-xs font-sans">
                      <strong className="text-neutral-950 font-bold">
                        ₹{item.priceINR.toLocaleString("en-IN")}
                      </strong>
                      {item.originalPriceINR && (
                        <span className="text-[11px] text-neutral-400 line-through">
                          ₹{item.originalPriceINR.toLocaleString("en-IN")}
                        </span>
                      )}
                      {discount && (
                        <span className="text-[10px] text-[#E88065] font-bold">
                          {discount}% off
                        </span>
                      )}
                    </div>

                    {/* Color Swatch Dots */}
                    <div className="flex items-center gap-1 pt-1">
                      {item.colors.slice(0, 3).map((col) => (
                        <span
                          key={col.name}
                          className="w-2.5 h-2.5 rounded-full border border-neutral-300"
                          style={{ backgroundColor: col.hex }}
                          title={col.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* SIZE GUIDE SLIDE-OVER DRAWER (Matches exact Snitch reference layout) */}
      <SizeGuideDrawer
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency="INR"
        onUpdateQuantity={(index, newQty) => {
          setCartItems((prev) => {
            const copy = [...prev];
            if (newQty <= 0) copy.splice(index, 1);
            else copy[index] = { ...copy[index], quantity: newQty };
            return copy;
          });
        }}
        onRemoveItem={(index) => {
          setCartItems((prev) => prev.filter((_, i) => i !== index));
        }}
      />

      {/* Footer */}
      <VoidFooter preset="bone" />
    </div>
  );
}
