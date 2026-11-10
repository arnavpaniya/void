# VOID — Interactive WebGL, Three.js & GSAP Studio

A creative engineering platform and skill toolkit built with **Next.js 16**, **Node.js**, **Three.js**, **WebGL GLSL Shaders**, **GSAP 3**, and **Motion (motion/react)**.

---

## Features

- **WebGL & Three.js 3D Viewport**:
  - Declarative 3D scene architecture using `@react-three/fiber` and `@react-three/drei`.
  - Multiple geometry primitives: Torus Knot, Icosahedron, Dodecahedron, and Sphere.
  - Interactive mouse pointer lerping and elastic physics.
  - Dynamic 2,500+ particle field with trigonometric wave oscillation.
- **Custom GLSL Shader Pipeline**:
  - Raw vertex displacement and fragment chromatic interference shaders.
  - Live uniforms: `uTime`, `uMouse`, `uColorA`, and `uColorB`.
- **GSAP & Scroll Choreography**:
  - Kinetic typography word-by-word staggered reveal (`GsapTextReveal`).
  - Elastic magnetic hover buttons (`GsapMagnetic` powered by `gsap.quickTo`).
  - Horizontal card gallery pinned with GSAP `ScrollTrigger`.
  - Fluid trailing dual-layer cursor (`InteractiveCursor`).
- **Motion (`motion/react`) Spring Physics & Portfolio Showcase**:
  - Filterable interactive project bento grid (`MotionShowcase`).
  - Smooth spring pill indicator animations (`layoutId="activeFilterPill"`).
  - Exit & enter transitions with `AnimatePresence`.
  - Interactive case study detail modal.
- **Real-Time Interactive HUD**:
  - On-screen control dock to switch render pipelines (Combo, 3D Geometry, GLSL Shader, Particle Cloud), adjust rotation velocity, toggle wireframe mode, and swap color palettes.
- **Integrated Skills & Architectural Guides**:
  - All skill folders integrated in `skills/` (from `/Users/arnavpaniya/skills/`), including `framer-motion`, `ui-ux-pro-max`, `portfolio-landing-page`, `project-continuity`, `mp-caveman`, `mp-grill-me`, `mp-improve-codebase-architecture`, and `skill-creator`.
  - Living project continuity snapshot in `CONTINUITY.md`.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16 (App Router)** | Modern full-stack React framework with Turbopack & Webpack |
| **Node.js (v24+)** | Runtime environment |
| **Three.js & R3F** | Declarative 3D graphics and WebGL scene graph |
| **@react-three/drei** | Modern 3D utilities, cameras, float controls, and shaders |
| **GSAP 3 & @gsap/react** | Production animation engine with ScrollTrigger and `useGSAP` |
| **Motion (`motion/react`)** | Spring physics, layout animations, and gesture handling |
| **Tailwind CSS v4** | Utility-first responsive styling and modern theming |
| **Lucide React** | Clean, minimalist UI iconography |
| **Lenis** | Smooth inertial scrolling integration |

---

## Project Structure

```
VOID/
├── CONTINUITY.md                    # Living project continuity snapshot
├── skills/                          # Skills & Architectural Recipes
│   ├── framer-motion/SKILL.md       # Motion 12 (motion/react) spring physics & layout
│   ├── ui-ux-pro-max/SKILL.md       # Visual styles, color palettes & UX heuristics
│   ├── portfolio-landing-page/SKILL.md # Creator portfolio, work grid & case studies
│   ├── project-continuity/SKILL.md  # Fast context recovery & snapshot rules
│   ├── mp-caveman/SKILL.md          # Token-compressed caveman communication
│   ├── mp-grill-me/SKILL.md         # Interactive design interview protocol
│   ├── mp-improve-codebase-architecture/SKILL.md # Deep module & seam engineering
│   ├── skill-creator/SKILL.md       # New skill authoring guide
│   ├── webgl-shaders/SKILL.md       # Raw GLSL, vertex/fragment shaders & uniforms
│   ├── threejs-fiber/SKILL.md       # Three.js, R3F, Drei, and scene optimization
│   ├── gsap-scrolltrigger/SKILL.md  # GSAP timelines, quickTo physics & ScrollTrigger
│   └── interactive-animations/SKILL.md # Smooth scrolling, fluid cursor & micro-interactions
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout & dark mode theme
│   │   ├── page.tsx                 # Main interactive studio & showcase
│   │   └── globals.css              # Global styles & Tailwind CSS configuration
│   ├── components/
│   │   ├── canvas/
│   │   │   ├── Scene.tsx            # R3F Canvas wrapper with lighting & OrbitControls
│   │   │   ├── FloatingGeometry.tsx # 3D mesh with mouse responsiveness & wireframe
│   │   │   ├── ParticleField.tsx    # High-count WebGL buffer geometry particle cloud
│   │   │   └── ShaderPlane.tsx      # Custom GLSL vertex & fragment shader material
│   │   ├── gsap/
│   │   │   ├── GsapMagnetic.tsx     # Magnetic physics button with elastic spring
│   │   │   ├── GsapTextReveal.tsx   # Kinetic typography staggered reveal
│   │   │   ├── GsapHorizontalScroll.tsx # Pin & scrub horizontal showcase section
│   │   │   └── InteractiveCursor.tsx # Dual-layer fluid cursor follower
│   │   ├── motion/
│   │   │   └── MotionShowcase.tsx   # Spring physics filterable bento & modal
│   │   └── interactive/
│   │       └── InteractiveControls.tsx # Real-time HUD control dock
│   ├── hooks/
│   │   └── useMousePosition.ts      # Reactive raw and normalized mouse coordinates
│   └── lib/
│       └── gsap.ts                  # Client-side GSAP and ScrollTrigger registry
├── next.config.ts                   # Next.js configuration
├── package.json                     # Dependencies and scripts
└── tsconfig.json                    # TypeScript compiler options
```

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
```bash
npm run build
npm start
```
# void
