import { Suspense } from "react";
import { getProducts, getFeaturedProducts } from "@/lib/notion";
import { ArtisanGallery, ArtisanGallerySkeleton } from "@/components/galleries/artisan-gallery";
import type { ArtisanCardProduct } from "@/components/galleries/artisan-gallery-card";
import type { GalleryFilter } from "@/components/galleries/artisan-gallery-filters";

// ============================================================================
// Artisan Gallery Section - Server Component Wrapper
// ============================================================================

interface ArtisanGallerySectionProps {
  title?: string;
  showFilters?: boolean;
  limit?: number;
  featured?: boolean;
  lang?: string;
  /** Pre-filter products by category (hides filter UI) */
  filter?: GalleryFilter;
}

// Convert Notion products to ArtisanCardProduct format
function toArtisanCardProduct(product: {
  id: string;
  slug: string;
  nom: string;
  prix: number;
  description: string;
  categorie: string;
  photos: string[];
}): ArtisanCardProduct {
  return {
    id: product.id,
    slug: product.slug,
    nom: product.nom,
    prix: product.prix,
    description: product.description,
    categorie: product.categorie,
    photos: product.photos,
  };
}

async function ArtisanGalleryContent({
  title,
  showFilters,
  limit,
  featured,
  lang,
  filter,
}: ArtisanGallerySectionProps) {
  // Fetch products from Notion
  const rawProducts = featured
    ? await getFeaturedProducts(limit || 12)
    : await getProducts();

  // Filter available products
  let products = rawProducts
    .filter((p) => p.statut === "Disponible" && p.photos.length > 0)
    .map(toArtisanCardProduct);

  // Apply category filter if specified
  if (filter && filter !== "tous") {
    products = products.filter(
      (p) => p.categorie.toLowerCase() === filter.toLowerCase()
    );
  }

  // Apply limit
  if (limit) {
    products = products.slice(0, limit);
  }

  return (
    <ArtisanGallery
      products={products}
      title={title}
      showFilters={filter ? false : showFilters} // Hide filters if pre-filtered
      showViewAll={!filter} // Hide "Voir toutes les créations" on filtered pages
      lang={lang}
    />
  );
}

export function ArtisanGallerySection(props: ArtisanGallerySectionProps) {
  return (
    <Suspense fallback={<ArtisanGallerySkeleton />}>
      <ArtisanGalleryContent {...props} />
    </Suspense>
  );
}

// Re-export for convenience
export { ArtisanGallery, ArtisanGallerySkeleton } from "@/components/galleries/artisan-gallery";
