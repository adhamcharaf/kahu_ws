"use client";

import { motion } from "framer-motion";
import {
  SectionReveal,
  ScrollParallax,
  CinemaStagger,
  CinemaStaggerItem,
  ColorMorphSection,
  CinematicHeader,
} from "@/components/animations/scroll-cinema";
import { GrainTexture, AmbientGlow } from "@/components/animations/floating-shapes";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { DURATION, EASE, DELAY } from "@/lib/animation-config";

// ============================================================================
// Atelier Content - Version animee Apple-style
// ============================================================================

export function AtelierContent() {
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  return (
    <main className="pt-20">
      {/* ============ Hero Section avec CinematicHeader ============ */}
      <section className="relative py-section bg-kahu-cream-deep overflow-hidden">
        <GrainTexture opacity={0.02} />

        {isDesktop && (
          <AmbientGlow
            color="rgba(139, 58, 58, 0.06)"
            size={500}
            position={{ x: "70%", y: "50%" }}
          />
        )}

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <CinematicHeader
              title="L'Atelier"
              subtitle="KAHU Studio est ne de la passion pour le bois et l'artisanat. Chaque piece qui sort de notre atelier raconte une histoire, celle d'un materiau noble transforme avec respect et intention."
            />
          </div>
        </div>
      </section>

      {/* ============ Mouna Section avec Parallax ============ */}
      <ColorMorphSection
        className="py-section overflow-hidden"
        fromColor="var(--color-kahu-cream-warm)"
        toColor="var(--color-kahu-cream)"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Portrait avec effet parallax */}
            <ScrollParallax factor={0.2}>
              <SectionReveal variant="fade-scale">
                <div className="aspect-[3/4] bg-kahu-cream-deep rounded-sm overflow-hidden">
                  {/* Placeholder for portrait image */}
                  <motion.div
                    className="w-full h-full bg-gradient-to-br from-kahu-terracotta/5 to-kahu-olive/5"
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    transition={{ duration: 0.6, ease: EASE.cinematic }}
                  />
                </div>
              </SectionReveal>
            </ScrollParallax>

            {/* Text avec reveal */}
            <div>
              <SectionReveal variant="slide-right" delay={0.2}>
                <h2 className="font-display text-display-md text-kahu-charcoal">
                  Shaima Mouna
                </h2>
                <p className="mt-2 text-body-sm text-kahu-taupe uppercase tracking-wider">
                  Designer produit & Ebeniste
                </p>
              </SectionReveal>

              <SectionReveal variant="fade-up" delay={0.4}>
                <div className="mt-6 space-y-4 text-body-md text-kahu-bark leading-relaxed">
                  <p>
                    Formee au design produit et a l&apos;ebenisterie, Shaima a fonde
                    KAHU Studio avec une vision claire : creer des pieces qui
                    durent, qui ont une ame, et qui s&apos;integrent naturellement
                    dans les espaces de vie.
                  </p>
                  <p>
                    Chaque creation est pensee comme une sculpture fonctionnelle,
                    ou la beaute du materiau brut rencontre l&apos;intention du design.
                  </p>
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </ColorMorphSection>

      {/* ============ Origin of KAHU - Section dramatique ============ */}
      <section className="relative py-section bg-kahu-bark overflow-hidden">
        <GrainTexture opacity={0.03} />

        {isDesktop && (
          <>
            <AmbientGlow
              color="rgba(255, 248, 240, 0.03)"
              size={400}
              position={{ x: "20%", y: "30%" }}
            />
            <AmbientGlow
              color="rgba(139, 58, 58, 0.05)"
              size={300}
              position={{ x: "80%", y: "70%" }}
            />
          </>
        )}

        <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal variant="blur-up">
            <motion.h2
              className="font-display text-display-sm text-kahu-cream"
              initial={{ letterSpacing: "0.05em" }}
              whileInView={shouldReduceMotion ? {} : { letterSpacing: "0.1em" }}
              transition={{ duration: 1.2, ease: EASE.dramatic }}
              viewport={{ once: true }}
            >
              L&apos;origine du nom
            </motion.h2>
          </SectionReveal>

          <SectionReveal variant="fade-up" delay={0.3}>
            <p className="mt-6 text-body-lg text-kahu-stone-light leading-relaxed">
              <motion.span
                className="text-kahu-ivory font-medium"
                initial={{ opacity: 0.7 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                KAHU
              </motion.span>{" "}
              est la contraction de{" "}
              <span className="text-kahu-ivory">Ka</span>rina et{" "}
              <span className="text-kahu-ivory">Hu</span>ssein, les parents de
              Mouna. Un hommage a ceux qui lui ont transmis le gout du beau, du
              bien fait, et l&apos;importance de creer avec le coeur.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ============ Philosophy avec ColorMorph ============ */}
      <ColorMorphSection
        className="py-section"
        fromColor="var(--color-kahu-cream-warm)"
        toColor="var(--color-kahu-cream-deep)"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <SectionReveal variant="blur-up">
              <h2 className="font-display text-display-md text-kahu-charcoal">
                Notre philosophie
              </h2>
            </SectionReveal>

            <SectionReveal variant="fade-up" delay={0.2}>
              <div className="mt-8 space-y-6 text-body-md text-kahu-bark leading-relaxed">
                <p>
                  Chez KAHU, nous croyons que le mobilier doit etre plus qu&apos;un
                  objet utilitaire. Il doit porter en lui une intention, une
                  histoire, une presence.
                </p>
                <p>
                  Nous travaillons principalement avec des essences locales,
                  selectionnees pour leur beaute naturelle et leur durabilite.
                  Chaque piece est fabriquee a la main dans notre atelier
                  d&apos;Abidjan, avec un soin particulier apporte aux finitions.
                </p>
              </div>
            </SectionReveal>
          </div>
        </div>
      </ColorMorphSection>

      {/* ============ Process avec Stagger Grid ============ */}
      <section className="relative py-section bg-kahu-cream-deep overflow-hidden">
        <GrainTexture opacity={0.015} />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal variant="blur-up">
            <h2 className="font-display text-display-md text-kahu-charcoal text-center">
              Le processus creatif
            </h2>
          </SectionReveal>

          <CinemaStagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {/* Step 1 */}
            <CinemaStaggerItem>
              <ProcessStep
                number={1}
                title="Conception"
                description="Chaque piece commence par un dessin, une reflexion sur la fonction et la forme."
              />
            </CinemaStaggerItem>

            {/* Step 2 */}
            <CinemaStaggerItem>
              <ProcessStep
                number={2}
                title="Selection"
                description="Le choix du bois est crucial. Nous selectionnons chaque planche pour ses veines, sa couleur, son caractere."
              />
            </CinemaStaggerItem>

            {/* Step 3 */}
            <CinemaStaggerItem>
              <ProcessStep
                number={3}
                title="Fabrication"
                description="A la main, avec patience et precision. Chaque detail compte, chaque finition est soignee."
              />
            </CinemaStaggerItem>
          </CinemaStagger>
        </div>
      </section>

      {/* ============ Gallery avec Stagger Grid ============ */}
      <section className="relative py-section bg-kahu-cream-warm overflow-hidden">
        {isDesktop && (
          <AmbientGlow
            color="rgba(92, 107, 74, 0.04)"
            size={600}
            position={{ x: "50%", y: "50%" }}
          />
        )}

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal variant="fade-up">
            <h2 className="font-display text-display-md text-kahu-charcoal text-center">
              L&apos;atelier en images
            </h2>
          </SectionReveal>

          <CinemaStagger className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4" staggerDelay={0.1}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <CinemaStaggerItem key={i}>
                <GalleryItem index={i} />
              </CinemaStaggerItem>
            ))}
          </CinemaStagger>
        </div>
      </section>
    </main>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

function ProcessStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <div className="text-center group">
      <motion.div
        className="w-16 h-16 mx-auto rounded-full bg-kahu-terracotta/10 flex items-center justify-center"
        whileHover={shouldReduceMotion ? {} : { scale: 1.1, backgroundColor: "rgba(139, 58, 58, 0.2)" }}
        transition={{ duration: 0.3, ease: EASE.smooth }}
      >
        <span className="font-display text-display-sm text-kahu-terracotta">
          {number}
        </span>
      </motion.div>
      <h3 className="mt-4 font-display text-body-lg text-kahu-charcoal">
        {title}
      </h3>
      <p className="mt-2 text-body-sm text-kahu-taupe">
        {description}
      </p>
    </div>
  );
}

function GalleryItem({ index }: { index: number }) {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className="aspect-square bg-kahu-cream-deep rounded-sm overflow-hidden cursor-pointer"
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      transition={{ duration: 0.4, ease: EASE.cinematic }}
    >
      <motion.div
        className="w-full h-full bg-gradient-to-br from-kahu-terracotta/5 to-kahu-olive/5"
        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
        transition={{ duration: 0.6, ease: EASE.cinematic }}
      />
    </motion.div>
  );
}
