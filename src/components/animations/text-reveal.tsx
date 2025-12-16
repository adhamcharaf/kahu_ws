"use client";

import { motion, useInView, Variants, UseInViewOptions } from "framer-motion";
import { useRef, useMemo, ElementType, ComponentPropsWithoutRef } from "react";
import { usePrefersReducedMotion, useIsMobile } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, DELAY } from "@/lib/animation-config";

// ============================================================================
// Text Reveal - Révélation caractère par caractère
// "Chaque lettre gravée dans le bois, une par une"
// ============================================================================

type TextElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "blockquote" | "div";

interface TextRevealProps {
  /** Le texte à révéler */
  text: string;
  /** L'élément HTML à utiliser */
  element?: TextElement;
  /** Classes CSS */
  className?: string;
  /** Délai initial avant le début de l'animation */
  delay?: number;
  /** Délai entre chaque caractère */
  charDelay?: number;
  /** Mode d'animation */
  mode?: "character" | "word" | "line";
  /** Durée de chaque animation */
  duration?: number;
  /** Marge du viewport pour le trigger */
  viewportMargin?: string;
}

export function TextReveal({
  text,
  element: Element = "span",
  className,
  delay = 0,
  charDelay,
  mode = "character",
  duration = DURATION.normal,
  viewportMargin = "-100px",
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const viewportOptions: UseInViewOptions = { once: true, margin: viewportMargin as UseInViewOptions["margin"] };
  const isInView = useInView(ref, viewportOptions);
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  // Sur mobile, forcer le mode "word" pour la performance
  const effectiveMode = isMobile ? "word" : mode;

  // Calculer le délai entre éléments
  const computedDelay = charDelay ?? (
    effectiveMode === "character" ? DELAY.stagger.fast / 2 : // 0.025s par caractère
    effectiveMode === "word" ? DELAY.stagger.normal : // 0.08s par mot
    DELAY.stagger.slow // 0.12s par ligne
  );

  // Découper le texte selon le mode
  const segments = useMemo(() => {
    switch (effectiveMode) {
      case "character":
        return text.split("");
      case "word":
        return text.split(" ");
      case "line":
        return text.split("\n");
      default:
        return text.split("");
    }
  }, [text, effectiveMode]);

  // Si reduced motion, afficher directement
  if (shouldReduceMotion) {
    // @ts-ignore - Element dynamique
    return <Element ref={ref} className={className}>{text}</Element>;
  }

  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: delay + i * computedDelay,
        duration,
        ease: KAHU_EASE,
      },
    }),
  };

  const renderSegment = (segment: string, index: number) => {
    const isSpace = segment === " " || segment === "";
    const separator = effectiveMode === "word" ? "\u00A0" : ""; // Non-breaking space

    return (
      <motion.span
        key={index}
        custom={index}
        variants={charVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block"
        style={{
          transformOrigin: "bottom center",
          // Préserver les espaces
          whiteSpace: "pre",
        }}
      >
        {isSpace ? "\u00A0" : segment}
        {effectiveMode === "word" && index < segments.length - 1 ? separator : ""}
      </motion.span>
    );
  };

  return (
    <Element
      // @ts-expect-error - Dynamic element type
      ref={ref}
      className={className}
      style={{ perspective: "1000px" }}
    >
      {segments.map(renderSegment)}
    </Element>
  );
}

// ============================================================================
// Text Reveal Lines - Pour les paragraphes multi-lignes
// ============================================================================

interface TextRevealLinesProps {
  /** Le texte ou les lignes à révéler */
  lines: string[];
  /** L'élément wrapper */
  element?: TextElement;
  /** Classes CSS */
  className?: string;
  /** Classes pour chaque ligne */
  lineClassName?: string;
  /** Délai initial */
  delay?: number;
  /** Marge du viewport */
  viewportMargin?: string;
}

export function TextRevealLines({
  lines,
  element: Element = "div",
  className,
  lineClassName,
  delay = 0,
  viewportMargin = "-100px",
}: TextRevealLinesProps) {
  const ref = useRef<HTMLElement>(null);
  const viewportOptions: UseInViewOptions = { once: true, margin: viewportMargin as UseInViewOptions["margin"] };
  const isInView = useInView(ref, viewportOptions);
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return (
      <Element
        // @ts-expect-error - Dynamic element type
        ref={ref}
        className={className}
      >
        {lines.map((line, i) => (
          <div key={i} className={lineClassName}>{line}</div>
        ))}
      </Element>
    );
  }

  const lineVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      clipPath: "inset(100% 0% 0% 0%)",
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        delay: delay + i * DELAY.stagger.slow,
        duration: DURATION.slow,
        ease: KAHU_EASE,
      },
    }),
  };

  return (
    <Element
      // @ts-expect-error - Dynamic element type
      ref={ref}
      className={className}
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          custom={i}
          variants={lineVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className={lineClassName}
          style={{ overflow: "hidden" }}
        >
          {line}
        </motion.div>
      ))}
    </Element>
  );
}

// ============================================================================
// Split Text - Utilitaire pour découper le texte
// ============================================================================

interface SplitTextProps {
  children: string;
  className?: string;
  charClassName?: string;
  delay?: number;
}

export function SplitText({
  children,
  className,
  charClassName,
  delay = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const chars = children.split("");

  if (shouldReduceMotion) {
    return <span className={className}>{children}</span>;
  }

  // Sur mobile, animer par groupes de 3 caractères
  if (isMobile) {
    const groups: string[] = [];
    for (let i = 0; i < chars.length; i += 3) {
      groups.push(chars.slice(i, i + 3).join(""));
    }

    return (
      <span ref={ref} className={className}>
        {groups.map((group, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{
              delay: delay + i * 0.05,
              duration: DURATION.fast,
            }}
            className={`inline-block ${charClassName || ""}`}
          >
            {group}
          </motion.span>
        ))}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: delay + i * 0.02,
            duration: DURATION.fast,
            ease: KAHU_EASE,
          }}
          className={`inline-block ${charClassName || ""}`}
          style={{ whiteSpace: "pre" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// ============================================================================
// Typewriter Effect - Effet machine à écrire
// ============================================================================

interface TypewriterProps {
  text: string;
  className?: string;
  /** Vitesse en ms par caractère */
  speed?: number;
  /** Délai initial */
  delay?: number;
  /** Afficher le curseur */
  showCursor?: boolean;
}

export function Typewriter({
  text,
  className,
  speed = 50,
  delay = 0,
  showCursor = true,
}: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = usePrefersReducedMotion();

  const chars = text.split("");
  const totalDuration = chars.length * (speed / 1000);

  if (shouldReduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{
            delay: delay + i * (speed / 1000),
            duration: 0,
          }}
          style={{ whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
      {showCursor && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: [1, 0, 1],
          } : {}}
          transition={{
            delay: delay + totalDuration,
            duration: 0.8,
            repeat: Infinity,
          }}
          className="inline-block ml-0.5"
        >
          |
        </motion.span>
      )}
    </span>
  );
}
