// ============================================================================
// useSliderNavigation - Hook de navigation clavier pour le slider
// ============================================================================

"use client";

import { useEffect, useCallback } from "react";
import type { SliderNavigationOptions } from "@/types/artwork";

interface UseSliderNavigationProps extends SliderNavigationOptions {
  /** Index actif */
  activeIndex: number;
  /** Setter pour l'index */
  setActiveIndex: (index: number | ((prev: number) => number)) => void;
  /** Active/desactive le hook */
  enabled?: boolean;
}

interface SliderNavigationReturn {
  /** Aller a un slide specifique */
  goToSlide: (index: number, direction?: -1 | 1) => void;
  /** Aller au slide suivant */
  goToNext: () => void;
  /** Aller au slide precedent */
  goToPrev: () => void;
  /** Aller au premier slide */
  goToFirst: () => void;
  /** Aller au dernier slide */
  goToLast: () => void;
}

export function useSliderNavigation({
  activeIndex,
  setActiveIndex,
  totalSlides,
  loop = true,
  onNavigate,
  enabled = true,
}: UseSliderNavigationProps): SliderNavigationReturn {
  const goToSlide = useCallback(
    (index: number, direction?: -1 | 1) => {
      let targetIndex = index;

      if (loop) {
        if (index < 0) targetIndex = totalSlides - 1;
        if (index >= totalSlides) targetIndex = 0;
      } else {
        targetIndex = Math.max(0, Math.min(index, totalSlides - 1));
      }

      setActiveIndex(targetIndex);

      if (onNavigate && direction !== undefined) {
        onNavigate(targetIndex, direction);
      }
    },
    [totalSlides, loop, setActiveIndex, onNavigate]
  );

  const goToNext = useCallback(() => {
    goToSlide(activeIndex + 1, 1);
  }, [activeIndex, goToSlide]);

  const goToPrev = useCallback(() => {
    goToSlide(activeIndex - 1, -1);
  }, [activeIndex, goToSlide]);

  const goToFirst = useCallback(() => {
    goToSlide(0, -1);
  }, [goToSlide]);

  const goToLast = useCallback(() => {
    goToSlide(totalSlides - 1, 1);
  }, [goToSlide, totalSlides]);

  // Gestionnaire d'evenements clavier
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignorer si l'utilisateur tape dans un input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Home":
          e.preventDefault();
          goToFirst();
          break;
        case "End":
          e.preventDefault();
          goToLast();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, goToNext, goToPrev, goToFirst, goToLast]);

  return {
    goToSlide,
    goToNext,
    goToPrev,
    goToFirst,
    goToLast,
  };
}
