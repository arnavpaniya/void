"use client";

import React, { useRef } from "react";

interface DesktopMotionReelProps {
  onQuickAdd?: (name: string, size: string, price: number) => void;
  onOpenVideoModal?: () => void;
}

export function DesktopMotionReel({}: DesktopMotionReelProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    // Clean full screen edge-to-edge cinematic video with seamless top and bottom transitions
    <section className="relative w-full h-[85vh] lg:h-screen bg-[#060607] overflow-hidden select-none">
      {/* 1. Seamless Top Atmospheric Blend */}
      <div className="absolute top-0 inset-x-0 h-36 sm:h-52 bg-gradient-to-b from-[#060607] via-[#060607]/80 to-transparent pointer-events-none z-10" />

      {/* 2. The Runway Video with Natural Model Framing */}
      <video
        ref={videoRef}
        src="/videos/models_showcase.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-[center_18%] brightness-[0.95]"
      />

      {/* 3. Smooth Seamless Atmospheric Gradient into the Off-White Section (Zero Pixel/Dither Artifacts) */}
      <div className="absolute bottom-0 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-[#F5F4F0] via-[#F5F4F0]/60 to-transparent pointer-events-none z-10" />
    </section>
  );
}

export default DesktopMotionReel;
