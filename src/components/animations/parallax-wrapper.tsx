"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef, ReactNode, CSSProperties } from "react";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { SPRING, LIMITS } from "@/lib/animation-config";

// ============================================================================
// Parallax Wrapper - Effet de profondeur au scroll
// "Comme les plans d'une pièce de mobilier qui se révèlent"
// Maximum 50px de déplacement pour rester subtil
// ============================================================================

interface ParallaxWrapperProps {
  children: ReactNode;
  /** Vitesse du parallax: -1 (plus lent) à 1 (plus rapide) */
  speed?: number;
  /** Classes CSS */
  className?: string;
  /** Style inline additionnel */
  style?: CSSProperties;
  /** Désactiver sur mobile (défaut: true) */
  disableOnMobile?: boolean;
  /** Direction du parallax */
  direction?: "vertical" | "horizontal" | "both";
}

export function ParallaxWrapper({
  children,
  speed = 0.2,
  className,
  style,
  disableOnMobile = true,
  direction = "vertical",
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  // Scroll progress de cet élément
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculer le range de déplacement (max 50px)
  const range = Math.min(Math.abs(speed) * LIMITS.parallax.maxOffset * 2, LIMITS.parallax.maxOffset * 2);
  const direction_multiplier = speed >= 0 ? 1 : -1;

  // Transformer le scroll en mouvement
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [-range / 2 * direction_multiplier, range / 2 * direction_multiplier]
  );

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [-range / 4 * direction_multiplier, range / 4 * direction_multiplier]
  );

  // Appliquer un spring pour lisser le mouvement
  const smoothY = useSpring(rawY, SPRING.parallax);
  const smoothX = useSpring(rawX, SPRING.parallax);

  // Si reduced motion ou mobile (si désactivé), pas de parallax
  const isDisabled = shouldReduceMotion || (disableOnMobile && !isDesktop);

  if (isDisabled) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  // Build style object without conflicting x/y properties
  const { x: _x, y: _y, ...restStyle } = style || {};

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={{
          ...restStyle,
          y: direction === "vertical" || direction === "both" ? smoothY : undefined,
          x: direction === "horizontal" || direction === "both" ? smoothX : undefined,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// Parallax Image - Optimisé pour les images avec effet de profondeur
// ============================================================================

interface ParallaxImageProps {
  children: ReactNode;
  /** Vitesse du parallax */
  speed?: number;
  /** Classes du container */
  className?: string;
  /** Classes de l'image wrapper */
  imageClassName?: string;
  /** Overflow visible pour voir l'effet */
  overflow?: "hidden" | "visible";
}

export function ParallaxImage({
  children,
  speed = 0.15,
  className,
  imageClassName,
  overflow = "hidden",
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Pour les images, on utilise un scale léger en plus du Y
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-speed * LIMITS.parallax.maxOffset, speed * LIMITS.parallax.maxOffset]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.1, 1.05, 1.1]
  );

  const smoothY = useSpring(y, SPRING.parallax);
  const smoothScale = useSpring(scale, SPRING.parallax);

  const isDisabled = shouldReduceMotion || !isDesktop;

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow }}
    >
      {isDisabled ? (
        <div className={imageClassName}>{children}</div>
      ) : (
        <motion.div
          className={imageClassName}
          style={{
            y: smoothY,
            scale: smoothScale,
          }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

// ============================================================================
// Parallax Layer - Pour créer des compositions multi-couches
// ============================================================================

interface ParallaxLayerProps {
  children: ReactNode;
  /** Profondeur de la couche (0 = arrière-plan, 1 = premier plan) */
  depth?: number;
  /** Classes CSS */
  className?: string;
}

export function ParallaxLayer({
  children,
  depth = 0.5,
  className,
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Plus la profondeur est grande, plus le mouvement est prononcé
  const speed = (depth - 0.5) * LIMITS.parallax.maxOffset;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [speed, -speed]
  );

  const smoothY = useSpring(y, SPRING.parallax);

  const isDisabled = shouldReduceMotion || !isDesktop;

  if (isDisabled) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: smoothY }}>
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// Parallax Text - Texte avec effet de parallax subtil
// ============================================================================

interface ParallaxTextProps {
  children: ReactNode;
  /** Vitesse du parallax */
  speed?: number;
  /** Element HTML */
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  /** Classes CSS */
  className?: string;
}

export function ParallaxText({
  children,
  speed = 0.1,
  as: Element = "div",
  className,
}: ParallaxTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-speed * 30, speed * 30]
  );

  const smoothY = useSpring(y, SPRING.parallax);

  const isDisabled = shouldReduceMotion || !isDesktop;

  if (isDisabled) {
    // @ts-ignore
    return <Element ref={ref} className={className}>{children}</Element>;
  }

  return (
    <div ref={ref}>
      {/* @ts-ignore */}
      <motion.div style={{ y: smoothY }}>
        {/* @ts-ignore */}
        <Element className={className}>{children}</Element>
      </motion.div>
    </div>
  );
}

// ============================================================================
// useParallax - Hook pour créer des effets custom
// ============================================================================

export function useParallax(speed: number = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const shouldReduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = speed * LIMITS.parallax.maxOffset * 2;

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-range / 2, range / 2]
  );

  const smoothY = useSpring(y, SPRING.parallax);

  const isEnabled = isDesktop && !shouldReduceMotion;

  return {
    ref,
    y: isEnabled ? smoothY : 0,
    scrollYProgress,
    isEnabled,
  };
}
