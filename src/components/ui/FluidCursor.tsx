"use client";

import React, { useEffect, useRef, useState } from "react";

export function FluidCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate for mouse/pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check hovered element targets
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isCanvas = target.tagName === "CANVAS" || target.closest("canvas");
      const isButton = target.closest("button") || target.closest("a");
      const isCard = target.closest("[data-cursor='card']") || target.closest(".group");

      const targetHovered = !!(isCanvas || (isCard && !isButton) || isButton);
      const targetText = isCanvas ? "DRAG 360°" : isCard && !isButton ? "EXPLORE" : "";

      setIsHovered((prev) => (prev !== targetHovered ? targetHovered : prev));
      setCursorText((prev) => (prev !== targetText ? targetText : prev));
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Smooth physics loop for the trailing ring
    let animationFrameId: number;
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Central Fluid Precision Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      />

      {/* Trailing Physics Ring with Dynamic Aura */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference flex items-center justify-center transition-all duration-300 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } ${
          isHovered
            ? cursorText
              ? "w-20 h-20 -ml-10 -mt-10 bg-white text-black font-mono text-[9px] font-bold rounded-full border-none shadow-2xl scale-100"
              : "w-12 h-12 -ml-6 -mt-6 rounded-full border border-white/60 bg-white/10 scale-110"
            : "w-8 h-8 -ml-4 -mt-4 rounded-full border border-white/40 scale-100"
        }`}
        style={{ willChange: "transform" }}
      >
        {cursorText && (
          <span className="tracking-widest uppercase select-none font-bold">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
}

export default FluidCursor;
