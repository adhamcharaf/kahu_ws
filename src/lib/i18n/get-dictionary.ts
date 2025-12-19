// ================================================
// KAHU Studio - Dictionary Loader
// ================================================

import type { Locale } from './config';

// Type-safe dictionary structure
export interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    atelier: string;
    objet: string;
    espace: string;
    materiaux: string;
    contact: string;
  };
  common: {
    readMore: string;
    seeAll: string;
    backHome: string;
    loading: string;
    breadcrumb: {
      creations: string;
      espaces: string;
    };
    filters: {
      all: string;
      capsules: string;
      mobilier: string;
    };
    empty: {
      noProducts: string;
      noProjects: string;
    };
    product: {
      materials: string;
      dimensions: string;
      category: string;
      sold: string;
      available: string;
      soldMessage: string;
      seeAvailable: string;
      order: string;
      similar: string;
    };
    project: {
      year: string;
      location: string;
      similarProject: string;
      discuss: string;
    };
    cta: {
      whatsapp: string;
      contact: string;
    };
  };
  home: {
    hero: {
      title: string;
      subtitle: string;
    };
    philosophy: {
      title: string;
      description: string;
    };
  };
  atelier: {
    title: string;
    subtitle: string;
    sections: {
      equipe: { title: string; description: string };
      lieu: { title: string; description: string };
      portfolio: { title: string; description: string };
    };
    equipe: {
      title: string;
      subtitle: string;
      heroText: string;
      founderLabel: string;
      artisansLabel: string;
      experienceLabel: string;
      specialtiesLabel: string;
    };
    lieu: {
      title: string;
      subtitle: string;
      heroText: string;
      features: {
        workshop: { title: string; description: string };
        showroom: { title: string; description: string };
        stockage: { title: string; description: string };
      };
      visitCta: string;
    };
    portfolio: {
      title: string;
      subtitle: string;
      heroText: string;
      filterAll: string;
      filterMobilier: string;
      filterEspaces: string;
      emptyState: string;
    };
  };
  objet: {
    title: string;
    subtitle: string;
    sections: {
      capsules: { title: string; description: string };
      collections: { title: string; description: string };
      surMesure: { title: string; description: string };
    };
    capsules: {
      title: string;
      subtitle: string;
      heroText: string;
      emptyState: string;
    };
    collections: {
      title: string;
      subtitle: string;
      heroText: string;
      emptyState: string;
    };
    surMesure: {
      title: string;
      subtitle: string;
      heroText: string;
      process: {
        title: string;
        subtitle: string;
        steps: Array<{
          number: string;
          title: string;
          description: string;
        }>;
      };
      projectTypes: {
        title: string;
        types: Array<{
          title: string;
          description: string;
        }>;
      };
      cta: {
        title: string;
        subtitle: string;
      };
    };
  };
  espace: {
    title: string;
    subtitle: string;
    sections: {
      renovation: { title: string; description: string };
      amenagement: { title: string; description: string };
      agrandissement: { title: string; description: string };
    };
    renovation: {
      title: string;
      subtitle: string;
      heroText: string;
      features: string[];
    };
    amenagement: {
      title: string;
      subtitle: string;
      heroText: string;
      features: string[];
    };
    agrandissement: {
      title: string;
      subtitle: string;
      heroText: string;
      features: string[];
    };
    cta: {
      title: string;
      subtitle: string;
    };
  };
  materiaux: {
    title: string;
    subtitle: string;
    sections: {
      essences: { title: string; description: string };
      bioMateriaux: { title: string; description: string };
      laboKahu: { title: string; description: string };
    };
    essences: {
      title: string;
      subtitle: string;
      heroText: string;
      durabilityLabel: string;
      originLabel: string;
      densityLabel: string;
    };
    bioMateriaux: {
      title: string;
      subtitle: string;
      heroText: string;
      statusLabels: {
        research: string;
        prototype: string;
        production: string;
      };
    };
    laboKahu: {
      title: string;
      subtitle: string;
      heroText: string;
      sections: {
        research: { title: string; description: string };
        prototyping: { title: string; description: string };
        collaboration: { title: string; description: string };
      };
    };
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      message: string;
      submit: string;
    };
    info: {
      address: string;
      phone: string;
      email: string;
      hours: string;
    };
  };
}

// Dynamic import for dictionaries
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  fr: () => import('./dictionaries/fr.json').then((module) => module.default),
  en: () => import('./dictionaries/en.json').then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
