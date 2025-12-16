"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/animations/text-reveal";
import { ParallaxWrapper } from "@/components/animations/parallax-wrapper";
import { generateWhatsAppLink } from "@/lib/utils";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, VIEWPORT } from "@/lib/animation-config";

// ============================================================================
// Custom CTA - Section sur-mesure avec animations artistiques
// "L'invitation à créer ensemble"
// ============================================================================

interface CustomCTAProps {
  /** Image optionnelle */
  imageSrc?: string;
}

export function CustomCTA({ imageSrc }: CustomCTAProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, VIEWPORT.default);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  // Monter côté client pour éviter hydration mismatch
  const [mounted, setMounted] = useState(false);
  const isDesktopValue = mounted ? isDesktop : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, x: -40, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: DURATION.slow,
        ease: KAHU_EASE,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: DURATION.slow,
        ease: KAHU_EASE,
        delay: 0.2,
      },
    },
  };

  return (
    <section ref={ref} className="py-section bg-kahu-cream-deep overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image with parallax and reveal */}
          <motion.div
            variants={shouldReduceMotion ? {} : imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            {isDesktopValue && !shouldReduceMotion ? (
              <ParallaxWrapper speed={0.3} className="aspect-[4/3]">
                <div className="relative w-full h-full bg-kahu-cream rounded-sm overflow-hidden">
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt="Projet sur-mesure KAHU"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-kahu-cream to-kahu-cream-deep">
                      {/* Placeholder pattern */}
                      <svg
                        className="absolute inset-0 w-full h-full opacity-20"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        <pattern id="wood-grain" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path
                            d="M0 10 Q5 8 10 10 T20 10"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="0.5"
                            className="text-kahu-bark"
                          />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#wood-grain)" />
                      </svg>
                    </div>
                  )}

                  {/* Decorative corner accent */}
                  <motion.div
                    className="absolute bottom-0 right-0 w-24 h-24 bg-kahu-terracotta/10"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.6, duration: DURATION.normal, ease: KAHU_EASE }}
                    style={{
                      clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                    }}
                  />
                </div>
              </ParallaxWrapper>
            ) : (
              <div className="relative aspect-[4/3] bg-kahu-cream rounded-sm overflow-hidden">
                {imageSrc ? (
                  <Image
                    src={imageSrc}
                    alt="Projet sur-mesure KAHU"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-kahu-cream to-kahu-cream-deep" />
                )}
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            variants={shouldReduceMotion ? {} : contentVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-1 lg:order-2"
          >
            {/* Title with text reveal */}
            <div className="overflow-hidden">
              {shouldReduceMotion ? (
                <h2 className="font-display text-display-md text-kahu-charcoal">
                  Un projet sur-mesure ?
                </h2>
              ) : (
                <h2 className="font-display text-display-md text-kahu-charcoal">
                  <TextReveal
                    text="Un projet sur-mesure ?"
                    mode="word"
                    charDelay={0.08}
                    delay={0.3}
                  />
                </h2>
              )}
            </div>

            {/* Description with staggered lines */}
            <motion.p
              className="mt-4 text-body-md text-kahu-taupe leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: DURATION.normal, ease: KAHU_EASE }}
            >
              Parce que chaque espace est unique, chaque piece devrait l&apos;etre
              aussi. Creez avec nous le mobilier qui vous ressemble, adapte a
              vos besoins et a votre interieur.
            </motion.p>

            {/* Benefits list */}
            <motion.ul
              className="mt-6 space-y-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: DURATION.normal }}
            >
              {[
                "Consultation personnalisee",
                "Materiaux nobles selectionnes",
                "Fabrication artisanale",
              ].map((benefit, index) => (
                <motion.li
                  key={benefit}
                  className="flex items-center gap-3 text-body-sm text-kahu-bark"
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    delay: 0.9 + index * 0.1,
                    duration: DURATION.fast,
                    ease: KAHU_EASE,
                  }}
                >
                  <motion.span
                    className="w-1.5 h-1.5 rounded-full bg-kahu-terracotta"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{
                      delay: 0.9 + index * 0.1,
                      duration: DURATION.fast,
                      type: "spring",
                      stiffness: 500,
                    }}
                  />
                  {benefit}
                </motion.li>
              ))}
            </motion.ul>

            {/* CTAs */}
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: DURATION.normal, ease: KAHU_EASE }}
            >
              <Button href="/sur-mesure" variant="primary">
                Decouvrir le processus
              </Button>
              <Button href={generateWhatsAppLink()} external variant="secondary">
                Discuter de mon projet
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
