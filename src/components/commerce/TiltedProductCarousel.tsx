"use client";

import React from "react";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";

const PRODUCT_IMAGES = [
  {
    src: "/images/products/product_01_on_air.jpg",
    alt: "Edition 01 — Modernist 'On Air' Heavyweight Tee",
  },
  {
    src: "/images/products/product_02_mazda_duo.jpg",
    alt: "Edition 02 — Mazda RX 1992 Technical Tee Duo",
  },
  {
    src: "/images/products/product_03_forceps_neon.jpg",
    alt: "Edition 03 — Flawless With Forceps Neon Screenprint",
  },
  {
    src: "/images/products/product_04_street_jutsu_urban.jpg",
    alt: "Edition 04 — Street Jutsu Urban Dragon Black Boxy Tee",
  },
  {
    src: "/images/products/product_05_street_jutsu_white.jpg",
    alt: "Edition 05 — Street Jutsu Raw Unbleached Tee",
  },
  {
    src: "/images/products/product_06_dvc_sunset.jpg",
    alt: "Edition 06 — DVC Sunset Silhouette Streetwear",
  },
  {
    src: "/images/products/product_07_rooster_art_tee.jpg",
    alt: "Edition 07 — Ajichart Heritage 1986 Multi-Color Screenprint",
  },
  {
    src: "/images/products/product_08_liniker_duo.jpg",
    alt: "Edition 08 — Liniker Leopard Accent Twin Editorial",
  },
];

const LOOPED_IMAGES = [
  ...PRODUCT_IMAGES,
  ...PRODUCT_IMAGES,
  ...PRODUCT_IMAGES,
];

export function TiltedProductCarousel() {
  return (
    <section className="relative w-full py-16 bg-[#F5F4F0] text-[#111111] overflow-hidden">
      {/* Clean Minimal Title */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center sm:text-left">
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111] font-sans">
          THE ARCHIVAL FIT IN MOTION
        </h2>
      </div>

      {/* Tilted Curved Cylindrical Hero with Faster Speed & Infinite Product Loop */}
      <div className="relative w-full">
        <TiltedGridHero
          images={LOOPED_IMAGES}
          speed={1.5}
          tileHeight={64}
          aspectRatio={2 / 3}
          curve={65}
          fade={18}
          className="h-[520px] sm:h-[620px] lg:h-[700px] w-full bg-transparent"
        />
      </div>

      {/* Streetwear Slang Marquee Tape */}
      <div className="w-full py-3 bg-[#C6F10E] text-black font-mono font-black text-xs uppercase tracking-widest overflow-hidden whitespace-nowrap flex select-none mt-4">
        <div className="animate-marquee flex items-center gap-8 shrink-0">
          <span>⚡ MAIN CHARACTER FIT</span>
          <span>•</span>
          <span>NO CAP // STRAIGHT HEAT</span>
          <span>•</span>
          <span>ARCHIVAL HEAVYWEIGHT DRAPE</span>
          <span>•</span>
          <span>COP OR DROP</span>
          <span>•</span>
          <span>TIRUPUR MILLED GRAIL</span>
          <span>•</span>
          <span>CERTIFIED STREETWEAR</span>
          <span>•</span>
          <span>ZERO RESTOCKS // ONCE GONE IT&apos;S DEADSTOCK</span>
          <span>•</span>
        </div>
        <div className="animate-marquee2 flex items-center gap-8 shrink-0" aria-hidden="true">
          <span>⚡ MAIN CHARACTER FIT</span>
          <span>•</span>
          <span>NO CAP // STRAIGHT HEAT</span>
          <span>•</span>
          <span>ARCHIVAL HEAVYWEIGHT DRAPE</span>
          <span>•</span>
          <span>COP OR DROP</span>
          <span>•</span>
          <span>TIRUPUR MILLED GRAIL</span>
          <span>•</span>
          <span>CERTIFIED STREETWEAR</span>
          <span>•</span>
          <span>ZERO RESTOCKS // ONCE GONE IT&apos;S DEADSTOCK</span>
          <span>•</span>
        </div>
      </div>
    </section>
  );
}

export default TiltedProductCarousel;
