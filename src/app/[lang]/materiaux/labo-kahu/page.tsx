import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LaboKahuClient } from "./client";

export const revalidate = 60;

interface LaboKahuPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: LaboKahuPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.materiaux.laboKahu.title,
    description: dict.materiaux.laboKahu.heroText,
  };
}

export default async function LaboKahuPage({ params }: LaboKahuPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return (
    <LaboKahuClient
      lang={lang}
      dict={dict.materiaux.laboKahu}
      parentTitle={dict.materiaux.title}
    />
  );
}
