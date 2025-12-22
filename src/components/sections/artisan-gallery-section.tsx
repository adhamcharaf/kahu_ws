import { Suspense } from "react";
import { getProducts, getFeaturedProducts } from "@/lib/notion";
import { ArtisanGallery, ArtisanGallerySkeleton } from "@/components/galleries/artisan-gallery";
import type { ArtisanCardProduct } from "@/components/galleries/artisan-gallery-card";

// ============================================================================
// Artisan Gallery Section - Server Component Wrapper
// ============================================================================

interface ArtisanGallerySectionProps {
  title?: string;
  showFilters?: boolean;
  limit?: number;
  featured?: boolean;
  lang?: string;
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
}: ArtisanGallerySectionProps) {
  // Fetch products from Notion
  const rawProducts = featured
    ? await getFeaturedProducts(limit || 12)
    : await getProducts();

  // Filter available products and apply limit
  let products = rawProducts
    .filter((p) => p.statut === "Disponible" && p.photos.length > 0)
    .map(toArtisanCardProduct);

  if (limit && !featured) {
    products = products.slice(0, limit);
  }

  return (
    <ArtisanGallery
      products={products}
      title={title}
      showFilters={showFilters}
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
