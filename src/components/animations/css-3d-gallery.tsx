// ============================================================================
// CSS 3D Gallery - Galerie avec effet de profondeur en CSS pur
// Alternative légère à Three.js
// ============================================================================

"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useIsDesktop } from "@/hooks/use-media-query";

// ============================================================================
// Types
// ============================================================================

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

interface CSS3DGalleryProps {
  images?: GalleryImage[];
  className?: string;
  speed?: number;
}

// ============================================================================
// Configuration
// ============================================================================

const GALLERY_IMAGES: GalleryImage[] = [
  { id: "lignum", src: "/images/3dlibrary/lignum_newhome.png", alt: "Collection Lignum" },
  { id: "capsule", src: "/images/3dlibrary/capsule_tabledbou.png", alt: "Table Capsule" },
  { id: "shay", src: "/images/3dlibrary/shay.png", alt: "Collection Shay" },
  { id: "coquillages", src: "/images/3dlibrary/coquillages.png", alt: "Coquillages" },
  { id: "chaise", src: "/images/3dlibrary/chaise1.png", alt: "Chaise KAHU" },
  { id: "mannequin", src: "/images/3dlibrary/mannequin.png", alt: "Mannequin" },
];

// Golden angle pour distribution naturelle
const GOLDEN_ANGLE = 137.5;

// ============================================================================
// Component
// ============================================================================

export function CSS3DGallery({
  images = GALLERY_IMAGES,
  className,
  speed = 18,
}: CSS3DGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const isDesktopQuery = useIsDesktop();
  const isDesktop = mounted ? isDesktopQuery : false; // Valeur stable côté serveur

  // Monter côté client uniquement pour éviter hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Observer pour lazy-load animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculer positions avec golden angle - distribution en cercle
  // Desktop: rayon 1.8x plus grand pour utiliser l'espace
  const imagePositions = useMemo(() => {
    const scale = isDesktop ? 1.8 : 1;

    return images.map((_, index) => {
      const angle = (index * GOLDEN_ANGLE * Math.PI) / 180;
      const baseRadius = 160 + index * 45;
      const radius = baseRadius * scale;

      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.35,
        rotation: ((index % 2 === 0 ? 1 : -1) * (2 + index * 0.4)),
      };
    });
  }, [images.length, isDesktop]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{
        perspective: "800px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* Container 3D */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
      >
        {images.map((image, index) => (
          <div
            key={image.id}
            className="absolute w-[120px] h-[160px] md:w-[200px] md:h-[280px] lg:w-[240px] lg:h-[340px]"
            style={{
              // Position X/Y - scale up sur desktop via calc
              left: `calc(50% + ${imagePositions[index].x}px)`,
              top: `calc(50% + ${imagePositions[index].y}px)`,
              // Animation Z linéaire pour mouvement fluide constant
              // Propriétés séparées pour éviter conflit shorthand/non-shorthand
              animationName: isVisible ? "gallery3d-float" : "none",
              animationDuration: `${speed}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `${-(index / images.length) * speed}s`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="relative w-full h-full rounded-lg overflow-hidden shadow-xl"
              style={{
                transform: `rotateZ(${imagePositions[index].rotation}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 120px, (max-width: 1024px) 200px, 240px"
                priority={index < 2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
