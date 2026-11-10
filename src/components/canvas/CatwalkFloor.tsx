"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function CatwalkFloor() {
  return (
    <group position={[0, -1.05, 0]}>
      {/* Main Runway Tarmac Catwalk */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[2.4, 20]} />
        <meshStandardMaterial
          color="#201F1D"
          roughness={0.78}
          metalness={0.12}
        />
      </mesh>

      {/* Runway Border Edges (Tactile concrete curbs) */}
      <mesh position={[-1.22, 0.02, 0]}>
        <boxGeometry args={[0.04, 0.04, 20]} />
        <meshStandardMaterial color="#383531" roughness={0.9} />
      </mesh>
      <mesh position={[1.22, 0.02, 0]}>
        <boxGeometry args={[0.04, 0.04, 20]} />
        <meshStandardMaterial color="#383531" roughness={0.9} />
      </mesh>

      {/* Center Spotlight Target Ring (Where the model pauses for fit-check) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <ringGeometry args={[0.85, 0.88, 64]} />
        <meshBasicMaterial color="#EFECE6" transparent opacity={0.25} />
      </mesh>

      {/* Outer Flank Floor (Darker peripheral ground) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[16, 22]} />
        <meshStandardMaterial color="#0E0D0C" roughness={0.95} />
      </mesh>
    </group>
  );
}
