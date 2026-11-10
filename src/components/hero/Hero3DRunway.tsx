"use client";

import React, { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";

interface ModelProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

// Preload the high-fashion runway backdrop banner
if (typeof window !== "undefined") {
  useTexture.preload("/images/runway-banner.jpg");
}

// =========================================================================
// 1. RUNWAY STAGE BACKDROP WITH BANNER (VOID ATELIER COLLECTION)
// =========================================================================
function RunwayBannerScreen() {
  const bannerTex = useTexture("/images/runway-banner.jpg");
  bannerTex.colorSpace = THREE.SRGBColorSpace;
  bannerTex.generateMipmaps = true;

  return (
    <mesh position={[0, 1.82, -0.2]}>
      <planeGeometry args={[16.8, 9.14]} />
      <meshBasicMaterial
        map={bannerTex}
        toneMapped={false}
      />
    </mesh>
  );
}

function RunwayBackgroundPortal() {
  return (
    <group position={[0, 0, -5.2]}>
      {/* Monumental Stage Back Wall (Warm Bone Alabaster / Travertine) */}
      <mesh position={[0, 1.82, -0.32]}>
        <planeGeometry args={[20.0, 11.0]} />
        <meshStandardMaterial
          color="#FAF9F6"
          roughness={0.4}
          metalness={0.02}
        />
      </mesh>

      {/* High-Fashion Studio Halo Stage Backdrop Banner */}
      <Suspense
        fallback={
          <mesh position={[0, 1.82, -0.2]}>
            <planeGeometry args={[16.8, 9.14]} />
            <meshStandardMaterial color="#FAF9F6" roughness={0.4} />
          </mesh>
        }
      >
        <RunwayBannerScreen />
      </Suspense>

      {/* Tiered Runway Entrance Steps (Descending onto Catwalk Floor) */}
      {[
        { y: -0.08, z: -0.15, depth: 0.5, width: 2.3 },
        { y: -0.2, z: -0.5, depth: 0.5, width: 2.5 },
        { y: -0.32, z: -0.85, depth: 0.5, width: 2.7 },
      ].map((step, idx) => (
        <mesh key={`step-${idx}`} position={[0, step.y, step.z]}>
          <boxGeometry args={[step.width, 0.12, step.depth]} />
          <meshStandardMaterial color="#E8E5DC" roughness={0.3} metalness={0.15} />
        </mesh>
      ))}

      {/* Backstage Halo Ambient Glow Light */}
      <pointLight position={[0, 2.2, 0.2]} intensity={4.5} distance={9} color="#FFFBF5" />
    </group>
  );
}

// =========================================================================
// 2. OVERHEAD CEILING LIGHTING RIG (CLEANLY AT THE CEILING, NO VERTICAL RODS ON RAMP)
// =========================================================================
function OverheadLightingTruss() {
  // Symmetrically centered along the top ceiling at Y = 2.05 (well above camera & model)
  const lightsZ = [-3.2, -2.0, -0.8, 0.4, 1.6, 2.8];

  return (
    <group position={[0, 2.05, 0]}>
      {/* Dual Longitudinal Industrial Ceiling Rails running HORIZONTALLY along Z */}
      <mesh position={[-0.95, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 9.2, 8]} />
        <meshStandardMaterial color="#161514" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.95, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 9.2, 8]} />
        <meshStandardMaterial color="#161514" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Horizontal Cross Truss Braces */}
      {[-3.4, -2.0, -0.6, 0.8, 2.2].map((z, idx) => (
        <mesh key={`cross-${idx}`} position={[0, 0, z]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 1.9, 8]} />
          <meshStandardMaterial color="#2B2927" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}

      {/* Symmetrical Studio Spotlights Angled Inward & Downward onto the Center Catwalk */}
      {lightsZ.map((z, idx) => {
        const isLeft = idx % 2 === 0;
        const xPos = isLeft ? -0.95 : 0.95;
        return (
          <group key={`spot-${idx}`} position={[xPos, -0.06, z]}>
            {/* Track Clamp Mount */}
            <mesh position={[0, 0.03, 0]}>
              <boxGeometry args={[0.035, 0.04, 0.035]} />
              <meshStandardMaterial color="#111111" />
            </mesh>

            {/* Compact Studio Spotlight Cylinder Angled Inward Toward Center */}
            <mesh rotation={[0.25, 0, isLeft ? -0.35 : 0.35]}>
              <cylinderGeometry args={[0.045, 0.065, 0.12, 16]} />
              <meshStandardMaterial color="#1F1E1D" metalness={0.85} roughness={0.25} />
            </mesh>

            {/* Glowing Spotlight Lens */}
            <mesh
              position={[isLeft ? 0.025 : -0.025, -0.06, 0]}
              rotation={[Math.PI / 2, 0, isLeft ? -0.2 : 0.2]}
            >
              <circleGeometry args={[0.048, 16]} />
              <meshBasicMaterial color="#FFFEE6" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// =========================================================================
// 3. REALISTIC CURVED HIGH-FASHION AUDIENCE (HIGH HEAD COUNT, PACKED BOTH SIDES)
// =========================================================================
interface SpectatorData {
  pos: [number, number, number];
  rotY: number;
  headTiltX: number;
  headTiltZ: number;
  jacketColor: string;
  pantsColor: string;
  skinColor: string;
  eyeColor: string;
  lipColor: string;
  hairColor: string;
  hairStyle: "crop" | "bun" | "bob" | "textured";
  hasGlasses: boolean;
  isHoldingPhone: boolean;
  phoneColor: string;
  isStanding: boolean;
  scale: number;
}

function PackedRunwayAudience() {
  const flash1Ref = useRef<THREE.PointLight>(null);
  const flash2Ref = useRef<THREE.PointLight>(null);
  const flash3Ref = useRef<THREE.PointLight>(null);
  const flash4Ref = useRef<THREE.PointLight>(null);

  const flash1Intensity = useRef(0);
  const flash2Intensity = useRef(0);
  const flash3Intensity = useRef(0);
  const flash4Intensity = useRef(0);

  // Generate dense, realistic audience with 120+ people across 4 tiered rows per side
  const spectators = useMemo(() => {
    const list: SpectatorData[] = [];

    const jacketPalettes = [
      "#121110", // Obsidian black tailored blazer
      "#1E1C1A", // Dark charcoal cashmere
      "#2C2A27", // Graphite tweed
      "#1B222C", // Deep midnight navy coat
      "#C4B69E", // Camel wool overcoat
      "#E2DED6", // Alabaster ecru jacket
      "#3A2B20", // Espresso brown leather
      "#42403B", // Slate minimalist suit
      "#2B332B", // Deep forest olive silk
    ];

    const pantsPalettes = [
      "#100F0E", // Jet black slacks
      "#1A1918", // Charcoal pleated trousers
      "#202630", // Raw indigo denim
      "#322F2B", // Deep taupe wool
      "#D4CFBF", // Cream tailored trousers
    ];

    const skinTones = [
      "#F1D8C4", // Fair porcelain
      "#E5C5A8", // Warm alabaster
      "#D3A982", // Golden peach
      "#B6825B", // Warm bronze
      "#7E5235", // Deep chestnut
      "#482B1C", // Rich espresso
    ];

    const lipColors = [
      "#C48978",
      "#B57666",
      "#9E5F50",
      "#784436",
      "#5E3326",
    ];

    const eyeColors = ["#191614", "#2B211A", "#111111", "#1E272E"];

    const hairColors = [
      "#0D0C0C", // Jet black
      "#221913", // Dark espresso brown
      "#3D2B1F", // Chestnut brown
      "#806B4D", // Honey blonde
      "#B49C73", // Ash blonde
      "#171717", // Raven
    ];

    const hairStyles: ("crop" | "bun" | "bob" | "textured")[] = ["crop", "bun", "bob", "textured"];

    const phoneColors = ["#E0F2FE", "#FEF3C7", "#F1F5F9", "#FFFFFF"];

    const sides = [-1, 1];

    sides.forEach((side) => {
      // Row 1: VIP Front Row — Seated right beside the runway
      // X = side * 1.38, Y = -0.44
      for (let z = -3.8; z <= 3.4; z += 0.42) {
        const xPos = side * (1.36 + Math.random() * 0.06);
        const yPos = -0.44;
        const zPos = z + (Math.random() - 0.5) * 0.05;

        // Angle faces and bodies toward center catwalk where model walks
        const baseRotY = side > 0 ? -Math.PI / 2 - 0.25 : Math.PI / 2 + 0.25;
        const skinIdx = Math.floor(Math.random() * skinTones.length);

        list.push({
          pos: [xPos, yPos, zPos],
          rotY: baseRotY + (Math.random() - 0.5) * 0.15,
          headTiltX: (Math.random() - 0.5) * 0.1,
          headTiltZ: side * (-0.06 - Math.random() * 0.08),
          jacketColor: jacketPalettes[Math.floor(Math.random() * jacketPalettes.length)],
          pantsColor: pantsPalettes[Math.floor(Math.random() * pantsPalettes.length)],
          skinColor: skinTones[skinIdx],
          eyeColor: eyeColors[Math.floor(Math.random() * eyeColors.length)],
          lipColor: lipColors[skinIdx % lipColors.length],
          hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
          hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
          hasGlasses: Math.random() > 0.65, // More spectators have open human eyes
          isHoldingPhone: Math.random() > 0.38,
          phoneColor: phoneColors[Math.floor(Math.random() * phoneColors.length)],
          isStanding: false,
          scale: 0.94 + Math.random() * 0.08,
        });
      }

      // Row 2: Elevated Seated Editors & Stylists
      // X = side * 1.78, Y = -0.26
      for (let z = -3.9; z <= 3.3; z += 0.44) {
        const xPos = side * (1.76 + Math.random() * 0.06);
        const yPos = -0.26;
        const zPos = z + 0.2 + (Math.random() - 0.5) * 0.05; // Staggered between row 1 gaps

        const baseRotY = side > 0 ? -Math.PI / 2 - 0.22 : Math.PI / 2 + 0.22;
        const skinIdx = Math.floor(Math.random() * skinTones.length);

        list.push({
          pos: [xPos, yPos, zPos],
          rotY: baseRotY + (Math.random() - 0.5) * 0.15,
          headTiltX: (Math.random() - 0.5) * 0.12,
          headTiltZ: side * (-0.06 - Math.random() * 0.08),
          jacketColor: jacketPalettes[Math.floor(Math.random() * jacketPalettes.length)],
          pantsColor: pantsPalettes[Math.floor(Math.random() * pantsPalettes.length)],
          skinColor: skinTones[skinIdx],
          eyeColor: eyeColors[Math.floor(Math.random() * eyeColors.length)],
          lipColor: lipColors[skinIdx % lipColors.length],
          hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
          hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
          hasGlasses: Math.random() > 0.7,
          isHoldingPhone: Math.random() > 0.45,
          phoneColor: phoneColors[Math.floor(Math.random() * phoneColors.length)],
          isStanding: false,
          scale: 0.95 + Math.random() * 0.08,
        });
      }

      // Row 3: Elevated Seated Buyers & Industry Guests
      // X = side * 2.18, Y = -0.08
      for (let z = -3.7; z <= 3.1; z += 0.46) {
        const xPos = side * (2.16 + Math.random() * 0.06);
        const yPos = -0.08;
        const zPos = z + (Math.random() - 0.5) * 0.05;

        const baseRotY = side > 0 ? -Math.PI / 2 - 0.18 : Math.PI / 2 + 0.18;
        const skinIdx = Math.floor(Math.random() * skinTones.length);

        list.push({
          pos: [xPos, yPos, zPos],
          rotY: baseRotY + (Math.random() - 0.5) * 0.15,
          headTiltX: (Math.random() - 0.5) * 0.12,
          headTiltZ: side * (-0.06 - Math.random() * 0.08),
          jacketColor: jacketPalettes[Math.floor(Math.random() * jacketPalettes.length)],
          pantsColor: pantsPalettes[Math.floor(Math.random() * pantsPalettes.length)],
          skinColor: skinTones[skinIdx],
          eyeColor: eyeColors[Math.floor(Math.random() * eyeColors.length)],
          lipColor: lipColors[skinIdx % lipColors.length],
          hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
          hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
          hasGlasses: Math.random() > 0.75,
          isHoldingPhone: Math.random() > 0.5,
          phoneColor: phoneColors[Math.floor(Math.random() * phoneColors.length)],
          isStanding: false,
          scale: 0.96 + Math.random() * 0.08,
        });
      }

      // Row 4: Standing Press, Photographers & Back Gallery
      // X = side * 2.58, Y = +0.12
      for (let z = -3.5; z <= 2.8; z += 0.48) {
        const xPos = side * (2.56 + Math.random() * 0.06);
        const yPos = 0.12;
        const zPos = z + 0.22 + (Math.random() - 0.5) * 0.06;

        const baseRotY = side > 0 ? -Math.PI / 2 - 0.15 : Math.PI / 2 + 0.15;
        const skinIdx = Math.floor(Math.random() * skinTones.length);

        list.push({
          pos: [xPos, yPos, zPos],
          rotY: baseRotY + (Math.random() - 0.5) * 0.15,
          headTiltX: (Math.random() - 0.5) * 0.12,
          headTiltZ: side * (-0.05 - Math.random() * 0.06),
          jacketColor: jacketPalettes[Math.floor(Math.random() * jacketPalettes.length)],
          pantsColor: pantsPalettes[Math.floor(Math.random() * pantsPalettes.length)],
          skinColor: skinTones[skinIdx],
          eyeColor: eyeColors[Math.floor(Math.random() * eyeColors.length)],
          lipColor: lipColors[skinIdx % lipColors.length],
          hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
          hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
          hasGlasses: Math.random() > 0.8,
          isHoldingPhone: Math.random() > 0.35,
          phoneColor: phoneColors[Math.floor(Math.random() * phoneColors.length)],
          isStanding: true,
          scale: 0.98 + Math.random() * 0.08,
        });
      }
    });

    return list;
  }, []);

  // Paparazzi camera flashes popping organically and frequently from both sides of the audience
  useFrame((_, delta) => {
    // Rapid natural flash decay
    flash1Intensity.current = THREE.MathUtils.lerp(flash1Intensity.current, 0, delta * 22);
    flash2Intensity.current = THREE.MathUtils.lerp(flash2Intensity.current, 0, delta * 22);
    flash3Intensity.current = THREE.MathUtils.lerp(flash3Intensity.current, 0, delta * 22);
    flash4Intensity.current = THREE.MathUtils.lerp(flash4Intensity.current, 0, delta * 22);

    // High frequency paparazzi trigger rate for authentic fashion week energy
    if (Math.random() < 0.12) {
      const bulb = Math.floor(Math.random() * 4);
      const intensity = 5.2 + Math.random() * 5.8;
      const side = Math.random() > 0.5 ? 1 : -1;
      const posX = side * (1.4 + Math.random() * 0.95);
      const posY = 0.05 + Math.random() * 0.65;
      const posZ = (Math.random() - 0.5) * 6.8;

      if (bulb === 0 && flash1Ref.current) {
        flash1Intensity.current = intensity;
        flash1Ref.current.position.set(posX, posY, posZ);
      } else if (bulb === 1 && flash2Ref.current) {
        flash2Intensity.current = intensity;
        flash2Ref.current.position.set(posX, posY, posZ);
      } else if (bulb === 2 && flash3Ref.current) {
        flash3Intensity.current = intensity;
        flash3Ref.current.position.set(posX, posY, posZ);
      } else if (bulb === 3 && flash4Ref.current) {
        flash4Intensity.current = intensity;
        flash4Ref.current.position.set(posX, posY, posZ);
      }
    }

    if (flash1Ref.current) flash1Ref.current.intensity = flash1Intensity.current;
    if (flash2Ref.current) flash2Ref.current.intensity = flash2Intensity.current;
    if (flash3Ref.current) flash3Ref.current.intensity = flash3Intensity.current;
    if (flash4Ref.current) flash4Ref.current.intensity = flash4Intensity.current;
  });

  return (
    <group>
      {/* High-Impact Multi-Source Paparazzi Camera Flashes */}
      <pointLight ref={flash1Ref} color="#FFFFFF" intensity={0} distance={11} decay={2} />
      <pointLight ref={flash2Ref} color="#EBF4FF" intensity={0} distance={10} decay={2} />
      <pointLight ref={flash3Ref} color="#FFF8F0" intensity={0} distance={11} decay={2} />
      <pointLight ref={flash4Ref} color="#FFFFFF" intensity={0} distance={10} decay={2} />

      {/* Tiered Gallery Seating Benches on Both Sides */}
      {/* Row 1 Benches */}
      <mesh position={[-1.4, -0.9, 0]} receiveShadow>
        <boxGeometry args={[0.44, 0.32, 9.4]} />
        <meshStandardMaterial color="#22201E" roughness={0.6} />
      </mesh>
      <mesh position={[1.4, -0.9, 0]} receiveShadow>
        <boxGeometry args={[0.44, 0.32, 9.4]} />
        <meshStandardMaterial color="#22201E" roughness={0.6} />
      </mesh>

      {/* Row 2 Elevated Benches */}
      <mesh position={[-1.8, -0.72, 0]} receiveShadow>
        <boxGeometry args={[0.44, 0.68, 9.4]} />
        <meshStandardMaterial color="#1A1918" roughness={0.6} />
      </mesh>
      <mesh position={[1.8, -0.72, 0]} receiveShadow>
        <boxGeometry args={[0.44, 0.68, 9.4]} />
        <meshStandardMaterial color="#1A1918" roughness={0.6} />
      </mesh>

      {/* Row 3 Elevated Benches */}
      <mesh position={[-2.2, -0.54, 0]} receiveShadow>
        <boxGeometry args={[0.44, 1.04, 9.4]} />
        <meshStandardMaterial color="#151413" roughness={0.6} />
      </mesh>
      <mesh position={[2.2, -0.54, 0]} receiveShadow>
        <boxGeometry args={[0.44, 1.04, 9.4]} />
        <meshStandardMaterial color="#151413" roughness={0.6} />
      </mesh>

      {/* Row 4 Standing Gallery Platform */}
      <mesh position={[-2.6, -0.36, 0]} receiveShadow>
        <boxGeometry args={[0.48, 1.4, 9.4]} />
        <meshStandardMaterial color="#100F0E" roughness={0.6} />
      </mesh>
      <mesh position={[2.6, -0.36, 0]} receiveShadow>
        <boxGeometry args={[0.48, 1.4, 9.4]} />
        <meshStandardMaterial color="#100F0E" roughness={0.6} />
      </mesh>

      {/* Realistic Curved Human Spectators (120+ Head Count) */}
      {spectators.map((s, idx) => (
        <group
          key={`spectator-${idx}`}
          position={s.pos}
          rotation={[0, s.rotY, 0]}
          scale={s.scale}
        >
          {/* ================= 1. CURVED LOWER BODY ================= */}
          {!s.isStanding ? (
            /* Natural Seated Posture with Smooth Curved Thighs & Knees */
            <group>
              {/* Rounded Curving Pelvis & Hips */}
              <mesh position={[0, -0.02, 0]} castShadow>
                <sphereGeometry args={[0.11, 14, 12]} />
                <meshStandardMaterial color={s.pantsColor} roughness={0.65} />
              </mesh>

              {/* Left Thigh (Curved forward capsule) */}
              <mesh
                position={[-0.055, -0.06, 0.11]}
                rotation={[Math.PI / 2 - 0.12, 0, -0.05]}
                castShadow
              >
                <capsuleGeometry args={[0.048, 0.18, 8, 12]} />
                <meshStandardMaterial color={s.pantsColor} roughness={0.65} />
              </mesh>

              {/* Right Thigh (Curved forward capsule) */}
              <mesh
                position={[0.055, -0.06, 0.11]}
                rotation={[Math.PI / 2 - 0.12, 0, 0.05]}
                castShadow
              >
                <capsuleGeometry args={[0.048, 0.18, 8, 12]} />
                <meshStandardMaterial color={s.pantsColor} roughness={0.65} />
              </mesh>

              {/* Left Lower Leg / Shin descending from knee */}
              <mesh position={[-0.055, -0.22, 0.21]} rotation={[0.12, 0, 0]} castShadow>
                <capsuleGeometry args={[0.042, 0.16, 8, 12]} />
                <meshStandardMaterial color={s.pantsColor} roughness={0.65} />
              </mesh>

              {/* Right Lower Leg / Shin descending from knee */}
              <mesh position={[0.055, -0.22, 0.21]} rotation={[0.12, 0, 0]} castShadow>
                <capsuleGeometry args={[0.042, 0.16, 8, 12]} />
                <meshStandardMaterial color={s.pantsColor} roughness={0.65} />
              </mesh>

              {/* Designer Loafers / Boots */}
              <mesh position={[-0.055, -0.32, 0.25]}>
                <boxGeometry args={[0.05, 0.04, 0.1]} />
                <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.2} />
              </mesh>
              <mesh position={[0.055, -0.32, 0.25]}>
                <boxGeometry args={[0.05, 0.04, 0.1]} />
                <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.2} />
              </mesh>
            </group>
          ) : (
            /* Standing Posture with Curved Legs */
            <group>
              <mesh position={[-0.055, -0.24, 0]} castShadow>
                <capsuleGeometry args={[0.048, 0.44, 8, 12]} />
                <meshStandardMaterial color={s.pantsColor} roughness={0.65} />
              </mesh>
              <mesh position={[0.055, -0.24, 0]} castShadow>
                <capsuleGeometry args={[0.048, 0.44, 8, 12]} />
                <meshStandardMaterial color={s.pantsColor} roughness={0.65} />
              </mesh>
              <mesh position={[-0.055, -0.48, 0.04]}>
                <boxGeometry args={[0.05, 0.04, 0.1]} />
                <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.2} />
              </mesh>
              <mesh position={[0.055, -0.48, 0.04]}>
                <boxGeometry args={[0.05, 0.04, 0.1]} />
                <meshStandardMaterial color="#111111" roughness={0.3} metalness={0.2} />
              </mesh>
            </group>
          )}

          {/* ================= 2. CURVED UPPER BODY & TAILORED JACKET ================= */}
          {/* Contoured Torso with Tapered Waist */}
          <mesh position={[0, 0.12, 0]} castShadow>
            <capsuleGeometry args={[0.095, 0.2, 10, 14]} />
            <meshStandardMaterial color={s.jacketColor} roughness={0.6} />
          </mesh>

          {/* Natural Curved Shoulders (Horizontal Capsule) */}
          <mesh position={[0, 0.21, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
            <capsuleGeometry args={[0.052, 0.24, 8, 12]} />
            <meshStandardMaterial color={s.jacketColor} roughness={0.6} />
          </mesh>

          {/* Shirt / Lapel Accent */}
          <mesh position={[0, 0.18, 0.07]}>
            <boxGeometry args={[0.06, 0.14, 0.03]} />
            <meshStandardMaterial color="#EAE7DF" roughness={0.7} />
          </mesh>

          {/* ================= 3. DETAILED REALISTIC ARMS & HANDS ================= */}
          {s.isHoldingPhone ? (
            /* Spectator holding smartphone up recording the catwalk */
            <group>
              {/* Left arm relaxed with detailed resting hand on lap */}
              <group position={[-0.12, 0.08, 0.04]} rotation={[0.2, 0, 0.08]}>
                <mesh>
                  <capsuleGeometry args={[0.034, 0.22, 6, 8]} />
                  <meshStandardMaterial color={s.jacketColor} roughness={0.6} />
                </mesh>
                {/* Left Hand: Wrist, Palm & Articulated Resting Fingers */}
                <group position={[0, -0.13, 0.04]} rotation={[0.4, 0, 0]}>
                  {/* Palm */}
                  <mesh>
                    <boxGeometry args={[0.032, 0.012, 0.038]} />
                    <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                  </mesh>
                  {/* 4 Gently Curled Fingers */}
                  {[-0.012, -0.004, 0.004, 0.012].map((fX, fIdx) => (
                    <mesh key={`lfinger-${fIdx}`} position={[fX, -0.006, 0.024]} rotation={[0.6, 0, 0]}>
                      <capsuleGeometry args={[0.0036, 0.016, 4, 6]} />
                      <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                    </mesh>
                  ))}
                  {/* Thumb */}
                  <mesh position={[0.018, 0.002, 0.01]} rotation={[0.2, 0.3, 0.5]}>
                    <capsuleGeometry args={[0.004, 0.014, 4, 6]} />
                    <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                  </mesh>
                </group>
              </group>

              {/* Right arm raised holding smartphone toward the runway */}
              <group>
                {/* Upper arm */}
                <mesh position={[0.11, 0.14, 0.06]} rotation={[0.42, 0, -0.18]}>
                  <capsuleGeometry args={[0.034, 0.14, 6, 8]} />
                  <meshStandardMaterial color={s.jacketColor} roughness={0.6} />
                </mesh>
                {/* Forearm angled up */}
                <mesh position={[0.1, 0.23, 0.15]} rotation={[-0.6, 0, -0.12]}>
                  <capsuleGeometry args={[0.032, 0.14, 6, 8]} />
                  <meshStandardMaterial color={s.jacketColor} roughness={0.6} />
                </mesh>

                {/* Right Hand Grasping the Phone */}
                <group position={[0.09, 0.29, 0.22]}>
                  {/* Palm cradling back/bottom of phone */}
                  <mesh position={[0, 0, -0.012]} rotation={[-0.3, -0.2, 0]}>
                    <boxGeometry args={[0.034, 0.036, 0.014]} />
                    <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                  </mesh>

                  {/* Thumb gripping the right side of phone */}
                  <mesh position={[0.024, 0.006, 0.005]} rotation={[-0.2, -0.3, -0.4]}>
                    <capsuleGeometry args={[0.0042, 0.018, 4, 6]} />
                    <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                  </mesh>

                  {/* 4 Articulated Fingers wrapping around the left edge of phone */}
                  {[-0.015, -0.005, 0.005, 0.015].map((fY, fIdx) => (
                    <mesh key={`rfinger-${fIdx}`} position={[-0.022, fY, 0.004]} rotation={[0, 0.5, 0.3]}>
                      <capsuleGeometry args={[0.0038, 0.016, 4, 6]} />
                      <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                    </mesh>
                  ))}

                  {/* Sleek Smartphone */}
                  <mesh position={[0, 0.02, 0.012]} rotation={[-0.3, -0.2, 0]}>
                    <boxGeometry args={[0.046, 0.082, 0.006]} />
                    <meshStandardMaterial color="#0F0E0E" roughness={0.15} metalness={0.85} />
                  </mesh>
                  {/* Phone Camera Lens module on backside facing runway */}
                  <mesh position={[-0.012, 0.046, 0.016]} rotation={[-0.3, -0.2, 0]}>
                    <cylinderGeometry args={[0.004, 0.004, 0.003, 8]} />
                    <meshStandardMaterial color="#222" roughness={0.1} metalness={0.9} />
                  </mesh>
                  {/* Glowing Screen on front side facing spectator */}
                  <mesh position={[0, 0.02, 0.008]} rotation={[-0.3, -0.2, 0]}>
                    <planeGeometry args={[0.042, 0.076]} />
                    <meshBasicMaterial color={s.phoneColor} />
                  </mesh>
                </group>
              </group>
            </group>
          ) : (
            /* Both hands resting with realistic palms and fingers */
            <group>
              {/* Left arm & hand */}
              <group position={[-0.12, 0.08, 0.04]} rotation={[0.2, 0, 0.08]}>
                <mesh>
                  <capsuleGeometry args={[0.034, 0.24, 6, 8]} />
                  <meshStandardMaterial color={s.jacketColor} roughness={0.6} />
                </mesh>
                <group position={[0, -0.14, 0.05]} rotation={[0.45, 0, 0]}>
                  {/* Palm */}
                  <mesh>
                    <boxGeometry args={[0.032, 0.012, 0.038]} />
                    <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                  </mesh>
                  {/* Fingers */}
                  {[-0.012, -0.004, 0.004, 0.012].map((fX, fIdx) => (
                    <mesh key={`nlfinger-${fIdx}`} position={[fX, -0.006, 0.024]} rotation={[0.6, 0, 0]}>
                      <capsuleGeometry args={[0.0036, 0.016, 4, 6]} />
                      <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                    </mesh>
                  ))}
                  {/* Thumb */}
                  <mesh position={[0.018, 0.002, 0.01]} rotation={[0.2, 0.3, 0.5]}>
                    <capsuleGeometry args={[0.004, 0.014, 4, 6]} />
                    <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                  </mesh>
                </group>
              </group>

              {/* Right arm & hand */}
              <group position={[0.12, 0.08, 0.04]} rotation={[0.2, 0, -0.08]}>
                <mesh>
                  <capsuleGeometry args={[0.034, 0.24, 6, 8]} />
                  <meshStandardMaterial color={s.jacketColor} roughness={0.6} />
                </mesh>
                <group position={[0, -0.14, 0.05]} rotation={[0.45, 0, 0]}>
                  {/* Palm */}
                  <mesh>
                    <boxGeometry args={[0.032, 0.012, 0.038]} />
                    <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                  </mesh>
                  {/* Fingers */}
                  {[-0.012, -0.004, 0.004, 0.012].map((fX, fIdx) => (
                    <mesh key={`nrfinger-${fIdx}`} position={[fX, -0.006, 0.024]} rotation={[0.6, 0, 0]}>
                      <capsuleGeometry args={[0.0036, 0.016, 4, 6]} />
                      <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                    </mesh>
                  ))}
                  {/* Thumb */}
                  <mesh position={[-0.018, 0.002, 0.01]} rotation={[0.2, -0.3, -0.5]}>
                    <capsuleGeometry args={[0.004, 0.014, 4, 6]} />
                    <meshStandardMaterial color={s.skinColor} roughness={0.5} />
                  </mesh>
                </group>
              </group>
            </group>
          )}

          {/* ================= 4. DETAILED HUMAN FACE WITH REALISTIC EYES ================= */}
          {/* Neck */}
          <mesh position={[0, 0.27, 0]}>
            <cylinderGeometry args={[0.036, 0.042, 0.07, 8]} />
            <meshStandardMaterial color={s.skinColor} roughness={0.55} />
          </mesh>

          {/* Natural Human Proportioned Head */}
          <group position={[0, 0.36, 0]} rotation={[s.headTiltX, 0, s.headTiltZ]}>
            {/* Base Sculpted Head */}
            <mesh castShadow>
              <sphereGeometry args={[0.072, 16, 16]} />
              <meshStandardMaterial color={s.skinColor} roughness={0.5} />
            </mesh>

            {/* Left & Right Ears */}
            <mesh position={[-0.071, 0, 0]} rotation={[0, -0.2, 0]}>
              <capsuleGeometry args={[0.007, 0.02, 4, 6]} />
              <meshStandardMaterial color={s.skinColor} roughness={0.55} />
            </mesh>
            <mesh position={[0.071, 0, 0]} rotation={[0, 0.2, 0]}>
              <capsuleGeometry args={[0.007, 0.02, 4, 6]} />
              <meshStandardMaterial color={s.skinColor} roughness={0.55} />
            </mesh>

            {/* Nose Bridge & Tip */}
            <mesh position={[0, -0.004, 0.072]} rotation={[0.2, 0, 0]}>
              <boxGeometry args={[0.011, 0.024, 0.012]} />
              <meshStandardMaterial color={s.skinColor} roughness={0.55} />
            </mesh>

            {/* Lips / Mouth */}
            <mesh position={[0, -0.026, 0.067]}>
              <boxGeometry args={[0.022, 0.005, 0.006]} />
              <meshStandardMaterial color={s.lipColor} roughness={0.45} />
            </mesh>

            {/* ================= DETAILED HUMAN EYES ================= */}
            {/* Left Eye */}
            <group position={[-0.024, 0.009, 0.065]}>
              {/* Sclera (Eye White) */}
              <mesh>
                <sphereGeometry args={[0.0075, 8, 8]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
              </mesh>
              {/* Iris & Pupil (Focused inward toward the catwalk) */}
              <mesh position={[0, 0, 0.004]}>
                <sphereGeometry args={[0.0044, 8, 8]} />
                <meshStandardMaterial color={s.eyeColor} roughness={0.1} />
              </mesh>
              {/* Eyelid / Lash Line */}
              <mesh position={[0, 0.006, 0.002]} rotation={[0, 0, 0.05]}>
                <boxGeometry args={[0.016, 0.0028, 0.004]} />
                <meshStandardMaterial color="#161413" roughness={0.8} />
              </mesh>
              {/* Eyebrow */}
              <mesh position={[0, 0.015, 0.002]} rotation={[0, 0, -0.08]}>
                <boxGeometry args={[0.019, 0.0035, 0.004]} />
                <meshStandardMaterial color={s.hairColor} roughness={0.9} />
              </mesh>
            </group>

            {/* Right Eye */}
            <group position={[0.024, 0.009, 0.065]}>
              {/* Sclera (Eye White) */}
              <mesh>
                <sphereGeometry args={[0.0075, 8, 8]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
              </mesh>
              {/* Iris & Pupil (Focused inward toward the catwalk) */}
              <mesh position={[0, 0, 0.004]}>
                <sphereGeometry args={[0.0044, 8, 8]} />
                <meshStandardMaterial color={s.eyeColor} roughness={0.1} />
              </mesh>
              {/* Eyelid / Lash Line */}
              <mesh position={[0, 0.006, 0.002]} rotation={[0, 0, -0.05]}>
                <boxGeometry args={[0.016, 0.0028, 0.004]} />
                <meshStandardMaterial color="#161413" roughness={0.8} />
              </mesh>
              {/* Eyebrow */}
              <mesh position={[0, 0.015, 0.002]} rotation={[0, 0, 0.08]}>
                <boxGeometry args={[0.019, 0.0035, 0.004]} />
                <meshStandardMaterial color={s.hairColor} roughness={0.9} />
              </mesh>
            </group>

            {/* Diverse High-Fashion Hairstyles */}
            {s.hairStyle === "crop" && (
              <mesh position={[0, 0.025, -0.01]} castShadow>
                <sphereGeometry args={[0.076, 14, 14]} />
                <meshStandardMaterial color={s.hairColor} roughness={0.8} />
              </mesh>
            )}
            {s.hairStyle === "bun" && (
              <group>
                <mesh position={[0, 0.02, -0.01]} castShadow>
                  <sphereGeometry args={[0.075, 14, 14]} />
                  <meshStandardMaterial color={s.hairColor} roughness={0.8} />
                </mesh>
                <mesh position={[0, 0.075, -0.03]} castShadow>
                  <sphereGeometry args={[0.032, 12, 12]} />
                  <meshStandardMaterial color={s.hairColor} roughness={0.8} />
                </mesh>
              </group>
            )}
            {s.hairStyle === "bob" && (
              <mesh position={[0, 0.005, -0.015]} scale={[1.06, 1.15, 1.08]} castShadow>
                <sphereGeometry args={[0.074, 14, 14]} />
                <meshStandardMaterial color={s.hairColor} roughness={0.8} />
              </mesh>
            )}
            {s.hairStyle === "textured" && (
              <mesh position={[0, 0.03, -0.005]} scale={[1.04, 1.12, 1.04]} castShadow>
                <sphereGeometry args={[0.076, 14, 14]} />
                <meshStandardMaterial color={s.hairColor} roughness={0.9} />
              </mesh>
            )}

            {/* Front-Row VIP Designer Sunglasses */}
            {s.hasGlasses && (
              <group position={[0, 0.009, 0.07]}>
                <mesh>
                  <boxGeometry args={[0.082, 0.022, 0.012]} />
                  <meshStandardMaterial color="#0A0A0A" roughness={0.15} metalness={0.8} />
                </mesh>
                <mesh position={[-0.024, 0, 0.007]}>
                  <planeGeometry args={[0.028, 0.018]} />
                  <meshStandardMaterial color="#111111" roughness={0.08} metalness={0.95} />
                </mesh>
                <mesh position={[0.024, 0, 0.007]}>
                  <planeGeometry args={[0.028, 0.018]} />
                  <meshStandardMaterial color="#111111" roughness={0.08} metalness={0.95} />
                </mesh>
              </group>
            )}
          </group>
        </group>
      ))}
    </group>
  );
}

// =========================================================================
// 4. BEAUTIFIED CENTERED RUNWAY CATWALK & CHARACTER (MODEL USED AS SHE IS)
// =========================================================================
function RunwayCatwalk({ mouse }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);

  useEffect(() => {
    let isMounted = true;
    const loader = new FBXLoader();

    loader.load(
      "/models/walking.fbx",
      (fbx) => {
        if (!isMounted) return;

        // Compute bounding box to normalize scale
        const bbox = new THREE.Box3().setFromObject(fbx);
        const size = bbox.getSize(new THREE.Vector3());
        
        const targetHeight = 2.2;
        const scaleFactor = size.y > 0 ? targetHeight / size.y : 0.012;
        fbx.scale.setScalar(scaleFactor);

        fbx.rotation.y = 0; 
        fbx.position.set(0, 0, 0);

        // Brighten & lighten face and legs skin tone (Ch02_Body)
        fbx.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // Target skin mesh: face, arms, and legs
            if (mesh.name.toLowerCase().includes("body")) {
              if (mesh.material) {
                const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                mats.forEach((m) => {
                  if (m instanceof THREE.MeshStandardMaterial || m instanceof THREE.MeshPhongMaterial) {
                    // Brighten and lighten skin into a fair, radiant tone
                    m.color = new THREE.Color("#FFFDF8");
                    if ("emissive" in m) {
                      m.emissive = new THREE.Color("#38302A"); // Subtle natural warm skin luminance
                    }
                    if (m instanceof THREE.MeshStandardMaterial) {
                      m.roughness = 0.44;
                      m.metalness = 0.05;
                    }
                  }
                });
              }
            }
          }
        });

        // Setup walking animation loop
        if (fbx.animations && fbx.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(fbx);
          mixerRef.current = mixer;

          const rawClip = fbx.animations[0];
          const clip = rawClip.clone();

          // Zero out Z root motion so model walks fluidly in place down the center catwalk
          clip.tracks.forEach((track) => {
            if (track.name.endsWith(".position") && (track.name.includes("Hips") || track.name.includes("Root"))) {
              for (let i = 0; i < track.values.length; i += 3) {
                track.values[i + 2] = 0;
              }
            }
          });

          const action = mixer.clipAction(clip);
          action.setEffectiveTimeScale(1.0);
          action.play();
        }

        setModel(fbx);
      },
      undefined,
      (err) => {
        console.error("Error loading walking.fbx:", err);
      }
    );

    return () => {
      isMounted = false;
      mixerRef.current?.stopAllAction();
    };
  }, []);

  // Frame loop: update animation mixer and gentle interactive mouse sway
  useFrame((state, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }

    if (groupRef.current) {
      const targetRotY = mouse.current.x * 0.12;
      const targetRotX = mouse.current.y * 0.035;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    }
  });

  return (
    // Centered directly at X = 0, lowered to ensure character face sits comfortably below the floating navbar
    <group ref={groupRef} position={[0, -1.24, 0]}>
      
      {/* Monumental Runway Stage Backdrop with Banner at Far End */}
      <RunwayBackgroundPortal />

      {/* Dense High-Fashion Audience Packed on Both Sides (120+ Head Count) */}
      <PackedRunwayAudience />

      {/* ================= BEAUTIFIED CATWALK RAMP (CLEAN, NO VERTICAL RODS) ================= */}
      
      {/* 1. Base Sculpted Podium Stage (Light Architectural Travertine) */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <boxGeometry args={[2.25, 0.12, 9.8]} />
        <meshStandardMaterial
          color="#E8E5DC"
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>

      {/* 2. Top Ultra-Gloss Polished Lacquer Mirror Floor (Bone Alabaster Sheen) */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[2.1, 9.6]} />
        <meshStandardMaterial
          color="#FFFFFF"
          roughness={0.06}
          metalness={0.55}
        />
      </mesh>

      {/* Runway Stage Glow & Floor Sheen Lights */}
      <pointLight position={[0, 0.25, 0.5]} intensity={2.0} distance={4.5} color="#FFF8F0" />
      <pointLight position={[0, 0.25, -2.5]} intensity={2.4} distance={5.0} color="#FFF8F0" />

      {/* 3. Recessed Glowing Runway Edge Light Runners (Warm Amber/Ivory Glow) */}
      <mesh position={[-1.04, 0.02, 0]}>
        <boxGeometry args={[0.03, 0.025, 9.6]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[1.04, 0.02, 0]}>
        <boxGeometry args={[0.03, 0.025, 9.6]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* 4. Sleek Obsidian Outer Framing Chamfer Rails */}
      <mesh position={[-1.09, 0.015, 0]}>
        <boxGeometry args={[0.04, 0.04, 9.8]} />
        <meshStandardMaterial color="#1A1918" roughness={0.3} />
      </mesh>
      <mesh position={[1.09, 0.015, 0]}>
        <boxGeometry args={[0.04, 0.04, 9.8]} />
        <meshStandardMaterial color="#1A1918" roughness={0.3} />
      </mesh>

      {/* 5. Minimalist Runway Distance Marker Ticks & Center Axis Dashes */}
      {[-3.5, -2.1, -0.7, 0.7, 2.1, 3.5].map((z, idx) => (
        <group key={`marker-${idx}`} position={[0, 0.015, z]}>
          {/* Side Terracotta Hash Marks */}
          <mesh position={[-0.96, 0, 0]}>
            <planeGeometry args={[0.08, 0.03]} />
            <meshBasicMaterial color="#B34728" />
          </mesh>
          <mesh position={[0.96, 0, 0]}>
            <planeGeometry args={[0.08, 0.03]} />
            <meshBasicMaterial color="#B34728" />
          </mesh>
          {/* Discreet Centerline Dash */}
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.03, 0.25]} />
            <meshBasicMaterial color="#D8D4CA" />
          </mesh>
        </group>
      ))}

      {/* ================= 3D WALKING CHARACTER (AS SHE IS) ================= */}
      {model ? (
        <primitive object={model} />
      ) : (
        /* Minimal sleek luxury wireframe while model loads */
        <group position={[0, 1.0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 2.0, 16, 4, true]} />
            <meshBasicMaterial color="#B34728" wireframe opacity={0.35} transparent />
          </mesh>
        </group>
      )}
    </group>
  );
}

export default function Hero3DRunway() {
  const mouse = useRef({ x: 0, y: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    mouse.current = { x, y };
  };

  return (
    <div
      className="absolute inset-0 w-full h-full pointer-events-auto"
      onPointerMove={handlePointerMove}
    >
      <Canvas
        shadows
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0.58, 4.3], fov: 41 }}
      >
        {/* Balanced Ambient Studio Fill - Enhanced Luminance for Light Theme */}
        <ambientLight intensity={1.35} color="#FFFFFF" />

        {/* Soft Front Beauty Fill specifically illuminating face & legs with radiant light */}
        <pointLight
          position={[0, 0.7, 1.8]}
          intensity={2.2}
          color="#FFF8F2"
          distance={5.0}
        />

        {/* Backstage Wall Illuminator Light */}
        <directionalLight
          position={[0, 4.0, -1.0]}
          intensity={1.8}
          color="#FFFDF7"
        />

        {/* Powerful Overhead Center Runway Spotlight */}
        <spotLight
          position={[0, 6.0, 2.0]}
          target-position={[0, 0, 0]}
          intensity={4.2}
          angle={0.75}
          penumbra={0.7}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
          color="#FFFDF6"
        />

        {/* Front Left Key Light */}
        <directionalLight
          position={[-3.0, 4.0, 3.0]}
          intensity={1.5}
          color="#FFFFFF"
        />

        {/* Front Right Fill Light */}
        <directionalLight
          position={[3.0, 4.0, 3.0]}
          intensity={1.5}
          color="#FFFFFF"
        />

        {/* Studio Halo Left Spotlight (matches the angled ceiling spotlights in the banner) */}
        <spotLight
          position={[-4.2, 4.8, -2.4]}
          target-position={[0, -0.4, 0.4]}
          intensity={4.0}
          angle={0.52}
          penumbra={0.8}
          color="#FFFDF7"
        />

        {/* Studio Halo Right Spotlight (matches the angled ceiling spotlights in the banner) */}
        <spotLight
          position={[4.2, 4.8, -2.4]}
          target-position={[0, -0.4, 0.4]}
          intensity={4.0}
          angle={0.52}
          penumbra={0.8}
          color="#FFFDF7"
        />

        {/* Ground Floor Shadow Catcher */}
        <mesh position={[0, -1.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[22, 22]} />
          <shadowMaterial opacity={0.16} />
        </mesh>

        {/* Symmetrical Overhead Lights Rig Positioned Cleanly at Top Ceiling */}
        <OverheadLightingTruss />

        <Suspense fallback={null}>
          <RunwayCatwalk mouse={mouse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
