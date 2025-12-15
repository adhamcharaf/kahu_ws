"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { SPRING, DURATION } from "@/lib/animation-config";

// ============================================================================
// Counter Animation - Chiffres qui s'incrémentent au scroll
// "Les années d'expertise, les pièces créées, qui défilent"
// ============================================================================

interface CounterProps {
  /** Valeur cible */
  target: number;
  /** Durée de l'animation en secondes */
  duration?: number;
  /** Suffixe (ex: "+" ou "%") */
  suffix?: string;
  /** Préfixe (ex: "~" ou "€") */
  prefix?: string;
  /** Classes CSS */
  className?: string;
  /** Format des nombres (ex: "fr-FR") */
  locale?: string;
  /** Nombre de décimales */
  decimals?: number;
}

export function Counter({
  target,
  duration = 2,
  suffix = "",
  prefix = "",
  className,
  locale = "fr-FR",
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = usePrefersReducedMotion();

  const count = useMotionValue(0);

  // Spring pour une animation fluide
  const springCount = useSpring(count, {
    stiffness: 50,
    damping: 30,
    duration: duration * 1000,
  });

  // Formatter le nombre
  const displayCount = useTransform(springCount, (latest) => {
    const value = decimals > 0
      ? latest.toFixed(decimals)
      : Math.round(latest).toLocaleString(locale);
    return value;
  });

  useEffect(() => {
    if (isInView) {
      count.set(target);
    }
  }, [isInView, target, count]);

  // Si reduced motion, afficher directement la valeur
  if (shouldReduceMotion) {
    const formattedValue = decimals > 0
      ? target.toFixed(decimals)
      : target.toLocaleString(locale);

    return (
      <span ref={ref} className={className}>
        {prefix}{formattedValue}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{displayCount}</motion.span>
      {suffix}
    </span>
  );
}

// ============================================================================
// Animated Price - Prix avec animation d'incrémentation
// ============================================================================

interface AnimatedPriceProps {
  /** Prix en nombre */
  price: number;
  /** Devise (défaut: "FCFA") */
  currency?: string;
  /** Classes CSS */
  className?: string;
}

export function AnimatedPrice({
  price,
  currency = "FCFA",
  className,
}: AnimatedPriceProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = usePrefersReducedMotion();

  const count = useMotionValue(0);
  const springCount = useSpring(count, {
    stiffness: 100,
    damping: 30,
  });

  const displayPrice = useTransform(springCount, (latest) =>
    Math.round(latest).toLocaleString("fr-FR")
  );

  useEffect(() => {
    if (isInView) {
      count.set(price);
    }
  }, [isInView, price, count]);

  if (shouldReduceMotion) {
    return (
      <span ref={ref} className={className}>
        {price.toLocaleString("fr-FR")} {currency}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      <motion.span>{displayPrice}</motion.span> {currency}
    </span>
  );
}

// ============================================================================
// Stats Counter - Groupe de statistiques avec stagger
// ============================================================================

interface Stat {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

interface StatsCounterProps {
  stats: Stat[];
  className?: string;
  itemClassName?: string;
}

export function StatsCounter({
  stats,
  className,
  itemClassName,
}: StatsCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <div ref={ref} className={className}>
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className={itemClassName}
          initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: index * 0.15,
            duration: DURATION.normal,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="font-display text-display-md text-kahu-charcoal">
            <Counter
              target={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              duration={2 + index * 0.3}
            />
          </div>
          <div className="text-body-sm text-kahu-taupe mt-1">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ============================================================================
// Percentage Bar - Barre de progression animée
// ============================================================================

interface PercentageBarProps {
  /** Pourcentage (0-100) */
  percentage: number;
  /** Label */
  label?: string;
  /** Couleur de la barre */
  color?: string;
  /** Classes CSS */
  className?: string;
}

export function PercentageBar({
  percentage,
  label,
  color = "bg-kahu-terracotta",
  className,
}: PercentageBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = usePrefersReducedMotion();

  const safePercentage = Math.min(Math.max(percentage, 0), 100);

  return (
    <div ref={ref} className={className}>
      {label && (
        <div className="flex justify-between mb-2">
          <span className="text-body-sm text-kahu-bark">{label}</span>
          <span className="text-body-sm text-kahu-taupe">
            <Counter target={safePercentage} suffix="%" />
          </span>
        </div>
      )}
      <div className="h-1.5 bg-kahu-cream-deep rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${safePercentage}%` } : {}}
          transition={{
            duration: shouldReduceMotion ? 0 : DURATION.slow,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.2,
          }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// Countdown Timer - Compte à rebours (pour ventes flash)
// ============================================================================

interface CountdownTimerProps {
  /** Date de fin */
  endDate: Date;
  /** Callback quand terminé */
  onComplete?: () => void;
  /** Classes CSS */
  className?: string;
}

export function CountdownTimer({
  endDate,
  onComplete,
  className,
}: CountdownTimerProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  // Calculer le temps restant
  const calculateTimeLeft = () => {
    const difference = endDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      onComplete?.();
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  // Pour une vraie implémentation, utiliser useEffect avec setInterval
  const timeLeft = calculateTimeLeft();

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="text-center">
      <motion.div
        className="font-display text-display-sm text-kahu-terracotta"
        key={value}
        initial={shouldReduceMotion ? {} : { scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {String(value).padStart(2, "0")}
      </motion.div>
      <div className="text-caption text-kahu-taupe uppercase tracking-wider">
        {label}
      </div>
    </div>
  );

  return (
    <div className={`flex gap-4 ${className}`}>
      <TimeUnit value={timeLeft.days} label="Jours" />
      <span className="text-display-sm text-kahu-taupe self-start">:</span>
      <TimeUnit value={timeLeft.hours} label="Heures" />
      <span className="text-display-sm text-kahu-taupe self-start">:</span>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <span className="text-display-sm text-kahu-taupe self-start">:</span>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
}

// ============================================================================
// Animated Number - Nombre avec animation simplifiée
// ============================================================================

interface AnimatedNumberProps {
  value: number;
  className?: string;
  format?: (n: number) => string;
}

export function AnimatedNumber({
  value,
  className,
  format = (n) => n.toLocaleString("fr-FR"),
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = usePrefersReducedMotion();

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, SPRING.soft);
  const displayValue = useTransform(springValue, (v) => format(Math.round(v)));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  if (shouldReduceMotion) {
    return <span ref={ref} className={className}>{format(value)}</span>;
  }

  return (
    <motion.span ref={ref} className={className}>
      {displayValue}
    </motion.span>
  );
}
