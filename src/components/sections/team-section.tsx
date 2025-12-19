"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { KAHU_EASE, DURATION } from "@/lib/animation-config";
import type { TeamMember } from "@/data/team";

// ============================================================================
// FounderCard - Large featured card for the founder
// ============================================================================

interface FounderCardProps {
  member: TeamMember;
  lang: "fr" | "en";
  labels: {
    founderLabel: string;
    specialtiesLabel: string;
  };
}

export function FounderCard({ member, lang, labels }: FounderCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DURATION.slow, ease: KAHU_EASE }}
    >
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image */}
        <motion.div
          className="relative aspect-[4/5] rounded-sm overflow-hidden bg-kahu-cream-deep"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: KAHU_EASE }}
        >
          {/* Placeholder gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-kahu-bark/30 via-kahu-taupe/20 to-kahu-terracotta/20" />

          {/* Decorative frame */}
          <div className="absolute inset-4 border border-kahu-ivory/20 rounded-sm pointer-events-none" />

          {/* Label */}
          <motion.div
            className="absolute top-6 left-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="px-3 py-1.5 bg-kahu-terracotta text-kahu-ivory text-body-xs font-medium uppercase tracking-wider rounded-full">
              {labels.founderLabel}
            </span>
          </motion.div>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-display text-display-lg text-kahu-charcoal mb-2">
              {member.name}
            </h2>
            <p className="text-body-md text-kahu-terracotta font-medium">
              {member.role[lang]}
            </p>
          </motion.div>

          <motion.p
            className="text-body-md text-kahu-taupe leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {member.bio[lang]}
          </motion.p>

          {member.specialties && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="text-body-xs text-kahu-stone uppercase tracking-wider">
                {labels.specialtiesLabel}
              </span>
              <div className="mt-3 flex flex-wrap gap-2">
                {member.specialties[lang].map((specialty, i) => (
                  <span
                    key={specialty}
                    className="px-3 py-1.5 bg-kahu-cream-deep text-kahu-bark text-body-sm rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ============================================================================
// ArtisanCard - Card for team artisans
// ============================================================================

interface ArtisanCardProps {
  member: TeamMember;
  lang: "fr" | "en";
  index: number;
  labels: {
    experienceLabel: string;
    specialtiesLabel: string;
  };
}

export function ArtisanCard({ member, lang, index, labels }: ArtisanCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={ref}
      className="group"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: DURATION.normal,
        delay: index * 0.1,
        ease: KAHU_EASE,
      }}
    >
      <div className="bg-kahu-cream rounded-sm overflow-hidden border border-kahu-cream-deep transition-all duration-500 group-hover:shadow-lg group-hover:shadow-kahu-bark/5">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-kahu-cream-deep">
          {/* Placeholder gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-kahu-bark/20 via-kahu-taupe/15 to-kahu-olive/20" />

          {/* Experience badge */}
          {member.experience && (
            <motion.div
              className="absolute top-4 right-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
            >
              <div className="w-14 h-14 rounded-full bg-kahu-charcoal/90 backdrop-blur-sm flex flex-col items-center justify-center">
                <span className="text-body-lg text-kahu-ivory font-display leading-none">
                  {member.experience}
                </span>
                <span className="text-[10px] text-kahu-ivory/70 uppercase tracking-wider">
                  {lang === "fr" ? "ans" : "yrs"}
                </span>
              </div>
            </motion.div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-kahu-bark/0 group-hover:bg-kahu-bark/20 transition-colors duration-500" />
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <div>
            <h3 className="font-display text-display-sm text-kahu-charcoal">
              {member.name}
            </h3>
            <p className="text-body-sm text-kahu-terracotta mt-0.5">
              {member.role[lang]}
            </p>
          </div>

          <p className="text-body-sm text-kahu-taupe leading-relaxed line-clamp-3">
            {member.bio[lang]}
          </p>

          {member.specialties && (
            <div className="pt-3 border-t border-kahu-cream-deep">
              <div className="flex flex-wrap gap-1.5">
                {member.specialties[lang].slice(0, 3).map((specialty) => (
                  <span
                    key={specialty}
                    className="px-2 py-1 bg-kahu-cream-deep text-kahu-bark text-body-xs rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

// ============================================================================
// ArtisanGrid - Grid layout for artisan cards
// ============================================================================

interface ArtisanGridProps {
  members: TeamMember[];
  lang: "fr" | "en";
  labels: {
    experienceLabel: string;
    specialtiesLabel: string;
  };
  className?: string;
}

export function ArtisanGrid({ members, lang, labels, className }: ArtisanGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8",
        className
      )}
    >
      {members.map((member, index) => (
        <ArtisanCard
          key={member.id}
          member={member}
          lang={lang}
          index={index}
          labels={labels}
        />
      ))}
    </div>
  );
}

// ============================================================================
// TeamSection - Complete team section with founder and artisans
// ============================================================================

interface TeamSectionProps {
  founder: TeamMember;
  artisans: TeamMember[];
  lang: "fr" | "en";
  labels: {
    founderLabel: string;
    artisansLabel: string;
    experienceLabel: string;
    specialtiesLabel: string;
  };
}

export function TeamSection({ founder, artisans, lang, labels }: TeamSectionProps) {
  const artisansRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(artisansRef, { once: true, margin: "-100px" });

  return (
    <div className="space-y-24">
      {/* Founder Section */}
      <FounderCard
        member={founder}
        lang={lang}
        labels={{
          founderLabel: labels.founderLabel,
          specialtiesLabel: labels.specialtiesLabel,
        }}
      />

      {/* Artisans Section */}
      <section ref={artisansRef}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: KAHU_EASE }}
        >
          <h2 className="font-display text-display-md text-kahu-charcoal">
            {labels.artisansLabel}
          </h2>
          <div className="mt-4 w-16 h-px bg-kahu-terracotta mx-auto" />
        </motion.div>

        <ArtisanGrid
          members={artisans}
          lang={lang}
          labels={{
            experienceLabel: labels.experienceLabel,
            specialtiesLabel: labels.specialtiesLabel,
          }}
        />
      </section>
    </div>
  );
}
