import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary, type Dictionary } from "@/lib/i18n/get-dictionary";
import { SurMesureContent } from "./sur-mesure-content";

export const revalidate = 60;

interface SurMesurePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: SurMesurePageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.objet.surMesure.title,
    description: dict.objet.surMesure.heroText,
  };
}

export default async function SurMesurePage({ params }: SurMesurePageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return <SurMesureContent lang={lang} dict={dict} />;
}
