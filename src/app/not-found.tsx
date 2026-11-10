import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, Compass } from "lucide-react";

export default function NotFound() {
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
          ERROR 404
        </span>
      </header>

      {/* Center 404 Content */}
      <div className="flex flex-col items-center justify-center my-auto text-center max-w-lg mx-auto py-16">
        <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-4 block">
          ARCHIVE COORDINATE MISSING
        </span>

        {/* Large 404 outline numeral */}
        <h1
          className="text-8xl sm:text-9xl font-black font-sans leading-none tracking-tight uppercase"
          style={{
            color: "transparent",
            WebkitTextStroke: "2px rgba(255,255,255,0.25)",
          }}
        >
          404
        </h1>

        <p className="mt-6 text-sm text-neutral-300 font-light leading-relaxed">
          The requested garment, silhouette, or archive link does not exist or has
          been retired from the atelier collection.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black text-xs font-mono font-bold uppercase tracking-wider hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 shadow-xl"
          >
            <Home className="w-3.5 h-3.5" />
            <span>RETURN TO RUNWAY</span>
          </Link>
          <Link
            href="/#carousel"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-3.5 h-3.5 text-neutral-400" />
            <span>BROWSE ARCHIVE</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-white/5 pt-6 gap-2">
        <span>VOID ATELIER · BOMBAY / TIRUPUR</span>
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-500">DESIGNED BY</span>
          <a
            href="https://arnavpaniya.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline font-bold"
          >
            ARNAV PANIYA
          </a>
        </div>
      </footer>
    </main>
  );
}
