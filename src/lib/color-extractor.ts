// ============================================================================
// Color Extractor - Extraction de couleurs dominantes via Canvas API
// ============================================================================

"use client";

import type { ExtractedColors } from "@/types/artwork";

interface RGBColor {
  r: number;
  g: number;
  b: number;
}

/**
 * Extrait les couleurs dominantes d'une image via Canvas API
 * @param imageSrc - URL ou chemin de l'image
 * @param sampleSize - Nombre de pixels a echantillonner (plus bas = plus rapide)
 * @returns Promise<ExtractedColors>
 */
export async function extractColorsFromImage(
  imageSrc: string,
  sampleSize: number = 10
): Promise<ExtractedColors> {
  return new Promise((resolve) => {
    // Guard SSR
    if (typeof window === "undefined") {
      resolve(getDefaultColors());
      return;
    }

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          resolve(getDefaultColors());
          return;
        }

        // Redimensionner pour performance (echantillonner depuis une petite image)
        const maxSize = 100;
        const scale = Math.min(maxSize / img.width, maxSize / img.height);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const colors = analyzePixels(imageData.data, sampleSize);

        resolve(colors);
      } catch (error) {
        console.warn("Color extraction failed:", error);
        resolve(getDefaultColors());
      }
    };

    img.onerror = () => {
      console.warn("Failed to load image for color extraction:", imageSrc);
      resolve(getDefaultColors());
    };

    img.src = imageSrc;
  });
}

/**
 * Analyse les pixels pour trouver les couleurs dominantes
 */
function analyzePixels(
  data: Uint8ClampedArray,
  sampleSize: number
): ExtractedColors {
  const colorMap = new Map<string, number>();
  const step = Math.max(
    1,
    Math.floor(data.length / (4 * sampleSize * sampleSize))
  );

  // Echantillonner les pixels
  for (let i = 0; i < data.length; i += 4 * step) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Ignorer les pixels transparents
    if (a < 128) continue;

    // Quantifier les couleurs pour reduire la palette
    const quantized = quantizeColor(r, g, b, 24);
    const key = `${quantized.r},${quantized.g},${quantized.b}`;

    colorMap.set(key, (colorMap.get(key) || 0) + 1);
  }

  // Trier par frequence
  const sortedColors = Array.from(colorMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (sortedColors.length === 0) {
    return getDefaultColors();
  }

  // Convertir en hex
  const palette = sortedColors.map(([key]) => {
    const [r, g, b] = key.split(",").map(Number);
    return rgbToHex(r, g, b);
  });

  const dominant = palette[0];
  const isDark = isColorDark(dominant);

  return {
    dominant,
    palette: palette.slice(0, 3),
    isDark,
  };
}

/**
 * Quantifie une couleur pour reduire le nombre de couleurs uniques
 */
function quantizeColor(r: number, g: number, b: number, levels: number): RGBColor {
  const factor = 256 / levels;
  return {
    r: Math.round(Math.round(r / factor) * factor),
    g: Math.round(Math.round(g / factor) * factor),
    b: Math.round(Math.round(b / factor) * factor),
  };
}

/**
 * Convertit RGB en hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

/**
 * Verifie si une couleur est sombre (pour decisions de contraste)
 */
function isColorDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  // Formule de luminance relative
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5;
}

/**
 * Couleurs par defaut (palette KAHU)
 */
function getDefaultColors(): ExtractedColors {
  return {
    dominant: "#8B7355",
    palette: ["#8B7355", "#6B5B4F", "#A67C52"],
    isDark: false,
  };
}

/**
 * Cree un gradient CSS radial a partir des couleurs extraites
 */
export function createBackgroundGradient(
  colors: ExtractedColors,
  opacity: number = 0.4
): string {
  const [primary, secondary = primary] = colors.palette;

  const toRgba = (hex: string, a: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  return `radial-gradient(
    ellipse 150% 100% at 50% 50%,
    ${toRgba(primary, opacity)} 0%,
    ${toRgba(secondary, opacity * 0.5)} 50%,
    transparent 100%
  )`;
}

/**
 * Interpole entre deux couleurs hex
 */
export function interpolateColors(
  color1: string,
  color2: string,
  factor: number
): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * factor);
  const g = Math.round(g1 + (g2 - g1) * factor);
  const b = Math.round(b1 + (b2 - b1) * factor);

  return rgbToHex(r, g, b);
}
