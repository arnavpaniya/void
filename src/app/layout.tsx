import type { Metadata } from "next";
import "./globals.css";
import { SoundtrackProvider } from "@/components/audio/SoundtrackPlayer";
import { FluidCursor } from "@/components/ui/FluidCursor";
import { SideDeveloperBadge } from "@/components/navigation/SideDeveloperBadge";

export const metadata: Metadata = {
  title: "VOID — Heavyweight Graphic Apparel",
  description:
    "Wearable Artifacts For The Modern Era. Constructed with heavyweight Tirupur combed cotton and archival screenprints.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Bruno+Ace+SC&family=Chakra+Petch:ital,wght@1,700;1,900&family=Jost:wght@300;400;500;600;700&family=Montserrat:wght@300;400;500;600&family=Orbitron:wght@700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@800;900&family=Unbounded:wght@800;900&family=Zen+Dots&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#0E0D0C] text-slate-100 font-sans antialiased overflow-x-hidden selection:bg-neutral-800 selection:text-white">
        <SoundtrackProvider>
          <FluidCursor />
          <SideDeveloperBadge />
          {children}
        </SoundtrackProvider>
      </body>
    </html>
  );
}
