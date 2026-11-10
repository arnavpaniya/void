"use client";

import React from "react";

export function SideDeveloperBadge() {
  return (
    <aside
      aria-label="Developer Attribution"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:block select-none"
    >
      <a
        href="https://arnavpaniya.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        title="Arnav Paniya — arnavpaniya.netlify.app"
        className="group flex items-center bg-[#141414] hover:bg-[#1C1C1C] text-white border-l border-y border-white/10 rounded-l-2xl py-6 px-3 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-x-1 hover:border-white/20"
      >
        <div
          className="flex items-center gap-3 text-xs tracking-wider"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
        >
          <span className="font-sans text-[11px] font-semibold tracking-[0.22em] text-neutral-400 group-hover:text-neutral-300 transition-colors uppercase">
            ARNAV PANIYA
          </span>
          <span className="w-4 h-[1px] bg-neutral-600 group-hover:bg-neutral-400 transition-colors" />
          <span className="font-sans text-[12px] font-medium tracking-wide text-neutral-100 group-hover:text-white transition-colors">
            arnavpaniya.netlify.app
          </span>
        </div>
      </a>
    </aside>
  );
}

export default SideDeveloperBadge;
