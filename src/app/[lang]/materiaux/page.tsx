import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { OverviewCard, OverviewGrid, OverviewSection } from "@/components/ui/overview-card";
import { SectionReveal } from "@/components/animations/scroll-cinema";

export const revalidate = 60;

interface MateriauxPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: MateriauxPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.materiaux.title,
    description: dict.materiaux.subtitle,
  };
}

export default async function MateriauxPage({ params }: MateriauxPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  const sections = [
    {
      href: `/${lang}/materiaux/essences`,
      image: "/images/materiaux/type_bois.jpg",
      title: dict.materiaux.sections.essences.title,
      description: dict.materiaux.sections.essences.description,
    },
    {
      href: `/${lang}/materiaux/bio-materiaux`,
      image: "/images/recyle.png",
      title: dict.materiaux.sections.bioMateriaux.title,
      description: dict.materiaux.sections.bioMateriaux.description,
    },
    {
      href: `/${lang}/materiaux/labo-kahu`,
      image: "/images/atelier/chair4.png",
      title: dict.materiaux.sections.laboKahu.title,
      description: dict.materiaux.sections.laboKahu.description,
    },
  ];

  return (
    <main className="bg-kahu-cream-warm">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-kahu-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <span className="inline-block text-body-sm text-kahu-taupe uppercase tracking-[0.2em] mb-4">
              Craft & Innovation
            </span>
            <h1 className="font-display text-display-xl text-kahu-charcoal uppercase tracking-[0.1em]">
              {dict.materiaux.title}
            </h1>
            <p className="mt-6 text-body-lg text-kahu-taupe max-w-2xl mx-auto">
              {dict.materiaux.subtitle}
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
