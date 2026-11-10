import React from "react";
import Link from "next/link";
import { ArrowLeft, Shield, FileText, Truck, Sparkles } from "lucide-react";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    { href: "/legal/privacy-policy", label: "Privacy Policy", icon: Shield },
    { href: "/legal/terms-of-service", label: "Terms of Service", icon: FileText },
    { href: "/legal/shipping-returns", label: "Shipping & Returns", icon: Truck },
    { href: "/legal/care-guide", label: "Care & Longevity", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-[#0E0D0C] text-neutral-100 flex flex-col justify-between selection:bg-neutral-800 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#0E0D0C]/90 backdrop-blur-md border-b border-white/10 px-6 sm:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 group text-white">
            <span className="text-xl font-black tracking-tighter uppercase font-mono">
              VOID
            </span>
          </Link>
          <div className="h-3 w-px bg-white/20" />
          <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase hidden sm:inline">
            LEGAL & POLICIES ARCHIVE
          </span>
        </div>

        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-neutral-300 hover:text-white transition-colors py-1.5 px-3.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO RUNWAY</span>
        </Link>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-6 sm:px-12 py-12 flex flex-col md:flex-row gap-12 flex-1">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="sticky top-28 space-y-6">
            <div className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
              DOCUMENT SECTIONS
            </div>
            <nav className="flex flex-row md:flex-col gap-1.5 overflow-x-auto pb-2 md:pb-0">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-mono text-neutral-300 hover:text-white hover:bg-white/5 transition-all whitespace-nowrap"
                  >
                    <Icon className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="hidden md:block pt-6 border-t border-white/10 text-[11px] font-mono text-neutral-400 space-y-1">
              <div>VOID ATELIER PVT LTD</div>
              <div>Bombay & Tirupur, India</div>
              <div>atelier@void-apparel.com</div>
            </div>
          </div>
        </aside>

        {/* Legal Document Content */}
        <main className="flex-1 max-w-3xl pb-16">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 sm:px-12 py-6 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-3">
        <span>© VOID PVT LTD. ALL RIGHTS RESERVED.</span>
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
    </div>
  );
}
