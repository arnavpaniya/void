"use client";

import React, { useState } from "react";
import { EDITIONS, Edition, CartItem, WishlistItem } from "@/lib/types";
import { Preloader } from "@/components/preloader/Preloader";
import { Header } from "@/components/commerce/Header";
import { LuxuryStreetwearHero } from "@/components/hero/LuxuryStreetwearHero";
import { ProductDetails } from "@/components/commerce/ProductDetails";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { RampwalkVideoModal } from "@/components/video/RampwalkVideoModal";
import { DesktopMotionReel } from "@/components/video/DesktopMotionReel";
import { ScrollDrivenEditorial } from "@/components/editorial/ScrollDrivenEditorial";
import { EditorialTypographicTicker } from "@/components/editorial/EditorialTypographicTicker";
import { TopDripCarousel } from "@/components/commerce/TopDripCarousel";
import { TrendingSection } from "@/components/commerce/TrendingSection";
import { TiltedProductCarousel } from "@/components/commerce/TiltedProductCarousel";
import { NewsletterSection } from "@/components/commerce/NewsletterSection";
import { FaqSection } from "@/components/editorial/FaqSection";
import { VoidFooter } from "@/components/commerce/VoidFooter";
import { ArrowDown } from "lucide-react";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [activeEdition, setActiveEdition] = useState<Edition>(EDITIONS[0]);
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  // Client Hub States (Wishlist, Video Modal)
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: "wish-01",
      name: "Edition 01 · Modernist 'On Air' Boxy Tee",
      priceINR: 2890,
      originalPriceINR: 3890,
      image: "/images/products/product_01_on_air.jpg",
      gsm: "300 GSM",
      category: "Heavyweight Graphic",
      addedAt: "Just now",
    },
    {
      id: "wish-02",
      name: "Edition 02 · Mazda RX 1992 Technical Tee",
      priceINR: 3190,
      originalPriceINR: 4190,
      image: "/images/products/product_02_mazda_duo.jpg",
      gsm: "300 GSM",
      category: "Vintage Automotive",
      addedAt: "Just now",
    },
  ]);

  // Add to cart handler
  const handleAddToCart = (edition: Edition, size: string) => {
    setCartItems((prev) => {
      const existing = prev.findIndex(
        (item) => item.edition.id === edition.id && item.size === size
      );
      if (existing > -1) {
        const copy = [...prev];
        copy[existing].quantity += 1;
        return copy;
      }
      return [...prev, { edition, size, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const handleQuickAddTrending = (name: string, size: string, priceINR: number) => {
    const customEdition: Edition = {
      id: `trend-${name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
      name,
      subtitle: "Trending Edition",
      devanagariName: "VOID // ARCHIVE",
      priceINR,
      priceUSD: Math.round(priceINR / 60),
      canvasBg: "#EFECE6",
      accentColor: "#2563EB",
      rimColor: "#1E40AF",
      tshirtColor: "#161514",
      graphicUrl: "/graphics/void_graphic_01.jpg",
      story: "Constructed with 300 GSM Tirupur combed cotton in structural boxy streetwear silhouette.",
      fabricSpecs: {
        weight: "300 GSM Heavyweight",
        knit: "Single Jersey 24s",
        yarn: "100% Combed Indian Cotton",
        origin: "Milled in Tirupur, India",
      },
    };
    handleAddToCart(customEdition, size);
  };

  // Update quantity handler
  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  // Update size in cart
  const handleUpdateSize = (index: number, newSize: string) => {
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].size = newSize;
      return copy;
    });
  };

  // Remove item handler
  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Wishlist handlers
  const handleRemoveWishlist = (id: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleMoveWishlistToCart = (item: WishlistItem, size: string) => {
    const matched = EDITIONS.find((e) => e.name.includes(item.name.split("·")[0].trim())) || EDITIONS[0];
    handleAddToCart(matched, size);
    handleRemoveWishlist(item.id);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#F5F4F0] text-[#111111] font-sans selection:bg-neutral-300 selection:text-black">
      {/* Squeegee Ink Wipe Preloader */}
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}

      {/* Persistent Minimalist Header with New Logo */}
      <Header
        editions={EDITIONS}
        activeEdition={activeEdition}
        onSelectEdition={setActiveEdition}
        currency={currency}
        onToggleCurrency={() =>
          setCurrency((prev) => (prev === "INR" ? "USD" : "INR"))
        }
        cartCount={totalCartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenVideo={() => setVideoModalOpen(true)}
      />

      {/* Full-Featured Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onUpdateSize={handleUpdateSize}
        onRemoveItem={handleRemoveItem}
      />

      {/* Rampwalk Video Lightbox Modal */}
      <RampwalkVideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        videoSrc="/videos/rampwalk.mp4"
      />

      {/* Hero Section: Editorial Streetwear Apparel */}
      <section id="runway" className="relative w-full">
        <LuxuryStreetwearHero
          onQuickAdd={handleAddToCart}
          onOpenVideoModal={() => setVideoModalOpen(true)}
          currency={currency}
        />
      </section>

      {/* Trending / Cultured Drip 3D Perspective Carousel */}
      <section id="trending" className="relative w-full">
        <div id="top10" className="absolute -top-24" />
        <TopDripCarousel />
      </section>

      {/* VOID — Scroll-Driven Editorial Fashion Spread (Magazine Editorial Section) */}
      <ScrollDrivenEditorial />

      {/* Current Editions Section with Interactive Cards & Reviews Modal */}
      <section id="editions" className="relative w-full">
        <TrendingSection onQuickAdd={handleQuickAddTrending} />
      </section>

      {/* Innovative Runway Motion Reel (Catwalk In Motion) */}
      <DesktopMotionReel
        onQuickAdd={handleQuickAddTrending}
        onOpenVideoModal={() => setVideoModalOpen(true)}
      />

      {/* Curved Cylindrical Product Carousel (TiltedGridHero) */}
      <section id="carousel" className="relative w-full">
        <TiltedProductCarousel />
      </section>

      {/* Editorial Typographic Scrolling Marquee Ticker */}
      <EditorialTypographicTicker />

      {/* Atelier Frequent Inquiries (FAQ) Section */}
      <FaqSection />

      {/* Atelier Communiqué Newsletter Section */}
      <NewsletterSection />

      {/* VOID Blackletter Dithered Footer & Testimonials (WildHuntFooter) */}
      <VoidFooter preset="bone" />
    </div>
  );
}
