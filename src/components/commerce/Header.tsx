"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Globe, Menu, X, Heart, User } from "lucide-react";
import { Edition } from "@/lib/types";
import { useSoundtrack } from "@/components/audio/SoundtrackPlayer";
import { getStoredWishlist } from "@/lib/wishlistStore";

interface HeaderProps {
  editions: Edition[];
  activeEdition: Edition;
  onSelectEdition: (edition: Edition) => void;
  currency: "INR" | "USD";
  onToggleCurrency: () => void;
  cartCount: number;
  onOpenCart: () => void;
  wishlistCount?: number;
  onOpenWishlist?: () => void;
  onOpenVideo?: () => void;
}

export function Header({
  editions,
  activeEdition,
  onSelectEdition,
  currency,
  onToggleCurrency,
  cartCount,
  onOpenCart,
  wishlistCount = 0,
  onOpenWishlist,
  onOpenVideo,
}: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [liveWishlistCount, setLiveWishlistCount] = useState(wishlistCount);
  const [userName, setUserName] = useState<string | null>(null);
  const { isPlaying, toggleAudio } = useSoundtrack();

  // Sync auth state
  useEffect(() => {
    try {
      const stored = localStorage.getItem("void_auth_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.signedIn) {
          setUserName(parsed.name || "Patron");
        }
      }
    } catch {}
  }, []);

  // Sync live wishlist count
  useEffect(() => {
    setLiveWishlistCount(getStoredWishlist().length);

    const handleSync = () => {
      setLiveWishlistCount(getStoredWishlist().length);
    };

    window.addEventListener("void-wishlist-updated", handleSync);
    return () => window.removeEventListener("void-wishlist-updated", handleSync);
  }, []);

  // Scroll detection for dynamic morphing navbar
  useEffect(() => {
    const handleScroll = () => {
      // 80px scroll clears hero viewport into the next sections
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if we are specifically on the home page hero screen
  const isHeroScreen = (pathname === "/" || pathname === "") && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out pointer-events-none flex justify-center ${
          isHeroScreen
            ? "pt-6 px-6 sm:px-12"
            : isScrolled
            ? "pt-3 px-4 sm:px-6"
            : "pt-5 px-6 sm:px-10"
        }`}
      >
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full transition-all duration-500 ease-out flex items-center justify-between pointer-events-auto ${
            isHeroScreen
              ? "max-w-7xl py-2.5 px-4 sm:px-6 rounded-full bg-[#FAF9F5]/90 backdrop-blur-xl text-[#111111] border border-[#E2DDD3] shadow-[0_12px_36px_-6px_rgba(0,0,0,0.08),inset_0_1.5px_2px_rgba(255,255,255,0.95)]"
              : isScrolled
              ? "max-w-6xl py-2 px-4 sm:px-6 rounded-full bg-[#18181B]/95 backdrop-blur-xl text-white border border-white/20 shadow-[0_18px_40px_-6px_rgba(0,0,0,0.45),0_8px_18px_-4px_rgba(0,0,0,0.25),inset_0_2.5px_4px_rgba(255,255,255,0.25),inset_0_-3px_5px_rgba(0,0,0,0.55)]"
              : "max-w-7xl py-2.5 px-4 sm:px-6 rounded-full bg-[#1A191D]/90 backdrop-blur-xl text-white border border-white/20 shadow-[0_22px_50px_-6px_rgba(0,0,0,0.5),0_10px_22px_-4px_rgba(0,0,0,0.3),inset_0_3px_5px_rgba(255,255,255,0.28),inset_0_-3.5px_6px_rgba(0,0,0,0.6)]"
          }`}
        >
          {/* Brand Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="group relative flex items-center py-1 cursor-pointer"
              title="VOID — Wearable Artifacts"
            >
              <img
                src={isHeroScreen ? "/images/void_logo_black.png" : "/images/void_logo_cropped.png"}
                alt="VOID"
                className={`h-8 sm:h-9 w-auto object-contain transition-all duration-300 group-hover:scale-105 ${
                  isHeroScreen
                    ? "filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
                    : "filter drop-shadow-[0_2px_10px_rgba(255,255,255,0.25)]"
                }`}
              />
            </Link>
          </div>

          {/* Center Navigation Links: SHOP, TRENDING, RUNWAY, EDITIONS, FAQ */}
          <nav
            className={`hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-md transition-all duration-300 ${
              isHeroScreen
                ? "bg-black/[0.04] border border-black/[0.08] shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
                : "bg-white/[0.05] border border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)]"
            }`}
          >
            <Link
              href="/shop"
              className={`px-3.5 py-1 rounded-full text-xs font-mono font-bold tracking-wider transition-all ${
                isHeroScreen
                  ? "text-[#111111] hover:bg-black/[0.07]"
                  : "text-white hover:bg-white/10"
              }`}
            >
              SHOP
            </Link>
            <Link
              href="/#trending"
              className={`px-3.5 py-1 rounded-full text-xs font-mono tracking-wider transition-all ${
                isHeroScreen
                  ? "text-neutral-700 hover:text-black hover:bg-black/[0.07]"
                  : "text-neutral-300 hover:text-white hover:bg-white/10"
              }`}
            >
              TRENDING
            </Link>
            <Link
              href="/#runway"
              className={`px-3.5 py-1 rounded-full text-xs font-mono tracking-wider transition-all ${
                isHeroScreen
                  ? "text-neutral-700 hover:text-black hover:bg-black/[0.07]"
                  : "text-neutral-300 hover:text-white hover:bg-white/10"
              }`}
            >
              RUNWAY
            </Link>
            <Link
              href="/#editions"
              className={`px-3.5 py-1 rounded-full text-xs font-mono tracking-wider transition-all ${
                isHeroScreen
                  ? "text-neutral-700 hover:text-black hover:bg-black/[0.07]"
                  : "text-neutral-300 hover:text-white hover:bg-white/10"
              }`}
            >
              EDITIONS
            </Link>
            <Link
              href="/#faq"
              className={`px-3.5 py-1 rounded-full text-xs font-mono tracking-wider transition-all ${
                isHeroScreen
                  ? "text-neutral-700 hover:text-black hover:bg-black/[0.07]"
                  : "text-neutral-300 hover:text-white hover:bg-white/10"
              }`}
            >
              FAQ
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Ambient Sound Equalizer Toggle */}
            <button
              onClick={toggleAudio}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 cursor-pointer active:scale-95 ${
                isHeroScreen
                  ? isPlaying
                    ? "bg-black/10 border-black/20 text-black shadow-sm"
                    : "bg-black/[0.04] border-black/[0.08] text-neutral-600 hover:text-black"
                  : isPlaying
                  ? "bg-white/15 border-white/25 text-white shadow-sm"
                  : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
              }`}
              title={isPlaying ? "Mute ambient music" : "Play ambient music"}
              aria-label="Toggle ambient soundtrack"
            >
              <div className="flex items-end gap-0.5 h-3 w-3 justify-center">
                <span
                  className={`w-0.5 bg-current rounded-full transition-all duration-200 ${
                    isPlaying ? "animate-eq-1" : "h-1"
                  }`}
                />
                <span
                  className={`w-0.5 bg-current rounded-full transition-all duration-200 ${
                    isPlaying ? "animate-eq-2" : "h-2"
                  }`}
                />
                <span
                  className={`w-0.5 bg-current rounded-full transition-all duration-200 ${
                    isPlaying ? "animate-eq-3" : "h-1"
                  }`}
                />
              </div>
              <span className="hidden xl:inline text-[9px] tracking-wider uppercase font-mono">
                {isPlaying ? "SOUND" : "MUTED"}
              </span>
            </button>

            {/* Currency Selector */}
            <button
              onClick={onToggleCurrency}
              className={`hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-mono shadow-sm active:scale-95 transition-all cursor-pointer ${
                isHeroScreen
                  ? "bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.08] text-neutral-700 hover:text-black"
                  : "bg-white/5 hover:bg-white/15 border-white/10 text-neutral-300 hover:text-white"
              }`}
              aria-label="Toggle currency"
            >
              <Globe className="w-3.5 h-3.5 opacity-70" />
              <span>{currency}</span>
            </button>

            {/* Dedicated Wishlist Page Link */}
            <Link
              href="/wishlist"
              className={`relative p-2.5 rounded-full border shadow-sm active:scale-95 transition-all cursor-pointer flex items-center justify-center ${
                isHeroScreen
                  ? "bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.08] text-neutral-700 hover:text-black"
                  : "bg-white/5 hover:bg-white/15 border-white/10 text-neutral-300 hover:text-white"
              }`}
              aria-label="Saved pieces page"
              title="Saved pieces"
            >
              <Heart className="w-4 h-4" />
              {liveWishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[8px] font-bold font-mono flex items-center justify-center">
                  {liveWishlistCount}
                </span>
              )}
            </Link>

            {/* Direct Account Page Button */}
            <Link
              href="/account"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all shadow-sm active:scale-95 cursor-pointer ${
                isHeroScreen
                  ? "bg-[#111111] hover:bg-neutral-800 text-[#F5F4F0] border border-black"
                  : "bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              }`}
              title="Customer Studio / Account"
            >
              <User className="w-3.5 h-3.5 opacity-80" />
              <span>ACCOUNT</span>
            </Link>

            {/* Sign In / Sign Up Link */}
            <Link
              href="/login"
              className={`hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-xs font-mono shadow-sm active:scale-95 transition-all cursor-pointer ${
                isHeroScreen
                  ? "bg-black/[0.04] hover:bg-black/[0.08] border-black/[0.08] text-neutral-700 hover:text-black"
                  : "bg-white/5 hover:bg-white/15 border-white/10 text-neutral-300 hover:text-white"
              }`}
              title="Sign In / Register"
            >
              <span>SIGN IN</span>
            </Link>

            {/* Shopping Bag Button */}
            <button
              onClick={onOpenCart}
              className={`relative flex items-center justify-center p-2.5 rounded-full transition-all active:scale-95 cursor-pointer ${
                isHeroScreen
                  ? "bg-[#111111] text-[#F5F4F0] hover:bg-neutral-800 shadow-[0_4px_14px_rgba(0,0,0,0.22)]"
                  : "bg-white text-black hover:bg-neutral-100 shadow-[0_4px_14px_rgba(0,0,0,0.35)]"
              }`}
              aria-label="Open shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span
                  className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold font-mono flex items-center justify-center ${
                    isHeroScreen
                      ? "bg-white text-black border border-neutral-300"
                      : "bg-black text-white border border-white"
                  }`}
                >
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`lg:hidden p-2.5 rounded-full border shadow-sm active:scale-95 cursor-pointer ${
                isHeroScreen
                  ? "bg-black/[0.05] border-black/[0.1] text-neutral-800 hover:text-black"
                  : "bg-white/10 border-white/15 text-neutral-200 hover:text-white"
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0E0D0C]/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 text-white md:hidden">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                NAVIGATION
              </span>
              <div className="flex flex-col space-y-3 text-2xl font-bold uppercase font-sans">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[#C6F10E] hover:text-white transition-colors flex items-center gap-2"
                >
                  <span>Shop All Drops</span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#C6F10E]/20 text-[#C6F10E]">HOT</span>
                </Link>
                <Link
                  href="/#trending"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-neutral-400 transition-colors"
                >
                  Trending
                </Link>
                <Link
                  href="/#runway"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-neutral-400 transition-colors"
                >
                  Runway
                </Link>
                <Link
                  href="/#editions"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-neutral-400 transition-colors"
                >
                  Current Editions
                </Link>
                <Link
                  href="/#faq"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-neutral-400 transition-colors"
                >
                  Atelier FAQ
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-neutral-400 transition-colors"
                >
                  Account
                </Link>
              </div>
            </div>

            {/* Wishlist & Account Shortcuts (Direct Page Links - No Popups) */}
            <div className="flex flex-col gap-2.5 pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-white to-neutral-200 text-black font-mono text-xs font-black uppercase text-center transition-all shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.9)] active:scale-95 flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-black" />
                <span>SIGN IN / REGISTER</span>
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono uppercase text-center text-white transition-all shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-1.5px_2px_rgba(0,0,0,0.35)] active:scale-95 flex items-center justify-center gap-2"
              >
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>SAVED VAULT ({liveWishlistCount})</span>
              </Link>
              <div className="flex items-center gap-3">
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono uppercase text-center text-white transition-all shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-1.5px_2px_rgba(0,0,0,0.35)] active:scale-95"
                >
                  Track Orders
                </Link>
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-mono uppercase text-center text-white transition-all shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.2),inset_0_-1.5px_2px_rgba(0,0,0,0.35)] active:scale-95"
                >
                  Client Account
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>VOID // 300 GSM ARCHIVE</span>
            <button
              onClick={toggleAudio}
              className="text-white underline underline-offset-4 cursor-pointer"
            >
              {isPlaying ? "Mute Soundtrack" : "Play Ambient Music"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
