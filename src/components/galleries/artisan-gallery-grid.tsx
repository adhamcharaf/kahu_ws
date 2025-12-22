"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArtisanGalleryCard, type ArtisanCardProduct } from "./artisan-gallery-card";

// ============================================================================
// Artisan Gallery Grid - Layout masonry avec CSS columns
// ============================================================================

interface ArtisanGalleryGridProps {
  products: ArtisanCardProduct[];
  lang?: string;
}

// Container animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

export function ArtisanGalleryGrid({ products, lang = "fr" }: ArtisanGalleryGridProps) {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="space-y-4">
          {/* Decorative element */}
          <div className="flex justify-center">
            <div className="w-16 h-px bg-[var(--color-kahu-stone-light)]" />
            <div className="w-2 h-2 mx-4 rounded-full bg-[var(--color-kahu-terracotta)]" />
            <div className="w-16 h-px bg-[var(--color-kahu-stone-light)]" />
          </div>

          <p className="font-display text-display-sm text-[var(--color-kahu-taupe)]">
            Aucune création disponible
          </p>
          <p className="text-body-sm text-[var(--color-kahu-stone)]">
            Revenez bientôt pour découvrir nos nouvelles pièces
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={products.map((p) => p.id).join("-")}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={cn(
          // Masonry layout with CSS columns
          "columns-2 md:columns-3 lg:columns-4",
          "gap-3 md:gap-4 lg:gap-6",
          // Prevent cards from breaking across columns
          "[&>*]:break-inside-avoid",
          "[&>*]:mb-3 md:[&>*]:mb-4 lg:[&>*]:mb-6"
        )}
      >
        {products.map((product, index) => (
          <ArtisanGalleryCard
            key={product.id}
            product={product}
            index={index}
            lang={lang}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

// ============================================================================
// Skeleton Loader for SSR
// ============================================================================

export function ArtisanGalleryGridSkeleton() {
  // Generate varied heights for skeleton cards
  const heights = ["h-64", "h-80", "h-72", "h-96", "h-64", "h-80", "h-72", "h-64"];

  return (
    <div
      className={cn(
        "columns-2 md:columns-3 lg:columns-4",
        "gap-3 md:gap-4 lg:gap-6",
        "[&>*]:break-inside-avoid",
        "[&>*]:mb-3 md:[&>*]:mb-4 lg:[&>*]:mb-6"
      )}
    >
      {heights.map((height, index) => (
        <div
          key={index}
          className={cn(
            "rounded-lg overflow-hidden",
            "bg-[var(--color-kahu-sand)]",
            "animate-pulse"
          )}
        >
          {/* Image skeleton */}
          <div className={cn(height, "bg-[var(--color-kahu-cream-deep)]")} />

          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-[var(--color-kahu-cream-deep)] rounded w-3/4" />
            <div className="h-3 bg-[var(--color-kahu-cream-deep)] rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
