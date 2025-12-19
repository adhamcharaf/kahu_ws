"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "./badge";
import { ProductTiltCard } from "@/components/animations/tilt-card";
import { cn, formatPrice } from "@/lib/utils";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, VIEWPORT } from "@/lib/animation-config";
import type { Product } from "@/lib/types";

// ============================================================================
// Product Card - Carte produit avec animations sophistiquées
// ============================================================================

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  /** Index pour le stagger delay */
  index?: number;
  /** Language for i18n routing */
  lang?: string;
}

export function ProductCard({ product, priority = false, index = 0, lang = 'fr' }: ProductCardProps) {
  const { nom, slug, prix, statut, venteFlash, photos } = product;
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, VIEWPORT.default);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  const imageUrl = photos[0] ? getOptimizedImageUrl(photos[0], "card") : "/placeholder.jpg";
  const badgeStatus = venteFlash ? "flash" : statut;

  // Délai basé sur l'index pour le stagger
  const staggerDelay = index * 0.08;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: DURATION.normal,
        delay: staggerDelay,
        ease: KAHU_EASE,
      }}
    >
      <Link href={`/${lang}/objet/${slug}`} className="group block">
        {/* Image Container avec Tilt 3D */}
        <ProductTiltCard className="relative aspect-[3/4] overflow-hidden rounded-sm bg-kahu-cream-deep">
          {/* Image principale */}
          <motion.div
            className="absolute inset-0"
            whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
            transition={{ duration: DURATION.slow, ease: KAHU_EASE }}
          >
            <Image
              src={imageUrl}
              alt={nom}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
              priority={priority}
            />
          </motion.div>

          {/* Gradient Overlay au hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-kahu-charcoal/70 via-kahu-charcoal/20 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: DURATION.fast }}
          />

          {/* Badge avec animation d'entrée */}
          <motion.div
            className="absolute top-3 left-3"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: staggerDelay + 0.2,
              duration: DURATION.fast,
              ease: KAHU_EASE,
            }}
          >
            <Badge status={badgeStatus} />
          </motion.div>

          {/* Quick View Text (desktop only) - Animation slide up */}
          {isDesktop && (
            <motion.div
              className="absolute bottom-4 left-4 right-4 hidden sm:block"
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: DURATION.fast, ease: KAHU_EASE }}
            >
              <span className="text-body-sm text-kahu-ivory font-medium flex items-center gap-2">
                <span>Voir le produit</span>
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: DURATION.fast }}
                >
                  <path
                    d="M3 8h10m0 0L9 4m4 4L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </span>
            </motion.div>
          )}

          {/* Shine effect on hover (desktop) */}
          {isDesktop && !shouldReduceMotion && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0, x: "-100%" }}
              whileHover={{
                opacity: [0, 0.3, 0],
                x: ["−100%", "200%"],
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                transform: "skewX(-20deg)",
              }}
            />
          )}
        </ProductTiltCard>

        {/* Content avec animation hover */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            delay: staggerDelay + 0.1,
            duration: DURATION.fast,
          }}
        >
          <motion.h3
            className="font-display text-body-lg text-kahu-charcoal transition-colors"
            whileHover={{ color: "rgb(139, 58, 58)" }} // terracotta
          >
            {nom}
          </motion.h3>
          <motion.p
            className="mt-1 text-body-sm text-kahu-taupe"
            initial={{ opacity: 0.8 }}
            whileHover={{ opacity: 1 }}
          >
            {formatPrice(prix)}
          </motion.p>
        </motion.div>
      </Link>
    </motion.article>
  );
}

// ============================================================================
// Product Card Skeleton - Pour le loading state
// ============================================================================

export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-[3/4] rounded-sm bg-kahu-cream-deep" />
      <div className="mt-4 space-y-2">
        <div className="h-5 bg-kahu-cream-deep rounded w-3/4" />
        <div className="h-4 bg-kahu-cream-deep rounded w-1/2" />
      </div>
    </div>
  );
}

// ============================================================================
// Product Grid - Grille avec stagger automatique
// ============================================================================

interface ProductGridProps {
  products: Product[];
  className?: string;
  lang?: string;
}

export function ProductGrid({ products, className, lang = 'fr' }: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6",
        className
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          index={index}
          priority={index < 4}
          lang={lang}
        />
      ))}
    </div>
  );
}
