import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ProjectCard } from "@/components/ui/project-card";
import { ProjectGridSkeleton } from "@/components/ui/skeleton";
import { getProjects } from "@/lib/notion";
import {
  EspacesHero,
  AnimatedProjectsSection,
  AnimatedProjectGrid,
  AnimatedProjectItem,
  EmptyProjectsState,
} from "./espaces-hero";

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
    return <EmptyProjectsState />;
  }

  return (
    <AnimatedProjectGrid>
      {projects.map((project, index) => (
        <AnimatedProjectItem key={project.id}>
          <ProjectCard project={project} priority={index < 2} />
        </AnimatedProjectItem>
      ))}
    </AnimatedProjectGrid>
  );
}

export default function EspacesPage() {
  return (
    <>
      <Header />

      <main className="pt-20">
        {/* Hero Section avec animations cinematiques */}
        <EspacesHero />

        {/* Projects Grid avec transitions fluides */}
        <AnimatedProjectsSection>
          <Suspense fallback={<ProjectGridSkeleton count={4} />}>
            <ProjectsGrid />
          </Suspense>
        </AnimatedProjectsSection>
      </main>

      <Footer />
    </>
  );
}
