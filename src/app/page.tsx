import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { PhilosophyBlock } from "@/components/sections/philosophy-block";
import { CustomCTA } from "@/components/sections/custom-cta";
import { ProductGridSkeleton } from "@/components/ui/skeleton";

// Revalidate every 60 seconds
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* Featured Products */}
        <Suspense
          fallback={
            <section className="py-section bg-kahu-cream-warm">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <ProductGridSkeleton count={4} />
              </div>
            </section>
          }
        >
          <FeaturedProducts />
        </Suspense>

        {/* Philosophy */}
        <PhilosophyBlock />

        {/* Custom CTA */}
        <CustomCTA />
      </main>

      <Footer />
    </>
  );
}
