"use client";

import React, { useState } from "react";
import {
  X,
  User,
  Package,
  Settings,
  Heart,
  LogIn,
  UserPlus,
  Check,
  Truck,
  MapPin,
  Volume2,
  Globe,
  Bell,
  ArrowRight,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";
import { useSoundtrack } from "@/components/audio/SoundtrackPlayer";

export type PortalTab = "account" | "orders" | "settings" | "login" | "signup";

interface ClientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PortalTab;
  currency: "INR" | "USD";
  onToggleCurrency: () => void;
}

export function ClientPortalModal({
  isOpen,
  onClose,
  initialTab = "account",
  currency,
  onToggleCurrency,
}: ClientPortalModalProps) {
  const [activeTab, setActiveTab] = useState<PortalTab>(initialTab);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userEmail, setUserEmail] = useState("atelier.patron@void.in");
  const [userName, setUserName] = useState("Archival Patron");
  const [preferredSize, setPreferredSize] = useState("02");
  const [dropAlerts, setDropAlerts] = useState(true);
  const [measurementUnit, setMeasurementUnit] = useState<"in" | "cm">("in");

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const { volume, setVolume, isPlaying, toggleAudio } = useSoundtrack();

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail) {
      setUserEmail(loginEmail);
      setUserName(loginEmail.split("@")[0]);
      setIsLoggedIn(true);
      setActiveTab("account");
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (signupEmail && signupName) {
      setUserEmail(signupEmail);
      setUserName(signupName);
      setIsLoggedIn(true);
      setActiveTab("account");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("login");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fade-in">
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#0E0D0C] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <img
              src="/images/void_logo_cropped.png"
              alt="VOID"
              className="h-6 w-auto object-contain mix-blend-screen"
            />
            <div className="h-3 w-px bg-white/20" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-neutral-300">
              CLIENT ATELIER PORTAL
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close portal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-white/10 overflow-x-auto text-xs font-mono">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setActiveTab("account")}
                className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "account"
                    ? "border-white text-white font-bold"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>ACCOUNT</span>
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "orders"
                    ? "border-white text-white font-bold"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                <span>ORDERS & TRACKING</span>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "settings"
                    ? "border-white text-white font-bold"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>PREFERENCES</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab("login")}
                className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === "login"
                    ? "border-white text-white font-bold"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>SIGN IN</span>
              </button>

              <button
                onClick={() => setActiveTab("signup")}
                className={`pb-3 px-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                  activeTab === "signup"
                    ? "border-white text-white font-bold"
                    : "border-transparent text-neutral-400 hover:text-neutral-200"
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>CREATE PROFILE</span>
              </button>
            </>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: ACCOUNT PROFILE */}
          {activeTab === "account" && isLoggedIn && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-lg font-bold font-mono">
                    {userName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white font-sans">{userName}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[9px] font-mono font-bold">
                        ARCHIVE PATRON
                      </span>
                    </div>
                    <p className="text-xs font-mono text-neutral-400">{userEmail}</p>
                    <span className="text-[10px] font-mono text-neutral-500 mt-1 block">
                      Member Tier 01 · Verified Collector
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-neutral-400 hover:text-white hover:bg-white/5 transition-colors self-start sm:self-center cursor-pointer"
                >
                  SIGN OUT
                </button>
              </div>

              {/* Sizing & Measurements */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  PREFERRED STREETWEAR SIZING
                </h4>
                <div className="grid grid-cols-4 gap-2.5">
                  {[
                    { id: "01", fit: "Oversized S/M (Chest 44\")" },
                    { id: "02", fit: "Boxy L (Chest 48\")" },
                    { id: "03", fit: "Monumental XL (Chest 52\")" },
                    { id: "04", fit: "Exaggerated XXL (Chest 56\")" },
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setPreferredSize(s.id)}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        preferredSize === s.id
                          ? "bg-white text-black border-white font-bold"
                          : "bg-white/[0.02] text-neutral-300 border-white/5 hover:border-white/20"
                      }`}
                    >
                      <span className="text-sm font-mono font-bold block">{s.id}</span>
                      <span className="text-[9px] font-mono opacity-70 block mt-1 line-clamp-1">
                        {s.fit.split("(")[0]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Saved Shipping Addresses */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                    DISPATCH ADDRESS
                  </h4>
                  <button
                    onClick={() => alert("Address edit modal triggered.")}
                    className="text-[11px] font-mono text-blue-400 hover:underline cursor-pointer"
                  >
                    + ADD ADDRESS
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-mono text-white">HOME ATELIER</span>
                      <span className="px-1.5 py-0.5 rounded bg-white/10 text-[9px] font-mono text-neutral-300">
                        DEFAULT
                      </span>
                    </div>
                    <p className="text-xs text-neutral-300 font-light">
                      402 Skyline Boulevard, Bandra West
                      <br />
                      Mumbai, Maharashtra — 400050, India
                    </p>
                    <span className="text-[10px] font-mono text-neutral-500 block pt-1">
                      Courier: Blue Dart Domestic Priority Verified
                    </span>
                  </div>
                  <MapPin className="w-4 h-4 text-neutral-500" />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS & TRACKING */}
          {activeTab === "orders" && isLoggedIn && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  RECENT ACQUISITIONS (1)
                </h4>
                <span className="text-[10px] font-mono text-neutral-500">
                  Updated Live from Tirupur Hub
                </span>
              </div>

              {/* Sample Real Active Order */}
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono text-neutral-400 block">
                      ORDER #VOID-ARCHIVE-8492
                    </span>
                    <h4 className="text-sm font-bold text-white font-sans mt-0.5">
                      Edition 01 · Modernist Blueprint (Size 02)
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1.5">
                      <Truck className="w-3 h-3" />
                      DISPATCHED · IN TRANSIT
                    </span>
                  </div>
                </div>

                {/* 4-Stage Tracking Progress Line */}
                <div className="space-y-2 pt-1">
                  <div className="grid grid-cols-4 gap-2 text-[10px] font-mono text-center">
                    <span className="text-emerald-400 font-bold">1. Confirmed</span>
                    <span className="text-emerald-400 font-bold">2. Milled & QA</span>
                    <span className="text-white font-bold animate-pulse">3. In Transit</span>
                    <span className="text-neutral-500">4. Delivered</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 rounded-full w-[70%]" />
                  </div>
                </div>

                {/* Tracking Details */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-[11px] font-mono">
                  <div>
                    <span className="text-neutral-500 block">CARRIER</span>
                    <span className="text-neutral-200">Blue Dart Express</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">AIR WAYBILL #</span>
                    <span className="text-neutral-200">BD-98240182</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 block">EST. ARRIVAL</span>
                    <span className="text-emerald-400 font-bold">Tomorrow, by 6 PM</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs font-mono">
                  <span className="text-neutral-400">Total Paid: ₹2,890 (GST Included)</span>
                  <button
                    onClick={() => alert("Downloading verified archival invoice PDF...")}
                    className="text-white hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Download Invoice</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS & PREFERENCES */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                ATELIER PREFERENCES
              </h4>

              {/* Currency Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <h5 className="text-xs font-bold font-mono text-white">DISPLAY CURRENCY</h5>
                  <p className="text-[11px] text-neutral-400 font-light">
                    Currently selected: {currency === "INR" ? "Indian Rupee (₹)" : "US Dollar ($)"}
                  </p>
                </div>
                <button
                  onClick={onToggleCurrency}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  SWITCH TO {currency === "INR" ? "USD ($)" : "INR (₹)"}
                </button>
              </div>

              {/* Sizing Units */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <h5 className="text-xs font-bold font-mono text-white">MEASUREMENT UNITS</h5>
                  <p className="text-[11px] text-neutral-400 font-light">
                    For garment chest width, length, and sleeve specs
                  </p>
                </div>
                <div className="flex rounded-lg bg-black/60 border border-white/10 p-0.5 text-xs font-mono">
                  <button
                    onClick={() => setMeasurementUnit("in")}
                    className={`px-3 py-1 rounded transition-colors ${
                      measurementUnit === "in" ? "bg-white text-black font-bold" : "text-neutral-400"
                    }`}
                  >
                    INCHES
                  </button>
                  <button
                    onClick={() => setMeasurementUnit("cm")}
                    className={`px-3 py-1 rounded transition-colors ${
                      measurementUnit === "cm" ? "bg-white text-black font-bold" : "text-neutral-400"
                    }`}
                  >
                    CM
                  </button>
                </div>
              </div>

              {/* Ambient Audio Controls */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-xs font-bold font-mono text-white">AMBIENT SOUNDTRACK</h5>
                    <p className="text-[11px] text-neutral-400 font-light">
                      Foundation by AShamaluevMusic
                    </p>
                  </div>
                  <button
                    onClick={toggleAudio}
                    className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white hover:bg-white/10 cursor-pointer"
                  >
                    {isPlaying ? "MUTE" : "PLAY"}
                  </button>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <Volume2 className="w-4 h-4 text-neutral-400" />
                  <input
                    type="range"
                    min="0"
                    max="0.4"
                    step="0.02"
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full accent-white cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-neutral-400 w-8">
                    {Math.round((volume / 0.4) * 100)}%
                  </span>
                </div>
              </div>

              {/* Drop Notifications */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
                <div>
                  <h5 className="text-xs font-bold font-mono text-white">NUMBERED DROP ALERTS</h5>
                  <p className="text-[11px] text-neutral-400 font-light">
                    Receive 24-hour priority notifications via Email & SMS
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={dropAlerts}
                  onChange={(e) => setDropAlerts(e.target.checked)}
                  className="w-4 h-4 rounded bg-black border-white/20 text-blue-500 focus:ring-0 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB 4: LOGIN / SIGN IN */}
          {activeTab === "login" && !isLoggedIn && (
            <div className="max-w-md mx-auto space-y-6 py-4">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold font-sans uppercase text-white">
                  Client Authentication
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  Sign in to view orders, saved sizes, and member allocations.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="patron@void.in"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all cursor-pointer"
                >
                  SIGN IN TO ARCHIVE
                </button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => setActiveTab("signup")}
                  className="text-xs font-mono text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Don&apos;t have a client profile? Register here
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: SIGN UP */}
          {activeTab === "signup" && !isLoggedIn && (
            <div className="max-w-md mx-auto space-y-6 py-4">
              <div className="text-center space-y-1">
                <h3 className="text-xl font-bold font-sans uppercase text-white">
                  Create Client Profile
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  Join the VOID archive for advance drop access and custom sizing.
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    placeholder="patron@void.in"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono text-neutral-400 uppercase block mb-1">
                    PASSWORD
                  </label>
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-neutral-500 focus:outline-none focus:border-white/30"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all cursor-pointer"
                >
                  COMPLETE REGISTRATION
                </button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => setActiveTab("login")}
                  className="text-xs font-mono text-neutral-400 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClientPortalModal;
