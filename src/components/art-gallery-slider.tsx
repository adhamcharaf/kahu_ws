// ============================================================================
// Art Gallery Slider - Slider de galerie d'art avec animations fluides
// "Chaque oeuvre se devoile comme une piece dans une galerie intime"
// ============================================================================

"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";
import {
  usePrefersReducedMotion,
  useIsDesktop,
  useIsMobile,
} from "@/hooks/use-media-query";
import { useSliderNavigation } from "@/hooks/use-slider-navigation";
import { useSliderDrag } from "@/hooks/use-slider-drag";
import { useSliderWheel } from "@/hooks/use-slider-wheel";
import {
  extractColorsFromImage,
  createBackgroundGradient,
} from "@/lib/color-extractor";
import {
  SLIDER_EASE,
  SLIDER_DURATION,
  SLIDER_SPRING,
  BACKGROUND_CONFIG,
} from "@/lib/slider-constants";
import type { Artwork, ExtractedColors } from "@/types/artwork";

// ============================================================================
// Types
// ============================================================================

interface ArtGallerySliderProps {
  /** Liste des oeuvres a afficher */
  artworks: Artwork[];
  /** Classes CSS additionnelles */
  className?: string;
  /** Active l'auto-play (defaut: false) */
  autoPlay?: boolean;
  /** Intervalle d'auto-play en secondes */
  autoPlayInterval?: number;
}

// ============================================================================
// Component
// ============================================================================

export function ArtGallerySlider({
  artworks,
  className,
  autoPlay = false,
  autoPlayInterval = 5,
}: ArtGallerySliderProps) {
  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<-1 | 0 | 1>(0);
  const [colorPalettes, setColorPalettes] = useState<
    Map<string, ExtractedColors>
  >(new Map());

  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Hooks
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();

  // Artwork et couleurs courantes
  const currentArtwork = artworks[activeIndex];
  const currentColors = useMemo(() => {
    return (
      colorPalettes.get(currentArtwork?.id) || {
        dominant: currentArtwork?.image.dominantColor || "#8B7355",
        palette: currentArtwork?.image.palette || ["#8B7355"],
        isDark: false,
      }
    );
  }, [colorPalettes, currentArtwork]);

  // Callback de navigation
  const handleNavigate = useCallback((_index: number, dir: -1 | 1) => {
    setDirection(dir);
  }, []);

  // Hook de navigation clavier
  const { goToSlide, goToNext, goToPrev } = useSliderNavigation({
    activeIndex,
    setActiveIndex,
    totalSlides: artworks.length,
    loop: true,
    onNavigate: handleNavigate,
    enabled: !shouldReduceMotion,
  });

  // Hook de drag
  const { handleDragStart, handleDrag, handleDragEnd, isDragging } =
    useSliderDrag({
      totalSlides: artworks.length,
      activeIndex,
      onNavigate: (dir) => {
        setDirection(dir);
        if (dir === 1) goToNext();
        else goToPrev();
      },
      containerWidth,
      enabled: !shouldReduceMotion,
    });

  // Hook de molette (desktop uniquement)
  useSliderWheel({
    containerRef,
    onNavigate: (dir) => {
      setDirection(dir);
      if (dir === 1) goToNext();
      else goToPrev();
    },
    enabled: isDesktop && !shouldReduceMotion,
  });

  // Motion values pour le fond
  const backgroundOpacity = useSpring(
    BACKGROUND_CONFIG.opacityMin,
    SLIDER_SPRING.background
  );
  const backgroundScale = useSpring(
    BACKGROUND_CONFIG.scaleMin,
    SLIDER_SPRING.background
  );

  // Mise a jour de la largeur du container
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Extraction des couleurs au montage (client-side)
  useEffect(() => {
    const extractColors = async () => {
      const newPalettes = new Map<string, ExtractedColors>();

      for (const artwork of artworks) {
        try {
          const colors = await extractColorsFromImage(artwork.image.src);
          newPalettes.set(artwork.id, colors);
        } catch {
          // Utiliser la couleur pre-definie ou defaut
          newPalettes.set(artwork.id, {
            dominant: artwork.image.dominantColor || "#8B7355",
            palette: artwork.image.palette || ["#8B7355"],
            isDark: false,
          });
        }
      }

      setColorPalettes(newPalettes);
    };

    if (typeof window !== "undefined") {
      extractColors();
    }
  }, [artworks]);

  // Animation du fond au changement de slide
  useEffect(() => {
    if (shouldReduceMotion) return;

    // Animation de pulse au changement
    backgroundOpacity.set(BACKGROUND_CONFIG.opacityMax);
    backgroundScale.set(BACKGROUND_CONFIG.scaleMax);

    const timeout = setTimeout(() => {
      backgroundOpacity.set(BACKGROUND_CONFIG.opacityMin);
      backgroundScale.set(BACKGROUND_CONFIG.scaleMin);
    }, SLIDER_DURATION.slide * 1000);

    return () => clearTimeout(timeout);
  }, [activeIndex, shouldReduceMotion, backgroundOpacity, backgroundScale]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setDirection(1);
      goToNext();
    }, autoPlayInterval * 1000);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext, shouldReduceMotion]);

  // Variants d'animation pour les slides
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : SLIDER_DURATION.slide,
        ease: SLIDER_EASE,
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
      transition: {
        duration: shouldReduceMotion ? 0 : SLIDER_DURATION.slide,
        ease: SLIDER_EASE,
      },
    }),
  };

  // Style du gradient de fond
  const backgroundGradient = useMemo(() => {
    return createBackgroundGradient(currentColors, BACKGROUND_CONFIG.opacityMin);
  }, [currentColors]);

  // Render vide si pas d'images
  if (artworks.length === 0) {
    return (
      <div
        className={cn(
          "aspect-[3/4] bg-kahu-cream-deep rounded-sm flex items-center justify-center",
          className
        )}
      >
        <span className="text-body-sm text-kahu-taupe">Aucune image</span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative aspect-[3/4] overflow-hidden rounded-sm",
        "select-none touch-pan-y",
        "bg-kahu-cream-deep",
        className
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Galerie d'images de l'atelier"
    >
      {/* ===== Fond dynamique ===== */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: backgroundGradient,
            opacity: backgroundOpacity,
            scale: backgroundScale,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: SLIDER_DURATION.background }}
        />
      )}

      {/* ===== Container des slides ===== */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-10"
          drag={isMobile || isDesktop ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{
            cursor: isDragging ? "grabbing" : "grab",
          }}
        >
          {/* Image */}
          <div className="relative w-full h-full">
            <Image
              src={currentArtwork.image.src}
              alt={currentArtwork.image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={activeIndex === 0}
              draggable={false}
            />

            {/* Overlay gradient subtil */}
            <div className="absolute inset-0 bg-gradient-to-t from-kahu-charcoal/10 via-transparent to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ===== Boutons de navigation ===== */}
      {artworks.length > 1 && (
        <>
          {/* Bouton precedent */}
          <motion.button
            onClick={() => {
              setDirection(-1);
              goToPrev();
            }}
            className={cn(
              "absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-20",
              "w-10 h-10 md:w-12 md:h-12 rounded-full",
              "bg-kahu-ivory/90 backdrop-blur-sm shadow-md",
              "flex items-center justify-center",
              "transition-all duration-300",
              "hover:bg-kahu-ivory hover:scale-110",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kahu-terracotta"
            )}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            aria-label="Image precedente"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-kahu-charcoal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>

          {/* Bouton suivant */}
          <motion.button
            onClick={() => {
              setDirection(1);
              goToNext();
            }}
            className={cn(
              "absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-20",
              "w-10 h-10 md:w-12 md:h-12 rounded-full",
              "bg-kahu-ivory/90 backdrop-blur-sm shadow-md",
              "flex items-center justify-center",
              "transition-all duration-300",
              "hover:bg-kahu-ivory hover:scale-110",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kahu-terracotta"
            )}
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            aria-label="Image suivante"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-kahu-charcoal"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </>
      )}

      {/* ===== Indicateurs de slides ===== */}
      {artworks.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2"
          role="tablist"
          aria-label="Slides"
        >
          {artworks.map((artwork, index) => (
            <motion.button
              key={artwork.id}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                goToSlide(index, index > activeIndex ? 1 : -1);
              }}
              className={cn(
                "h-2 rounded-full transition-colors duration-300",
                index === activeIndex
                  ? "bg-kahu-charcoal"
                  : "bg-kahu-charcoal/40 hover:bg-kahu-charcoal/60"
              )}
              initial={{ width: index === activeIndex ? 20 : 8 }}
              animate={{ width: index === activeIndex ? 20 : 8 }}
              transition={{
                duration: SLIDER_DURATION.indicator,
                ease: SLIDER_EASE,
              }}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Voir ${artwork.title}`}
            />
          ))}
        </div>
      )}

      {/* ===== Badge compteur ===== */}
      <motion.div
        className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-kahu-charcoal/70 backdrop-blur-sm rounded-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
      >
        <span className="text-xs text-kahu-ivory font-medium tracking-wide">
          {activeIndex + 1} / {artworks.length}
        </span>
      </motion.div>
    </div>
  );
}

// ============================================================================
// Exports
// ============================================================================

export type { ArtGallerySliderProps };
