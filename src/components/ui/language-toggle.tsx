"use client";

import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n/config";
import { i18n } from "@/lib/i18n/config";

interface LanguageToggleProps {
  currentLang: Locale;
  className?: string;
}

export default function LanguageToggle({ currentLang, className = "" }: LanguageToggleProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (newLang: Locale) => {
    if (newLang === currentLang) return;

    // Remove current locale from pathname and add new one
    const segments = pathname.split("/");
    // First segment is empty string, second is the locale
    if (segments[1] && i18n.locales.includes(segments[1] as Locale)) {
      segments[1] = newLang;
    } else {
      segments.splice(1, 0, newLang);
    }

    const newPath = segments.join("/") || `/${newLang}`;
    router.push(newPath);
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {i18n.locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          <motion.button
            onClick={() => switchLanguage(locale)}
            className={`
              px-2 py-1 text-body-sm font-medium uppercase tracking-wide
              transition-colors duration-200
              ${
                currentLang === locale
                  ? "text-kahu-terracotta"
                  : "text-kahu-stone hover:text-kahu-bark"
              }
            `}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${locale === "fr" ? "French" : "English"}`}
            aria-current={currentLang === locale ? "page" : undefined}
          >
            {locale.toUpperCase()}
          </motion.button>
          {index < i18n.locales.length - 1 && (
            <span className="text-kahu-stone/50 text-body-sm">/</span>
          )}
        </span>
      ))}
    </div>
  );
}
