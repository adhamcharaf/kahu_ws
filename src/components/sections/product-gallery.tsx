"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { getOptimizedImageUrl } from "@/lib/cloudinary";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-kahu-cream-deep rounded-sm flex items-center justify-center">
        <span className="text-body-sm text-kahu-taupe">Aucune image</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-kahu-cream-deep">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
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
        </AnimatePresence>

        {/* Navigation Arrows (Mobile) */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setActiveIndex((i) =>
                  i === 0 ? images.length - 1 : i - 1
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-kahu-ivory/90 flex items-center justify-center shadow-md md:hidden"
              aria-label="Image precedente"
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
            </button>
            <button
              onClick={() =>
                setActiveIndex((i) =>
                  i === images.length - 1 ? 0 : i + 1
                )
              }
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-kahu-ivory/90 flex items-center justify-center shadow-md md:hidden"
              aria-label="Image suivante"
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
            </button>
          </>
        )}

        {/* Dots (Mobile) */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === activeIndex
                    ? "bg-kahu-charcoal w-4"
                    : "bg-kahu-charcoal/40"
                )}
                aria-label={`Voir image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails (Desktop) */}
      {images.length > 1 && (
        <div className="hidden md:grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-sm transition-all",
                index === activeIndex
                  ? "ring-2 ring-kahu-charcoal"
                  : "opacity-70 hover:opacity-100"
              )}
            >
              <Image
                src={getOptimizedImageUrl(image, "thumbnail")}
                alt={`${productName} - Miniature ${index + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
