import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getProjects } from "@/lib/notion";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { generateWhatsAppLink } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
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
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projet non trouve",
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
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-section bg-kahu-cream-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-8" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-body-sm text-kahu-taupe">
                <li>
                  <Link
                    href="/espaces"
                    className="hover:text-kahu-terracotta transition-colors"
                  >
                    Espaces
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
                  Aucune image pour ce projet.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-section bg-kahu-bark">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-display-sm text-kahu-cream">
              Un projet similaire ?
            </h2>
            <p className="mt-4 text-body-md text-kahu-stone-light">
              Discutons de votre espace et de vos envies. Chaque projet est
              unique.
            </p>
            <div className="mt-8">
              <Button href={generateWhatsAppLink()} external size="lg">
                Discuter de mon projet
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
