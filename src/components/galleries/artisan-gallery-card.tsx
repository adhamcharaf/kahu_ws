"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-media-query";

// ============================================================================
// Artisan Gallery Card - Card style portfolio avec animations
// "Comme soulever une photo posée sur une table d'atelier"
// ============================================================================

export interface ArtisanCardProduct {
  id: string;
  slug: string;
  nom: string;
  prix: number;
  description?: string;
  categorie: string;
  photos: string[];
}

interface ArtisanGalleryCardProps {
  product: ArtisanCardProduct;
  index: number;
  lang?: string;
}

// Animation variants
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: index * 0.05,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

// Format price in FCFA
function formatPrice(price: number): string {
  return price.toLocaleString("fr-FR") + " FCFA";
}

// Truncate description
function truncateDescription(desc: string, maxLength: number = 100): string {
  if (desc.length <= maxLength) return desc;
  return desc.slice(0, maxLength).trim() + "...";
}

export function ArtisanGalleryCard({
  product,
  index,
  lang = "fr",
}: ArtisanGalleryCardProps) {
  const isMobile = useIsMobile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for tilt
  const springConfig = { stiffness: 300, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Toggle description on mobile
  const handleTap = () => {
    if (isMobile) {
      setIsExpanded(!isExpanded);
    }
  };

  const imageSrc = product.photos[0] || "/images/accueil/outils.png";
  const productUrl = `/${lang}/creations/${product.slug}`;

  return (
    <motion.div
      ref={cardRef}
      className="group relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={index}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleTap}
      style={{
        perspective: 1000,
      }}
    >
      <motion.article
        className={cn(
          "relative overflow-hidden rounded-lg",
          "bg-[var(--color-kahu-sand)]",
          "shadow-[0_4px_20px_-4px_rgba(45,36,32,0.12)]",
          "transition-shadow duration-300",
          "group-hover:shadow-[0_12px_40px_-8px_rgba(45,36,32,0.2)]"
        )}
        style={{
          rotateX: isMobile ? 0 : rotateX,
          rotateY: isMobile ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={isMobile ? {} : { y: -8, scale: 1.02 }}
        whileTap={isMobile ? { scale: 0.98 } : {}}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Category Badge - Stamp style */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={cn(
              "inline-block px-3 py-1",
              "text-[10px] uppercase tracking-[0.15em] font-medium",
              "text-[var(--color-kahu-cream)]",
              "bg-[var(--color-kahu-terracotta)]",
              "rounded-sm",
              "shadow-[2px_2px_0_rgba(45,36,32,0.15)]",
              // Stamp effect - slightly irregular border
              "before:absolute before:inset-0 before:rounded-sm",
              "before:border before:border-[var(--color-kahu-terracotta-dark)]",
              "before:opacity-50"
            )}
            style={{
              transform: "rotate(-2deg)",
            }}
          >
            {product.categorie}
          </span>
        </div>

        {/* Image Container */}
        <Link href={productUrl} className="block relative overflow-hidden">
          <motion.div
            className="relative w-full"
            style={{ paddingBottom: "133.33%" }} // 3:4 aspect ratio
          >
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-[var(--color-kahu-cream-deep)] animate-pulse" />
            )}

            <motion.div
              className="absolute inset-0"
              whileHover={isMobile ? {} : { scale: 1.08 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={imageSrc}
                alt={product.nom}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className={cn(
                  "object-cover transition-opacity duration-500",
                  imageLoaded ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>

            {/* Hover gradient overlay - desktop only */}
            <motion.div
              className={cn(
                "absolute inset-0 pointer-events-none",
                "bg-gradient-to-t from-[var(--color-kahu-bark)]/40 via-transparent to-transparent",
                "opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                isMobile && "hidden"
              )}
            />
          </motion.div>
        </Link>

        {/* Product Info */}
        <div className="p-4">
          {/* Product Name */}
          <Link href={productUrl}>
            <h3
              className={cn(
                "font-display text-lg leading-tight",
                "text-[var(--color-kahu-charcoal)]",
                "group-hover:text-[var(--color-kahu-terracotta)]",
                "transition-colors duration-300"
              )}
            >
              {product.nom}
            </h3>
          </Link>

          {/* Price */}
          <p
            className={cn(
              "font-mono text-sm mt-1",
              "text-[var(--color-kahu-taupe)]"
            )}
          >
            {formatPrice(product.prix)}
          </p>

          {/* Description - Desktop: hover reveal, Mobile: tap to expand */}
          {product.description && (
            <motion.div
              className={cn(
                "overflow-hidden",
                isMobile ? "" : "max-h-0 group-hover:max-h-24"
              )}
              initial={false}
              animate={isMobile ? { height: isExpanded ? "auto" : 0 } : {}}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={cn(
                "pt-3 mt-3",
                "border-t border-[var(--color-kahu-stone-light)]/30"
              )}>
                <p className="text-body-sm text-[var(--color-kahu-taupe)] leading-relaxed">
                  {truncateDescription(product.description)}
                </p>
              </div>
            </motion.div>
          )}

          {/* Mobile expand indicator */}
          {isMobile && product.description && (
            <motion.button
              className={cn(
                "flex items-center gap-1 mt-2",
                "text-caption text-[var(--color-kahu-terracotta)]",
                "focus:outline-none"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setIsExpanded(!isExpanded);
              }}
            >
              <span>{isExpanded ? "Voir moins" : "Voir plus"}</span>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </motion.svg>
            </motion.button>
          )}
        </div>
      </motion.article>
    </motion.div>
  );
}
