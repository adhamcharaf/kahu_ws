// ============================================================================
// GalleryImage - Image plane 3D individuelle
// Rendu d'une image avec texture et fade basé sur la profondeur
// ============================================================================

"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { GALLERY_CONFIG, type GalleryImage as GalleryImageType } from "@/lib/gallery-config";

// ============================================================================
// Types
// ============================================================================

interface ImageState {
  z: number;
  opacity: number;
  baseX: number;
  baseY: number;
  rotation: number;
}

interface GalleryImageProps {
  image: GalleryImageType;
  index: number;
  getState: () => ImageState | undefined;
}

// ============================================================================
// Component
// ============================================================================

export function GalleryImage({ image, getState }: GalleryImageProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  // Charger la texture
  const texture = useTexture(image.src);

  // Configurer la texture
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  // Mettre à jour la position et l'opacité à chaque frame
  useFrame(() => {
    const state = getState();
    if (!state || !meshRef.current || !materialRef.current) return;

    // Mettre à jour la position
    meshRef.current.position.x = state.baseX;
    meshRef.current.position.y = state.baseY;
    meshRef.current.position.z = state.z;

    // Rotation légère
    meshRef.current.rotation.z = state.rotation;

    // Mettre à jour l'opacité
    materialRef.current.opacity = state.opacity;
  });

  const { width, height } = GALLERY_CONFIG.imageScale;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[width, height]} />
      <meshBasicMaterial
        ref={materialRef}
        map={texture}
        transparent
        opacity={1}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}
