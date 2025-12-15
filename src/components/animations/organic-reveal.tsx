"use client";

import { motion, useInView, Variants, UseInViewOptions } from "framer-motion";
import { useRef, ReactNode, useId, useMemo } from "react";
import { usePrefersReducedMotion, useIsMobile } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, DELAY } from "@/lib/animation-config";

// ============================================================================
// Organic Reveal - Révélation avec masque organique grain de bois
// "Le texte émerge comme le grain du bois se révèle sous la main de l'artisan"
// ============================================================================

interface OrganicRevealProps {
  children: ReactNode;
  /** Délai avant le début de l'animation */
  delay?: number;
  /** Classes CSS */
  className?: string;
  /** Type de révélation */
  variant?: "wave" | "grain" | "curtain" | "radial";
  /** Durée de l'animation */
  duration?: number;
  /** Marge du viewport */
  viewportMargin?: string;
}

export function OrganicReveal({
  children,
  delay = 0,
  className,
  variant = "wave",
  duration = DURATION.reveal,
  viewportMargin = "-100px",
}: OrganicRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const viewportOptions: UseInViewOptions = { once: true, margin: viewportMargin as UseInViewOptions["margin"] };
  const isInView = useInView(ref, viewportOptions);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const uniqueId = useId();

  // Sur mobile, utiliser une animation plus simple
  const effectiveVariant = isMobile ? "curtain" : variant;

  if (shouldReduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <RevealContent
        isInView={isInView}
        variant={effectiveVariant}
        delay={delay}
        duration={duration}
        uniqueId={uniqueId}
      >
        {children}
      </RevealContent>
    </div>
  );
}

// ============================================================================
// Composant interne pour le contenu révélé
// ============================================================================

interface RevealContentProps {
  children: ReactNode;
  isInView: boolean;
  variant: "wave" | "grain" | "curtain" | "radial";
  delay: number;
  duration: number;
  uniqueId: string;
}

function RevealContent({
  children,
  isInView,
  variant,
  delay,
  duration,
  uniqueId,
}: RevealContentProps) {
  // Générer les paths SVG organiques
  const paths = useMemo(() => generateOrganicPaths(variant), [variant]);

  const clipPathVariants: Variants = {
    hidden: {
      clipPath: getInitialClipPath(variant),
    },
    visible: {
      clipPath: getFinalClipPath(variant),
      transition: {
        delay,
        duration,
        ease: KAHU_EASE,
      },
    },
  };

  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: variant === "curtain" ? 30 : 0,
      scale: variant === "radial" ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: delay + duration * 0.3,
        duration: duration * 0.7,
        ease: KAHU_EASE,
      },
    },
  };

  return (
    <motion.div
      variants={clipPathVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{ position: "relative" }}
    >
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// Fonctions utilitaires pour générer les clip-paths
// ============================================================================

function getInitialClipPath(variant: string): string {
  switch (variant) {
    case "wave":
      // Commence par le bas avec une vague
      return "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
    case "grain":
      // Effet grain - polygone irrégulier
      return "polygon(0% 100%, 15% 95%, 30% 100%, 45% 95%, 60% 100%, 75% 95%, 90% 100%, 100% 95%, 100% 100%, 0% 100%)";
    case "curtain":
      // Rideau vertical
      return "inset(100% 0% 0% 0%)";
    case "radial":
      // Cercle depuis le centre
      return "circle(0% at 50% 50%)";
    default:
      return "inset(100% 0% 0% 0%)";
  }
}

function getFinalClipPath(variant: string): string {
  switch (variant) {
    case "wave":
      // Vague qui monte et révèle tout
      return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
    case "grain":
      // Polygone complet
      return "polygon(0% 0%, 15% 0%, 30% 0%, 45% 0%, 60% 0%, 75% 0%, 90% 0%, 100% 0%, 100% 100%, 0% 100%)";
    case "curtain":
      // Rideau ouvert
      return "inset(0% 0% 0% 0%)";
    case "radial":
      // Cercle plein
      return "circle(150% at 50% 50%)";
    default:
      return "inset(0% 0% 0% 0%)";
  }
}

function generateOrganicPaths(variant: string): string[] {
  // Génère des paths SVG pour des masques plus complexes si nécessaire
  return [];
}

// ============================================================================
// Hero Title Reveal - Animation spéciale pour le titre Hero
// ============================================================================

interface HeroTitleRevealProps {
  /** Le titre principal */
  title: string;
  /** Le sous-titre ou tagline */
  subtitle?: string;
  /** Classes pour le titre */
  titleClassName?: string;
  /** Classes pour le sous-titre */
  subtitleClassName?: string;
  /** Classes du container */
  className?: string;
}

export function HeroTitleReveal({
  title,
  subtitle,
  titleClassName,
  subtitleClassName,
  className,
}: HeroTitleRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  if (shouldReduceMotion) {
    return (
      <div ref={ref} className={className}>
        <h1 className={titleClassName}>{title}</h1>
        {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
      </div>
    );
  }

  // Sur mobile: animation par mot, sur desktop: par caractère
  const titleWords = title.split(" ");
  const titleChars = title.split("");

  return (
    <div ref={ref} className={className}>
      {/* Titre avec révélation caractère par caractère */}
      <h1 className={titleClassName} style={{ overflow: "hidden" }}>
        {isMobile ? (
          // Mobile: par mot
          titleWords.map((word, wordIndex) => (
            <motion.span
              key={wordIndex}
              initial={{ opacity: 0, y: 50, rotateX: -45 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                delay: wordIndex * 0.1,
                duration: DURATION.slow,
                ease: KAHU_EASE,
              }}
              style={{
                display: "inline-block",
                marginRight: "0.25em",
                transformOrigin: "bottom center",
              }}
            >
              {word}
            </motion.span>
          ))
        ) : (
          // Desktop: par caractère avec effet 3D
          titleChars.map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{
                opacity: 0,
                y: 80,
                rotateX: -90,
                scale: 0.8,
              }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
              } : {}}
              transition={{
                delay: charIndex * 0.03,
                duration: DURATION.slow,
                ease: KAHU_EASE,
              }}
              style={{
                display: "inline-block",
                transformOrigin: "bottom center",
                perspective: "1000px",
                whiteSpace: char === " " ? "pre" : "normal",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))
        )}
      </h1>

      {/* Sous-titre avec reveal slide */}
      {subtitle && (
        <motion.p
          className={subtitleClassName}
          initial={{ opacity: 0, y: 30, clipPath: "inset(100% 0% 0% 0%)" }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            clipPath: "inset(0% 0% 0% 0%)",
          } : {}}
          transition={{
            delay: isMobile ? 0.3 : title.length * 0.03 + 0.2,
            duration: DURATION.slow,
            ease: KAHU_EASE,
          }}
          style={{ overflow: "hidden" }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

// ============================================================================
// Mask Reveal - Révélation avec masque SVG personnalisé
// ============================================================================

interface MaskRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function MaskReveal({
  children,
  className,
  delay = 0,
}: MaskRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = usePrefersReducedMotion();
  const maskId = useId();

  if (shouldReduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ position: "relative" }}>
      {/* SVG Mask Definition */}
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden"
        }}
      >
        <defs>
          <clipPath id={maskId} clipPathUnits="objectBoundingBox">
            <motion.path
              d="M0,1 L0,1 L1,1 L1,1 Z"
              animate={isInView ? {
                d: "M0,0 L0,1 L1,1 L1,0 Z"
              } : {}}
              transition={{
                delay,
                duration: DURATION.reveal,
                ease: KAHU_EASE,
              }}
            />
          </clipPath>
        </defs>
      </svg>

      {/* Content with mask */}
      <motion.div
        style={{
          clipPath: `url(#${maskId})`,
        }}
        initial={{ opacity: 0.8 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================================
// Wipe Reveal - Effet "essuie-glace" élégant
// ============================================================================

interface WipeRevealProps {
  children: ReactNode;
  className?: string;
  /** Direction du wipe */
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
}

export function WipeReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = DURATION.slow,
}: WipeRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  const getClipPath = (state: "hidden" | "visible") => {
    const hidden = {
      up: "inset(100% 0% 0% 0%)",
      down: "inset(0% 0% 100% 0%)",
      left: "inset(0% 100% 0% 0%)",
      right: "inset(0% 0% 0% 100%)",
    };
    const visible = "inset(0% 0% 0% 0%)";

    return state === "hidden" ? hidden[direction] : visible;
  };

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ clipPath: getClipPath("hidden"), opacity: 0.9 }}
        animate={isInView ? {
          clipPath: getClipPath("visible"),
          opacity: 1,
        } : {}}
        transition={{
          clipPath: { delay, duration, ease: KAHU_EASE },
          opacity: { delay, duration: duration * 0.5 },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
