"use client";

import { motion, useInView, Variants, UseInViewOptions } from "framer-motion";
import { useRef, ReactNode, Children, isValidElement } from "react";
import { usePrefersReducedMotion, useIsMobile } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, DELAY } from "@/lib/animation-config";

// ============================================================================
// Stagger Reveal - Cascade orchestrée d'éléments
// "Comme des pièces de mobilier qui s'installent dans un espace"
// ============================================================================

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  /** Délai entre chaque enfant (en secondes) */
  staggerDelay?: number;
  /** Délai initial avant le premier enfant */
  initialDelay?: number;
  /** Distance de déplacement Y en pixels */
  yOffset?: number;
  /** Durée de chaque animation */
  duration?: number;
  /** Margin pour le viewport trigger */
  viewportMargin?: string;
}

export function StaggerReveal({
  children,
  className,
  staggerDelay,
  initialDelay = DELAY.section.short,
  yOffset = 30,
  duration = DURATION.slow,
  viewportMargin = "-50px",
}: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const viewportOptions: UseInViewOptions = { once: true, margin: viewportMargin as UseInViewOptions["margin"] };
  const isInView = useInView(ref, viewportOptions);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  // Stagger plus rapide sur mobile
  const computedStaggerDelay = staggerDelay ?? (isMobile ? DELAY.stagger.fast : DELAY.stagger.normal);

  // Si reduced motion, afficher sans animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: computedStaggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: KAHU_EASE,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}

// ============================================================================
// Stagger Grid - Variante optimisée pour les grilles de produits
// ============================================================================

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  /** Nombre de colonnes pour calculer le stagger diagonal */
  columns?: number;
}

export function StaggerGrid({
  children,
  className,
  columns = 2,
}: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const baseDelay = isMobile ? DELAY.stagger.fast : DELAY.stagger.normal;

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          // Calcul du délai diagonal pour un effet plus naturel
          const row = Math.floor(index / columns);
          const col = index % columns;
          const diagonalIndex = row + col;
          const delay = diagonalIndex * baseDelay;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={isInView ? {
                opacity: 1,
                y: 0,
                scale: 1,
              } : {}}
              transition={{
                delay,
                duration: DURATION.normal,
                ease: KAHU_EASE,
              }}
            >
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </div>
  );
}

// ============================================================================
// Stagger List - Variante pour les listes (navigation, features)
// ============================================================================

interface StaggerListProps {
  children: ReactNode;
  className?: string;
  /** Direction du stagger */
  direction?: "down" | "up";
  /** Exporter les variants pour un contrôle externe */
  asChild?: boolean;
}

export function StaggerList({
  children,
  className,
  direction = "down",
}: StaggerListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const yOffset = direction === "down" ? 20 : -20;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: DELAY.stagger.normal,
        staggerDirection: direction === "down" ? 1 : -1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION.normal,
        ease: KAHU_EASE,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {Children.map(children, (child, index) => {
        if (isValidElement(child)) {
          return (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
}

// Export des variants pour réutilisation
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DELAY.stagger.normal,
      delayChildren: DELAY.section.short,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: KAHU_EASE,
    },
  },
};
