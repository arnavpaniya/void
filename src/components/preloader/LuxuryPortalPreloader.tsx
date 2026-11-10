"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { ArrowDown } from "lucide-react";

interface LuxuryPortalPreloaderProps {
  onComplete: () => void;
}

export function LuxuryPortalPreloader({ onComplete }: LuxuryPortalPreloaderProps) {
  const [progress, setProgress] = useState(0); // 0 (closed) to 1 (fully open)
  const [isOpening, setIsOpening] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const progressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);
  const touchStartY = useRef(0);

  // Smooth gate opening trigger
  const triggerOpen = useCallback(() => {
    if (isOpening || isCompleted) return;
    setIsOpening(true);

    const start = progressRef.current;
    const duration = 1000; // ms
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Luxurious ease-out curve (custom quartic)
      const ease = 1 - Math.pow(1 - t, 4);
      const current = start + (1 - start) * ease;

      progressRef.current = current;
      setProgress(current);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(1);
        setIsCompleted(true);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isOpening, isCompleted, onComplete]);

  // Handle wheel / scroll interaction
  useEffect(() => {
    if (isOpening || isCompleted) return;

    let deltaAccumulator = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      deltaAccumulator += Math.abs(e.deltaY);
      const currentVal = Math.min(0.65, deltaAccumulator / 200);
      progressRef.current = currentVal;
      setProgress(currentVal);

      if (deltaAccumulator > 90) {
        triggerOpen();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isOpening, isCompleted, triggerOpen]);

  // Handle mobile swipe/touch
  useEffect(() => {
    if (isOpening || isCompleted) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = Math.abs(currentY - touchStartY.current);
      if (deltaY > 40) {
        triggerOpen();
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isOpening, isCompleted, triggerOpen]);

  // Auto-open after 3.2 seconds so user is never blocked
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpening && !isCompleted) {
        triggerOpen();
      }
    }, 3200);
    return () => clearTimeout(timer);
  }, [isOpening, isCompleted, triggerOpen]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const leftTranslate = -progress * 101; // Slides cleanly left
  const rightTranslate = progress * 101; // Slides cleanly right

  return (
    <div
      onClick={triggerOpen}
      role="dialog"
      aria-label="Atelier Entrance"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-transparent cursor-pointer select-none transition-opacity duration-500 ${
        isCompleted ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* ================= 1. LEFT ARCHITECTURAL BONE DOOR ================= */}
      <div
        className="absolute top-0 bottom-0 left-0 w-1/2 bg-[#F5F4F0] border-r border-black/10 shadow-[10px_0_30px_rgba(0,0,0,0.06)] flex flex-col justify-between p-6 sm:p-12 z-20"
        style={{
          transform: `translate3d(${leftTranslate}%, 0, 0)`,
          transition: isOpening ? "none" : "transform 0.25s ease-out",
          willChange: "transform",
        }}
      >
        {/* Subtle Top Metadata */}
        <div className="flex items-center gap-2 text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B34728]" />
          <span>ATELIER BOMBAY</span>
        </div>

        {/* Center Editorial Typography */}
        <div className="my-auto text-right pr-2 sm:pr-8 space-y-2">
          <span className="text-4xl sm:text-6xl md:text-7xl font-sans font-black text-black tracking-tighter block uppercase">
            शून्य
          </span>
          <span className="text-xs sm:text-sm font-editorial-serif italic text-neutral-600 block">
            Architectural Silence
          </span>
        </div>

        {/* Bottom Textile Specs */}
        <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
          300 GSM COMBED COTTON
        </div>
      </div>

      {/* ================= 2. RIGHT ARCHITECTURAL BONE DOOR ================= */}
      <div
        className="absolute top-0 bottom-0 right-0 w-1/2 bg-[#F5F4F0] border-l border-black/10 shadow-[-10px_0_30px_rgba(0,0,0,0.06)] flex flex-col justify-between p-6 sm:p-12 z-20"
        style={{
          transform: `translate3d(${rightTranslate}%, 0, 0)`,
          transition: isOpening ? "none" : "transform 0.25s ease-out",
          willChange: "transform",
        }}
      >
        {/* Subtle Top Metadata */}
        <div className="text-right text-[10px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
          EDITIONS // MMXXVI
        </div>

        {/* Center Editorial Typography */}
        <div className="my-auto text-left pl-2 sm:pl-8 space-y-2">
          <span className="text-4xl sm:text-6xl md:text-7xl font-sans font-black text-black tracking-tighter block uppercase">
            VOID
          </span>
          <span className="text-xs sm:text-sm font-editorial-serif italic text-neutral-600 block">
            Wearable Artifacts
          </span>
        </div>

        {/* Bottom Textile Specs */}
        <div className="text-right text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
          MILLED IN TIRUPUR
        </div>
      </div>

      {/* ================= 3. CENTER MINIMALIST SEAL / KNOCKER ================= */}
      <div
        className="absolute z-30 flex items-center justify-center transition-all duration-500 ease-out pointer-events-none"
        style={{
          opacity: 1 - progress * 2.2,
          transform: `scale(${1 - progress * 0.3})`,
        }}
      >
        {/* Claymorphic Bone Seal */}
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-white to-[#EAE8E2] border border-black/10 shadow-[0_20px_45px_-8px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center p-3 text-center">
          <span className="text-[8px] font-mono tracking-[0.25em] text-[#B34728] uppercase font-bold">
            ARCHIVE
          </span>
          <span className="text-base sm:text-lg font-sans font-black tracking-widest text-black uppercase mt-0.5">
            VOID
          </span>
          <span className="text-[7px] font-mono tracking-widest text-neutral-400 uppercase mt-0.5">
            EST. 2024
          </span>
        </div>
      </div>

      {/* ================= 4. MINIMALIST BOTTOM INTERACTION PROMPT ================= */}
      <div
        className="absolute bottom-8 sm:bottom-12 z-30 flex flex-col items-center gap-3 transition-opacity duration-300 pointer-events-none"
        style={{ opacity: 1 - progress * 2.5 }}
      >
        <div className="px-5 py-2.5 rounded-full bg-white/90 border border-black/10 text-black font-mono text-[11px] font-bold tracking-[0.2em] uppercase shadow-[0_4px_16px_rgba(0,0,0,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.95)] flex items-center gap-2">
          <span>{isOpening ? "ENTERING ATELIER..." : "SCROLL OR TAP TO ENTER"}</span>
          <ArrowDown className="w-3 h-3 text-[#B34728] animate-bounce" />
        </div>

        <span className="text-[10px] font-mono tracking-widest text-neutral-400">
          {Math.round(progress * 100)}% UNSEALED
        </span>
      </div>
    </div>
  );
}

export default LuxuryPortalPreloader;
