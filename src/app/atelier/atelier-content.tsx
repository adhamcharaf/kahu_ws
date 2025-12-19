"use client";

import { motion } from "framer-motion";
import {
  SectionReveal,
  CinemaStagger,
  CinemaStaggerItem,
  ColorMorphSection,
  CinematicHeader,
} from "@/components/animations/scroll-cinema";
import { GrainTexture, AmbientGlow } from "@/components/animations/floating-shapes";
import { ArtGallerySlider } from "@/components/art-gallery-slider";
import { MasonryGallery } from "@/components/galleries";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { DURATION, EASE, DELAY } from "@/lib/animation-config";
import { atelierArtworks } from "@/data/artworks";
import { atelierImages } from "@/data/atelier-images";

// ============================================================================
// Atelier Content - Version animée Apple-style
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
              subtitle="KAHU Studio est né de la passion pour le bois et l'artisanat. Chaque pièce qui sort de notre atelier raconte une histoire, celle d'un matériau noble transformé avec respect et intention."
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
            {/* Slider galerie atelier */}
            <SectionReveal variant="fade-scale">
              <ArtGallerySlider
                artworks={atelierArtworks}
                className="rounded-sm overflow-hidden"
              />
            </SectionReveal>

            {/* Text avec reveal */}
            <div>
              <SectionReveal variant="slide-right" delay={0.2}>
                <h2 className="font-display text-display-md text-kahu-charcoal">
                  Shaima Mouna
                </h2>
                <p className="mt-2 text-body-sm text-kahu-taupe uppercase tracking-wider">
                  Designer produit & Ébéniste
                </p>
              </SectionReveal>

              <SectionReveal variant="fade-up" delay={0.4}>
                <div className="mt-6 space-y-4 text-body-md text-kahu-bark leading-relaxed">
                  <p>
                    Formée au design produit et à l&apos;ébénisterie, Shaima a fondé
                    KAHU Studio avec une vision claire : créer des pièces qui
                    durent, qui ont une âme, et qui s&apos;intègrent naturellement
                    dans les espaces de vie.
                  </p>
                  <p>
                    Chaque création est pensée comme une sculpture fonctionnelle,
                    où la beauté du matériau brut rencontre l&apos;intention du design.
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
              Mouna. Un hommage à ceux qui lui ont transmis le goût du beau, du
              bien fait, et l&apos;importance de créer avec le cœur.
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
                  Chez KAHU, nous croyons que le mobilier doit être plus qu&apos;un
                  objet utilitaire. Il doit porter en lui une intention, une
                  histoire, une présence.
                </p>
                <p>
                  Nous travaillons principalement avec des essences locales,
                  sélectionnées pour leur beauté naturelle et leur durabilité.
                  Chaque pièce est fabriquée à la main dans notre atelier
                  d&apos;Abidjan, avec un soin particulier apporté aux finitions.
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
              Le processus créatif
            </h2>
          </SectionReveal>

          <CinemaStagger className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
            {/* Step 1 */}
            <CinemaStaggerItem>
              <ProcessStep
                number={1}
                title="Conception"
                description="Chaque pièce commence par un dessin, une réflexion sur la fonction et la forme."
              />
            </CinemaStaggerItem>

            {/* Step 2 */}
            <CinemaStaggerItem>
              <ProcessStep
                number={2}
                title="Sélection"
                description="Le choix du bois est crucial. Nous sélectionnons chaque planche pour ses veines, sa couleur, son caractère."
              />
            </CinemaStaggerItem>

            {/* Step 3 */}
            <CinemaStaggerItem>
              <ProcessStep
                number={3}
                title="Fabrication"
                description="À la main, avec patience et précision. Chaque détail compte, chaque finition est soignée."
              />
            </CinemaStaggerItem>
          </CinemaStagger>
        </div>
      </section>

      {/* ============ Masonry Gallery Parallax ============ */}
      <section className="relative bg-kahu-bark overflow-hidden">
        <GrainTexture opacity={0.02} />

        {/* Titre en overlay */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-12 pb-8 bg-gradient-to-b from-kahu-bark via-kahu-bark/80 to-transparent">
          <SectionReveal variant="fade-up">
            <h2 className="font-display text-display-md text-kahu-cream text-center">
              L&apos;atelier en images
            </h2>
          </SectionReveal>
        </div>

        {/* Galerie masonry avec défilement parallax */}
        <MasonryGallery
          images={atelierImages}
          height="85vh"
          baseDuration={60}
          durationIncrement={5}
          enableLightbox
        />

        {/* Gradient de fondu en bas */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-kahu-bark to-transparent pointer-events-none" />
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

