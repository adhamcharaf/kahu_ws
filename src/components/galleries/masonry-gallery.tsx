// ============================================================================
// MasonryGallery - Galerie masonry avec defilement parallax
// Design: Editorial Luxury - Immersif et hypnotique
// ============================================================================

"use client";

import { useState, useEffect, useCallback } from "react";
import { AutoScrollColumn } from "./auto-scroll-column";
import { GalleryLightbox } from "./lightbox";

interface MasonryGalleryProps {
  /** Images a afficher */
  images: string[];
  /** Hauteur du container */
  height?: string;
  /** Duree de base de l'animation en secondes */
  baseDuration?: number;
  /** Increment de duree par colonne */
  durationIncrement?: number;
  /** Activer le lightbox au clic */
  enableLightbox?: boolean;
  /** Classe CSS additionnelle */
  className?: string;
}

// Hook pour le nombre de colonnes responsive
function useColumnCount() {
  const [columnCount, setColumnCount] = useState(2);

  useEffect(() => {
    const getColumnCount = () => {
      if (typeof window === "undefined") return 2;
      if (window.innerWidth >= 1024) return 4; // lg: 4 colonnes
      if (window.innerWidth >= 768) return 3;  // md: 3 colonnes
      return 2;                                 // sm: 2 colonnes
    };

    const handleResize = () => {
      setColumnCount(getColumnCount());
    };

    // Valeur initiale
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return columnCount;
}

export function MasonryGallery({
  images,
  height = "80vh",
  baseDuration = 60,
  durationIncrement = 5,
  enableLightbox = true,
  className,
}: MasonryGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const columnCount = useColumnCount();

  // Distribuer les images dans les colonnes
  const splitIntoColumns = useCallback(
    (imgs: string[], numColumns: number): string[][] => {
      const columns: string[][] = Array.from({ length: numColumns }, () => []);
      imgs.forEach((img, index) => {
        columns[index % numColumns].push(img);
      });
      return columns;
    },
    []
  );

  const columns = splitIntoColumns(images, columnCount);

  // Handlers lightbox
  const openLightbox = useCallback((index: number) => {
    if (enableLightbox) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    }
  }, [enableLightbox]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  return (
    <>
      <div
        className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 overflow-hidden ${className || ""}`}
        style={{ height }}
      >
        {columns.map((columnImages, colIndex) => (
          <AutoScrollColumn
            key={`${columnCount}-${colIndex}`}
            images={columnImages}
            direction={colIndex % 2 === 0 ? "down" : "up"}
            duration={baseDuration + colIndex * durationIncrement}
            onImageClick={(imgIndex) => {
              // Calculer l'index reel dans le tableau original
              const actualIndex = imgIndex * columnCount + colIndex;
              openLightbox(Math.min(actualIndex, images.length - 1));
            }}
          />
        ))}
      </div>

      {enableLightbox && (
        <GalleryLightbox
          images={images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
        />
      )}
    </>
  );
}
