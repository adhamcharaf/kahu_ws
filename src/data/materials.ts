// ================================================
// KAHU Studio - Bio-Materials Data
// Innovative sustainable materials research
// ================================================

export interface BioMaterial {
  id: string;
  name: string;
  year: number;
  description: {
    fr: string;
    en: string;
  };
  image: string;
  status: "research" | "prototype" | "production";
  ingredients: {
    fr: string[];
    en: string[];
  };
}

export const bioMaterials: BioMaterial[] = [
  {
    id: "bio-terrazzo",
    name: "Bio-Terrazzo",
    year: 2023,
    description: {
      fr: "Surface décorative composée de chutes de bois et de résine bio-sourcée. Une alternative écologique au terrazzo traditionnel, valorisant nos déchets d'atelier.",
      en: "Decorative surface made from wood offcuts and bio-sourced resin. An ecological alternative to traditional terrazzo, repurposing our workshop waste.",
    },
    image: "/images/materials/bio-terrazzo.jpg",
    status: "production",
    ingredients: {
      fr: ["Chutes de bois précieux", "Résine bio-sourcée", "Pigments naturels"],
      en: ["Precious wood offcuts", "Bio-sourced resin", "Natural pigments"],
    },
  },
  {
    id: "graine",
    name: "Graine",
    year: 2024,
    description: {
      fr: "Matériau composite à base de coques de graines locales et de liant naturel. Texture unique et empreinte carbone minimale.",
      en: "Composite material based on local seed shells and natural binder. Unique texture and minimal carbon footprint.",
    },
    image: "/images/materials/graine.jpg",
    status: "prototype",
    ingredients: {
      fr: ["Coques de graines", "Liant végétal", "Fibres naturelles"],
      en: ["Seed shells", "Plant-based binder", "Natural fibers"],
    },
  },
  {
    id: "tiles",
    name: "Tiles",
    year: 2025,
    description: {
      fr: "Carreaux modulaires fabriqués à partir de sciure compressée et de cire d'abeille. Projet en développement pour revêtements muraux.",
      en: "Modular tiles made from compressed sawdust and beeswax. Project in development for wall coverings.",
    },
    image: "/images/materials/tiles.jpg",
    status: "research",
    ingredients: {
      fr: ["Sciure compressée", "Cire d'abeille", "Huiles essentielles"],
      en: ["Compressed sawdust", "Beeswax", "Essential oils"],
    },
  },
];

export function getBioMaterialById(id: string): BioMaterial | undefined {
  return bioMaterials.find((material) => material.id === id);
}

export function getBioMaterialsByStatus(status: BioMaterial["status"]): BioMaterial[] {
  return bioMaterials.filter((material) => material.status === status);
}
