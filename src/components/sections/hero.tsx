"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroTitleReveal, WipeReveal } from "@/components/animations/organic-reveal";
import { GrainTexture } from "@/components/animations/floating-shapes";
import { CSS3DGallery } from "@/components/animations/css-3d-gallery";
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

      {/* Layer 1: Galerie CSS 3D ou fallback statique */}
      {!shouldReduceMotion ? (
        <CSS3DGallery />
      ) : (
        <HeroStaticBackground />
      )}

      {/* Layer 2: Grain Texture - Texture subtile par-dessus */}
      <GrainTexture opacity={0.02} />

      {/* Layer 3: Gradient overlay pour lisibilité du texte */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-kahu-cream-deep/60 via-kahu-cream-deep/30 to-kahu-cream-deep/70" />

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
        {/* Logo grand format */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: DURATION.cinematic,
            delay: 0.2,
            ease: EASE.dramatic,
          }}
          className="mb-8"
        >
          <Image
            src="/images/logo.png"
            alt="KAHU"
            width={280}
            height={112}
            className="h-28 sm:h-36 md:h-44 w-auto mx-auto"
            priority
          />
        </motion.div>

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

// ============================================================================
// Hero Static Background - Fallback pour reduced motion / loading
// ============================================================================

function HeroStaticBackground() {
  return (
    <div className="absolute inset-0 z-0">
      {/* Pattern de points subtils */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(139, 58, 58) 1px, transparent 0)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(139, 58, 58, 0.4) 0%, transparent 70%)",
          left: "20%",
          top: "30%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        className="absolute w-[300px] h-[300px] rounded-full blur-3xl opacity-8"
        style={{
          background: "radial-gradient(circle, rgba(92, 107, 74, 0.3) 0%, transparent 70%)",
          right: "20%",
          bottom: "30%",
          transform: "translate(50%, 50%)",
        }}
      />
    </div>
  );
}
