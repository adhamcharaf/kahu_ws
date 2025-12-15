/**
 * KAHU Studio - Cloudinary Helpers
 *
 * Generates optimized Cloudinary URLs for different use cases
 */

type ImageTransform = "thumbnail" | "card" | "full" | "hero" | "gallery";

interface TransformConfig {
  width: number;
  height?: number;
  quality: number;
  crop?: string;
}

const transforms: Record<ImageTransform, TransformConfig> = {
  thumbnail: {
    width: 400,
    height: 533,
    quality: 70,
    crop: "fill",
  },
  card: {
    width: 600,
    height: 800,
    quality: 80,
    crop: "fill",
  },
  full: {
    width: 1200,
    height: 1600,
    quality: 85,
    crop: "fill",
  },
  hero: {
    width: 1920,
    height: 1080,
    quality: 85,
    crop: "fill",
  },
  gallery: {
    width: 1600,
    height: 1200,
    quality: 85,
    crop: "fill",
  },
};

/**
 * Transform a Cloudinary URL with optimizations
 */
export function getOptimizedImageUrl(
  url: string,
  transform: ImageTransform = "card"
): string {
  // Check if it's a Cloudinary URL
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  const config = transforms[transform];

  // Build transformation string
  const transformations = [
    `w_${config.width}`,
    config.height ? `h_${config.height}` : null,
    `q_${config.quality}`,
    config.crop ? `c_${config.crop}` : null,
    "f_auto",
    "dpr_auto",
  ]
    .filter(Boolean)
    .join(",");

  // Insert transformation into URL
  // Cloudinary URL format: https://res.cloudinary.com/[cloud_name]/image/upload/[transformations]/[public_id]
  const urlParts = url.split("/upload/");

  if (urlParts.length === 2) {
    return `${urlParts[0]}/upload/${transformations}/${urlParts[1]}`;
  }

  return url;
}

/**
 * Get srcSet for responsive images
 */
export function getImageSrcSet(url: string): string {
  const widths = [400, 600, 800, 1200];

  return widths
    .map((width) => {
      const optimizedUrl = url.includes("res.cloudinary.com")
        ? url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`)
        : url;
      return `${optimizedUrl} ${width}w`;
    })
    .join(", ");
}

/**
 * Get blur placeholder URL for lazy loading
 */
export function getBlurPlaceholder(url: string): string {
  if (!url.includes("res.cloudinary.com")) {
    return url;
  }

  const urlParts = url.split("/upload/");

  if (urlParts.length === 2) {
    return `${urlParts[0]}/upload/w_20,q_10,e_blur:1000/${urlParts[1]}`;
  }

  return url;
}
