# Project Continuity Snapshot

**Last Updated**: 2026-11-08T18:58:25+05:30  
**Last Task**: Replaced wild tumbling rotation with a locked diagonal orbital plane in liquid silver chrome (`#f1f5f9`, metalness `0.98`, roughness `0.03`) that spins smoothly in place. Rendered loading typography (`LOAD` / `ING`) in pure solid black `#000000` with 14° italic slant, and aligned all preloader details with reference design image.

## Architecture & Subsystems
- **3D Asset & Silver Chrome Orbit Ring**:
  - `public/models/white_tshirt_godzilla.glb`: The user's exact 3D oversized T-shirt model.
  - `UserTShirtModel.tsx` & `HeroGarmentViewer.tsx`:
    - T-shirt model scale set to `3.15` in vintage bone/ash cotton (`#dcd8cf`).
    - Diagonal orbital plane locked at `[0.26π, 0.16π, 0.22π]` tilt.
    - Ring spins smoothly along its circumference (`ringOrbitRef.current.rotation.z -= delta * 0.45`) in liquid silver chrome (`#f1f5f9`).
    - Active GPU vertex wind shader (`uWindSpeed: 2.8`, `uWindStrength: 0.02`) animating fabric creases.
- **Preloader Subsystem** (`src/components/preloader/Preloader.tsx`):
  - Strictly aligned with reference design image:
    - Pure solid deep black `#000000` display typography (`LOAD` on left, `ING` on right, `-skew-x-[14deg]`).
    - Compact deckle black torn paper card behind the T-shirt.
    - Torn red tape slices on borders.
    - Halftone eye graphic on right flank.
    - `[ SYSTEM INIT ]`, `+`, `/ 01` top markers.
    - Bottom status checklist (`LOAD ASSETS ✓`, `INIT 3D MODEL`, `BUILD SCENE`).
    - Pill progress bar with `62%` and `PREPARING EXPERIENCE`.
    - Vector barcode and corner crosshairs.
- **E-Commerce Subsystem**:
  - `HeroGarmentViewer.tsx`, `ProductGrid.tsx`, `LookbookGallery.tsx`, `CartDrawer.tsx`.

## Dev Run Commands
- Dev Server: `npm run dev` (Port 3000)
- Production Build: `npm run build` (runs `next build --webpack`)
- Production Server: `npm start`
- Replay Preloader: Button in navigation bar or footer
