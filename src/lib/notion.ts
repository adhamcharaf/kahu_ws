import { Client } from "@notionhq/client";
import type {
  Product,
  Project,
  NotionProductResponse,
  NotionProjectResponse,
  ProductCategory,
  ProductStatus,
} from "./types";
import { isFlashSaleActive } from "./utils";

// Initialize Notion client
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const PRODUCTS_DB = process.env.NOTION_PRODUCTS_DB!;
const PROJECTS_DB = process.env.NOTION_PROJECTS_DB!;

// ================================================
// Helper functions to parse Notion responses
// ================================================

function parseProduct(page: NotionProductResponse): Product {
  const props = page.properties;

  // Extract photos URLs - support both "files" array and "url" type
  let photos: string[] = [];

  // Option 1: Files array (Notion Files & media property)
  if (props.Photos?.files && Array.isArray(props.Photos.files)) {
    photos = props.Photos.files.map((file) => {
      if (file.external?.url) return file.external.url;
      if (file.file?.url) return file.file.url;
      return "";
    }).filter(Boolean);
  }

  // Option 2: URL type (Notion URL property)
  if (photos.length === 0 && props.Photos?.url) {
    photos = [props.Photos.url];
  }

  // Option 3: Rich text type (URLs séparées par sauts de ligne)
  if (photos.length === 0 && props.Photos?.rich_text) {
    const rawText = props.Photos.rich_text.map((t) => t.plain_text).join("");
    photos = rawText
      .split(/[\n\r]+/)
      .map((url) => url.trim())
      .filter((url) => url.startsWith("http"));
  }

  // Parse basic fields
  const quantite = props.Quantite?.number ?? 1;
  let statut = (props.Statut?.select?.name ?? "Brouillon") as ProductStatus;
  const venteFlash = props["Vente Flash"]?.checkbox ?? false;
  const dateFinFlash = props["Date fin flash"]?.date?.start ?? null;

  // Auto-status: if quantity is 0, mark as sold
  if (quantite === 0) {
    statut = "Vendu";
  }

  // Check if flash sale is still active
  const isFlashActive = venteFlash && isFlashSaleActive(dateFinFlash);

  return {
    id: page.id,
    nom: props.Nom?.title?.[0]?.plain_text ?? "",
    slug: props.Slug?.rich_text?.[0]?.plain_text ?? "",
    prix: props.Prix?.number ?? 0,
    quantite,
    statut,
    categorie: (props.Categorie?.select?.name ?? "Mobilier") as ProductCategory,
    venteFlash: isFlashActive,
    dateFinFlash,
    description: props.Description?.rich_text?.map((t) => t.plain_text).join("") ?? "",
    materiaux: props.Materiaux?.rich_text?.map((t) => t.plain_text).join("") ?? "",
    dimensions: props.Dimensions?.rich_text?.[0]?.plain_text ?? null,
    photos,
    ordre: props.Ordre?.number ?? 999,
  };
}

function parseProject(page: NotionProjectResponse): Project {
  const props = page.properties;

  // Extract photos URLs
  const photos = props.Photos?.files?.map((file) => {
    if (file.external?.url) return file.external.url;
    if (file.file?.url) return file.file.url;
    return "";
  }).filter(Boolean) ?? [];

  return {
    id: page.id,
    nom: props.Nom?.title?.[0]?.plain_text ?? "",
    slug: props.Slug?.rich_text?.[0]?.plain_text ?? "",
    description: props.Description?.rich_text?.map((t) => t.plain_text).join("") ?? "",
    photos,
    annee: props.Annee?.number ?? null,
    visible: props.Visible?.checkbox ?? true,
  };
}

// ================================================
// Error handling wrapper
// ================================================

async function safeNotionQuery<T>(
  queryFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await queryFn();
  } catch (error) {
    console.error("Notion API error:", error);
    return fallback;
  }
}

// ================================================
// Products API
// ================================================

/**
 * Get all visible products, sorted by flash sale first, then by order
 */
export async function getProducts(): Promise<Product[]> {
  return safeNotionQuery(async () => {
    const response = await notion.databases.query({
      database_id: PRODUCTS_DB,
      filter: {
        property: "Statut",
        select: {
          does_not_equal: "Brouillon",
        },
      },
    });

    const products = response.results.map((page) =>
      parseProduct(page as unknown as NotionProductResponse)
    );

    // Sort: flash sales first, then by order
    return products.sort((a, b) => {
      if (a.venteFlash && !b.venteFlash) return -1;
      if (!a.venteFlash && b.venteFlash) return 1;
      return a.ordre - b.ordre;
    });
  }, []);
}

/**
 * Get products filtered by category
 */
export async function getProductsByCategory(
  category: ProductCategory
): Promise<Product[]> {
  return safeNotionQuery(async () => {
    const response = await notion.databases.query({
      database_id: PRODUCTS_DB,
      filter: {
        and: [
          {
            property: "Statut",
            select: {
              does_not_equal: "Brouillon",
            },
          },
          {
            property: "Categorie",
            select: {
              equals: category,
            },
          },
        ],
      },
    });

    const products = response.results.map((page) =>
      parseProduct(page as unknown as NotionProductResponse)
    );

    return products.sort((a, b) => {
      if (a.venteFlash && !b.venteFlash) return -1;
      if (!a.venteFlash && b.venteFlash) return 1;
      return a.ordre - b.ordre;
    });
  }, []);
}

/**
 * Get flash sale products only
 */
export async function getFlashSaleProducts(): Promise<Product[]> {
  return safeNotionQuery(async () => {
    const response = await notion.databases.query({
      database_id: PRODUCTS_DB,
      filter: {
        and: [
          {
            property: "Statut",
            select: {
              equals: "Disponible",
            },
          },
          {
            property: "Vente Flash",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    const products = response.results.map((page) =>
      parseProduct(page as unknown as NotionProductResponse)
    );

    // Filter out expired flash sales
    return products.filter((p) => p.venteFlash).sort((a, b) => a.ordre - b.ordre);
  }, []);
}

/**
 * Get a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  return safeNotionQuery(async () => {
    const response = await notion.databases.query({
      database_id: PRODUCTS_DB,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    return parseProduct(response.results[0] as unknown as NotionProductResponse);
  }, null);
}

/**
 * Get featured products for homepage (3-4 products)
 */
export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.statut === "Disponible").slice(0, limit);
}

/**
 * Get similar products (same category, excluding current)
 */
export async function getSimilarProducts(
  currentSlug: string,
  category: ProductCategory,
  limit = 4
): Promise<Product[]> {
  const products = await getProductsByCategory(category);
  return products
    .filter((p) => p.slug !== currentSlug && p.statut === "Disponible")
    .slice(0, limit);
}

/**
 * Check if there are active flash sales
 */
export async function hasActiveFlashSale(): Promise<boolean> {
  const flashProducts = await getFlashSaleProducts();
  return flashProducts.length > 0;
}

// ================================================
// Projects API
// ================================================

/**
 * Get all visible projects, sorted by year (most recent first)
 */
export async function getProjects(): Promise<Project[]> {
  return safeNotionQuery(async () => {
    const response = await notion.databases.query({
      database_id: PROJECTS_DB,
      filter: {
        property: "Visible",
        checkbox: {
          equals: true,
        },
      },
    });

    const projects = response.results.map((page) =>
      parseProject(page as unknown as NotionProjectResponse)
    );

    // Sort by year, most recent first
    return projects.sort((a, b) => (b.annee ?? 0) - (a.annee ?? 0));
  }, []);
}

/**
 * Get a single project by slug
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return safeNotionQuery(async () => {
    const response = await notion.databases.query({
      database_id: PROJECTS_DB,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug,
            },
          },
          {
            property: "Visible",
            checkbox: {
              equals: true,
            },
          },
        ],
      },
    });

    if (response.results.length === 0) {
      return null;
    }

    return parseProject(response.results[0] as unknown as NotionProjectResponse);
  }, null);
}

/**
 * Get projects by year
 */
export async function getProjectsByYear(year: number): Promise<Project[]> {
  return safeNotionQuery(async () => {
    const response = await notion.databases.query({
      database_id: PROJECTS_DB,
      filter: {
        and: [
          {
            property: "Visible",
            checkbox: {
              equals: true,
            },
          },
          {
            property: "Annee",
            number: {
              equals: year,
            },
          },
        ],
      },
    });

    return response.results.map((page) =>
      parseProject(page as unknown as NotionProjectResponse)
    );
  }, []);
}

/**
 * Get all unique years from projects
 */
export async function getProjectYears(): Promise<number[]> {
  const projects = await getProjects();
  const years = [...new Set(projects.map((p) => p.annee).filter(Boolean))] as number[];
  return years.sort((a, b) => b - a);
}
