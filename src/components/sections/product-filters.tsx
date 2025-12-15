"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { ProductFilter } from "@/lib/types";

const filters: { value: ProductFilter; label: string }[] = [
  { value: "tous", label: "Tous" },
  { value: "capsule", label: "Capsules" },
  { value: "mobilier", label: "Mobilier" },
  { value: "objet", label: "Objets" },
];

export function ProductFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentFilter = (searchParams.get("filter") as ProductFilter) || "tous";

  const handleFilterChange = (filter: ProductFilter) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter === "tous") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => handleFilterChange(filter.value)}
          className={cn(
            "px-4 py-2 text-body-sm font-medium uppercase tracking-wider transition-all duration-300",
            "border rounded-sm",
            currentFilter === filter.value
              ? "bg-kahu-charcoal text-kahu-ivory border-kahu-charcoal"
              : "bg-transparent text-kahu-bark border-kahu-bark hover:bg-kahu-bark hover:text-kahu-ivory"
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
