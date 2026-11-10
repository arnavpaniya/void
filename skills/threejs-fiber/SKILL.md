---
name: threejs-fiber
description: Architect declarative 3D scenes in Next.js using Three.js, React Three Fiber (R3F), and Drei.
---

# Three.js & React Three Fiber (R3F) Skill Guide

This skill guide covers architecting declarative 3D scenes in Next.js using Three.js, `@react-three/fiber`, and `@react-three/drei`.

## SSR-Safe Dynamic Importing in Next.js App Router

Always import your 3D Scene client component using `next/dynamic` with `ssr: false` to avoid SSR window/canvas hydration mismatch:

```tsx
import dynamic from "next/dynamic";

export const Scene = dynamic(() => import("@/components/canvas/Scene").then(m => m.Scene), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-black/50 animate-pulse" />
});
```

## Performance & Optimization Rules

1. **Delta-based Animation**:
   Always multiply rotational and translational speeds by `delta` in `useFrame`:
   ```tsx
   useFrame((state, delta) => {
     meshRef.current.rotation.y += delta * speed;
   });
   ```

2. **Lerping Cursor & Interaction**:
   Use `THREE.MathUtils.lerp` for smooth easing towards target coordinates:
   ```tsx
   meshRef.current.position.x = THREE.MathUtils.lerp(
     meshRef.current.position.x,
     state.pointer.x * multiplier,
     0.05
   );
   ```

3. **InstancedMesh for High Counts**:
   When rendering thousands of identical objects (leaves, particles, cubes), use `<instancedMesh>` or `<points>` with a single `BufferGeometry` rather than thousands of separate `<mesh>` elements.

4. **Lighting Strategy**:
   - Combine soft `<ambientLight intensity={0.5} />` with focused `<directionalLight />` or `<pointLight />`.
   - Prefer baked shadows or subtle contact shadows (`<ContactShadows />` from `@react-three/drei`) over expensive real-time shadow maps when targeting mobile devices.
