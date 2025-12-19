"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import {
  SectionReveal,
  CinematicHeader,
  CinemaStagger,
  CinemaStaggerItem,
} from "@/components/animations/scroll-cinema";
import { GrainTexture, AmbientGlow } from "@/components/animations/floating-shapes";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { EASE } from "@/lib/animation-config";

// ============================================================================
// Créations Page Components - Animations Apple-style
// ============================================================================

export function CreationsHero() {
  const isDesktop = useIsDesktop();

  return (
    <section className="relative py-section bg-kahu-cream-deep overflow-hidden">
      <GrainTexture opacity={0.02} />

      {isDesktop && (
        <>
          <AmbientGlow
            color="rgba(139, 58, 58, 0.05)"
            size={400}
            position={{ x: "80%", y: "30%" }}
          />
          <AmbientGlow
            color="rgba(92, 107, 74, 0.04)"
            size={300}
            position={{ x: "20%", y: "70%" }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CinematicHeader
          title="Créations"
          subtitle="Des pièces uniques, fabriquées à la main dans notre atelier d'Abidjan. Chaque création porte en elle une intention, une histoire."
        />
      </div>
    </section>
  );
}

export function AnimatedProductsSection({
  filters,
  children,
}: {
  filters: ReactNode;
  children: ReactNode;
}) {
  const isDesktop = useIsDesktop();

  return (
    <section className="relative py-section bg-kahu-cream-warm overflow-hidden">
      {isDesktop && (
        <AmbientGlow
          color="rgba(92, 107, 74, 0.03)"
          size={500}
          position={{ x: "50%", y: "50%" }}
        />
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <SectionReveal variant="fade-up">
          {filters}
        </SectionReveal>

        {/* Products Grid */}
        <SectionReveal variant="fade-up" delay={0.2}>
          <div className="mt-10">{children}</div>
        </SectionReveal>
      </div>
    </section>
  );
}

export function AnimatedProductGrid({ children }: { children: ReactNode }) {
  return (
    <CinemaStagger
      className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
      staggerDelay={0.08}
    >
      {children}
    </CinemaStagger>
  );
}

export function AnimatedProductItem({ children }: { children: ReactNode }) {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <CinemaStaggerItem>
      <motion.div
        whileHover={shouldReduceMotion ? {} : { y: -8 }}
        transition={{ duration: 0.4, ease: EASE.cinematic }}
      >
        {children}
      </motion.div>
    </CinemaStaggerItem>
  );
}

export function EmptyState() {
  return (
    <SectionReveal variant="fade-up">
      <div className="text-center py-16">
        <motion.p
          className="text-body-md text-kahu-taupe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Aucune création dans cette catégorie pour le moment.
        </motion.p>
      </div>
    </SectionReveal>
  );
}
