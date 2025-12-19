"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-media-query";
import MobileNav from "./mobile-nav";
import LanguageToggle from "@/components/ui/language-toggle";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";

interface HeaderProps {
  lang?: Locale;
  dict?: Dictionary;
}

// Helper to build localized links
function getLocalizedHref(href: string, lang?: Locale): string {
  if (!lang) return href;
  return `/${lang}${href === '/' ? '' : href}`;
}

export default function Header({ lang = 'fr', dict }: HeaderProps) {
  // Navigation links using dictionary or fallback
  const navLinks = [
    { href: "/atelier", label: dict?.nav.atelier || "L'Atelier" },
    { href: "/objet", label: dict?.nav.objet || "Objet" },
    { href: "/espace", label: dict?.nav.espace || "Espace" },
    { href: "/materiaux", label: dict?.nav.materiaux || "Materiaux" },
    { href: "/contact", label: dict?.nav.contact || "Contact" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-kahu-cream/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
        style={{
          paddingTop: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 sm:h-20 items-center justify-center md:justify-between relative">
            {/* Spacer gauche - equilibre visuel sur mobile */}
            <div className="absolute left-4 md:hidden w-11 h-11" aria-hidden="true" />

            {/* Logo - centre sur mobile, gauche sur desktop */}
            <Link
              href={getLocalizedHref("/", lang)}
              className="block transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Image
                src="/images/Logo.png"
                alt="KAHU Studio"
                width={160}
                height={64}
                className="h-12 sm:h-14 md:h-16 w-auto"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLocalizedHref(link.href, lang)}
                  className="text-body-sm font-medium text-kahu-bark hover:text-kahu-terracotta transition-colors relative group uppercase tracking-wide"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-kahu-terracotta transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}

              {/* Language Toggle */}
              <LanguageToggle currentLang={lang} />
            </div>

            {/* Mobile Menu Button - 44px tactile */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden absolute right-4 w-11 h-11 flex items-center justify-center rounded-full active:bg-kahu-bark/5 transition-colors"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15 }}
            >
              <div className="relative w-6 h-5">
                <motion.span
                  className="absolute left-0 top-0 w-full h-0.5 bg-kahu-charcoal rounded-full"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 9 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-kahu-charcoal rounded-full"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1,
                    x: isMobileMenuOpen ? 10 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.span
                  className="absolute left-0 bottom-0 w-full h-0.5 bg-kahu-charcoal rounded-full"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -9 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav
            links={navLinks.map(link => ({
              ...link,
              href: getLocalizedHref(link.href, lang)
            }))}
            lang={lang}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
