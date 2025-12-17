// ============================================================================
// GalleryNavigationDots - Dots de navigation avec couleur dynamique
// Design: Editorial Luxury - Minimaliste, elegant, interactif
// ============================================================================

"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FULLSCREEN_GALLERY_CONFIG, SLIDER_EASE } from "@/lib/slider-constants";

interface GalleryNavigationDotsProps {
  /** Nombre total de slides */
  total: number;
  /** Index du slide actif */
  activeIndex: number;
  /** Couleur dominante pour le dot actif */
  activeColor: string;
  /** Callback de navigation */
  onNavigate: (index: number) => void;
  /** Classe CSS additionnelle */
  className?: string;
}

export function GalleryNavigationDots({
  total,
  activeIndex,
  activeColor,
  onNavigate,
  className,
}: GalleryNavigationDotsProps) {
  const { glass } = FULLSCREEN_GALLERY_CONFIG;

  return (
    <nav
      className={cn(
        "flex items-center justify-center gap-2 md:gap-3",
        "px-4 py-3 md:px-6 md:py-4",
        "backdrop-blur-md rounded-full",
        "border border-white/10",
        className
      )}
      style={{
        background: glass.background,
      }}
      role="tablist"
      aria-label="Navigation de la galerie"
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Aller au slide ${index + 1}`}
            tabIndex={isActive ? 0 : -1}
            className={cn(
              "relative h-2 md:h-2.5 rounded-full",
              "transition-all duration-300 ease-out",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
              "cursor-pointer"
            )}
            onClick={() => onNavigate(index)}
            initial={false}
            animate={{
              width: isActive ? 24 : 8,
              scale: isActive ? 1 : 0.9,
            }}
            whileHover={{
              scale: isActive ? 1.05 : 1.1,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.3,
              ease: SLIDER_EASE,
            }}
          >
            {/* Background du dot */}
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={false}
              animate={{
                backgroundColor: isActive ? activeColor : "rgba(255, 255, 255, 0.3)",
                boxShadow: isActive
                  ? `0 0 12px ${activeColor}80, 0 0 4px ${activeColor}`
                  : "none",
              }}
              transition={{
                duration: 0.4,
                ease: SLIDER_EASE,
              }}
            />

            {/* Effet de pulse sur le dot actif */}
            {isActive && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: activeColor }}
                initial={{ opacity: 0.6, scale: 1 }}
                animate={{
                  opacity: [0.6, 0, 0.6],
                  scale: [1, 1.8, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}

// ============================================================================
// GalleryNavigationArrows - Fleches de navigation (optionnel)
// ============================================================================

interface GalleryNavigationArrowsProps {
  /** Callback pour precedent */
  onPrev: () => void;
  /** Callback pour suivant */
  onNext: () => void;
  /** Desactiver precedent */
  disablePrev?: boolean;
  /** Desactiver suivant */
  disableNext?: boolean;
  /** Classe CSS additionnelle */
  className?: string;
}

export function GalleryNavigationArrows({
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
  className,
}: GalleryNavigationArrowsProps) {
  const { glass } = FULLSCREEN_GALLERY_CONFIG;

  const ArrowButton = ({
    direction,
    onClick,
    disabled,
  }: {
    direction: "prev" | "next";
    onClick: () => void;
    disabled: boolean;
  }) => (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-12 h-12 md:w-14 md:h-14 rounded-full",
        "flex items-center justify-center",
        "backdrop-blur-md border border-white/10",
        "text-white/70 hover:text-white",
        "transition-colors duration-300",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        "disabled:opacity-30 disabled:cursor-not-allowed"
      )}
      style={{
        background: glass.background,
      }}
      whileHover={!disabled ? { scale: 1.05, background: glass.backgroundHover } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
      aria-label={direction === "prev" ? "Slide precedent" : "Slide suivant"}
    >
      <svg
        className={cn(
          "w-5 h-5 md:w-6 md:h-6",
          direction === "prev" && "rotate-180"
        )}
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
    </motion.button>
  );

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <ArrowButton direction="prev" onClick={onPrev} disabled={disablePrev} />
      <ArrowButton direction="next" onClick={onNext} disabled={disableNext} />
    </div>
  );
}
