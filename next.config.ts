import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.notion.so",
        pathname: "/**",
      },
    ],
  },

  // ============================================================================
  // SEO Redirections - Anciennes URLs vers nouvelles URLs i18n
  // ============================================================================
  async redirects() {
    return [
      // ========== Accueil ==========
      {
        source: "/home",
        destination: "/fr",
        permanent: true,
      },

      // ========== Creations -> Objet ==========
      {
        source: "/creations",
        destination: "/fr/objet/collections",
        permanent: true,
      },
      {
        source: "/creations/:slug",
        destination: "/fr/objet/:slug",
        permanent: true,
      },
      {
        source: "/collections",
        destination: "/fr/objet/collections",
        permanent: true,
      },
      {
        source: "/capsules",
        destination: "/fr/objet/capsules",
        permanent: true,
      },

      // ========== Sur-mesure -> Objet/Sur-mesure ==========
      {
        source: "/sur-mesure",
        destination: "/fr/objet/sur-mesure",
        permanent: true,
      },
      {
        source: "/bespoke",
        destination: "/en/objet/sur-mesure",
        permanent: true,
      },

      // ========== Espaces -> Espace ==========
      {
        source: "/espaces",
        destination: "/fr/espace",
        permanent: true,
      },
      {
        source: "/espaces/:slug",
        destination: "/fr/espace/:slug",
        permanent: true,
      },
      {
        source: "/spaces",
        destination: "/en/espace",
        permanent: true,
      },
      {
        source: "/renovation",
        destination: "/fr/espace/renovation",
        permanent: true,
      },
      {
        source: "/amenagement",
        destination: "/fr/espace/amenagement",
        permanent: true,
      },
      {
        source: "/agrandissement",
        destination: "/fr/espace/agrandissement",
        permanent: true,
      },

      // ========== Atelier ==========
      {
        source: "/atelier",
        destination: "/fr/atelier",
        permanent: true,
      },
      {
        source: "/studio",
        destination: "/en/atelier",
        permanent: true,
      },
      {
        source: "/equipe",
        destination: "/fr/atelier/equipe",
        permanent: true,
      },
      {
        source: "/team",
        destination: "/en/atelier/equipe",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/fr/atelier/portfolio",
        permanent: true,
      },

      // ========== Materiaux ==========
      {
        source: "/materiaux",
        destination: "/fr/materiaux",
        permanent: true,
      },
      {
        source: "/materials",
        destination: "/en/materiaux",
        permanent: true,
      },
      {
        source: "/essences",
        destination: "/fr/materiaux/essences",
        permanent: true,
      },
      {
        source: "/woods",
        destination: "/en/materiaux/essences",
        permanent: true,
      },
      {
        source: "/bio-materiaux",
        destination: "/fr/materiaux/bio-materiaux",
        permanent: true,
      },
      {
        source: "/labo",
        destination: "/fr/materiaux/labo-kahu",
        permanent: true,
      },
      {
        source: "/lab",
        destination: "/en/materiaux/labo-kahu",
        permanent: true,
      },

      // ========== Contact ==========
      {
        source: "/contact",
        destination: "/fr/contact",
        permanent: true,
      },

      // ========== Objet (direct access) ==========
      {
        source: "/objet",
        destination: "/fr/objet",
        permanent: true,
      },
      {
        source: "/objects",
        destination: "/en/objet",
        permanent: true,
      },

      // ========== Legacy/Misc ==========
      {
        source: "/about",
        destination: "/fr/atelier",
        permanent: true,
      },
      {
        source: "/a-propos",
        destination: "/fr/atelier",
        permanent: true,
      },
      {
        source: "/produits",
        destination: "/fr/objet/collections",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/en/objet/collections",
        permanent: true,
      },
      {
        source: "/projets",
        destination: "/fr/espace",
        permanent: true,
      },
      {
        source: "/projects",
        destination: "/en/espace",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
