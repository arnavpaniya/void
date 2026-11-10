"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface ModelSlide {
  id: string;
  name: string;
  image: string;
  verticalWord: string;
  slidingGlyphs: string[];
}

const EDITORIAL_MODEL: ModelSlide = {
  id: "model-01",
  name: "EDITORIAL VISUAL",
  image: "/images/editorial_model.jpg",
  verticalWord: "VOID",
  slidingGlyphs: [
    "DIMUOI",
    "VOID // ARCHIVE",
    "LOT 01 · 300 GSM",
    "TIRUPUR MILL SPEC",
    "COORD: 18.9220°N",
    "HIGH DENSITY INK",
    "ARCHITECTURAL DRAPE",
  ],
};

export function AvantGardeEditorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [textSlideOffset, setTextSlideOffset] = useState(50);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth automatic oscillation of typography
  useEffect(() => {
    let animId: number;
    const start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) * 0.001;
      const offset = 50 + Math.sin(elapsed * 1.4) * 35;
      setTextSlideOffset(offset);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full py-16 px-4 sm:px-8 lg:px-12 bg-[#F5F4F0] text-[#111111] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Pure Visual Editorial Stage without outer controls clutter */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/10] rounded-3xl overflow-hidden bg-[#EAE8E2] border border-black/10 shadow-xl flex items-center justify-center">
          {/* Background High-Fashion Photography */}
          <div className="absolute inset-0 z-0">
            <Image
              src={EDITORIAL_MODEL.image}
              alt={EDITORIAL_MODEL.name}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out"
              style={{
                transform: `scale(1.03) translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 0)`,
              }}
              priority
            />
          </div>

          {/* Typography sliding organically across the garment */}
          <div
            className="absolute inset-0 z-10 pointer-events-none mix-blend-multiply flex flex-col justify-center items-start px-6 sm:px-16 space-y-4 sm:space-y-6"
            style={{
              transform: `translate3d(${((textSlideOffset - 50) * 4) + mousePos.x * 20}px, ${mousePos.y * 10}px, 0)`,
            }}
          >
            {EDITORIAL_MODEL.slidingGlyphs.map((glyph, i) => (
              <div
                key={i}
                className="flex items-center gap-3 overflow-hidden"
                style={{
                  transform: `translateX(${(i % 2 === 0 ? 1 : -1) * ((textSlideOffset - 50) * 1.5)}px)`,
                  opacity: 0.85 + (i * 0.02),
                }}
              >
                <div className="flex items-center gap-0.5 h-6 opacity-75">
                  {[...Array(6)].map((_, barIdx) => (
                    <span
                      key={barIdx}
                      className="w-0.5 bg-black"
                      style={{ height: `${8 + (barIdx * 3)}px` }}
                    />
                  ))}
                </div>

                <span
                  className="font-mono text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-black selection:bg-transparent"
                  style={{
                    letterSpacing: `${0.04 + (i * 0.015)}em`,
                  }}
                >
                  {glyph}
                </span>
              </div>
            ))}
          </div>

          {/* Monolith Vertical Wordmark */}
          <div className="absolute right-8 sm:right-16 inset-y-0 z-10 flex items-center justify-center pointer-events-none mix-blend-overlay">
            <span
              className="font-sans font-black text-6xl sm:text-8xl md:text-9xl text-white select-none opacity-40 uppercase"
              style={{
                writingMode: "vertical-rl",
                transform: "scaleY(1.3)",
                letterSpacing: "-0.04em",
              }}
            >
              {EDITORIAL_MODEL.verticalWord}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AvantGardeEditorial;