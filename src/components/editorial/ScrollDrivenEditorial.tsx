"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollDrivenEditorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);

  // Main Typography
  const voidTextRef = useRef<HTMLHeadingElement>(null);
  const unseenTextRef = useRef<HTMLHeadingElement>(null);
  const bottomManifestoRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP ANIMATION TIMELINE (min-width: 768px)
      // ==========================================
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: "+=220%",
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Initial setup: Main texts start offscreen
        gsap.set(voidTextRef.current, { x: 340, opacity: 0 });
        gsap.set(unseenTextRef.current, { x: -340, opacity: 0 });
        gsap.set(bottomManifestoRef.current, { y: 60, opacity: 0 });

        // ----------------------------------------------------
        // STAGE 1 (0% -> 50%): VOID and WEAR THE UNSEEN slide in from both sides
        // ----------------------------------------------------
        tl.to(
          voidTextRef.current,
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.45,
          },
          0.05
        ).to(
          unseenTextRef.current,
          {
            x: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.45,
          },
          0.05
        );

        // ----------------------------------------------------
        // STAGE 2 (50% -> 80%): Climax crossing behind model & Bottom manifesto reveals
        // ----------------------------------------------------
        tl.to(
          bottomManifestoRef.current,
          {
            y: 0,
            opacity: 1,
            ease: "power2.out",
            duration: 0.25,
          },
          0.5
        )
          .to(
            voidTextRef.current,
            { x: -60, ease: "none", duration: 0.3 },
            0.5
          )
          .to(
            unseenTextRef.current,
            { x: 60, ease: "none", duration: 0.3 },
            0.5
          );

        // ----------------------------------------------------
        // STAGE 3 (80% -> 100%): Clean exit transition to next section
        // ----------------------------------------------------
        tl.to(
          [voidTextRef.current, unseenTextRef.current, bottomManifestoRef.current],
          { opacity: 0, ease: "power2.inOut", duration: 0.18 },
          0.82
        ).to(
          modelRef.current,
          { opacity: 0.45, ease: "power1.out", duration: 0.18 },
          0.82
        );
      });

      // ==========================================
      // MOBILE ANIMATION TIMELINE (max-width: 767px)
      // ==========================================
      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            pin: pinRef.current,
            start: "top top",
            end: "+=160%",
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.set(voidTextRef.current, { x: 180, opacity: 0 });
        gsap.set(unseenTextRef.current, { x: -180, opacity: 0 });
        gsap.set(bottomManifestoRef.current, { y: 30, opacity: 0 });

        // Phase 1: Slide in main texts from both sides
        tl.to(
          voidTextRef.current,
          { x: 0, opacity: 1, ease: "power2.out", duration: 0.45 },
          0.05
        ).to(
          unseenTextRef.current,
          { x: 0, opacity: 1, ease: "power2.out", duration: 0.45 },
          0.05
        );

        // Phase 2: Bottom manifesto
        tl.to(
          bottomManifestoRef.current,
          { y: 0, opacity: 1, duration: 0.25 },
          0.5
        );

        // Phase 3: Transition out
        tl.to(
          [voidTextRef.current, unseenTextRef.current, bottomManifestoRef.current],
          { opacity: 0, duration: 0.18 },
          0.82
        ).to(
          modelRef.current,
          { opacity: 0.5, duration: 0.18 },
          0.82
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#F1F0EB] text-[#111111] overflow-hidden select-none"
    >
      {/* 100svh Pinned Viewport Container */}
      <div
        ref={pinRef}
        className="relative w-full h-[100svh] min-h-[100svh] max-h-[100svh] flex items-end justify-center overflow-hidden"
      >
        {/* Layer 0: Warm Off-White Ambient Backing with Negative Space */}
        <div className="absolute inset-0 bg-[#F1F0EB] pointer-events-none z-0" />

        {/* ==================================================== */}
        {/* LAYER 1: MAIN TYPOGRAPHY SLIDING IN FROM BOTH SIDES  */}
        {/* ==================================================== */}

        {/* Left Side: "WEAR THE UNSEEN" in Anton sliding in from the left */}
        <div className="absolute left-[2vw] sm:left-[6vw] lg:left-[10vw] top-[48%] -translate-y-1/2 z-10 pointer-events-none max-w-[46vw] sm:max-w-[38vw]">
          <h3
            ref={unseenTextRef}
            className="font-anton text-[#111111] leading-[0.88] uppercase select-none tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.04)]"
            style={{
              fontSize: "clamp(44px, 6.5vw, 96px)",
            }}
          >
            WEAR THE
            <br />
            UNSEEN
          </h3>
        </div>

        {/* Right Side: "VOID" in Bodoni Moda Black rotated 90° sliding in from the right */}
        <div className="absolute right-[1vw] sm:right-[4vw] lg:right-[8vw] top-1/2 -translate-y-1/2 z-10 pointer-events-none flex items-center justify-center">
          <h2
            ref={voidTextRef}
            className="font-bodoni-moda font-black text-[#111111] leading-none tracking-tight uppercase select-none origin-center rotate-90"
            style={{
              fontSize: "clamp(130px, 19vw, 290px)",
              letterSpacing: "-0.03em",
            }}
          >
            VOID
          </h2>
        </div>

        {/* Center-Bottom Subtle Editorial Anchor: "BEYOND THE ORDINARY." */}
        <div
          ref={bottomManifestoRef}
          className="absolute bottom-[8svh] sm:bottom-[6svh] left-1/2 -translate-x-1/2 z-10 pointer-events-none text-center whitespace-nowrap"
        >
          <span className="font-bodoni-moda font-black text-xl sm:text-3xl lg:text-4xl uppercase tracking-[0.12em] text-[#111111]/85 block">
            Beyond The Ordinary.
          </span>
        </div>

        {/* ==================================================== */}
        {/* LAYER 2: CLEAN ISOLATED CHARACTER STANDING UPRIGHT   */}
        {/* ==================================================== */}
        <div
          ref={modelRef}
          className="relative z-20 pointer-events-none flex items-end justify-center h-[76svh] sm:h-[88svh] w-auto transition-opacity duration-300"
          style={{
            marginLeft: "clamp(-20px, -2vw, -40px)",
          }}
        >
          <Image
            src="/images/editorial_character_cutout.png"
            alt="VOID Streetwear Editorial Model"
            width={819}
            height={1024}
            priority
            className="h-full w-auto object-contain object-bottom select-none drop-shadow-[0_24px_48px_rgba(0,0,0,0.12)]"
          />
        </div>
      </div>
    </section>
  );
}

export default ScrollDrivenEditorial;
