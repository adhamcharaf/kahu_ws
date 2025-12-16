// ============================================================================
// ThreeGallery - Composant principal de la galerie 3D
// Canvas Three.js avec animation infinie
// ============================================================================

"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { GalleryScene } from "./gallery-scene";
import {
  GALLERY_CONFIG,
  GALLERY_IMAGES,
  type GalleryImage,
} from "@/lib/gallery-config";

// ============================================================================
// Types
// ============================================================================

interface ThreeGalleryProps {
  images?: GalleryImage[];
  className?: string;
}

// ============================================================================
// Loading Fallback
// ============================================================================

function GalleryLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-kahu-cream-deep">
      <div className="w-8 h-8 border-2 border-kahu-terracotta/30 border-t-kahu-terracotta rounded-full animate-spin" />
    </div>
  );
}

// ============================================================================
// Component
// ============================================================================

export function ThreeGallery({
  images = GALLERY_IMAGES,
  className,
}: ThreeGalleryProps) {
  const [mounted, setMounted] = useState(false);

  // Éviter les erreurs d'hydration SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <GalleryLoader />;
  }

  return (
    <div className={`absolute inset-0 ${className || ""}`}>
      <Canvas
        // Performance optimizations
        dpr={1} // Pixel ratio fixe pour performance
        frameloop="always"
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
          stencil: false,
          depth: true,
        }}
        // Camera configuration
        camera={{
          fov: GALLERY_CONFIG.camera.fov,
          position: GALLERY_CONFIG.camera.position,
          near: GALLERY_CONFIG.camera.near,
          far: GALLERY_CONFIG.camera.far,
        }}
        // Style
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* Fog pour effet de profondeur */}
        <fog
          attach="fog"
          args={[
            GALLERY_CONFIG.fog.color,
            GALLERY_CONFIG.fog.near,
            GALLERY_CONFIG.fog.far,
          ]}
        />

        {/* Lumière ambiante */}
        <ambientLight intensity={1.2} />

        {/* Scene avec images animées */}
        <Suspense fallback={null}>
          <GalleryScene images={images} />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export type { ThreeGalleryProps };
