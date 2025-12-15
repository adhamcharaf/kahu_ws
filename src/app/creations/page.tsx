import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ProductCard } from "@/components/ui/product-card";
import { ProductFilters } from "@/components/sections/product-filters";
import { ProductGridSkeleton } from "@/components/ui/skeleton";
import {
  getProducts,
  getProductsByCategory,
  getFlashSaleProducts,
} from "@/lib/notion";
import type { ProductFilter, ProductCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Creations",
  description:
    "Decouvrez les creations KAHU Studio : mobilier artisanal, capsules uniques et objets de decoration fabriques a la main a Abidjan.",
};

// Revalidate every 60 seconds
export const revalidate = 60;

interface CreationsPageProps {
  searchParams: Promise<{ filter?: string }>;
}

async function ProductGrid({ filter }: { filter: ProductFilter }) {
  let products;

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

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-body-md text-kahu-taupe">
          Aucune creation dans cette categorie pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < 4}
        />
      ))}
    </div>
  );
}

export default async function CreationsPage({
  searchParams,
}: CreationsPageProps) {
  const params = await searchParams;
  const filter = (params.filter as ProductFilter) || "tous";

  return (
    <>
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-section bg-kahu-cream-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-display-lg text-kahu-charcoal">
              Creations
            </h1>
            <p className="mt-4 text-body-lg text-kahu-taupe max-w-2xl">
              Des pieces uniques, fabriquees a la main dans notre atelier
              d&apos;Abidjan. Chaque creation porte en elle une intention, une
              histoire.
            </p>
          </div>
        </section>

        {/* Filters & Grid */}
        <section className="py-section bg-kahu-cream-warm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Filters */}
            <Suspense fallback={null}>
              <ProductFilters />
            </Suspense>

            {/* Products Grid */}
            <div className="mt-10">
              <Suspense fallback={<ProductGridSkeleton count={6} />}>
                <ProductGrid filter={filter} />
              </Suspense>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
