"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, EASE } from "@/lib/animation-config";

// ============================================================================
// HeroOverlay - Cinematic dual-image overlay effect
// Design: Two images that reveal and overlap with dramatic timing
// ============================================================================

interface HeroOverlayProps {
  horizontalImage?: string;
  verticalImage?: string;
  className?: string;
}

export function HeroOverlay({
  horizontalImage = "/images/accueil/portrait.png",
  verticalImage = "/images/accueil/shay.png",
  className,
}: HeroOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms
  const horizontalY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const verticalY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const overallScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  const smoothHorizontalY = useSpring(horizontalY, { stiffness: 50, damping: 20 });
  const smoothVerticalY = useSpring(verticalY, { stiffness: 50, damping: 20 });
  const smoothScale = useSpring(overallScale, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 overflow-hidden", className)}
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-kahu-cream-deep via-kahu-cream to-kahu-cream-warm" />

      {/* Horizontal Image - Reveals first, slides from left */}
      <motion.div
        className="absolute inset-0 z-[1]"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={isLoaded ? { clipPath: "inset(0 0% 0 0)" } : {}}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.4,
          delay: 0.3,
          ease: EASE.dramatic,
        }}
        style={
          shouldReduceMotion || !isDesktop
            ? {}
            : { y: smoothHorizontalY, scale: smoothScale }
        }
      >
        {/* Image container with aspect ratio */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[85%] md:w-[70%] lg:w-[60%] aspect-[16/10] rounded-sm overflow-hidden shadow-2xl shadow-kahu-bark/20">
            {/* Image horizontale */}
            <Image
              src={horizontalImage}
              alt="KAHU Studio - Atelier"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 85vw, (max-width: 1024px) 70vw, 60vw"
            />

            {/* Subtle inner shadow */}
            <div className="absolute inset-0 shadow-inner pointer-events-none" />

            {/* Ambient light reflection */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none"
              animate={shouldReduceMotion ? {} : {
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Vertical Image - Reveals second, overlays from top */}
      <motion.div
        className="absolute inset-0 z-[2]"
        initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        animate={isLoaded ? { clipPath: "inset(0 0 0% 0)", opacity: 1 } : {}}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.2,
          delay: 1.0,
          ease: EASE.dramatic,
        }}
        style={
          shouldReduceMotion || !isDesktop
            ? {}
            : { y: smoothVerticalY }
        }
      >
        {/* Positioned offset for overlap effect */}
        <div className="absolute inset-0 flex items-center justify-end pr-[5%] md:pr-[10%] lg:pr-[15%]">
          <motion.div
            className="relative w-[45%] md:w-[35%] lg:w-[28%] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl shadow-kahu-charcoal/30"
            initial={{ y: -30, rotate: -2 }}
            animate={isLoaded ? { y: 0, rotate: 0 } : {}}
            transition={{
              duration: 1.0,
              delay: 1.3,
              ease: EASE.reveal,
            }}
          >
            {/* Image verticale */}
            <Image
              src={verticalImage}
              alt="KAHU Studio - Creation"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 45vw, (max-width: 1024px) 35vw, 28vw"
            />

            {/* Frame border effect */}
            <div className="absolute inset-2 border border-kahu-ivory/20 rounded-sm pointer-events-none" />

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"
              initial={{ x: "-100%", y: "-100%" }}
              animate={isLoaded && !shouldReduceMotion ? { x: "100%", y: "100%" } : {}}
              transition={{
                duration: 1.5,
                delay: 1.8,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <HeroDecorativeElements isLoaded={isLoaded} shouldReduceMotion={shouldReduceMotion} />

      {/* Vignette overlay for depth */}
      <div className="absolute inset-0 z-[3] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(45,36,32,0.15)_100%)]" />
    </div>
  );
}

// ============================================================================
// Decorative Elements
// ============================================================================

function HeroDecorativeElements({
  isLoaded,
  shouldReduceMotion,
}: {
  isLoaded: boolean;
  shouldReduceMotion: boolean;
}) {
  return (
    <>
      {/* Floating accent line - horizontal */}
      <motion.div
        className="absolute left-[10%] top-[20%] w-24 h-px bg-gradient-to-r from-kahu-terracotta/40 to-transparent z-[4]"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isLoaded ? { scaleX: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.8,
          delay: 2.0,
          ease: KAHU_EASE,
        }}
        style={{ originX: 0 }}
      />

      {/* Floating accent line - vertical */}
      <motion.div
        className="absolute right-[8%] bottom-[25%] w-px h-20 bg-gradient-to-b from-kahu-olive/40 to-transparent z-[4]"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={isLoaded ? { scaleY: 1, opacity: 1 } : {}}
        transition={{
          duration: 0.8,
          delay: 2.2,
          ease: KAHU_EASE,
        }}
        style={{ originY: 0 }}
      />

      {/* Corner accent - top left */}
      <motion.div
        className="absolute top-[15%] left-[8%] z-[4]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: 2.4,
          ease: KAHU_EASE,
        }}
      >
        <div className="w-8 h-8 border-l-2 border-t-2 border-kahu-bark/20" />
      </motion.div>

      {/* Corner accent - bottom right */}
      <motion.div
        className="absolute bottom-[18%] right-[12%] z-[4]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: 2.5,
          ease: KAHU_EASE,
        }}
      >
        <div className="w-8 h-8 border-r-2 border-b-2 border-kahu-bark/20" />
      </motion.div>

      {/* Ambient particles */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-kahu-terracotta/20 z-[4]"
            style={{ left: "25%", top: "35%" }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-kahu-olive/20 z-[4]"
            style={{ right: "30%", bottom: "40%" }}
            animate={{
              y: [0, 15, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}
    </>
  );
}

// ============================================================================
// Alternative: HeroOverlaySimple - Simpler version without clip-path
// ============================================================================

export function HeroOverlaySimple({
  horizontalImage = "/images/accueil/portrait.png",
  verticalImage = "/images/accueil/shay.png",
  className,
}: HeroOverlayProps) {
  const shouldReduceMotion = usePrefersReducedMotion();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* Base */}
      <div className="absolute inset-0 bg-kahu-cream-deep" />

      {/* Horizontal image - fades and slides in */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={isLoaded ? { opacity: 1, x: 0 } : {}}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.2,
          delay: 0.2,
          ease: EASE.dramatic,
        }}
      >
        <div className="relative w-[75%] md:w-[60%] aspect-[16/10] rounded-sm overflow-hidden bg-gradient-to-br from-kahu-bark/30 to-kahu-taupe/20 shadow-xl" />
      </motion.div>

      {/* Vertical image - fades and slides down */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end pr-[10%] md:pr-[15%]"
        initial={{ opacity: 0, y: -50 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{
          duration: shouldReduceMotion ? 0 : 1.0,
          delay: 0.8,
          ease: EASE.reveal,
        }}
      >
        <div className="relative w-[40%] md:w-[30%] aspect-[3/4] rounded-sm overflow-hidden bg-gradient-to-br from-kahu-charcoal/40 to-kahu-bark/30 shadow-2xl" />
      </motion.div>
    </div>
  );
}

// ============================================================================
// HeroOverlayWithContent - Full hero section with overlay and content
// ============================================================================

interface HeroOverlayWithContentProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  horizontalImage?: string;
  verticalImage?: string;
}

export function HeroOverlayWithContent({
  title = "KAHU Studio",
  subtitle = "Design mobilier artisanal",
  ctaText = "Découvrir les créations",
  ctaHref = "/fr/objet",
  secondaryCtaText = "L'Atelier",
  secondaryCtaHref = "/fr/atelier",
  horizontalImage = "/images/accueil/portrait.png",
  verticalImage = "/images/accueil/shay.png",
}: HeroOverlayWithContentProps) {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imagesY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const smoothImagesY = useSpring(imagesY, { stiffness: 50, damping: 20 });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-kahu-cream-deep"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(45, 36, 32) 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      {/* Main content grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 lg:pt-32 lg:pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Text content */}
          <motion.div
            className="order-2 lg:order-1 text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE.reveal }}
          >
            {/* Title */}
            <motion.h1
              className="font-display text-display-xl text-kahu-charcoal tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: EASE.reveal }}
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-body-lg text-kahu-taupe max-w-md mx-auto lg:mx-0 leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: EASE.reveal }}
            >
              {subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE.reveal }}
            >
              <a
                href={ctaHref}
                className="inline-flex items-center gap-2 px-8 py-4 bg-kahu-charcoal text-kahu-ivory text-body-md font-medium rounded-sm hover:bg-kahu-bark transition-colors"
              >
                {ctaText}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
              <a
                href={secondaryCtaHref}
                className="inline-flex items-center gap-2 px-8 py-4 text-kahu-charcoal text-body-md font-medium rounded-sm border border-kahu-charcoal/20 hover:bg-kahu-cream/50 transition-colors"
              >
                {secondaryCtaText}
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Images superposées */}
          <motion.div
            className="order-1 lg:order-2 relative"
            style={shouldReduceMotion || !isDesktop ? {} : { y: smoothImagesY }}
          >
            <div className="relative w-full aspect-[4/5] lg:aspect-[3/4]">
              {/* Image principale (portrait) */}
              <motion.div
                className="absolute top-0 left-0 w-[80%] lg:w-[75%] aspect-[4/5] rounded-sm overflow-hidden shadow-2xl shadow-kahu-bark/20"
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.0, delay: 0.4, ease: EASE.dramatic }}
              >
                <Image
                  src={horizontalImage}
                  alt="KAHU Studio - Atelier"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 80vw, 40vw"
                />
              </motion.div>

              {/* Image secondaire (shay) - chevauche */}
              <motion.div
                className="absolute bottom-0 right-0 w-[55%] lg:w-[50%] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl shadow-kahu-charcoal/30"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.0, delay: 0.7, ease: EASE.dramatic }}
              >
                <Image
                  src={verticalImage}
                  alt="KAHU Studio - Création"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 55vw, 25vw"
                />
                {/* Frame border */}
                <div className="absolute inset-2 border border-kahu-ivory/20 rounded-sm pointer-events-none" />
              </motion.div>

              {/* Accent décoratif */}
              <motion.div
                className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-kahu-terracotta/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2, ease: KAHU_EASE }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-kahu-bark/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            className="w-1 h-2 bg-kahu-terracotta/60 rounded-full"
            animate={shouldReduceMotion ? {} : {
              y: [0, 12, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-kahu-cream-warm to-transparent pointer-events-none z-[6]" />
    </section>
  );
}
