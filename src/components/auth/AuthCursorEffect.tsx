"use client";

import React, { useEffect, useState, useRef } from "react";

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  rotation: number;
}

export function AuthCursorEffect() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const trailPos = useRef({ x: -100, y: -100 });
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Smooth cursor trailing animation
  useEffect(() => {
    let animId: number;

    const updateTrail = () => {
      // Linear interpolation (lerp)
      trailPos.current.x += (mousePos.x - trailPos.current.x) * 0.18;
      trailPos.current.y += (mousePos.y - trailPos.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${trailPos.current.x}px, ${trailPos.current.y}px, 0) translate(-50%, -50%) rotate(${trailPos.current.x * 0.5}deg)`;
      }

      // Update particle physics
      setSparkles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            opacity: p.opacity - 0.035,
            rotation: p.rotation + 4,
          }))
          .filter((p) => p.opacity > 0)
      );

      animId = requestAnimationFrame(updateTrail);
    };

    animId = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(animId);
  }, [mousePos]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Check if hovering over clickable / interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.tagName === "INPUT" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);

      // Spawn 6 purple starburst sparkle particles on click
      const newSparkles: SparkleParticle[] = Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2 + (Math.random() - 0.5);
        const speed = 2 + Math.random() * 3.5;
        return {
          id: Date.now() + Math.random(),
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: 10 + Math.random() * 8,
          opacity: 1,
          rotation: Math.random() * 360,
        };
      });

      setSparkles((prev) => [...prev.slice(-18), ...newSparkles]);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden select-none hidden md:block">
      {/* Outer Spring Trailing Ring with Crosshairs */}
      <div
        ref={ringRef}
        style={{ left: 0, top: 0 }}
        className={`fixed pointer-events-none transition-all duration-150 ease-out flex items-center justify-center rounded-full border border-purple-500/50 ${
          isHovering
            ? "w-14 h-14 bg-purple-500/15 shadow-[0_0_25px_rgba(168,85,247,0.45)] scale-110"
            : isClicking
            ? "w-8 h-8 bg-purple-500/25 scale-90"
            : "w-10 h-10 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
        }`}
      >
        {/* Subtle Crosshair Ticks */}
        <span className="absolute -top-1 w-[1px] h-2 bg-purple-400/80" />
        <span className="absolute -bottom-1 w-[1px] h-2 bg-purple-400/80" />
        <span className="absolute -left-1 w-2 h-[1px] bg-purple-400/80" />
        <span className="absolute -right-1 w-2 h-[1px] bg-purple-400/80" />
      </div>

      {/* Center Precision Dot Cursor */}
      <div
        ref={cursorRef}
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`,
        }}
        className={`fixed pointer-events-none rounded-full bg-white transition-transform duration-75 ${
          isHovering
            ? "w-2.5 h-2.5 bg-purple-300 shadow-[0_0_10px_#A855F7]"
            : isClicking
            ? "w-1.5 h-1.5 bg-purple-400"
            : "w-2 h-2 shadow-[0_0_6px_#FFFFFF]"
        }`}
      />

      {/* Four-Point Star Sparkle Click Particles */}
      {sparkles.map((p) => (
        <div
          key={p.id}
          style={{
            transform: `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%) rotate(${p.rotation}deg)`,
            opacity: p.opacity,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
          className="fixed pointer-events-none text-purple-400"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full drop-shadow-[0_0_8px_#A855F7]">
            <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default AuthCursorEffect;
