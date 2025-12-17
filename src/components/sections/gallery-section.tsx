// ============================================================================
// GallerySection - Section galerie fullscreen pour la homepage
// Server component qui recupere les donnees et passe au client
// ============================================================================

import { FullscreenGallerySlider } from "@/components/galleries";
import { getGalleryProducts } from "@/lib/gallery-utils";

interface GallerySectionProps {
  /** Nombre de produits a afficher */
  limit?: number;
  /** Titre de la section */
  title?: string;
  /** Activer l'auto-play */
  autoPlay?: boolean;
}

export async function GallerySection({
  limit = 7,
  title = "Creations",
  autoPlay = false,
}: GallerySectionProps) {
  // Recuperer les produits pour la galerie (server-side)
  const artworks = await getGalleryProducts(limit);

  // Si pas de produits, ne pas afficher la section
  if (artworks.length === 0) {
    return null;
  }

  return (
    <FullscreenGallerySlider
      artworks={artworks}
      variant="homepage"
      title={title}
      autoPlay={autoPlay}
      showKeyboardHint
    />
  );
}

// ============================================================================
// GallerySectionSkeleton - Loading state
// ============================================================================

export function GallerySectionSkeleton() {
  return (
    <section
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Header skeleton */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 md:px-8 lg:px-12 py-4 md:py-6">
        <div className="flex items-center justify-between">
          <div className="h-6 w-24 bg-white/10 rounded animate-pulse" />
          <div className="h-6 w-16 bg-white/10 rounded animate-pulse" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="absolute inset-0 flex items-center justify-center gap-6 px-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-2xl md:rounded-3xl overflow-hidden animate-pulse"
            style={{
              width: "calc(60vh * 0.75)",
              height: "60vh",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              opacity: i === 1 ? 1 : 0.5,
              transform: i === 1 ? "scale(1)" : "scale(0.9)",
            }}
          />
        ))}
      </div>

      {/* Footer skeleton */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-4 md:px-8 lg:px-12 py-4 md:py-6">
        <div className="flex items-center justify-center">
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-2.5 rounded-full bg-white/10 animate-pulse"
                style={{ width: i === 0 ? 24 : 8 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
