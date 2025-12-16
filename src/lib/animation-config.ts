// ============================================================================
// KAHU Studio - Configuration Centralisée des Animations
// "Le site doit respirer comme le bois"
// ============================================================================

// Easing signature KAHU - fluide, organique, comme le mouvement naturel
export const KAHU_EASE = [0.22, 1, 0.36, 1] as const;
export const KAHU_EASE_CSS = "cubic-bezier(0.22, 1, 0.36, 1)";

// Easings Apple-style pour effets cinematiques
export const EASE = {
  smooth: [0.22, 1, 0.36, 1] as const,      // KAHU signature
  cinematic: [0.65, 0, 0.35, 1] as const,   // In-out fluide (page transitions)
  dramatic: [0.16, 1, 0.3, 1] as const,     // Depart rapide, arrivee douce
  reveal: [0.77, 0, 0.175, 1] as const,     // Fast start, smooth end (hero)
  bounce: [0.34, 1.56, 0.64, 1] as const,   // Leger overshoot
} as const;

// Durees standardisees (en secondes)
export const DURATION = {
  instant: 0.15,      // Micro-interactions (hover states)
  fast: 0.3,          // Transitions rapides (boutons, badges)
  normal: 0.5,        // Transitions standard (cards, sections)
  slow: 0.8,          // Animations importantes (hero, reveal)
  cinematic: 0.9,     // Transitions de page Apple-style
  reveal: 1.2,        // Grandes revelations (page load)
  dramatic: 1.4,      // Reveals hero dramatiques
  contemplative: 2,   // Animations decoratives lentes (floating shapes)
  epic: 2.5,          // Sequence hero complete
} as const;

// Delays standardisés (en secondes)
export const DELAY = {
  stagger: {
    fast: 0.05,     // Mobile stagger
    normal: 0.08,   // Desktop stagger standard
    slow: 0.12,     // Cascade dramatique
  },
  section: {
    short: 0.1,
    normal: 0.2,
    long: 0.4,
  },
  hero: {
    grain: 0,           // Background grain
    shapes: 0.3,        // Floating shapes
    title: 0.6,         // Titre principal
    subtitle: 1.0,      // Sous-titre
    buttons: 1.3,       // CTAs
    scroll: 2.0,        // Scroll indicator
  },
} as const;

// Configurations Spring pour Framer Motion
export const SPRING = {
  // Doux et fluide - pour les mouvements organiques
  soft: {
    stiffness: 100,
    damping: 30,
    mass: 1
  },
  // Équilibré - pour la plupart des interactions
  medium: {
    stiffness: 150,
    damping: 20,
    mass: 0.8
  },
  // Réactif - pour les micro-interactions
  snappy: {
    stiffness: 300,
    damping: 25,
    mass: 0.5
  },
  // Magnétique - pour l'effet de suivi curseur
  magnetic: {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  },
  // Parallax - pour les effets de scroll
  parallax: {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  },
} as const;

// Variants réutilisables pour Framer Motion
export const VARIANTS = {
  // Fade + slide vers le haut (le plus utilisé)
  fadeUp: {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: DURATION.normal,
        ease: KAHU_EASE
      },
    },
  },

  // Fade simple
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: DURATION.fast },
    },
  },

  // Scale + fade (pour les cards, images)
  scaleIn: {
    hidden: {
      opacity: 0,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: DURATION.normal,
        ease: KAHU_EASE
      },
    },
  },

  // Slide depuis la gauche
  slideLeft: {
    hidden: {
      opacity: 0,
      x: -30
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: DURATION.normal,
        ease: KAHU_EASE
      },
    },
  },

  // Slide depuis la droite
  slideRight: {
    hidden: {
      opacity: 0,
      x: 30
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: DURATION.normal,
        ease: KAHU_EASE
      },
    },
  },
} as const;

// Container variants pour le stagger
export const STAGGER_CONTAINER = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: DELAY.stagger.normal,
      delayChildren: DELAY.section.short,
    },
  },
} as const;

// Item variants pour le stagger
export const STAGGER_ITEM = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: KAHU_EASE,
    },
  },
} as const;

// Configuration du viewport pour whileInView
export const VIEWPORT = {
  default: {
    once: true,
    margin: "-50px"
  },
  early: {
    once: true,
    margin: "-100px"
  },
  late: {
    once: true,
    margin: "0px"
  },
} as const;

// Limites pour les effets desktop-only
export const LIMITS = {
  parallax: {
    maxOffset: 50, // Maximum 50px de déplacement
  },
  tilt: {
    maxDegrees: 10, // Maximum 10 degrés d'inclinaison
  },
  magnetic: {
    maxOffset: 20, // Maximum 20px de déplacement magnétique
    strength: 0.3, // Force par défaut
  },
} as const;

// Type helpers
export type EasingArray = readonly [number, number, number, number];
export type SpringConfig = {
  stiffness: number;
  damping: number;
  mass?: number;
  restDelta?: number;
};
