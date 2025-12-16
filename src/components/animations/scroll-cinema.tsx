"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, ReactNode, CSSProperties } from "react";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { SPRING, DURATION, EASE, KAHU_EASE } from "@/lib/animation-config";

// ============================================================================
// Scroll Cinema - Animations scroll Apple-style
// "Le contenu qui s'anime au rythme de votre exploration"
// ============================================================================

type ScrollEffect = "zoom" | "fade-scale" | "slide-reveal" | "parallax" | "blur-in";

interface ScrollCinemaProps {
  children: ReactNode;
  /** Type d'effet scroll */
  effect?: ScrollEffect;
  /** Multiplicateur de vitesse (0.5 = lent, 2 = rapide) */
  speed?: number;
  /** Classe CSS additionnelle */
  className?: string;
  /** Delai avant l'animation (en secondes) */
  delay?: number;
  /** Direction pour slide-reveal */
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollCinema({
  children,
  effect = "fade-scale",
  speed = 1,
  className,
  delay = 0,
  direction = "up",
}: ScrollCinemaProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Transformations basees sur le scroll
  const rawScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.95]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const rawY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [60 * speed, 0, 0, -30 * speed]);
  const rawBlur = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [8, 0, 0, 4]);

  // Versions spring pour un mouvement fluide
  const scale = useSpring(rawScale, SPRING.parallax);
  const opacity = useSpring(rawOpacity, SPRING.parallax);
  const y = useSpring(rawY, SPRING.parallax);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Styles selon l'effet choisi
  const getStyle = (): CSSProperties => {
    if (!isDesktop) {
      // Mobile: effet simplifie
      return {};
    }

    switch (effect) {
      case "zoom":
        return {
          scale: scale as unknown as number,
          opacity: opacity as unknown as number,
        };
      case "fade-scale":
        return {
          scale: scale as unknown as number,
          opacity: opacity as unknown as number,
          y: y as unknown as number,
        };
      case "slide-reveal":
        return {
          opacity: opacity as unknown as number,
          y: direction === "up" || direction === "down" ? (y as unknown as number) : 0,
          x: direction === "left" ? -60 : direction === "right" ? 60 : 0,
        };
      case "parallax":
        return {
          y: y as unknown as number,
        };
      case "blur-in":
        return {
          opacity: opacity as unknown as number,
          filter: `blur(${rawBlur}px)`,
        };
      default:
        return {};
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={getStyle()}
      initial={{ opacity: 0 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Section Reveal - Animation d'entree de section au scroll
// ============================================================================

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** Type d'animation */
  variant?: "fade-up" | "fade-scale" | "slide-left" | "slide-right" | "blur-up";
  /** Delai */
  delay?: number;
  /** Duree */
  duration?: number;
}

export function SectionReveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = DURATION.cinematic,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants = {
    "fade-up": {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0 },
    },
    "fade-scale": {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 },
    },
    "slide-left": {
      hidden: { opacity: 0, x: -80 },
      visible: { opacity: 1, x: 0 },
    },
    "slide-right": {
      hidden: { opacity: 0, x: 80 },
      visible: { opacity: 1, x: 0 },
    },
    "blur-up": {
      hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
      visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: EASE.cinematic,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Scroll Parallax - Couche parallax pour effets de profondeur (scroll-cinema)
// ============================================================================

interface ScrollParallaxProps {
  children: ReactNode;
  className?: string;
  /** Facteur de parallax (-1 a 1, 0 = pas de mouvement) */
  factor?: number;
  /** Direction */
  direction?: "vertical" | "horizontal";
}

export function ScrollParallax({
  children,
  className,
  factor = 0.3,
  direction = "vertical",
}: ScrollParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const rawOffset = useTransform(scrollYProgress, [0, 1], [-100 * factor, 100 * factor]);
  const offset = useSpring(rawOffset, SPRING.parallax);

  if (shouldReduceMotion || !isDesktop) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        y: direction === "vertical" ? offset : 0,
        x: direction === "horizontal" ? offset : 0,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Cinema Stagger - Grille avec stagger cinematique
// ============================================================================

interface CinemaStaggerProps {
  children: ReactNode;
  className?: string;
  /** Delai entre chaque element */
  staggerDelay?: number;
  /** Type de stagger */
  pattern?: "sequential" | "diagonal" | "random";
}

export function CinemaStagger({
  children,
  className,
  staggerDelay = 0.08,
  pattern = "sequential",
}: CinemaStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Item pour CinemaStagger
export function CinemaStaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: 30,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: DURATION.slow,
            ease: EASE.cinematic,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Color Morph Section - Section avec fond qui change au scroll
// ============================================================================

interface ColorMorphSectionProps {
  children: ReactNode;
  className?: string;
  /** Couleur de depart */
  fromColor?: string;
  /** Couleur d'arrivee */
  toColor?: string;
}

export function ColorMorphSection({
  children,
  className,
  fromColor = "var(--color-kahu-cream)",
  toColor = "var(--color-kahu-cream-deep)",
}: ColorMorphSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [fromColor, toColor, fromColor]
  );

  if (shouldReduceMotion) {
    return (
      <div className={className} style={{ backgroundColor: fromColor }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ backgroundColor }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Cinematic Header - Header de page avec effet cinematique
// ============================================================================

interface CinematicHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function CinematicHeader({
  title,
  subtitle,
  className,
}: CinematicHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className}>
        <h1 className="font-display text-display-lg text-kahu-charcoal">{title}</h1>
        {subtitle && <p className="mt-4 text-body-lg text-kahu-taupe">{subtitle}</p>}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.h1
        className="font-display text-display-lg text-kahu-charcoal"
        initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{
          duration: DURATION.cinematic,
          ease: EASE.dramatic,
        }}
      >
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p
          className="mt-4 text-body-lg text-kahu-taupe"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: DURATION.slow,
            delay: 0.3,
            ease: KAHU_EASE,
          }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
