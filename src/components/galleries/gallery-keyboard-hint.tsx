// ============================================================================
// GalleryKeyboardHint - Indication des controles clavier
// Design: Editorial Luxury - Discret, informatif, elegant
// ============================================================================

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useIsDesktop } from "@/hooks/use-media-query";
import { FULLSCREEN_GALLERY_CONFIG } from "@/lib/slider-constants";

interface GalleryKeyboardHintProps {
  /** Afficher le hint */
  visible?: boolean;
  /** Classe CSS additionnelle */
  className?: string;
}

export function GalleryKeyboardHint({
  visible = true,
  className,
}: GalleryKeyboardHintProps) {
  const isDesktop = useIsDesktop();
  const [isVisible, setIsVisible] = useState(visible);
  const [hasInteracted, setHasInteracted] = useState(false);

  const { keyboardHint, glass } = FULLSCREEN_GALLERY_CONFIG;

  // Masquer apres interaction ou timeout
  useEffect(() => {
    if (!visible || hasInteracted) {
      setIsVisible(false);
      return;
    }

    // Fade out apres un delai d'inactivite
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, keyboardHint.fadeOutDelay);

    return () => clearTimeout(timer);
  }, [visible, hasInteracted, keyboardHint.fadeOutDelay]);

  // Detecter les interactions clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["ArrowLeft", "ArrowRight", "a", "d", "A", "D", "Home", "End"].includes(
          e.key
        )
      ) {
        setHasInteracted(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Ne pas afficher sur mobile
  if (!isDesktop) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={cn(
            "flex items-center gap-6",
            "px-5 py-3",
            "backdrop-blur-md rounded-full",
            "border border-white/10",
            className
          )}
          style={{
            background: glass.background,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            duration: keyboardHint.fadeOutDuration / 1000,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Navigation horizontale */}
          <div className="flex items-center gap-2">
            <KeyCap>
              <ArrowIcon direction="left" />
            </KeyCap>
            <KeyCap>
              <ArrowIcon direction="right" />
            </KeyCap>
            <span className="text-xs text-white/50 ml-1">navigate</span>
          </div>

          {/* Separateur */}
          <div className="w-px h-4 bg-white/20" />

          {/* Touches alternatives */}
          <div className="flex items-center gap-2">
            <KeyCap>A</KeyCap>
            <KeyCap>D</KeyCap>
            <span className="text-xs text-white/50 ml-1">alt</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// Composants utilitaires
// ============================================================================

interface KeyCapProps {
  children: React.ReactNode;
  className?: string;
}

function KeyCap({ children, className }: KeyCapProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "w-7 h-7 min-w-7",
        "text-xs font-medium text-white/70",
        "bg-white/10 rounded-md",
        "border border-white/20 border-b-2",
        "shadow-sm",
        className
      )}
    >
      {children}
    </span>
  );
}

interface ArrowIconProps {
  direction: "left" | "right" | "up" | "down";
  className?: string;
}

function ArrowIcon({ direction, className }: ArrowIconProps) {
  const rotation = {
    left: "rotate-180",
    right: "rotate-0",
    up: "-rotate-90",
    down: "rotate-90",
  };

  return (
    <svg
      className={cn("w-3 h-3", rotation[direction], className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

// ============================================================================
// GallerySlideCounter - Compteur de slides
// ============================================================================

interface GallerySlideCounterProps {
  /** Index actuel (0-based) */
  current: number;
  /** Total de slides */
  total: number;
  /** Classe CSS additionnelle */
  className?: string;
}

export function GallerySlideCounter({
  current,
  total,
  className,
}: GallerySlideCounterProps) {
  const currentStr = String(current + 1).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <div
      className={cn(
        "flex items-baseline gap-1",
        "text-white/60 font-light tracking-wider",
        className
      )}
      style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
    >
      <motion.span
        key={current}
        className="text-lg md:text-xl text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentStr}
      </motion.span>
      <span className="text-sm">/</span>
      <span className="text-sm">{totalStr}</span>
    </div>
  );
}

// ============================================================================
// GalleryTitle - Titre de la section galerie
// ============================================================================

interface GalleryTitleProps {
  /** Titre a afficher */
  title?: string;
  /** Classe CSS additionnelle */
  className?: string;
}

export function GalleryTitle({
  title = "Gallery",
  className,
}: GalleryTitleProps) {
  return (
    <h2
      className={cn(
        "text-lg md:text-xl font-semibold tracking-tight",
        "text-white",
        className
      )}
      style={{ fontFamily: "var(--font-display, 'Playfair Display', serif)" }}
    >
      {title}
    </h2>
  );
}
