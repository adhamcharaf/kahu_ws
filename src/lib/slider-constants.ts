// ============================================================================
// Slider Constants - Constantes physiques et timing pour le slider
// S'integre avec animation-config.ts existant
// ============================================================================

/**
 * Easing personnalise pour le slider (deceleration douce)
 */
export const SLIDER_EASE = [0.32, 0.72, 0, 1] as const;
export const SLIDER_EASE_CSS = "cubic-bezier(0.32, 0.72, 0, 1)";

/**
 * Durees des animations (en secondes)
 */
export const SLIDER_DURATION = {
  /** Transition principale du slide */
  slide: 0.6,
  /** Transition du fond */
  background: 0.8,
  /** Mouvement parallaxe */
  parallax: 0.4,
  /** Transition des indicateurs */
  indicator: 0.3,
  /** Intervalle auto-play (si active) */
  autoPlay: 5,
} as const;

/**
 * Physique du drag
 */
export const DRAG_PHYSICS = {
  /** Facteur de resistance (0-1, plus bas = plus de resistance) */
  resistance: 0.5,
  /** Seuil en pixels pour declencher le snap */
  snapThreshold: 50,
  /** Seuil de velocite pour declencher le snap */
  velocityThreshold: 0.5,
  /** Taux de deceleration du momentum */
  decelerationRate: 0.95,
  /** Velocite maximale (cap) */
  maxVelocity: 2,
  /** Elasticite aux bords */
  elastic: 0.2,
} as const;

/**
 * Configuration de la navigation molette
 */
export const WHEEL_CONFIG = {
  /** Seuil de delta pour declencher la navigation */
  threshold: 50,
  /** Delai de cooldown entre navigations (ms) */
  cooldown: 800,
  /** Multiplicateur de sensibilite */
  sensitivity: 1,
} as const;

/**
 * Configuration du fond dynamique
 */
export const BACKGROUND_CONFIG = {
  /** Taille du gradient radial (%) */
  gradientSize: 150,
  /** Opacite minimale */
  opacityMin: 0.3,
  /** Opacite maximale pendant transition */
  opacityMax: 0.6,
  /** Echelle minimale */
  scaleMin: 1,
  /** Echelle maximale pendant transition */
  scaleMax: 1.1,
} as const;

/**
 * Configuration de l'effet parallaxe
 */
export const PARALLAX_CONFIG = {
  /** Offset maximum en pixels */
  imageOffset: 20,
  /** Facteur de parallaxe (subtil) */
  factor: 0.15,
} as const;

/**
 * Springs Framer Motion pour differents effets
 */
export const SLIDER_SPRING = {
  /** Pour les transitions de slide */
  slide: {
    stiffness: 300,
    damping: 30,
    mass: 0.8,
  },
  /** Pour le changement de couleur de fond */
  background: {
    stiffness: 100,
    damping: 25,
    mass: 1,
  },
  /** Pour le momentum du drag */
  drag: {
    stiffness: 200,
    damping: 25,
    mass: 0.5,
  },
} as const;

// ============================================================================
// Fullscreen Gallery Configuration - Config pour la galerie plein ecran
// ============================================================================

/**
 * Configuration de la galerie fullscreen
 */
export const FULLSCREEN_GALLERY_CONFIG = {
  /** Couleur de fond sombre editoriale */
  backgroundColor: "#0a0a0a",

  /** Configuration des cards */
  card: {
    /** Hauteur en vh pour desktop */
    heightVhDesktop: 70,
    /** Hauteur en vh pour tablet */
    heightVhTablet: 65,
    /** Hauteur en vh pour mobile */
    heightVhMobile: 60,
    /** Ratio d'aspect (3:4) */
    aspectRatio: 3 / 4,
    /** Espacement entre les cards (px) */
    gap: 24,
    /** Decalage Y au hover (px) */
    hoverLift: -8,
    /** Scale au hover */
    hoverScale: 1.02,
    /** Border radius (px) */
    borderRadius: 16,
  },

  /** Effet glassmorphism */
  glass: {
    background: "rgba(255, 255, 255, 0.08)",
    backgroundHover: "rgba(255, 255, 255, 0.12)",
    backdropBlur: 12,
    border: "rgba(255, 255, 255, 0.1)",
    borderHover: "rgba(255, 255, 255, 0.15)",
  },

  /** Timings des transitions */
  transitions: {
    /** Crossfade du background (ms) */
    backgroundCrossfade: 600,
    /** Transition de la card au hover (s) */
    cardHover: 0.3,
    /** Slide-up du panel info (s) */
    infoPanelSlide: 0.35,
    /** Fade du keyboard hint (s) */
    keyboardHintFade: 0.5,
  },

  /** Configuration du keyboard hint */
  keyboardHint: {
    /** Delai avant fade-out apres inactivite (ms) */
    fadeOutDelay: 5000,
    /** Duree du fade-out (ms) */
    fadeOutDuration: 500,
  },
} as const;

/**
 * Physique du drag pour la galerie fullscreen (sensation "lourde")
 */
export const FULLSCREEN_DRAG_PHYSICS = {
  /** Facteur de resistance (0.4 = mouvement dampened) */
  resistance: 0.4,
  /** Facteur de momentum pour settling lent */
  momentumFactor: 0.1,
  /** Seuil de snap en pixels */
  snapThreshold: 80,
  /** Seuil de velocite */
  velocityThreshold: 0.3,
  /** Facteur de parallaxe pendant le drag */
  parallaxFactor: 0.15,
  /** Taux de deceleration */
  decelerationRate: 0.92,
} as const;

/**
 * Configuration de la molette/trackpad pour la galerie fullscreen
 */
export const FULLSCREEN_WHEEL_CONFIG = {
  /** Seuil de delta horizontal (px) */
  thresholdX: 120,
  /** Facteur de resistance pour le scroll */
  resistance: 0.3,
  /** Timeout d'inactivite pour reset l'accumulateur (ms) */
  inactivityTimeout: 150,
  /** Cooldown entre navigations (ms) */
  cooldown: 300,
} as const;

/**
 * Configuration du background ambient
 */
export const FULLSCREEN_BACKGROUND_CONFIG = {
  /** Opacite des gradients */
  opacity: {
    /** Layer 1 (principal) */
    layer1: 0.4,
    /** Layer 2 (secondaire) */
    layer2: 0.28,
    /** Layer 3 (accent) */
    layer3: 0.2,
  },
  /** Positions des gradients */
  positions: {
    layer1: { x: "30%", y: "40%" },
    layer2: { x: "70%", y: "60%" },
    layer3: { x: "50%", y: "80%" },
  },
  /** Tailles des gradients (format: "width% height%") */
  sizes: {
    layer1: "80% 60%",
    layer2: "60% 80%",
    layer3: "50% 50%",
  },
} as const;
