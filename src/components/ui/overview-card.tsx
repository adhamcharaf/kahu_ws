"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { KAHU_EASE, DURATION } from "@/lib/animation-config";

// ============================================================================
// OverviewCard - Premium navigation card for KAHU Studio overview pages
// Inspired by the organic reveal of wood grain and artisanal craftsmanship
// ============================================================================

interface OverviewCardProps {
  href: string;
  image: string;
  title: string;
  description?: string;
  orientation?: "portrait" | "landscape";
  index?: number;
  priority?: boolean;
}

export function OverviewCard({
  href,
  image,
  title,
  description,
  orientation = "landscape",
  index = 0,
  priority = false,
}: OverviewCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const aspectRatio = orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]";
  const staggerDelay = index * 0.15;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : DURATION.slow,
        delay: shouldReduceMotion ? 0 : staggerDelay,
        ease: KAHU_EASE,
      }}
    >
      <Link
        href={href}
        className="group block relative outline-none focus-visible:ring-2 focus-visible:ring-kahu-terracotta focus-visible:ring-offset-4 focus-visible:ring-offset-kahu-cream rounded-sm"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className={`relative ${aspectRatio} overflow-hidden bg-kahu-cream-deep`}>
          {/* Main Image */}
          <motion.div
            className="absolute inset-0"
            animate={{
              scale: isHovered && !shouldReduceMotion ? 1.05 : 1,
            }}
            transition={{
              duration: DURATION.slow,
              ease: KAHU_EASE,
            }}
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          </motion.div>

          {/* Organic Terracotta Overlay - Reveals from bottom like rising warmth */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-kahu-terracotta via-kahu-terracotta/95 to-kahu-terracotta/85"
            initial={{ y: "100%" }}
            animate={{
              y: isHovered && !shouldReduceMotion ? "0%" : "100%",
            }}
            transition={{
              duration: DURATION.cinematic,
              ease: KAHU_EASE,
            }}
          />

          {/* Grain texture overlay for organic feel */}
          <div
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Hover Content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered && !shouldReduceMotion ? 1 : 0,
            }}
            transition={{
              duration: DURATION.normal,
              delay: isHovered ? 0.2 : 0,
              ease: KAHU_EASE,
            }}
          >
            {/* Decorative line above */}
            <motion.span
              className="block w-8 h-px bg-kahu-ivory/60 mb-4"
              initial={{ scaleX: 0 }}
              animate={{
                scaleX: isHovered && !shouldReduceMotion ? 1 : 0,
              }}
              transition={{
                duration: DURATION.normal,
                delay: isHovered ? 0.3 : 0,
                ease: KAHU_EASE,
              }}
            />

            {/* Hover Title */}
            <motion.span
              className="font-display text-body-lg text-kahu-ivory uppercase tracking-[0.2em]"
              initial={{ y: 10, opacity: 0 }}
              animate={{
                y: isHovered && !shouldReduceMotion ? 0 : 10,
                opacity: isHovered && !shouldReduceMotion ? 1 : 0,
              }}
              transition={{
                duration: DURATION.normal,
                delay: isHovered ? 0.35 : 0,
                ease: KAHU_EASE,
              }}
            >
              Decouvrir
            </motion.span>

            {/* Arrow icon */}
            <motion.svg
              className="w-5 h-5 mt-3 text-kahu-ivory/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              initial={{ y: 10, opacity: 0 }}
              animate={{
                y: isHovered && !shouldReduceMotion ? 0 : 10,
                opacity: isHovered && !shouldReduceMotion ? 1 : 0,
              }}
              transition={{
                duration: DURATION.normal,
                delay: isHovered ? 0.4 : 0,
                ease: KAHU_EASE,
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </motion.svg>
          </motion.div>

          {/* Bottom gradient for text readability (default state) */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-kahu-charcoal/60 via-kahu-charcoal/20 to-transparent"
            animate={{
              opacity: isHovered && !shouldReduceMotion ? 0 : 1,
            }}
            transition={{
              duration: DURATION.normal,
              ease: KAHU_EASE,
            }}
          />
        </div>

        {/* Content Below Image */}
        <div className="pt-5 pb-2">
          {/* Title */}
          <h3 className="font-display text-display-sm text-kahu-charcoal uppercase tracking-[0.15em] group-hover:text-kahu-terracotta transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          {description && (
            <p className="mt-2 text-body-sm text-kahu-taupe line-clamp-2 leading-relaxed">
              {description}
            </p>
          )}

          {/* Animated underline */}
          <motion.div
            className="mt-4 h-px bg-kahu-terracotta origin-left"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: isHovered && !shouldReduceMotion ? 1 : 0,
            }}
            transition={{
              duration: DURATION.normal,
              ease: KAHU_EASE,
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
}

// ============================================================================
// OverviewGrid - Layout wrapper for overview cards
// ============================================================================

interface OverviewGridProps {
  children: React.ReactNode;
  columns?: 2 | 3;
}

export function OverviewGrid({ children, columns = 3 }: OverviewGridProps) {
  const gridCols = columns === 2
    ? "grid-cols-1 md:grid-cols-2"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-6 md:gap-8 lg:gap-10`}>
      {children}
    </div>
  );
}

// ============================================================================
// OverviewSection - Full section wrapper with title
// ============================================================================

interface OverviewSectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function OverviewSection({
  title,
  subtitle,
  children,
  className = ""
}: OverviewSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className={`py-section ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: shouldReduceMotion ? 0 : DURATION.slow,
              ease: KAHU_EASE,
            }}
          >
            {title && (
              <h2 className="font-display text-display-lg text-kahu-charcoal uppercase tracking-[0.15em]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-body-md text-kahu-taupe max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}

        {children}
      </div>
    </section>
  );
}
