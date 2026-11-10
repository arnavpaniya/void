"use client";

import React, { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Critical root error caught:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0E0D0C] text-neutral-100 flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-6">
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            CRITICAL APP INTERRUPTION
          </span>
          <h1 className="text-3xl font-bold uppercase text-white tracking-tight">
            VOID Atelier
          </h1>
          <p className="text-xs text-neutral-400 font-light leading-relaxed">
            A critical application error occurred. Reloading the experience will re-initialize the atelier canvas.
          </p>
          <button
            onClick={() => reset()}
            className="w-full py-3.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all cursor-pointer"
          >
            REINITIALIZE APP
          </button>
        </div>
      </body>
    </html>
  );
}
