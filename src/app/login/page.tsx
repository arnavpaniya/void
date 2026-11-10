"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Check,
  Sparkles,
} from "lucide-react";
import { AuthCursorEffect } from "@/components/auth/AuthCursorEffect";

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");

  // Form states
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [signUpName, setSignUpName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpConfirm, setSignUpConfirm] = useState("");
  const [dropAlerts, setDropAlerts] = useState(true);

  const [showSignInPassword, setShowSignInPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMsg(null);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg("Welcome back. Entering client suite...");

      // Save user session in localStorage
      if (typeof window !== "undefined") {
        const existing = localStorage.getItem("void_auth_user");
        let clientName = "Archival Patron";
        if (existing) {
          try {
            const parsed = JSON.parse(existing);
            if (parsed.name && !parsed.name.toLowerCase().includes("arnav")) {
              clientName = parsed.name;
            }
          } catch {
            // fallback
          }
        }
        localStorage.setItem(
          "void_auth_user",
          JSON.stringify({
            name: clientName,
            email: signInEmail || "patron@voidatelier.com",
            signedIn: true,
            role: "Patron",
          })
        );
      }

      setTimeout(() => {
        router.push("/account");
      }, 1000);
    }, 1000);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (signUpPassword !== signUpConfirm) {
      alert("Passwords do not match. Please verify.");
      return;
    }

    setIsLoading(true);
    setSuccessMsg(null);

    setTimeout(() => {
      setIsLoading(false);
      setSuccessMsg("Account created successfully. Directing to suite...");

      if (typeof window !== "undefined") {
        localStorage.setItem(
          "void_auth_user",
          JSON.stringify({
            name: signUpName.trim() || "Archival Patron",
            email: signUpEmail.trim(),
            signedIn: true,
            role: "Patron",
          })
        );
      }

      setTimeout(() => {
        router.push("/account");
      }, 1000);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0E0D0C] text-white font-sans overflow-x-hidden selection:bg-purple-600 selection:text-white flex flex-col justify-between">
      {/* Custom Interactive Purple Crosshair & Star Sparkle Cursor */}
      <AuthCursorEffect />

      {/* User Artwork Canvas Background (Statue completely clear and unblocked) */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/auth_background.jpg"
          alt="VOID Streetwear Artwork"
          fill
          priority
          className="object-cover object-left lg:object-center select-none"
        />

        {/* Ambient Darkened Gradient Overlay on the right to softly frame the liquid card */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 lg:bg-gradient-to-r lg:from-transparent lg:via-black/25 lg:to-black/85 pointer-events-none" />

        {/* Liquid Atmospheric Purple Glow */}
        <div className="absolute -bottom-20 right-0 w-[450px] h-[450px] bg-purple-700/20 blur-[150px] pointer-events-none rounded-full" />
      </div>

      {/* Minimal Top Header */}
      <header className="relative z-20 w-full px-6 sm:px-12 py-6 flex items-center justify-between">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-200 hover:text-white transition-all bg-white/[0.06] hover:bg-white/[0.12] backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.3)] active:scale-95 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-purple-400" />
          <span>BACK TO RUNWAY</span>
        </Link>

        {/* Minimal Brand Mark */}
        <Link
          href="/"
          className="font-sans font-black text-xl sm:text-2xl tracking-[0.25em] text-white hover:text-purple-300 transition-colors uppercase"
        >
          VOID
        </Link>

        <div className="w-24 hidden sm:block" />
      </header>

      {/* Central Content Area (Left: Completely Clean Unobstructed Artwork, Right: Liquid Glass Card) */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex items-center justify-end flex-1">
        
        {/* ================= LIQUID GLASS AUTHENTICATION CARD ================= */}
        <div className="w-full max-w-md rounded-[32px] p-7 sm:p-9 transition-all bg-white/[0.07] backdrop-blur-3xl border border-white/25 shadow-[0_30px_70px_rgba(0,0,0,0.65),inset_0_2px_4px_rgba(255,255,255,0.35),inset_0_-2px_4px_rgba(0,0,0,0.3),0_0_40px_rgba(168,85,247,0.18)]">
          
          {/* Liquid Glass Tab Switcher */}
          <div className="relative flex items-center bg-black/40 p-1 rounded-2xl border border-white/15 mb-7 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.6)]">
            <button
              type="button"
              onClick={() => {
                setActiveTab("signin");
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer font-bold ${
                activeTab === "signin"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_4px_15px_rgba(168,85,247,0.5),inset_0_1px_2px_rgba(255,255,255,0.4)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              SIGN IN
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("signup");
                setSuccessMsg(null);
              }}
              className={`flex-1 py-2.5 text-xs font-mono uppercase tracking-wider rounded-xl transition-all cursor-pointer font-bold ${
                activeTab === "signup"
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_4px_15px_rgba(168,85,247,0.5),inset_0_1px_2px_rgba(255,255,255,0.4)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              CREATE ACCOUNT
            </button>
          </div>

          {/* Success Toast */}
          {successMsg && (
            <div className="mb-6 p-3.5 rounded-2xl bg-purple-950/80 border border-purple-500/60 text-purple-200 text-xs font-mono flex items-center gap-2.5 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Check className="w-4 h-4 text-purple-300" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ================= TAB 1: SIGN IN ================= */}
          {activeTab === "signin" && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1.5">
                  EMAIL ADDRESS
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={signInEmail}
                    onChange={(e) => setSignInEmail(e.target.value)}
                    placeholder="patron@voidatelier.com"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.06] border border-white/20 text-white placeholder:text-neutral-500 text-xs font-mono focus:outline-none focus:border-purple-400 focus:bg-white/[0.1] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.4),0_2px_6px_rgba(0,0,0,0.2)] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-neutral-300">
                    PASSWORD
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Password reset instructions sent to your registered email.");
                    }}
                    className="text-[10px] font-mono uppercase text-purple-300 hover:text-purple-200 underline underline-offset-2"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type={showSignInPassword ? "text" : "password"}
                    required
                    value={signInPassword}
                    onChange={(e) => setSignInPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-2xl bg-white/[0.06] border border-white/20 text-white placeholder:text-neutral-500 text-xs font-mono focus:outline-none focus:border-purple-400 focus:bg-white/[0.1] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.4),0_2px_6px_rgba(0,0,0,0.2)] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignInPassword(!showSignInPassword)}
                    className="absolute right-3.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {showSignInPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Sign In */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs uppercase tracking-widest font-black transition-all shadow-[0_8px_25px_rgba(168,85,247,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.4)] active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </span>
                ) : (
                  <span>ENTER SUITE ↵</span>
                )}
              </button>
            </form>
          )}

          {/* ================= TAB 2: SIGN UP ================= */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignUp} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  FULL NAME
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/20 text-white placeholder:text-neutral-500 text-xs font-mono focus:outline-none focus:border-purple-400 focus:bg-white/[0.1] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.4)] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                  EMAIL ADDRESS
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    placeholder="name@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/20 text-white placeholder:text-neutral-500 text-xs font-mono focus:outline-none focus:border-purple-400 focus:bg-white/[0.1] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.4)] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    PASSWORD
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white/[0.06] border border-white/20 text-white placeholder:text-neutral-500 text-xs font-mono focus:outline-none focus:border-purple-400 focus:bg-white/[0.1] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.4)]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-300 mb-1">
                    CONFIRM
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={signUpConfirm}
                    onChange={(e) => setSignUpConfirm(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-white/[0.06] border border-white/20 text-white placeholder:text-neutral-500 text-xs font-mono focus:outline-none focus:border-purple-400 focus:bg-white/[0.1] shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.4)]"
                  />
                </div>
              </div>

              {/* VIP Drop Alerts Checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="dropAlerts"
                  checked={dropAlerts}
                  onChange={(e) => setDropAlerts(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-white/10 border-white/20 text-purple-600 focus:ring-0 cursor-pointer accent-purple-600"
                />
                <label
                  htmlFor="dropAlerts"
                  className="text-[11px] text-neutral-300 font-mono cursor-pointer select-none"
                >
                  Send early-access drop codes via SMS & Email
                </label>
              </div>

              {/* Submit Sign Up */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs uppercase tracking-widest font-black transition-all shadow-[0_8px_25px_rgba(168,85,247,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.4)] active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>CREATING ACCOUNT...</span>
                  </span>
                ) : (
                  <span>CREATE ACCOUNT ↵</span>
                )}
              </button>
            </form>
          )}

          {/* Bottom Card Footer */}
          <div className="mt-6 pt-5 border-t border-white/15 text-center">
            <span className="text-[11px] font-mono text-neutral-400">
              {activeTab === "signin"
                ? "First time at the atelier? "
                : "Already hold an account? "}
            </span>
            <button
              type="button"
              onClick={() => {
                setActiveTab(activeTab === "signin" ? "signup" : "signin");
                setSuccessMsg(null);
              }}
              className="text-[11px] font-mono uppercase text-purple-300 hover:text-white font-bold underline underline-offset-4 cursor-pointer"
            >
              {activeTab === "signin" ? "Create Account" : "Sign In Here"}
            </button>
          </div>
        </div>
      </main>

      {/* Minimal Bottom Colophon */}
      <footer className="relative z-20 w-full px-6 sm:px-12 py-5 flex items-center justify-between text-[11px] font-mono text-neutral-400 border-t border-white/10">
        <div>VOID ARCHIVE</div>
        <div>WEAR THE VOID · BOMBAY</div>
      </footer>
    </div>
  );
}
