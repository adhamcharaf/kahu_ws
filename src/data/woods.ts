// ================================================
// KAHU Studio - Wood Essences Data
// 9 African woods used in our creations
// ================================================

export interface WoodEssence {
  id: string;
  name: string;
  scientificName: string;
  origin: string;
  characteristics: {
    fr: string[];
    en: string[];
  };
  colorHex: string;
  image: string;
  durability: 1 | 2 | 3 | 4 | 5;
  density: string;
  description: {
    fr: string;
    en: string;
  };
}

export const woodEssences: WoodEssence[] = [
  {
    id: "iroko",
    name: "Iroko",
    scientificName: "Milicia excelsa",
    origin: "Afrique de l'Ouest & Centrale",
    characteristics: {
      fr: ["Très durable", "Résistant aux insectes", "Grain moyen à grossier"],
      en: ["Very durable", "Insect resistant", "Medium to coarse grain"],
    },
    colorHex: "#8B6914",
    image: "/images/woods/iroko.jpg",
    durability: 5,
    density: "620-670 kg/m³",
    description: {
      fr: "Surnommé le 'Teck africain', l'Iroko est prisé pour sa durabilité exceptionnelle et sa résistance naturelle aux intempéries.",
      en: "Nicknamed 'African Teak', Iroko is prized for its exceptional durability and natural weather resistance.",
    },
  },
  {
    id: "acajou",
    name: "Acajou",
    scientificName: "Khaya ivorensis",
    origin: "Côte d'Ivoire",
    characteristics: {
      fr: ["Grain fin", "Facile à travailler", "Belle patine avec l'âge"],
      en: ["Fine grain", "Easy to work", "Beautiful patina with age"],
    },
    colorHex: "#8B4513",
    image: "/images/woods/acajou.jpg",
    durability: 3,
    density: "530-570 kg/m³",
    description: {
      fr: "L'Acajou africain offre une teinte rosée à brun rougeâtre qui s'enrichit avec le temps, idéal pour le mobilier d'intérieur raffiné.",
      en: "African Mahogany offers a pinkish to reddish-brown hue that enriches over time, ideal for refined interior furniture.",
    },
  },
  {
    id: "amazakoue",
    name: "Amazakoué",
    scientificName: "Guibourtia ehie",
    origin: "Afrique de l'Ouest",
    characteristics: {
      fr: ["Très décoratif", "Veinage contrasté", "Haute résistance"],
      en: ["Highly decorative", "Contrasting grain", "High resistance"],
    },
    colorHex: "#5C4033",
    image: "/images/woods/amazakoue.jpg",
    durability: 4,
    density: "750-800 kg/m³",
    description: {
      fr: "Bois précieux aux reflets chatoyants, l'Amazakoué présente un veinage spectaculaire parfait pour les pièces d'exception.",
      en: "Precious wood with shimmering reflections, Amazakoué features spectacular grain perfect for exceptional pieces.",
    },
  },
  {
    id: "makore",
    name: "Makoré",
    scientificName: "Tieghemella heckelii",
    origin: "Afrique de l'Ouest",
    characteristics: {
      fr: ["Rose saumoné", "Grain très fin", "Excellent pour la sculpture"],
      en: ["Salmon pink", "Very fine grain", "Excellent for carving"],
    },
    colorHex: "#C97064",
    image: "/images/woods/makore.jpg",
    durability: 4,
    density: "620-680 kg/m³",
    description: {
      fr: "Sa teinte rose saumonée unique et son grain serré font du Makoré un choix prisé pour les finitions haut de gamme.",
      en: "Its unique salmon pink hue and tight grain make Makoré a prized choice for high-end finishes.",
    },
  },
  {
    id: "movingui",
    name: "Movingui",
    scientificName: "Distemonanthus benthamianus",
    origin: "Afrique Centrale",
    characteristics: {
      fr: ["Jaune doré", "Lustré naturel", "Bonne stabilité"],
      en: ["Golden yellow", "Natural luster", "Good stability"],
    },
    colorHex: "#DAA520",
    image: "/images/woods/movingui.jpg",
    durability: 3,
    density: "700-750 kg/m³",
    description: {
      fr: "Le Movingui illumine les espaces avec sa teinte jaune doré éclatante, apportant chaleur et luminosité.",
      en: "Movingui illuminates spaces with its bright golden yellow hue, bringing warmth and luminosity.",
    },
  },
  {
    id: "framire",
    name: "Framiré",
    scientificName: "Terminalia ivorensis",
    origin: "Côte d'Ivoire",
    characteristics: {
      fr: ["Léger et stable", "Blond clair", "Polyvalent"],
      en: ["Light and stable", "Light blonde", "Versatile"],
    },
    colorHex: "#D2B48C",
    image: "/images/woods/framire.jpg",
    durability: 2,
    density: "500-560 kg/m³",
    description: {
      fr: "Bois blond léger et polyvalent, le Framiré est parfait pour les créations contemporaines aux lignes épurées.",
      en: "Light and versatile blonde wood, Framiré is perfect for contemporary creations with clean lines.",
    },
  },
  {
    id: "niangon",
    name: "Niangon",
    scientificName: "Heritiera utilis",
    origin: "Afrique de l'Ouest",
    characteristics: {
      fr: ["Rouge profond", "Très résistant", "Grain entrelacé"],
      en: ["Deep red", "Very resistant", "Interlocked grain"],
    },
    colorHex: "#722F37",
    image: "/images/woods/niangon.jpg",
    durability: 4,
    density: "680-750 kg/m³",
    description: {
      fr: "Le Niangon offre une teinte rouge profonde majestueuse et une résistance remarquable aux conditions tropicales.",
      en: "Niangon offers a majestic deep red hue and remarkable resistance to tropical conditions.",
    },
  },
  {
    id: "sipo",
    name: "Sipo",
    scientificName: "Entandrophragma utile",
    origin: "Afrique Centrale",
    characteristics: {
      fr: ["Acajou noble", "Reflets cuivrés", "Excellente durabilité"],
      en: ["Noble mahogany", "Coppery reflections", "Excellent durability"],
    },
    colorHex: "#A0522D",
    image: "/images/woods/sipo.jpg",
    durability: 4,
    density: "580-650 kg/m³",
    description: {
      fr: "Le Sipo, cousin noble de l'Acajou, séduit par ses reflets cuivrés et sa noblesse naturelle.",
      en: "Sipo, the noble cousin of Mahogany, seduces with its coppery reflections and natural nobility.",
    },
  },
  {
    id: "bete",
    name: "Bété",
    scientificName: "Mansonia altissima",
    origin: "Afrique de l'Ouest",
    characteristics: {
      fr: ["Brun violacé", "Grain fin", "Facile à polir"],
      en: ["Purplish brown", "Fine grain", "Easy to polish"],
    },
    colorHex: "#4A3728",
    image: "/images/woods/bete.jpg",
    durability: 4,
    density: "590-650 kg/m³",
    description: {
      fr: "Le Bété surprend par ses nuances brun-violacé uniques et sa capacité à prendre un poli d'exception.",
      en: "Bété surprises with its unique purplish-brown nuances and ability to take an exceptional polish.",
    },
  },
];

export function getWoodById(id: string): WoodEssence | undefined {
  return woodEssences.find((wood) => wood.id === id);
}
