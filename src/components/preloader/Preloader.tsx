"use client";

import React from "react";
import { LuxuryPortalPreloader } from "./LuxuryPortalPreloader";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  return <LuxuryPortalPreloader onComplete={onComplete} />;
}

export default Preloader;
