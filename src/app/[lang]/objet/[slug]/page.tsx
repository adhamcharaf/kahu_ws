import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { type Locale, isValidLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ui/product-card";
import { ProductGallery } from "@/components/sections/product-gallery";
import {
  getProductBySlug,
  getProducts,
  getSimilarProducts,
} from "@/lib/notion";
import { formatPrice, generateWhatsAppLink } from "@/lib/utils";

interface ProductPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// Generate static paths for all products
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for each product
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { lang: langParam, slug } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: lang === 'fr' ? "Produit non trouve" : "Product not found",
    };
  }

  return {
    title: product.nom,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.nom} | KAHU Studio`,
      description: product.description.slice(0, 160),
      images: product.photos[0] ? [product.photos[0]] : [],
    },
  };
}

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function ProductPage({ params }: ProductPageProps) {
  const { lang: langParam, slug } = await params;
  const lang = (isValidLocale(langParam) ? langParam : 'fr') as Locale;
  const dict = await getDictionary(lang);
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const similarProducts = await getSimilarProducts(
    product.slug,
    product.categorie,
    4
  );

  const isSold = product.statut === "Vendu";
  const badgeStatus = product.venteFlash
    ? "flash"
    : product.statut;

  return (
    <main className="bg-kahu-cream-warm min-h-screen pt-20">
      {/* Product Section */}
      <section className="py-section bg-kahu-cream-warm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-body-sm text-kahu-taupe">
              <li>
                <Link
                  href={`/${lang}/objet`}
                  className="hover:text-kahu-terracotta transition-colors"
                >
                  {dict.objet.title}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-kahu-charcoal">{product.nom}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <ProductGallery
              images={product.photos}
              productName={product.nom}
            />

            {/* Product Info */}
            <div className="lg:py-8">
              {/* Badge */}
              <Badge status={badgeStatus} />

              {/* Name & Price */}
              <h1 className="mt-4 font-display text-display-md text-kahu-charcoal">
                {product.nom}
              </h1>
              <p className="mt-2 text-body-lg text-kahu-taupe">
                {formatPrice(product.prix)}
              </p>

              {/* Description */}
              <div className="mt-8 prose prose-kahu">
                <p className="text-body-md text-kahu-bark leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Details */}
              <div className="mt-8 space-y-4">
                {/* Materials */}
                <div>
                  <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-taupe">
                    {dict.common.product.materials}
                  </h3>
                  <p className="mt-1 text-body-md text-kahu-bark">
                    {product.materiaux}
                  </p>
                </div>

                {/* Dimensions */}
                {product.dimensions && (
                  <div>
                    <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-taupe">
                      {dict.common.product.dimensions}
                    </h3>
                    <p className="mt-1 text-body-md text-kahu-bark">
                      {product.dimensions}
                    </p>
                  </div>
                )}

                {/* Category */}
                <div>
                  <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-taupe">
                    {dict.common.product.category}
                  </h3>
                  <p className="mt-1 text-body-md text-kahu-bark">
                    {product.categorie}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-10">
                {isSold ? (
                  <div className="space-y-4">
                    <p className="text-body-sm text-kahu-taupe">
                      {dict.common.product.soldMessage}
                    </p>
                    <Button href={`/${lang}/objet/collections`} variant="secondary">
                      {dict.common.product.seeAvailable}
                    </Button>
                  </div>
                ) : (
                  <Button
                    href={generateWhatsAppLink(product.nom)}
                    external
                    size="lg"
                  >
                    {dict.common.product.order}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="py-section bg-kahu-cream-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-display-sm text-kahu-charcoal text-center">
              {dict.common.product.similar}
            </h2>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {similarProducts.map((similarProduct) => (
                <ProductCard
                  key={similarProduct.id}
                  product={similarProduct}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
