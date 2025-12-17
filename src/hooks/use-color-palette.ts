// ============================================================================
// useColorPalette - Hook pour gerer les couleurs extraites des images
// ============================================================================

"use client";

import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import type { GalleryArtwork, ExtractedColors } from "@/types/artwork";
import {
  extractColorsFromImage,
  createAnimatedBackgroundGradient,
} from "@/lib/color-extractor";
import { FULLSCREEN_BACKGROUND_CONFIG } from "@/lib/slider-constants";

interface UseColorPaletteProps {
  /** Liste des artworks */
  artworks: GalleryArtwork[];
  /** Index de l'artwork actif */
  activeIndex: number;
  /** Desactiver l'extraction (pour SSR ou reduced motion) */
  disabled?: boolean;
}

interface UseColorPaletteReturn {
  /** Couleurs de l'artwork actif */
  currentColors: ExtractedColors;
  /** Indique si l'extraction est en cours */
  isLoading: boolean;
  /** Styles de gradient pour les 3 layers du background */
  gradientStyles: {
    layer1: string;
    layer2: string;
    layer3: string;
  };
  /** Couleur dominante pour les elements UI (dots, etc.) */
  dominantColor: string;
}

/** Couleurs par defaut (palette KAHU) */
const DEFAULT_COLORS: ExtractedColors = {
  dominant: "#8B7355",
  palette: ["#8B7355", "#6B5B4F", "#A67C52"],
  isDark: false,
};

export function useColorPalette({
  artworks,
  activeIndex,
  disabled = false,
}: UseColorPaletteProps): UseColorPaletteReturn {
  // Cache des couleurs extraites par ID d'artwork
  const colorsCache = useRef<Map<string, ExtractedColors>>(new Map());

  // Etat des couleurs actuelles
  const [currentColors, setCurrentColors] =
    useState<ExtractedColors>(DEFAULT_COLORS);
  const [isLoading, setIsLoading] = useState(false);

  // Artwork actif
  const activeArtwork = artworks[activeIndex];

  // Extraire les couleurs d'une image
  const extractColors = useCallback(
    async (artwork: GalleryArtwork): Promise<ExtractedColors> => {
      const artworkId = artwork.id;

      // Verifier le cache d'abord
      if (colorsCache.current.has(artworkId)) {
        return colorsCache.current.get(artworkId)!;
      }

      // Utiliser les couleurs pre-definies si disponibles
      if (artwork.colors) {
        colorsCache.current.set(artworkId, artwork.colors);
        return artwork.colors;
      }

      // Extraire les couleurs de l'image
      try {
        const colors = await extractColorsFromImage(artwork.image.src, 10);
        colorsCache.current.set(artworkId, colors);
        return colors;
      } catch (error) {
        console.warn(
          `Failed to extract colors for artwork ${artworkId}:`,
          error
        );
        return DEFAULT_COLORS;
      }
    },
    []
  );

  // Pre-charger les couleurs des artworks adjacents
  const preloadAdjacentColors = useCallback(
    async (currentIndex: number) => {
      const indices = [
        currentIndex - 1,
        currentIndex + 1,
        currentIndex + 2,
      ].filter((i) => i >= 0 && i < artworks.length);

      await Promise.all(
        indices.map((i) => {
          const artwork = artworks[i];
          if (artwork && !colorsCache.current.has(artwork.id)) {
            return extractColors(artwork);
          }
          return Promise.resolve();
        })
      );
    },
    [artworks, extractColors]
  );

  // Effet pour extraire les couleurs quand l'artwork actif change
  useEffect(() => {
    if (disabled || !activeArtwork) {
      setCurrentColors(DEFAULT_COLORS);
      return;
    }

    let cancelled = false;
    setIsLoading(true);

    const updateColors = async () => {
      const colors = await extractColors(activeArtwork);

      if (!cancelled) {
        setCurrentColors(colors);
        setIsLoading(false);

        // Pre-charger les couleurs adjacentes en arriere-plan
        preloadAdjacentColors(activeIndex);
      }
    };

    updateColors();

    return () => {
      cancelled = true;
    };
  }, [activeArtwork, activeIndex, disabled, extractColors, preloadAdjacentColors]);

  // Calculer les styles de gradient
  const gradientStyles = useMemo(() => {
    if (disabled) {
      return {
        layer1: "transparent",
        layer2: "transparent",
        layer3: "transparent",
      };
    }

    return createAnimatedBackgroundGradient(
      currentColors,
      FULLSCREEN_BACKGROUND_CONFIG.opacity.layer1
    );
  }, [currentColors, disabled]);

  // Couleur dominante pour les elements UI
  const dominantColor = currentColors.dominant;

  return {
    currentColors,
    isLoading,
    gradientStyles,
    dominantColor,
  };
}

/**
 * Hook simplifie pour obtenir juste la couleur dominante
 */
export function useDominantColor(
  imageSrc: string,
  fallback: string = "#8B7355"
): string {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    if (!imageSrc) return;

    extractColorsFromImage(imageSrc, 10).then((colors) => {
      setColor(colors.dominant);
    });
  }, [imageSrc]);

  return color;
}
