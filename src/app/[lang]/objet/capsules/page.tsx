import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SectionReveal } from "@/components/animations/scroll-cinema";
import { ArtisanGallerySection } from "@/components/sections/artisan-gallery-section";

export const revalidate = 60;

interface CapsulesPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: CapsulesPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.objet.capsules.title,
    description: dict.objet.capsules.heroText,
  };
}

export default async function CapsulesPage({ params }: CapsulesPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-kahu-cream-warm min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-kahu-cream-deep">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <span className="inline-block text-body-sm text-kahu-taupe uppercase tracking-[0.2em] mb-4">
              {dict.objet.title}
            </span>
            <h1 className="font-display text-display-xl text-kahu-charcoal uppercase tracking-[0.1em]">
              {dict.objet.capsules.title}
            </h1>
            <p className="mt-6 text-body-lg text-kahu-taupe max-w-2xl mx-auto">
              {dict.objet.capsules.heroText}
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* Gallery with Capsules filter */}
      <ArtisanGallerySection
        limit={20}
        title={dict.objet.capsules.title}
        filter="capsule"
        lang={lang}
      />
    </main>
  );
}
