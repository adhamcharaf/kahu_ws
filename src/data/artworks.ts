// ============================================================================
// Artworks Data - Donnees des images de l'atelier
// ============================================================================

import type { Artwork } from "@/types/artwork";

/**
 * Images de l'atelier pour le slider
 * Couleurs dominantes pre-calculees pour SSR
 */
export const atelierArtworks: Artwork[] = [
  {
    id: "atelier-portrait",
    title: "Portrait de l'artisan",
    description: "Shaima Mouna dans son atelier",
    image: {
      src: "/images/atelier/portrait.png",
      alt: "Shaima Mouna, designer produit et ebeniste",
      dominantColor: "#8B7355",
      palette: ["#8B7355", "#6B5B4F", "#A67C52"],
    },
  },
  {
    id: "atelier-chaise",
    title: "La Chaise Signature",
    description: "Chaise artisanale en bois massif",
    image: {
      src: "/images/atelier/chaise.png",
      alt: "Chaise artisanale en bois massif",
      dominantColor: "#A67C52",
      palette: ["#A67C52", "#8B6914", "#5C4033"],
    },
  },
  {
    id: "atelier-outils",
    title: "Les Outils",
    description: "Outils de menuiserie traditionnels",
    image: {
      src: "/images/atelier/outils.png",
      alt: "Outils de menuiserie traditionnels",
      dominantColor: "#5C4033",
      palette: ["#5C4033", "#8B7355", "#2D2420"],
    },
  },
  {
    id: "atelier-bougeoirs",
    title: "Bougeoirs en Bois",
    description: "Collection de bougeoirs sculptes",
    image: {
      src: "/images/atelier/bougeoirs.png",
      alt: "Collection de bougeoirs sculptes a la main",
      dominantColor: "#6B5B4F",
      palette: ["#6B5B4F", "#8B7355", "#4A3F35"],
    },
  },
  {
    id: "atelier-chair4",
    title: "Assise Contemporaine",
    description: "Chaise au design contemporain",
    image: {
      src: "/images/atelier/chair4.png",
      alt: "Chaise au design contemporain",
      dominantColor: "#8B6914",
      palette: ["#8B6914", "#A67C52", "#5C4033"],
    },
  },
];
