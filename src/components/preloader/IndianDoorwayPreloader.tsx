"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";

interface IndianDoorwayPreloaderProps {
  onComplete: () => void;
}

export function IndianDoorwayPreloader({ onComplete }: IndianDoorwayPreloaderProps) {
  const [openProgress, setOpenProgress] = useState(0); // 0 (closed) to 1 (fully open)
  const [isOpening, setIsOpening] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // Play subtle cinematic temple gate rumble + brass chime via Web Audio
  const playGateAudio = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // Low wooden portal rumble
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(75, now);
      osc.frequency.exponentialRampToValueAtTime(32, now + 1.4);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.4);

      // Resonant brass knocker ring
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.type = "triangle";
      chime.frequency.setValueAtTime(380, now);
      chime.frequency.exponentialRampToValueAtTime(190, now + 1.6);
      chimeGain.gain.setValueAtTime(0.06, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
      chime.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chime.start(now);
      chime.stop(now + 1.6);
    } catch {
      // Audio autoplay policy fallback
    }
  }, []);

  // Trigger full gate opening sequence
  const triggerOpen = useCallback(() => {
    if (isOpening || isFinished) return;
    setIsOpening(true);
    playGateAudio();

    const startProgress = progressRef.current;
    const duration = 1250; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(1, elapsed / duration);
      // Quintic ease-out for luxurious heavy architectural momentum
      const ease = 1 - Math.pow(1 - t, 4);
      const current = startProgress + (1 - startProgress) * ease;
      
      progressRef.current = current;
      setOpenProgress(current);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setOpenProgress(1);
        setIsFinished(true);
        setTimeout(() => {
          onComplete();
        }, 300);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [isOpening, isFinished, onComplete, playGateAudio]);

  // Handle scroll / wheel interaction
  useEffect(() => {
    if (isOpening || isFinished) return;

    let accumulatedDelta = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulatedDelta += Math.abs(e.deltaY);

      // Interactive incremental preview opening as user scrolls
      const incremental = Math.min(0.35, accumulatedDelta / 220);
      progressRef.current = incremental;
      setOpenProgress(incremental);

      // Past 55px threshold, smoothly swing gates fully open
      if (accumulatedDelta > 55) {
        triggerOpen();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const delta = Math.abs(touchStartY - currentY);
      accumulatedDelta += delta;

      const incremental = Math.min(0.35, accumulatedDelta / 180);
      progressRef.current = incremental;
      setOpenProgress(incremental);

      if (accumulatedDelta > 45) {
        triggerOpen();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        triggerOpen();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isOpening, isFinished, triggerOpen]);

  // Transform values calculated from openProgress (0 to 1)
  const leftDoorAngle = openProgress * -108; // Swings inward to the left
  const rightDoorAngle = openProgress * 108; // Swings inward to the right
  const cameraScale = 1 + openProgress * 1.65; // Zoom in through the portal
  const lightOpacity = Math.sin(openProgress * Math.PI) * 0.95; // Golden burst
  const containerOpacity = openProgress > 0.82 ? Math.max(0, 1 - (openProgress - 0.82) / 0.18) : 1;

  return (
    <div
      ref={containerRef}
      onClick={triggerOpen}
      style={{ opacity: containerOpacity }}
      className={`fixed inset-0 z-[9999] flex flex-col justify-between bg-[#943826] text-[#F3EFE6] select-none overflow-hidden transition-opacity duration-300 cursor-pointer ${
        isFinished ? "pointer-events-none" : ""
      }`}
    >
      {/* Textured Indian Palace Wall Stucco Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 40%, rgba(30, 8, 4, 0.65) 100%),
            repeating-radial-gradient(circle at 0 0, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 100%)`,
          backgroundSize: "100% 100%, 8px 8px",
        }}
      />

      {/* Top Heritage Bar */}
      <header className="relative z-20 w-full px-6 sm:px-12 pt-7 pb-4 flex items-center justify-between text-xs font-mono tracking-widest text-[#F5EBE1]/80">
        <div className="flex items-center gap-2">
          <span className="font-sans font-bold uppercase tracking-[0.25em] text-[#FDFBF7]">
            VOID ARCHIVE
          </span>
          <span className="text-white/40">·</span>
          <span className="text-white/70">2026</span>
        </div>

        {/* Center Monogram / Brand mark */}
        <div className="flex items-center gap-2 font-bodoni-moda italic text-lg sm:text-2xl text-white tracking-wide">
          <span>शू न्य</span>
        </div>

        {/* Skip button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="hover:text-white uppercase tracking-widest transition-colors font-mono text-[11px] px-3 py-1 rounded bg-black/20 hover:bg-black/40 border border-white/10"
        >
          [SKIP ↵]
        </button>
      </header>

      {/* Central Portal Container with 3D Perspective */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-8">
        <div
          className="relative w-full max-w-[420px] sm:max-w-[480px] h-[580px] sm:h-[660px] flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `scale(${cameraScale})`,
            transformOrigin: "center 55%",
          }}
        >
          {/* Outer Cast Stone Architectural Frame (Molded White Marble/Limestone) */}
          <div className="absolute inset-0 rounded-t-xl bg-[#F4F1EA] p-3 sm:p-4 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.3)] border-2 border-[#E5DFD1]">
            {/* Inner Molded Step */}
            <div className="w-full h-full rounded-t-lg bg-[#EAE5DA] p-2.5 sm:p-3 shadow-[inset_0_4px_8px_rgba(0,0,0,0.35)] border border-[#D5CEBF] relative overflow-hidden">
              
              {/* Spandrel Background: Royal Lapis Indigo (Matching user reference photo!) */}
              <div className="absolute inset-0 bg-[#284869]">
                {/* Carved Marble Vine Scrollwork (Jali) in Spandrel corners */}
                <svg
                  viewBox="0 0 400 240"
                  className="absolute top-0 inset-x-0 w-full h-[180px] sm:h-[200px] pointer-events-none"
                  fill="none"
                  stroke="#F8F6F0"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* Left Spandrel Acanthus Scroll & Foliage */}
                  <path
                    d="M 50 170 Q 75 110, 130 90 Q 170 78, 195 55"
                    strokeWidth="3.2"
                  />
                  <path d="M 90 125 Q 70 120, 62 135 Q 75 145, 95 130" fill="#F8F6F0" fillOpacity="0.8" />
                  <path d="M 125 105 Q 110 90, 115 75 Q 130 80, 132 98" fill="#F8F6F0" fillOpacity="0.8" />
                  <path d="M 160 88 Q 155 70, 170 65 Q 175 80, 165 88" fill="#F8F6F0" fillOpacity="0.8" />
                  <circle cx="68" cy="165" r="3.5" fill="#F8F6F0" />
                  <circle cx="105" cy="115" r="3.5" fill="#F8F6F0" />
                  <circle cx="145" cy="85" r="3.5" fill="#F8F6F0" />

                  {/* Right Spandrel Acanthus Scroll & Foliage */}
                  <path
                    d="M 350 170 Q 325 110, 270 90 Q 230 78, 205 55"
                    strokeWidth="3.2"
                  />
                  <path d="M 310 125 Q 330 120, 338 135 Q 325 145, 305 130" fill="#F8F6F0" fillOpacity="0.8" />
                  <path d="M 275 105 Q 290 90, 285 75 Q 270 80, 268 98" fill="#F8F6F0" fillOpacity="0.8" />
                  <path d="M 240 88 Q 245 70, 230 65 Q 225 80, 235 88" fill="#F8F6F0" fillOpacity="0.8" />
                  <circle cx="332" cy="165" r="3.5" fill="#F8F6F0" />
                  <circle cx="295" cy="115" r="3.5" fill="#F8F6F0" />
                  <circle cx="255" cy="85" r="3.5" fill="#F8F6F0" />

                  {/* Central Lotus Finial / Crest */}
                  <path
                    d="M 200 40 C 190 55, 195 65, 200 70 C 205 65, 210 55, 200 40 Z"
                    fill="#F8F6F0"
                    strokeWidth="1.5"
                  />
                  <path d="M 188 56 C 182 65, 192 70, 198 68" strokeWidth="2" />
                  <path d="M 212 56 C 218 65, 208 70, 202 68" strokeWidth="2" />
                </svg>

                {/* White Molded Cusped Arch Rim (Multi-foil Rajput / Mughal Torana) */}
                <svg
                  viewBox="0 0 400 600"
                  className="absolute inset-0 w-full h-full pointer-events-none drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                >
                  {/* Outer White Arch Relief Molding */}
                  <path
                    d="M 46 600 L 46 260 A 28 28 0 0 1 55 212 A 28 28 0 0 1 80 167 A 28 28 0 0 1 118 129 A 28 28 0 0 1 162 100 A 28 28 0 0 1 200 75 A 28 28 0 0 1 238 100 A 28 28 0 0 1 282 129 A 28 28 0 0 1 320 167 A 28 28 0 0 1 345 212 A 28 28 0 0 1 354 260 L 354 600"
                    fill="none"
                    stroke="#FBF9F4"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  {/* Inner Stone Carving Chamfer */}
                  <path
                    d="M 50 600 L 50 260 A 26 26 0 0 1 58 215 A 26 26 0 0 1 82 172 A 26 26 0 0 1 118 136 A 26 26 0 0 1 160 108 A 26 26 0 0 1 200 85 A 26 26 0 0 1 240 108 A 26 26 0 0 1 282 136 A 26 26 0 0 1 318 172 A 26 26 0 0 1 342 215 A 26 26 0 0 1 350 260 L 350 600"
                    fill="none"
                    stroke="#D9D2C3"
                    strokeWidth="4"
                  />
                </svg>
              </div>

              {/* 3D Gate Viewport Behind the Arch */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{
                  perspective: "1400px",
                  perspectiveOrigin: "50% 55%",
                }}
              >
                {/* Gateway Inner Sanctuary / Hero Peek (Revealed when doors swing open) */}
                <div className="absolute inset-0 bg-[#0E0D0C] flex flex-col items-center justify-center overflow-hidden">
                  {/* Atmospheric Light Burst */}
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-[#F5F4F0] via-[#FAF8F5] to-[#E6E1D5] pointer-events-none transition-opacity duration-300"
                    style={{ opacity: 0.35 + openProgress * 0.65 }}
                  />
                  <div
                    className="absolute w-[360px] h-[360px] rounded-full bg-amber-100/40 blur-[80px] pointer-events-none"
                    style={{ opacity: lightOpacity }}
                  />

                  {/* Sanctuary Architectural Glimpse */}
                  <div className="relative z-10 flex flex-col items-center text-center p-6">
                    <span className="font-bodoni-moda italic text-3xl sm:text-4xl text-[#111111] tracking-wide mb-2">
                      V O I D
                    </span>
                    <span className="font-mono text-xs tracking-[0.3em] uppercase text-neutral-600">
                      ENTER THE ATELIER
                    </span>
                  </div>
                </div>

                {/* 3D DOUBLE DOORS CONTAINER */}
                <div className="absolute inset-0 w-full h-full flex">
                  {/* LEFT DOOR */}
                  <div
                    className="relative w-1/2 h-full"
                    style={{
                      transformOrigin: "0% 50%",
                      transform: `rotateY(${leftDoorAngle}deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      transition: isOpening ? "none" : "transform 0.15s ease-out",
                    }}
                  >
                    {/* Left Gate Facade */}
                    <svg
                      viewBox="0 0 150 515"
                      className="w-full h-full object-cover filter drop-shadow-[5px_0_12px_rgba(0,0,0,0.45)]"
                      style={{
                        position: "absolute",
                        top: "14.2%",
                        left: "12.5%",
                        width: "75%",
                        height: "85.8%",
                      }}
                    >
                      <defs>
                        {/* Soft blush pink terracotta wood grain gradient (matching reference!) */}
                        <linearGradient id="doorWoodLeft" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#C47D75" />
                          <stop offset="50%" stopColor="#D48E86" />
                          <stop offset="100%" stopColor="#BE766E" />
                        </linearGradient>
                        <clipPath id="leftDoorClip">
                          <path d="M 0 515 L 0 175 A 26 26 0 0 1 8 130 A 26 26 0 0 1 32 87 A 26 26 0 0 1 68 51 A 26 26 0 0 1 110 23 A 26 26 0 0 1 150 0 L 150 515 Z" />
                        </clipPath>
                        {/* Text curved path for PESH KARTE HAIN / VOID */}
                        <path
                          id="leftArchTextPath"
                          d="M 12 145 Q 60 75, 140 25"
                          fill="none"
                        />
                      </defs>

                      <g clipPath="url(#leftDoorClip)">
                        {/* Main Wood Body */}
                        <rect x="0" y="0" width="150" height="515" fill="url(#doorWoodLeft)" />

                        {/* Vertical Wood Planks */}
                        <line x1="38" y1="0" x2="38" y2="515" stroke="#A85F57" strokeWidth="1.5" />
                        <line x1="75" y1="0" x2="75" y2="515" stroke="#A85F57" strokeWidth="1.5" />
                        <line x1="112" y1="0" x2="112" y2="515" stroke="#A85F57" strokeWidth="1.5" />

                        {/* Top Scalloped Arch Text (PESH KARTE HAIN) */}
                        <text
                          fill="#FFFFFF"
                          fontSize="13"
                          fontFamily="Bodoni Moda, serif"
                          fontStyle="italic"
                          letterSpacing="2"
                        >
                          <textPath href="#leftArchTextPath" startOffset="30%">
                            PESH KARTE
                          </textPath>
                        </text>

                        {/* Structural Horizontal Iron / Bronze Bracing Bars */}
                        {[160, 310, 460].map((y) => (
                          <g key={y}>
                            {/* Bar with beveled shadow */}
                            <rect x="0" y={y} width="150" height="12" fill="#5A3A35" />
                            <rect x="0" y={y + 1} width="150" height="2" fill="#7A524C" />
                            {/* Studs along bar */}
                            <circle cx="20" cy={y + 6} r="3.2" fill="#D4AF37" stroke="#8C6D23" strokeWidth="0.8" />
                            <circle cx="58" cy={y + 6} r="3.2" fill="#D4AF37" stroke="#8C6D23" strokeWidth="0.8" />
                            <circle cx="95" cy={y + 6} r="3.2" fill="#D4AF37" stroke="#8C6D23" strokeWidth="0.8" />
                            <circle cx="132" cy={y + 6} r="3.2" fill="#D4AF37" stroke="#8C6D23" strokeWidth="0.8" />
                          </g>
                        ))}

                        {/* Brass Studs / Gulab Nails along vertical meeting stile */}
                        {[60, 100, 210, 260, 360, 410].map((y) => (
                          <circle
                            key={y}
                            cx="140"
                            cy={y}
                            r="3"
                            fill="#E6C665"
                            stroke="#8C6D23"
                            strokeWidth="0.8"
                          />
                        ))}

                        {/* Left Antique Brass Rosette & Ring Door Knocker */}
                        <g transform="translate(105, 230)">
                          {/* Flower Backplate */}
                          <circle r="12" fill="#D4AF37" stroke="#7A5816" strokeWidth="1.2" />
                          <circle r="7" fill="#F0DC82" />
                          <circle r="3" fill="#6A4C12" />
                          {/* Hanging Knocker Ring */}
                          <circle
                            cx="0"
                            cy="12"
                            r="8.5"
                            fill="none"
                            stroke="#E5C158"
                            strokeWidth="3.2"
                            className="filter drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)]"
                          />
                        </g>

                        {/* Meeting edge shadow strip */}
                        <rect x="146" y="0" width="4" height="515" fill="#422521" opacity="0.6" />
                      </g>
                    </svg>
                  </div>

                  {/* RIGHT DOOR */}
                  <div
                    className="relative w-1/2 h-full"
                    style={{
                      transformOrigin: "100% 50%",
                      transform: `rotateY(${rightDoorAngle}deg)`,
                      transformStyle: "preserve-3d",
                      backfaceVisibility: "hidden",
                      transition: isOpening ? "none" : "transform 0.15s ease-out",
                    }}
                  >
                    {/* Right Gate Facade */}
                    <svg
                      viewBox="0 0 150 515"
                      className="w-full h-full object-cover filter drop-shadow-[-5px_0_12px_rgba(0,0,0,0.45)]"
                      style={{
                        position: "absolute",
                        top: "14.2%",
                        right: "12.5%",
                        width: "75%",
                        height: "85.8%",
                      }}
                    >
                      <defs>
                        <linearGradient id="doorWoodRight" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#BE766E" />
                          <stop offset="50%" stopColor="#D48E86" />
                          <stop offset="100%" stopColor="#C47D75" />
                        </linearGradient>
                        <clipPath id="rightDoorClip">
                          <path d="M 0 0 A 26 26 0 0 1 40 23 A 26 26 0 0 1 82 51 A 26 26 0 0 1 118 87 A 26 26 0 0 1 142 130 A 26 26 0 0 1 150 175 L 150 515 L 0 515 Z" />
                        </clipPath>
                        <path
                          id="rightArchTextPath"
                          d="M 10 25 Q 90 75, 138 145"
                          fill="none"
                        />
                      </defs>

                      <g clipPath="url(#rightDoorClip)">
                        <rect x="0" y="0" width="150" height="515" fill="url(#doorWoodRight)" />

                        {/* Vertical Wood Planks */}
                        <line x1="38" y1="0" x2="38" y2="515" stroke="#A85F57" strokeWidth="1.5" />
                        <line x1="75" y1="0" x2="75" y2="515" stroke="#A85F57" strokeWidth="1.5" />
                        <line x1="112" y1="0" x2="112" y2="515" stroke="#A85F57" strokeWidth="1.5" />

                        {/* Top Scalloped Arch Text (HAIN // VOID) */}
                        <text
                          fill="#FFFFFF"
                          fontSize="13"
                          fontFamily="Bodoni Moda, serif"
                          fontStyle="italic"
                          letterSpacing="2"
                        >
                          <textPath href="#rightArchTextPath" startOffset="15%">
                            HAIN · VOID
                          </textPath>
                        </text>

                        {/* Horizontal Bracing Bars */}
                        {[160, 310, 460].map((y) => (
                          <g key={y}>
                            <rect x="0" y={y} width="150" height="12" fill="#5A3A35" />
                            <rect x="0" y={y + 1} width="150" height="2" fill="#7A524C" />
                            <circle cx="18" cy={y + 6} r="3.2" fill="#D4AF37" stroke="#8C6D23" strokeWidth="0.8" />
                            <circle cx="55" cy={y + 6} r="3.2" fill="#D4AF37" stroke="#8C6D23" strokeWidth="0.8" />
                            <circle cx="92" cy={y + 6} r="3.2" fill="#D4AF37" stroke="#8C6D23" strokeWidth="0.8" />
                            <circle cx="130" cy={y + 6} r="3.2" fill="#D4AF37" stroke="#8C6D23" strokeWidth="0.8" />
                          </g>
                        ))}

                        {/* Brass Studs along meeting stile */}
                        {[60, 100, 210, 260, 360, 410].map((y) => (
                          <circle
                            key={y}
                            cx="10"
                            cy={y}
                            r="3"
                            fill="#E6C665"
                            stroke="#8C6D23"
                            strokeWidth="0.8"
                          />
                        ))}

                        {/* Right Antique Brass Rosette & Ring Door Knocker */}
                        <g transform="translate(45, 230)">
                          <circle r="12" fill="#D4AF37" stroke="#7A5816" strokeWidth="1.2" />
                          <circle r="7" fill="#F0DC82" />
                          <circle r="3" fill="#6A4C12" />
                          <circle
                            cx="0"
                            cy="12"
                            r="8.5"
                            fill="none"
                            stroke="#E5C158"
                            strokeWidth="3.2"
                            className="filter drop-shadow-[0_4px_3px_rgba(0,0,0,0.5)]"
                          />
                        </g>

                        {/* Left meeting edge shadow */}
                        <rect x="0" y="0" width="4" height="515" fill="#422521" opacity="0.6" />
                      </g>
                    </svg>
                  </div>
                </div>

                {/* Interactive Breathing Badge on the doors */}
                <div
                  className="absolute bottom-16 sm:bottom-20 inset-x-0 flex items-center justify-center pointer-events-none transition-opacity duration-300"
                  style={{ opacity: Math.max(0, 1 - openProgress * 3.5) }}
                >
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 text-[#FAF7F0] font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase shadow-lg animate-pulse">
                    <span>✦ SCROLL OR TAP TO ENTER ✦</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Heritage Colophon */}
      <footer className="relative z-20 w-full px-6 sm:px-12 pb-7 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-[#F5EBE1]/70">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E5C158] animate-ping" />
          <span className="tracking-widest uppercase">
            ROYAL PORTAL · BOMBAY ATELIER
          </span>
        </div>
        <div className="tracking-widest uppercase text-[11px] text-white/50">
          TOUCH OR SCROLL DOWN TO OPEN THE GATES
        </div>
      </footer>
    </div>
  );
}

export default IndianDoorwayPreloader;
