"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Check, Bell } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setErrorMessage("Enter a valid email. Don't miss the drop.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 800);
  };

  return (
    <section className="relative w-full py-24 px-6 md:px-12 bg-[#F5F4F0] text-[#111111] overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Punchy Headline */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#111111] uppercase font-sans leading-none">
            LOCK IN. COP THE DROP.
          </h2>
          <span className="text-neutral-500 font-mono text-xs sm:text-sm mt-3 tracking-wider uppercase">
            (DROP ALERT · STRAIGHT HEAT · MAIN CHARACTER ENERGY)
          </span>
        </div>

        {/* Form */}
        <div className="w-full max-w-md mt-10">
          {status === "success" ? (
            <div className="p-6 rounded-2xl bg-black/5 border border-black/15 backdrop-blur-xl flex flex-col items-center text-center space-y-2 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mb-1">
                <Check className="w-6 h-6 stroke-[3]" />
              </div>
              <h4 className="text-base font-black font-mono text-black uppercase tracking-wider">
                YOU&apos;RE LOCKED IN // 100% VALID
              </h4>
              <p className="text-xs text-neutral-600 font-light">
                Secret early-cop link will ping your inbox before the public drop. Prepare to secure your size.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-xs font-mono text-black underline underline-offset-4 pt-2 transition-colors cursor-pointer"
              >
                Enter another squad email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Bell className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="ENTER EMAIL // COP THE DROP"
                  className="w-full pl-11 pr-4 py-4 rounded-xl bg-white border border-neutral-300 text-black placeholder:text-neutral-400 font-mono text-xs focus:outline-none focus:border-black transition-all shadow-sm"
                  disabled={status === "loading"}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="px-7 py-4 rounded-xl bg-black text-white text-xs font-mono font-black uppercase tracking-wider hover:bg-neutral-800 transition-all active:scale-98 flex items-center justify-center gap-2 shadow-md cursor-pointer shrink-0 disabled:opacity-50"
              >
                {status === "loading" ? (
                  <span>LOCKING IN...</span>
                ) : (
                  <>
                    <span>COP EARLY</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-xs text-rose-600 font-mono text-left mt-2 pl-2">
              {errorMessage}
            </p>
          )}

          {/* Micro-guarantee */}
          <div className="flex items-center justify-center gap-4 text-[10px] font-mono text-neutral-500 text-center mt-5">
            <span>NO SPAM. NO CAP.</span>
            <span>•</span>
            <Link
              href="/legal/privacy-policy"
              className="text-neutral-600 hover:text-black underline underline-offset-2 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
