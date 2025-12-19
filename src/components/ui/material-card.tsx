"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION } from "@/lib/animation-config";
import type { BioMaterial } from "@/data/materials";

// ============================================================================
// MaterialCard - Card for bio-materials innovation projects
// Design: Clean, scientific aesthetic with status indicator
// ============================================================================

interface MaterialCardProps {
  material: BioMaterial;
  lang: "fr" | "en";
  index?: number;
}

const statusLabels = {
  research: { fr: "Recherche", en: "Research" },
  prototype: { fr: "Prototype", en: "Prototype" },
  production: { fr: "Production", en: "Production" },
};

const statusColors = {
  research: "bg-kahu-olive/20 text-kahu-olive",
  prototype: "bg-amber-100 text-amber-700",
  production: "bg-emerald-100 text-emerald-700",
};

export function MaterialCard({ material, lang, index = 0 }: MaterialCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = usePrefersReducedMotion();

  const staggerDelay = index * 0.15;
  const description = material.description[lang];
  const ingredients = material.ingredients[lang];

  return (
    <motion.article
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: DURATION.normal,
        delay: staggerDelay,
        ease: KAHU_EASE,
      }}
    >
      <div className="bg-kahu-cream-warm rounded-sm overflow-hidden border border-kahu-cream-deep transition-all duration-500 group-hover:shadow-xl group-hover:shadow-kahu-bark/5 group-hover:border-kahu-cream-deep/80">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden bg-kahu-cream-deep">
          {/* Placeholder gradient until real images */}
          <div className="absolute inset-0 bg-gradient-to-br from-kahu-bark/20 via-kahu-taupe/10 to-kahu-olive/20" />

          {/* Year Badge */}
          <motion.div
            className="absolute top-4 left-4 flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: staggerDelay + 0.2, duration: 0.4 }}
          >
            <span className="px-3 py-1.5 bg-kahu-charcoal/90 backdrop-blur-sm text-kahu-ivory text-body-xs font-medium rounded-full">
              {material.year}
            </span>
          </motion.div>

          {/* Status Badge */}
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: staggerDelay + 0.25, duration: 0.4 }}
          >
            <span
              className={cn(
                "px-3 py-1.5 text-body-xs font-medium rounded-full backdrop-blur-sm",
                statusColors[material.status]
              )}
            >
              {statusLabels[material.status][lang]}
            </span>
          </motion.div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-kahu-bark/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-body-sm text-kahu-ivory font-medium">
              {lang === "fr" ? "En savoir plus" : "Learn more"}
            </span>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Title */}
          <motion.h3
            className="font-display text-display-sm text-kahu-charcoal"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: staggerDelay + 0.3, duration: 0.4 }}
          >
            {material.name}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-body-sm text-kahu-taupe leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: staggerDelay + 0.35, duration: 0.4 }}
          >
            {description}
          </motion.p>

          {/* Ingredients */}
          <motion.div
            className="pt-3 border-t border-kahu-cream-deep"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: staggerDelay + 0.4, duration: 0.4 }}
          >
            <span className="text-body-xs text-kahu-stone uppercase tracking-wider">
              {lang === "fr" ? "Composition" : "Composition"}
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {ingredients.map((ingredient, i) => (
                <span
                  key={ingredient}
                  className="inline-flex items-center px-2.5 py-1 text-body-xs text-kahu-bark bg-kahu-cream-deep rounded-full"
                >
                  <span className="w-1.5 h-1.5 bg-kahu-terracotta/60 rounded-full mr-2" />
                  {ingredient}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

// ============================================================================
// MaterialGrid - Grid layout for material cards
// ============================================================================

interface MaterialGridProps {
  materials: BioMaterial[];
  lang: "fr" | "en";
  className?: string;
}

export function MaterialGrid({ materials, lang, className }: MaterialGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
        className
      )}
    >
      {materials.map((material, index) => (
        <MaterialCard
          key={material.id}
          material={material}
          lang={lang}
          index={index}
        />
      ))}
    </div>
  );
}

// ============================================================================
// MaterialTimeline - Timeline view for bio-materials
// ============================================================================

interface MaterialTimelineProps {
  materials: BioMaterial[];
  lang: "fr" | "en";
}

export function MaterialTimeline({ materials, lang }: MaterialTimelineProps) {
  const sortedMaterials = [...materials].sort((a, b) => b.year - a.year);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-kahu-cream-deep" />

      <div className="space-y-8">
        {sortedMaterials.map((material, index) => (
          <MaterialTimelineItem
            key={material.id}
            material={material}
            lang={lang}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

function MaterialTimelineItem({
  material,
  lang,
  index,
}: {
  material: BioMaterial;
  lang: "fr" | "en";
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const description = material.description[lang];

  return (
    <motion.div
      ref={ref}
      className="relative pl-12 sm:pl-20"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5, ease: KAHU_EASE }}
    >
      {/* Year marker */}
      <div className="absolute left-0 sm:left-4 top-1 w-8 h-8 rounded-full bg-kahu-cream-deep flex items-center justify-center border-2 border-kahu-cream-warm">
        <div className="w-3 h-3 rounded-full bg-kahu-terracotta" />
      </div>

      {/* Content */}
      <div className="bg-kahu-cream rounded-sm p-5 border border-kahu-cream-deep">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <span className="text-body-xs text-kahu-taupe">{material.year}</span>
            <h4 className="font-display text-body-lg text-kahu-charcoal mt-0.5">
              {material.name}
            </h4>
          </div>
          <span
            className={cn(
              "px-2.5 py-1 text-body-xs font-medium rounded-full shrink-0",
              statusColors[material.status]
            )}
          >
            {statusLabels[material.status][lang]}
          </span>
        </div>
        <p className="text-body-sm text-kahu-taupe leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
