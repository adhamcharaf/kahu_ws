"use client";

import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef, ReactNode, forwardRef, ElementType } from "react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { SPRING, LIMITS } from "@/lib/animation-config";

// ============================================================================
// Magnetic Element - Éléments attirés par le curseur
// "Comme un aimant subtil qui guide la main de l'artisan"
// ============================================================================

interface MagneticElementProps {
  children: ReactNode;
  /** Force de l'attraction magnétique (0-1) */
  strength?: number;
  /** Classes CSS */
  className?: string;
  /** Élément HTML à rendre */
  as?: ElementType;
  /** Désactiver l'effet */
  disabled?: boolean;
}

export function MagneticElement({
  children,
  strength = LIMITS.magnetic.strength,
  className,
  as: Component = "div",
  disabled = false,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();
  const { position, isHovering } = useMousePosition(ref);

  // Configuration du spring pour un mouvement fluide
  const springConfig = SPRING.magnetic;

  // Calculer le déplacement magnétique
  const maxOffset = LIMITS.magnetic.maxOffset * strength;

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  // Mettre à jour les valeurs quand on hover
  if (isHovering && isDesktop && !shouldReduceMotion && !disabled) {
    x.set(position.x * maxOffset * 2);
    y.set(position.y * maxOffset * 2);
  } else {
    x.set(0);
    y.set(0);
  }

  // Si désactivé ou mobile, pas d'effet
  if (!isDesktop || shouldReduceMotion || disabled) {
    return (
      <Component className={className}>
        {children}
      </Component>
    );
  }

  return (
    <Component ref={ref} className={className}>
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </Component>
  );
}

// ============================================================================
// Magnetic Button - Version optimisée pour les boutons
// ============================================================================

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  /** Callback onClick */
  onClick?: () => void;
  /** Type de bouton HTML */
  type?: "button" | "submit" | "reset";
  /** Désactivé */
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className,
  strength = 0.4,
  onClick,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();
  const { position, isHovering } = useMousePosition(ref as any);

  const springConfig = SPRING.magnetic;
  const maxOffset = LIMITS.magnetic.maxOffset * strength;

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);

  // Effet magnétique
  if (isHovering && isDesktop && !shouldReduceMotion && !disabled) {
    x.set(position.x * maxOffset * 2);
    y.set(position.y * maxOffset * 2);
    scale.set(1.02);
  } else {
    x.set(0);
    y.set(0);
    scale.set(1);
  }

  // Version sans effet
  if (!isDesktop || shouldReduceMotion) {
    return (
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      onClick={onClick}
      disabled={disabled}
      style={{ x, y, scale }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

// ============================================================================
// Magnetic Link - Version pour les liens
// ============================================================================

interface MagneticLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  strength?: number;
  external?: boolean;
}

export function MagneticLink({
  children,
  href,
  className,
  strength = 0.3,
  external = false,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();
  const { position, isHovering } = useMousePosition(ref as any);

  const springConfig = SPRING.magnetic;
  const maxOffset = LIMITS.magnetic.maxOffset * strength;

  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  if (isHovering && isDesktop && !shouldReduceMotion) {
    x.set(position.x * maxOffset * 2);
    y.set(position.y * maxOffset * 2);
  } else {
    x.set(0);
    y.set(0);
  }

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  if (!isDesktop || shouldReduceMotion) {
    return (
      <a href={href} className={className} {...externalProps}>
        {children}
      </a>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      style={{ x, y, display: "inline-block" }}
      {...externalProps}
    >
      {children}
    </motion.a>
  );
}

// ============================================================================
// Magnetic Container - Container avec effet magnétique sur les enfants
// ============================================================================

interface MagneticContainerProps {
  children: ReactNode;
  className?: string;
  /** Force globale pour tous les enfants */
  globalStrength?: number;
}

export function MagneticContainer({
  children,
  className,
  globalStrength = 0.2,
}: MagneticContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();
  const { position, isHovering } = useMousePosition(containerRef);

  // Effet très léger sur le container entier
  const x = useSpring(0, SPRING.soft);
  const y = useSpring(0, SPRING.soft);

  if (isHovering && isDesktop && !shouldReduceMotion) {
    x.set(position.x * 10 * globalStrength);
    y.set(position.y * 10 * globalStrength);
  } else {
    x.set(0);
    y.set(0);
  }

  if (!isDesktop || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={className}>
      <motion.div style={{ x, y }}>
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// Hover Glow - Lueur qui suit le curseur
// ============================================================================

interface HoverGlowProps {
  children: ReactNode;
  className?: string;
  /** Couleur de la lueur */
  glowColor?: string;
  /** Taille de la lueur */
  glowSize?: number;
  /** Opacité de la lueur */
  glowOpacity?: number;
}

export function HoverGlow({
  children,
  className,
  glowColor = "rgba(139, 58, 58, 0.15)",
  glowSize = 200,
  glowOpacity = 0.5,
}: HoverGlowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();
  const { position, isHovering } = useMousePosition(ref);

  const x = useSpring(50, SPRING.snappy);
  const y = useSpring(50, SPRING.snappy);
  const opacity = useSpring(0, SPRING.medium);

  if (isHovering && isDesktop && !shouldReduceMotion) {
    // Convertir de -0.5,0.5 à 0,100 (pourcentage)
    x.set((position.x + 0.5) * 100);
    y.set((position.y + 0.5) * 100);
    opacity.set(glowOpacity);
  } else {
    opacity.set(0);
  }

  if (!isDesktop || shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{
          opacity,
          background: useTransform(
            [x, y] as MotionValue<number>[],
            ([xVal, yVal]) =>
              `radial-gradient(${glowSize}px circle at ${xVal}% ${yVal}%, ${glowColor}, transparent 70%)`
          ),
        }}
      />
      {children}
    </div>
  );
}
