import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { OverviewCard, OverviewGrid, OverviewSection } from "@/components/ui/overview-card";
import { SectionReveal } from "@/components/animations/scroll-cinema";

export const revalidate = 60;

interface AtelierPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: AtelierPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.atelier.title,
    description: dict.atelier.subtitle,
  };
}

export default async function AtelierPage({ params }: AtelierPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  const sections = [
    {
      href: `/${lang}/atelier/equipe`,
      image: "/images/atelier/equipe.jpg",
      title: dict.atelier.sections.equipe.title,
      description: dict.atelier.sections.equipe.description,
    },
    {
      href: `/${lang}/atelier/lieu`,
      image: "/images/atelier/atelier_ppl.jpg",
      title: dict.atelier.sections.lieu.title,
      description: dict.atelier.sections.lieu.description,
    },
    {
      href: `/${lang}/atelier/portfolio`,
      image: "/images/atelier/chair4.png",
      title: dict.atelier.sections.portfolio.title,
      description: dict.atelier.sections.portfolio.description,
    },
  ];

  return (
    <main className="bg-kahu-cream-warm">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-kahu-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <span className="inline-block text-body-sm text-kahu-taupe uppercase tracking-[0.2em] mb-4">
              KAHU Studio
            </span>
            <h1 className="font-display text-display-xl text-kahu-terracotta uppercase tracking-[0.1em]">
              {dict.atelier.title}
            </h1>
            <p className="mt-6 text-body-lg text-kahu-taupe max-w-2xl mx-auto">
              {dict.atelier.subtitle}
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
