import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Base metadata - will be overridden by [lang]/layout.tsx
export const metadata: Metadata = {
  title: {
    default: "KAHU Studio | Design mobilier artisanal",
    template: "%s | KAHU Studio",
  },
  description:
    "Studio de design mobilier artisanal à Abidjan. Créations uniques, sur-mesure et aménagement d'espaces par Mouna Shaima.",
  keywords: [
    "mobilier",
    "design",
    "artisanal",
    "Abidjan",
    "sur-mesure",
    "ébénisterie",
    "KAHU",
    "Côte d'Ivoire",
    "meuble",
    "bois",
  ],
  authors: [{ name: "KAHU Studio" }],
  creator: "KAHU Studio",
  openGraph: {
    type: "website",
    siteName: "KAHU Studio",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/images/Logo.png",
    apple: "/images/Logo.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params?: Promise<{ lang?: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  // Get lang from params if available, default to 'fr'
  const resolvedParams = params ? await params : undefined;
  const lang = resolvedParams?.lang || 'fr';

  return (
    <html lang={lang}>
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
