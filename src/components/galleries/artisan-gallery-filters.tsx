"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ============================================================================
// Artisan Gallery Filters - Filtres catégorie avec pill animée
// ============================================================================

export type GalleryFilter = "tous" | "mobilier" | "objet" | "capsule";

interface FilterOption {
  value: GalleryFilter;
  label: string;
}

const FILTER_OPTIONS: FilterOption[] = [
  { value: "tous", label: "Tous" },
  { value: "mobilier", label: "Mobilier" },
  { value: "objet", label: "Objet" },
  { value: "capsule", label: "Capsule" },
];

interface ArtisanGalleryFiltersProps {
  activeFilter: GalleryFilter;
  onFilterChange: (filter: GalleryFilter) => void;
  counts?: Record<GalleryFilter, number>;
}

export function ArtisanGalleryFilters({
  activeFilter,
  onFilterChange,
  counts,
}: ArtisanGalleryFiltersProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const buttonRefs = useRef<Map<GalleryFilter, HTMLButtonElement>>(new Map());

  // Update pill position when active filter changes
  useEffect(() => {
    const activeButton = buttonRefs.current.get(activeFilter);
    const container = containerRef.current;

    if (activeButton && container) {
      const containerRect = container.getBoundingClientRect();
      const buttonRect = activeButton.getBoundingClientRect();

      setPillStyle({
        left: buttonRect.left - containerRect.left,
        width: buttonRect.width,
      });
    }
  }, [activeFilter]);

  // Handle horizontal scroll on mobile
  const handleScroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 120;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      {/* Scroll buttons for mobile - hidden on desktop */}
      <button
        onClick={() => handleScroll("left")}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 z-10",
          "w-8 h-8 flex items-center justify-center",
          "bg-gradient-to-r from-[var(--color-kahu-cream-warm)] to-transparent",
          "md:hidden"
        )}
        aria-label="Défiler à gauche"
      >
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
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <button
        onClick={() => handleScroll("right")}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 z-10",
          "w-8 h-8 flex items-center justify-center",
          "bg-gradient-to-l from-[var(--color-kahu-cream-warm)] to-transparent",
          "md:hidden"
        )}
        aria-label="Défiler à droite"
      >
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
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Filters container */}
      <div
        ref={containerRef}
        className={cn(
          "relative flex items-center gap-2",
          "overflow-x-auto scrollbar-hide",
          "px-2 py-1",
          "md:justify-center md:gap-3"
        )}
      >
        {/* Animated pill background */}
        <motion.div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            "h-[calc(100%-8px)] rounded-full",
            "bg-[var(--color-kahu-terracotta)]",
            "shadow-[0_2px_8px_rgba(139,58,58,0.3)]"
          )}
          initial={false}
          animate={{
            left: pillStyle.left,
            width: pillStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
          }}
        />

        {/* Filter buttons */}
        {FILTER_OPTIONS.map((option) => {
          const isActive = activeFilter === option.value;
          const count = counts?.[option.value];

          return (
            <motion.button
              key={option.value}
              ref={(el) => {
                if (el) buttonRefs.current.set(option.value, el);
              }}
              onClick={() => onFilterChange(option.value)}
              className={cn(
                "relative z-10",
                "px-4 py-2 md:px-5 md:py-2.5",
                "text-body-sm font-medium",
                "rounded-full",
                "whitespace-nowrap",
                "transition-colors duration-200",
                isActive
                  ? "text-[var(--color-kahu-cream)]"
                  : "text-[var(--color-kahu-bark)] hover:text-[var(--color-kahu-terracotta)]"
              )}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <span className="relative">
                {option.label}
                {count !== undefined && count > 0 && (
                  <span
                    className={cn(
                      "ml-1.5 text-caption",
                      isActive
                        ? "text-[var(--color-kahu-cream)]/70"
                        : "text-[var(--color-kahu-stone)]"
                    )}
                  >
                    ({count})
                  </span>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Decorative line */}
      <div
        className={cn(
          "mt-4 h-px w-full",
          "bg-gradient-to-r from-transparent via-[var(--color-kahu-stone-light)]/30 to-transparent"
        )}
      />
    </div>
  );
}
