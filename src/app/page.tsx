import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { HeroSection } from "@/components/sections/hero";
import {
  GallerySection,
  GallerySectionSkeleton,
} from "@/components/sections/gallery-section";
import { PhilosophyBlock } from "@/components/sections/philosophy-block";
import { CustomCTA } from "@/components/sections/custom-cta";

// Revalidate every 60 seconds
export const revalidate = 60;

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero */}
        <HeroSection />

        {/* Fullscreen Gallery - Replaces FeaturedProducts */}
        <Suspense fallback={<GallerySectionSkeleton />}>
          <GallerySection
            limit={7}
            title="Créations"
            autoPlay={false}
          />
        </Suspense>

        {/* Philosophy */}
        <PhilosophyBlock />

        {/* Custom CTA */}
        <CustomCTA imageSrc="/images/atelier/outils.png" />
      </main>

      <Footer />
    </>
  );
}
