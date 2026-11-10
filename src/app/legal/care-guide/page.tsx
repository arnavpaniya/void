import React from "react";

export const metadata = {
  title: "Garment Care & Longevity · VOID Atelier",
  description: "Textile washing, drying, and longevity guide for 300 GSM Tirupur combed cotton.",
};

export default function CareGuidePage() {
  return (
    <article className="space-y-8 font-sans">
      <header className="border-b border-white/10 pb-6">
        <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400 block mb-1">
          TEXTILE ARCHIVE // 04
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
          Garment Care & Longevity
        </h1>
        <p className="text-xs font-mono text-neutral-400 mt-2">
          Preserving the Architecture of 300 GSM Tirupur Combed Cotton
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          1. The Architecture of 300 GSM Cotton
        </h2>
        <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
          VOID t-shirts are milled with heavyweight 300 GSM single jersey knit from 100% Indian long-staple combed cotton yarns. The substantial weight provides a structural, sculptural drape that stands away from the body. Following these textile care practices guarantees your garment maintains its boxy silhouette and dense screenprint pigmentation for years.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          2. Washing Protocol
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
              Cold Machine Wash
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Always wash in cold water (maximum 30°C / 85°F). Hot water weakens cotton fibers and can cause uneven shrinkage or graphic distortion.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
              Turn Inside Out
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Turn the garment inside out prior to loading into the machine. This protects the high-density screenprint ink from friction against other textiles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
              Mild Detergent Only
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Use gentle liquid detergents free of optical brighteners and bleach. Never use fabric softeners, as they coat long-staple fibers and reduce breathability.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
            <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
              Gentle Spin Cycle
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Select a low spin cycle (800 RPM or lower) to prevent unnecessary tensile stress across the 1.25-inch ribbed neckband and shoulder seams.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          3. Drying & Shaping
        </h2>
        <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-300 font-light space-y-1.5 pl-2">
          <li><strong>DO NOT TUMBLE DRY:</strong> Mechanical heat from dryers degrades cotton elastic recovery and will shrink natural fibers.</li>
          <li><strong>Flat Air Dry:</strong> Lay the garment flat on a clean drying rack or towel in a shaded area. Avoid hanging wet heavy garments by the collar, as water weight can stretch the shoulders.</li>
          <li><strong>Avoid Direct Sunlight:</strong> Dry in shade to protect pigment color vibrancy (especially the Cobalt and Terracotta washes).</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-white uppercase font-mono tracking-wider">
          4. Ironing & Storage
        </h2>
        <ul className="list-disc list-inside text-xs sm:text-sm text-neutral-300 font-light space-y-1.5 pl-2">
          <li>Iron on low-to-medium heat with the garment inside out.</li>
          <li><strong>Never place a hot iron directly onto the screenprint artwork.</strong></li>
          <li>Fold and store flat on shelving rather than thin wire hangers to preserve the structural boxy shoulder line.</li>
        </ul>
      </section>
    </article>
  );
}
