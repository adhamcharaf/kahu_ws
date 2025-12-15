import Link from "next/link";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts } from "@/lib/notion";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts(4);

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-section bg-kahu-cream-warm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="font-display text-display-md text-kahu-charcoal">
            Creations
          </h2>
          <p className="mt-4 text-body-md text-kahu-taupe max-w-lg mx-auto">
            Des pieces fabriquees a la main, ou la beaute du bois rencontre
            l&apos;intention du design.
          </p>
        </div>

        {/* Products Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index < 2}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button href="/creations" variant="secondary">
            Voir toutes les creations
          </Button>
        </div>
      </div>
    </section>
  );
}
