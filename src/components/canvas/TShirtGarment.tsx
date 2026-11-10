"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import { Edition } from "@/lib/types";

interface TShirtGarmentProps {
  edition: Edition;
  isInspecting?: boolean;
  userRotationY?: number;
  onPointerDown?: () => void;
  onPointerUp?: () => void;
}

export function TShirtGarment({
  edition,
  isInspecting = false,
  userRotationY = 0,
}: TShirtGarmentProps) {
  const { scene } = useGLTF("/models/tshirt.glb");
  const groupRef = useRef<THREE.Group>(null);
  const swaggerRef = useRef<THREE.Group>(null);
  const [textureMap, setTextureMap] = useState<THREE.Texture | null>(null);

  // Load graphic texture dynamically for edition
  useEffect(() => {
    if (!edition.graphicUrl) return;
    const loader = new THREE.TextureLoader();
    loader.load(
      edition.graphicUrl,
      (tex) => {
        tex.flipY = false;
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.colorSpace = THREE.SRGBColorSpace;
        setTextureMap(tex);
      },
      undefined,
      (err) => {
        console.warn("Failed to load graphic texture:", err);
      }
    );
  }, [edition.graphicUrl]);

  // Clone scene and setup PBR cotton fabric materials
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    return clone;
  }, [scene]);

  // Update materials when edition changes or texture loads
  useEffect(() => {
    const color = new THREE.Color(edition.tshirtColor);
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((mat) => {
            const m = mat.clone() as THREE.MeshStandardMaterial;
            m.color = color;
            m.roughness = 0.88;
            m.metalness = 0.04;
            if (textureMap) {
              m.map = textureMap;
              m.needsUpdate = true;
            }
            return m;
          });
        } else if (mesh.material) {
          const m = mesh.material.clone() as THREE.MeshStandardMaterial;
          m.color = color;
          m.roughness = 0.88;
          m.metalness = 0.04;
          if (textureMap) {
            m.map = textureMap;
            m.needsUpdate = true;
          }
          mesh.material = m;
        }
      }
    });
  }, [clonedScene, edition.tshirtColor, textureMap]);

  // Swagger and walking physics
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (swaggerRef.current) {
      if (!isInspecting) {
        // Natural streetwear swagger: stride vertical bob + shoulder counter-swivel
        const walkSpeed = 2.4;
        const bob = Math.sin(time * walkSpeed * 2) * 0.035;
        const swivel = Math.sin(time * walkSpeed) * 0.08;
        const sway = Math.cos(time * walkSpeed) * 0.03;
        const breath = Math.sin(time * 1.5) * 0.01;

        swaggerRef.current.position.y = bob + breath;
        swaggerRef.current.position.x = sway;
        swaggerRef.current.rotation.y = swivel;
        swaggerRef.current.rotation.z = -sway * 0.5;
        swaggerRef.current.rotation.x = Math.abs(bob) * 0.4;
      } else {
        // Smoothly return to center when inspecting
        swaggerRef.current.position.lerp(new THREE.Vector3(0, 0, 0), delta * 4);
        swaggerRef.current.rotation.y = THREE.MathUtils.lerp(swaggerRef.current.rotation.y, 0, delta * 4);
        swaggerRef.current.rotation.z = THREE.MathUtils.lerp(swaggerRef.current.rotation.z, 0, delta * 4);
        swaggerRef.current.rotation.x = THREE.MathUtils.lerp(swaggerRef.current.rotation.x, 0, delta * 4);
      }
    }

    if (groupRef.current) {
      // Smoothly interpolate user 360 drag rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        userRotationY,
        delta * 6
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <group ref={swaggerRef}>
        <Center top>
          {/* Scale 0.02 brings the 72cm garment to ~1.44 Three.js units */}
          <primitive object={clonedScene} scale={0.02} />
        </Center>
      </group>
    </group>
  );
}

useGLTF.preload("/models/tshirt.glb");
