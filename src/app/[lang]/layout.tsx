import { i18n, type Locale, isValidLocale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { notFound } from 'next/navigation';

// Generate static params for all locales
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// Generate metadata based on locale
export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    return {};
  }

  const dict = await getDictionary(lang);

  return {
    title: {
      default: dict.metadata.title,
      template: `%s | KAHU Studio`,
    },
    description: dict.metadata.description,
    openGraph: {
      locale: lang === 'fr' ? 'fr_FR' : 'en_US',
    },
  };
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  // Validate locale
  if (!isValidLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Header lang={lang as Locale} dict={dict} />
      {children}
      <Footer lang={lang as Locale} dict={dict} />
    </>
  );
}
