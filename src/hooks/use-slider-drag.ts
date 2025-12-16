// ============================================================================
// useSliderDrag - Hook de drag avec physique de momentum
// ============================================================================

"use client";

import { useState, useCallback, useRef } from "react";
import type { PanInfo } from "framer-motion";
import { DRAG_PHYSICS } from "@/lib/slider-constants";
import type { DragState } from "@/types/artwork";

interface UseSliderDragProps {
  /** Nombre total de slides */
  totalSlides: number;
  /** Index actif */
  activeIndex: number;
  /** Callback de navigation */
  onNavigate: (direction: -1 | 1) => void;
  /** Largeur du container */
  containerWidth: number;
  /** Active/desactive le hook */
  enabled?: boolean;
}

interface UseSliderDragReturn {
  /** Etat du drag */
  dragState: DragState;
  /** Handler debut de drag */
  handleDragStart: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  /** Handler pendant le drag */
  handleDrag: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  /** Handler fin de drag */
  handleDragEnd: (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => void;
  /** Contraintes de drag */
  dragConstraints: { left: number; right: number };
  /** Indicateur de drag en cours */
  isDragging: boolean;
  /** Offset actuel du drag */
  dragOffset: number;
}

export function useSliderDrag({
  totalSlides,
  activeIndex,
  onNavigate,
  containerWidth,
  enabled = true,
}: UseSliderDragProps): UseSliderDragReturn {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    startX: 0,
    currentX: 0,
    offsetX: 0,
    velocity: 0,
  });

  // Refs pour le tracking de velocite
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);

  // Calcule l'offset avec resistance
  const calculateOffset = useCallback((x: number): number => {
    return x * DRAG_PHYSICS.resistance;
  }, []);

  // Met a jour la velocite pendant le drag
  const updateVelocity = useCallback((x: number) => {
    const now = performance.now();
    const deltaTime = now - lastTimeRef.current;

    if (deltaTime > 0) {
      const deltaX = x - lastXRef.current;
      velocityRef.current = deltaX / deltaTime;
    }

    lastXRef.current = x;
    lastTimeRef.current = now;
  }, []);

  const handleDragStart = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!enabled) return;

      setDragState((prev) => ({
        ...prev,
        isDragging: true,
        startX: info.point.x,
        currentX: info.point.x,
        offsetX: 0,
      }));

      lastXRef.current = info.point.x;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
    },
    [enabled]
  );

  const handleDrag = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!enabled || !dragState.isDragging) return;

      updateVelocity(info.point.x);

      const offset = calculateOffset(info.offset.x);

      setDragState((prev) => ({
        ...prev,
        currentX: info.point.x,
        offsetX: offset,
        velocity: velocityRef.current,
      }));
    },
    [enabled, dragState.isDragging, calculateOffset, updateVelocity]
  );

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (!enabled) return;

      const offset = info.offset.x;
      const velocity = Math.abs(velocityRef.current);
      const cappedVelocity = Math.min(velocity, DRAG_PHYSICS.maxVelocity);

      // Determine si on doit naviguer
      const shouldNavigate =
        Math.abs(offset) > DRAG_PHYSICS.snapThreshold ||
        cappedVelocity > DRAG_PHYSICS.velocityThreshold;

      if (shouldNavigate) {
        const direction = offset > 0 ? -1 : 1;

        // Verifier les limites
        const targetIndex = activeIndex + direction;
        if (targetIndex >= 0 && targetIndex < totalSlides) {
          onNavigate(direction);
        }
      }

      // Reset du state
      setDragState({
        isDragging: false,
        startX: 0,
        currentX: 0,
        offsetX: 0,
        velocity: 0,
      });
    },
    [enabled, activeIndex, totalSlides, onNavigate]
  );

  // Contraintes de drag
  const dragConstraints = {
    left: activeIndex === totalSlides - 1 ? 0 : -containerWidth,
    right: activeIndex === 0 ? 0 : containerWidth,
  };

  return {
    dragState,
    handleDragStart,
    handleDrag,
    handleDragEnd,
    dragConstraints,
    isDragging: dragState.isDragging,
    dragOffset: dragState.offsetX,
  };
}
