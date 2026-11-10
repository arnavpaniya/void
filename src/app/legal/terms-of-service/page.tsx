import React from "react";

export const metadata = {
  title: "Terms of Service · VOID Atelier",
  description: "Terms and conditions of sale for VOID Atelier garments and digital platform.",
};

export default function TermsOfServicePage() {
  return (
    <article className="space-y-8 font-sans">
      <header className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
          LEGAL SPECIFICATION // 02
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
          Terms of Service
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-2">
          Effective Date: Current Release · Governed by the Laws of India
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          1. General Terms
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          By accessing the VOID digital platform, viewing the 3D runway presentation, or acquiring any edition, you agree to comply with and be bound by these Terms of Service. If you disagree with any portion of these terms, please refrain from using the platform.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          2. Limited Editions & Availability
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          All VOID garments are crafted in strictly limited quantities using heavyweight 300 GSM Indian combed cotton milled in Tirupur. Items placed in your digital shopping bag are not reserved until checkout is fully completed and payment is confirmed. VOID reserves the right to cancel orders suspected of unauthorized automated purchasing (botting) or commercial resale.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          3. Pricing & Currency
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          Prices displayed in Indian Rupees (INR ₹) include applicable domestic Goods and Services Tax (GST). For international patrons viewing prices in United States Dollars (USD $), customs duties and local import taxes may apply upon delivery according to destination country regulations.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          4. Intellectual Property
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          All typography, graphics, screenprint prints (including the Modernist Devanagari and Terracotta Surya artworks), 3D garments, motion choreography, photography, and the bitmap blackletter VOID wordmark are the exclusive intellectual property of VOID Atelier Pvt Ltd. Any reproduction, cloning, or commercial redistribution without prior written consent is strictly prohibited.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          5. Governing Jurisdiction
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          These terms and any contracts formed through acquisition shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Mumbai, Maharashtra.
        </p>
      </section>
    </article>
  );
}
