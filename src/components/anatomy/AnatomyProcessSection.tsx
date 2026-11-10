"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Gauge, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export type ProcessStageId = "stitching" | "printing" | "washing" | "checking" | "packaging";

interface ProcessStage {
  id: ProcessStageId;
  stepNumber: string;
  figNumber: string;
  title: string;
  subtitle: string;
  leadTime: string;
  tolerance: string;
  primaryColor: string;
  accentColor: string;
  badge: string;
  readout: string;
  telemetry: {
    label: string;
    value: string;
    unit: string;
  }[];
  caption: string;
  keys: {
    color: string;
    label: string;
  }[];
  notes: string[];
}

const PROCESS_STAGES: ProcessStage[] = [
  {
    id: "stitching",
    stepNumber: "01",
    figNumber: "FIG 01",
    title: "Structural Seam & Needle Reciprocation",
    subtitle: "Precision Twin-Needle Arm & 300 GSM Combed Jersey Feed",
    leadTime: "14.2 min / garment",
    tolerance: "± 0.5 mm seam margin",
    primaryColor: "#2563EB", // Cobalt Blue
    accentColor: "#F59E0B", // Amber Gold
    badge: "NEEDLE GAUGE 110/18",
    readout: "1,420 SPM · 8.0 SPI · Tension 3.8 N · Seam Allowance 6.0 mm",
    telemetry: [
      { label: "Stitch Speed", value: "1,420", unit: "SPM" },
      { label: "Stitch Density", value: "8.0", unit: "SPI" },
      { label: "Thread Tension", value: "3.8", unit: "N" },
      { label: "Feed Step", value: "3.17", unit: "mm" },
    ],
    caption:
      "Heavy industrial twin-needle head with reciprocating chrome needle bar. Dual high-twist Egyptian cotton spools pass through calibrated emerald tension discs into a 1.25-inch rib neckband. Feed dogs advance the 300 GSM Tirupur combed cotton with micro-metric stitch consistency.",
    keys: [
      { color: "#1E293B", label: "Cast Iron Head Body" },
      { color: "#2563EB", label: "Cobalt Thread Cone" },
      { color: "#F59E0B", label: "Amber Reinforcing Thread" },
      { color: "#94A3B8", label: "Ground Chrome Needle Bar" },
      { color: "#10B981", label: "Dual Rotary Tension Dials" },
    ],
    notes: [
      "Twin-needle topstitch locks the 1.25-inch ribbed collar against neckline baconing.",
      "Ballpoint needle prevents shearing individual combed jersey fibers during high-speed piercing.",
      "Differential feed timing eliminates wave distortions across dense 300 GSM knit fabric.",
    ],
  },
  {
    id: "printing",
    stepNumber: "02",
    figNumber: "FIG 02",
    title: "High-Density Screenprint Pigment Press",
    subtitle: "Linear Carriage & 75° Polyurethane Squeegee Shear",
    leadTime: "3.5 min / 3 passes",
    tolerance: "0.1 mm registration",
    primaryColor: "#0284C7", // Cyan Teal
    accentColor: "#EF4444", // Vermillion Ink
    badge: "72T MONOFILAMENT MESH",
    readout: "Carriage 320 mm/s · Squeegee 75.0° · Viscosity 18,500 cP · Stroke 02/03",
    telemetry: [
      { label: "Carriage Velocity", value: "320", unit: "mm/s" },
      { label: "Blade Angle", value: "75.0", unit: "deg" },
      { label: "Paste Viscosity", value: "18.5", unit: "k cP" },
      { label: "Pneumatic Load", value: "4.8", unit: "Bar" },
    ],
    caption:
      "Ground linear guide rails support a dual-arm pneumatic squeegee carriage. Archival water-based pigment is hand-pulled through high-tension 72T Japanese monofilament mesh at a strict 75° blade shear angle. Pigment penetrates into the combed yarn matrix without rubbery plastisol build-up.",
    keys: [
      { color: "#CA8A04", label: "Anodized Aluminum Screen Frame" },
      { color: "#0284C7", label: "Linear Carriage Saddle" },
      { color: "#EF4444", label: "High-Density Archival Pigment" },
      { color: "#F97316", label: "75 Shore A Polyurethane Blade" },
      { color: "#64748B", label: "Precision Ground Guide Rods" },
    ],
    notes: [
      "Triple-pass ink deposition achieves vibrant visual opacity without stiffening the cotton drape.",
      "Thermal tunnel flash-cure at 165°C cross-links pigment binder directly into cellulose fibers.",
      "Zero cracking or chalking through 50+ home laundry cycles.",
    ],
  },
  {
    id: "washing",
    stepNumber: "03",
    figNumber: "FIG 03",
    title: "Hydro-Agitation & Preshrink Immersion",
    subtitle: "40°C Botanical Wash Tank & Zero-Shrinkage Stability",
    leadTime: "32 min cycle",
    tolerance: "< 0.5% warp shrinkage",
    primaryColor: "#06B6D4", // Hydro Cyan
    accentColor: "#F43F5E", // Thermal Amber
    badge: "40°C CONTROLLED THERMAL",
    readout: "Bath 40.2°C · Agitator 48 RPM · Flow 14.6 L/min · Residual Warp Shrink 0.0%",
    telemetry: [
      { label: "Water Temp", value: "40.2", unit: "°C" },
      { label: "Paddle Speed", value: "48", unit: "RPM" },
      { label: "Flow Velocity", value: "14.6", unit: "L/min" },
      { label: "Stability Delta", value: "0.00", unit: "%" },
    ],
    caption:
      "Stainless cylindrical wash vessel equipped with an oscillating copper agitation impeller and mineral water bath. Continuous temperature regulation at 40.2°C releases natural fiber tension, completing 100% of fabric preshrink before any garment is cut or tagged.",
    keys: [
      { color: "#0F766E", label: "Vat Shell & Baffle Plate" },
      { color: "#06B6D4", label: "Mineral Immersion Fluid" },
      { color: "#F43F5E", label: "Thermal Induction Coil" },
      { color: "#D97706", label: "Copper Impeller Paddle" },
      { color: "#38BDF8", label: "Sight Level Gauge & Drain" },
    ],
    notes: [
      "Preshrunk via industrial hydro-tumbling so the customer experiences zero size change after washing.",
      "Enzyme rinse strips yarn impurities for a broken-in, luxurious hand feel on skin.",
      "Closed-loop water recycling station filters 94% of bath fluid for subsequent lots.",
    ],
  },
  {
    id: "checking",
    stepNumber: "04",
    figNumber: "FIG 04",
    title: "Dial Test Indicator Tolerancing & QA",
    subtitle: "Granite Surface Comparator & Collar Recovery Calibration",
    leadTime: "100% piece inspection",
    tolerance: "± 0.02 mm deviation",
    primaryColor: "#10B981", // Emerald Green
    accentColor: "#EAB308", // Calibrated Yellow
    badge: "0.01 MM GRADUATION",
    readout: "Collar Recovery 99.4% · Deviation +0.012 mm · Caliper 0.88 mm · Status: PASS",
    telemetry: [
      { label: "Recovery Rate", value: "99.4", unit: "%" },
      { label: "Indicator Runout", value: "+0.012", unit: "mm" },
      { label: "Fabric Caliper", value: "0.88", unit: "mm" },
      { label: "QA Verdict", value: "PASS", unit: "VERIFIED" },
    ],
    caption:
      "Grade-A black granite surface plate with magnetic stand and precision dial test indicator. A ruby-tipped contact point applies calibrated 0.6 N force against the neckband seam to measure structural knit recovery, thickness variance, and hem alignment.",
    keys: [
      { color: "#27272A", label: "Grade-A Granite Surface Plate" },
      { color: "#DC2626", label: "Magnetic Base Switch" },
      { color: "#F8FAFC", label: "Dial Face & Jeweled Needle" },
      { color: "#10B981", label: "Acceptable Tolerance Band" },
      { color: "#CBD5E1", label: "Chrome Column & Collar Clamp" },
    ],
    notes: [
      "Every single garment undergoes full 14-point tactile and dimensional audit.",
      "Any variance exceeding ± 1.5 mm in chest width or hem drop is rejected to secondary archive.",
      "Collar elasticity test verifies full shape retention after 20 continuous stretch pulls.",
    ],
  },
  {
    id: "packaging",
    stepNumber: "05",
    figNumber: "FIG 05",
    title: "Archival Packaging & Express Dispatch",
    subtitle: "Precision Folding Jig, Debossed VOID Seal & Optical Scan",
    leadTime: "1.2 min / parcel",
    tolerance: "Air Courier Dispatch",
    primaryColor: "#8B5CF6", // Purple / Violet
    accentColor: "#EF4444", // Optical Laser Red
    badge: "ARCHIVAL KRAFT RIG",
    readout: "Box 380×280×45 mm · Blue Dart AWB #84920 · Seal Pressure 6.2 kN · Status: READY",
    telemetry: [
      { label: "AWB Number", value: "84920", unit: "BLUE DART" },
      { label: "Box Caliper", value: "450", unit: "GSM" },
      { label: "Stamp Load", value: "6.2", unit: "kN" },
      { label: "Barcode Scan", value: "100", unit: "% OK" },
    ],
    caption:
      "A pneumatic jig folds the garment with geometric symmetry into acid-free archival black packaging. An embossed hydraulic VOID seal plate marks the tamper seal, while an oscillating red laser barcode scanner links the package to live Blue Dart express air dispatch tracking.",
    keys: [
      { color: "#1E293B", label: "Matte Black Archival Box" },
      { color: "#FBBF24", label: "Embossed Gold VOID Seal" },
      { color: "#EF4444", label: "Optical Laser Scan Beam" },
      { color: "#3B82F6", label: "Pneumatic Folding Guide Arm" },
      { color: "#EAB308", label: "Roller Bed Guide Ticks" },
    ],
    notes: [
      "100% biodegradable FSC-certified archival charcoal presentation box.",
      "Garment enveloped in translucent unbleached glassine parchment to block UV and moisture.",
      "Direct live integration with Blue Dart & DHL Express for automated door-to-door transit.",
    ],
  },
];

export function AnatomyProcessSection() {
  const [activeStageId, setActiveStageId] = useState<ProcessStageId>("stitching");
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);
  const [manualTrigger, setManualTrigger] = useState(0);

  const activeStage = PROCESS_STAGES.find((s) => s.id === activeStageId) || PROCESS_STAGES[0];

  // Auto-tour timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStageId((prevId) => {
        const currentIndex = PROCESS_STAGES.findIndex((s) => s.id === prevId);
        const nextIndex = (currentIndex + 1) % PROCESS_STAGES.length;
        return PROCESS_STAGES[nextIndex].id;
      });
    }, 7000 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const handlePrev = () => {
    const idx = PROCESS_STAGES.findIndex((s) => s.id === activeStageId);
    const prevIdx = (idx - 1 + PROCESS_STAGES.length) % PROCESS_STAGES.length;
    setActiveStageId(PROCESS_STAGES[prevIdx].id);
  };

  const handleNext = () => {
    const idx = PROCESS_STAGES.findIndex((s) => s.id === activeStageId);
    const nextIdx = (idx + 1) % PROCESS_STAGES.length;
    setActiveStageId(PROCESS_STAGES[nextIdx].id);
  };

  return (
    <section id="process" className="relative w-full py-24 px-4 sm:px-8 lg:px-12 bg-[#0A0A0C] text-neutral-100 border-t border-white/10 overflow-hidden">
      {/* Background Blueprint Grid Texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>THE ATELIER ANATOMY · CRAFTSMANSHIP & RIGS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
              HOW WE WORK <span className="text-blue-500 font-light">//</span> STEP BY STEP
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Every garment is engineered across five isolated, high-precision workstations in our Tirupur atelier.
              Explore the animated isometric machines below—each with true mechanical motions, tolerances, and live calibrated telemetry.
            </p>
          </div>

          {/* Master Station Controls */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-neutral-900 border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition-all ${
                  isPlaying ? "bg-blue-600 text-white font-bold" : "text-neutral-400 hover:text-white"
                }`}
                title={isPlaying ? "Pause Automated Station Tour" : "Resume Automated Station Tour"}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? "AUTO TOUR" : "PAUSED"}</span>
              </button>

              <button
                onClick={() => setPlaybackSpeed((s) => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
                className="px-2.5 py-1.5 text-[11px] font-mono text-neutral-400 hover:text-white transition-colors"
                title="Cycle Animation Playback Rate"
              >
                {playbackSpeed}x
              </button>
            </div>

            <div className="flex items-center gap-1 bg-neutral-900 border border-white/10 rounded-lg p-1">
              <button
                onClick={handlePrev}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded transition-colors"
                title="Previous Workstation"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono px-2 text-neutral-300">
                {activeStage.stepNumber} / 05
              </span>
              <button
                onClick={handleNext}
                className="p-1.5 text-neutral-400 hover:text-white hover:bg-white/5 rounded transition-colors"
                title="Next Workstation"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Workstation Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {PROCESS_STAGES.map((stage) => {
            const isActive = stage.id === activeStageId;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  setActiveStageId(stage.id);
                  setIsPlaying(false);
                }}
                className={`relative flex flex-col p-4 rounded-xl border text-left transition-all duration-300 ${
                  isActive
                    ? "bg-neutral-900/90 border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/50"
                    : "bg-neutral-950/60 border-white/5 hover:border-white/20 hover:bg-neutral-900/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[10px] font-mono font-bold tracking-widest ${
                      isActive ? "text-blue-400" : "text-neutral-500"
                    }`}
                  >
                    STAGE {stage.stepNumber}
                  </span>
                  <span
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isActive ? stage.primaryColor : "#333",
                      boxShadow: isActive ? `0 0 8px ${stage.primaryColor}` : "none",
                    }}
                  />
                </div>
                <h4 className="text-sm font-bold text-white uppercase tracking-tight font-sans">
                  {stage.title.split("&")[0].trim()}
                </h4>
                <span className="text-[11px] font-mono text-neutral-400 mt-1 line-clamp-1">
                  {stage.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Workstation Stage Rig Card */}
        <div className="relative rounded-2xl bg-[#111114] border border-white/10 shadow-2xl overflow-hidden">
          {/* Machine Plate Corner Badges */}
          <div className="px-6 py-4 bg-neutral-950/80 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-blue-500/20 text-blue-400 font-mono text-xs font-bold border border-blue-500/30">
                {activeStage.figNumber}
              </span>
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-white font-sans">
                {activeStage.title}
              </h3>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
              <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-white/5 border border-white/5">
                {activeStage.leadTime}
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                {activeStage.tolerance}
              </span>
            </div>
          </div>

          {/* Main Visual Arena: Interactive Colored Isometric Machine SVG */}
          <div className="relative w-full min-h-[460px] sm:min-h-[520px] bg-gradient-to-b from-[#141418] via-[#0E0E12] to-[#0A0A0C] flex items-center justify-center p-4 sm:p-8">
            {/* Live SVG Machine Canvas */}
            <div className="w-full max-w-4xl mx-auto aspect-[16/10] relative flex items-center justify-center">
              {activeStageId === "stitching" && (
                <StitchingMachineVisual
                  playbackSpeed={playbackSpeed}
                  trigger={manualTrigger}
                />
              )}
              {activeStageId === "printing" && (
                <ScreenprintMachineVisual
                  playbackSpeed={playbackSpeed}
                  trigger={manualTrigger}
                />
              )}
              {activeStageId === "washing" && (
                <HydroWashMachineVisual
                  playbackSpeed={playbackSpeed}
                  trigger={manualTrigger}
                />
              )}
              {activeStageId === "checking" && (
                <DialQAMachineVisual
                  playbackSpeed={playbackSpeed}
                  trigger={manualTrigger}
                />
              )}
              {activeStageId === "packaging" && (
                <PackagingDispatchVisual
                  playbackSpeed={playbackSpeed}
                  trigger={manualTrigger}
                />
              )}
            </div>

            {/* Interactive Machine Trigger Button (Bottom Center Overlay) */}
            <div className="absolute bottom-6 right-6 sm:right-8 flex items-center gap-3">
              <button
                onClick={() => setManualTrigger((t) => t + 1)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold tracking-wide shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all active:scale-95"
              >
                <Zap className="w-3.5 h-3.5 fill-white" />
                <span>
                  {activeStageId === "stitching"
                    ? "CYCLE NEEDLE"
                    : activeStageId === "printing"
                    ? "PULL SQUEEGEE"
                    : activeStageId === "washing"
                    ? "AGITATE TANK"
                    : activeStageId === "checking"
                    ? "MEASURE CALIPER"
                    : "FIRE LASER SCAN"}
                </span>
              </button>
            </div>

            {/* Live Readout Overlay (Bottom Left) */}
            <div className="absolute bottom-6 left-6 sm:left-8 pointer-events-none max-w-md hidden sm:block">
              <div className="font-mono text-[11px] text-neutral-400 bg-neutral-950/80 px-3 py-1.5 rounded-md border border-white/10 backdrop-blur-md">
                <span className="text-blue-400 font-bold mr-2">LIVE READOUT:</span>
                <span>{activeStage.readout}</span>
              </div>
            </div>
          </div>

          {/* Telemetry Strip & Specifications */}
          <div className="p-6 bg-neutral-950/90 border-t border-white/10">
            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {activeStage.telemetry.map((t, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-neutral-900/60 border border-white/5 space-y-1">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                    {t.label}
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl sm:text-2xl font-black font-mono text-white tracking-tight">
                      {t.value}
                    </span>
                    <span className="text-xs font-mono text-blue-400">
                      {t.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Explanatory Technical Notes & Swatch Legend */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2 border-t border-white/5">
              <div className="lg:col-span-2 space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  CRAFTSMANSHIP SPECIFICATION
                </h5>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {activeStage.caption}
                </p>
                <ul className="space-y-1.5 pt-2">
                  {activeStage.notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-neutral-400 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Color Swatch Legend */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  APPARATUS SCHEMATIC KEYS
                </h5>
                <div className="space-y-2 pt-1">
                  {activeStage.keys.map((k, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-neutral-400 font-mono">
                      <span
                        className="w-3 h-3 rounded-sm flex-shrink-0 border border-white/20"
                        style={{ backgroundColor: k.color }}
                      />
                      <span className="line-clamp-1">{k.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// =========================================================================
// 01. STITCHING MACHINE VISUAL (Reciprocating Needle, Thread Cones, Feed Dogs)
// Vibrant Colors: Industrial Petrol Slate, Cobalt Blue Thread, Amber Thread, Chrome Bar
// =========================================================================
function StitchingMachineVisual({
  playbackSpeed,
  trigger,
}: {
  playbackSpeed: number;
  trigger: number;
}) {
  const [needlePos, setNeedlePos] = useState(0);
  const [stitchCounter, setStitchCounter] = useState(0);

  useEffect(() => {
    let animId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) * 0.006 * playbackSpeed;
      // High-speed reciprocating motion with sinusoidal harmonic
      const y = Math.sin(elapsed) * 22;
      setNeedlePos(y);
      setStitchCounter(Math.floor(elapsed * 2));
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [playbackSpeed, trigger]);

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-2xl overflow-visible">
      <defs>
        {/* Gradients for Vivid Machine Finishes */}
        <linearGradient id="petrolSteel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>

        <linearGradient id="cobaltSpool" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1D4ED8" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>

        <linearGradient id="amberSpool" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        <linearGradient id="chromeNeedle" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F8FAFC" />
          <stop offset="40%" stopColor="#CBD5E1" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        <linearGradient id="cottonFabric" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5F5F0" />
          <stop offset="100%" stopColor="#D4D4CE" />
        </linearGradient>
      </defs>

      {/* Heavy Base Surface Plate (Chamfered Isometric Slab) */}
      <polygon points="120,380 480,240 700,340 340,480" fill="#18181B" stroke="#27272A" strokeWidth="2" />
      <polygon points="120,380 340,480 340,500 120,400" fill="#09090B" stroke="#27272A" strokeWidth="1" />
      <polygon points="340,480 700,340 700,360 340,500" fill="#121214" stroke="#27272A" strokeWidth="1" />

      {/* Surface Plate Tick Marks & Rulers */}
      {Array.from({ length: 16 }).map((_, i) => {
        const x1 = 180 + i * 16;
        const y1 = 360 - i * 6;
        return (
          <line key={i} x1={x1} y1={y1} x2={x1 + 10} y2={y1 + 5} stroke="#3B82F6" strokeWidth={i % 4 === 0 ? "1.5" : "0.7"} opacity="0.6" />
        );
      })}

      {/* 300 GSM Heavyweight Combed Cotton Fabric Feed Panel */}
      <polygon points="220,340 500,240 590,280 310,380" fill="url(#cottonFabric)" stroke="#A8A29E" strokeWidth="1.5" />
      <polygon points="310,380 590,280 590,290 310,390" fill="#B8B2A8" stroke="#78716C" strokeWidth="1" />

      {/* Stitched Seam Line along the fabric */}
      <path
        d="M 270,325 L 535,225"
        stroke="#2563EB"
        strokeWidth="2.5"
        strokeDasharray="5,4"
        strokeLinecap="round"
      />
      <path
        d="M 275,328 L 540,228"
        stroke="#F59E0B"
        strokeWidth="2"
        strokeDasharray="5,4"
        strokeLinecap="round"
      />

      {/* Machine Main Casting Arm Body (Vibrant Petrol Steel) */}
      {/* Vertical Post */}
      <polygon points="460,180 540,140 580,160 500,200" fill="url(#petrolSteel)" stroke="#475569" strokeWidth="1.5" />
      <polygon points="460,180 500,200 500,310 460,290" fill="#0F172A" stroke="#334155" strokeWidth="1" />
      <polygon points="500,200 580,160 580,270 500,310" fill="#1E293B" stroke="#334155" strokeWidth="1" />

      {/* Horizontal Cantilever Arm extending toward needle */}
      <polygon points="270,140 470,80 510,100 310,160" fill="url(#petrolSteel)" stroke="#475569" strokeWidth="2" />
      <polygon points="270,140 310,160 310,210 270,190" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      <polygon points="310,160 510,100 510,150 310,210" fill="#0F172A" stroke="#334155" strokeWidth="1" />

      {/* VOID Engraved Badge on Arm */}
      <polygon points="340,145 420,120 420,135 340,160" fill="#2563EB" opacity="0.9" />
      <text x="350" y="152" fill="#FFFFFF" fontSize="9" fontWeight="bold" fontFamily="monospace" transform="skewY(-15)">
        VOID // 1420
      </text>

      {/* Dual Thread Spool Stands (Cobalt & Amber) */}
      {/* Cobalt Spool */}
      <rect x="495" y="45" width="24" height="42" rx="4" fill="url(#cobaltSpool)" stroke="#1D4ED8" strokeWidth="1.5" />
      <circle cx="507" cy="45" r="12" fill="#3B82F6" stroke="#93C5FD" strokeWidth="1" />
      <line x1="507" y1="30" x2="507" y2="90" stroke="#CBD5E1" strokeWidth="2.5" />

      {/* Amber Spool */}
      <rect x="535" y="65" width="24" height="42" rx="4" fill="url(#amberSpool)" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="547" cy="65" r="12" fill="#F59E0B" stroke="#FDE68A" strokeWidth="1" />
      <line x1="547" y1="50" x2="547" y2="110" stroke="#CBD5E1" strokeWidth="2.5" />

      {/* Thread Tension Dials (Emerald Green) */}
      <circle cx="370" cy="175" r="9" fill="#059669" stroke="#34D399" strokeWidth="1.5" />
      <circle cx="370" cy="175" r="4" fill="#047857" />
      <line x1="370" y1="170" x2="370" y2="180" stroke="#FFFFFF" strokeWidth="1" />

      <circle cx="395" cy="165" r="9" fill="#059669" stroke="#34D399" strokeWidth="1.5" />
      <circle cx="395" cy="165" r="4" fill="#047857" />
      <line x1="395" y1="160" x2="395" y2="170" stroke="#FFFFFF" strokeWidth="1" />

      {/* Thread Path Lines flowing into Head */}
      <path d="M 507,45 Q 430,70 370,175" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3,2" />
      <path d="M 547,65 Q 450,90 395,165" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3,2" />
      <path d="M 370,175 Q 330,200 300,230" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      <path d="M 395,165 Q 335,210 304,233" fill="none" stroke="#FBBF24" strokeWidth="1.5" />

      {/* Machine Head Nose Cylinder */}
      <polygon points="260,180 300,165 300,235 260,250" fill="url(#petrolSteel)" stroke="#475569" strokeWidth="1.5" />

      {/* Presser Foot (Spring-Loaded Steel Clamping Cotton) */}
      <rect x="290" y="275" width="18" height="35" rx="2" fill="#64748B" stroke="#94A3B8" strokeWidth="1.2" />
      <polygon points="285,310 315,300 310,312 280,322" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />

      {/* Reciprocating Chrome Needle Bar & Double Needle (Animated Y) */}
      <g transform={`translate(0, ${needlePos})`}>
        {/* Needle Bar Clamp */}
        <rect x="272" y="210" width="8" height="60" rx="2" fill="url(#chromeNeedle)" stroke="#E2E8F0" strokeWidth="1" />
        <rect x="268" y="260" width="16" height="10" rx="1" fill="#D97706" stroke="#B45309" strokeWidth="1" />

        {/* Dual Needles */}
        <line x1="273" y1="270" x2="273" y2="310" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <line x1="279" y1="268" x2="279" y2="308" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

        {/* Needle Eye Thread Loop Indicator */}
        <circle cx="273" cy="305" r="2" fill="#2563EB" />
        <circle cx="279" cy="303" r="2" fill="#F59E0B" />
      </g>

      {/* Needle Piercing Spark / High-Speed Impact Burst */}
      {needlePos > 18 && (
        <g>
          <circle cx="273" cy="328" r="4" fill="#60A5FA" opacity="0.8" />
          <line x1="268" y1="324" x2="263" y2="320" stroke="#60A5FA" strokeWidth="1.5" />
          <line x1="278" y1="324" x2="283" y2="320" stroke="#FBBF24" strokeWidth="1.5" />
        </g>
      )}

      {/* Real-Time Stitch Counter Tag */}
      <g transform="translate(620, 100)">
        <rect x="0" y="0" width="120" height="48" rx="6" fill="#09090B" stroke="#2563EB" strokeWidth="1.5" />
        <text x="12" y="20" fill="#94A3B8" fontSize="10" fontFamily="monospace">STITCH COUNT</text>
        <text x="12" y="38" fill="#38BDF8" fontSize="16" fontWeight="bold" fontFamily="monospace">
          {(14200 + stitchCounter).toLocaleString()}
        </text>
      </g>
    </svg>
  );
}

// =========================================================================
// 02. SCREENPRINTING PIGMENT PRESS (Linear Rails, Carriage, 75° Squeegee)
// Vibrant Colors: Anodized Gold Frame, Teal Carriage, Vermillion/Cobalt Ink
// =========================================================================
function ScreenprintMachineVisual({
  playbackSpeed,
  trigger,
}: {
  playbackSpeed: number;
  trigger: number;
}) {
  const [carriageX, setCarriageX] = useState(0);
  const [squeegeeTilt, setSqueegeeTilt] = useState(75);

  useEffect(() => {
    let animId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const t = (now - start) * 0.0015 * playbackSpeed;
      // Linear stroke back and forth across 180px span
      const sinT = Math.sin(t);
      const x = sinT * 110;
      setCarriageX(x);
      // Tilt angle shifts from 75° to 65° depending on direction of stroke
      setSqueegeeTilt(Math.cos(t) > 0 ? 75 : -75);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [playbackSpeed, trigger]);

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-2xl overflow-visible">
      <defs>
        {/* Frame Gold Anodized Finish */}
        <linearGradient id="goldAnodized" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EAB308" />
          <stop offset="50%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>

        {/* Teal Carriage Aluminum */}
        <linearGradient id="tealCarriage" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#0369A1" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        {/* Vivid Cobalt/Vermillion Ink Sheen */}
        <linearGradient id="inkSheen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="70%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>

        <pattern id="meshGrid" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M 6 0 L 0 0 0 6" fill="none" stroke="#F59E0B" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>

      {/* Printing Bed Granite Table (Isometric Slab) */}
      <polygon points="100,340 500,190 720,290 320,440" fill="#18181B" stroke="#27272A" strokeWidth="2" />
      <polygon points="100,340 320,440 320,460 100,360" fill="#09090B" stroke="#27272A" strokeWidth="1" />
      <polygon points="320,440 720,290 720,310 320,460" fill="#121214" stroke="#27272A" strokeWidth="1" />

      {/* Combed Cotton Garment Panel on Bed */}
      <polygon points="180,310 480,200 620,270 320,380" fill="#292524" stroke="#44403C" strokeWidth="1.5" />

      {/* Freshly Printed VOID Typography Emblem onto the Cotton */}
      <g transform="translate(350, 270) skewY(-15) skewX(25)">
        <text x="0" y="0" fill="#3B82F6" fontSize="38" fontWeight="900" letterSpacing="2" fontFamily="sans-serif">
          VOID
        </text>
        <text x="5" y="16" fill="#F59E0B" fontSize="12" fontWeight="bold" letterSpacing="4" fontFamily="monospace">
          ATELIER // TIRUPUR
        </text>
      </g>

      {/* Twin Ground Guide Rods (Polished Stainless) */}
      <polygon points="130,280 470,150 485,155 145,285" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
      <polygon points="260,375 600,245 615,250 275,380" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />

      {/* Screen Frame (Anodized Gold Aluminum) */}
      <polygon points="160,280 500,150 660,230 320,360" fill="url(#meshGrid)" stroke="url(#goldAnodized)" strokeWidth="6" />

      {/* Frame Corner Clamp Knobs (Brass) */}
      <circle cx="160" cy="280" r="7" fill="#EAB308" stroke="#713F12" strokeWidth="1.5" />
      <circle cx="500" cy="150" r="7" fill="#EAB308" stroke="#713F12" strokeWidth="1.5" />
      <circle cx="660" cy="230" r="7" fill="#EAB308" stroke="#713F12" strokeWidth="1.5" />
      <circle cx="320" cy="360" r="7" fill="#EAB308" stroke="#713F12" strokeWidth="1.5" />

      {/* Fresh Pigment Bead / Reservoir on Mesh */}
      <path
        d="M 230,290 Q 380,230 540,175"
        stroke="url(#inkSheen)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />

      {/* Traversing Squeegee Linear Carriage (Dynamic position carriageX) */}
      <g transform={`translate(${carriageX * 1.3}, ${-carriageX * 0.5})`}>
        {/* Carriage Gantry Arm */}
        <polygon points="280,270 420,215 440,225 300,280" fill="url(#tealCarriage)" stroke="#0284C7" strokeWidth="2" />
        <polygon points="280,270 300,280 300,320 280,310" fill="#0369A1" />
        <polygon points="300,280 440,225 440,265 300,320" fill="#075985" />

        {/* Pneumatic Cylinder Clamps (Chrome & Emerald) */}
        <rect x="320" y="210" width="14" height="40" rx="3" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="1" />
        <circle cx="327" cy="215" r="4" fill="#10B981" />

        <rect x="385" y="185" width="14" height="40" rx="3" fill="#94A3B8" stroke="#E2E8F0" strokeWidth="1" />
        <circle cx="392" cy="190" r="4" fill="#10B981" />

        {/* Polyurethane Squeegee Blade (Vivid Amber / Orange, 75 Shore A) */}
        <polygon
          points="275,310 435,250 430,268 270,328"
          fill="#F97316"
          stroke="#EA580C"
          strokeWidth="1.5"
        />

        {/* Ink Wave Pushed by Blade Tip */}
        <path
          d="M 270,328 Q 350,295 430,268"
          stroke="#2563EB"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Live Pressure Dial on Carriage */}
        <circle cx="355" cy="235" r="11" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
        <circle cx="355" cy="235" r="3" fill="#EF4444" />
        <line x1="355" y1="235" x2="361" y2="230" stroke="#FFFFFF" strokeWidth="1.5" />
      </g>

      {/* Screen Mesh Specification Box */}
      <g transform="translate(80, 80)">
        <rect x="0" y="0" width="150" height="52" rx="6" fill="#09090B" stroke="#0284C7" strokeWidth="1.5" />
        <text x="12" y="20" fill="#94A3B8" fontSize="9" fontFamily="monospace">SCREEN SPEC</text>
        <text x="12" y="38" fill="#38BDF8" fontSize="14" fontWeight="bold" fontFamily="monospace">
          72T POLYESTER
        </text>
      </g>
    </svg>
  );
}

// =========================================================================
// 03. HYDRO-AGITATION WASHING TANK (Fluid Vortex, Thermal Coil, Preshrinking)
// Vibrant Colors: Industrial Teal Shell, Cyan Water, Crimson Thermal Coil, Brass Valves
// =========================================================================
function HydroWashMachineVisual({
  playbackSpeed,
  trigger,
}: {
  playbackSpeed: number;
  trigger: number;
}) {
  const [fluidPhase, setFluidPhase] = useState(0);

  useEffect(() => {
    let animId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) * 0.003 * playbackSpeed;
      setFluidPhase(elapsed);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [playbackSpeed, trigger]);

  const rippleOffset = Math.sin(fluidPhase * 2) * 6;

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-2xl overflow-visible">
      <defs>
        {/* Teal Vat Shell */}
        <linearGradient id="vatTeal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#134E4A" />
          <stop offset="40%" stopColor="#0F766E" />
          <stop offset="80%" stopColor="#115E59" />
          <stop offset="100%" stopColor="#042F2E" />
        </linearGradient>

        {/* Cyan Mineral Fluid */}
        <linearGradient id="hydroFluid" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#0284C7" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0369A1" stopOpacity="0.95" />
        </linearGradient>

        {/* Thermal Induction Heat Glow */}
        <radialGradient id="thermalGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#DC2626" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#991B1B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Bench Platform (Isometric Slate) */}
      <polygon points="120,380 480,240 700,340 340,480" fill="#18181B" stroke="#27272A" strokeWidth="2" />
      <polygon points="120,380 340,480 340,500 120,400" fill="#09090B" stroke="#27272A" />
      <polygon points="340,480 700,340 700,360 340,500" fill="#121214" stroke="#27272A" />

      {/* Heavy Cylindrical Immersion Vat (Teal Metal) */}
      {/* Vat Back Interior */}
      <ellipse cx="400" cy="200" rx="160" ry="70" fill="#042F2E" stroke="#0F766E" strokeWidth="2" />

      {/* Radiant Immersion Thermal Coil (Crimson Red / Heated Copper) */}
      <g>
        <path
          d="M 330,220 C 370,250 430,250 470,220 C 430,190 370,190 330,220"
          fill="none"
          stroke="#EF4444"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="400" cy="220" r="30" fill="url(#thermalGlow)" opacity={0.6 + Math.sin(fluidPhase * 3) * 0.25} />
      </g>

      {/* Swirling Agitation Vortex Fluid Surface */}
      <g transform={`translate(0, ${rippleOffset})`}>
        <ellipse cx="400" cy="205" rx="150" ry="65" fill="url(#hydroFluid)" stroke="#38BDF8" strokeWidth="2" />
        {/* Vortex Wave Eddies */}
        <path
          d="M 300,205 Q 400,230 500,205 Q 400,185 300,205"
          fill="none"
          stroke="#E0F2FE"
          strokeWidth="1.5"
          strokeDasharray="8,6"
          opacity="0.8"
        />
        <circle cx="360" cy="200" r="3" fill="#FFFFFF" opacity="0.7" />
        <circle cx="430" cy="210" r="4" fill="#FFFFFF" opacity="0.6" />
        <circle cx="410" cy="195" r="2.5" fill="#FFFFFF" opacity="0.8" />
      </g>

      {/* Immersed 300 GSM Cotton Fabric Swatch Tumbling in Agitation */}
      <polygon
        points="350,210 430,190 450,225 370,240"
        fill="#F5F5F4"
        stroke="#A8A29E"
        strokeWidth="1.5"
        transform={`rotate(${Math.sin(fluidPhase) * 12}, 400, 210)`}
      />

      {/* Central Agitation Drive Shaft (Stainless Steel with Rotary Blades) */}
      <line x1="400" y1="90" x2="400" y2="210" stroke="#CBD5E1" strokeWidth="8" strokeLinecap="round" />
      {/* Brass Agitation Impeller Paddle */}
      <g transform={`rotate(${fluidPhase * 180}, 400, 210)`}>
        <polygon points="380,208 420,208 425,215 375,215" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
        <polygon points="396,190 404,190 404,230 396,230" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
      </g>

      {/* Vat Outer Front Shell Body */}
      <path
        d="M 240,200 L 240,340 C 240,400 560,400 560,340 L 560,200 C 560,240 240,240 240,200 Z"
        fill="url(#vatTeal)"
        stroke="#115E59"
        strokeWidth="2"
      />

      {/* Borosilicate Circular Inspection Glass Window */}
      <circle cx="400" cy="310" r="42" fill="#082F49" stroke="#38BDF8" strokeWidth="3" />
      <circle cx="400" cy="310" r="36" fill="#0284C7" fillOpacity="0.4" />
      {/* Inspection Window Bolt Flange */}
      {Array.from({ length: 8 }).map((_, i) => {
        const rad = (i * Math.PI) / 4;
        const bx = 400 + Math.cos(rad) * 42;
        const by = 310 + Math.sin(rad) * 42;
        return <circle key={i} cx={bx} cy={by} r="2.5" fill="#F8FAFC" stroke="#0F172A" strokeWidth="0.8" />;
      })}
      {/* Garment visible through glass */}
      <ellipse cx="400" cy="315" rx="22" ry="14" fill="#F5F5F4" opacity="0.8" />

      {/* Fluid Sight Tube & Flow Rate Meter (Right Flank) */}
      <rect x="580" y="210" width="14" height="110" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
      <rect x="583" y="240" width="8" height="75" rx="2" fill="#06B6D4" />
      <circle cx="587" cy={270 + rippleOffset} r="4" fill="#EF4444" stroke="#FFFFFF" strokeWidth="1" />

      {/* Heavy Brass Bottom Drain Valve Handle */}
      <circle cx="400" cy="385" r="8" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      <polygon points="380,383 420,383 415,387 385,387" fill="#D97706" />

      {/* Temperature Display Monitor Tag */}
      <g transform="translate(100, 100)">
        <rect x="0" y="0" width="130" height="48" rx="6" fill="#09090B" stroke="#06B6D4" strokeWidth="1.5" />
        <text x="12" y="18" fill="#94A3B8" fontSize="9" fontFamily="monospace">BATH THERMAL</text>
        <text x="12" y="38" fill="#38BDF8" fontSize="16" fontWeight="bold" fontFamily="monospace">
          40.2 °C // STABLE
        </text>
      </g>
    </svg>
  );
}

// =========================================================================
// 04. DIAL INDICATOR QUALITY CHECKING (Granite Surface, Jeweled Dial, Collar Probe)
// Vibrant Colors: Granite Base, Fire Red Mag Switch, Emerald Pass Zone, Ruby Probe
// =========================================================================
function DialQAMachineVisual({
  playbackSpeed,
  trigger,
}: {
  playbackSpeed: number;
  trigger: number;
}) {
  const [deflectionAngle, setDeflectionAngle] = useState(0);

  useEffect(() => {
    let animId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const t = (now - start) * 0.002 * playbackSpeed;
      // High-precision micro-oscillation around true zero (+- 14 degrees)
      const angle = Math.sin(t) * 14;
      setDeflectionAngle(angle);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [playbackSpeed, trigger]);

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-2xl overflow-visible">
      <defs>
        {/* Granite Texture Simulation */}
        <linearGradient id="graniteFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#27272A" />
          <stop offset="50%" stopColor="#18181B" />
          <stop offset="100%" stopColor="#09090B" />
        </linearGradient>

        {/* Fire Engine Red Magnetic Base */}
        <linearGradient id="magBaseRed" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>

      {/* Grade-A Precision Black Granite Surface Plate */}
      <polygon points="100,360 480,220 720,320 340,460" fill="url(#graniteFace)" stroke="#3F3F46" strokeWidth="2" />
      <polygon points="100,360 340,460 340,490 100,390" fill="#09090B" stroke="#27272A" strokeWidth="1" />
      <polygon points="340,460 720,320 720,350 340,490" fill="#18181B" stroke="#27272A" strokeWidth="1" />

      {/* 1.25-inch Ribbed Collar Fabric Under Test on Surface */}
      <polygon points="200,350 420,270 480,300 260,380" fill="#1C1917" stroke="#44403C" strokeWidth="1.5" />
      {/* Rib Knit Texture lines */}
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1={210 + i * 18}
          y1={346 - i * 6.5}
          x2={230 + i * 18}
          y2={356 - i * 6.5}
          stroke="#78716C"
          strokeWidth="1.2"
        />
      ))}

      {/* Magnetic Base (Vivid Fire Engine Red) */}
      <polygon points="490,260 550,235 590,250 530,275" fill="url(#magBaseRed)" stroke="#B91C1C" strokeWidth="1.5" />
      <polygon points="490,260 530,275 530,320 490,305" fill="#991B1B" />
      <polygon points="530,275 590,250 590,295 530,320" fill="#7F1D1D" />

      {/* Magnetic ON/OFF Rotary Knob (Brass) */}
      <circle cx="510" cy="290" r="8" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      <line x1="506" y1="290" x2="514" y2="290" stroke="#000000" strokeWidth="2" />

      {/* Polished Chrome Upright Support Column */}
      <rect x="536" y="90" width="12" height="160" rx="3" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />

      {/* Knurled Collar Clamp & Articulated Cross Arm */}
      <rect x="528" y="140" width="28" height="18" rx="2" fill="#D97706" stroke="#92400E" strokeWidth="1" />
      <polygon points="340,145 530,145 530,155 340,155" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />

      {/* Precision Dial Indicator Head Assembly */}
      {/* Outer Dial Casing (Chrome / Satin Silver) */}
      <circle cx="340" cy="180" r="54" fill="#0F172A" stroke="#CBD5E1" strokeWidth="4" />
      {/* White Enameled Dial Face */}
      <circle cx="340" cy="180" r="46" fill="#F8FAFC" stroke="#64748B" strokeWidth="1" />

      {/* Emerald Green Acceptance Band (±0.02 mm) */}
      <path
        d="M 326,140 A 42 42 0 0 1 354,140"
        stroke="#10B981"
        strokeWidth="6"
        fill="none"
      />
      {/* Red Rejection Threshold Marks */}
      <line x1="324" y1="138" x2="318" y2="134" stroke="#EF4444" strokeWidth="2" />
      <line x1="356" y1="138" x2="362" y2="134" stroke="#EF4444" strokeWidth="2" />

      {/* Dial Ticks (360 Degree Clockwise) */}
      {Array.from({ length: 24 }).map((_, i) => {
        const rad = (i * 15 * Math.PI) / 180;
        const x1 = 340 + Math.sin(rad) * 44;
        const y1 = 180 - Math.cos(rad) * 44;
        const x2 = 340 + Math.sin(rad) * (i % 6 === 0 ? 36 : 40);
        const y2 = 180 - Math.cos(rad) * (i % 6 === 0 ? 36 : 40);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1E293B" strokeWidth={i % 6 === 0 ? "1.5" : "0.7"} />;
      })}

      {/* Dial Center Needle & Pivot Jewel */}
      <g transform={`rotate(${deflectionAngle}, 340, 180)`}>
        <line x1="340" y1="180" x2="340" y2="142" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
        <circle cx="340" cy="180" r="4" fill="#DC2626" />
        <circle cx="340" cy="180" r="1.5" fill="#FFFFFF" />
      </g>

      {/* Dial Indicator Stem & Carbide Plunger Contact Point */}
      <rect x="337" y="234" width="6" height="85" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
      {/* Ruby Ball Contact Stylus pressing onto collar */}
      <circle cx="340" cy="320" r="4.5" fill="#E11D48" stroke="#9F1239" strokeWidth="1" />

      {/* Acceptance Status Pilot Light (Flashing Emerald) */}
      <circle cx="340" cy="115" r="7" fill="#10B981" stroke="#34D399" strokeWidth="1.5" />
      <circle cx="340" cy="115" r="3" fill="#FFFFFF" />

      {/* Telemetry Tag */}
      <g transform="translate(100, 90)">
        <rect x="0" y="0" width="140" height="48" rx="6" fill="#09090B" stroke="#10B981" strokeWidth="1.5" />
        <text x="12" y="18" fill="#94A3B8" fontSize="9" fontFamily="monospace">QA CALIBRATION</text>
        <text x="12" y="38" fill="#34D399" fontSize="16" fontWeight="bold" fontFamily="monospace">
          +0.012 MM // OK
        </text>
      </g>
    </svg>
  );
}

// =========================================================================
// 05. ARCHIVAL PACKAGING & DISPATCH (Folding Plate, Debossed Seal, Optical Laser)
// Vibrant Colors: Charcoal Archival Box, Gold Seal Stamp, Scarlet Laser Scanner
// =========================================================================
function PackagingDispatchVisual({
  playbackSpeed,
  trigger,
}: {
  playbackSpeed: number;
  trigger: number;
}) {
  const [laserPos, setLaserPos] = useState(0);
  const [stampDown, setStampDown] = useState(false);

  useEffect(() => {
    let animId: number;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) * 0.003 * playbackSpeed;
      // Laser scan beam traverses continuously across barcode
      const scanY = Math.sin(elapsed * 2) * 25;
      setLaserPos(scanY);
      setStampDown(Math.sin(elapsed) > 0.6);
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [playbackSpeed, trigger]);

  return (
    <svg viewBox="0 0 800 500" className="w-full h-full drop-shadow-2xl overflow-visible">
      <defs>
        {/* Archival Matte Black Box */}
        <linearGradient id="archivalBox" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#27272A" />
          <stop offset="50%" stopColor="#18181B" />
          <stop offset="100%" stopColor="#09090B" />
        </linearGradient>

        {/* Embossed Gold Seal */}
        <linearGradient id="goldEmboss" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="40%" stopColor="#EAB308" />
          <stop offset="80%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>

        {/* Optical Red Laser Sweep Beam */}
        <linearGradient id="laserBeam" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FF0033" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Assembly Workstation Bed (Safety Yellow Accent Trim) */}
      <polygon points="120,380 480,240 700,340 340,480" fill="#18181B" stroke="#EAB308" strokeWidth="2" />
      <polygon points="120,380 340,480 340,500 120,400" fill="#09090B" stroke="#27272A" />
      <polygon points="340,480 700,340 700,360 340,500" fill="#121214" stroke="#27272A" />

      {/* Low-Friction Stainless Transport Ball Rollers on Table */}
      {Array.from({ length: 6 }).map((_, i) => (
        <circle key={i} cx={190 + i * 35} cy={395 - i * 12} r="5" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
      ))}

      {/* Archival Matte Black Presentation Box */}
      <polygon points="260,330 480,240 580,290 360,380" fill="url(#archivalBox)" stroke="#52525B" strokeWidth="2" />
      <polygon points="260,330 360,380 360,420 260,370" fill="#09090B" stroke="#3F3F46" />
      <polygon points="360,380 580,290 580,330 360,420" fill="#18181B" stroke="#3F3F46" />

      {/* Embossed Gold VOID Seal Emblem on Box Center */}
      <g transform="translate(420, 310) skewY(-15) skewX(20)">
        <circle cx="0" cy="0" r="22" fill="url(#goldEmboss)" stroke="#A16207" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="18" fill="none" stroke="#FEF08A" strokeWidth="1" strokeDasharray="3,2" />
        <text x="-12" y="4" fill="#000000" fontSize="11" fontWeight="900" fontFamily="sans-serif">
          VOID
        </text>
      </g>

      {/* Express Courier Airway Bill (AWB) Barcode Label */}
      <g transform="translate(290, 335) skewY(-15) skewX(20)">
        <rect x="0" y="0" width="75" height="42" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
        <text x="5" y="10" fill="#000000" fontSize="6" fontWeight="bold" fontFamily="monospace">
          BLUE DART AIR
        </text>
        {/* Barcode Lines */}
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={i}
            x1={6 + i * 3.6}
            y1={14}
            x2={6 + i * 3.6}
            y2={32}
            stroke="#000000"
            strokeWidth={i % 3 === 0 ? "2" : "1"}
          />
        ))}
        <text x="5" y="39" fill="#000000" fontSize="5" fontFamily="monospace">
          # 84920-VOID-IND
        </text>

        {/* Live Red Laser Sweep Line Over Barcode */}
        <line
          x1="0"
          y1={22 + laserPos * 0.4}
          x2="75"
          y2={22 + laserPos * 0.4}
          stroke="#EF4444"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>

      {/* Optical Laser Scanner Head Assembly (Mounted Overhead) */}
      <polygon points="260,160 330,135 360,150 290,175" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
      <polygon points="260,160 290,175 290,210 260,195" fill="#1E40AF" />
      <polygon points="290,175 360,150 360,185 290,210" fill="#1E3A8A" />

      {/* Red Laser Emitting Aperture */}
      <ellipse cx="290" cy="190" rx="8" ry="4" fill="#EF4444" />
      {/* Volumetric Laser Scan Cone down to Label */}
      <polygon
        points="290,190 310,320 370,340 290,190"
        fill="url(#laserBeam)"
        opacity="0.65"
      />

      {/* Hydraulic Seal Deboss Stamp Cylinder (Animates Down on Cycle) */}
      <g transform={`translate(0, ${stampDown ? 18 : 0})`}>
        <rect x="412" y="110" width="16" height="120" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" />
        <polygon points="380,230 460,200 470,205 390,235" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      </g>

      {/* Dispatch AWB Tag */}
      <g transform="translate(560, 100)">
        <rect x="0" y="0" width="140" height="48" rx="6" fill="#09090B" stroke="#8B5CF6" strokeWidth="1.5" />
        <text x="12" y="18" fill="#94A3B8" fontSize="9" fontFamily="monospace">DISPATCH STATUS</text>
        <text x="12" y="38" fill="#C084FC" fontSize="16" fontWeight="bold" fontFamily="monospace">
          AIR COURIER // OK
        </text>
      </g>
    </svg>
  );
}
