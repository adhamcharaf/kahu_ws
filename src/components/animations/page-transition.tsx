"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, EASE } from "@/lib/animation-config";

// ============================================================================
// Page Transition - Transitions fluides entre les pages
// "Comme tourner les pages d'un portfolio d'artisan"
// ============================================================================

interface PageTransitionProps {
  children: ReactNode;
  /** Mode de transition */
  mode?: "fade" | "slide" | "scale" | "reveal" | "cinematic";
  /** Durée customisée */
  duration?: number;
}

// Variants pour différents modes de transition
const transitionVariants: Record<string, Variants> = {
  fade: {
    initial: { opacity: 0 },
    enter: {
      opacity: 1,
      transition: {
        duration: DURATION.normal,
        ease: KAHU_EASE,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: DURATION.fast,
        ease: KAHU_EASE,
      },
    },
  },

  slide: {
    initial: {
      opacity: 0,
      y: 20,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION.normal,
        ease: KAHU_EASE,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: DURATION.fast,
        ease: KAHU_EASE,
      },
    },
  },

  scale: {
    initial: {
      opacity: 0,
      scale: 0.98,
    },
    enter: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: DURATION.normal,
        ease: KAHU_EASE,
      },
    },
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: {
        duration: DURATION.fast,
        ease: KAHU_EASE,
      },
    },
  },

  reveal: {
    initial: {
      opacity: 0,
      clipPath: "inset(0 0 100% 0)",
    },
    enter: {
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      transition: {
        duration: DURATION.slow,
        ease: KAHU_EASE,
        clipPath: { duration: DURATION.slow },
      },
    },
    exit: {
      opacity: 0,
      clipPath: "inset(100% 0 0 0)",
      transition: {
        duration: DURATION.fast,
        ease: KAHU_EASE,
      },
    },
  },

  // Mode cinematique Apple-style - plus lent, plus dramatique
  cinematic: {
    initial: {
      opacity: 0,
      y: 40,
      filter: "blur(4px)",
    },
    enter: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: DURATION.cinematic,
        ease: EASE.cinematic,
        when: "beforeChildren",
        staggerChildren: 0.08,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(4px)",
      transition: {
        duration: DURATION.fast,
        ease: EASE.cinematic,
      },
    },
  },
};

export function PageTransition({
  children,
  mode = "slide",
  duration,
}: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = usePrefersReducedMotion();

  // Si reduced motion, pas de transition
  if (shouldReduceMotion) {
    return <>{children}</>;
  }

  const variants = transitionVariants[mode];

  // Override la durée si spécifiée
  const customVariants = duration
    ? {
        ...variants,
        enter: {
          ...(variants.enter as object),
          transition: {
            ...((variants.enter as { transition?: object }).transition || {}),
            duration,
          },
        },
      }
    : variants;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={customVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// Page Wrapper - Wrapper simple pour les pages avec animation d'entrée
// ============================================================================

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: DURATION.normal,
        ease: KAHU_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Section Transition - Pour les sections au sein d'une page
// ============================================================================

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  /** Délai avant l'animation */
  delay?: number;
  /** Direction de l'entrée */
  direction?: "up" | "down" | "left" | "right";
}

export function SectionTransition({
  children,
  className,
  delay = 0,
  direction = "up",
}: SectionTransitionProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const directionOffset = {
    up: { y: 30, x: 0 },
    down: { y: -30, x: 0 },
    left: { y: 0, x: 30 },
    right: { y: 0, x: -30 },
  };

  const offset = directionOffset[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        delay,
        duration: DURATION.normal,
        ease: KAHU_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Overlay Transition - Pour les overlays et modals
// ============================================================================

interface OverlayTransitionProps {
  children: ReactNode;
  isVisible: boolean;
  onClose?: () => void;
  className?: string;
}

export function OverlayTransition({
  children,
  isVisible,
  onClose,
  className,
}: OverlayTransitionProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-kahu-charcoal/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : DURATION.fast }}
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className={`fixed z-50 ${className}`}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{
              duration: DURATION.normal,
              ease: KAHU_EASE,
            }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// Route Announcer - Pour l'accessibilité des changements de page
// ============================================================================

export function RouteAnnouncer() {
  const pathname = usePathname();

  // Extraire le nom de la page du pathname
  const pageName = pathname === "/"
    ? "Accueil"
    : pathname.split("/").pop()?.replace(/-/g, " ") || "Page";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      Navigation vers {pageName}
    </div>
  );
}
