"use client";

import { forwardRef, useState, useCallback, MouseEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion, useIsDesktop } from "@/hooks/use-media-query";
import { KAHU_EASE, DURATION, SPRING } from "@/lib/animation-config";

// ============================================================================
// Button Component - Avec effet ripple organique et magnétique
// ============================================================================

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
  /** Désactiver l'effet ripple */
  noRipple?: boolean;
  /** Désactiver l'effet magnétique */
  noMagnetic?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-kahu-terracotta text-kahu-ivory hover:bg-kahu-terracotta-dark active:bg-kahu-terracotta-dark",
  secondary:
    "bg-transparent border border-kahu-bark text-kahu-bark hover:bg-kahu-cream/50",
  ghost:
    "bg-transparent text-kahu-bark hover:text-kahu-terracotta underline-offset-4 hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-5 py-2.5 min-h-[44px] text-body-sm",
  md: "px-7 py-3.5 min-h-[48px] text-body-md",
  lg: "px-9 py-4 min-h-[52px] text-body-md",
};

// Couleur du ripple selon la variante
const rippleColors: Record<ButtonVariant, string> = {
  primary: "rgba(255, 253, 249, 0.35)", // ivory
  secondary: "rgba(45, 36, 32, 0.15)", // bark
  ghost: "rgba(139, 58, 58, 0.15)", // terracotta
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      external,
      children,
      disabled,
      noRipple = false,
      noMagnetic = false,
      onClick,
      // Exclude conflicting event handlers from props
      // (React DOM events conflict with Framer Motion events)
      onAnimationStart: _onAnimationStart,
      onAnimationEnd: _onAnimationEnd,
      onAnimationIteration: _onAnimationIteration,
      onDragStart: _onDragStart,
      onDragEnd: _onDragEnd,
      onDrag: _onDrag,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const shouldReduceMotion = usePrefersReducedMotion();
    const isDesktop = useIsDesktop();

    const baseStyles = cn(
      "relative inline-flex items-center justify-center font-medium uppercase tracking-wider overflow-hidden",
      "transition-colors duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kahu-terracotta focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    // Créer un ripple au clic
    const createRipple = useCallback(
      (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        if (noRipple || shouldReduceMotion) return;

        const element = e.currentTarget;
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 2.5;

        const newRipple: Ripple = { id: Date.now(), x, y, size };
        setRipples((prev) => [...prev, newRipple]);

        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
        }, 700);
      },
      [noRipple, shouldReduceMotion]
    );

    // Composant Ripple
    const RippleEffect = () => (
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColors[variant],
              transform: "translate(-50%, -50%)",
            }}
            initial={{
              scale: 0,
              opacity: 0.8,
              borderRadius: "40% 60% 55% 45% / 55% 45% 60% 40%",
            }}
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
    );

    // Animation hover/tap - sensation de pression douce
    const motionProps = shouldReduceMotion
      ? {}
      : {
          whileHover: { scale: 1.02 },
          whileTap: { scale: 0.97, transition: { duration: 0.1 } },
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
        };

    // Render as external link
    if (href && external) {
      return (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseStyles}
          onClick={createRipple}
          {...motionProps}
        >
          {children}
          <RippleEffect />
        </motion.a>
      );
    }

    // Render as internal link
    if (href) {
      return (
        <motion.div {...motionProps} className="inline-block">
          <Link href={href} className={baseStyles} onClick={createRipple}>
            {children}
            <RippleEffect />
          </Link>
        </motion.div>
      );
    }

    // Render as button
    return (
      <motion.button
        ref={ref}
        className={baseStyles}
        disabled={disabled}
        onClick={(e) => {
          createRipple(e);
          onClick?.(e);
        }}
        {...motionProps}
        {...props}
      >
        {children}
        <RippleEffect />
      </motion.button>
    );
  }
);

Button.displayName = "Button";

// ============================================================================
// Icon Button - Bouton avec icône uniquement
// ============================================================================

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
  variant?: ButtonVariant;
  size?: "sm" | "md" | "lg";
}

const iconSizeStyles = {
  sm: "p-2",
  md: "p-3",
  lg: "p-4",
};

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({
    icon,
    label,
    variant = "ghost",
    size = "md",
    className,
    // Exclude conflicting event handlers from props
    onAnimationStart: _onAnimationStart,
    onAnimationEnd: _onAnimationEnd,
    onAnimationIteration: _onAnimationIteration,
    onDragStart: _onDragStart,
    onDragEnd: _onDragEnd,
    onDrag: _onDrag,
    ...props
  }, ref) => {
    const shouldReduceMotion = usePrefersReducedMotion();

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full",
          "transition-colors duration-300",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kahu-terracotta",
          variantStyles[variant],
          iconSizeStyles[size],
          className
        )}
        aria-label={label}
        whileHover={shouldReduceMotion ? {} : { scale: 1.1 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        transition={{ duration: DURATION.fast }}
        {...props}
      >
        {icon}
      </motion.button>
    );
  }
);

IconButton.displayName = "IconButton";

// ============================================================================
// Text Button - Bouton texte minimaliste avec underline
// ============================================================================

interface TextButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

function TextButton({ children, href, onClick, className }: TextButtonProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  const content = (
    <motion.span
      className={cn(
        "relative inline-flex items-center gap-1 text-kahu-bark",
        "group cursor-pointer",
        className
      )}
      whileHover={shouldReduceMotion ? {} : { x: 2 }}
    >
      <span className="relative">
        {children}
        {/* Underline animée */}
        <motion.span
          className="absolute bottom-0 left-0 h-px bg-kahu-terracotta"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: DURATION.fast, ease: KAHU_EASE }}
        />
      </span>
      {/* Arrow */}
      <motion.svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        className="opacity-0 group-hover:opacity-100 transition-opacity"
        initial={{ x: -4 }}
        whileHover={{ x: 0 }}
      >
        <path
          d="M2 7h10m0 0L8 3m4 4L8 11"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <button onClick={onClick}>{content}</button>;
}

export { Button, IconButton, TextButton };
export type { ButtonProps, ButtonVariant, ButtonSize };
