// ============================================================================
// GalleryAmbientBackground - Background dynamique avec gradients animes
// Design: Editorial Luxury - Atmospherique et immersif
// ============================================================================

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo } from "react";
import { useIsDesktop, useIsMobile } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import {
  FULLSCREEN_GALLERY_CONFIG,
  SLIDER_SPRING,
} from "@/lib/slider-constants";

interface GalleryAmbientBackgroundProps {
  /** Styles de gradient pour les 3 layers */
  gradientStyles: {
    layer1: string;
    layer2: string;
    layer3: string;
  };
  /** ID unique pour AnimatePresence */
  activeId: string;
  /** Desactiver les animations */
  disabled?: boolean;
}

export function GalleryAmbientBackground({
  gradientStyles,
  activeId,
  disabled = false,
}: GalleryAmbientBackgroundProps) {
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Determiner le nombre de layers selon le device
  const layerCount = useMemo(() => {
    if (disabled || prefersReducedMotion) return 0;
    if (isMobile) return 1;
    if (!isDesktop) return 2; // Tablet
    return 3; // Desktop
  }, [disabled, prefersReducedMotion, isMobile, isDesktop]);

  // Duree du crossfade
  const crossfadeDuration =
    FULLSCREEN_GALLERY_CONFIG.transitions.backgroundCrossfade / 1000;

  // Variants pour les animations des layers
  const layerVariants = {
    initial: {
      opacity: 0,
      scale: 1.1,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: crossfadeDuration,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: crossfadeDuration * 0.8,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // Animations flottantes pour chaque layer
  const floatAnimation1 = {
    y: [0, -20, 0],
    x: [0, 10, 0],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const floatAnimation2 = {
    y: [0, 15, 0],
    x: [0, -15, 0],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 2,
    },
  };

  const floatAnimation3 = {
    y: [0, -10, 0],
    x: [0, 8, 0],
    transition: {
      duration: 18,
      repeat: Infinity,
      ease: "easeInOut" as const,
      delay: 4,
    },
  };

  if (layerCount === 0) {
    return (
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: FULLSCREEN_GALLERY_CONFIG.backgroundColor }}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: FULLSCREEN_GALLERY_CONFIG.backgroundColor }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          className="absolute inset-0"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={layerVariants}
        >
          {/* Layer 1 - Principal (toujours visible) */}
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{ background: gradientStyles.layer1 }}
            animate={isDesktop && !prefersReducedMotion ? floatAnimation1 : undefined}
          />

          {/* Layer 2 - Secondaire (tablet + desktop) */}
          {layerCount >= 2 && (
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{ background: gradientStyles.layer2 }}
              animate={isDesktop && !prefersReducedMotion ? floatAnimation2 : undefined}
            />
          )}

          {/* Layer 3 - Accent (desktop seulement) */}
          {layerCount >= 3 && (
            <motion.div
              className="absolute inset-0 will-change-transform"
              style={{ background: gradientStyles.layer3 }}
              animate={!prefersReducedMotion ? floatAnimation3 : undefined}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Grain texture overlay - subtil, luxueux */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Vignette - effet cinematique */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, ${FULLSCREEN_GALLERY_CONFIG.backgroundColor} 100%)`,
          opacity: 0.4,
        }}
      />
    </div>
  );
}
