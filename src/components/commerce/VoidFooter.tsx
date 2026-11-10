"use client";

import React from "react";
import WildHuntFooter, { FooterColumn, WildHuntPreset } from "@/components/ui/wild-hunt-footer";
import { ArrowUpRight } from "lucide-react";

interface VoidFooterProps {
  preset?: WildHuntPreset;
}

const VOID_COLUMNS: FooterColumn[] = [
  {
    title: "EDITIONS & ARCHIVE",
    links: [
      { label: "Shop All Editions", href: "/shop" },
      { label: "01 · Modernist Archive (Cobalt)", href: "/shop" },
      { label: "02 · Terracotta Surya (Rust)", href: "/shop" },
      { label: "03 · Obsidian Monolith (Black)", href: "/shop" },
    ],
  },
  {
    title: "ATELIER & CARE",
    links: [
      { label: "Garment Care & Longevity", href: "/legal/care-guide" },
      { label: "Atelier Craft Heritage", href: "/legal/care-guide" },
      { label: "Textile & Fit Specifications", href: "/legal/care-guide" },
      { label: "Sizing & Fit Blueprint", href: "/account" },
    ],
  },
  {
    title: "CLIENT SERVICES",
    links: [
      { label: "Atelier FAQ & Inquiries", href: "/#faq" },
      { label: "Patron Account & Live Tracking", href: "/account" },
      { label: "Shipping & Returns Policy", href: "/legal/shipping-returns" },
      { label: "Privacy Policy & Client Rights", href: "/legal/privacy-policy" },
      { label: "Terms of Service & Conditions", href: "/legal/terms-of-service" },
    ],
  },
];

const SOCIAL_LINKS = [
  { label: "INSTAGRAM", href: "https://instagram.com" },
  { label: "X (TWITTER)", href: "https://x.com" },
  { label: "YOUTUBE", href: "https://youtube.com" },
  { label: "DISCORD", href: "https://discord.com" },
];

export function VoidFooter({ preset = "bone" }: VoidFooterProps) {
  return (
    <footer className="w-full relative bg-[#F5F4F0] text-[#111111] overflow-hidden">
      {/* Soft hairline gradient at the very top of the painting: preserves complete visibility of Krishna & Arjuna */}
      <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-[#F5F4F0] to-transparent z-20 pointer-events-none" />

      <WildHuntFooter
        wordmark="VOID"
        preset="bone"
        palette={{ background: "#F5F4F0", ink: "#111111" }}
        image={{
          src: "/images/mahabharata_kurukshetra.jpg",
          alt: "The Kurukshetra War — Lord Krishna & Arjuna Epic",
          position: "50% 15%",
        }}
        imageHeight={0.65}
        dissolve={0.72}
        height="min(100svh, 980px)"
        tagline="ARCHITECTURAL GRAPHIC APPAREL"
        sideNote="Heavyweight combed cotton engineered for structural boxy drape, dropped shoulders, and archival screenprint pigment."
        columns={VOID_COLUMNS}
        legal="© VOID PVT LTD. BOMBAY. ALL RIGHTS RESERVED."
        colophon=""
        sigils={true}
        interactive={false}
      />

      {/* Social Handles Bar */}
      <div className="w-full py-5 px-6 sm:px-12 border-t border-black/10 flex items-center justify-center text-xs font-mono text-neutral-700 bg-[#F5F4F0]">
        <div className="flex items-center flex-wrap justify-center gap-6 sm:gap-10">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-600 hover:text-black tracking-widest uppercase transition-colors inline-flex items-center gap-1 group font-medium"
            >
              <span>{s.label}</span>
              <ArrowUpRight className="w-3 h-3 text-neutral-400 group-hover:text-black transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </div>

      {/* Designer Colophon & Mobile Developer Badge */}
      <div className="w-full py-6 px-6 sm:px-12 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-600 bg-[#F5F4F0]">
        <div className="flex items-center gap-2">
          <span className="text-neutral-500">DESIGNED BY</span>
          <a
            href="https://arnavpaniya.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-neutral-700 font-bold uppercase underline underline-offset-4 transition-colors inline-flex items-center gap-1 group"
          >
            <span>ARNAV PANIYA</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Mobile View Developer Credit (at the footer as requested) */}
        <div className="flex md:hidden items-center justify-center my-2">
          <a
            href="https://arnavpaniya.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#141414] hover:bg-[#1C1C1C] text-white border border-white/10 rounded-full px-5 py-2.5 shadow-md active:scale-95 transition-all"
          >
            <span className="font-sans text-[10px] font-semibold tracking-[0.2em] text-neutral-400 uppercase">
              ARNAV PANIYA
            </span>
            <span className="w-4 h-[1px] bg-neutral-600" />
            <span className="font-sans text-[11px] font-medium tracking-wide text-white">
              arnavpaniya.netlify.app
            </span>
          </a>
        </div>

        <div className="text-[11px] text-neutral-500 text-center md:text-right">
          BOMBAY · MONOCHROME STREETWEAR ARCHIVE
        </div>
      </div>
    </footer>
  );
}

export default VoidFooter;
