// ============================================================================
// GallerySection - Section galerie fullscreen pour la homepage
// Server component qui récupère les données et passe au client
// ============================================================================

import { FullscreenGallerySlider } from "@/components/galleries";
import { getGalleryProducts } from "@/lib/gallery-utils";
import type { GalleryFilter } from "@/types/artwork";

interface GallerySectionProps {
  /** Nombre de produits à afficher */
  limit?: number;
  /** Titre de la section */
  title?: string;
  /** Activer l'auto-play */
  autoPlay?: boolean;
  /** Variante d'affichage */
  variant?: "homepage" | "creations";
  /** Afficher les filtres de catégorie */
  showFilters?: boolean;
  /** Filtre de catégorie actif */
  filter?: GalleryFilter;
}

export async function GallerySection({
  limit = 7,
  title = "Créations",
  autoPlay = false,
  variant = "homepage",
  showFilters = false,
  filter = "tous",
}: GallerySectionProps) {
  // Récupérer les produits pour la galerie (server-side)
  const artworks = await getGalleryProducts(limit, filter);

  // Si pas de produits, afficher un message élégant
  if (artworks.length === 0) {
    return <GalleryEmptyState title={title} />;
  }

  return (
    <FullscreenGallerySlider
      artworks={artworks}
      variant={variant}
      title={title}
      autoPlay={autoPlay}
      showKeyboardHint
      showFilters={showFilters}
      currentFilter={filter}
    />
  );
}

// ============================================================================
// GalleryEmptyState - Message élégant quand pas de produits
// ============================================================================

function GalleryEmptyState({ title }: { title: string }) {
  return (
    <section
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#0a0a0a" }}
    >
      {/* Background gradient subtil */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139, 115, 85, 0.15) 0%, transparent 70%)`,
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 px-4 md:px-8 lg:px-12 py-4 md:py-6">
        <h2
          className="text-lg md:text-xl font-semibold tracking-tight text-white"
          style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
        >
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-lg">
        {/* Icon décoratif */}
        <div className="mb-6 flex justify-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <svg
              className="w-8 h-8 text-white/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </div>
        </div>

        {/* Titre */}
        <h3
          className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3"
          style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
        >
          Bientôt disponible
        </h3>

        {/* Description */}
        <p
          className="text-white/60 text-sm md:text-base leading-relaxed"
          style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
        >
          Notre galerie de créations arrive prochainement.
          <br className="hidden md:block" />
          Découvrez bientôt nos pièces uniques fabriquées à la main.
        </p>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: i === 1 ? 24 : 8,
                backgroundColor: i === 1 ? "rgba(139, 115, 85, 0.6)" : "rgba(255, 255, 255, 0.2)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
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
