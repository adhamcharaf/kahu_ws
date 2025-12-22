"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArtisanGalleryFilters, type GalleryFilter } from "./artisan-gallery-filters";
import { ArtisanGalleryGrid, ArtisanGalleryGridSkeleton } from "./artisan-gallery-grid";
import type { ArtisanCardProduct } from "./artisan-gallery-card";

// ============================================================================
// Artisan Gallery - Galerie masonry style "Atelier Editorial"
// ============================================================================

interface ArtisanGalleryProps {
  products: ArtisanCardProduct[];
  title?: string;
  showFilters?: boolean;
  showViewAll?: boolean;
  lang?: string;
  className?: string;
}

export function ArtisanGallery({
  products,
  title,
  showFilters = true,
  showViewAll = true,
  lang = "fr",
  className,
}: ArtisanGalleryProps) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("tous");

  // Filter products based on active filter
  const filteredProducts = useMemo(() => {
    if (activeFilter === "tous") {
      return products;
    }

    // Map filter values to category names (case-insensitive)
    const categoryMap: Record<GalleryFilter, string> = {
      tous: "",
      mobilier: "mobilier",
      objet: "objet",
      capsule: "capsule",
    };

    const targetCategory = categoryMap[activeFilter].toLowerCase();
    return products.filter(
      (p) => p.categorie.toLowerCase() === targetCategory
    );
  }, [products, activeFilter]);

  // Calculate counts for each filter
  const filterCounts = useMemo(() => {
    const counts: Record<GalleryFilter, number> = {
      tous: products.length,
      mobilier: 0,
      objet: 0,
      capsule: 0,
    };

    products.forEach((p) => {
      const cat = p.categorie.toLowerCase() as GalleryFilter;
      if (cat in counts) {
        counts[cat]++;
      }
    });

    return counts;
  }, [products]);

  return (
    <section
      className={cn(
        "relative py-16 md:py-24",
        "bg-[var(--color-kahu-cream-warm)]",
        className
      )}
    >
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        {title && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-display-md text-[var(--color-kahu-charcoal)]">
              {title}
            </h2>

            {/* Decorative element */}
            <div className="flex justify-center items-center gap-3 mt-4">
              <div className="w-12 h-px bg-[var(--color-kahu-stone-light)]" />
              <div
                className="w-1.5 h-1.5 rounded-full bg-[var(--color-kahu-terracotta)]"
                style={{ transform: "rotate(45deg)" }}
              />
              <div className="w-12 h-px bg-[var(--color-kahu-stone-light)]" />
            </div>
          </motion.div>
        )}

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-10"
          >
            <ArtisanGalleryFilters
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              counts={filterCounts}
            />
          </motion.div>
        )}

        {/* Gallery Grid */}
        <ArtisanGalleryGrid products={filteredProducts} lang={lang} />

        {/* View all CTA - optional */}
        {showViewAll && filteredProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <a
              href={`/${lang}/objet`}
              className={cn(
                "inline-flex items-center gap-2",
                "px-6 py-3",
                "text-body-sm font-medium",
                "text-[var(--color-kahu-bark)]",
                "border border-[var(--color-kahu-bark)]/30",
                "rounded-full",
                "hover:bg-[var(--color-kahu-bark)] hover:text-[var(--color-kahu-cream)]",
                "transition-all duration-300",
                "group"
              )}
            >
              <span>Voir toutes les créations</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// Artisan Gallery Skeleton - Pour SSR/Suspense
// ============================================================================

export function ArtisanGallerySkeleton() {
  return (
    <section className="relative py-16 md:py-24 bg-[var(--color-kahu-cream-warm)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title skeleton */}
        <div className="text-center mb-12">
          <div className="h-10 bg-[var(--color-kahu-sand)] rounded-lg w-48 mx-auto animate-pulse" />
          <div className="flex justify-center items-center gap-3 mt-4">
            <div className="w-12 h-px bg-[var(--color-kahu-stone-light)]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-kahu-stone-light)]" />
            <div className="w-12 h-px bg-[var(--color-kahu-stone-light)]" />
          </div>
        </div>

        {/* Filters skeleton */}
        <div className="flex justify-center gap-3 mb-10">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-10 w-24 bg-[var(--color-kahu-sand)] rounded-full animate-pulse"
            />
          ))}
        </div>

        {/* Grid skeleton */}
        <ArtisanGalleryGridSkeleton />
      </div>
    </section>
  );
}
