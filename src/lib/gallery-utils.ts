// ============================================================================
// Gallery Utils - Utilitaires pour la galerie fullscreen
// ============================================================================

import type { Product, ProductFilter, ProductCategory } from "./types";
import type { GalleryArtwork, ExtractedColors } from "@/types/artwork";
import {
  getProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getFlashSaleProducts,
} from "./notion";
import { getOptimizedImageUrl } from "./cloudinary";

// Image placeholder pour les produits sans photos
const PLACEHOLDER_IMAGE = "/images/atelier/outils.png";

/**
 * Convertit un produit Notion en GalleryArtwork pour la galerie
 */
export function productToGalleryArtwork(product: Product): GalleryArtwork {
  // Utiliser la premiere photo du produit ou un placeholder
  const imageSrc = product.photos[0] || PLACEHOLDER_IMAGE;
  const optimizedSrc = product.photos[0]
    ? getOptimizedImageUrl(imageSrc, "full")
    : imageSrc;

  return {
    id: product.id,
    title: product.nom,
    artist: "KAHU Studio", // Createur par defaut
    year: new Date().getFullYear(), // Annee courante si non disponible
    category: product.categorie,
    price: product.prix,
    description: product.description,
    image: {
      src: optimizedSrc,
      alt: product.nom,
    },
    // Les couleurs seront extraites cote client
    colors: undefined,
    href: `/creations/${product.slug}`,
  };
}

/**
 * Recupere les produits pour la galerie fullscreen avec filtre optionnel
 * Priorise les produits avec photos, puis ajoute ceux sans photos si necessaire
 * @param limit - Nombre maximum de produits (defaut: 20 pour afficher tous)
 * @param filter - Filtre de categorie optionnel
 * @returns Liste de GalleryArtwork
 */
export async function getGalleryProducts(
  limit: number = 20,
  filter: ProductFilter = "tous"
): Promise<GalleryArtwork[]> {
  let products: Product[];

  // Recuperer les produits selon le filtre
  if (filter === "flash") {
    products = await getFlashSaleProducts();
  } else if (filter === "tous") {
    products = await getProducts();
  } else {
    // Map filter to category
    const categoryMap: Record<string, ProductCategory> = {
      capsule: "Capsule",
      mobilier: "Mobilier",
      objet: "Objet",
    };
    const category = categoryMap[filter];
    products = category
      ? await getProductsByCategory(category)
      : await getProducts();
  }

  // Filtrer les produits disponibles (sauf pour flash qui est deja filtre)
  const available =
    filter === "flash"
      ? products
      : products.filter((p) => p.statut === "Disponible");

  // Prioriser ceux avec photos, puis ajouter les autres
  const withPhotos = available.filter((p) => p.photos.length > 0);
  const withoutPhotos = available.filter((p) => p.photos.length === 0);

  // Combiner: d'abord ceux avec photos, puis les autres
  const combined = [...withPhotos, ...withoutPhotos];

  // Prendre les N premiers
  const selected = combined.slice(0, limit);

  // Convertir en GalleryArtwork
  return selected.map(productToGalleryArtwork);
}

/**
 * Recupere les produits en vedette pour la galerie homepage
 * Priorise les produits avec photos
 * @param limit - Nombre maximum de produits (defaut: 7)
 * @returns Liste de GalleryArtwork
 */
export async function getFeaturedGalleryProducts(
  limit: number = 7
): Promise<GalleryArtwork[]> {
  const products = await getFeaturedProducts(limit * 2); // Demander plus pour trier

  // Prioriser ceux avec photos
  const withPhotos = products.filter((p) => p.photos.length > 0);
  const withoutPhotos = products.filter((p) => p.photos.length === 0);

  // Combiner: d'abord ceux avec photos
  const combined = [...withPhotos, ...withoutPhotos];

  // Prendre les N premiers
  const selected = combined.slice(0, limit);

  return selected.map(productToGalleryArtwork);
}

/**
 * Cree un GalleryArtwork avec des couleurs pre-definies (pour SSR)
 * Utile pour les images statiques ou quand les couleurs sont connues
 */
export function createGalleryArtworkWithColors(
  artwork: Omit<GalleryArtwork, "colors">,
  colors: ExtractedColors
): GalleryArtwork {
  return {
    ...artwork,
    colors,
  };
}

/**
 * Valide qu'un GalleryArtwork a toutes les donnees requises
 */
export function isValidGalleryArtwork(artwork: GalleryArtwork): boolean {
  return Boolean(
    artwork.id &&
      artwork.title &&
      artwork.image?.src &&
      artwork.image?.alt
  );
}

/**
 * Formate l'annee pour l'affichage dans la galerie
 */
export function formatGalleryYear(year?: number): string {
  if (!year) return "";
  return year.toString();
}

/**
 * Formate le compteur de slides (ex: "02 / 07")
 */
export function formatSlideCounter(
  current: number,
  total: number
): string {
  const currentStr = (current + 1).toString().padStart(2, "0");
  const totalStr = total.toString().padStart(2, "0");
  return `${currentStr} / ${totalStr}`;
}

/**
 * Formate le prix pour l'affichage (ex: "150 000 FCFA")
 */
export function formatGalleryPrice(price?: number): string {
  if (!price || price === 0) return "";
  return `${price.toLocaleString("fr-FR")} FCFA`;
}

/**
 * Tronque une description pour l'affichage
 */
export function truncateDescription(
  description?: string,
  maxLength: number = 80
): string {
  if (!description) return "";
  if (description.length <= maxLength) return description;
  return description.slice(0, maxLength).trim() + "...";
}
