"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface FlashBannerProps {
  isVisible: boolean;
}

export function FlashBanner({ isVisible }: FlashBannerProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[60] bg-kahu-terracotta"
    >
      <Link
        href="/fr/objet?filter=flash"
        className="flex items-center justify-center gap-2 px-4 py-2 text-kahu-ivory hover:bg-kahu-terracotta-dark transition-colors"
      >
        <span className="animate-pulse-soft">🔥</span>
        <span className="text-body-sm font-medium uppercase tracking-wider">
          Vente Flash en cours
        </span>
        <span className="hidden sm:inline text-body-sm">
          - Decouvrir les offres
        </span>
        <svg
          className="w-4 h-4 ml-1"
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
      </Link>
    </motion.div>
  );
}
