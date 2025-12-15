import { cn } from "@/lib/utils";
import type { ProductStatus } from "@/lib/types";

type BadgeStatus = "disponible" | "vendu" | "flash";

interface BadgeProps {
  status: BadgeStatus | ProductStatus;
  className?: string;
}

const statusConfig: Record<
  BadgeStatus,
  { label: string; className: string }
> = {
  disponible: {
    label: "Disponible",
    className: "bg-kahu-olive text-kahu-ivory",
  },
  vendu: {
    label: "Vendu",
    className: "bg-kahu-stone text-kahu-ivory",
  },
  flash: {
    label: "Vente Flash",
    className: "bg-kahu-terracotta text-kahu-ivory animate-pulse-soft",
  },
};

function normalizeStatus(status: BadgeStatus | ProductStatus): BadgeStatus {
  if (status === "Disponible") return "disponible";
  if (status === "Vendu") return "vendu";
  if (status === "Brouillon") return "vendu"; // Fallback
  return status as BadgeStatus;
}

export function Badge({ status, className }: BadgeProps) {
  const normalizedStatus = normalizeStatus(status);
  const config = statusConfig[normalizedStatus];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-caption font-medium uppercase tracking-wider rounded-sm",
        config.className,
        className
      )}
    >
      {normalizedStatus === "flash" && (
        <span className="mr-1.5" aria-hidden="true">
          🔥
        </span>
      )}
      {config.label}
    </span>
  );
}
