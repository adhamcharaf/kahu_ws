// ============================================================================
// Gallery 3D Configuration - Paramètres de la galerie infinie
// ============================================================================

// Golden angle pour distribution naturelle des images
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5)); // ~137.5°

// ============================================================================
// Types
// ============================================================================

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface ImagePosition {
  x: number;
  y: number;
  z: number;
  rotation: number;
}

// ============================================================================
// Animation Constants
// ============================================================================

export const GALLERY_CONFIG = {
  // Vitesse de défilement (unités/seconde)
  speed: 0.8,

  // Profondeur de la scène
  totalDepth: 15,

  // Seuils de fade
  fadeOutStart: 3,    // Z où commence le fade out (proche)
  fadeOutEnd: 5,      // Z où l'image disparaît complètement
  fadeInStart: -12,   // Z où l'image commence à apparaître (fond)
  fadeInEnd: -8,      // Z où l'image est pleinement visible

  // Camera
  camera: {
    fov: 50,
    position: [0, 0, 5] as const,
    near: 0.1,
    far: 100,
  },

  // Fog (effet de profondeur)
  fog: {
    color: "#EDE6DB", // kahu-cream-deep
    near: 2,
    far: 18,
  },

  // Image planes
  imageScale: {
    width: 2.2,
    height: 3.0, // Ratio ~3:4
  },

  // Distribution spatiale
  distribution: {
    radiusBase: 2.0,      // Rayon de base de la spirale
    radiusIncrement: 0.25, // Augmentation du rayon par image
    yCompression: 0.5,    // Compression verticale (pour format paysage)
    zSpacing: 1.8,        // Espacement en profondeur entre images
  },
} as const;

// ============================================================================
// Images disponibles
// ============================================================================

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "lignum-newhome",
    src: "/images/3dlibrary/lignum_newhome.png",
    alt: "Collection Lignum",
  },
  {
    id: "capsule-tabledbou",
    src: "/images/3dlibrary/capsule_tabledbou.png",
    alt: "Table d'Abou - Capsule",
  },
  {
    id: "shay",
    src: "/images/3dlibrary/shay.png",
    alt: "Collection Shay",
  },
  {
    id: "coquillages",
    src: "/images/3dlibrary/coquillages.png",
    alt: "Inspiration coquillages",
  },
  {
    id: "chaise1",
    src: "/images/3dlibrary/chaise1.png",
    alt: "Chaise artisanale KAHU",
  },
  {
    id: "mannequin",
    src: "/images/3dlibrary/mannequin.png",
    alt: "Mannequin design",
  },
];

// ============================================================================
// Position Calculator
// ============================================================================

/**
 * Calcule les positions initiales des images en spirale golden angle
 */
export function calculateInitialPositions(count: number): ImagePosition[] {
  const { distribution, totalDepth } = GALLERY_CONFIG;
  const positions: ImagePosition[] = [];

  for (let i = 0; i < count; i++) {
    const angle = i * GOLDEN_ANGLE;
    const radius = distribution.radiusBase + i * distribution.radiusIncrement;

    positions.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * distribution.yCompression,
      z: -2 - i * distribution.zSpacing, // Commence proche, s'éloigne
      rotation: angle * 0.05, // Légère rotation pour variété
    });
  }

  return positions;
}

// ============================================================================
// Opacity Calculator
// ============================================================================

/**
 * Calcule l'opacité basée sur la profondeur Z
 */
export function calculateDepthOpacity(z: number): number {
  const { fadeOutStart, fadeOutEnd, fadeInStart, fadeInEnd } = GALLERY_CONFIG;

  // Proche de la caméra - fade out progressif
  if (z > fadeOutStart) {
    const progress = (z - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    return Math.max(0, 1 - progress);
  }

  // Très loin - fade in progressif
  if (z < fadeInEnd) {
    const progress = (z - fadeInStart) / (fadeInEnd - fadeInStart);
    return Math.min(1, Math.max(0.1, progress));
  }

  // Zone optimale - pleine opacité
  return 1;
}

/**
 * Calcule le scale basé sur la profondeur Z (effet de perspective renforcé)
 */
export function calculateDepthScale(z: number): number {
  // Les images plus proches sont légèrement plus grandes
  const baseScale = 1;
  const scaleMultiplier = 0.03;

  return baseScale + Math.max(0, z * scaleMultiplier);
}
