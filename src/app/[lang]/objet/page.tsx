import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { OverviewCard, OverviewGrid, OverviewSection } from "@/components/ui/overview-card";
import { SectionReveal } from "@/components/animations/scroll-cinema";

export const revalidate = 60;

interface ObjetPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ObjetPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.objet.title,
    description: dict.objet.subtitle,
  };
}

export default async function ObjetPage({ params }: ObjetPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  const sections = [
    {
      href: `/${lang}/objet/capsules`,
      image: "/images/produits/capsules-placeholder.jpg",
      title: dict.objet.sections.capsules.title,
      description: dict.objet.sections.capsules.description,
    },
    {
      href: `/${lang}/objet/collections`,
      image: "/images/produits/collections-placeholder.jpg",
      title: dict.objet.sections.collections.title,
      description: dict.objet.sections.collections.description,
    },
    {
      href: `/${lang}/objet/sur-mesure`,
      image: "/images/produits/sur-mesure-placeholder.jpg",
      title: dict.objet.sections.surMesure.title,
      description: dict.objet.sections.surMesure.description,
    },
  ];

  return (
    <main className="bg-kahu-cream-warm">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-kahu-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <span className="inline-block text-body-sm text-kahu-taupe uppercase tracking-[0.2em] mb-4">
              Nos Créations
            </span>
            <h1 className="font-display text-display-xl text-kahu-charcoal uppercase tracking-[0.1em]">
              {dict.objet.title}
            </h1>
            <p className="mt-6 text-body-lg text-kahu-taupe max-w-2xl mx-auto">
              {dict.objet.subtitle}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Overview Cards */}
      <OverviewSection>
        <OverviewGrid columns={3}>
          {sections.map((section, index) => (
            <OverviewCard
              key={section.href}
              href={section.href}
              image={section.image}
              title={section.title}
              description={section.description}
              orientation="portrait"
              index={index}
              priority={index === 0}
            />
          ))}
        </OverviewGrid>
      </OverviewSection>
    </main>
  );
}
