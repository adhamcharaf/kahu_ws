"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "./badge";
import { cn, formatPrice } from "@/lib/utils";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { nom, slug, prix, statut, venteFlash, photos } = product;

  const imageUrl = photos[0] ? getOptimizedImageUrl(photos[0], "card") : "/placeholder.jpg";
  const badgeStatus = venteFlash ? "flash" : statut;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/creations/${slug}`} className="group block">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-kahu-cream-deep">
          <Image
            src={imageUrl}
            alt={nom}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className={cn(
              "object-cover transition-transform duration-500 ease-out",
              "group-hover:scale-105"
            )}
            priority={priority}
          />

          {/* Hover Overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-kahu-charcoal/60 via-transparent to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            )}
          />

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <Badge status={badgeStatus} />
          </div>

          {/* Quick View Text (desktop only) */}
          <div
            className={cn(
              "absolute bottom-4 left-4 right-4",
              "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
              "transition-all duration-300 hidden sm:block"
            )}
          >
            <span className="text-body-sm text-kahu-ivory font-medium">
              Voir le produit
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <h3 className="font-display text-body-lg text-kahu-charcoal group-hover:text-kahu-terracotta transition-colors">
            {nom}
          </h3>
          <p className="mt-1 text-body-sm text-kahu-taupe">
            {formatPrice(prix)}
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
