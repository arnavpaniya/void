"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { Edition } from "@/lib/types";

export type RunwayMotionType =
  | "walkForward"
  | "turn180"
  | "twist180"
  | "turn90R"
  | "casual";

export interface MotionMeta {
  id: RunwayMotionType;
  label: string;
  file: string;
  description: string;
}

export const RUNWAY_MOTIONS: MotionMeta[] = [
  {
    id: "walkForward",
    label: "Catwalk Strut",
    file: "/animations/Catwalk Walk Forward.fbx",
    description: "High-fashion pacing with hip drop and shoulder swagger",
  },
  {
    id: "turn180",
    label: "Turn 180° (Wide)",
    file: "/animations/Catwalk Walk Turn 180 Wide.fbx",
    description: "Dramatic end-of-runway 180 turnaround",
  },
  {
    id: "twist180",
    label: "Twist 180°",
    file: "/animations/Catwalk Twist R To Walk 180.fbx",
    description: "Sharp streetwear pivot and turnaround",
  },
  {
    id: "turn90R",
    label: "Turn 90°",
    file: "/animations/Catwalk Walk Forward Turn 90R.fbx",
    description: "Catwalk corner 90 degree stride",
  },
  {
    id: "casual",
    label: "Streetwear Stride",
    file: "/animations/Walking.fbx",
    description: "Natural everyday streetwear walking loop",
  },
];

interface RunwayModelProps {
  activeMotion: RunwayMotionType;
  inPlace?: boolean;
  edition: Edition;
  userRotationY?: number;
  onLoaded?: () => void;
}

export function RunwayModel({
  activeMotion,
  inPlace = true,
  edition,
  userRotationY = 0,
  onLoaded,
}: RunwayModelProps) {
  const rootRef = useRef<THREE.Group>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const actionsRef = useRef<Map<RunwayMotionType, THREE.AnimationAction>>(new Map());
  const currentActionRef = useRef<THREE.AnimationAction | null>(null);
  const loadedClipsRef = useRef<Map<RunwayMotionType, THREE.AnimationClip>>(new Map());

  // Load the base character mesh and first animation
  useEffect(() => {
    const loader = new FBXLoader();
    let isMounted = true;

    loader.load(
      "/animations/Catwalk Walk Forward.fbx",
      (fbx) => {
        if (!isMounted) return;

        // Apply luxury high-fashion obsidian runway styling
        fbx.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.name.includes("Joints")) {
              mesh.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color("#2E2B27"),
                metalness: 0.85,
                roughness: 0.25,
              });
            } else {
              // Body surface: matte obsidian with subtle velvet sheen
              mesh.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color("#161514"),
                metalness: 0.1,
                roughness: 0.72,
              });
            }
          }
        });

        const mixer = new THREE.AnimationMixer(fbx);
        mixerRef.current = mixer;

        if (fbx.animations.length > 0) {
          const rawClip = fbx.animations[0];
          const clip = inPlace ? processInPlaceClip(rawClip) : rawClip.clone();
          clip.name = "walkForward";
          loadedClipsRef.current.set("walkForward", clip);

          const action = mixer.clipAction(clip);
          action.setEffectiveTimeScale(1.0);
          action.play();
          currentActionRef.current = action;
          actionsRef.current.set("walkForward", action);
        }

        setModel(fbx);
        onLoaded?.();
      },
      undefined,
      (err) => console.error("Error loading catwalk model:", err)
    );

    return () => {
      isMounted = false;
      mixerRef.current?.stopAllAction();
    };
  }, [inPlace, onLoaded]);

  // Helper to zero out Z translation for in-place looping
  function processInPlaceClip(originalClip: THREE.AnimationClip): THREE.AnimationClip {
    const clip = originalClip.clone();
    clip.tracks.forEach((track) => {
      if (track.name.endsWith(".position") && track.name.includes("Hips")) {
        for (let i = 0; i < track.values.length; i += 3) {
          track.values[i + 2] = 0; // Lock Z translation
        }
      }
    });
    return clip;
  }

  // Switch or load new animation when activeMotion changes
  useEffect(() => {
    if (!model || !mixerRef.current) return;

    const mixer = mixerRef.current;
    const motionMeta = RUNWAY_MOTIONS.find((m) => m.id === activeMotion);
    if (!motionMeta) return;

    const switchToAction = (action: THREE.AnimationAction) => {
      const prev = currentActionRef.current;
      if (prev === action) return;

      action.reset();
      action.setEffectiveTimeScale(1.0);
      action.setEffectiveWeight(1.0);

      if (activeMotion === "turn180" || activeMotion === "twist180" || activeMotion === "turn90R") {
        action.setLoop(THREE.LoopOnce, 1);
        action.clampWhenFinished = true;
      } else {
        action.setLoop(THREE.LoopRepeat, Infinity);
      }

      action.play();

      if (prev) {
        prev.crossFadeTo(action, 0.35, true);
      }
      currentActionRef.current = action;
    };

    // If clip already cached, play immediately
    const existingAction = actionsRef.current.get(activeMotion);
    if (existingAction) {
      switchToAction(existingAction);
      return;
    }

    // Otherwise load the FBX for this animation asynchronously
    const loader = new FBXLoader();
    loader.load(
      motionMeta.file,
      (animFbx) => {
        if (!mixerRef.current) return;
        if (animFbx.animations.length > 0) {
          const rawClip = animFbx.animations[0];
          const clip = inPlace && activeMotion === "walkForward" || activeMotion === "casual"
            ? processInPlaceClip(rawClip)
            : rawClip.clone();

          clip.name = activeMotion;
          loadedClipsRef.current.set(activeMotion, clip);

          const action = mixerRef.current.clipAction(clip);
          actionsRef.current.set(activeMotion, action);
          switchToAction(action);
        }
      },
      undefined,
      (err) => console.error(`Error loading motion ${activeMotion}:`, err)
    );
  }, [activeMotion, inPlace, model]);

  // Update mixer every frame and apply user drag rotation
  useFrame((_, delta) => {
    if (mixerRef.current) {
      mixerRef.current.update(delta);
    }
    if (rootRef.current) {
      rootRef.current.rotation.y = THREE.MathUtils.lerp(
        rootRef.current.rotation.y,
        userRotationY,
        delta * 6
      );
    }
  });

  if (!model) return null;

  return (
    <group ref={rootRef} position={[0, -1.05, 0]}>
      {/* Scale 0.01 converts 180.9cm humanoid to 1.81 Three.js units, standing perfectly on tarmac */}
      <primitive object={model} scale={0.01} />
    </group>
  );
}
