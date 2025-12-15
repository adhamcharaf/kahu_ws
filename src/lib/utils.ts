import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price in FCFA
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price) + " FCFA";
}

/**
 * Generate WhatsApp link with pre-filled message
 */
export function generateWhatsAppLink(productName?: string): string {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "2250704160700";

  let message: string;
  if (productName) {
    message = `Bonjour, je suis interesse(e) par << ${productName} >>.`;
  } else {
    message = "Bonjour, je souhaite discuter d'un projet sur-mesure.";
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

/**
 * Check if a flash sale is still active
 */
export function isFlashSaleActive(dateFinFlash: string | null): boolean {
  if (!dateFinFlash) return true;
  return new Date(dateFinFlash) > new Date();
}

/**
 * Slugify a string
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
