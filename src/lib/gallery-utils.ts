// ============================================================================
// Gallery Utils - Utilitaires pour la galerie fullscreen
// ============================================================================

import type { Product } from "./types";
import type { GalleryArtwork, ExtractedColors } from "@/types/artwork";
import { getProducts, getFeaturedProducts } from "./notion";
import { getOptimizedImageUrl } from "./cloudinary";

/**
 * Convertit un produit Notion en GalleryArtwork pour la galerie
 */
export function productToGalleryArtwork(product: Product): GalleryArtwork {
  // Utiliser la premiere photo du produit
  const imageSrc = product.photos[0] || "";
  const optimizedSrc = getOptimizedImageUrl(imageSrc, "full");

  return {
    id: product.id,
    title: product.nom,
    artist: "KAHU Studio", // Createur par defaut
    year: new Date().getFullYear(), // Annee courante si non disponible
    category: product.categorie,
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
 * Recupere les produits pour la galerie fullscreen
 * @param limit - Nombre maximum de produits (defaut: 7)
 * @returns Liste de GalleryArtwork
 */
export async function getGalleryProducts(
  limit: number = 7
): Promise<GalleryArtwork[]> {
  const products = await getProducts();

  // Filtrer les produits disponibles avec photos
  const availableWithPhotos = products.filter(
    (p) => p.statut === "Disponible" && p.photos.length > 0
  );

  // Prendre les N premiers
  const selected = availableWithPhotos.slice(0, limit);

  // Convertir en GalleryArtwork
  return selected.map(productToGalleryArtwork);
}

/**
 * Recupere les produits en vedette pour la galerie homepage
 * @param limit - Nombre maximum de produits (defaut: 7)
 * @returns Liste de GalleryArtwork
 */
export async function getFeaturedGalleryProducts(
  limit: number = 7
): Promise<GalleryArtwork[]> {
  const products = await getFeaturedProducts(limit * 2); // Demander plus pour filtrer

  // Filtrer ceux avec photos
  const withPhotos = products.filter((p) => p.photos.length > 0);

  // Prendre les N premiers
  const selected = withPhotos.slice(0, limit);

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
