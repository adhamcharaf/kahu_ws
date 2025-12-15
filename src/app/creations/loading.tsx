import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ProductGridSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function CreationsLoading() {
  return (
    <>
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-section bg-kahu-cream-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="mt-4 h-6 w-full max-w-2xl" />
          </div>
        </section>

        {/* Filters & Grid */}
        <section className="py-section bg-kahu-cream-warm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Filters Skeleton */}
            <div className="flex gap-2 sm:gap-3">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>

            {/* Products Grid */}
            <div className="mt-10">
              <ProductGridSkeleton count={6} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
