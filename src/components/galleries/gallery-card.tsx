// ============================================================================
// GalleryCard - Card d'artwork avec hover effects et info panel
// Design: Editorial Luxury - Elegant, raffine, tactile
// ============================================================================

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import type { GalleryArtwork } from "@/types/artwork";
import { useIsDesktop, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { FULLSCREEN_GALLERY_CONFIG, SLIDER_EASE } from "@/lib/slider-constants";
import { cn } from "@/lib/utils";
import { formatGalleryYear } from "@/lib/gallery-utils";

interface GalleryCardProps {
  /** Artwork a afficher */
  artwork: GalleryArtwork;
  /** Si la card est active (au centre) */
  isActive: boolean;
  /** Index de la card */
  index: number;
  /** Offset de parallaxe pendant le drag */
  parallaxOffset?: number;
  /** Callback au clic */
  onClick?: () => void;
}

export function GalleryCard({
  artwork,
  isActive,
  index,
  parallaxOffset = 0,
  onClick,
}: GalleryCardProps) {
  const isDesktop = useIsDesktop();
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const { card, glass, transitions } = FULLSCREEN_GALLERY_CONFIG;

  // Calculer la hauteur selon le device
  const heightVh = isDesktop
    ? card.heightVhDesktop
    : isDesktop === false
    ? card.heightVhMobile
    : card.heightVhTablet;

  // Calculer la largeur basee sur le ratio
  const widthCalc = `calc(${heightVh}vh * ${card.aspectRatio})`;

  // Handlers de hover
  const handleMouseEnter = useCallback(() => {
    if (isDesktop) setIsHovered(true);
  }, [isDesktop]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Variants pour les animations
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: index * 0.1,
        ease: SLIDER_EASE,
      },
    },
  };

  const hoverVariants = {
    rest: {
      y: 0,
      scale: 1,
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.3)",
    },
    hover: {
      y: card.hoverLift,
      scale: card.hoverScale,
      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
      transition: {
        duration: transitions.cardHover,
        ease: SLIDER_EASE,
      },
    },
  };

  const infoPanelVariants = {
    rest: {
      y: "100%",
      opacity: 0,
    },
    hover: {
      y: 0,
      opacity: 1,
      transition: {
        duration: transitions.infoPanelSlide,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  // Sur mobile, l'info panel est toujours visible sur la card active
  const showInfoPanel = isDesktop ? isHovered : isActive;

  // Card content component
  const cardContent = (
    <>
      {/* Image principale */}
      <div className="absolute inset-0">
        <Image
          src={artwork.image.src}
          alt={artwork.image.alt}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isHovered && isDesktop && "scale-105"
          )}
          sizes={`(max-width: 768px) 80vw, (max-width: 1024px) 60vw, 50vw`}
          priority={index < 3}
        />
      </div>

      {/* Overlay gradient pour lisibilite du texte */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
          showInfoPanel ? "opacity-100" : "opacity-0 md:opacity-0"
        )}
      />

      {/* Border subtile glassmorphism */}
      <div
        className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
        style={{
          border: `1px solid ${isHovered ? glass.borderHover : glass.border}`,
          transition: `border-color ${transitions.cardHover}s ease`,
        }}
      />

      {/* Info Panel - Glassmorphism */}
      <motion.div
        className={cn(
          "absolute bottom-0 left-0 right-0 p-4 md:p-6",
          "backdrop-blur-md",
          // Sur mobile, toujours visible sur card active avec transition
          !isDesktop && isActive && "!opacity-100 !translate-y-0"
        )}
        style={{
          background: glass.background,
          borderTop: `1px solid ${glass.border}`,
        }}
        variants={isDesktop ? infoPanelVariants : undefined}
        initial={isDesktop ? "rest" : false}
        animate={isDesktop ? (isHovered ? "hover" : "rest") : (isActive ? "hover" : "rest")}
      >
        {/* Annee - Petite, discrete */}
        {artwork.year && (
          <span
            className={cn(
              "block text-xs md:text-sm font-light tracking-widest uppercase mb-1",
              "text-white/60"
            )}
            style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
          >
            {formatGalleryYear(artwork.year)}
          </span>
        )}

        {/* Titre - Elegant, editorial */}
        <h3
          className={cn(
            "text-xl md:text-2xl lg:text-3xl font-semibold leading-tight",
            "text-white tracking-tight"
          )}
          style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
        >
          {artwork.title}
        </h3>

        {/* Artiste/Createur */}
        {artwork.artist && (
          <span
            className={cn(
              "block text-sm md:text-base font-light mt-1",
              "text-white/70"
            )}
            style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
          >
            {artwork.artist}
          </span>
        )}

        {/* Categorie - Badge subtil */}
        {artwork.category && (
          <span
            className={cn(
              "inline-block mt-3 px-3 py-1 text-xs uppercase tracking-wider",
              "bg-white/10 text-white/80 rounded-full",
              "backdrop-blur-sm border border-white/10"
            )}
          >
            {artwork.category}
          </span>
        )}
      </motion.div>

      {/* Index indicator - Coin superieur (desktop) */}
      {isDesktop && (
        <div
          className={cn(
            "absolute top-4 right-4 w-8 h-8",
            "flex items-center justify-center",
            "text-xs font-medium text-white/40",
            "bg-white/5 backdrop-blur-sm rounded-full",
            "border border-white/10",
            "opacity-0 group-hover:opacity-100 transition-opacity"
          )}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
      )}
    </>
  );

  return (
    <motion.div
      className="flex-shrink-0 relative"
      style={{
        width: widthCalc,
        height: `${heightVh}vh`,
        x: parallaxOffset,
      }}
      variants={!prefersReducedMotion ? cardVariants : undefined}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className={cn(
          "relative w-full h-full overflow-hidden cursor-pointer select-none",
          "rounded-2xl md:rounded-3xl"
        )}
        style={{
          borderRadius: card.borderRadius,
        }}
        variants={!prefersReducedMotion && isDesktop ? hoverVariants : undefined}
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {artwork.href ? (
          <Link href={artwork.href} className="block w-full h-full relative">
            {cardContent}
          </Link>
        ) : (
          <div
            className="block w-full h-full relative"
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onClick?.();
              }
            }}
          >
            {cardContent}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
