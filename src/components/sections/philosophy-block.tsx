"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { TextReveal, SplitText } from "@/components/animations/text-reveal";
import { StaggerReveal } from "@/components/animations/stagger-reveal";
import { WoodGrainTexture } from "@/components/animations/floating-shapes";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, VIEWPORT } from "@/lib/animation-config";

// ============================================================================
// Philosophy Block - Citation de Mouna avec révélation artistique
// "Le bois qui respire à travers les mots"
// ============================================================================

export function PhilosophyBlock() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, VIEWPORT.default);
  const shouldReduceMotion = usePrefersReducedMotion();

  const quote = "Chaque piece raconte une histoire, celle du bois qui l'a vue naitre et des mains qui l'ont faconnee.";

  return (
    <section ref={ref} className="py-section bg-kahu-bark overflow-hidden relative">
      {/* Subtle background grain effect */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <WoodGrainTexture opacity={0.06} />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Quote marks - Animated */}
        <motion.div
          className="font-display text-[120px] leading-none text-kahu-cream/10 absolute -top-8 left-0 select-none"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.slow, ease: KAHU_EASE }}
        >
          &ldquo;
        </motion.div>

        {/* Main Quote with Text Reveal */}
        <blockquote className="font-display text-display-sm text-kahu-cream italic relative z-10">
          {shouldReduceMotion ? (
            <span>&ldquo;{quote}&rdquo;</span>
          ) : (
            <TextReveal
              text={`"${quote}"`}
              mode="word"
              charDelay={0.08}
              className="justify-center"
            />
          )}
        </blockquote>

        {/* Author with stagger animation */}
        <StaggerReveal staggerDelay={0.1} initialDelay={1.2}>
          <motion.div className="mt-8 flex items-center justify-center gap-4">
            {/* Decorative line left */}
            <motion.span
              className="h-px w-8 bg-kahu-stone/50"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: DURATION.normal, delay: 1.4, ease: KAHU_EASE }}
            />

            <p className="text-body-sm text-kahu-stone uppercase tracking-wider">
              Mouna Shaima, Fondatrice
            </p>

            {/* Decorative line right */}
            <motion.span
              className="h-px w-8 bg-kahu-stone/50"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: DURATION.normal, delay: 1.4, ease: KAHU_EASE }}
            />
          </motion.div>
        </StaggerReveal>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: DURATION.normal, delay: 1.6, ease: KAHU_EASE }}
          className="mt-10"
        >
          <Button href="/atelier" variant="ghost" className="text-kahu-cream hover:text-kahu-ivory">
            Decouvrir l&apos;atelier
          </Button>
        </motion.div>
      </div>

      {/* Closing quote mark */}
      <motion.div
        className="font-display text-[120px] leading-none text-kahu-cream/10 absolute bottom-0 right-8 select-none hidden lg:block"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: DURATION.slow, delay: 0.3, ease: KAHU_EASE }}
      >
        &rdquo;
      </motion.div>
    </section>
  );
}
