"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Edition } from "@/lib/types";

// Dynamic client-side only import for 3D Three.js WebGL canvas to prevent SSR hydration errors
const Hero3DRunway = dynamic(() => import("./Hero3DRunway"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 w-full h-full bg-[#F5F4F0] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-neutral-300 border-t-neutral-900 rounded-full animate-spin" />
        <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
          INITIALIZING RUNWAY CATWALK...
        </span>
      </div>
    </div>
  ),
});

interface LuxuryStreetwearHeroProps {
  onQuickAdd?: (edition: Edition, size: string) => void;
  onOpenVideoModal?: () => void;
  currency?: "INR" | "USD";
}

export function LuxuryStreetwearHero({
  onQuickAdd,
  onOpenVideoModal,
  currency = "INR",
}: LuxuryStreetwearHeroProps) {
  return (
    <section className="relative w-full min-h-screen lg:h-screen flex items-center justify-center bg-[#F5F4F0] text-[#111111] overflow-hidden select-none">
      
      {/* ================= 1. INTERACTIVE 3D RUNWAY CATWALK ================= */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Architectural Runway Stage Banner Backdrop */}
        <div 
          className="absolute inset-0 bg-center bg-cover opacity-25 pointer-events-none filter blur-[1px] mix-blend-multiply transition-opacity duration-1000"
          style={{ backgroundImage: `url('/images/runway-banner.jpg')` }}
        />

        <Hero3DRunway />

        {/* Soft Vignettes for Warm Alabaster Aesthetics - tuned for crisp scenery depth */}
        <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#F5F4F0]/70 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#F5F4F0]/70 to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#F5F4F0]/40 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#F5F4F0] via-[#F5F4F0]/40 to-transparent pointer-events-none z-10" />
      </div>

      {/* ================= 2. ARCHITECTURAL CORNER CROSSHAIRS ================= */}
      <div className="absolute left-8 sm:left-14 top-14 text-neutral-400 font-mono text-xs select-none pointer-events-none z-20">
        +
      </div>
      <div className="absolute right-8 sm:right-14 top-14 text-neutral-400 font-mono text-xs select-none pointer-events-none z-20">
        +
      </div>
      <div className="absolute left-8 sm:left-14 bottom-14 text-neutral-400 font-mono text-xs select-none pointer-events-none z-20">
        +
      </div>
      <div className="absolute right-8 sm:right-14 bottom-14 text-neutral-400 font-mono text-xs select-none pointer-events-none z-20">
        +
      </div>

      {/* ================= 3. HERO VIEWPORT CONTENT ================= */}
      {/* Middle and top are left completely open so the character and catwalk are 100% visible */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-12 pt-28 pb-10 flex flex-col items-center justify-end h-full min-h-screen pointer-events-none">
        
        {/* ================= 4. BOTTOM FLOATING TAGLINE & ACTION BUTTONS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center text-center gap-3 pointer-events-auto"
        >
          {/* Tagline: DRESS LIKE YOU MEAN IT. in Candy Inc font (Clean uncontained typography - no bubble) */}
          <div className="flex flex-col items-center gap-2 pb-1.5">
            <h2 className="font-candy-inc text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111111] select-none tracking-wider drop-shadow-[0_2px_12px_rgba(245,244,240,0.9)] leading-tight">
              DRESS LIKE YOU MEAN IT.
            </h2>
            <p className="font-mono text-[10px] sm:text-[11px] font-bold text-neutral-700 tracking-[0.24em] uppercase whitespace-nowrap drop-shadow-[0_1px_6px_rgba(245,244,240,0.85)]">
              ARCHITECTURAL GRAPHIC APPAREL · 300 GSM HEAVYWEIGHT COTTON
            </p>
          </div>

          {/* Minimalist Accent Divider */}
          <div className="w-12 h-[1px] bg-neutral-300 my-1" />

          {/* Floating CTA Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-3.5 rounded-sm bg-[#111111] text-[#F5F4F0] font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition-all flex items-center gap-3 group cursor-pointer active:scale-98"
            >
              <span>EXPLORE COLLECTIONS</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/#editions"
              className="px-6 py-3.5 rounded-sm bg-white/80 hover:bg-white text-black border border-neutral-300 font-mono text-xs font-bold uppercase tracking-[0.15em] transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-98 backdrop-blur-md"
            >
              <span>VIEW DROPS</span>
            </Link>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default LuxuryStreetwearHero;
