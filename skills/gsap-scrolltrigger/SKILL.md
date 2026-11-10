---
name: gsap-scrolltrigger
description: Choreograph complex motion, horizontal scroll pinning, kinetic text reveals, and physics tracking in Next.js with GSAP and ScrollTrigger.
---

# GSAP & ScrollTrigger Skill Guide

This skill guide provides best practices for choreographing complex motion, horizontal scroll pinning, kinetic text reveals, and physics tracking in Next.js.

## GSAP Registration & Context Cleanup

In Next.js App Router, always ensure GSAP plugins are registered safely on the client and utilize `@gsap/react`'s `useGSAP` hook for automatic scoping and garbage collection:

```tsx
"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
```

## Magnetic Hover Physics (`gsap.quickTo`)

`gsap.quickTo` provides optimal performance for mouse-following micro-interactions by bypassing tween creation overhead on every mousemove event:

```tsx
useGSAP(() => {
  const el = ref.current;
  if (!el) return;

  const xTo = gsap.quickTo(el, "x", { duration: 0.8, ease: "elastic.out(1, 0.3)" });
  const yTo = gsap.quickTo(el, "y", { duration: 0.8, ease: "elastic.out(1, 0.3)" });

  const onMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    xTo((e.clientX - cx) * 0.35);
    yTo((e.clientY - cy) * 0.35);
  };

  const onLeave = () => {
    xTo(0);
    yTo(0);
  };

  el.addEventListener("mousemove", onMove);
  el.addEventListener("mouseleave", onLeave);
  return () => {
    el.removeEventListener("mousemove", onMove);
    el.removeEventListener("mouseleave", onLeave);
  };
}, { scope: ref });
```

## Horizontal Scroll with Pinned ScrollTrigger

To pin a section and scroll through horizontal content based on vertical page scroll:

```tsx
useGSAP(() => {
  const section = sectionRef.current;
  const track = trackRef.current;
  if (!section || !track) return;

  const scrollDist = track.scrollWidth - window.innerWidth;

  gsap.to(track, {
    x: -scrollDist,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: () => `+=${scrollDist}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  });
}, { scope: sectionRef });
```
