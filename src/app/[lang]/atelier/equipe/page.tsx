import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SectionReveal } from "@/components/animations/scroll-cinema";
import { TeamSection } from "@/components/sections/team-section";
import { getFounder, getArtisans } from "@/data/team";

export const revalidate = 60;

interface EquipePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: EquipePageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.atelier.equipe.title,
    description: dict.atelier.equipe.heroText,
  };
}

export default async function EquipePage({ params }: EquipePageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  const founder = getFounder();
  const artisans = getArtisans();

  if (!founder) {
    return null;
  }

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
              {dict.atelier.equipe.title}
            </h1>
            <p className="mt-6 text-body-lg text-kahu-taupe max-w-3xl mx-auto leading-relaxed">
              {dict.atelier.equipe.heroText}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TeamSection
            founder={founder}
            artisans={artisans}
            lang={lang}
            labels={{
              founderLabel: dict.atelier.equipe.founderLabel,
              artisansLabel: dict.atelier.equipe.artisansLabel,
              experienceLabel: dict.atelier.equipe.experienceLabel,
              specialtiesLabel: dict.atelier.equipe.specialtiesLabel,
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-kahu-cream border-t border-kahu-cream-deep">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="font-display text-display-md text-kahu-terracotta mb-4">
              {lang === "fr" ? "Envie de nous rencontrer ?" : "Want to meet us?"}
            </h2>
            <p className="text-body-md text-kahu-taupe max-w-xl mx-auto mb-8">
              {lang === "fr"
                ? "Visitez notre atelier et decouvrez notre savoir-faire en personne."
                : "Visit our workshop and discover our craftsmanship in person."}
            </p>
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-kahu-terracotta text-kahu-ivory text-body-sm font-medium rounded-sm hover:bg-kahu-terracotta-dark transition-colors"
            >
              {lang === "fr" ? "Prendre rendez-vous" : "Book an appointment"}
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
