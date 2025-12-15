"use client";

import { motion, useSpring, useTransform, useMotionValue, MotionStyle } from "framer-motion";
import { useRef, ReactNode, MouseEvent, CSSProperties } from "react";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { SPRING, LIMITS, DURATION } from "@/lib/animation-config";

// ============================================================================
// Tilt Card - Effet 3D qui suit le curseur
// "La pièce de mobilier qui révèle ses facettes sous différents angles"
// ============================================================================

interface TiltCardProps {
  children: ReactNode;
  /** Classes CSS */
  className?: string;
  /** Force de l'inclinaison (degrés max) */
  tiltStrength?: number;
  /** Activer l'effet de glare (reflet) */
  glareEnabled?: boolean;
  /** Opacité du glare */
  glareOpacity?: number;
  /** Couleur du glare */
  glareColor?: string;
  /** Scale au hover */
  hoverScale?: number;
  /** Perspective */
  perspective?: number;
  /** Désactiver l'effet */
  disabled?: boolean;
}

export function TiltCard({
  children,
  className,
  tiltStrength = LIMITS.tilt.maxDegrees,
  glareEnabled = true,
  glareOpacity = 0.15,
  glareColor = "rgba(255, 255, 255, 0.8)",
  hoverScale = 1.02,
  perspective = 1000,
  disabled = false,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  // Motion values pour le tracking de la souris
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring pour un mouvement fluide
  const springConfig = SPRING.medium;

  // Transformer la position souris en rotation
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [tiltStrength, -tiltStrength]),
    springConfig
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-tiltStrength, tiltStrength]),
    springConfig
  );

  // Scale au hover
  const scale = useSpring(1, springConfig);

  // Glare position
  const glareX = useSpring(50, springConfig);
  const glareY = useSpring(50, springConfig);
  const glareOpacityValue = useSpring(0, springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || shouldReduceMotion || disabled) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

    // Mettre à jour le glare
    glareX.set((x + 0.5) * 100);
    glareY.set((y + 0.5) * 100);
  };

  const handleMouseEnter = () => {
    if (shouldReduceMotion || disabled) return;
    scale.set(hoverScale);
    glareOpacityValue.set(glareOpacity);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
    glareX.set(50);
    glareY.set(50);
    glareOpacityValue.set(0);
  };

  // Version sans effet pour mobile/reduced motion
  if (!isDesktop || shouldReduceMotion || disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {children}

        {/* Glare effect */}
        {glareEnabled && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-inherit overflow-hidden"
            style={{
              opacity: glareOpacityValue,
              background: useTransform(
                [glareX, glareY] as any,
                ([x, y]: number[]) =>
                  `radial-gradient(circle at ${x}% ${y}%, ${glareColor}, transparent 60%)`
              ),
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// Product Tilt Card - Version optimisée pour les cartes produit
// ============================================================================

interface ProductTiltCardProps {
  children: ReactNode;
  className?: string;
  /** Callback au clic */
  onClick?: () => void;
}

export function ProductTiltCard({
  children,
  className,
  onClick,
}: ProductTiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Tilt plus subtil pour les produits
  const tiltStrength = 6;

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [tiltStrength, -tiltStrength]),
    SPRING.medium
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-tiltStrength, tiltStrength]),
    SPRING.medium
  );
  const scale = useSpring(1, SPRING.medium);

  // Shadow qui s'adapte à l'angle
  const shadowX = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const shadowY = useTransform(mouseY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || shouldReduceMotion) return;

    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    if (shouldReduceMotion) return;
    scale.set(1.03);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    scale.set(1);
  };

  if (!isDesktop || shouldReduceMotion) {
    return (
      <div className={className} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
      }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          // Shadow dynamique
          boxShadow: useTransform(
            [shadowX, shadowY, scale] as any,
            ([x, y, s]: number[]) =>
              s > 1
                ? `${x * 0.5}px ${y * 0.5}px 30px rgba(0, 0, 0, 0.08), ${x * 0.2}px ${y * 0.2}px 10px rgba(0, 0, 0, 0.05)`
                : "0 4px 20px rgba(0, 0, 0, 0.05)"
          ),
        }}
        className="relative rounded-sm overflow-hidden"
      >
        {children}

        {/* Subtle highlight on edge */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: useTransform(scale, [1, 1.03], [0, 0.3]),
            background: `linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.1) 0%,
              transparent 50%,
              rgba(0, 0, 0, 0.05) 100%
            )`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// Simple Hover Card - Version simplifiée sans tilt
// ============================================================================

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  /** Scale au hover */
  hoverScale?: number;
  /** Y offset au hover */
  hoverY?: number;
  /** Shadow au hover */
  hoverShadow?: boolean;
}

export function HoverCard({
  children,
  className,
  hoverScale = 1.02,
  hoverY = -4,
  hoverShadow = true,
}: HoverCardProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        boxShadow: hoverShadow
          ? "0 20px 40px rgba(0, 0, 0, 0.08)"
          : undefined,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: DURATION.fast,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Image Reveal Card - Card avec révélation d'image au hover
// ============================================================================

interface ImageRevealCardProps {
  children: ReactNode;
  /** Image de révélation (overlay au hover) */
  revealContent?: ReactNode;
  className?: string;
}

export function ImageRevealCard({
  children,
  revealContent,
  className,
}: ImageRevealCardProps) {
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  if (!isDesktop || shouldReduceMotion || !revealContent) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial="initial"
      whileHover="hover"
    >
      {/* Contenu principal */}
      <motion.div
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.05 },
        }}
        transition={{ duration: DURATION.normal, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>

      {/* Overlay de révélation */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: DURATION.fast }}
      >
        {revealContent}
      </motion.div>
    </motion.div>
  );
}
