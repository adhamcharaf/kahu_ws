"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, SPRING } from "@/lib/animation-config";

// ============================================================================
// Product Gallery - Galerie avec transitions artistiques
// "Chaque image se révèle comme une oeuvre dans un musée"
// ============================================================================

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

// Direction of slide based on index change
type Direction = -1 | 1;

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  // Track direction for slide animation
  const paginate = useCallback((newIndex: number) => {
    const newDirection = newIndex > activeIndex ? 1 : -1;
    setPage([newIndex, newDirection]);
    setActiveIndex(newIndex);
  }, [activeIndex]);

  // Swipe handling for mobile
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      // Swipe left - next image
      const nextIndex = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
      paginate(nextIndex);
    } else if (swipe > swipeConfidenceThreshold) {
      // Swipe right - previous image
      const prevIndex = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
      paginate(prevIndex);
    }
  }, [activeIndex, images.length, paginate]);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-kahu-cream-deep rounded-sm flex items-center justify-center">
        <span className="text-body-sm text-kahu-taupe">Aucune image</span>
      </div>
    );
  }

  // Animation variants for main image
  const slideVariants = {
    enter: (direction: Direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.05,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: Direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.95,
    }),
  };

  // Zoom variants for hover effect
  const zoomVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.08 },
  };

  // Thumbnail variants
  const thumbnailVariants = {
    inactive: {
      opacity: 0.6,
      scale: 1,
      filter: "grayscale(20%)",
    },
    active: {
      opacity: 1,
      scale: 1,
      filter: "grayscale(0%)",
    },
    hover: {
      opacity: 0.9,
      scale: 1.05,
    },
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <motion.div
        className="relative aspect-[3/4] overflow-hidden rounded-sm bg-kahu-cream-deep"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DURATION.normal, ease: KAHU_EASE }}
      >
        {/* Main Image with AnimatePresence */}
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", ...SPRING.medium },
              opacity: { duration: DURATION.fast },
              scale: { duration: DURATION.normal, ease: KAHU_EASE },
            }}
            className="absolute inset-0"
            drag={!isDesktop ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={handleDragEnd}
          >
            {/* Zoom on hover (desktop) */}
            <motion.div
              className="relative h-full w-full"
              variants={zoomVariants}
              initial="initial"
              whileHover={isDesktop && !shouldReduceMotion ? "hover" : undefined}
              transition={{ duration: DURATION.slow, ease: KAHU_EASE }}
            >
              <Image
                src={getOptimizedImageUrl(images[activeIndex], "full")}
                alt={`${productName} - Image ${activeIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={activeIndex === 0}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Image counter badge */}
        <motion.div
          className="absolute top-4 right-4 px-3 py-1.5 bg-kahu-charcoal/70 backdrop-blur-sm rounded-full z-10"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: DURATION.fast }}
        >
          <span className="text-caption text-kahu-ivory font-medium">
            {activeIndex + 1} / {images.length}
          </span>
        </motion.div>

        {/* Navigation Arrows (Mobile) */}
        {images.length > 1 && (
          <>
            <motion.button
              onClick={() => paginate(activeIndex === 0 ? images.length - 1 : activeIndex - 1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-kahu-ivory/90 flex items-center justify-center shadow-md md:hidden z-20"
              aria-label="Image precedente"
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-5 h-5 text-kahu-charcoal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => paginate(activeIndex === images.length - 1 ? 0 : activeIndex + 1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-kahu-ivory/90 flex items-center justify-center shadow-md md:hidden z-20"
              aria-label="Image suivante"
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-5 h-5 text-kahu-charcoal"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </>
        )}

        {/* Progress dots (Mobile) */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden z-20">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => paginate(index)}
                className={cn(
                  "h-2 rounded-full transition-colors",
                  index === activeIndex
                    ? "bg-kahu-charcoal"
                    : "bg-kahu-charcoal/40"
                )}
                initial={{ width: index === activeIndex ? 16 : 8 }}
                animate={{ width: index === activeIndex ? 16 : 8 }}
                transition={{ duration: DURATION.fast, ease: KAHU_EASE }}
                aria-label={`Voir image ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Desktop Navigation Arrows (hover reveal) */}
        {images.length > 1 && isDesktop && (
          <motion.div
            className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity z-10"
            initial={{ opacity: 0 }}
          >
            <motion.button
              onClick={() => paginate(activeIndex === 0 ? images.length - 1 : activeIndex - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-kahu-ivory/90 flex items-center justify-center shadow-lg backdrop-blur-sm"
              aria-label="Image precedente"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,253,249,1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 text-kahu-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={() => paginate(activeIndex === images.length - 1 ? 0 : activeIndex + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-kahu-ivory/90 flex items-center justify-center shadow-lg backdrop-blur-sm"
              aria-label="Image suivante"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,253,249,1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 text-kahu-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </motion.div>

      {/* Thumbnails (Desktop) */}
      {images.length > 1 && (
        <motion.div
          className="hidden md:grid grid-cols-4 gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: DURATION.normal, ease: KAHU_EASE }}
        >
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => paginate(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-sm",
                index === activeIndex && "ring-2 ring-kahu-charcoal ring-offset-2"
              )}
              variants={thumbnailVariants}
              initial="inactive"
              animate={index === activeIndex ? "active" : "inactive"}
              whileHover="hover"
              transition={{ duration: DURATION.fast, ease: KAHU_EASE }}
            >
              <Image
                src={getOptimizedImageUrl(image, "thumbnail")}
                alt={`${productName} - Miniature ${index + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />

              {/* Active indicator overlay */}
              <motion.div
                className="absolute inset-0 bg-kahu-terracotta/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: index === activeIndex ? 0 : 0 }}
              />
            </motion.button>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// ============================================================================
// Lightbox Gallery - Version plein écran pour zoom
// ============================================================================

interface LightboxProps {
  images: string[];
  productName: string;
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
}

export function LightboxGallery({
  images,
  productName,
  isOpen,
  initialIndex = 0,
  onClose,
}: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const shouldReduceMotion = usePrefersReducedMotion();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-kahu-charcoal/95 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-kahu-ivory/10 flex items-center justify-center text-kahu-ivory hover:bg-kahu-ivory/20 transition-colors z-10"
            onClick={onClose}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
            aria-label="Fermer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Main image */}
          <motion.div
            className="relative w-full max-w-5xl aspect-[4/3] mx-4"
            onClick={(e) => e.stopPropagation()}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: DURATION.normal, ease: KAHU_EASE }}
          >
            <Image
              src={getOptimizedImageUrl(images[activeIndex], "full")}
              alt={`${productName} - Image ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </motion.div>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <motion.button
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-kahu-ivory/10 flex items-center justify-center text-kahu-ivory hover:bg-kahu-ivory/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i === 0 ? images.length - 1 : i - 1));
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
              <motion.button
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-kahu-ivory/10 flex items-center justify-center text-kahu-ivory hover:bg-kahu-ivory/20 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i === images.length - 1 ? 0 : i + 1));
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            </>
          )}

          {/* Counter */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-kahu-ivory/10 rounded-full text-kahu-ivory text-body-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {activeIndex + 1} / {images.length}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
