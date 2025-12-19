import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { LieuClient } from "./client";

export const revalidate = 60;

interface LieuPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: LieuPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return {
    title: dict.atelier.lieu.title,
    description: dict.atelier.lieu.heroText,
  };
}

export default async function LieuPage({ params }: LieuPageProps) {
  const { lang: langParam } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);

  return (
    <LieuClient
      lang={lang}
      dict={dict.atelier.lieu}
      parentTitle={dict.atelier.title}
    />
  );
}
