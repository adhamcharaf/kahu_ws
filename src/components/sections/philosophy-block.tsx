"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function PhilosophyBlock() {
  return (
    <section className="py-section bg-kahu-bark overflow-hidden">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-display-sm text-kahu-cream italic"
        >
          &ldquo;Chaque piece raconte une histoire, celle du bois qui l&apos;a
          vue naitre et des mains qui l&apos;ont faconnee.&rdquo;
        </motion.blockquote>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-body-sm text-kahu-stone uppercase tracking-wider"
        >
          Mouna Shaima, Fondatrice
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10"
        >
          <Button href="/atelier" variant="ghost" className="text-kahu-cream hover:text-kahu-ivory">
            Decouvrir l&apos;atelier
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
