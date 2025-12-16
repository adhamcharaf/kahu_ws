import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/notion";
import { FeaturedProductsClient } from "./featured-products-client";

// ============================================================================
// Featured Products - Server Component pour le data fetching
// ============================================================================

export async function FeaturedProducts() {
  const products = await getFeaturedProducts(4);

  if (products.length === 0) {
    return null;
  }

  return <FeaturedProductsClient products={products} />;
}
