"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RunwayAudienceProps {
  flashTrigger: number;
}

export function RunwayAudience({ flashTrigger }: RunwayAudienceProps) {
  const flashLightRef = useRef<THREE.PointLight>(null);
  const flashIntensity = useRef(0);

  // Generate fixed positions for audience silhouettes and glowing smartphone screens
  const { crowdPositions, phoneScreens } = useMemo(() => {
    const crowd: { pos: [number, number, number]; scale: [number, number, number]; rotY: number }[] = [];
    const phones: { pos: [number, number, number]; rot: [number, number, number] }[] = [];

    // Left and Right flanks of the catwalk (catwalk width is approx 2.4 units, X = -1.8 to -3.5 and +1.8 to +3.5)
    const sides = [-1, 1];
    sides.forEach((side) => {
      for (let z = -6; z <= 4; z += 0.8) {
        // Front row spectator silhouette
        const xDist = side * (1.65 + Math.random() * 0.4);
        crowd.push({
          pos: [xDist, -0.4 + Math.random() * 0.1, z + Math.random() * 0.2],
          scale: [0.45 + Math.random() * 0.1, 1.4 + Math.random() * 0.2, 0.2],
          rotY: side > 0 ? -Math.PI / 2 + 0.2 : Math.PI / 2 - 0.2,
        });

        // Second row slightly raised
        const xDist2 = side * (2.3 + Math.random() * 0.5);
        crowd.push({
          pos: [xDist2, -0.2 + Math.random() * 0.1, z + 0.3],
          scale: [0.45 + Math.random() * 0.1, 1.45 + Math.random() * 0.2, 0.2],
          rotY: side > 0 ? -Math.PI / 2 + 0.2 : Math.PI / 2 - 0.2,
        });

        // Phone screen held up to record
        if (Math.random() > 0.3) {
          phones.push({
            pos: [
              side * (1.45 + Math.random() * 0.2),
              0.1 + Math.random() * 0.25,
              z + Math.random() * 0.3,
            ],
            rot: [
              -0.1,
              side > 0 ? -Math.PI / 2 - 0.1 : Math.PI / 2 + 0.1,
              0,
            ],
          });
        }
      }
    });

    return { crowdPositions: crowd, phoneScreens: phones };
  }, []);

  // Paparazzi Flash loop
  useFrame((state, delta) => {
    // Decay flash intensity
    if (flashIntensity.current > 0.05) {
      flashIntensity.current = THREE.MathUtils.lerp(flashIntensity.current, 0, delta * 12);
    } else {
      flashIntensity.current = 0;
    }

    // Occasional spontaneous paparazzi flash
    if (Math.random() < 0.015 && flashIntensity.current < 0.1) {
      flashIntensity.current = 2.5 + Math.random() * 2.5;
      if (flashLightRef.current) {
        // Randomly choose left or right crowd position for the flash
        const side = Math.random() > 0.5 ? 1 : -1;
        flashLightRef.current.position.set(
          side * (1.6 + Math.random() * 0.8),
          0.3 + Math.random() * 0.4,
          (Math.random() - 0.5) * 3
        );
      }
    }

    if (flashLightRef.current) {
      flashLightRef.current.intensity = flashIntensity.current;
    }
  });

  return (
    <group>
      {/* Paparazzi Camera Flash Point Light */}
      <pointLight
        ref={flashLightRef}
        color="#FFFFFF"
        intensity={0}
        distance={6}
        decay={2}
      />

      {/* Crowd Silhouettes (Dark warm shapes in peripheral shadow) */}
      {crowdPositions.map((c, i) => (
        <mesh key={`crowd-${i}`} position={c.pos} scale={c.scale} rotation={[0, c.rotY, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#141312"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Glowing Smartphone Screens held up by spectators */}
      {phoneScreens.map((p, i) => (
        <mesh key={`phone-${i}`} position={p.pos} rotation={p.rot}>
          <planeGeometry args={[0.07, 0.13]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? "#93C5FD" : "#FEF3C7"}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}
