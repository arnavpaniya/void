"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  Bookmark,
  Heart,
  LogOut,
  AlertCircle,
  Pencil,
  ChevronRight,
  Truck,
  FileText,
  X,
  Check,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Header } from "@/components/commerce/Header";
import { CartDrawer } from "@/components/commerce/CartDrawer";
import { VoidFooter } from "@/components/commerce/VoidFooter";
import { EDITIONS, CartItem } from "@/lib/types";

export default function AccountPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "designs" | "wishlist">("profile");
  const [currency, setCurrency] = useState<"INR" | "USD">("INR");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // User Profile Data (Default Anonymous Patron)
  const [fullName, setFullName] = useState("Patron Client");
  const [email, setEmail] = useState("patron@voidatelier.com");
  const [phone, setPhone] = useState("Not provided");
  const [shippingAddress, setShippingAddress] = useState("No default address provided.");
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Temp form state for edit modal
  const [editName, setEditName] = useState(fullName);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("void_auth_user");
      if (stored) {
        const parsed = JSON.parse(stored);
        // Exclude hardcoded personal names if previously saved
        if (parsed.name && !parsed.name.toLowerCase().includes("arnav")) {
          setFullName(parsed.name);
          setEditName(parsed.name);
        }
        if (parsed.email && !parsed.email.toLowerCase().includes("arnav")) {
          setEmail(parsed.email);
          setEditEmail(parsed.email);
        }
        if (parsed.phone) {
          setPhone(parsed.phone);
          setIsSetupComplete(true);
        }
        if (parsed.address) {
          setShippingAddress(parsed.address);
          setIsSetupComplete(true);
        }
      }
    } catch {
      // Keep defaults
    }
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setFullName(editName.trim() || "Patron Client");
    setEmail(editEmail.trim() || "patron@voidatelier.com");
    if (editPhone.trim()) {
      setPhone(editPhone.trim());
    }
    if (editAddress.trim()) {
      setShippingAddress(editAddress.trim());
    }
    setIsSetupComplete(true);
    setIsEditing(false);

    try {
      localStorage.setItem(
        "void_auth_user",
        JSON.stringify({
          name: editName.trim() || "Patron Client",
          email: editEmail.trim() || "patron@voidatelier.com",
          phone: editPhone.trim() || phone,
          address: editAddress.trim() || shippingAddress,
          signedIn: true,
        })
      );
    } catch {}
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem("void_auth_user");
    } catch {}
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#111111] font-sans selection:bg-neutral-300 selection:text-black flex flex-col justify-between">
      {/* Universal Floating Header */}
      <Header
        editions={EDITIONS}
        activeEdition={EDITIONS[0]}
        onSelectEdition={() => {}}
        currency={currency}
        onToggleCurrency={() => setCurrency((prev) => (prev === "INR" ? "USD" : "INR"))}
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={() => {}}
        onUpdateSize={() => {}}
        onRemoveItem={() => {}}
        currency={currency}
      />

      {/* Main Account Viewport */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-8 lg:px-12 pt-28 sm:pt-36 pb-24 flex-1">
        
        {/* ================= TOP EDITORIAL HEADER (MATCHES SCREENSHOT) ================= */}
        <div className="pb-8 border-b border-neutral-200">
          <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-400 block mb-2 font-bold">
            CUSTOMER STUDIO / ACCOUNT
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight text-black uppercase leading-[0.95]">
            WELCOME BACK, {fullName.split(" ")[0].toUpperCase()}
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-3 font-sans">
            Your orders, saved ideas and account details in one place.
          </p>
        </div>

        {/* ================= TWO-COLUMN GRID LAYOUT (MATCHES SCREENSHOT) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-start">
          
          {/* 1. LEFT SIDEBAR (User Profile & Navigation Menu) */}
          <aside className="lg:col-span-4 rounded-3xl bg-white border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
            {/* User Bio Card */}
            <div className="p-6 pb-5">
              <div className="w-14 h-14 rounded-full bg-neutral-900 text-[#F5F4F0] flex items-center justify-center font-bold text-base tracking-wider border border-neutral-800 shadow-sm">
                {fullName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) || "VP"}
              </div>

              <h2 className="text-base font-bold text-black font-sans mt-3.5 tracking-tight">
                {fullName}
              </h2>
              <p className="text-xs text-neutral-500 font-sans mt-0.5 break-all">
                {email}
              </p>
            </div>

            {/* Sidebar Navigation Items */}
            <nav className="border-t border-neutral-100 divide-y divide-neutral-100 text-sm">
              <button
                type="button"
                onClick={() => setActiveTab("profile")}
                className={`w-full px-6 py-4 flex items-center justify-between transition-colors cursor-pointer text-left ${
                  activeTab === "profile"
                    ? "bg-neutral-50 font-bold text-black"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-neutral-500" />
                  <span>Profile</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("orders")}
                className={`w-full px-6 py-4 flex items-center justify-between transition-colors cursor-pointer text-left ${
                  activeTab === "orders"
                    ? "bg-neutral-50 font-bold text-black"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4 text-neutral-500" />
                  <span>My Orders</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("designs")}
                className={`w-full px-6 py-4 flex items-center justify-between transition-colors cursor-pointer text-left ${
                  activeTab === "designs"
                    ? "bg-neutral-50 font-bold text-black"
                    : "text-neutral-700 hover:bg-neutral-50 hover:text-black"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Bookmark className="w-4 h-4 text-neutral-500" />
                  <span>Saved Designs</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </button>

              <Link
                href="/wishlist"
                className="w-full px-6 py-4 flex items-center justify-between text-neutral-700 hover:bg-neutral-50 hover:text-black transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-4 h-4 text-neutral-500" />
                  <span>Wishlist</span>
                </div>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                className="w-full px-6 py-4 flex items-center gap-3 text-rose-500 hover:bg-rose-50/50 hover:text-rose-600 transition-colors cursor-pointer text-left font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </nav>
          </aside>

          {/* 2. RIGHT MAIN CONTENT AREA */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tab: Profile View */}
            {activeTab === "profile" && (
              <>
                {/* Amber Warning Banner (Matches Screenshot) */}
                {!isSetupComplete && (
                  <div className="rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] p-5 sm:p-6 shadow-sm">
                    <div className="flex items-start gap-3.5">
                      <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-bold text-[#92400E]">
                          Account details incomplete
                        </h3>
                        <p className="text-xs text-[#B45309] mt-1 leading-relaxed">
                          Provide your default shipping details now so you don't have to fill them in at checkout every time.
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setEditName(fullName);
                            setEditEmail(email);
                            setIsEditing(true);
                          }}
                          className="text-xs font-bold text-[#92400E] underline underline-offset-4 mt-2 hover:text-black transition-colors cursor-pointer block"
                        >
                          Complete Setup Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Profile Information Card (Matches Screenshot) */}
                <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                  <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
                    <h2 className="text-lg font-bold text-black font-sans">
                      Profile Information
                    </h2>
                    <button
                      type="button"
                      onClick={() => {
                        setEditName(fullName);
                        setEditEmail(email);
                        setIsEditing(true);
                      }}
                      className="px-3.5 py-1.5 rounded-lg border border-neutral-200 hover:border-black text-xs font-sans font-medium text-black transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Pencil className="w-3.5 h-3.5 text-neutral-500" />
                      <span>Edit Details</span>
                    </button>
                  </div>

                  {/* 2-Column Information Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8 py-5">
                    <div>
                      <span className="text-xs text-neutral-400 block font-sans">
                        Full Name
                      </span>
                      <span className="text-sm font-bold text-black mt-0.5 block font-sans">
                        {fullName}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-neutral-400 block font-sans">
                        Email
                      </span>
                      <span className="text-sm font-bold text-black mt-0.5 block font-sans break-all">
                        {email}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-neutral-400 block font-sans">
                        Phone
                      </span>
                      <span className="text-sm font-bold text-black mt-0.5 block font-sans">
                        {phone}
                      </span>
                    </div>

                    <div>
                      <span className="text-xs text-neutral-400 block font-sans">
                        Member Since
                      </span>
                      <span className="text-sm font-bold text-black mt-0.5 block font-sans">
                        November 2026
                      </span>
                    </div>
                  </div>

                  {/* Shipping Address Row */}
                  <div className="pt-5 border-t border-neutral-100">
                    <span className="text-xs text-neutral-400 block font-sans">
                      Shipping Address
                    </span>
                    <span className="text-sm text-neutral-500 mt-1 block italic font-sans">
                      {shippingAddress}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Tab: My Orders View */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                  <h2 className="text-lg font-bold text-black font-sans pb-5 border-b border-neutral-100">
                    Active & Past Orders
                  </h2>

                  {/* Sample Active Order */}
                  <div className="py-6 border-b border-neutral-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-20 rounded-xl bg-neutral-100 overflow-hidden border border-neutral-200 shrink-0">
                        <Image
                          src="/images/products/product_01_on_air.jpg"
                          alt="Edition 01 Boxy Tee"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-black">#VD-9024</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold uppercase">
                            In Transit
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-black font-sans uppercase">
                          Edition 01 · Modernist 'On Air' Boxy Tee
                        </h3>
                        <p className="text-xs text-neutral-500 font-mono mt-0.5">
                          Size: 02 / M · 300 GSM Heavyweight · Qty: 1
                        </p>
                        <span className="text-xs font-mono font-bold text-black mt-1 block">
                          ₹2,890
                        </span>
                      </div>
                    </div>

                    <a
                      href="https://www.bluedart.com"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-black hover:bg-neutral-800 text-white text-xs font-mono uppercase tracking-wider transition-colors"
                    >
                      Track Package
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Tab: Saved Designs */}
            {activeTab === "designs" && (
              <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
                <h2 className="text-lg font-bold text-black font-sans pb-5 border-b border-neutral-100">
                  Saved Custom Works & Editions
                </h2>
                <div className="py-12 text-center text-sm text-neutral-500 font-sans">
                  <p>No custom saved designs in your archive yet.</p>
                  <Link
                    href="/shop"
                    className="inline-block mt-3 px-5 py-2 rounded-lg bg-black text-white text-xs font-mono uppercase tracking-wider hover:bg-neutral-800 transition-colors"
                  >
                    Browse Collections
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-5">
              <h3 className="text-lg font-bold text-black font-sans">
                Edit Profile Details
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-sans text-neutral-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-neutral-600 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-neutral-600 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98200 XXXXX"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-sans text-neutral-600 mb-1">
                  Default Shipping Address
                </label>
                <textarea
                  rows={3}
                  placeholder="Street address, City, Pincode"
                  value={editAddress}
                  onChange={(e) => setEditAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-black font-sans"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-xs font-sans text-neutral-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-sans font-bold transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Clean Bone Footer */}
      <VoidFooter preset="bone" />
    </div>
  );
}
