import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SectionReveal } from "@/components/animations/scroll-cinema";
import { MaterialGrid, MaterialTimeline } from "@/components/ui/material-card";
import { bioMaterials } from "@/data/materials";

export const revalidate = 60;

interface BioMateriauxPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: BioMateriauxPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.materiaux.bioMateriaux.title,
    description: dict.materiaux.bioMateriaux.heroText,
  };
}

export default async function BioMateriauxPage({ params }: BioMateriauxPageProps) {
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
              {dict.materiaux.title}
            </span>
            <h1 className="font-display text-display-xl text-kahu-charcoal uppercase tracking-[0.1em]">
              {dict.materiaux.bioMateriaux.title}
            </h1>
            <p className="mt-6 text-body-lg text-kahu-taupe max-w-3xl mx-auto leading-relaxed">
              {dict.materiaux.bioMateriaux.heroText}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Status Legend */}
      <section className="py-8 bg-kahu-cream-deep/50 border-y border-kahu-cream-deep">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-body-sm">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-kahu-olive/20 text-kahu-olive rounded-full text-body-xs font-medium">
                {dict.materiaux.bioMateriaux.statusLabels.research}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-body-xs font-medium">
                {dict.materiaux.bioMateriaux.statusLabels.prototype}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-body-xs font-medium">
                {dict.materiaux.bioMateriaux.statusLabels.production}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bio-Materials Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MaterialGrid materials={bioMaterials} lang={lang} />
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 md:py-24 bg-kahu-cream border-t border-kahu-cream-deep">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <h2 className="font-display text-display-md text-kahu-charcoal text-center mb-12">
              {lang === "fr" ? "Chronologie des projets" : "Project Timeline"}
            </h2>
          </SectionReveal>
          <MaterialTimeline materials={bioMaterials} lang={lang} />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-kahu-bark text-kahu-ivory">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <SectionReveal>
              <h2 className="font-display text-display-md mb-6">
                {lang === "fr" ? "Notre engagement" : "Our commitment"}
              </h2>
              <p className="text-body-md text-kahu-ivory/80 leading-relaxed mb-6">
                {lang === "fr"
                  ? "Chaque année, notre atelier génère des tonnes de chutes de bois précieux. Plutôt que de les considérer comme des déchets, nous les transformons en opportunités d'innovation."
                  : "Each year, our workshop generates tons of precious wood offcuts. Rather than treating them as waste, we transform them into innovation opportunities."}
              </p>
              <p className="text-body-md text-kahu-ivory/80 leading-relaxed">
                {lang === "fr"
                  ? "Les bio-matériaux sont au cœur de notre vision d'un artisanat responsable et créatif, où rien ne se perd et tout se transforme."
                  : "Bio-materials are at the heart of our vision for responsible and creative craftsmanship, where nothing is wasted and everything is transformed."}
              </p>
            </SectionReveal>
            <div className="relative">
              <div className="aspect-square rounded-sm bg-kahu-charcoal/30 overflow-hidden">
                {/* Placeholder for commitment image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border-2 border-kahu-ivory/20 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-kahu-ivory/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-kahu-cream-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-display-md text-kahu-charcoal mb-4">
              {lang === "fr" ? "Intéressé par nos recherches ?" : "Interested in our research?"}
            </h2>
            <p className="text-body-md text-kahu-taupe max-w-xl mx-auto mb-8">
              {lang === "fr"
                ? "Nous collaborons avec des designers, architectes et chercheurs. Contactez-nous pour explorer les possibilités."
                : "We collaborate with designers, architects and researchers. Contact us to explore possibilities."}
            </p>
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-kahu-charcoal text-kahu-ivory text-body-sm font-medium rounded-sm hover:bg-kahu-bark transition-colors"
            >
              {lang === "fr" ? "Collaborer avec nous" : "Collaborate with us"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}
