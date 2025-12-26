import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SectionReveal } from "@/components/animations/scroll-cinema";
import { ArtisanGallerySection } from "@/components/sections/artisan-gallery-section";

export const revalidate = 60;

interface PortfolioPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PortfolioPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.atelier.portfolio.title,
    description: dict.atelier.portfolio.heroText,
  };
}

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-kahu-cream-warm min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-kahu-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <span className="inline-block text-body-sm text-kahu-taupe uppercase tracking-[0.2em] mb-4">
              {dict.atelier.title}
            </span>
            <h1 className="font-display text-display-xl text-kahu-terracotta uppercase tracking-[0.1em]">
              {dict.atelier.portfolio.title}
            </h1>
            <p className="mt-6 text-body-lg text-kahu-taupe max-w-3xl mx-auto leading-relaxed">
              {dict.atelier.portfolio.heroText}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Combined Gallery - Products and Projects */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8">
          <SectionReveal>
            <h2 className="font-display text-display-md text-kahu-terracotta mb-2">
              {lang === "fr" ? "Créations" : "Creations"}
            </h2>
            <p className="text-body-md text-kahu-taupe">
              {lang === "fr"
                ? "Notre sélection de mobilier artisanal"
                : "Our selection of artisanal furniture"}
            </p>
          </SectionReveal>
        </div>
        <ArtisanGallerySection
          limit={12}
          title={dict.atelier.portfolio.filterMobilier}
          showFilters={false}
          lang={lang}
        />
      </section>

      {/* Projects Section - Link to Espace */}
      <section className="py-16 md:py-24 bg-kahu-cream-deep/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-display-md text-kahu-terracotta mb-2">
              {dict.atelier.portfolio.filterEspaces}
            </h2>
            <p className="text-body-md text-kahu-taupe max-w-2xl mx-auto mb-8">
              {lang === "fr"
                ? "Découvrez nos projets d'aménagement et de rénovation dans la section Espace."
                : "Discover our layout and renovation projects in the Space section."}
            </p>
            <a
              href={`/${lang}/espace`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-kahu-cream text-kahu-charcoal text-body-sm font-medium rounded-sm border border-kahu-cream-deep hover:bg-kahu-cream-deep transition-colors"
            >
              {lang === "fr" ? "Voir les projets Espace" : "View Space projects"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </SectionReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-kahu-cream border-t border-kahu-cream-deep">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-display-md text-kahu-terracotta mb-4">
              {lang === "fr" ? "Votre projet en tête ?" : "Have a project in mind?"}
            </h2>
            <p className="text-body-md text-kahu-taupe max-w-xl mx-auto mb-8">
              {lang === "fr"
                ? "Chaque création commence par une conversation. Partagez-nous votre vision."
                : "Every creation starts with a conversation. Share your vision with us."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`/${lang}/objet/sur-mesure`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-kahu-charcoal text-kahu-ivory text-body-sm font-medium rounded-sm hover:bg-kahu-bark transition-colors"
              >
                {lang === "fr" ? "Découvrir le sur-mesure" : "Discover bespoke"}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href={`/${lang}/contact`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-kahu-charcoal text-kahu-charcoal text-body-sm font-medium rounded-sm hover:bg-kahu-charcoal hover:text-kahu-ivory transition-colors"
              >
                {lang === "fr" ? "Nous contacter" : "Contact us"}
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
