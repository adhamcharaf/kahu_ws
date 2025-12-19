// ============================================================================
// Atelier Images - Liste des images pour la galerie masonry de l'atelier
// ============================================================================

/**
 * Images de l'atelier KAHU pour la galerie masonry parallax
 * Toutes les images sont stockees dans /public/images/atelier/
 */
export const atelierImages: string[] = [
  "/images/atelier/atelier_ppl.jpg",
  "/images/atelier/atelier1.jpg",
  "/images/atelier/bougeoirs.png",
  "/images/atelier/chair4.png",
  "/images/atelier/chaise.png",
  "/images/accueil/outils.png",
  "/images/atelier/ponce.webp",
  "/images/accueil/portrait.png",
  "/images/atelier/shay.png",
];

/**
 * Images supplementaires si besoin d'en ajouter
 * (actuellement exclues: doublon outils.jpg et stock photo pexels)
 */
export const atelierImagesExtended: string[] = [
  ...atelierImages,
  "/images/atelier/outils.jpg",
  "/images/atelier/pexels-photo-5089178.jpeg",
];
