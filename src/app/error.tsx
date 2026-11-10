"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCw, Home, AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Atelier render error caught:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-[#0E0D0C] text-neutral-100 flex flex-col justify-between px-6 sm:px-12 py-10 selection:bg-neutral-800 selection:text-white">
      {/* Top Header */}
      <header className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-black tracking-tighter uppercase font-mono text-white">
            VOID
          </span>
        </Link>
        <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
          ERROR 500
        </span>
      </header>

      {/* Center Error Message */}
      <div className="flex flex-col items-center justify-center my-auto text-center max-w-lg mx-auto py-16">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
        </div>

        <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-2">
          RENDER INTERRUPTION
        </span>

        <h1 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-white uppercase">
          Atelier Pipeline Error
        </h1>

        <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
          An unexpected issue disrupted the 3D runway presentation.
          The error has been logged for our engineering studio.
        </p>

        {error.digest && (
          <code className="mt-3 px-3 py-1 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-neutral-400">
            Digest: {error.digest}
          </code>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-xl cursor-pointer"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>RETRY PRESENTATION</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-3.5 h-3.5 text-neutral-400" />
            <span>RETURN TO RUNWAY</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-white/5 pt-6">
        <span>VOID ATELIER · ARCHIVAL ERROR HANDLER</span>
        <span>STATUS: LOGGED</span>
      </footer>
    </main>
  );
}
