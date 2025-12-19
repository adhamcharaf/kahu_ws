"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getOptimizedImageUrl } from "@/lib/cloudinary";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  lang?: string;
}

export function ProjectCard({ project, priority = false, lang = 'fr' }: ProjectCardProps) {
  const { nom, slug, annee, photos } = project;

  const imageUrl = photos[0] ? getOptimizedImageUrl(photos[0], "gallery") : "/placeholder.jpg";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/${lang}/espace/${slug}`} className="group block">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-kahu-cream-deep">
          <Image
            src={imageUrl}
            alt={nom}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className={cn(
              "object-cover transition-transform duration-500 ease-out",
              "group-hover:scale-105"
            )}
            priority={priority}
          />

          {/* Hover Overlay with Title */}
          <div
            className={cn(
              "absolute inset-0 bg-kahu-charcoal/50 flex items-end p-6",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            )}
          >
            <div>
              <h3 className="font-display text-display-sm text-kahu-ivory">
                {nom}
              </h3>
              {annee && (
                <p className="mt-1 text-body-sm text-kahu-stone-light">
                  {annee}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content (visible by default on mobile) */}
        <div className="mt-4 sm:hidden">
          <h3 className="font-display text-body-lg text-kahu-charcoal">
            {nom}
          </h3>
          {annee && (
            <p className="mt-1 text-body-sm text-kahu-taupe">{annee}</p>
          )}
        </div>
      </Link>
    </motion.article>
  );
}
