"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { TextReveal } from "@/components/animations/text-reveal";
import { StaggerReveal } from "@/components/animations/stagger-reveal";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, VIEWPORT } from "@/lib/animation-config";
import type { Product } from "@/lib/types";

// ============================================================================
// Featured Products Client - Section produits avec animations orchestrées
// "Les créations qui émergent comme des trésors"
// ============================================================================

interface FeaturedProductsClientProps {
  products: Product[];
}

export function FeaturedProductsClient({ products }: FeaturedProductsClientProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, VIEWPORT.default);
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <section ref={ref} className="py-section bg-kahu-cream-warm overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with Text Reveal */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: DURATION.normal }}
          >
            {shouldReduceMotion ? (
              <h2 className="font-display text-display-md text-kahu-charcoal">
                Creations
              </h2>
            ) : (
              <h2 className="font-display text-display-md text-kahu-charcoal">
                <TextReveal
                  text="Creations"
                  mode="character"
                  charDelay={0.04}
                  className="justify-center"
                />
              </h2>
            )}
          </motion.div>

          <motion.p
            className="mt-4 text-body-md text-kahu-taupe max-w-lg mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: DURATION.normal, ease: KAHU_EASE }}
          >
            Des pieces fabriquees a la main, ou la beaute du bois rencontre
            l&apos;intention du design.
          </motion.p>
        </div>

        {/* Products Grid with Stagger */}
        <StaggerReveal
          staggerDelay={0.1}
          initialDelay={0.6}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
        >
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              priority={index < 2}
            />
          ))}
        </StaggerReveal>

        {/* CTA with animation */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: DURATION.normal, ease: KAHU_EASE }}
        >
          <Button href="/creations" variant="secondary">
            Voir toutes les creations
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
