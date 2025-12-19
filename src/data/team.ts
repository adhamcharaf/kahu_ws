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
      fr: "Designer produit et ebeniste de formation, Mouna a fonde KAHU Studio en 2019 avec une vision claire : creer du mobilier artisanal qui celebre les bois africains tout en repondant aux standards du design contemporain. Son approche allie tradition et innovation, chaque piece etant pensee comme une oeuvre unique.",
      en: "A product designer and trained cabinetmaker, Mouna founded KAHU Studio in 2019 with a clear vision: to create artisanal furniture that celebrates African woods while meeting contemporary design standards. Her approach combines tradition and innovation, with each piece conceived as a unique work.",
    },
    image: "/images/team/mouna-shaima.jpg",
    isFounder: true,
    specialties: {
      fr: ["Design mobilier", "Direction artistique", "Recherche materiaux"],
      en: ["Furniture design", "Art direction", "Material research"],
    },
  },
  {
    id: "kouadio-yao",
    name: "Kouadio Yao",
    role: {
      fr: "Maitre Ebeniste",
      en: "Master Cabinetmaker",
    },
    bio: {
      fr: "Avec plus de 25 ans d'experience dans le travail du bois, Kouadio est le gardien des techniques traditionnelles d'ebenisterie. Sa maitrise des assemblages complexes et son oeil pour les details font de lui un pilier de l'atelier.",
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
    name: "Aminata Kone",
    role: {
      fr: "Artisan Finitions",
      en: "Finishing Artisan",
    },
    bio: {
      fr: "Specialisee dans les finitions et la teinture naturelle du bois, Aminata apporte la touche finale qui sublime chaque creation. Son expertise dans les huiles et cires naturelles garantit des finitions durables et respectueuses de l'environnement.",
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
    name: "Sekou Traore",
    role: {
      fr: "Artisan Sculpteur",
      en: "Sculptor Artisan",
    },
    bio: {
      fr: "Sekou transforme le bois en oeuvres sculpturales. Son approche intuitive et sa comprehension profonde de la matiere lui permettent de creer des pieces qui repoussent les limites entre mobilier et art.",
      en: "Sekou transforms wood into sculptural works. His intuitive approach and deep understanding of the material allow him to create pieces that push the boundaries between furniture and art.",
    },
    image: "/images/team/sekou-traore.jpg",
    specialties: {
      fr: ["Sculpture sur bois", "Pieces uniques", "Travail organique"],
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
