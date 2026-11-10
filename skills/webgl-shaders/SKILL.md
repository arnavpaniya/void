---
name: webgl-shaders
description: Build high-performance WebGL shaders, vertex displacement, fragment effects, and custom GLSL materials in Next.js and Three.js.
---

# WebGL & GLSL Shaders Skill Guide

This guide covers building high-performance WebGL shaders and integrating custom GLSL materials in Next.js and Three.js.

## Core Concepts
- **Vertex Shader**: Computes vertex positions in 3D/clip space. Used for wave elevations, flag simulations, particle displacement, and geometric transforms.
- **Fragment Shader**: Computes the color, alpha, and lighting of each pixel/fragment. Used for chromatic aberration, noise fields, raymarching, and procedural textures.
- **Uniforms**: Global read-only variables passed from CPU (JavaScript/React) to GPU (shaders), such as `uTime`, `uResolution`, and `uMouse`.
- **Varyings**: Variables passed from the vertex shader to the fragment shader, linearly interpolated across triangles.

## Custom Shader Material Recipe (R3F)

```tsx
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  uniform vec2 uMouse;

  void main() {
    vUv = uv;
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    float elevation = sin(modelPosition.x * 2.0 + uTime) * 0.1;
    modelPosition.z += elevation;
    vElevation = elevation;

    gl_Position = projectionMatrix * viewMatrix * modelPosition;
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying float vElevation;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;

  void main() {
    vec3 color = mix(uColorA, uColorB, vElevation + 0.5);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function CustomShaderMesh() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2() },
    uColorA: { value: new THREE.Color("#00f0ff") },
    uColorB: { value: new THREE.Color("#a855f7") },
  }), []);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    materialRef.current.uniforms.uMouse.value.set(state.pointer.x, state.pointer.y);
  });

  return (
    <mesh>
      <planeGeometry args={[3, 3, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
```

## Best Practices
1. **Dynamic Resolution & DPR**: Always clamp DPR: `dpr={[1, 2]}` to prevent GPU thermal throttling on retina displays.
2. **Dispose Geometries & Materials**: Let Three.js / R3F automatically manage memory or call `.dispose()` on unmount for dynamically instantiated assets.
3. **Avoid Uniform Allocation in `useFrame`**: Reuse existing vector/color objects rather than instantiating `new THREE.Vector2()` inside `useFrame`.
