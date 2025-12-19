"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION } from "@/lib/animation-config";
import type { WoodEssence } from "@/data/woods";

// ============================================================================
// WoodCard - Organic luxury card for African wood essences
// Design: Museum specimen aesthetic with tactile wood swatch
// ============================================================================

interface WoodCardProps {
  wood: WoodEssence;
  lang: "fr" | "en";
  index?: number;
  priority?: boolean;
}

export function WoodCard({ wood, lang, index = 0, priority = false }: WoodCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = usePrefersReducedMotion();

  const staggerDelay = index * 0.1;
  const characteristics = wood.characteristics[lang];
  const description = wood.description[lang];

  return (
    <motion.article
      ref={ref}
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: DURATION.slow,
        delay: staggerDelay,
        ease: KAHU_EASE,
      }}
    >
      <div className="bg-kahu-cream rounded-sm overflow-hidden border border-kahu-cream-deep/50 transition-shadow duration-500 group-hover:shadow-lg group-hover:shadow-kahu-bark/5">
        {/* Top Section: Color Swatch + Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          {/* Wood Color Swatch with Grain Texture */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: wood.colorHex }}
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            transition={{ duration: 0.6, ease: KAHU_EASE }}
          >
            {/* Grain texture overlay */}
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundSize: "150px 150px",
              }}
            />
            {/* Horizontal grain lines */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 2px,
                  rgba(0,0,0,0.1) 2px,
                  rgba(0,0,0,0.1) 3px,
                  transparent 3px,
                  transparent 8px
                )`,
              }}
            />
          </motion.div>

          {/* Wood Name Overlay */}
          <div className="absolute inset-0 flex items-end p-4 sm:p-5">
            <div className="relative z-10">
              <motion.h3
                className="font-display text-display-sm text-white drop-shadow-lg tracking-wide"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: staggerDelay + 0.2, duration: 0.5 }}
              >
                {wood.name}
              </motion.h3>
              <motion.p
                className="text-body-sm text-white/80 italic font-light mt-0.5"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: staggerDelay + 0.3, duration: 0.5 }}
              >
                {wood.scientificName}
              </motion.p>
            </div>
          </div>

          {/* Durability Badge - Carved notches style */}
          <div className="absolute top-4 right-4 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className={cn(
                  "w-1.5 h-4 rounded-full transition-colors",
                  i < wood.durability
                    ? "bg-white shadow-sm"
                    : "bg-white/30"
                )}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : {}}
                transition={{
                  delay: staggerDelay + 0.4 + i * 0.05,
                  duration: 0.3,
                  ease: "easeOut",
                }}
                style={{ originY: 1 }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section: Details */}
        <div className="p-4 sm:p-5 space-y-4">
          {/* Origin & Density */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-body-xs text-kahu-taupe">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {wood.origin}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
              {wood.density}
            </span>
          </div>

          {/* Description */}
          <p className="text-body-sm text-kahu-bark leading-relaxed">
            {description}
          </p>

          {/* Characteristics Tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {characteristics.map((char, i) => (
              <motion.span
                key={char}
                className="inline-flex items-center px-2.5 py-1 text-body-xs text-kahu-taupe bg-kahu-cream-deep/60 rounded-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  delay: staggerDelay + 0.5 + i * 0.05,
                  duration: 0.3,
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ============================================================================
// WoodGrid - Grid layout for wood cards
// ============================================================================

interface WoodGridProps {
  woods: WoodEssence[];
  lang: "fr" | "en";
  className?: string;
}

export function WoodGrid({ woods, lang, className }: WoodGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
        className
      )}
    >
      {woods.map((wood, index) => (
        <WoodCard
          key={wood.id}
          wood={wood}
          lang={lang}
          index={index}
          priority={index < 3}
        />
      ))}
    </div>
  );
}

// ============================================================================
// WoodCardCompact - Smaller variant for sidebar/lists
// ============================================================================

interface WoodCardCompactProps {
  wood: WoodEssence;
  lang: "fr" | "en";
  isActive?: boolean;
  onClick?: () => void;
}

export function WoodCardCompact({ wood, lang, isActive = false, onClick }: WoodCardCompactProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-sm text-left transition-colors",
        isActive
          ? "bg-kahu-cream-deep"
          : "bg-transparent hover:bg-kahu-cream-deep/50"
      )}
      whileHover={shouldReduceMotion ? {} : { x: 4 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {/* Color Swatch */}
      <div
        className="w-10 h-10 rounded-sm shrink-0 relative overflow-hidden"
        style={{ backgroundColor: wood.colorHex }}
      >
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-display text-body-md text-kahu-charcoal truncate">
          {wood.name}
        </h4>
        <p className="text-body-xs text-kahu-taupe truncate italic">
          {wood.scientificName}
        </p>
      </div>

      {/* Durability dots */}
      <div className="flex gap-0.5 shrink-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "w-1 h-1 rounded-full",
              i < wood.durability ? "bg-kahu-terracotta" : "bg-kahu-stone-light"
            )}
          />
        ))}
      </div>
    </motion.button>
  );
}
