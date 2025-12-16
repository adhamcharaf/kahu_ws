"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, MouseEvent, ReactNode, forwardRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION } from "@/lib/animation-config";

// ============================================================================
// Ripple Button - Effet ripple organique au clic
// "Comme les cercles du bois qui s'étendent depuis le cœur"
// ============================================================================

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps {
  children: ReactNode;
  /** Classes CSS */
  className?: string;
  /** Callback onClick */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Type de bouton */
  type?: "button" | "submit" | "reset";
  /** Désactivé */
  disabled?: boolean;
  /** Couleur du ripple */
  rippleColor?: string;
  /** Durée de l'animation ripple */
  rippleDuration?: number;
  /** Forme du ripple */
  rippleShape?: "organic" | "circle";
}

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  function RippleButton(
    {
      children,
      className = "",
      onClick,
      type = "button",
      disabled = false,
      rippleColor = "rgba(255, 253, 249, 0.4)", // kahu-ivory
      rippleDuration = 0.6,
      rippleShape = "organic",
    },
    ref
  ) {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const shouldReduceMotion = usePrefersReducedMotion();

    const createRipple = useCallback(
      (e: MouseEvent<HTMLButtonElement>) => {
        if (shouldReduceMotion || disabled) {
          onClick?.(e);
          return;
        }

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculer la taille pour couvrir tout le bouton
        const size = Math.max(rect.width, rect.height) * 2;

        const newRipple: Ripple = {
          id: Date.now(),
          x,
          y,
          size,
        };

        setRipples((prev) => [...prev, newRipple]);

        // Supprimer le ripple après l'animation
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, rippleDuration * 1000 + 100);

        onClick?.(e);
      },
      [onClick, shouldReduceMotion, disabled, rippleDuration]
    );

    // Forme organique (comme les cercles du bois)
    const organicBorderRadius = "40% 60% 55% 45% / 55% 45% 60% 40%";
    const circleBorderRadius = "50%";

    return (
      <button
        ref={ref}
        type={type}
        className={`relative overflow-hidden ${className}`}
        onClick={createRipple}
        disabled={disabled}
      >
        {children}

        {/* Ripples container */}
        <AnimatePresence>
          {ripples.map((ripple) => (
            <motion.span
              key={ripple.id}
              className="absolute pointer-events-none"
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
                backgroundColor: rippleColor,
                borderRadius:
                  rippleShape === "organic"
                    ? organicBorderRadius
                    : circleBorderRadius,
                transform: "translate(-50%, -50%)",
              }}
              initial={{
                scale: 0,
                opacity: 0.8,
              }}
              animate={{
                scale: 1,
                opacity: 0,
                borderRadius:
                  rippleShape === "organic"
                    ? "50%"
                    : circleBorderRadius, // Devient rond en s'étendant
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: rippleDuration,
                ease: KAHU_EASE,
              }}
            />
          ))}
        </AnimatePresence>
      </button>
    );
  }
);

// ============================================================================
// Ripple Link - Version pour les liens
// ============================================================================

interface RippleLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  rippleColor?: string;
  external?: boolean;
  onClick?: () => void;
}

export function RippleLink({
  children,
  href,
  className = "",
  rippleColor = "rgba(139, 58, 58, 0.2)", // terracotta
  external = false,
  onClick,
}: RippleLinkProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const shouldReduceMotion = usePrefersReducedMotion();

  const createRipple = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (shouldReduceMotion) {
        onClick?.();
        return;
      }

      const link = e.currentTarget;
      const rect = link.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const newRipple: Ripple = { id: Date.now(), x, y, size };
      setRipples((prev) => [...prev, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 700);

      onClick?.();
    },
    [onClick, shouldReduceMotion]
  );

  const externalProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={href}
      className={`relative overflow-hidden inline-block ${className}`}
      onClick={createRipple}
      {...externalProps}
    >
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor,
              borderRadius: "40% 60% 55% 45% / 55% 45% 60% 40%",
              transform: "translate(-50%, -50%)",
            }}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{
              scale: 1,
              opacity: 0,
              borderRadius: "50%",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: KAHU_EASE }}
          />
        ))}
      </AnimatePresence>
    </a>
  );
}

// ============================================================================
// Touch Feedback - Feedback tactile subtil (pour mobile)
// ============================================================================

interface TouchFeedbackProps {
  children: ReactNode;
  className?: string;
  /** Scale au press */
  pressScale?: number;
  /** Feedback visuel */
  feedbackColor?: string;
}

export function TouchFeedback({
  children,
  className = "",
  pressScale = 0.97,
  feedbackColor = "rgba(139, 58, 58, 0.1)",
}: TouchFeedbackProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`relative ${className}`}
      whileTap={{
        scale: pressScale,
        backgroundColor: feedbackColor,
      }}
      transition={{
        duration: DURATION.instant,
        ease: KAHU_EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// Press Effect - Effet de pression avec ombre
// ============================================================================

interface PressEffectProps {
  children: ReactNode;
  className?: string;
  as?: "button" | "div";
  onClick?: () => void;
}

export function PressEffect({
  children,
  className = "",
  as: Component = "div",
  onClick,
}: PressEffectProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return (
      <Component className={className} onClick={onClick}>
        {children}
      </Component>
    );
  }

  const MotionComponent = motion[Component];

  return (
    <MotionComponent
      className={className}
      onClick={onClick}
      whileTap={{
        scale: 0.98,
        y: 2,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      }}
      whileHover={{
        y: -2,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
      }}
      transition={{
        duration: DURATION.fast,
        ease: KAHU_EASE,
      }}
    >
      {children}
    </MotionComponent>
  );
}

// ============================================================================
// Glow Button - Bouton avec lueur au hover
// ============================================================================

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  glowColor?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function GlowButton({
  children,
  className = "",
  onClick,
  glowColor = "rgba(139, 58, 58, 0.4)",
  type = "button",
  disabled = false,
}: GlowButtonProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return (
      <button
        type={type}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      className={`relative ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow effect */}
      <motion.span
        className="absolute inset-0 rounded-inherit pointer-events-none"
        style={{
          boxShadow: `0 0 0 0 ${glowColor}`,
        }}
        whileHover={{
          boxShadow: `0 0 20px 4px ${glowColor}`,
        }}
        transition={{ duration: DURATION.normal }}
      />
      {children}
    </motion.button>
  );
}
