"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/utils";
import {
  SectionReveal,
  ColorMorphSection,
  CinematicHeader,
  CinemaStagger,
  CinemaStaggerItem,
} from "@/components/animations/scroll-cinema";
import { GrainTexture, AmbientGlow, WoodGrainTexture } from "@/components/animations/floating-shapes";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { EASE } from "@/lib/animation-config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

// ============================================================================
// Sur-mesure Content - Version i18n
// ============================================================================

interface SurMesureContentProps {
  lang: Locale;
  dict: Dictionary;
}

export function SurMesureContent({ lang, dict }: SurMesureContentProps) {
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  const surMesure = dict.objet.surMesure;

  return (
    <main className="bg-kahu-cream-warm min-h-screen">
      {/* ============ Hero Section ============ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-kahu-cream-deep overflow-hidden">
        <GrainTexture opacity={0.02} />

        {isDesktop && (
          <AmbientGlow
            color="rgba(139, 58, 58, 0.06)"
            size={500}
            position={{ x: "75%", y: "40%" }}
          />
        )}

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <CinematicHeader
              title={surMesure.title}
              subtitle={surMesure.heroText}
            />
          </div>
        </div>
      </section>

      {/* ============ Process Section ============ */}
      <ColorMorphSection
        className="py-section"
        fromColor="var(--color-kahu-cream-warm)"
        toColor="var(--color-kahu-cream)"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal variant="blur-up">
            <h2 className="font-display text-display-md text-kahu-charcoal text-center">
              {surMesure.process.title}
            </h2>
          </SectionReveal>

          <SectionReveal variant="fade-up" delay={0.2}>
            <p className="mt-4 text-body-md text-kahu-taupe text-center max-w-2xl mx-auto">
              {surMesure.process.subtitle}
            </p>
          </SectionReveal>

          <CinemaStagger className="mt-16 space-y-12 md:space-y-0 md:grid md:grid-cols-5 md:gap-8" staggerDelay={0.12}>
            {surMesure.process.steps.map((step, index) => (
              <CinemaStaggerItem key={step.number}>
                <ProcessStepCard
                  step={step}
                  index={index}
                  totalSteps={surMesure.process.steps.length}
                  isDesktop={isDesktop}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </CinemaStaggerItem>
            ))}
          </CinemaStagger>
        </div>
      </ColorMorphSection>

      {/* ============ Réalisations Section ============ */}
      <section className="relative py-section bg-kahu-cream overflow-hidden">
        <GrainTexture opacity={0.03} />

        {isDesktop && (
          <AmbientGlow
            color="rgba(92, 107, 74, 0.05)"
            size={400}
            position={{ x: "15%", y: "50%" }}
          />
        )}

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal variant="blur-up">
            <h2 className="font-display text-display-md text-kahu-charcoal text-center">
              {surMesure.realisations.title}
            </h2>
          </SectionReveal>

          <SectionReveal variant="fade-up" delay={0.2}>
            <p className="mt-4 text-body-md text-kahu-taupe text-center max-w-2xl mx-auto">
              {surMesure.realisations.subtitle}
            </p>
          </SectionReveal>

          {/* Réalisation items - Text left, Image right */}
          <div className="mt-16 space-y-16">
            {surMesure.realisations.items.map((item, index) => (
              <SectionReveal key={index} variant="fade-up" delay={0.3}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
                  {/* Text - Left */}
                  <div className="order-2 md:order-1">
                    <h3 className="font-display text-display-sm text-kahu-charcoal">
                      {item.title}
                    </h3>
                    <p className="mt-4 text-body-md text-kahu-taupe leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Image - Right */}
                  <div className="order-1 md:order-2">
                    <motion.div
                      className="aspect-[4/3] bg-kahu-cream-deep rounded-sm overflow-hidden"
                      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                      transition={{ duration: 0.3, ease: EASE.smooth }}
                    >
                      {/* Placeholder image */}
                      <div className="w-full h-full flex items-center justify-center text-kahu-taupe border-2 border-dashed border-kahu-cream-warm">
                        <span className="text-body-sm">Image placeholder</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Project Types Section ============ */}
      <section className="relative py-section bg-kahu-bark overflow-hidden">
        <GrainTexture opacity={0.03} />
        <WoodGrainTexture opacity={0.06} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal variant="blur-up">
            <h2 className="font-display text-display-md text-kahu-cream text-center">
              {surMesure.projectTypes.title}
            </h2>
          </SectionReveal>

          <CinemaStagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
            {surMesure.projectTypes.types.map((type) => (
              <CinemaStaggerItem key={type.title}>
                <ProjectTypeCard type={type} shouldReduceMotion={shouldReduceMotion} />
              </CinemaStaggerItem>
            ))}
          </CinemaStagger>
        </div>
      </section>

      {/* ============ CTA Section ============ */}
      <section className="relative py-section bg-kahu-cream-warm overflow-hidden">
        {isDesktop && (
          <AmbientGlow
            color="rgba(92, 107, 74, 0.05)"
            size={400}
            position={{ x: "50%", y: "50%" }}
          />
        )}

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal variant="blur-up">
            <h2 className="font-display text-display-md text-kahu-charcoal">
              {surMesure.cta.title}
            </h2>
          </SectionReveal>

          <SectionReveal variant="fade-up" delay={0.2}>
            <p className="mt-4 text-body-md text-kahu-taupe">
              {surMesure.cta.subtitle}
            </p>
          </SectionReveal>

          <SectionReveal variant="fade-up" delay={0.4}>
            <motion.div
              className="mt-8"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Button href={generateWhatsAppLink()} external size="lg">
                {dict.common.cta.whatsapp}
              </Button>
            </motion.div>
          </SectionReveal>
        </div>
      </section>
    </main>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

function ProcessStepCard({
  step,
  index,
  totalSteps,
  isDesktop,
  shouldReduceMotion,
}: {
  step: { number: string; title: string; description: string };
  index: number;
  totalSteps: number;
  isDesktop: boolean;
  shouldReduceMotion: boolean;
}) {
  return (
    <div className="relative">
      {/* Connector line (desktop only) */}
      {index < totalSteps - 1 && isDesktop && (
        <motion.div
          className="hidden md:block absolute top-8 left-full w-full h-px bg-kahu-cream-deep -translate-x-4"
          initial={{ scaleX: 0 }}
          whileInView={shouldReduceMotion ? {} : { scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE.cinematic }}
          viewport={{ once: true }}
          style={{ transformOrigin: "left" }}
        />
      )}

      <div className="text-center md:text-left">
        <motion.span
          className="inline-block font-display text-display-sm text-kahu-terracotta"
          whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {step.number}
        </motion.span>
        <h3 className="mt-2 font-display text-body-lg text-kahu-charcoal">
          {step.title}
        </h3>
        <p className="mt-2 text-body-sm text-kahu-taupe">
          {step.description}
        </p>
      </div>
    </div>
  );
}

function ProjectTypeCard({
  type,
  shouldReduceMotion,
}: {
  type: { title: string; description: string };
  shouldReduceMotion: boolean;
}) {
  return (
    <motion.div
      className="p-6 sm:p-8 bg-kahu-bark-soft rounded-sm"
      whileHover={shouldReduceMotion ? {} : {
        scale: 1.02,
        backgroundColor: "rgba(45, 36, 32, 0.95)",
      }}
      transition={{ duration: 0.3, ease: EASE.smooth }}
    >
      <h3 className="font-display text-body-lg text-kahu-ivory">
        {type.title}
      </h3>
      <p className="mt-2 text-body-sm text-kahu-stone-light">
        {type.description}
      </p>
    </motion.div>
  );
}
