// ============================================================================
// FullscreenGallerySlider - Slider galerie fullscreen
// Design: Editorial Luxury - Immersif, elegant, interactif
// ============================================================================

"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, animate, PanInfo } from "framer-motion";
import type { GalleryArtwork, FullscreenGalleryProps } from "@/types/artwork";
import { useSliderNavigation } from "@/hooks/use-slider-navigation";
import { useSliderWheel } from "@/hooks/use-slider-wheel";
import { useColorPalette } from "@/hooks/use-color-palette";
import {
  useIsDesktop,
  useIsMobile,
  usePrefersReducedMotion,
} from "@/hooks/use-media-query";
import {
  FULLSCREEN_GALLERY_CONFIG,
  FULLSCREEN_DRAG_PHYSICS,
  SLIDER_SPRING,
} from "@/lib/slider-constants";
import { cn } from "@/lib/utils";

import { GalleryAmbientBackground } from "./gallery-ambient-background";
import { GalleryCard } from "./gallery-card";
import {
  GalleryNavigationDots,
  GalleryNavigationArrows,
} from "./gallery-navigation-dots";
import {
  GalleryKeyboardHint,
  GallerySlideCounter,
  GalleryTitle,
} from "./gallery-keyboard-hint";
import { GalleryFilters } from "./gallery-filters";

// ============================================================================
// Composant Principal
// ============================================================================

export function FullscreenGallerySlider({
  artworks,
  variant = "homepage",
  autoPlay = false,
  autoPlayInterval = 5,
  showKeyboardHint = true,
  title = "Gallery",
  showFilters = false,
  currentFilter = "tous",
}: FullscreenGalleryProps) {
  // Refs
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hooks responsive
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Hook de navigation clavier
  const { goToSlide, goToNext, goToPrev } = useSliderNavigation({
    activeIndex,
    setActiveIndex,
    totalSlides: artworks.length,
    loop: true,
    enabled: true,
  });

  // Hook de navigation molette/trackpad
  useSliderWheel({
    containerRef,
    onNavigate: (direction) => {
      if (direction > 0) goToNext();
      else goToPrev();
    },
    enabled: true,
    fullscreenMode: true,
  });

  // Hook de palette de couleurs
  const { gradientStyles, dominantColor } = useColorPalette({
    artworks,
    activeIndex,
    disabled: prefersReducedMotion,
  });

  // Configuration - adapter selon le device
  const { card } = FULLSCREEN_GALLERY_CONFIG;
  const currentGap = isMobile ? card.gapMobile : card.gap;
  const snapThreshold = isMobile
    ? FULLSCREEN_DRAG_PHYSICS.snapThresholdMobile
    : FULLSCREEN_DRAG_PHYSICS.snapThreshold;
  const velocityThreshold = isMobile
    ? FULLSCREEN_DRAG_PHYSICS.velocityThresholdMobile
    : FULLSCREEN_DRAG_PHYSICS.velocityThreshold;
  const { parallaxFactor } = FULLSCREEN_DRAG_PHYSICS;

  // Motion value pour le drag direct
  const dragX = useMotionValue(0);

  // Monter cote client uniquement
  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculer la largeur d'une card (SSR-safe)
  const getCardWidth = useCallback(() => {
    if (typeof window === "undefined") return 300;
    const heightVh = isDesktop
      ? card.heightVhDesktop
      : isMobile
      ? card.heightVhMobile
      : card.heightVhTablet;
    const height = (window.innerHeight * heightVh) / 100;
    return height * card.aspectRatio + currentGap;
  }, [isDesktop, isMobile, card, currentGap]);

  // Calculer l'offset pour centrer la card active (SSR-safe)
  const getTrackOffset = useCallback(
    (index: number) => {
      if (typeof window === "undefined") return 0;
      const cardWidth = getCardWidth();
      const containerWidth =
        containerRef.current?.offsetWidth || window.innerWidth;
      const centerOffset = (containerWidth - cardWidth + currentGap) / 2;
      return centerOffset - index * cardWidth;
    },
    [getCardWidth, currentGap]
  );

  // Track offset de base (position cible sans drag)
  const baseOffset = useMotionValue(0);

  // Combiner baseOffset + dragX pour la position finale
  const trackX = useTransform(
    [baseOffset, dragX],
    ([base, drag]: number[]) => base + drag
  );

  // Spring pour animer le baseOffset lors du changement de slide
  const springTrackX = useSpring(trackX, {
    stiffness: SLIDER_SPRING.slide.stiffness,
    damping: SLIDER_SPRING.slide.damping,
    mass: SLIDER_SPRING.slide.mass,
  });

  // Mettre a jour baseOffset quand activeIndex change
  useEffect(() => {
    if (mounted) {
      const newOffset = getTrackOffset(activeIndex);
      // Animer vers la nouvelle position
      animate(baseOffset, newOffset, {
        type: "spring",
        stiffness: SLIDER_SPRING.slide.stiffness,
        damping: SLIDER_SPRING.slide.damping,
        mass: SLIDER_SPRING.slide.mass,
      });
    }
  }, [mounted, activeIndex, getTrackOffset, baseOffset]);

  // Handlers de drag - version simplifiee et reactive
  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDrag = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      // Mettre a jour dragX en temps reel pour suivre le doigt
      dragX.set(info.offset.x);
    },
    [dragX]
  );

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false);

      const velocity = info.velocity.x;
      const offset = info.offset.x;

      // Reset dragX avec animation
      animate(dragX, 0, {
        type: "spring",
        stiffness: 400,
        damping: 30,
      });

      // Determiner si on change de slide
      const shouldNavigate =
        Math.abs(offset) > snapThreshold ||
        Math.abs(velocity) > velocityThreshold * 1000;

      if (shouldNavigate) {
        if (offset > 0 || velocity > 300) {
          goToPrev();
        } else if (offset < 0 || velocity < -300) {
          goToNext();
        }
      }
    },
    [snapThreshold, velocityThreshold, goToNext, goToPrev, dragX]
  );

  // Auto-play
  useEffect(() => {
    if (!autoPlay || isDragging) return;

    const timer = setInterval(() => {
      goToNext();
    }, autoPlayInterval * 1000);

    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, isDragging, goToNext]);

  // Parallax offset pendant le drag
  const getParallaxOffset = useCallback(
    (index: number) => {
      if (!isDesktop || prefersReducedMotion || !isDragging) return 0;
      const distance = index - activeIndex;
      return dragX.get() * parallaxFactor * (1 - Math.abs(distance) * 0.3);
    },
    [isDesktop, prefersReducedMotion, isDragging, activeIndex, dragX, parallaxFactor]
  );

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative w-full h-screen overflow-hidden",
        "select-none touch-pan-y"
      )}
      style={{
        backgroundColor: FULLSCREEN_GALLERY_CONFIG.backgroundColor,
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={title}
    >
      {/* Background ambient dynamique */}
      <GalleryAmbientBackground
        gradientStyles={gradientStyles}
        activeId={artworks[activeIndex]?.id || "default"}
        disabled={prefersReducedMotion}
      />

      {/* Header - Titre, compteur et filtres */}
      <header className="absolute top-0 left-0 right-0 z-20 pt-20 sm:pt-24 md:pt-8 px-5 md:px-8 lg:px-12 pb-6 md:pb-8">
        <div className="flex items-center justify-between">
          <GalleryTitle title={title} className="text-xl md:text-2xl tracking-tight" />
          <GallerySlideCounter current={activeIndex} total={artworks.length} className="tabular-nums" />
        </div>
        {/* Filtres de categorie avec scroll horizontal */}
        {showFilters && (
          <div className="mt-4 mb-4 md:mb-6 -mx-5 px-5 overflow-x-auto scrollbar-hide">
            <GalleryFilters
              currentFilter={currentFilter}
              className="flex gap-2 pb-1"
            />
          </div>
        )}
      </header>

      {/* Track des cards */}
      <motion.div
        ref={trackRef}
        className={cn(
          "absolute inset-0 flex items-center",
          "cursor-grab active:cursor-grabbing",
          "touch-none"
        )}
        style={{
          x: springTrackX,
          paddingLeft: currentGap / 2,
          paddingRight: currentGap / 2,
        }}
        drag="x"
        dragDirectionLock
        dragMomentum={false}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        <div
          className="flex items-center"
          style={{
            gap: currentGap,
          }}
        >
          {artworks.map((artwork, index) => (
            <GalleryCard
              key={artwork.id}
              artwork={artwork}
              isActive={index === activeIndex}
              index={index}
              parallaxOffset={getParallaxOffset(index)}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </motion.div>

      {/* Navigation controls */}
      <footer className="absolute bottom-0 left-0 right-0 z-20 px-4 md:px-8 lg:px-12 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Fleches de navigation (desktop) */}
          {isDesktop && (
            <GalleryNavigationArrows
              onPrev={goToPrev}
              onNext={goToNext}
              className="hidden md:flex"
            />
          )}

          {/* Hint "glisser" pour mobile - anime subtilement */}
          {isMobile && (
            <motion.div
              className="flex items-center gap-2.5 text-white/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                />
              </motion.svg>
              <span className="text-sm font-light tracking-wide">glisser</span>
            </motion.div>
          )}

          {/* Dots de navigation - centre */}
          <GalleryNavigationDots
            total={artworks.length}
            activeIndex={activeIndex}
            activeColor={dominantColor}
            onNavigate={goToSlide}
            className="mx-auto"
          />

          {/* Keyboard hint (desktop) */}
          {isDesktop && showKeyboardHint && (
            <GalleryKeyboardHint visible={!isDragging} />
          )}

          {/* Spacer pour mobile */}
          {isMobile && <div className="w-16" />}
        </div>
      </footer>

      {/* Indicateurs lateraux de navigation (desktop) */}
      {isDesktop && (
        <>
          {/* Zone cliquable gauche */}
          <button
            className={cn(
              "absolute left-0 top-1/2 -translate-y-1/2 z-10",
              "w-16 h-32 md:w-24 md:h-48",
              "flex items-center justify-start pl-4",
              "text-white/0 hover:text-white/50",
              "transition-colors duration-300",
              "cursor-pointer",
              activeIndex === 0 && "pointer-events-none"
            )}
            onClick={goToPrev}
            aria-label="Slide precedent"
          >
            <svg
              className="w-6 h-6 rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>

          {/* Zone cliquable droite */}
          <button
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2 z-10",
              "w-16 h-32 md:w-24 md:h-48",
              "flex items-center justify-end pr-4",
              "text-white/0 hover:text-white/50",
              "transition-colors duration-300",
              "cursor-pointer",
              activeIndex === artworks.length - 1 && "pointer-events-none"
            )}
            onClick={goToNext}
            aria-label="Slide suivant"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}

// Export des sous-composants pour usage individuel
export { GalleryAmbientBackground } from "./gallery-ambient-background";
export { GalleryCard } from "./gallery-card";
export {
  GalleryNavigationDots,
  GalleryNavigationArrows,
} from "./gallery-navigation-dots";
export {
  GalleryKeyboardHint,
  GallerySlideCounter,
  GalleryTitle,
} from "./gallery-keyboard-hint";
