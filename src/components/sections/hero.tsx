"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { HeroTitleReveal, WipeReveal } from "@/components/animations/organic-reveal";
import { FloatingShapes, GrainTexture, AmbientGlow } from "@/components/animations/floating-shapes";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, DELAY, SPRING, EASE } from "@/lib/animation-config";

// ============================================================================
// Hero Section - Première impression spectaculaire
// "Le site respire comme le bois"
// ============================================================================

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  // Parallax scroll pour le contenu
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Effets parallax cinematiques Apple-style
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const contentBlur = useTransform(scrollYProgress, [0, 0.4], [0, 8]);

  const smoothY = useSpring(contentY, SPRING.parallax);
  const smoothOpacity = useSpring(contentOpacity, SPRING.parallax);
  const smoothScale = useSpring(contentScale, SPRING.parallax);

  // Parallax du background - plus prononce
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const smoothBgY = useSpring(bgY, SPRING.parallax);
  const smoothBgScale = useSpring(bgScale, SPRING.parallax);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-kahu-cream-deep overflow-hidden"
    >
      {/* ============ Background Layers ============ */}

      {/* Grain Texture - Texture subtile */}
      <GrainTexture opacity={0.025} />

      {/* Floating Shapes - Formes organiques */}
      <FloatingShapes
        count={3}
        color="rgb(139, 58, 58)" // terracotta
        opacity={0.04}
        size="lg"
      />

      {/* Ambient Glow - Lueur chaleureuse */}
      {isDesktop && (
        <>
          <AmbientGlow
            color="rgba(139, 58, 58, 0.08)"
            size={600}
            position={{ x: "20%", y: "30%" }}
          />
          <AmbientGlow
            color="rgba(92, 107, 74, 0.05)"
            size={400}
            position={{ x: "80%", y: "70%" }}
          />
        </>
      )}

      {/* Background Pattern - Points subtils avec parallax et scale */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          y: shouldReduceMotion || !isDesktop ? 0 : smoothBgY,
          scale: shouldReduceMotion || !isDesktop ? 1 : smoothBgScale,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </motion.div>

      {/* ============ Main Content avec Scroll Zoom Apple-style ============ */}
      <motion.div
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        style={
          shouldReduceMotion || !isDesktop
            ? {}
            : {
                y: smoothY,
                opacity: smoothOpacity,
                scale: smoothScale,
              }
        }
      >
        {/* Titre principal avec révélation caractère par caractère */}
        <HeroTitleReveal
          title="KAHU Studio"
          titleClassName="font-display text-display-xl text-kahu-charcoal tracking-tight"
          className="mb-6"
        />

        {/* Sous-titre avec effet wipe - timing dramatique */}
        <WipeReveal delay={DELAY.hero.subtitle} direction="up">
          <p className="text-body-lg text-kahu-taupe max-w-xl mx-auto leading-relaxed">
            Design mobilier artisanal à Abidjan.
            <br className="hidden sm:block" />
            Des pièces uniques qui racontent une histoire.
          </p>
        </WipeReveal>

        {/* Boutons CTA avec stagger cinematique */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DURATION.cinematic,
            delay: DELAY.hero.buttons,
            ease: EASE.dramatic,
          }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: DELAY.hero.buttons,
              duration: DURATION.slow,
              ease: EASE.reveal,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button href="/creations" size="lg">
              Découvrir les créations
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: DELAY.hero.buttons + 0.15,
              duration: DURATION.slow,
              ease: EASE.reveal,
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button href="/atelier" variant="ghost" size="lg">
              L&apos;Atelier
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ============ Scroll Indicator ============ */}
      <ScrollIndicator />

      {/* ============ Bottom Gradient Fade ============ */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-kahu-cream-warm to-transparent pointer-events-none" />
    </section>
  );
}

// ============================================================================
// Scroll Indicator Component
// ============================================================================

function ScrollIndicator() {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: DELAY.hero.scroll,
        duration: DURATION.cinematic,
        ease: EASE.cinematic,
      }}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
    >
      {/* Texte "Scroll" */}
      <motion.span
        className="text-caption text-kahu-taupe/60 uppercase tracking-[0.2em]"
        animate={shouldReduceMotion ? {} : {
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Scroll
      </motion.span>

      {/* Indicateur animé */}
      <motion.div
        className="w-6 h-10 border-2 border-kahu-bark/20 rounded-full flex justify-center relative overflow-hidden"
        whileHover={{ borderColor: "rgba(45, 36, 32, 0.4)" }}
      >
        {/* Bille qui descend */}
        <motion.div
          className="w-1.5 h-1.5 bg-kahu-terracotta/60 rounded-full absolute top-2"
          animate={shouldReduceMotion ? {} : {
            y: [0, 16, 0],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        {/* Trail effect */}
        <motion.div
          className="absolute top-2 w-0.5 bg-gradient-to-b from-kahu-terracotta/30 to-transparent rounded-full"
          animate={shouldReduceMotion ? {} : {
            height: [0, 16, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.1,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ============================================================================
// Alternative Hero Variants (pour A/B testing ou autres pages)
// ============================================================================

interface MinimalHeroProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
}

export function MinimalHero({
  title,
  subtitle,
  ctaText = "Découvrir",
  ctaHref = "/creations",
}: MinimalHeroProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-kahu-cream-deep overflow-hidden">
      <GrainTexture opacity={0.02} />

      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <motion.h1
          className="font-display text-display-lg text-kahu-charcoal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.slow, ease: KAHU_EASE }}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            className="mt-4 text-body-md text-kahu-taupe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: DURATION.normal }}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: DURATION.normal }}
          className="mt-8"
        >
          <Button href={ctaHref}>{ctaText}</Button>
        </motion.div>
      </div>
    </section>
  );
}
