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
  const flashRef = useRef<THREE.PointLight>(null);
  const flashIntensity = useRef(0);

  // Generate stylish front-row runway audience (optimized 54 spectators across 3 tiered rows)
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

    const hairColors = [
      "#0D0C0C", // Jet black
      "#221913", // Dark espresso brown
      "#3D2B1F", // Chestnut brown
      "#806B4D", // Honey blonde
      "#B49C73", // Ash blonde
      "#171717", // Raven
    ];

    const phoneColors = ["#E0F2FE", "#FEF3C7", "#F1F5F9", "#FFFFFF"];

    const sides = [-1, 1];

    sides.forEach((side) => {
      // Row 1: VIP Front Row — Seated directly beside the runway
      for (let z = -3.6; z <= 3.2; z += 0.62) {
        const xPos = side * (1.38 + (Math.random() - 0.5) * 0.04);
        const yPos = -0.44;
        const zPos = z + (Math.random() - 0.5) * 0.05;
        const baseRotY = side > 0 ? -Math.PI / 2 - 0.22 : Math.PI / 2 + 0.22;
        const skinIdx = Math.floor(Math.random() * skinTones.length);

        list.push({
          pos: [xPos, yPos, zPos],
          rotY: baseRotY + (Math.random() - 0.5) * 0.12,
          headTiltX: (Math.random() - 0.5) * 0.08,
          headTiltZ: side * (-0.05 - Math.random() * 0.06),
          jacketColor: jacketPalettes[Math.floor(Math.random() * jacketPalettes.length)],
          pantsColor: pantsPalettes[Math.floor(Math.random() * pantsPalettes.length)],
          skinColor: skinTones[skinIdx],
          eyeColor: "#111111",
          lipColor: "#B57666",
          hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
          hairStyle: "crop",
          hasGlasses: Math.random() > 0.45,
          isHoldingPhone: Math.random() > 0.38,
          phoneColor: phoneColors[Math.floor(Math.random() * phoneColors.length)],
          isStanding: false,
          scale: 0.95 + Math.random() * 0.08,
        });
      }

      // Row 2: Elevated Row — Fashion Editors & VIPs
      for (let z = -3.3; z <= 2.9; z += 0.66) {
        const xPos = side * (1.82 + (Math.random() - 0.5) * 0.04);
        const yPos = -0.26;
        const zPos = z + 0.3;
        const baseRotY = side > 0 ? -Math.PI / 2 - 0.18 : Math.PI / 2 + 0.18;
        const skinIdx = Math.floor(Math.random() * skinTones.length);

        list.push({
          pos: [xPos, yPos, zPos],
          rotY: baseRotY + (Math.random() - 0.5) * 0.12,
          headTiltX: (Math.random() - 0.5) * 0.08,
          headTiltZ: side * (-0.05 - Math.random() * 0.06),
          jacketColor: jacketPalettes[Math.floor(Math.random() * jacketPalettes.length)],
          pantsColor: pantsPalettes[Math.floor(Math.random() * pantsPalettes.length)],
          skinColor: skinTones[skinIdx],
          eyeColor: "#111111",
          lipColor: "#B57666",
          hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
          hairStyle: "bob",
          hasGlasses: Math.random() > 0.55,
          isHoldingPhone: Math.random() > 0.45,
          phoneColor: phoneColors[Math.floor(Math.random() * phoneColors.length)],
          isStanding: false,
          scale: 0.96 + Math.random() * 0.08,
        });
      }

      // Row 3: Top Gallery — Press & Photographers
      for (let z = -3.1; z <= 2.7; z += 0.72) {
        const xPos = side * (2.26 + (Math.random() - 0.5) * 0.05);
        const yPos = 0.06;
        const zPos = z + 0.15;
        const baseRotY = side > 0 ? -Math.PI / 2 - 0.12 : Math.PI / 2 + 0.12;
        const skinIdx = Math.floor(Math.random() * skinTones.length);

        list.push({
          pos: [xPos, yPos, zPos],
          rotY: baseRotY + (Math.random() - 0.5) * 0.12,
          headTiltX: (Math.random() - 0.5) * 0.08,
          headTiltZ: side * (-0.04 - Math.random() * 0.05),
          jacketColor: jacketPalettes[Math.floor(Math.random() * jacketPalettes.length)],
          pantsColor: pantsPalettes[Math.floor(Math.random() * pantsPalettes.length)],
          skinColor: skinTones[skinIdx],
          eyeColor: "#111111",
          lipColor: "#B57666",
          hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
          hairStyle: "textured",
          hasGlasses: Math.random() > 0.65,
          isHoldingPhone: Math.random() > 0.5,
          phoneColor: phoneColors[Math.floor(Math.random() * phoneColors.length)],
          isStanding: true,
          scale: 0.98 + Math.random() * 0.08,
        });
      }
    });

    return list;
  }, []);

  // High-performance single dynamic flash that bursts and moves across audience
  useFrame((_, delta) => {
    if (flashIntensity.current > 0.05) {
      flashIntensity.current = THREE.MathUtils.lerp(flashIntensity.current, 0, delta * 24);
    } else {
      flashIntensity.current = 0;
    }

    if (Math.random() < 0.09 && flashIntensity.current < 0.1) {
      flashIntensity.current = 6.0 + Math.random() * 5.0;
      if (flashRef.current) {
        const side = Math.random() > 0.5 ? 1 : -1;
        flashRef.current.position.set(
          side * (1.45 + Math.random() * 0.8),
          0.1 + Math.random() * 0.5,
          (Math.random() - 0.5) * 6.0
        );
      }
    }

    if (flashRef.current) {
      flashRef.current.intensity = flashIntensity.current;
    }
  });

  return (
    <group>
      {/* High-Performance Paparazzi Camera Flash Point Light */}
      <pointLight ref={flashRef} color="#FFFFFF" intensity={0} distance={9} decay={2} />

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

      {/* High-Performance Spectators (Streamlined 4-5 meshes per spectator, NO shadow map passes) */}
      {spectators.map((s, idx) => (
        <group
          key={`spectator-${idx}`}
          position={s.pos}
          rotation={[0, s.rotY, 0]}
          scale={s.scale}
        >
          {/* Lower Body */}
          {!s.isStanding ? (
            <mesh position={[0, -0.16, 0.12]} rotation={[Math.PI / 2.3, 0, 0]}>
              <capsuleGeometry args={[0.072, 0.26, 6, 8]} />
              <meshStandardMaterial color={s.pantsColor} roughness={0.65} />
            </mesh>
          ) : (
            <mesh position={[0, -0.22, 0]}>
              <capsuleGeometry args={[0.076, 0.44, 6, 8]} />
              <meshStandardMaterial color={s.pantsColor} roughness={0.65} />
            </mesh>
          )}

          {/* Shoes */}
          <mesh position={[0, s.isStanding ? -0.46 : -0.32, s.isStanding ? 0.04 : 0.24]}>
            <boxGeometry args={[0.13, 0.05, 0.12]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.4} />
          </mesh>

          {/* Torso & Tailored Jacket */}
          <mesh position={[0, 0.13, 0]}>
            <capsuleGeometry args={[0.098, 0.22, 6, 8]} />
            <meshStandardMaterial color={s.jacketColor} roughness={0.55} />
          </mesh>

          {/* Arms & Interactive Smartphone */}
          {s.isHoldingPhone ? (
            <group>
              <mesh position={[0.08, 0.14, 0.12]} rotation={[1.1, 0.2, -0.3]}>
                <capsuleGeometry args={[0.034, 0.2, 4, 6]} />
                <meshStandardMaterial color={s.jacketColor} roughness={0.55} />
              </mesh>
              {/* Glowing Smartphone Screen */}
              <mesh position={[0.12, 0.26, 0.22]} rotation={[-0.3, -0.2, 0]}>
                <boxGeometry args={[0.038, 0.07, 0.012]} />
                <meshBasicMaterial color={s.phoneColor} />
              </mesh>
            </group>
          ) : (
            <group>
              <mesh position={[-0.12, 0.08, 0.04]} rotation={[0.25, 0, 0.1]}>
                <capsuleGeometry args={[0.034, 0.22, 4, 6]} />
                <meshStandardMaterial color={s.jacketColor} roughness={0.55} />
              </mesh>
              <mesh position={[0.12, 0.08, 0.04]} rotation={[0.25, 0, -0.1]}>
                <capsuleGeometry args={[0.034, 0.22, 4, 6]} />
                <meshStandardMaterial color={s.jacketColor} roughness={0.55} />
              </mesh>
            </group>
          )}

          {/* Sculpted Head & Skin Tone */}
          <group position={[0, 0.35, 0]} rotation={[s.headTiltX, 0, s.headTiltZ]}>
            <mesh>
              <sphereGeometry args={[0.074, 8, 8]} />
              <meshStandardMaterial color={s.skinColor} roughness={0.5} />
            </mesh>

            {/* Haute Couture Hair Volume */}
            <mesh position={[0, 0.02, -0.01]} scale={[1.04, 1.08, 1.05]}>
              <sphereGeometry args={[0.075, 8, 8]} />
              <meshStandardMaterial color={s.hairColor} roughness={0.8} />
            </mesh>

            {/* Front-Row VIP Sunglasses */}
            {s.hasGlasses && (
              <mesh position={[0, 0.01, 0.072]}>
                <boxGeometry args={[0.085, 0.024, 0.018]} />
                <meshBasicMaterial color="#0A0A0A" />
              </mesh>
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
  const [isInView, setIsInView] = useState(true);

  // High-performance visibility check: pause 3D loop completely when user scrolls past hero
  useEffect(() => {
    const handleScroll = () => {
      const scrolledPast = window.scrollY > window.innerHeight * 1.15;
      setIsInView(!scrolledPast);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        frameloop={isInView ? "always" : "never"}
        dpr={[1, 1.25]}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
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
