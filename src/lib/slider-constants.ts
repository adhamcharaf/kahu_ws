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
