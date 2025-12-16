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

export const metadata: Metadata = {
  title: {
    default: "KAHU Studio | Design mobilier artisanal",
    template: "%s | KAHU Studio",
  },
  description:
    "Studio de design mobilier artisanal a Abidjan. Creations uniques, sur-mesure et amenagement d'espaces par Mouna Shaima.",
  keywords: [
    "mobilier",
    "design",
    "artisanal",
    "Abidjan",
    "sur-mesure",
    "ebenisterie",
    "KAHU",
    "Cote d'Ivoire",
    "meuble",
    "bois",
  ],
  authors: [{ name: "KAHU Studio" }],
  creator: "KAHU Studio",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "KAHU Studio",
    title: "KAHU Studio | Design mobilier artisanal",
    description:
      "Studio de design mobilier artisanal a Abidjan. Creations uniques, sur-mesure et amenagement d'espaces.",
  },
  twitter: {
    card: "summary_large_image",
    title: "KAHU Studio | Design mobilier artisanal",
    description:
      "Studio de design mobilier artisanal a Abidjan. Creations uniques, sur-mesure et amenagement d'espaces.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${cormorant.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
