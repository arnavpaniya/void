"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle, ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";

interface FaqItem {
  id: string;
  category: "textile" | "editions" | "shipping" | "care";
  question: string;
  answer: string;
  tag?: string;
}

const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    category: "textile",
    question: "What defines VOID's signature heavyweight architectural drape?",
    answer:
      "All VOID tees are constructed from long-staple Indian combed cotton single jersey. The dense heavyweight knit provides structural form that hangs cleanly off dropped shoulders and resists collar baconing, while preserving breathability for all-season wear.",
    tag: "Textile Architecture",
  },
  {
    id: "faq-2",
    category: "textile",
    question: "How do VOID streetwear proportions (01 to 04) fit?",
    answer:
      "Our proportions are cut in an intentional relaxed streetwear silhouette with dropped shoulders and a structured 1.25-inch rib neckband:\n• 01 (S): Chest 44\" · Length 28.5\"\n• 02 (M): Chest 46\" · Length 29.5\" (Signature boxy fit)\n• 03 (L): Chest 48\" · Length 30.5\"\n• 04 (XL): Chest 52\" · Length 31.5\"\nSelect your regular size for an authentic streetwear drape.",
    tag: "Sizing Blueprint",
  },
  {
    id: "faq-3",
    category: "editions",
    question: "Are limited drops restocked once marked as archived?",
    answer:
      "No. VOID operates on strictly numbered archival runs. Once a batch sells out, the pigment screens are permanently retired to maintain collector provenance and rarity. We never reprint past editions.",
    tag: "Archival Policy",
  },
  {
    id: "faq-4",
    category: "shipping",
    question: "What are your shipping carriers and delivery timelines?",
    answer:
      "Orders are packed in tamper-evident reinforced atelier boxes and dispatched within 24 to 48 hours. Domestic orders travel via BlueDart Air Express (2 to 4 business days). International air freight takes 4 to 7 business days with real-time end-to-end GPS tracking provided via your Patron Portal.",
    tag: "Air Logistics",
  },
  {
    id: "faq-5",
    category: "care",
    question: "How should I care for archival screenprinted garments?",
    answer:
      "Wash inside-out in cold water (maximum 30°C) on a gentle cycle using mild liquid detergent. Never bleach or tumble dry. Hang dry in shade to preserve screenprint pigment chemistry. Iron inside-out on medium heat—never apply direct iron heat to graphic prints.",
    tag: "Longevity & Wash",
  },
  {
    id: "faq-6",
    category: "shipping",
    question: "What is your return and size exchange procedure?",
    answer:
      "We provide a hassle-free 7-day return and exchange policy from the date of delivery for unworn garments with original atelier tags intact. You can schedule a doorstep reverse pickup directly from your Patron Account page.",
    tag: "Client Services",
  },
  {
    id: "faq-7",
    category: "editions",
    question: "How do I verify the authenticity of my VOID piece?",
    answer:
      "Every garment features an embroidered internal satin lot tag with a unique serial number and QR provenance chip that verifies genuine atelier production.",
    tag: "Provenance",
  },
];

type CategoryFilter = "all" | "textile" | "editions" | "shipping" | "care";

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({ "faq-1": true });

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (activeCategory === "all") return true;
    return item.category === activeCategory;
  });

  return (
    <section
      id="faq"
      className="relative w-full py-24 sm:py-32 px-6 sm:px-12 bg-[#F5F4F0] text-[#111111] border-t border-black/10 selection:bg-neutral-300 selection:text-black overflow-hidden"
    >
      {/* Subtle Background Radial Watermark */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 text-[180px] sm:text-[280px] font-bodoni-moda italic font-black text-black/[0.02] pointer-events-none select-none">
        VOID
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-black/10">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#B34728] animate-pulse" />
              <span className="text-xs font-mono tracking-[0.28em] text-neutral-500 uppercase">
                ATELIER KNOWLEDGE BASE
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-sans font-black tracking-tight text-black uppercase leading-[0.95]">
              FREQUENT INQUIRIES
            </h2>
            <p className="font-bodoni-moda italic text-xl sm:text-2xl text-neutral-600 mt-2">
              शू न्य · Clarity regarding textile architecture, fit blueprint, and logistics.
            </p>
          </div>

          {/* Quick Concierge CTA */}
          <div className="flex items-center gap-3">
            <a
              href="mailto:concierge@voidatelier.com"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-black hover:text-white border border-black/15 text-xs font-mono uppercase tracking-wider text-neutral-800 transition-all shadow-sm inline-flex items-center gap-2 group active:scale-95"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#B34728]" />
              <span>ASK CONCIERGE</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 sm:gap-3 py-6 overflow-x-auto no-scrollbar border-b border-black/5">
          {[
            { id: "all", label: "ALL INQUIRIES" },
            { id: "textile", label: "TEXTILE & FIT" },
            { id: "editions", label: "EDITIONS & ARCHIVE" },
            { id: "shipping", label: "DISPATCH & TRANSIT" },
            { id: "care", label: "GARMENT CARE" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as CategoryFilter)}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? "bg-black text-white shadow-md font-semibold"
                  : "bg-white/80 hover:bg-white text-neutral-600 border border-black/10 hover:border-black/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion FAQ List */}
        <div className="divide-y divide-black/10 mt-4">
          {filteredFaqs.map((item, idx) => {
            const isOpen = !!openIds[item.id];
            return (
              <div
                key={item.id}
                className="group py-6 sm:py-8 transition-colors duration-200"
              >
                {/* Question Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-start justify-between gap-6 text-left cursor-pointer select-none"
                >
                  <div className="flex items-start gap-4 sm:gap-6 flex-1">
                    <span className="font-mono text-xs text-neutral-400 pt-1 shrink-0">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <div>
                      {item.tag && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-black/5 text-neutral-600 font-mono text-[10px] uppercase tracking-wider mb-2">
                          {item.tag}
                        </span>
                      )}
                      <h3
                        className={`text-lg sm:text-2xl font-sans font-bold tracking-tight transition-colors duration-200 ${
                          isOpen ? "text-[#B34728]" : "text-black group-hover:text-neutral-700"
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  {/* Toggle Indicator Button */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-black text-white border-black rotate-180"
                        : "bg-white border-black/15 text-neutral-700 group-hover:border-black/40 group-hover:bg-neutral-100"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Animated Collapsible Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pl-10 sm:pl-16 pr-4 sm:pr-12">
                    <p className="text-sm sm:text-base text-neutral-700 font-sans leading-relaxed whitespace-pre-line border-l-2 border-[#B34728]/40 pl-4 py-1">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Concierge Assistance Card */}
        <div className="mt-16 p-8 sm:p-10 rounded-2xl bg-white border border-black/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6 text-[#B34728]" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-lg text-black uppercase tracking-tight">
                Require personalized assistance?
              </h4>
              <p className="font-bodoni-moda italic text-sm text-neutral-600 mt-0.5">
                Our Bombay atelier concierge is available for sizing recommendations, custom orders, and live tracking.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <a
              href="https://wa.me/919820044921"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 md:flex-none px-6 py-3 rounded-full bg-black hover:bg-neutral-800 text-white font-mono text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-95 text-center"
            >
              WHATSAPP CONCIERGE ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
