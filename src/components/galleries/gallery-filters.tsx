// ============================================================================
// GalleryFilters - Filtres glassmorphism pour la galerie fullscreen
// ============================================================================

"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import type { GalleryFilter } from "@/types/artwork";

const filters: { value: GalleryFilter; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "capsule", label: "Capsules" },
  { value: "mobilier", label: "Mobilier" },
  { value: "objet", label: "Objets" },
];

interface GalleryFiltersProps {
  currentFilter?: GalleryFilter;
  className?: string;
}

export function GalleryFilters({
  currentFilter = "tous",
  className,
}: GalleryFiltersProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = usePrefersReducedMotion();

  const handleFilterChange = (filter: GalleryFilter) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter === "tous") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <motion.div
      className={cn(
        "flex items-center gap-2",
        // Sur mobile: scroll horizontal fluide
        "overflow-x-auto scrollbar-hide snap-x snap-mandatory",
        "-mx-4 px-4 sm:mx-0 sm:px-0",
        className
      )}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      {filters.map((filter, index) => (
        <motion.button
          key={filter.value}
          onClick={() => handleFilterChange(filter.value)}
          className={cn(
            // Base - bouton pill tactile
            "shrink-0 snap-start",
            "relative px-4 py-2.5 min-h-[40px]",
            "text-xs md:text-sm font-medium uppercase tracking-wider",
            "rounded-full overflow-hidden transition-all duration-300",
            "backdrop-blur-md border",
            currentFilter === filter.value
              ? "bg-white/20 border-white/40 text-white shadow-sm"
              : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white/80 active:bg-white/15"
          )}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: index * 0.05 + 0.2,
            duration: 0.3,
          }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
        >
          {filter.label}
        </motion.button>
      ))}
    </motion.div>
  );
}
