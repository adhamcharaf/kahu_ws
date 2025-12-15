import { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  external?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-kahu-terracotta text-kahu-ivory hover:bg-kahu-terracotta-dark active:bg-kahu-terracotta-dark",
  secondary:
    "bg-transparent border border-kahu-bark text-kahu-bark hover:bg-kahu-bark hover:text-kahu-ivory",
  ghost:
    "bg-transparent text-kahu-bark hover:text-kahu-terracotta underline-offset-4 hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-body-sm",
  md: "px-6 py-3 text-body-md",
  lg: "px-8 py-4 text-body-md",
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
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      "inline-flex items-center justify-center font-medium uppercase tracking-wider transition-all duration-300",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-kahu-terracotta focus-visible:ring-offset-2",
      "disabled:opacity-50 disabled:pointer-events-none",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    // Render as link
    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={baseStyles}
          >
            {children}
          </a>
        );
      }

      return (
        <Link href={href} className={baseStyles}>
          {children}
        </Link>
      );
    }

    // Render as button
    return (
      <button
        ref={ref}
        className={baseStyles}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
