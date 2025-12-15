"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION } from "@/lib/animation-config";
import type { ProductFilter } from "@/lib/types";

// ============================================================================
// Product Filters - Filtres avec animations subtiles
// ============================================================================

const filters: { value: ProductFilter; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "capsule", label: "Capsules" },
  { value: "mobilier", label: "Mobilier" },
  { value: "objet", label: "Objets" },
];

export function ProductFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const shouldReduceMotion = usePrefersReducedMotion();

  const currentFilter = (searchParams.get("filter") as ProductFilter) || "tous";

  const handleFilterChange = (filter: ProductFilter) => {
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
      className="flex flex-wrap gap-2 sm:gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.normal, ease: KAHU_EASE }}
    >
      {filters.map((filter, index) => (
        <motion.button
          key={filter.value}
          onClick={() => handleFilterChange(filter.value)}
          className={cn(
            "relative px-4 py-2 text-body-sm font-medium uppercase tracking-wider transition-colors duration-300",
            "border rounded-sm overflow-hidden",
            currentFilter === filter.value
              ? "text-kahu-ivory border-kahu-charcoal"
              : "bg-transparent text-kahu-bark border-kahu-bark hover:text-kahu-ivory"
          )}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.05,
            duration: DURATION.fast,
            ease: KAHU_EASE,
          }}
          whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
        >
          {/* Background fill animation */}
          <motion.span
            className="absolute inset-0 bg-kahu-charcoal"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: currentFilter === filter.value ? 1 : 0 }}
            transition={{ duration: DURATION.fast, ease: KAHU_EASE }}
            style={{ originX: 0 }}
          />

          {/* Hover background */}
          <motion.span
            className="absolute inset-0 bg-kahu-bark"
            initial={{ scaleX: 0 }}
            whileHover={currentFilter !== filter.value ? { scaleX: 1 } : {}}
            transition={{ duration: DURATION.fast, ease: KAHU_EASE }}
            style={{ originX: 0 }}
          />

          {/* Text */}
          <span className="relative z-10">{filter.label}</span>
        </motion.button>
      ))}
    </motion.div>
  );
}

// ============================================================================
// Filter Results Counter - Compteur animé des résultats
// ============================================================================

interface FilterResultsProps {
  count: number;
  filter: ProductFilter;
}

export function FilterResults({ count, filter }: FilterResultsProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={`${filter}-${count}`}
        className="text-body-sm text-kahu-taupe"
        initial={shouldReduceMotion ? {} : { opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={shouldReduceMotion ? {} : { opacity: 0, y: 5 }}
        transition={{ duration: DURATION.fast, ease: KAHU_EASE }}
      >
        {count} {count === 1 ? "creation" : "creations"}
        {filter !== "tous" && (
          <span className="text-kahu-bark"> dans {filter}</span>
        )}
      </motion.p>
    </AnimatePresence>
  );
}
