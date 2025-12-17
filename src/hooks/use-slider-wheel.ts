// ============================================================================
// useSliderWheel - Hook de navigation par molette de souris
// ============================================================================

"use client";

import { useEffect, useRef, useCallback } from "react";
import {
  WHEEL_CONFIG,
  FULLSCREEN_WHEEL_CONFIG,
} from "@/lib/slider-constants";

interface UseSliderWheelProps {
  /** Ref du container */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Callback de navigation */
  onNavigate: (direction: -1 | 1) => void;
  /** Active/desactive le hook */
  enabled?: boolean;
  /** Mode fullscreen avec support trackpad horizontal */
  fullscreenMode?: boolean;
}

export function useSliderWheel({
  containerRef,
  onNavigate,
  enabled = true,
  fullscreenMode = false,
}: UseSliderWheelProps): void {
  const lastNavigationRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Choisir le threshold selon le mode
  const threshold = fullscreenMode
    ? FULLSCREEN_WHEEL_CONFIG.thresholdX
    : WHEEL_CONFIG.threshold;
  const cooldown = fullscreenMode
    ? FULLSCREEN_WHEEL_CONFIG.cooldown
    : WHEEL_CONFIG.cooldown;

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (!enabled) return;

      // Verifier si l'event est sur notre container
      const container = containerRef.current;
      if (!container || !container.contains(e.target as Node)) {
        return;
      }

      // Empecher le scroll de la page
      e.preventDefault();

      const now = Date.now();
      const timeSinceLastNav = now - lastNavigationRef.current;

      // Verification du cooldown
      if (timeSinceLastNav < cooldown) {
        return;
      }

      // En mode fullscreen, prioriser deltaX pour trackpad/Magic Mouse
      let delta: number;
      if (fullscreenMode) {
        // Prioriser le scroll horizontal (trackpad) si disponible
        delta =
          Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      } else {
        delta = e.deltaY;
      }

      // Appliquer la resistance en mode fullscreen
      const resistanceFactor = fullscreenMode
        ? FULLSCREEN_WHEEL_CONFIG.resistance
        : WHEEL_CONFIG.sensitivity;
      accumulatedDeltaRef.current += delta * resistanceFactor;

      // En mode fullscreen, reset l'accumulateur apres inactivite
      if (fullscreenMode) {
        if (inactivityTimerRef.current) {
          clearTimeout(inactivityTimerRef.current);
        }
        inactivityTimerRef.current = setTimeout(() => {
          accumulatedDeltaRef.current = 0;
        }, FULLSCREEN_WHEEL_CONFIG.inactivityTimeout);
      }

      // Verifier si le delta accumule depasse le seuil
      if (Math.abs(accumulatedDeltaRef.current) > threshold) {
        const direction = accumulatedDeltaRef.current > 0 ? 1 : -1;

        onNavigate(direction);
        lastNavigationRef.current = now;
        accumulatedDeltaRef.current = 0;
      }
    },
    [enabled, containerRef, onNavigate, fullscreenMode, threshold, cooldown]
  );

  useEffect(() => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    // passive: false requis pour appeler preventDefault
    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [enabled, containerRef, handleWheel]);

  // Reset du delta accumule au demontage
  useEffect(() => {
    return () => {
      accumulatedDeltaRef.current = 0;
      if (inactivityTimerRef.current) {
        clearTimeout(inactivityTimerRef.current);
      }
    };
  }, []);
}
