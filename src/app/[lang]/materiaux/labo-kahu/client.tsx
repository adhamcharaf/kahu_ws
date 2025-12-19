"use client";

import { type Locale } from "@/lib/i18n/config";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { KAHU_EASE, DURATION } from "@/lib/animation-config";

interface LaboKahuClientProps {
  lang: Locale;
  dict: {
    title: string;
    subtitle: string;
    heroText: string;
    sections: {
      research: { title: string; description: string };
      prototyping: { title: string; description: string };
      collaboration: { title: string; description: string };
    };
  };
  parentTitle: string;
}

function LaboSection({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="group relative p-8 bg-kahu-cream rounded-sm border border-kahu-cream-deep hover:border-kahu-cream-deep/80 transition-all duration-500 hover:shadow-lg hover:shadow-kahu-bark/5"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: DURATION.slow,
        delay: index * 0.15,
        ease: KAHU_EASE,
      }}
    >
      {/* Icon */}
      <motion.div
        className="w-16 h-16 mb-6 rounded-sm bg-kahu-cream-deep flex items-center justify-center text-kahu-bark group-hover:bg-kahu-bark group-hover:text-kahu-ivory transition-colors duration-500"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        {icon}
      </motion.div>

      {/* Content */}
      <h3 className="font-display text-display-sm text-kahu-charcoal mb-3">
        {title}
      </h3>
      <p className="text-body-md text-kahu-taupe leading-relaxed">
        {description}
      </p>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-kahu-cream-deep group-hover:border-kahu-terracotta/40 transition-colors duration-500 rounded-tr-sm" />
    </motion.div>
  );
}

export function LaboKahuClient({ lang, dict, parentTitle }: LaboKahuClientProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const sections = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
      title: dict.sections.research.title,
      description: dict.sections.research.description,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      ),
      title: dict.sections.prototyping.title,
      description: dict.sections.prototyping.description,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      ),
      title: dict.sections.collaboration.title,
      description: dict.sections.collaboration.description,
    },
  ];

  return (
    <main className="bg-kahu-cream-warm min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-kahu-cream overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div ref={heroRef} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            className="inline-block text-body-sm text-kahu-taupe uppercase tracking-[0.2em] mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: KAHU_EASE }}
          >
            {parentTitle}
          </motion.span>
          <motion.h1
            className="font-display text-display-xl text-kahu-charcoal uppercase tracking-[0.1em]"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: KAHU_EASE }}
          >
            {dict.title}
          </motion.h1>
          <motion.p
            className="mt-6 text-body-lg text-kahu-taupe max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: KAHU_EASE }}
          >
            {dict.heroText}
          </motion.p>
        </div>
      </section>

      {/* Lab Sections */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <LaboSection
                key={section.title}
                icon={section.icon}
                title={section.title}
                description={section.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="py-16 md:py-24 bg-kahu-charcoal text-kahu-ivory relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-kahu-bark/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-kahu-terracotta/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: KAHU_EASE }}
          >
            <span className="inline-block text-body-xs text-kahu-ivory/60 uppercase tracking-[0.3em] mb-6">
              {lang === "fr" ? "Notre philosophie" : "Our philosophy"}
            </span>
            <blockquote className="font-display text-display-md leading-tight">
              {lang === "fr" ? (
                <>
                  &ldquo;L&apos;innovation nait de la contrainte.
                  <br />
                  <span className="text-kahu-terracotta">Chaque chute est une opportunite.</span>&rdquo;
                </>
              ) : (
                <>
                  &ldquo;Innovation is born from constraint.
                  <br />
                  <span className="text-kahu-terracotta">Every offcut is an opportunity.</span>&rdquo;
                </>
              )}
            </blockquote>
            <p className="mt-8 text-body-sm text-kahu-ivory/60">
              — KAHU Studio
            </p>
          </motion.div>
        </div>
      </section>

      {/* Process Visual */}
      <section className="py-16 md:py-24 bg-kahu-cream-deep/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: KAHU_EASE }}
          >
            <h2 className="font-display text-display-md text-kahu-charcoal">
              {lang === "fr" ? "Le cycle de l'innovation" : "The innovation cycle"}
            </h2>
          </motion.div>

          {/* Process Flow */}
          <div className="relative max-w-4xl mx-auto">
            {/* Connection line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-kahu-cream-deep -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {[
                { step: "01", label: lang === "fr" ? "Observer" : "Observe" },
                { step: "02", label: lang === "fr" ? "Experimenter" : "Experiment" },
                { step: "03", label: lang === "fr" ? "Prototyper" : "Prototype" },
                { step: "04", label: lang === "fr" ? "Deployer" : "Deploy" },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  className="relative flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: KAHU_EASE }}
                >
                  <div className="w-16 h-16 rounded-full bg-kahu-cream border-2 border-kahu-cream-deep flex items-center justify-center mb-4 relative z-10">
                    <span className="font-display text-body-lg text-kahu-bark">{item.step}</span>
                  </div>
                  <span className="text-body-sm text-kahu-charcoal font-medium">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-kahu-cream-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: KAHU_EASE }}
          >
            <h2 className="font-display text-display-md text-kahu-charcoal mb-4">
              {lang === "fr" ? "Rejoignez l'aventure" : "Join the adventure"}
            </h2>
            <p className="text-body-md text-kahu-taupe max-w-xl mx-auto mb-8">
              {lang === "fr"
                ? "Vous etes chercheur, designer ou simplement curieux ? Le Labo KAHU est ouvert aux collaborations."
                : "Are you a researcher, designer or simply curious? KAHU Lab is open to collaborations."}
            </p>
            <a
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-kahu-charcoal text-kahu-ivory text-body-sm font-medium rounded-sm hover:bg-kahu-bark transition-colors"
            >
              {lang === "fr" ? "Nous contacter" : "Contact us"}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
