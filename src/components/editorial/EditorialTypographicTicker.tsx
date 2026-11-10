"use client";

import React from "react";

// Terracotta 8-point asterisk matching Élan fashion reference
function TerracottaAsterisk() {
  return (
    <span className="inline-flex items-center justify-center shrink-0 mx-3 sm:mx-6 text-[#B34728] select-none">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
      >
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
        <line x1="19.07" y1="4.93" x2="4.93" y2="19.07" />
      </svg>
    </span>
  );
}

export function EditorialTypographicTicker() {
  const row1Content = (
    <div className="flex items-center shrink-0 py-1">
      <TerracottaAsterisk />
      <span className="font-bodoni-moda italic font-normal tracking-tight text-black px-1.5">
        Considered
      </span>
      <TerracottaAsterisk />
      <span className="font-sans font-black tracking-tight text-black uppercase px-1.5">
        Made to last
      </span>
      <TerracottaAsterisk />
      <span className="font-bodoni-moda italic font-normal tracking-tight text-neutral-800 px-1.5">
        Combed Cotton Knit
      </span>
      <TerracottaAsterisk />
      <span className="font-sans font-black tracking-tight text-black uppercase px-1.5">
        Archival Drape
      </span>
    </div>
  );

  const row2Content = (
    <div className="flex items-center shrink-0 py-1">
      <span className="font-bodoni-moda italic font-normal tracking-tight text-black px-1.5">
        wear it often
      </span>
      <TerracottaAsterisk />
      <span className="font-sans font-black tracking-tight text-black uppercase px-1.5">
        Feel authentic
      </span>
      <TerracottaAsterisk />
      <span className="font-bodoni-moda italic font-normal tracking-tight text-black px-1.5">
        Atelier Silhouette
      </span>
      <TerracottaAsterisk />
      <span className="font-sans font-black tracking-tight text-black uppercase px-1.5">
        Wear The Invisible
      </span>
      <TerracottaAsterisk />
    </div>
  );

  return (
    <section className="relative w-full py-6 sm:py-8 bg-[#F5F4F0] text-[#111111] overflow-hidden select-none border-y border-black/10 group">
      {/* Edge gradient fade masks for smooth transition into view */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F5F4F0] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F5F4F0] to-transparent z-10 pointer-events-none" />

      <div className="flex flex-col space-y-1 sm:space-y-2 text-2xl sm:text-4xl lg:text-5xl leading-tight whitespace-nowrap">
        {/* Row 1: Moves Leftwards */}
        <div className="flex overflow-hidden w-full">
          <div className="flex items-center shrink-0 animate-marquee-left group-hover:[animation-play-state:paused]">
            {row1Content}
            {row1Content}
            {row1Content}
            {row1Content}
          </div>
          <div
            className="flex items-center shrink-0 animate-marquee-left group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {row1Content}
            {row1Content}
            {row1Content}
            {row1Content}
          </div>
        </div>

        {/* Row 2: Moves Rightwards */}
        <div className="flex overflow-hidden w-full">
          <div className="flex items-center shrink-0 animate-marquee-right group-hover:[animation-play-state:paused]">
            {row2Content}
            {row2Content}
            {row2Content}
            {row2Content}
          </div>
          <div
            className="flex items-center shrink-0 animate-marquee-right group-hover:[animation-play-state:paused]"
            aria-hidden="true"
          >
            {row2Content}
            {row2Content}
            {row2Content}
            {row2Content}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditorialTypographicTicker;
