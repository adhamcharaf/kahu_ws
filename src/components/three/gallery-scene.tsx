// ============================================================================
// GalleryScene - Scène 3D avec animation infinie
// Gère le positionnement et l'animation des images
// ============================================================================

"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { GalleryImage as GalleryImageComponent } from "./gallery-image";
import {
  GALLERY_CONFIG,
  calculateInitialPositions,
  type GalleryImage,
} from "@/lib/gallery-config";

// ============================================================================
// Types
// ============================================================================

interface GallerySceneProps {
  images: GalleryImage[];
}

interface ImageState {
  z: number;
  opacity: number;
  baseX: number;
  baseY: number;
  rotation: number;
}

// ============================================================================
// Component
// ============================================================================

// Throttle à ~30fps (33ms entre frames)
const FRAME_INTERVAL = 1 / 30;

export function GalleryScene({ images }: GallerySceneProps) {
  // Ref pour stocker l'état des positions Z de chaque image
  const imageStates = useRef<ImageState[]>([]);
  const accumulatedTime = useRef(0);

  // Calculer les positions initiales une seule fois
  const initialPositions = useMemo(
    () => calculateInitialPositions(images.length),
    [images.length]
  );

  // Initialiser les états si nécessaire
  if (imageStates.current.length !== images.length) {
    imageStates.current = initialPositions.map((pos) => ({
      z: pos.z,
      opacity: 1,
      baseX: pos.x,
      baseY: pos.y,
      rotation: pos.rotation,
    }));
  }

  // Animation loop - throttled à 30fps
  useFrame((state, delta) => {
    // Accumuler le temps
    accumulatedTime.current += delta;

    // Skip si pas assez de temps écoulé (throttle 30fps)
    if (accumulatedTime.current < FRAME_INTERVAL) {
      return;
    }

    // Reset accumulator (garder le reste pour précision)
    const effectiveDelta = accumulatedTime.current;
    accumulatedTime.current = 0;

    const {
      speed,
      totalDepth,
      fadeOutStart,
      fadeOutEnd,
      fadeInStart,
      fadeInEnd,
    } = GALLERY_CONFIG;

    imageStates.current.forEach((imgState) => {
      // Avancer vers la caméra
      imgState.z += effectiveDelta * speed;

      // Wrap : si trop proche, renvoyer au fond
      if (imgState.z > fadeOutEnd) {
        imgState.z -= totalDepth;
      }

      // Calculer l'opacité basée sur la profondeur
      if (imgState.z > fadeOutStart) {
        // Proche - fade out
        const progress =
          (imgState.z - fadeOutStart) / (fadeOutEnd - fadeOutStart);
        imgState.opacity = Math.max(0, 1 - progress);
      } else if (imgState.z < fadeInEnd) {
        // Loin - fade in
        const progress = (imgState.z - fadeInStart) / (fadeInEnd - fadeInStart);
        imgState.opacity = Math.min(1, Math.max(0.15, progress));
      } else {
        // Zone optimale
        imgState.opacity = 1;
      }
    });
  });

  return (
    <group>
      {images.map((image, index) => (
        <GalleryImageComponent
          key={image.id}
          image={image}
          index={index}
          getState={() => imageStates.current[index]}
        />
      ))}
    </group>
  );
}
