import React from "react";

export const metadata = {
  title: "Shipping & Returns · VOID Atelier",
  description: "Dispatch timelines, courier logistics, and exchange policy for VOID garments.",
};

export default function ShippingReturnsPage() {
  return (
    <article className="space-y-8 font-sans">
      <header className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
          LOGISTICS & ATELIER CARE // 03
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
          Shipping & Returns
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-2">
          Dispatched from Tirupur Mill & Bombay Studio
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          1. Domestic Dispatch (India)
        </h2>
        <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-300 font-light space-y-1.5 pl-2">
          <li><strong>Timelines:</strong> Orders are processed and packed within 24 to 48 hours from our production mill in Tirupur, Tamil Nadu.</li>
          <li><strong>Transit Duration:</strong> Metro deliveries typically take 2 to 4 business days. Regional destinations require 4 to 6 business days.</li>
          <li><strong>Courier Partners:</strong> Blue Dart Air, Delhivery Express, and DTDC Premium with live SMS & WhatsApp tracking links.</li>
          <li><strong>Shipping Fees:</strong> Complimentary express ground shipping on all domestic orders across India.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          2. International Courier
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          We ship worldwide via DHL Express and FedEx International Priority (typically 4–7 business days). International shipping fees are calculated at checkout based on weight and country destination.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          3. Return & Size Exchange Policy
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          Due to the limited yardage and numbered production of each edition, we prioritize size exchanges over commercial returns:
        </p>
        <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-300 font-light space-y-1.5 pl-2">
          <li><strong>7-Day Exchange Window:</strong> You may request a size exchange (`01`, `02`, `03`, or `04`) within 7 calendar days of confirmed delivery.</li>
          <li><strong>Garment Condition:</strong> Pieces must be unworn, unwashed, unaltered, and retained with original packaging and swing tags attached.</li>
          <li><strong>Defective or Damaged Pieces:</strong> In the rare instance of manufacturing defects, contact us within 48 hours of receipt for an immediate priority replacement or full refund.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          4. How to Initiate an Exchange
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          To initiate an exchange, email <a href="mailto:dispatch@void-apparel.com" className="text-white underline">dispatch@void-apparel.com</a> with your order number and requested size. Our courier will schedule a doorstep reverse pickup for domestic orders.
        </p>
      </section>
    </article>
  );
}
