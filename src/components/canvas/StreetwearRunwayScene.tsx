"use client";

import React, { useRef, useState, useCallback, Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { CatwalkFloor } from "./CatwalkFloor";
import { RunwayAudience } from "./RunwayAudience";
import { TShirtGarment } from "./TShirtGarment";
import { RunwayModel, RunwayMotionType, RUNWAY_MOTIONS } from "./RunwayModel";
import { Edition } from "@/lib/types";
import { Eye, UserCheck, Play } from "lucide-react";

interface StreetwearRunwaySceneProps {
  edition: Edition;
  onInspectToggle?: (inspecting: boolean) => void;
}

export function StreetwearRunwayScene({
  edition,
  onInspectToggle,
}: StreetwearRunwaySceneProps) {
  const [rotationY, setRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [flashTrigger, setFlashTrigger] = useState(0);
  const [viewMode, setViewMode] = useState<"model" | "garment">("model");
  const [activeMotion, setActiveMotion] = useState<RunwayMotionType>("walkForward");
  const lastXRef = useRef(0);

  // Sporadic audience flashbulb triggers
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.35) {
        setFlashTrigger((prev) => prev + 1);
      }
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Don't drag if clicking buttons on HUD
      if ((e.target as HTMLElement).closest("button")) return;
      setIsDragging(true);
      lastXRef.current = e.clientX;
      onInspectToggle?.(true);
    },
    [onInspectToggle]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;
      setRotationY((prev) => prev + deltaX * 0.012);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    onInspectToggle?.(false);
  }, [onInspectToggle]);

  return (
    <div
      className="relative w-full h-full select-none cursor-grab active:cursor-grabbing touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        camera={{
          position: viewMode === "model" ? [0, 0.45, 3.8] : [0, 0.35, 3.2],
          fov: viewMode === "model" ? 42 : 38,
        }}
      >
        {/* Ambient base studio light */}
        <ambientLight intensity={0.65} color="#181716" />

        {/* High-fashion overhead runway spotlight */}
        <spotLight
          position={[0, 5.2, 0.8]}
          target-position={[0, 0, 0]}
          intensity={4.5}
          angle={0.55}
          penumbra={0.7}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
          color="#FFFDF8"
        />

        {/* Soft front key light */}
        <directionalLight position={[1.5, 2.4, 3.5]} intensity={1.1} color="#FFFBF5" />

        {/* Edge rim light tinted with edition accent */}
        <directionalLight
          position={[-2.5, 2.8, -2.5]}
          intensity={2.2}
          color={edition.accentColor}
        />

        {/* Subtle floor bounce light */}
        <pointLight position={[0, -0.6, 1.2]} intensity={0.4} color="#8A857D" />

        <Suspense fallback={null}>
          <CatwalkFloor />
          <RunwayAudience flashTrigger={flashTrigger} />

          {viewMode === "model" ? (
            <RunwayModel
              activeMotion={activeMotion}
              inPlace={true}
              edition={edition}
              userRotationY={rotationY}
            />
          ) : (
            <TShirtGarment
              edition={edition}
              isInspecting={isDragging}
              userRotationY={rotationY}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Floating Fashion Show Controls HUD (Top Left below Header) */}
      <div className="absolute top-24 left-6 md:left-12 z-20 flex flex-col gap-3 pointer-events-auto">
        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 shadow-xl">
          <button
            onClick={() => setViewMode("model")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
              viewMode === "model"
                ? "bg-white text-black font-bold shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>RUNWAY MODEL</span>
          </button>
          <button
            onClick={() => setViewMode("garment")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
              viewMode === "garment"
                ? "bg-white text-black font-bold shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>GARMENT ARCHIVE</span>
          </button>
        </div>

        {/* Motion Choreography Selector (When in Model Mode) */}
        {viewMode === "model" && (
          <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-2xl bg-black/70 backdrop-blur-md border border-white/10 shadow-xl max-w-xs md:max-w-md">
            <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase px-2 w-full mb-1">
              CHOREOGRAPHED MOTIONS
            </span>
            {RUNWAY_MOTIONS.map((motion) => {
              const isActive = activeMotion === motion.id;
              return (
                <button
                  key={motion.id}
                  onClick={() => setActiveMotion(motion.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-white/20 text-white border border-white/30 font-semibold"
                      : "text-neutral-400 hover:text-neutral-200 hover:bg-white/5 border border-transparent"
                  }`}
                  title={motion.description}
                >
                  <Play className={`w-2.5 h-2.5 ${isActive ? "text-emerald-400 fill-emerald-400" : ""}`} />
                  <span>{motion.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Floating 360° Drag & Runway HUD Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs tracking-widest text-[#EFECE6]/80 pointer-events-none transition-opacity duration-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-mono">DRAG TO ROTATE 360°</span>
        <span className="text-white/20">|</span>
        <span className="font-mono text-neutral-400">
          {viewMode === "model" ? "CHOREOGRAPHED RUNWAY" : "300 GSM TEXTILE DRAPE"}
        </span>
      </div>
    </div>
  );
}
