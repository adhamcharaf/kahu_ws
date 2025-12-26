import { Suspense } from "react";
import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { SectionReveal } from "@/components/animations/scroll-cinema";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectGridSkeleton } from "@/components/ui/skeleton";
import { getProjects } from "@/lib/notion";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/utils";

export const revalidate = 60;

interface AmenagementPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: AmenagementPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.espace.amenagement.title,
    description: dict.espace.amenagement.heroText,
  };
}

async function ProjectsGrid({ lang }: { lang: Locale }) {
  const projects = await getProjects();
  // TODO: Filter by project type when available in Notion schema
  // const filteredProjects = projects.filter(p => p.type === 'amenagement');
  const filteredProjects = projects;

  if (filteredProjects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-body-md text-kahu-taupe">
          Aucun projet d'aménagement disponible pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
      {filteredProjects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          priority={index < 2}
          lang={lang}
        />
      ))}
    </div>
  );
}

export default async function AmenagementPage({ params }: AmenagementPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-kahu-cream-warm min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-kahu-cream-deep">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <span className="inline-block text-body-sm text-kahu-taupe uppercase tracking-[0.2em] mb-4">
              {dict.espace.title}
            </span>
            <h1 className="font-display text-display-xl text-kahu-terracotta uppercase tracking-[0.1em]">
              {dict.espace.amenagement.title}
            </h1>
            <p className="mt-6 text-body-lg text-kahu-taupe max-w-2xl">
              {dict.espace.amenagement.heroText}
            </p>
          </SectionReveal>

          {/* Features */}
          <SectionReveal delay={0.2}>
            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {dict.espace.amenagement.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-body-md text-kahu-bark">
                  <span className="w-2 h-2 bg-kahu-terracotta rounded-full shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-section bg-kahu-cream-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<ProjectGridSkeleton count={4} />}>
            <ProjectsGrid lang={lang} />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section bg-kahu-bark">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-sm text-kahu-cream">
            {dict.espace.cta.title}
          </h2>
          <p className="mt-4 text-body-md text-kahu-stone-light">
            {dict.espace.cta.subtitle}
          </p>
          <div className="mt-8">
            <Button href={generateWhatsAppLink()} external size="lg">
              {dict.common.cta.whatsapp}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
