"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/utils";
import {
  SectionReveal,
  ColorMorphSection,
  CinemaStagger,
  CinemaStaggerItem,
} from "@/components/animations/scroll-cinema";
import { GrainTexture, AmbientGlow } from "@/components/animations/floating-shapes";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { EASE, DURATION } from "@/lib/animation-config";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

// ============================================================================
// Contact Content - Version animee Apple-style avec i18n
// ============================================================================

interface ContactContentProps {
  lang: Locale;
  dict: Dictionary;
}

export default function ContactContent({ lang, dict }: ContactContentProps) {
  const shouldReduceMotion = usePrefersReducedMotion();
  const isDesktop = useIsDesktop();

  const labels = {
    address: lang === "fr" ? "Adresse" : "Address",
    email: "Email",
    phone: lang === "fr" ? "Telephone" : "Phone",
    instagram: "Instagram",
    whatsappTitle: lang === "fr" ? "Le plus simple ?" : "The easiest way?",
    whatsappText:
      lang === "fr"
        ? "Ecrivez-nous directement sur WhatsApp. Nous repondons generalement dans la journee."
        : "Write to us directly on WhatsApp. We usually respond within the day.",
    whatsappButton: lang === "fr" ? "Ecrire sur WhatsApp" : "Write on WhatsApp",
    hours: lang === "fr" ? "Horaires" : "Hours",
    hoursText:
      lang === "fr"
        ? "L'atelier est ouvert sur rendez-vous. Contactez-nous pour organiser une visite et decouvrir nos creations en personne."
        : "The studio is open by appointment. Contact us to schedule a visit and discover our creations in person.",
    coordinates: lang === "fr" ? "Nos coordonnees" : "Our coordinates",
  };

  return (
    <>
      {/* ============ Contact Info Section ============ */}
      <ColorMorphSection
        className="py-section"
        fromColor="var(--color-kahu-cream-warm)"
        toColor="var(--color-kahu-cream)"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Details */}
            <div>
              <SectionReveal variant="fade-up">
                <h2 className="font-display text-display-sm text-kahu-charcoal">
                  {labels.coordinates}
                </h2>
              </SectionReveal>

              <CinemaStagger className="mt-8 space-y-6" staggerDelay={0.12}>
                {/* Address */}
                <CinemaStaggerItem>
                  <ContactItem
                    label={labels.address}
                    content={
                      <>
                        Riviera 2 les jardins
                        <br />
                        Abidjan, Cote d&apos;Ivoire
                      </>
                    }
                  />
                </CinemaStaggerItem>

                {/* Email */}
                <CinemaStaggerItem>
                  <ContactLink
                    label={labels.email}
                    href="mailto:kahu.ci@outlook.com"
                    text="kahu.ci@outlook.com"
                  />
                </CinemaStaggerItem>

                {/* Phone */}
                <CinemaStaggerItem>
                  <ContactLink
                    label={labels.phone}
                    href="tel:+2250704160700"
                    text="+225 07 04 16 07 00"
                  />
                </CinemaStaggerItem>

                {/* Instagram */}
                <CinemaStaggerItem>
                  <div>
                    <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-taupe">
                      {labels.instagram}
                    </h3>
                    <motion.a
                      href="https://www.instagram.com/kahu.ci/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-body-md text-kahu-bark hover:text-kahu-terracotta transition-colors"
                      whileHover={shouldReduceMotion ? {} : { x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      @kahu.ci
                    </motion.a>
                  </div>
                </CinemaStaggerItem>
              </CinemaStagger>
            </div>

            {/* WhatsApp CTA - Card animee */}
            <SectionReveal variant="slide-right" delay={0.3}>
              <motion.div
                className="bg-kahu-bark rounded-sm p-8 sm:p-10 flex flex-col justify-center relative overflow-hidden"
                whileHover={shouldReduceMotion ? {} : { scale: 1.01 }}
                transition={{ duration: 0.4, ease: EASE.cinematic }}
              >
                {/* Subtle gradient overlay on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-kahu-terracotta/10 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={shouldReduceMotion ? {} : { opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />

                <div className="relative">
                  <motion.h2
                    className="font-display text-display-sm text-kahu-cream"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: DURATION.slow, ease: EASE.dramatic }}
                    viewport={{ once: true }}
                  >
                    {labels.whatsappTitle}
                  </motion.h2>
                  <motion.p
                    className="mt-4 text-body-md text-kahu-stone-light"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: DURATION.slow, delay: 0.1, ease: EASE.dramatic }}
                    viewport={{ once: true }}
                  >
                    {labels.whatsappText}
                  </motion.p>
                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: DURATION.slow, delay: 0.2, ease: EASE.dramatic }}
                    viewport={{ once: true }}
                  >
                    <Button
                      href={generateWhatsAppLink()}
                      external
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      {labels.whatsappButton}
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </SectionReveal>
          </div>
        </div>
      </ColorMorphSection>

      {/* ============ Hours Section ============ */}
      <section className="relative py-section bg-kahu-cream-deep overflow-hidden">
        <GrainTexture opacity={0.015} />

        {isDesktop && (
          <AmbientGlow
            color="rgba(92, 107, 74, 0.04)"
            size={400}
            position={{ x: "50%", y: "50%" }}
          />
        )}

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <SectionReveal variant="blur-up">
              <h2 className="font-display text-display-sm text-kahu-charcoal">
                {labels.hours}
              </h2>
            </SectionReveal>

            <SectionReveal variant="fade-up" delay={0.2}>
              <p className="mt-4 text-body-md text-kahu-taupe">
                {labels.hoursText}
              </p>
            </SectionReveal>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

function ContactItem({
  label,
  content,
}: {
  label: string;
  content: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-taupe">
        {label}
      </h3>
      <p className="mt-2 text-body-md text-kahu-bark">{content}</p>
    </div>
  );
}

function ContactLink({
  label,
  href,
  text,
}: {
  label: string;
  href: string;
  text: string;
}) {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <div>
      <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-taupe">
        {label}
      </h3>
      <motion.a
        href={href}
        className="mt-2 block text-body-md text-kahu-bark hover:text-kahu-terracotta transition-colors"
        whileHover={shouldReduceMotion ? {} : { x: 4 }}
        transition={{ duration: 0.2 }}
      >
        {text}
      </motion.a>
    </div>
  );
}
