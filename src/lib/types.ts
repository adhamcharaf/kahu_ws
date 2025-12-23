// ================================================
// KAHU Studio - Type Definitions
// ================================================

export type ProductStatus = "Disponible" | "Vendu" | "Brouillon";
export type ProductCategory = "Capsule" | "Mobilier";

export interface Product {
  id: string;
  nom: string;
  slug: string;
  prix: number;
  quantite: number;
  statut: ProductStatus;
  categorie: ProductCategory;
  venteFlash: boolean;
  dateFinFlash: string | null;
  description: string;
  materiaux: string;
  dimensions: string | null;
  photos: string[];
  ordre: number;
}

export interface Project {
  id: string;
  nom: string;
  slug: string;
  description: string;
  photos: string[];
  annee: number | null;
  visible: boolean;
}

// Notion API response types
export interface NotionProductResponse {
  id: string;
  properties: {
    Nom: { title: Array<{ plain_text: string }> };
    Slug: { rich_text: Array<{ plain_text: string }> };
    Prix: { number: number | null };
    Quantite: { number: number | null };
    Statut: { select: { name: ProductStatus } | null };
    Categorie: { select: { name: ProductCategory } | null };
    "Vente Flash": { checkbox: boolean };
    "Date fin flash": { date: { start: string } | null };
    Description: { rich_text: Array<{ plain_text: string }> };
    Materiaux: { rich_text: Array<{ plain_text: string }> };
    Dimensions: { rich_text: Array<{ plain_text: string }> };
    Photos: {
      files?: Array<{ file?: { url: string }; external?: { url: string } }>;
      url?: string | null;
      rich_text?: Array<{ plain_text: string }>;
      type?: string;
    };
    Ordre: { number: number | null };
  };
}

export interface NotionProjectResponse {
  id: string;
  properties: {
    Nom: { title: Array<{ plain_text: string }> };
    Slug: { rich_text: Array<{ plain_text: string }> };
    Description: { rich_text: Array<{ plain_text: string }> };
    Photos: { files: Array<{ file?: { url: string }; external?: { url: string } }> };
    Annee: { number: number | null };
    Visible: { checkbox: boolean };
  };
}

// Filter types
export type ProductFilter = "tous" | "capsule" | "mobilier" | "flash";
