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
import {
  CreationsHero,
  AnimatedProductsSection,
  AnimatedProductGrid,
  AnimatedProductItem,
  EmptyState,
} from "./creations-hero";

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
    return <EmptyState />;
  }

  return (
    <AnimatedProductGrid>
      {products.map((product, index) => (
        <AnimatedProductItem key={product.id}>
          <ProductCard product={product} priority={index < 4} />
        </AnimatedProductItem>
      ))}
    </AnimatedProductGrid>
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
        {/* Hero Section avec animations cinematiques */}
        <CreationsHero />

        {/* Filters & Grid avec transitions fluides */}
        <AnimatedProductsSection
          filters={
            <Suspense fallback={null}>
              <ProductFilters />
            </Suspense>
          }
        >
          <Suspense fallback={<ProductGridSkeleton count={6} />}>
            <ProductGrid filter={filter} />
          </Suspense>
        </AnimatedProductsSection>
      </main>

      <Footer />
    </>
  );
}
