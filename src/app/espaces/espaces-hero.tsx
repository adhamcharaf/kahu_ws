"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
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
// Espaces Page Components - Animations Apple-style
// ============================================================================

export function EspacesHero() {
  const isDesktop = useIsDesktop();

  return (
    <section className="relative py-section bg-kahu-cream-deep overflow-hidden">
      <GrainTexture opacity={0.02} />

      {isDesktop && (
        <>
          <AmbientGlow
            color="rgba(92, 107, 74, 0.05)"
            size={450}
            position={{ x: "20%", y: "40%" }}
          />
          <AmbientGlow
            color="rgba(139, 58, 58, 0.04)"
            size={350}
            position={{ x: "80%", y: "60%" }}
          />
        </>
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <CinematicHeader
          title="Espaces"
          subtitle="Des amenagements sur-mesure qui transforment vos espaces de vie. Chaque projet est une collaboration unique avec nos clients."
        />
      </div>
    </section>
  );
}

export function AnimatedProjectsSection({ children }: { children: ReactNode }) {
  const isDesktop = useIsDesktop();

  return (
    <section className="relative py-section bg-kahu-cream-warm overflow-hidden">
      {isDesktop && (
        <AmbientGlow
          color="rgba(139, 58, 58, 0.03)"
          size={500}
          position={{ x: "50%", y: "50%" }}
        />
      )}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal variant="fade-up">
          {children}
        </SectionReveal>
      </div>
    </section>
  );
}

export function AnimatedProjectGrid({ children }: { children: ReactNode }) {
  return (
    <CinemaStagger
      className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
      staggerDelay={0.12}
    >
      {children}
    </CinemaStagger>
  );
}

export function AnimatedProjectItem({ children }: { children: ReactNode }) {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <CinemaStaggerItem>
      <motion.div
        whileHover={shouldReduceMotion ? {} : { y: -8, scale: 1.01 }}
        transition={{ duration: 0.4, ease: EASE.cinematic }}
      >
        {children}
      </motion.div>
    </CinemaStaggerItem>
  );
}

export function EmptyProjectsState() {
  return (
    <SectionReveal variant="fade-up">
      <div className="text-center py-16">
        <motion.p
          className="text-body-md text-kahu-taupe"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Aucun projet pour le moment.
        </motion.p>
      </div>
    </SectionReveal>
  );
}
