"use client";

import React, { useState, useEffect } from "react";

export interface GarmentTarget {
  x: number; // Percentage on t-shirt
  y: number; // Percentage on t-shirt
  direction: "left" | "right";
  label: string;
}

export interface RackGarment {
  id: string;
  name: string;
  editionCode: string;
  collection: string;
  frontImage: string; // The front-facing graphic cutout provided by user
  sideImage: string;  // The authentic side-hanging garment on the rail
  targets: GarmentTarget[];
}

export const RACK_GARMENTS: RackGarment[] = [
  {
    id: "rack-01-chrome-eye",
    name: "OCULUS METALLIC TANK",
    editionCode: "EDITION 01 // ARCHIVE",
    collection: "VOID // OCCULT CHROME",
    frontImage: "/images/rack/tshirt-chrome-eye.png",
    sideImage: "/images/rack/side_garment_black.png",
    targets: [
      {
        x: 52,
        y: 44,
        direction: "right",
        label: "3D Chrome Silicone",
      },
      {
        x: 24,
        y: 35,
        direction: "left",
        label: "280 GSM Mineral Jersey",
      },
    ],
  },
  {
    id: "rack-02-cyber-muse",
    name: "SYNTHWAVE FREQUENCY TEE",
    editionCode: "EDITION 02 // ARCHIVE",
    collection: "VOID // NEO-TOKYO NIGHTS",
    frontImage: "/images/rack/tshirt-cyber-muse.png",
    sideImage: "/images/rack/side_garment_white.png",
    targets: [
      {
        x: 52,
        y: 45,
        direction: "right",
        label: "90s Anime Halftone",
      },
      {
        x: 24,
        y: 35,
        direction: "left",
        label: "300 GSM Combed Jersey",
      },
    ],
  },
  {
    id: "rack-03-toxic-desire",
    name: "TOXIC 21 SPICE TEE",
    editionCode: "EDITION 03 // ARCHIVE",
    collection: "VOID // DESI GRUNGE CH. II",
    frontImage: "/images/rack/tshirt-toxic-desire.png",
    sideImage: "/images/rack/side_garment_espresso.png",
    targets: [
      {
        x: 52,
        y: 44,
        direction: "right",
        label: "Cracked Plastisol + Foil",
      },
      {
        x: 24,
        y: 35,
        direction: "left",
        label: "300 GSM Vintage Pigment Dye",
      },
    ],
  },
  {
    id: "rack-04-midnight-drift",
    name: "MIDNIGHT DRIFT S13 TEE",
    editionCode: "EDITION 04 // ARCHIVE",
    collection: "VOID // TOUGE SPEED LAB",
    frontImage: "/images/rack/tshirt-midnight-drift.png",
    sideImage: "/images/rack/side_garment_black.png",
    targets: [
      {
        x: 52,
        y: 48,
        direction: "right",
        label: "Touge Drift Graphic",
      },
      {
        x: 24,
        y: 35,
        direction: "left",
        label: "320 GSM Carbon Cotton",
      },
    ],
  },
  {
    id: "rack-05-gothic-cross",
    name: "SANCTUARY AIRBRUSH LONG-SLEEVE",
    editionCode: "EDITION 05 // ARCHIVE",
    collection: "VOID // CATHEDRAL RELICS",
    frontImage: "/images/rack/tshirt-gothic-cross.png",
    sideImage: "/images/rack/side_garment_ecru.png",
    targets: [
      {
        x: 50,
        y: 46,
        direction: "right",
        label: "Baroque Chrome Cross",
      },
      {
        x: 24,
        y: 34,
        direction: "left",
        label: "340 GSM French Terry",
      },
      {
        x: 22,
        y: 72,
        direction: "left",
        label: "Raw Laser Cuffs & Hem",
      },
    ],
  },
  {
    id: "rack-06-fallen-angel",
    name: "MADE IN SEVEN CHERUB TEE",
    editionCode: "EDITION 06 // ARCHIVE",
    collection: "VOID // BAROQUE CATHARSIS",
    frontImage: "/images/rack/tshirt-fallen-angel.png",
    sideImage: "/images/rack/side_garment_charcoal.png",
    targets: [
      {
        x: 52,
        y: 46,
        direction: "right",
        label: "Seraphim Discharge",
      },
      {
        x: 24,
        y: 35,
        direction: "left",
        label: "300 GSM Pumice Stone Wash",
      },
    ],
  },
  {
    id: "rack-07-take-time",
    name: "CHRONOS PUFF TYPE TEE",
    editionCode: "EDITION 07 // ARCHIVE",
    collection: "VOID // HYPNOTIC MINDS",
    frontImage: "/images/rack/tshirt-take-time.png",
    sideImage: "/images/rack/side_garment_black.png",
    targets: [
      {
        x: 52,
        y: 46,
        direction: "right",
        label: "2.8mm 3D Puff Type",
      },
      {
        x: 24,
        y: 35,
        direction: "left",
        label: "300 GSM Carbon Black Jersey",
      },
    ],
  },
  {
    id: "rack-08-grand-prix",
    name: "FORMULA SPEED MONO TEE",
    editionCode: "EDITION 08 // ARCHIVE",
    collection: "VOID // APEX AERODYNAMICS",
    frontImage: "/images/rack/tshirt-grand-prix.png",
    sideImage: "/images/rack/side_garment_ecru.png",
    targets: [
      {
        x: 52,
        y: 48,
        direction: "right",
        label: "Formula Ground-Effect",
      },
      {
        x: 24,
        y: 35,
        direction: "left",
        label: "280 GSM Natural Ecru",
      },
    ],
  },
  {
    id: "rack-09-cross-flesh",
    name: "DE PROFUNDIS FLESH CROSS TEE",
    editionCode: "EDITION 09 // ARCHIVE",
    collection: "VOID // MEMENTO MORI",
    frontImage: "/images/rack/tshirt-cross-flesh.png",
    sideImage: "/images/rack/side_garment_charcoal.png",
    targets: [
      {
        x: 52,
        y: 46,
        direction: "right",
        label: "Sepia Anatomical Cross",
      },
      {
        x: 24,
        y: 35,
        direction: "left",
        label: "300 GSM Vintage Acid Wash",
      },
    ],
  },
];

interface GarmentRackSectionProps {
  onSelectEdition?: (edition: any) => void;
  onQuickAdd?: (edition: any, size: string) => void;
  currency?: "INR" | "USD";
}

// Minimalist Radar Reticle with Sequential Animated Draw & Clean Badges
function RadarTargetCallout({
  target,
  index = 0,
}: {
  target: GarmentTarget;
  index: number;
}) {
  const isRight = target.direction === "right";

  // Stagger delays per target so they draw sequentially after garment lands
  const baseDelay = 340 + index * 160; // ms
  const dotDelay = `${baseDelay}ms`;
  const lineDelay = `${baseDelay + 140}ms`;
  const badgeDelay = `${baseDelay + 260}ms`;

  return (
    <div
      className="absolute pointer-events-none z-30 select-none"
      style={{ left: `${target.x}%`, top: `${target.y}%` }}
    >
      <div className="relative flex items-center">
        {/* Reticle Dot with Pop Animation */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-black/25 backdrop-blur-[2px] border border-black/40 shadow-sm opacity-0"
          style={{
            animation: `reticleDotPop 380ms cubic-bezier(0.16, 1, 0.3, 1) ${dotDelay} forwards`,
          }}
        >
          <div className="w-2 h-2 rounded-full bg-[#111111] border border-white" />
        </div>

        {/* Horizontal Line & Minimal Label */}
        <div
          className={`absolute top-0 -translate-y-1/2 flex items-center ${
            isRight ? "left-0 flex-row" : "right-0 flex-row-reverse"
          }`}
        >
          {/* Horizontal Line with Draw Animation */}
          <div
            className="w-12 sm:w-16 md:w-24 h-[1.5px] bg-[#111111] shrink-0 opacity-0"
            style={{
              transformOrigin: isRight ? "left" : "right",
              animation: `reticleLineDraw 360ms cubic-bezier(0.16, 1, 0.3, 1) ${lineDelay} forwards`,
            }}
          />

          {/* Minimal Tag with Reveal Animation */}
          <div
            className={`whitespace-nowrap select-none opacity-0 ${
              isRight ? "pl-2 text-left" : "pr-2 text-right"
            }`}
            style={{
              animation: `reticleBadgeReveal 320ms cubic-bezier(0.16, 1, 0.3, 1) ${badgeDelay} forwards`,
              // @ts-ignore
              "--badge-slide-from": isRight ? "-8px" : "8px",
            }}
          >
            <span className="text-[10px] sm:text-[11px] font-mono font-bold text-[#111111] uppercase tracking-wider bg-white/95 px-2 py-0.5 rounded shadow-sm border border-black/15">
              {target.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Front-facing Brushed Chrome Hanger for Pulled Garment
function HangerFrontFacing() {
  return (
    <div className="relative w-full flex justify-center pointer-events-none drop-shadow-[0_6px_12px_rgba(0,0,0,0.3)]">
      <svg
        viewBox="0 0 240 85"
        className="w-full h-auto max-w-[190px] overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="chromeHookMetalFront" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#cbd5e1" />
            <stop offset="50%" stopColor="#64748b" />
            <stop offset="75%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          <linearGradient id="hangerShoulderWoodFront" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2c2c2c" />
            <stop offset="35%" stopColor="#181818" />
            <stop offset="75%" stopColor="#222222" />
            <stop offset="100%" stopColor="#0d0d0d" />
          </linearGradient>
        </defs>

        <path
          d="M120 38 V18 C120 6 135 1 145 8 C152 14 147 24 139 24"
          stroke="url(#chromeHookMetalFront)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="120" cy="38" rx="5" ry="2.4" fill="url(#chromeHookMetalFront)" />
        <rect x="117" y="36" width="6" height="5" rx="1.5" fill="url(#chromeHookMetalFront)" stroke="#334155" strokeWidth="0.5" />

        <path
          d="M120 40 C92 44 54 56 14 72 C13 73 17 76 21 75 C54 63 87 53 120 53 C153 53 186 63 219 75 C223 76 227 73 226 72 C186 56 148 44 120 40 Z"
          fill="url(#hangerShoulderWoodFront)"
          stroke="#111111"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
}

export function GarmentRackSection({}: GarmentRackSectionProps) {
  // Triple the set so one half is 27 items (~2,700px wide, exceeding any 4K screen width)
  const SINGLE_CYCLE = [...RACK_GARMENTS, ...RACK_GARMENTS, ...RACK_GARMENTS];
  // Two identical halves for a mathematically flawless 100% seamless infinite loop
  const LOOP_ITEMS = [...SINGLE_CYCLE, ...SINGLE_CYCLE];

  const [pulledGarment, setPulledGarment] = useState<RackGarment | null>(null);
  const [hoveredGarmentId, setHoveredGarmentId] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && pulledGarment) {
        setPulledGarment(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pulledGarment]);

  const handleGarmentClick = (garment: RackGarment) => {
    if (pulledGarment?.id === garment.id) {
      setPulledGarment(null);
    } else {
      setPulledGarment(garment);
    }
  };

  return (
    <section className="relative w-full py-16 bg-[#F5F4F0] text-[#111111] overflow-hidden select-none border-y border-[#E2DDD3]">
      {/* --- SINGLE LINE IN BUBBLE FONT ONLY: Fades out and slides up when garment is inspected --- */}
      <div
        className={`relative max-w-7xl mx-auto px-6 mb-10 text-center z-10 transition-all duration-500 ease-out ${
          pulledGarment ? "opacity-0 -translate-y-8 pointer-events-none" : "opacity-100 translate-y-0"
        }`}
      >
        <h2 className="font-candy-inc text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#111111] tracking-wide select-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.06)] leading-tight">
          Latest Collection
        </h2>
      </div>

      {/* --- FULL-BLEED STUDIO STEEL RAIL & CLOTHES RACK (SPANS 100% ACROSS THE SCREEN) --- */}
      <div className="relative w-full overflow-visible pt-2 pb-12">
        {/* Continuous Full-Bleed Dark Steel Pipe Running Edge-to-Edge Across Viewport */}
        <div className="relative w-full z-20">
          <div className="relative w-full h-[14px] flex items-center">
            {/* Ambient Cylindrical Shadow under rail */}
            <div className="absolute top-[10px] left-0 right-0 h-4 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />

            {/* Seamless Industrial Matte Steel Pipe spanning full screen width */}
            <div className="relative w-full h-[12px] bg-gradient-to-b from-[#383838] via-[#1a1a1a] via-45% via-[#0f0f0f] to-[#050505] shadow-[0_4px_12px_rgba(0,0,0,0.35),0_1px_1px_rgba(255,255,255,0.25)_inset]">
              {/* Brushed Metallic Apex Glint running full screen */}
              <div className="absolute top-0 left-0 right-0 h-[1.8px] bg-white/35" />
              {/* Subtle lower reflection */}
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10" />
            </div>
          </div>
        </div>

        {/* --- CONTINUOUS SLIDING CLOTHES: TIGHT SPACING, SUBSTANTIAL SIZE, SEAMLESS LOOP --- */}
        <div
          className={`relative w-full overflow-visible -mt-2 pt-0 pb-4 transition-all duration-500 ${
            pulledGarment ? "filter blur-[6px] opacity-20 pointer-events-none" : ""
          }`}
        >
          <div
            className="flex items-start will-change-transform py-1"
            style={{
              width: "max-content",
              animation: "rackMarqueeSlide 46s linear infinite",
              animationPlayState: pulledGarment ? "paused" : "running",
            }}
          >
            {LOOP_ITEMS.map((garment, idx) => {
              const isHovered = hoveredGarmentId === `${garment.id}-${idx}`;

              return (
                <div
                  key={`${garment.id}-${idx}`}
                  className="group relative flex-shrink-0 w-[92px] sm:w-[108px] md:w-[120px] -mr-1 sm:-mr-2 cursor-pointer select-none transition-all duration-300 ease-out flex flex-col items-center"
                  style={{
                    zIndex: isHovered ? 40 : 10,
                  }}
                  onMouseEnter={() => setHoveredGarmentId(`${garment.id}-${idx}`)}
                  onMouseLeave={() => setHoveredGarmentId(null)}
                  onClick={() => handleGarmentClick(garment)}
                >
                  {/* Clean Side-Profile Hanging Garment (Real folds, sleeve draped down, hook over rod) */}
                  <div
                    className="relative w-full flex flex-col items-center transition-all duration-300 ease-out"
                    style={{
                      transform: isHovered
                        ? "scale(1.08) translateY(-10px)"
                        : "scale(1.0)",
                    }}
                  >
                    <img
                      src={garment.sideImage}
                      alt={garment.name}
                      className="w-full h-auto max-h-[460px] sm:max-h-[500px] md:max-h-[540px] object-contain drop-shadow-[0_14px_28px_rgba(0,0,0,0.26)]"
                      loading="eager"
                    />
                  </div>

                  {/* Clean Hover Indicator */}
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                    <span className="px-2 py-0.5 rounded-full bg-[#111111] text-white text-[9px] font-mono tracking-wider shadow-md">
                      {garment.name.split(" ")[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- IN-SECTION INSPECTION STAGE (SAME SECTION, SLIGHT SCALE, ZERO OVERLAP) --- */}
        {pulledGarment && (
          <div
            className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#F5F4F0]/70 backdrop-blur-[6px] transition-all duration-500 cursor-pointer pt-6"
            onClick={() => setPulledGarment(null)}
          >
            {/* The Taken-Out T-Shirt in Same Sizing (Slightly Scaled, Smooth Stage Entrance) */}
            <div
              className="relative w-[280px] sm:w-[320px] md:w-[360px] pointer-events-auto my-auto"
              style={{
                animation: "garmentStageEnter 420ms cubic-bezier(0.16, 1, 0.3, 1) forwards",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setPulledGarment(null); // Click shirt to hang back
              }}
            >
              {/* Front Hanger */}
              <div className="w-[170px] sm:w-[190px] mx-auto z-20 relative">
                <HangerFrontFacing />
              </div>

              {/* T-Shirt Front Image with Full Graphic Art */}
              <div className="relative w-full -mt-5">
                <img
                  src={pulledGarment.frontImage}
                  alt={pulledGarment.name}
                  className="w-full h-auto max-h-[420px] object-contain drop-shadow-[0_24px_50px_rgba(0,0,0,0.32)]"
                />

                {/* Minimal Radar Reticle Lines with Sequential Draw Animations */}
                {pulledGarment.targets.map((target, idx) => (
                  <RadarTargetCallout
                    key={`${pulledGarment.id}-${idx}`}
                    target={target}
                    index={idx}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
