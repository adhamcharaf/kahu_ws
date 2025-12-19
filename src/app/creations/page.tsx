import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  GallerySection,
  GallerySectionSkeleton,
} from "@/components/sections/gallery-section";
import type { GalleryFilter } from "@/types/artwork";

export const metadata: Metadata = {
  title: "Créations",
  description:
    "Découvrez les créations KAHU Studio : mobilier artisanal, capsules uniques et objets de décoration fabriqués à la main à Abidjan.",
};

// Revalidate every 60 seconds
export const revalidate = 60;

interface CreationsPageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function CreationsPage({
  searchParams,
}: CreationsPageProps) {
  const params = await searchParams;
  const filter = (params.filter as GalleryFilter) || "tous";

  return (
    <>
      <Header />

      <main>
        {/* Fullscreen Gallery avec filtres intégrés */}
        <Suspense fallback={<GallerySectionSkeleton />}>
          <GallerySection
            limit={20}
            title="Créations"
            autoPlay={false}
            variant="creations"
            showFilters
            filter={filter}
          />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}
