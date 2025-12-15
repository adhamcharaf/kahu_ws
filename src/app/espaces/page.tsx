import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectGridSkeleton } from "@/components/ui/skeleton";
import { getProjects } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Espaces",
  description:
    "Decouvrez les projets d'amenagement realises par KAHU Studio. Espaces sur-mesure, cuisines, dressings et bien plus a Abidjan.",
};

// Revalidate every 60 seconds
export const revalidate = 60;

async function ProjectsGrid() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-body-md text-kahu-taupe">
          Aucun projet pour le moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          priority={index < 2}
        />
      ))}
    </div>
  );
}

export default function EspacesPage() {
  return (
    <>
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-section bg-kahu-cream-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-display-lg text-kahu-charcoal">
              Espaces
            </h1>
            <p className="mt-4 text-body-lg text-kahu-taupe max-w-2xl">
              Des amenagements sur-mesure qui transforment vos espaces de vie.
              Chaque projet est une collaboration unique avec nos clients.
            </p>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-section bg-kahu-cream-warm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Suspense fallback={<ProjectGridSkeleton count={4} />}>
              <ProjectsGrid />
            </Suspense>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
