// ============================================================================
// AutoScrollColumn - Colonne avec defilement vertical infini
// Animation parallax pour galerie masonry
// ============================================================================

"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface AutoScrollColumnProps {
  /** Images a afficher dans la colonne */
  images: string[];
  /** Direction du defilement */
  direction: "up" | "down";
  /** Duree de l'animation en secondes */
  duration?: number;
  /** Callback au clic sur une image */
  onImageClick?: (index: number) => void;
  /** Classe CSS additionnelle */
  className?: string;
}

export function AutoScrollColumn({
  images,
  direction,
  duration = 60,
  onImageClick,
  className,
}: AutoScrollColumnProps) {
  const controls = useAnimationControls();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Dupliquer les images pour boucle seamless
  const duplicatedImages = [...images, ...images];

  // Demarrer l'animation
  useEffect(() => {
    if (prefersReducedMotion) return;

    const startAnimation = async () => {
      // Position initiale
      await controls.start({
        y: direction === "down" ? "-50%" : "0%",
        transition: {
          duration: 0,
          ease: "linear",
        },
      });

      // Animation infinie
      controls.start({
        y: direction === "down" ? "0%" : "-50%",
        transition: {
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    };

    if (!isPaused) {
      startAnimation();
    } else {
      controls.stop();
    }
  }, [controls, direction, duration, isPaused, prefersReducedMotion]);

  // Rendu statique si reduced motion
  if (prefersReducedMotion) {
    return (
      <div className={className}>
        <div className="flex flex-col">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] cursor-pointer"
              onClick={() => onImageClick?.(index)}
            >
              <Image
                src={src}
                alt={`Image atelier ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden h-[80vh] md:h-[90vh] lg:h-[100vh] ${className || ""}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <motion.div
        animate={controls}
        className="flex flex-col"
        style={{
          y: direction === "down" ? "-50%" : "0%",
        }}
      >
        {duplicatedImages.map((src, index) => (
          <div
            key={index}
            className="relative aspect-[3/4] cursor-pointer group"
            onClick={() => onImageClick?.(index % images.length)}
          >
            <Image
              src={src}
              alt={`Image atelier ${(index % images.length) + 1}`}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            {/* Overlay au hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
