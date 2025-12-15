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
import { GrainTexture, AmbientGlow } from "@/components/animations/floating-shapes";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { EASE, DURATION } from "@/lib/animation-config";

// ============================================================================
// Sur-mesure Content - Version animee Apple-style
// ============================================================================

const processSteps = [
  {
    number: "01",
    title: "Premiere rencontre",
    description:
      "Nous echangeons sur votre projet, vos envies, vos contraintes d'espace et de budget. C'est le moment de partager vos inspirations.",
  },
  {
    number: "02",
    title: "Conception",
    description:
      "Nous elaborons des esquisses et propositions. Ensemble, nous affinons le design jusqu'a obtenir la piece parfaite.",
  },
  {
    number: "03",
    title: "Selection des materiaux",
    description:
      "Nous vous presentons les essences de bois disponibles. Vous participez au choix du materiau qui donnera vie a votre piece.",
  },
  {
    number: "04",
    title: "Fabrication",
    description:
      "Votre piece prend forme dans notre atelier. Nous vous tenons informe de l'avancement et partageons des photos du processus.",
  },
  {
    number: "05",
    title: "Livraison & Installation",
    description:
      "Nous livrons et installons votre piece chez vous. Le moment ou votre vision devient realite.",
  },
];

const projectTypes = [
  {
    title: "Mobilier d'interieur",
    description:
      "Tables, chaises, rangements, bibliotheques... Tout ce qui fait l'ame de votre interieur.",
  },
  {
    title: "Amenagement d'espaces",
    description:
      "Cuisines, dressings, bureaux. Des solutions sur-mesure qui optimisent votre espace.",
  },
  {
    title: "Pieces sculpturales",
    description:
      "Des creations uniques qui deviennent le point focal de votre espace.",
  },
  {
    title: "Restauration",
    description:
      "Redonner vie a vos pieces anciennes tout en preservant leur caractere.",
  },
];

export function SurMesureContent() {
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  return (
    <main className="pt-20">
      {/* ============ Hero Section ============ */}
      <section className="relative py-section bg-kahu-cream-deep overflow-hidden">
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
              title="Sur-mesure"
              subtitle="Parce que chaque espace est unique, chaque piece devrait l'etre aussi. Creez avec nous le mobilier qui vous ressemble, adapte a vos besoins et a votre interieur."
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
              Le processus
            </h2>
          </SectionReveal>

          <SectionReveal variant="fade-up" delay={0.2}>
            <p className="mt-4 text-body-md text-kahu-taupe text-center max-w-2xl mx-auto">
              De l&apos;idee a la realisation, nous vous accompagnons a chaque etape
              pour creer la piece parfaite.
            </p>
          </SectionReveal>

          <CinemaStagger className="mt-16 space-y-12 md:space-y-0 md:grid md:grid-cols-5 md:gap-8" staggerDelay={0.12}>
            {processSteps.map((step, index) => (
              <CinemaStaggerItem key={step.number}>
                <ProcessStepCard step={step} index={index} totalSteps={processSteps.length} />
              </CinemaStaggerItem>
            ))}
          </CinemaStagger>
        </div>
      </ColorMorphSection>

      {/* ============ Project Types Section ============ */}
      <section className="relative py-section bg-kahu-bark overflow-hidden">
        <GrainTexture opacity={0.03} />

        {isDesktop && (
          <>
            <AmbientGlow
              color="rgba(255, 248, 240, 0.04)"
              size={400}
              position={{ x: "20%", y: "30%" }}
            />
            <AmbientGlow
              color="rgba(139, 58, 58, 0.06)"
              size={350}
              position={{ x: "80%", y: "70%" }}
            />
          </>
        )}

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionReveal variant="blur-up">
            <h2 className="font-display text-display-md text-kahu-cream text-center">
              Types de projets
            </h2>
          </SectionReveal>

          <CinemaStagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6" staggerDelay={0.1}>
            {projectTypes.map((type) => (
              <CinemaStaggerItem key={type.title}>
                <ProjectTypeCard type={type} />
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
              Vous avez un projet ?
            </h2>
          </SectionReveal>

          <SectionReveal variant="fade-up" delay={0.2}>
            <p className="mt-4 text-body-md text-kahu-taupe">
              Discutons de votre vision. Chaque projet commence par une
              conversation.
            </p>
          </SectionReveal>

          <SectionReveal variant="fade-up" delay={0.4}>
            <motion.div
              className="mt-8"
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <Button href={generateWhatsAppLink()} external size="lg">
                Discuter de mon projet
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
}: {
  step: { number: string; title: string; description: string };
  index: number;
  totalSteps: number;
}) {
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

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

function ProjectTypeCard({ type }: { type: { title: string; description: string } }) {
  const shouldReduceMotion = usePrefersReducedMotion();

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
