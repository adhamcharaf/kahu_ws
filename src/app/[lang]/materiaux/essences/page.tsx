import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SectionReveal } from "@/components/animations/scroll-cinema";
import { WoodGrid } from "@/components/ui/wood-card";
import { woodEssences } from "@/data/woods";

export const revalidate = 60;

interface EssencesPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: EssencesPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.materiaux.essences.title,
    description: dict.materiaux.essences.heroText,
  };
}

export default async function EssencesPage({ params }: EssencesPageProps) {
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
              {dict.materiaux.essences.title}
            </h1>
            <p className="mt-6 text-body-lg text-kahu-taupe max-w-3xl mx-auto leading-relaxed">
              {dict.materiaux.essences.heroText}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Legend */}
      <section className="py-8 bg-kahu-cream-deep/50 border-y border-kahu-cream-deep">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-body-sm text-kahu-taupe">
            <div className="flex items-center gap-2">
              <span className="text-kahu-stone">{dict.materiaux.essences.durabilityLabel}:</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-4 rounded-full bg-kahu-terracotta/60"
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-kahu-stone" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>{dict.materiaux.essences.originLabel}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-kahu-stone" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
              <span>{dict.materiaux.essences.densityLabel}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Wood Essences Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <WoodGrid woods={woodEssences} lang={lang} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-kahu-cream border-t border-kahu-cream-deep">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-display-md text-kahu-charcoal mb-4">
              {lang === "fr" ? "Une essence vous inspire ?" : "Does a wood inspire you?"}
            </h2>
            <p className="text-body-md text-kahu-taupe max-w-xl mx-auto mb-8">
              {lang === "fr"
                ? "Discutons de votre projet et trouvons ensemble le bois parfait pour votre création."
                : "Let's discuss your project and find the perfect wood for your creation together."}
            </p>
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-kahu-charcoal text-kahu-ivory text-body-sm font-medium rounded-sm hover:bg-kahu-bark transition-colors"
            >
              {lang === "fr" ? "Discuter de mon projet" : "Discuss my project"}
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
