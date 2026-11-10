# VOID — POC Master Plan & Design Contract

## 1. Project Overview & Client Mandate
- **Brand**: VOID (provisional name for an experimental graphic apparel brand targeting Gen Z).
- **Goal**: Build an Awwwards-caliber Proof of Concept (POC) to submit to the client for validation before full production.
- **Core Directive**: 
  - Integrate **one standout immersive 3D/WebGL experience** that creates massive visual impact.
  - Seamlessly bridge the 3D experience with a fully functional, mobile-responsive e-commerce interface (Shopify-ready architecture).
  - Avoid 3D bloat across the whole site — keep it focused, lightweight, and locked at 60fps on mobile.
  - Zero sci-fi/robotic clichés (no "DROP 001 // SYSTEM_V1", no artificial page numbers or code headers). Pure high-fashion editorial storytelling.

---

## 2. Locked Color System: Dynamic Chameleon (Adaptive Studio)
Neither stark black nor sterile white. The stage uses an unbleached, warm architectural plaster base that smoothly morphs in ambient lighting and background tone when switching between garments:

### Base Canvas
- **Base Surface**: `#EFECE6` (Warm Unbleached Plaster / Linen)
- **Primary Typography & Structure**: `#161514` (Deep Ink Charcoal)
- **Secondary Subtle Type**: `#6B665F` (Muted Warm Stone)
- **Glass / Card Tint**: `rgba(255, 255, 255, 0.45)` with `backdrop-blur-md`

### Edition 01: The Atelier Cobalt
- **Canvas Atmosphere**: Soft Sand Gray (`#ECEAE4`)
- **Key Light**: Warm Daylight (`#FFFDF7`, intensity `1.2`)
- **Rim / Accent Light**: Deep Electric Cobalt (`#1E40AF`, intensity `2.4`)
- **UI Graphic Accent**: `#2563EB` (Electric Royal Blue)
- **Garment Concept**: Vintage Bone cotton with front chest typography & bold back cobalt screenprint.

### Edition 02: Terracotta Sunburst
- **Canvas Atmosphere**: Sun-drenched Earth (`#EAE3D9`)
- **Key Light**: Golden Softbox (`#FFF3E0`, intensity `1.3`)
- **Rim / Accent Light**: Burnt Amber (`#EA580C`, intensity `2.2`)
- **UI Graphic Accent**: `#FF5500` (Safety Tangerine)
- **Garment Concept**: Washed Terracotta with sunburst abstract graphic.

### Edition 03: Botanical Sage
- **Canvas Atmosphere**: Mineral Herbal Moss (`#E2E7E2`)
- **Key Light**: Crisp Morning Sky (`#F4F9F4`, intensity `1.2`)
- **Rim / Accent Light**: Acid Chartreuse (`#84CC16`, intensity `1.8`)
- **UI Graphic Accent**: `#65A30D` (Herbal Olive / Chartreuse)
- **Garment Concept**: Garment-dyed washed sage with organic line artwork.

---

## 3. The Editorial Preloader (The First Impression & Asset Sync)
A high-fashion, tactile intro that masks asset preloading (the 1.02 MB 3D model and graphic textures) so the 3D stage appears instantly fully rendered with zero popping:

- **Duration**: Fast & punchy (1.5s – 2.0s maximum, auto-completes as soon as the 3D model is ready).
- **Atmosphere**: Warm unbleached plaster (`#EFECE6`), identical to the base canvas for seamless continuity.
- **Visual Elements**:
  - Center: Minimalist editorial `VOID` wordmark paired with modern Devanagari `शून्य`.
  - **The Squeegee Ink Stroke**: A sleek, horizontal ink gauge that sweeps from 0% to 100%, styled after a screenprinter's squeegee pulling ink across a textile mesh.
  - Subtitle / Origin Seal: `"300 GSM INDIAN COMBED COTTON · MILLED IN TIRUPUR · PREPARING THE ATELIER"`.
  - Real-time numerical counter: `00` $\rightarrow$ `100%` in clean monospaced grotesque type.
- **The Unveil Choreography (GSAP)**:
  - Once 100% is reached, the preloader splits with an organic upward curtain sweep (`ease: [0.76, 0, 0.24, 1]`), seamlessly unveiling the floating 3D t-shirt right as the studio rim lighting activates.
- **Mobile & Fallback**:
  - Built with pure 2D CSS / SVG / GSAP (zero WebGL overhead during loading).
  - Includes a gentle "Tap to Enter" / Skip safeguard.

---

## 4. The Standout WebGL Experience (The Centerpiece)
1. **Interactive 3D Garment Model**:
   - **Asset**: `public/models/tshirt.glb` (1.02 MB self-contained binary GLB).
   - **Topology**: Optimized 14,000 polygon cloth simulation with PBR normal, roughness, and displacement maps for lifelike fabric micro-wrinkles, collar ribbing, and drop-shoulder seams.
   - **Performance**: Loads in <200ms with locked 60fps on mobile.
   - Soft ambient fabric breathing animation (gentle floating drift).
   - Desktop: Smooth mouse parallax tilt and directional sheen that follows the pointer.
   - Mobile: Silky 360° touch-drag with natural rotational inertia.
2. **Screen-Print Squeegee Wipe Interaction (Idea 1)**:
   - Dynamic fluid ink wipe across the chest on load or swipe, adhering the wet screenprint graphic ink to the cotton weave in real time.
3. **Real-Time Texture & Edition Switcher**:
   - Floating tactile swatch pills at the base of the viewport.
   - Selecting a swatch triggers a synchronized GSAP tween:
     - T-shirt texture / graphic updates seamlessly.
     - Background canvas tone and Three.js rim lights interpolate simultaneously.
4. **Camera Punch-In ("Inspect Cut & Details")**:
   - Smooth cinematic camera glide pivoting to inspect collar ribbing, drop-shoulder stitching, and 300 GSM cotton weave.

---

## 5. Seamless GSAP Scroll Choreography
- As the user scrolls past the hero stage:
  - GSAP `ScrollTrigger` smoothly pivots and docks the 3D t-shirt from center stage into the editorial lookbook layout.
  - Zero abrupt cuts or page jumps; the 3D canvas acts as the living connective tissue.

---

## 6. Editorial Commerce Layer (Shopify-Ready)
- **Product Storytelling**:
  - Silhouette specifications: 320 GSM French Terry, pre-shrunk, bespoke boxy drop shoulder.
  - Edition naming, graphic story, and transparent pricing.
- **Interactive Sizing & Bag**:
  - Size pills (`1 · 2 · 3 · 4` / `S · M · L · XL`).
  - Tactile "Add to Bag" action with instant micro-animation.
  - Slide-out Bag Drawer with item summary, subtotal, and checkout preview.

---

## 7. Performance & Mobile-First Guardrails
- **FPS Budget**: Locked 60fps on mobile devices.
- **DPR Clamping**: `dpr = Math.min(window.devicePixelRatio, 1.75)` to prevent GPU exhaustion on 3x retina displays.
- **Model Loading**: Progressive preloading with instant tactile UI skeleton.
- **Bundle Optimization**: Tree-shaken Three.js imports, hardware-accelerated CSS transforms.
