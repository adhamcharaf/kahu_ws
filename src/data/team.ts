// ================================================
// KAHU Studio - Team Data
// Founder + Artisan collaborators
// ================================================

export interface TeamMember {
  id: string;
  name: string;
  role: {
    fr: string;
    en: string;
  };
  bio: {
    fr: string;
    en: string;
  };
  image: string;
  isFounder?: boolean;
  specialties?: {
    fr: string[];
    en: string[];
  };
  experience?: number; // years
}

export const teamMembers: TeamMember[] = [
  {
    id: "mouna-shaima",
    name: "Mouna Shaima",
    role: {
      fr: "Fondatrice & Designer",
      en: "Founder & Designer",
    },
    bio: {
      fr: "Designer produit et ébéniste de formation, Mouna a fondé KAHU Studio en 2019 avec une vision claire : créer du mobilier artisanal qui célèbre les bois africains tout en répondant aux standards du design contemporain. Son approche allie tradition et innovation, chaque pièce étant pensée comme une œuvre unique.",
      en: "A product designer and trained cabinetmaker, Mouna founded KAHU Studio in 2019 with a clear vision: to create artisanal furniture that celebrates African woods while meeting contemporary design standards. Her approach combines tradition and innovation, with each piece conceived as a unique work.",
    },
    image: "/images/team/mouna-shaima.jpg",
    isFounder: true,
    specialties: {
      fr: ["Design mobilier", "Direction artistique", "Recherche matériaux"],
      en: ["Furniture design", "Art direction", "Material research"],
    },
  },
  {
    id: "kouadio-yao",
    name: "Kouadio Yao",
    role: {
      fr: "Maître Ébéniste",
      en: "Master Cabinetmaker",
    },
    bio: {
      fr: "Avec plus de 25 ans d'expérience dans le travail du bois, Kouadio est le gardien des techniques traditionnelles d'ébénisterie. Sa maîtrise des assemblages complexes et son œil pour les détails font de lui un pilier de l'atelier.",
      en: "With over 25 years of experience in woodworking, Kouadio is the guardian of traditional cabinetmaking techniques. His mastery of complex joinery and eye for detail make him a pillar of the workshop.",
    },
    image: "/images/team/kouadio-yao.jpg",
    specialties: {
      fr: ["Assemblages traditionnels", "Finitions", "Formation"],
      en: ["Traditional joinery", "Finishing", "Training"],
    },
    experience: 25,
  },
  {
    id: "aminata-kone",
    name: "Aminata Koné",
    role: {
      fr: "Artisan Finitions",
      en: "Finishing Artisan",
    },
    bio: {
      fr: "Spécialisée dans les finitions et la teinture naturelle du bois, Aminata apporte la touche finale qui sublime chaque création. Son expertise dans les huiles et cires naturelles garantit des finitions durables et respectueuses de l'environnement.",
      en: "Specialized in finishing and natural wood staining, Aminata brings the final touch that elevates each creation. Her expertise in natural oils and waxes ensures durable and environmentally friendly finishes.",
    },
    image: "/images/team/aminata-kone.jpg",
    specialties: {
      fr: ["Teintures naturelles", "Huiles et cires", "Restauration"],
      en: ["Natural stains", "Oils and waxes", "Restoration"],
    },
    experience: 12,
  },
  {
    id: "sekou-traore",
    name: "Sékou Traoré",
    role: {
      fr: "Artisan Sculpteur",
      en: "Sculptor Artisan",
    },
    bio: {
      fr: "Sékou transforme le bois en œuvres sculpturales. Son approche intuitive et sa compréhension profonde de la matière lui permettent de créer des pièces qui repoussent les limites entre mobilier et art.",
      en: "Sekou transforms wood into sculptural works. His intuitive approach and deep understanding of the material allow him to create pieces that push the boundaries between furniture and art.",
    },
    image: "/images/team/sekou-traore.jpg",
    specialties: {
      fr: ["Sculpture sur bois", "Pièces uniques", "Travail organique"],
      en: ["Wood sculpture", "Unique pieces", "Organic work"],
    },
    experience: 18,
  },
];

export function getFounder(): TeamMember | undefined {
  return teamMembers.find((member) => member.isFounder);
}

export function getArtisans(): TeamMember[] {
  return teamMembers.filter((member) => !member.isFounder);
}

export function getTeamMemberById(id: string): TeamMember | undefined {
  return teamMembers.find((member) => member.id === id);
}
