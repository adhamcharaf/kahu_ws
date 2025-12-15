"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/utils";

export function CustomCTA() {
  return (
    <section className="py-section bg-kahu-cream-deep">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="aspect-[4/3] bg-kahu-cream rounded-sm order-2 lg:order-1"
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <h2 className="font-display text-display-md text-kahu-charcoal">
              Un projet sur-mesure ?
            </h2>
            <p className="mt-4 text-body-md text-kahu-taupe leading-relaxed">
              Parce que chaque espace est unique, chaque piece devrait l&apos;etre
              aussi. Creez avec nous le mobilier qui vous ressemble, adapte a
              vos besoins et a votre interieur.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button href="/sur-mesure" variant="primary">
                Decouvrir le processus
              </Button>
              <Button href={generateWhatsAppLink()} external variant="secondary">
                Discuter de mon projet
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
