---
name: interactive-animations
description: Custom fluid cursors, spring physics, Lenis inertial smooth scrolling, and reactive UI controls in React.
---

# Interactive Motion & Micro-interactions Skill Guide

This skill guide covers custom fluid cursors, spring physics, Lenis inertial smooth scrolling, and reactive UI controls.

## Smooth Scroll with Lenis & GSAP Sync

Lenis provides smooth inertia scrolling. To ensure GSAP ScrollTrigger stays perfectly in sync with Lenis:

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);
}
```

## Fluid Trailing Cursor Recipe

For interactive portfolio and creative web experiences, a dual-layer cursor (dot + trailing spring ring) creates a responsive tactile feel:

- **Primary pointer**: small 8px solid dot with low latency (`0.1s`).
- **Follower circle**: larger 36px ring with spring dampening (`0.45s`).
- **Mix-blend mode**: `mix-blend-difference` allows the cursor to invert dynamically over dark and light backgrounds without manual color swaps.
- **Pointer media query**: Check `(pointer: coarse)` to automatically disable on touchscreen mobile devices.
