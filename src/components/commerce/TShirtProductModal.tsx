"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Star,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageSquare,
  ThumbsUp,
  Share2,
  Maximize2,
  Info,
} from "lucide-react";
import { Edition } from "@/lib/types";

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  fitVerdict: "True to size" | "Boxy / Relaxed" | "Slightly oversized";
  helpfulCount: number;
}

export interface DetailedProduct {
  id: string;
  name: string;
  subtitle: string;
  devanagariName: string;
  priceINR: number;
  originalPriceINR: number;
  rating: number;
  reviewCount: number;
  images: {
    src: string;
    label: string;
  }[];
  colors: {
    name: string;
    hex: string;
    badge: string;
  }[];
  sizes: {
    id: string;
    label: string;
    chest: string;
    length: string;
    stock: "in_stock" | "low_stock";
  }[];
  fabricSpecs: {
    weight: string;
    knit: string;
    yarn: string;
    collar: string;
    origin: string;
  };
  story: string;
  careInstructions: string[];
  reviews: ReviewItem[];
  similarProducts: {
    id: string;
    name: string;
    priceINR: number;
    image: string;
    gsm: string;
  }[];
}

interface TShirtProductModalProps {
  product: DetailedProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: DetailedProduct, size: string, color: string, quantity: number) => void;
  onSelectSimilar?: (productId: string) => void;
}

export function TShirtProductModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onSelectSimilar,
}: TShirtProductModalProps) {
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedSizeId, setSelectedSizeId] = useState("02");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"details" | "care" | "reviews">("details");

  // Reviews state & new review form
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newAuthor, setNewAuthor] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newFit, setNewFit] = useState<"True to size" | "Boxy / Relaxed" | "Slightly oversized">("Boxy / Relaxed");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [addedToCartSuccess, setAddedToCartSuccess] = useState(false);

  // Synchronize initial reviews when product changes
  React.useEffect(() => {
    if (product) {
      setReviewsList(product.reviews);
      setSelectedImageIdx(0);
      setSelectedColorIdx(0);
      setSelectedSizeId("02");
      setQuantity(1);
      setShowReviewForm(false);
      setReviewSubmitted(false);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const selectedSize = product.sizes.find((s) => s.id === selectedSizeId) || product.sizes[0];
  const selectedColor = product.colors[selectedColorIdx] || product.colors[0];

  const handleQuantityDelta = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedSize.label, selectedColor.name, quantity);
    setAddedToCartSuccess(true);
    setTimeout(() => setAddedToCartSuccess(false), 2000);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      location: "Verified Atelier Client",
      rating: newRating,
      date: "Just now",
      title: newTitle.trim() || "Heavyweight Tirupur Quality",
      comment: newComment.trim(),
      verified: true,
      fitVerdict: newFit,
      helpfulCount: 0,
    };

    setReviewsList([newReview, ...reviewsList]);
    setReviewSubmitted(true);
    setShowReviewForm(false);
    setNewAuthor("");
    setNewTitle("");
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl my-auto rounded-2xl bg-[#0F0F12] border border-white/10 shadow-2xl text-neutral-100 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-neutral-950/80 border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-[11px] font-bold border border-blue-500/30">
              ATELIER EDITION
            </span>
            <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
              TIRUPUR COMBED COTTON SINGLE JERSEY
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Left Column: Multi-Angle Image Gallery (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Main Featured Image Container */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-neutral-900 border border-white/10 shadow-lg group">
                <Image
                  src={product.images[selectedImageIdx]?.src || product.images[0].src}
                  alt={product.images[selectedImageIdx]?.label || product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[10px] font-mono text-neutral-300 border border-white/10">
                  {product.images[selectedImageIdx]?.label || "Featured View"}
                </div>
              </div>

              {/* Thumbnails Row / Placeholders for different angles */}
              <div className="grid grid-cols-4 gap-2.5">
                {product.images.map((img, idx) => {
                  const isSelected = idx === selectedImageIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIdx(idx)}
                      className={`relative aspect-[3/4] rounded-lg overflow-hidden border transition-all ${
                        isSelected
                          ? "border-blue-500 ring-2 ring-blue-500/50 scale-102"
                          : "border-white/10 hover:border-white/30 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image src={img.src} alt={img.label} fill className="object-cover" />
                      <div className="absolute inset-x-0 bottom-0 py-0.5 bg-black/70 text-[9px] font-mono text-center text-neutral-300 truncate px-1">
                        {img.label.split(" ")[0]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Specifications, Selectors & Purchasing Actions (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              {/* Product Title, Rating & Pricing */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span className="uppercase tracking-widest">{product.subtitle}</span>
                  <span className="text-neutral-400 font-serif italic text-sm">
                    {product.devanagariName}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-sans">
                  {product.name}
                </h1>

                {/* Star Ratings Summary */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                    ))}
                  </div>
                  <span className="text-xs font-mono font-bold text-white">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-xs font-mono text-neutral-500">
                    ({reviewsList.length} verified reviews)
                  </span>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-white">
                    ₹{product.priceINR.toLocaleString()}
                  </span>
                  {product.originalPriceINR > product.priceINR && (
                    <span className="text-sm font-mono text-neutral-500 line-through">
                      ₹{product.originalPriceINR.toLocaleString()}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono text-[10px] border border-emerald-500/20">
                    SAVE ₹{(product.originalPriceINR - product.priceINR).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Story / Architecture Summary */}
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                {product.story}
              </p>

              {/* Colour Options Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>SELECT FINISH / COLOR</span>
                  <span className="text-white font-medium">{selectedColor.name}</span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color, idx) => {
                    const isSelected = idx === selectedColorIdx;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColorIdx(idx)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                          isSelected
                            ? "bg-white/10 border-blue-500 text-white ring-1 ring-blue-500/50"
                            : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 flex-shrink-0"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span>{color.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>SELECT STREETWEAR PROPORTION</span>
                  <span className="text-neutral-400 text-[11px]">
                    Chest {selectedSize.chest} · Length {selectedSize.length}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = size.id === selectedSizeId;
                    return (
                      <button
                        key={size.id}
                        onClick={() => setSelectedSizeId(size.id)}
                        className={`py-2 px-1 text-center rounded-lg border text-xs font-mono transition-all ${
                          isSelected
                            ? "bg-white text-black font-bold border-white shadow-lg scale-102"
                            : "bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        <span className="block font-bold">{size.label}</span>
                        <span className="block text-[9px] opacity-70 mt-0.5">{size.chest}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector & Add to Bag Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                {/* Quantity Controls */}
                <div className="flex items-center justify-between sm:justify-start border border-white/10 bg-neutral-900 rounded-xl p-1 w-full sm:w-auto">
                  <button
                    onClick={() => handleQuantityDelta(-1)}
                    disabled={quantity <= 1}
                    className="p-2 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-mono font-bold text-sm text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityDelta(1)}
                    disabled={quantity >= 10}
                    className="p-2 text-neutral-400 hover:text-white disabled:opacity-30 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Bag Primary CTA */}
                <button
                  onClick={handleAddToCartClick}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-98"
                >
                  {addedToCartSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>ADDED TO ATELIER BAG</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>ADD TO BAG · ₹{(product.priceINR * quantity).toLocaleString()}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Delivery & Assurance Badges */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-neutral-400">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  <span>Heavyweight Boxy Knit</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Zero-Shrink Preshrunk</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Blue Dart 48h Air</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Details & Interactive Tabs: Details / Care / Reviews */}
          <div className="border-t border-white/10 pt-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <button
                onClick={() => setActiveTab("details")}
                className={`text-xs font-mono uppercase tracking-wider pb-1 transition-colors ${
                  activeTab === "details"
                    ? "text-blue-400 font-bold border-b-2 border-blue-400"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                FABRIC & ANATOMY
              </button>
              <button
                onClick={() => setActiveTab("care")}
                className={`text-xs font-mono uppercase tracking-wider pb-1 transition-colors ${
                  activeTab === "care"
                    ? "text-blue-400 font-bold border-b-2 border-blue-400"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                WASH & CARE GUIDE
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`text-xs font-mono uppercase tracking-wider pb-1 transition-colors flex items-center gap-1.5 ${
                  activeTab === "reviews"
                    ? "text-blue-400 font-bold border-b-2 border-blue-400"
                    : "text-neutral-500 hover:text-white"
                }`}
              >
                <span>VERIFIED REVIEWS</span>
                <span className="px-1.5 py-0.2 rounded-full bg-blue-500/20 text-[10px] text-blue-400">
                  {reviewsList.length}
                </span>
              </button>
            </div>

            {/* Tab 1: Fabric & Anatomy */}
            {activeTab === "details" && (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">FABRIC WEIGHT</span>
                  <div className="text-sm font-mono font-bold text-white">{product.fabricSpecs.weight}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">KNIT STRUCTURE</span>
                  <div className="text-sm font-mono font-bold text-white">{product.fabricSpecs.knit}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">YARN COMPOSITION</span>
                  <div className="text-sm font-mono font-bold text-white">{product.fabricSpecs.yarn}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">NECKBAND RIB</span>
                  <div className="text-sm font-mono font-bold text-white">{product.fabricSpecs.collar}</div>
                </div>
                <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">MILL ORIGIN</span>
                  <div className="text-sm font-mono font-bold text-white">{product.fabricSpecs.origin}</div>
                </div>
              </div>
            )}

            {/* Tab 2: Wash & Care */}
            {activeTab === "care" && (
              <div className="p-5 rounded-xl bg-neutral-900/60 border border-white/5 space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-300">
                  PRESERVING 300 GSM STRUCTURE & ARCHIVAL PIGMENT
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-neutral-400 font-light">
                  {product.careInstructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tab 3: Reviews System with Option to Give Review */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                {/* Reviews Header & Write Review Action */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-neutral-900/60 border border-white/5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black font-mono text-white">
                        {product.rating.toFixed(1)}
                      </span>
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 stroke-none" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs font-mono text-neutral-400">
                      Based on {reviewsList.length} verified buyer reviews · 98% recommend this piece
                    </p>
                  </div>

                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="py-2.5 px-4 rounded-lg bg-white/10 hover:bg-white/20 border border-white/10 text-xs font-mono text-white flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{showReviewForm ? "CANCEL REVIEW" : "WRITE A REVIEW"}</span>
                  </button>
                </div>

                {/* Interactive Review Form */}
                {showReviewForm && (
                  <form
                    onSubmit={handleSubmitReview}
                    className="p-6 rounded-xl bg-neutral-900/90 border border-blue-500/40 space-y-4 animate-in fade-in"
                  >
                    <h4 className="text-sm font-bold uppercase font-sans text-white">
                      WRITE YOUR EXPERIENCE
                    </h4>

                    {/* Star Selector */}
                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                        OVERALL RATING
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setNewRating(star)}
                            className="p-1 text-neutral-600 hover:text-amber-400 transition-colors"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= newRating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-neutral-600"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                          YOUR NAME
                        </label>
                        <input
                          type="text"
                          required
                          value={newAuthor}
                          onChange={(e) => setNewAuthor(e.target.value)}
                          placeholder="e.g. Vikram R."
                          className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                          FIT ASSESSMENT
                        </label>
                        <select
                          value={newFit}
                          onChange={(e) => setNewFit(e.target.value as any)}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                        >
                          <option value="True to size">True to size</option>
                          <option value="Boxy / Relaxed">Boxy / Relaxed</option>
                          <option value="Slightly oversized">Slightly oversized</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                        REVIEW TITLE
                      </label>
                      <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        placeholder="e.g. Incredible 300 GSM drape and collar recovery"
                        className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-neutral-400 mb-1">
                        YOUR REVIEW
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Detail the fabric weight, neckband construction, and wash longevity..."
                        className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-blue-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="py-2.5 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase transition-colors"
                    >
                      SUBMIT VERIFIED REVIEW
                    </button>
                  </form>
                )}

                {/* Reviews Feed List */}
                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-xl bg-neutral-900/40 border border-white/5 space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white font-sans">{rev.author}</span>
                          {rev.verified && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                              <Check className="w-3 h-3" />
                              <span>Verified Buyer</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] font-mono text-neutral-500">{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < rev.rating ? "fill-amber-400 text-amber-400" : "text-neutral-700"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400 border border-white/5">
                          Fit: {rev.fitVerdict}
                        </span>
                      </div>

                      <h5 className="text-xs font-bold text-neutral-200">{rev.title}</h5>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Similar Options / Complete the Silhouette */}
          {product.similarProducts.length > 0 && (
            <div className="border-t border-white/10 pt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  SIMILAR OPTIONS · COMPLETE THE SILHOUETTE
                </h4>
                <span className="text-[11px] font-mono text-neutral-500">TIRUPUR COMBED COTTON</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {product.similarProducts.map((sim) => (
                  <button
                    key={sim.id}
                    onClick={() => onSelectSimilar?.(sim.id)}
                    className="group text-left p-2.5 rounded-xl bg-neutral-900/40 hover:bg-neutral-900 border border-white/5 hover:border-blue-500/40 transition-all"
                  >
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-neutral-950 mb-2.5">
                      <Image
                        src={sim.image}
                        alt={sim.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-sm text-[9px] font-mono text-neutral-300">
                        {sim.gsm}
                      </span>
                    </div>
                    <h5 className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
                      {sim.name}
                    </h5>
                    <span className="text-xs font-mono text-neutral-400">
                      ₹{sim.priceINR.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
