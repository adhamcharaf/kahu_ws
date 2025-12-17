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

// ============================================================================
// Gallery Artwork Types - Types pour le fullscreen gallery slider
// ============================================================================

/**
 * Artwork optimise pour la galerie fullscreen
 * Compatible avec les produits Notion et les artworks statiques
 */
export interface GalleryArtwork {
  /** Identifiant unique */
  id: string;
  /** Titre de l'oeuvre/produit */
  title: string;
  /** Nom de l'artiste/createur (optionnel) */
  artist?: string;
  /** Annee de creation */
  year?: number;
  /** Categorie */
  category?: string;
  /** Prix en FCFA (optionnel) */
  price?: number;
  /** Description du produit (optionnelle) */
  description?: string;
  /** Image pour la galerie */
  image: {
    /** URL de l'image */
    src: string;
    /** Texte alternatif */
    alt: string;
  };
  /** Couleurs extraites pour le background dynamique */
  colors?: ExtractedColors;
  /** Lien vers la page detail */
  href?: string;
}

/** Type de filtre pour les produits */
export type GalleryFilter = "tous" | "capsule" | "mobilier" | "objet" | "flash";

/**
 * Props pour les composants de la galerie fullscreen
 */
export interface FullscreenGalleryProps {
  /** Liste des artworks a afficher */
  artworks: GalleryArtwork[];
  /** Variante d'affichage */
  variant?: "homepage" | "creations";
  /** Activer l'auto-play */
  autoPlay?: boolean;
  /** Intervalle auto-play en secondes */
  autoPlayInterval?: number;
  /** Afficher les hints clavier */
  showKeyboardHint?: boolean;
  /** Titre de la section */
  title?: string;
  /** Afficher les filtres (page creations) */
  showFilters?: boolean;
  /** Filtre actuel */
  currentFilter?: GalleryFilter;
}
