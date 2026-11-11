# Project Continuity Snapshot

**Last Updated**: 2026-11-11T21:44:00+05:30  
**Last Task**: Wall-to-Wall Steel Rod, Infinite Conveyor Loop, Tight Garment Density, & Sequential Reticle Animations
- **Wall-to-Wall Steel Rod**: Removed boxed `max-w-7xl` constraint and curved elbows. Rod now runs 100% edge-to-edge across the viewport (`w-full`) with cylindrical shadows and metallic glint.
- **Removed Duplicate Rod Artifacts**: Scrubbed studio rod remnants in rows 0-15 of all 5 side garment image cutouts (`side_garment_*.png`).
- **Substantial Garment Scale & Tight Spacing**: Enlarged hanging garments to `max-h-[500px]` with tight overlap pitch (`-mr-1 sm:-mr-2`), replicating real boutique hanger stand density.
- **100% Seamless Infinite Marquee**: 54 items in 2 identical 27-item cycles translating `0%` to `-50%` continuously without gaps or hitches.
- **Sequential Reticle Animations**: When inspected, garment smoothly lifts forward (`garmentStageEnter`). Callouts no longer appear instantly; reticle dots pop open, leader lines draw outward (`scaleX(0)` to `scaleX(1)`), and concise badges slide in sequentially per target with staggered timing.
- **Zero Title Overlap**: "Latest Collection" title automatically fades and translates away while garment is inspected.
- **Production Build**: `npm run build` passing 100% with zero errors.

## Architecture & Subsystems
- **App Core**: Next.js 16 (App Router, Tailwind v4, Port 3000)
- **Three.js & Canvas**:
  - `ThreeWarningFilter.tsx`: Client-level Three.js console cleaner for r187 deprecations.
  - `Hero3DRunway.tsx` & `StreetwearRunwayScene.tsx`: PCFShadowMap shadows.
- **Garment Rack Subsystem** (`src/components/commerce/GarmentRackSection.tsx`):
  - Single horizontal steel rod spanning screen.
  - 3D metallic hangers with collar tucking (zero gap).
  - Sideways 3D clothing rack conveyor.
  - Pull-out interaction with radar target callouts (`RadarTargetCallout`).
  - Single bubble font headline: "Latest Collection".
- **Product Routing**:
  - Direct navigation to `/shop/[id]` product page for all cards and list items. Zero blocking modal popups.
- **E-Commerce Subsystem**:
  - `HeroGarmentViewer.tsx`, `Header.tsx`, `CartDrawer.tsx`, `TopDripCarousel.tsx`, `TrendingSection.tsx`.

## Dev Run Commands
- Dev Server: `npm run dev` (Port 3000)
- Production Build: `npm run build` (runs `next build --webpack`)
- Production Server: `npm start`
