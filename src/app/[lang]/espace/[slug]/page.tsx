import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getProjects } from "@/lib/notion";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { generateWhatsAppLink } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// Generate static paths for all projects
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { lang: langParam, slug } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: lang === 'fr' ? "Projet non trouve" : "Project not found",
    };
  }

  return {
    title: project.nom,
    description: project.description.slice(0, 160),
    openGraph: {
      title: `${project.nom} | KAHU Studio`,
      description: project.description.slice(0, 160),
      images: project.photos[0] ? [project.photos[0]] : [],
    },
  };
}

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { lang: langParam, slug } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-kahu-cream-warm min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-section bg-kahu-cream-deep">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-body-sm text-kahu-taupe">
              <li>
                <Link
                  href={`/${lang}/espace`}
                  className="hover:text-kahu-terracotta transition-colors"
                >
                  {dict.espace.title}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-kahu-charcoal">{project.nom}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="font-display text-display-lg text-kahu-charcoal">
              {project.nom}
            </h1>
            {project.annee && (
              <p className="mt-2 text-body-sm text-kahu-taupe uppercase tracking-wider">
                {project.annee}
              </p>
            )}
            <p className="mt-6 text-body-lg text-kahu-bark leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-section bg-kahu-cream-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {project.photos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {project.photos.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-sm bg-kahu-cream-deep"
                >
                  <Image
                    src={getOptimizedImageUrl(photo, "gallery")}
                    alt={`${project.nom} - Image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority={index < 2}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-body-md text-kahu-taupe">
                {dict.common.empty.noProjects}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-section bg-kahu-bark">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-display-sm text-kahu-cream">
            {dict.common.project.similarProject}
          </h2>
          <p className="mt-4 text-body-md text-kahu-stone-light">
            {dict.espace.cta.subtitle}
          </p>
          <div className="mt-8">
            <Button href={generateWhatsAppLink()} external size="lg">
              {dict.common.project.discuss}
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
