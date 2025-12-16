"use client";

import { useState, useEffect, useRef, RefObject, useCallback } from "react";

interface MousePosition {
  x: number; // Normalisé entre -0.5 et 0.5
  y: number; // Normalisé entre -0.5 et 0.5
}

interface UseMousePositionReturn {
  position: MousePosition;
  isHovering: boolean;
  elementRef: RefObject<HTMLElement | null>;
}

/**
 * Hook pour tracker la position de la souris relative à un élément
 * Utilisé pour les effets magnétiques et le tilt 3D
 *
 * @param externalRef - Ref optionnelle externe
 * @returns Position normalisée (-0.5 à 0.5), état hover, et ref
 */
export function useMousePosition(
  externalRef?: RefObject<HTMLElement | null>
): UseMousePositionReturn {
  const internalRef = useRef<HTMLElement | null>(null);
  const ref = externalRef || internalRef;

  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Normaliser entre -0.5 et 0.5
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    setPosition({ x, y });
  }, [ref]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    // Reset smooth vers le centre
    setPosition({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [ref, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return {
    position,
    isHovering,
    elementRef: ref
  };
}

/**
 * Hook pour tracker la position globale de la souris
 * Utilisé pour les effets de cursor personnalisé
 */
export function useGlobalMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}

/**
 * Hook pour détecter si la souris est dans une zone spécifique
 */
export function useMouseInBounds(ref: RefObject<HTMLElement | null>) {
  const [isInBounds, setIsInBounds] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleEnter = () => setIsInBounds(true);
    const handleLeave = () => setIsInBounds(false);

    element.addEventListener("mouseenter", handleEnter);
    element.addEventListener("mouseleave", handleLeave);

    return () => {
      element.removeEventListener("mouseenter", handleEnter);
      element.removeEventListener("mouseleave", handleLeave);
    };
  }, [ref]);

  return isInBounds;
}
