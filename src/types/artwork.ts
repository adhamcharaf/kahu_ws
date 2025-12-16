// ============================================================================
// Artwork Types - Types pour le slider de galerie d'art
// ============================================================================

/**
 * Image d'une oeuvre avec metadata pour extraction de couleurs
 */
export interface ArtworkImage {
  /** Chemin vers l'image (local ou Cloudinary) */
  src: string;
  /** Texte alternatif pour l'accessibilite */
  alt: string;
  /** Couleur dominante pre-calculee (fallback SSR) */
  dominantColor?: string;
  /** Palette de couleurs pre-calculee */
  palette?: string[];
}

/**
 * Oeuvre d'art pour le slider
 */
export interface Artwork {
  /** Identifiant unique */
  id: string;
  /** Titre de l'oeuvre */
  title: string;
  /** Description optionnelle */
  description?: string;
  /** Image associee */
  image: ArtworkImage;
  /** Annee de creation */
  year?: number;
  /** Categorie */
  category?: string;
}

/**
 * Etat du slider
 */
export interface SliderState {
  /** Index du slide actif */
  activeIndex: number;
  /** Direction de navigation (-1: gauche, 1: droite, 0: initial) */
  direction: -1 | 0 | 1;
  /** Indicateur de drag en cours */
  isDragging: boolean;
  /** Velocite du drag */
  velocity: number;
}

/**
 * Options de navigation du slider
 */
export interface SliderNavigationOptions {
  /** Nombre total de slides */
  totalSlides: number;
  /** Boucle infinie */
  loop?: boolean;
  /** Callback lors de la navigation */
  onNavigate?: (index: number, direction: -1 | 1) => void;
}

/**
 * Etat du drag
 */
export interface DragState {
  /** Indicateur de drag en cours */
  isDragging: boolean;
  /** Position X de depart */
  startX: number;
  /** Position X courante */
  currentX: number;
  /** Offset calcule */
  offsetX: number;
  /** Velocite du mouvement */
  velocity: number;
}

/**
 * Couleurs extraites d'une image
 */
export interface ExtractedColors {
  /** Couleur dominante (hex) */
  dominant: string;
  /** Palette de 2-3 couleurs (hex) */
  palette: string[];
  /** Indique si la couleur dominante est sombre */
  isDark: boolean;
}
