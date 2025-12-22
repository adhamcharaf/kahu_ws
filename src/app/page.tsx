import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { HeroOverlayWithContent } from "@/components/sections/hero-overlay";
import { ArtisanGallerySection } from "@/components/sections/artisan-gallery-section";
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
        <HeroOverlayWithContent
          horizontalImage="/images/accueil/portrait.png"
          verticalImage="/images/accueil/shay.png"
        />

        {/* Artisan Gallery - Masonry grid of products */}
        <ArtisanGallerySection
          limit={8}
          title="Créations"
          showFilters={false}
          lang="fr"
        />

        {/* Philosophy */}
        <PhilosophyBlock />

        {/* Custom CTA */}
        <CustomCTA imageSrc="/images/accueil/outils.png" />
      </main>

      <Footer />
    </>
  );
}
