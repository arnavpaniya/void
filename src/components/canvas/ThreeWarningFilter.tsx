"use client";

import { useEffect } from "react";

export function ThreeWarningFilter() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      const msg = typeof args[0] === "string" ? args[0] : "";
      if (
        msg.includes("THREE.Clock: This module has been deprecated") ||
        msg.includes("THREE.WebGLShadowMap: PCFSoftShadowMap has been removed") ||
        msg.includes("THREE.FBXLoader: ShininessExponent map is not supported") ||
        msg.includes("THREE.FBXLoader: Vertex has more than 4 skinning weights")
      ) {
        return;
      }
      originalWarn.apply(console, args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  return null;
}
