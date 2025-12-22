import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { HeroOverlayWithContent } from "@/components/sections/hero-overlay";
import { ArtisanGallerySection } from "@/components/sections/artisan-gallery-section";
import { PhilosophyBlock } from "@/components/sections/philosophy-block";
import { CustomCTA } from "@/components/sections/custom-cta";

// Revalidate every 60 seconds
export const revalidate = 60;

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return (
    <main>
      {/* Hero with Overlay Effect */}
      <HeroOverlayWithContent
        title={dict.home.hero.title}
        subtitle={dict.home.hero.subtitle}
        ctaText={lang === "fr" ? "Decouvrir les creations" : "Discover creations"}
        ctaHref={`/${lang}/objet`}
        secondaryCtaText={dict.nav.atelier}
        secondaryCtaHref={`/${lang}/atelier`}
      />

      {/* Artisan Gallery - Masonry style */}
      <ArtisanGallerySection
        title={dict.nav.objet}
        showFilters={true}
        featured={true}
        limit={12}
        lang={lang}
      />

      {/* Philosophy */}
      <PhilosophyBlock />

      {/* Custom CTA */}
      <CustomCTA imageSrc="/images/accueil/outils.png" />
    </main>
  );
}
