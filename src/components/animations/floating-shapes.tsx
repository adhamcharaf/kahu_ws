"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { DURATION } from "@/lib/animation-config";

// ============================================================================
// Floating Shapes - Formes organiques flottantes
// "Comme des copeaux de bois qui dansent dans l'air de l'atelier"
// ============================================================================

interface FloatingShapesProps {
  /** Classes CSS du container */
  className?: string;
  /** Nombre de formes (max 5 pour la performance) */
  count?: number;
  /** Couleur des formes (classe Tailwind ou hex) */
  color?: string;
  /** Opacité des formes */
  opacity?: number;
  /** Taille des formes */
  size?: "sm" | "md" | "lg";
  /** Activer sur mobile (défaut: false) */
  enableOnMobile?: boolean;
}

// Formes organiques SVG (courbes de Bézier inspirées du bois)
const ORGANIC_SHAPES = [
  // Forme 1: Feuille allongée
  "M50,10 Q70,20 60,50 T50,90 Q30,80 40,50 T50,10",
  // Forme 2: Copeau de bois
  "M20,50 Q50,10 80,50 T20,50",
  // Forme 3: Graine/goutte
  "M50,10 Q75,30 50,90 Q25,30 50,10",
  // Forme 4: Forme abstraite organique
  "M30,20 C60,10 70,40 60,60 S30,80 20,60 S10,30 30,20",
  // Forme 5: Vague verticale
  "M50,5 Q70,25 50,45 T50,85 Q30,65 50,45 T50,5",
];

// Positions prédéfinies pour éviter les chevauchements
const POSITIONS = [
  { x: "5%", y: "15%" },
  { x: "85%", y: "20%" },
  { x: "75%", y: "70%" },
  { x: "15%", y: "75%" },
  { x: "50%", y: "45%" },
];

const SIZE_MAP = {
  sm: { width: 60, height: 60 },
  md: { width: 100, height: 100 },
  lg: { width: 150, height: 150 },
};

export function FloatingShapes({
  className = "",
  count = 3,
  color = "currentColor",
  opacity = 0.03,
  size = "md",
  enableOnMobile = false,
}: FloatingShapesProps) {
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  // Générer les formes
  const shapes = useMemo(() => {
    const safeCount = Math.min(count, 5);
    return Array.from({ length: safeCount }, (_, i) => ({
      id: i,
      path: ORGANIC_SHAPES[i % ORGANIC_SHAPES.length],
      position: POSITIONS[i % POSITIONS.length],
      duration: 15 + i * 5, // Durées variées (15s, 20s, 25s...)
      delay: i * 2, // Délais décalés
      rotationRange: 10 + i * 5, // Rotation variée
    }));
  }, [count]);

  // Désactiver si reduced motion ou mobile (sauf si forcé)
  if (shouldReduceMotion || (!enableOnMobile && !isDesktop)) {
    return null;
  }

  const dimensions = SIZE_MAP[size];

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: shape.position.x,
            top: shape.position.y,
            width: dimensions.width,
            height: dimensions.height,
          }}
          animate={{
            y: [0, -20, 0, 10, 0],
            x: [0, 10, 0, -10, 0],
            rotate: [0, shape.rotationRange, 0, -shape.rotationRange / 2, 0],
            scale: [1, 1.05, 1, 0.98, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            fill={color}
            style={{ opacity }}
            className="w-full h-full"
          >
            <path d={shape.path} />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// Floating Dots - Points flottants minimalistes
// ============================================================================

interface FloatingDotsProps {
  className?: string;
  count?: number;
  color?: string;
  opacity?: number;
}

export function FloatingDots({
  className = "",
  count = 5,
  color = "currentColor",
  opacity = 0.1,
}: FloatingDotsProps) {
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  const dots = useMemo(() => {
    return Array.from({ length: Math.min(count, 8) }, (_, i) => ({
      id: i,
      x: `${10 + (i * 80) / count}%`,
      y: `${20 + Math.sin(i) * 30 + 25}%`,
      size: 4 + Math.random() * 8,
      duration: 10 + i * 3,
      delay: i * 1.5,
    }));
  }, [count]);

  if (shouldReduceMotion || !isDesktop) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: dot.x,
            top: dot.y,
            width: dot.size,
            height: dot.size,
            backgroundColor: color,
            opacity,
          }}
          animate={{
            y: [0, -15, 0, 10, 0],
            opacity: [opacity, opacity * 1.5, opacity, opacity * 0.7, opacity],
          }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ============================================================================
// Grain Texture - Texture grain animée subtile
// ============================================================================

interface GrainTextureProps {
  className?: string;
  opacity?: number;
  animate?: boolean;
}

export function GrainTexture({
  className = "",
  opacity = 0.03,
  animate = true,
}: GrainTextureProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  // SVG filter pour le grain
  const grainFilter = `
    <svg xmlns="http://www.w3.org/2000/svg">
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0"/>
      </filter>
    </svg>
  `;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        opacity,
        mixBlendMode: "overlay",
      }}
    >
      {/* Grain via CSS */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
            '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noiseFilter)"/></svg>'
          )}")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Animation subtile du grain */}
      {animate && !shouldReduceMotion && (
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
              '<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#noiseFilter)"/></svg>'
            )}")`,
            backgroundRepeat: "repeat",
            opacity: 0.5,
          }}
        />
      )}
    </div>
  );
}

// ============================================================================
// Wood Grain Texture - Texture de veines de bois subtile
// ============================================================================

interface WoodGrainTextureProps {
  className?: string;
  opacity?: number;
  /** Couleur des veines (défaut: couleur claire pour fond sombre) */
  color?: string;
}

export function WoodGrainTexture({
  className = "",
  opacity = 0.04,
  color = "#d4c4b0", // kahu-cream
}: WoodGrainTextureProps) {
  // SVG avec veines de bois horizontales - encodé pour URL (traits fins et subtils)
  const woodGrainSvg = `%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='60' viewBox='0 0 200 60'%3E%3Cpath d='M0,8 Q50,4 100,8 T200,8' stroke='${encodeURIComponent(color)}' stroke-width='0.4' fill='none'/%3E%3Cpath d='M0,16 Q60,20 120,16 T200,16' stroke='${encodeURIComponent(color)}' stroke-width='0.3' fill='none'/%3E%3Cpath d='M0,24 Q40,22 80,24 T160,24 T200,24' stroke='${encodeURIComponent(color)}' stroke-width='0.5' fill='none'/%3E%3Cpath d='M0,32 Q70,36 140,32 T200,32' stroke='${encodeURIComponent(color)}' stroke-width='0.25' fill='none'/%3E%3Cpath d='M0,40 Q30,38 60,40 T120,40 T200,40' stroke='${encodeURIComponent(color)}' stroke-width='0.4' fill='none'/%3E%3Cpath d='M0,48 Q50,52 100,48 T200,48' stroke='${encodeURIComponent(color)}' stroke-width='0.3' fill='none'/%3E%3Cpath d='M0,56 Q80,54 160,56 T200,56' stroke='${encodeURIComponent(color)}' stroke-width='0.35' fill='none'/%3E%3C/svg%3E`;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,${woodGrainSvg}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 60px",
        }}
      />
    </div>
  );
}

// ============================================================================
// Ambient Glow - Lueur ambiante qui pulse doucement
// ============================================================================

interface AmbientGlowProps {
  className?: string;
  color?: string;
  size?: number;
  position?: { x: string; y: string };
}

export function AmbientGlow({
  className = "",
  color = "rgba(139, 58, 58, 0.15)", // terracotta
  size = 400,
  position = { x: "50%", y: "50%" },
}: AmbientGlowProps) {
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  if (!isDesktop) {
    return null;
  }

  return (
    <motion.div
      className={`absolute pointer-events-none ${className}`}
      style={{
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
      animate={shouldReduceMotion ? {} : {
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.7, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  );
}

// ============================================================================
// Wood Ring Pattern - Motif anneaux de bois
// ============================================================================

interface WoodRingPatternProps {
  className?: string;
  opacity?: number;
  size?: number;
}

export function WoodRingPattern({
  className = "",
  opacity = 0.02,
  size = 800,
}: WoodRingPatternProps) {
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  if (!isDesktop) {
    return null;
  }

  // Générer les anneaux concentriques
  const rings = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    radius: (i + 1) * (size / 16),
    strokeWidth: 1 + Math.random(),
    delay: i * 0.1,
  }));

  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      aria-hidden="true"
      style={{ opacity }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        initial={{ rotate: 0 }}
        animate={shouldReduceMotion ? {} : { rotate: 360 }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {rings.map((ring) => (
          <motion.circle
            key={ring.id}
            cx={size / 2}
            cy={size / 2}
            r={ring.radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={ring.strokeWidth}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : {
              pathLength: [0.7, 1, 0.7],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 10,
              delay: ring.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
