import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/get-dictionary";
import { WoodGrainTexture } from "@/components/animations/floating-shapes";

interface FooterProps {
  lang?: Locale;
  dict?: Dictionary;
}

// Helper to build localized links
function getLocalizedHref(href: string, lang?: Locale): string {
  if (!lang) return href;
  return `/${lang}${href === '/' ? '' : href}`;
}

export default function Footer({ lang = 'fr', dict }: FooterProps) {
  const currentYear = new Date().getFullYear();

  // Navigation links using dictionary or fallback
  const navLinks = [
    { href: "/atelier", label: dict?.nav.atelier || "L'Atelier" },
    { href: "/objet", label: dict?.nav.objet || "Objet" },
    { href: "/espace", label: dict?.nav.espace || "Espace" },
    { href: "/materiaux", label: dict?.nav.materiaux || "Matériaux" },
    { href: "/contact", label: dict?.nav.contact || "Contact" },
  ];

  return (
    <footer className="relative bg-kahu-bark text-kahu-cream-warm overflow-hidden">
      <WoodGrainTexture opacity={0.06} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <Link href={getLocalizedHref("/", lang)} className="inline-block">
              <Image
                src="/images/Logo.png"
                alt="KAHU Studio"
                width={100}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-body-sm text-kahu-stone-light max-w-xs">
              {dict?.metadata.description || "Studio de design mobilier artisanal à Abidjan. Créations uniques, sur-mesure et aménagement d'espaces."}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-stone mb-4">
              Navigation
            </h3>
            <nav className="flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={getLocalizedHref(link.href, lang)}
                  className="py-2.5 -mx-2 px-2 rounded-lg text-body-sm text-kahu-stone-light hover:text-kahu-ivory hover:bg-white/5 active:bg-white/10 transition-all duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-stone mb-4">
              Contact
            </h3>
            <address className="not-italic flex flex-col gap-0.5 text-body-sm text-kahu-stone-light">
              <p className="py-1">Riviera 2 les jardins</p>
              <p className="py-1">Abidjan, Côte d&apos;Ivoire</p>
              <a
                href="mailto:kahu.ci@outlook.com"
                className="inline-flex items-center min-h-[44px] py-2 hover:text-kahu-ivory transition-colors"
              >
                kahu.ci@outlook.com
              </a>
              <a
                href="tel:+2250704160700"
                className="inline-flex items-center min-h-[44px] py-2 hover:text-kahu-ivory transition-colors"
              >
                +225 07 04 16 07 00
              </a>
            </address>

            {/* Social */}
            <div className="mt-4">
              <a
                href="https://www.instagram.com/kahu.ci/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[44px] py-2 text-body-sm text-kahu-stone-light hover:text-kahu-ivory transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
                @kahu.ci
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-kahu-bark-soft">
          <p className="text-caption text-kahu-stone text-center">
            &copy; {currentYear} KAHU Studio. {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
