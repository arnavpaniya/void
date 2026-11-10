import React from "react";

export const metadata = {
  title: "Privacy Policy · VOID Atelier",
  description: "Privacy policy and client data handling at VOID Atelier.",
};

export default function PrivacyPolicyPage() {
  return (
    <article className="space-y-8 font-sans">
      <header className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
          LEGAL SPECIFICATION // 01
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-2">
          Effective Date: Current Release · Governed by the Laws of India
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          1. Overview & Commitment
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          VOID Atelier (&ldquo;VOID&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal data. This privacy policy informs you how we collect, handle, process, and protect your information when you visit our digital atelier platform or acquire garments from our collections.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          2. Information We Collect
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          We collect only information necessary to fulfill orders, facilitate deliveries, and improve your interactive 3D runway browsing experience:
        </p>
        <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-300 font-light space-y-1.5 pl-2">
          <li><strong>Identity & Contact:</strong> Full name, shipping destination, billing address, email address, phone number for courier tracking.</li>
          <li><strong>Transaction Data:</strong> Details of acquired editions, size selection (`01 · 02 · 03 · 04`), order total, payment receipt token (we do not store raw card credentials).</li>
          <li><strong>Technical Browsing Data:</strong> Device viewport dimensions, clamped device pixel ratio (DPR), WebGL canvas rendering capabilities for 60fps frame rate optimization.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          3. How Your Information Is Used
        </h2>
        <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-300 font-light space-y-1.5 pl-2">
          <li>Dispatching physical garment packages via verified domestic and international courier logistics (e.g., Delhivery, Blue Dart, DHL Express).</li>
          <li>Sending order confirmations, tracking numbers, and edition verification certificates.</li>
          <li>Preventing fraudulent acquisitions and safeguarding our digital storefront.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          4. Data Security & Storage
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          All client communications, checkout requests, and user tokens are encrypted via Transport Layer Security (TLS 1.3 / SSL). We adhere to industry standards and do not sell, rent, or trade your personal data to third-party data brokers under any circumstances.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          5. Client Rights & Inquiries
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          You hold the right to access, update, or request the deletion of your customer profile. For any data-related inquiries or privacy requests, please contact our studio directly:
        </p>
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs text-neutral-300 space-y-1">
          <div>VOID ATELIER · DATA PRIVACY DESK</div>
          <div>Email: <a href="mailto:privacy@void-apparel.com" className="text-white underline">privacy@void-apparel.com</a></div>
          <div>Location: Bombay Studio & Tirupur Mill Archive, India</div>
        </div>
      </section>
    </article>
  );
}
