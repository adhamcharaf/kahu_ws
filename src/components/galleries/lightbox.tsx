// ============================================================================
// GalleryLightbox - Visionneuse d'images en plein ecran
// Design: Editorial Luxury - Elegant et immersif
// ============================================================================

"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface GalleryLightboxProps {
  /** Liste des images */
  images: string[];
  /** Index de l'image courante */
  currentIndex: number;
  /** Etat d'ouverture */
  isOpen: boolean;
  /** Callback de fermeture */
  onClose: () => void;
  /** Callback image precedente */
  onPrevious: () => void;
  /** Callback image suivante */
  onNext: () => void;
}

export function GalleryLightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Navigation clavier
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    },
    [isOpen, onClose, onPrevious, onNext]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Bloquer le scroll du body quand ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.3,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Fermer"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Navigation - Previous */}
          <button
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Image precedente"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Navigation - Next */}
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Image suivante"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* Image container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="relative w-[90vw] h-[80vh] max-w-5xl"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Image
                src={images[currentIndex]}
                alt={`Image ${currentIndex + 1} sur ${images.length}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-light tracking-wider">
            {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
