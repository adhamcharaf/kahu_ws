import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ProjectGridSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function EspacesLoading() {
  return (
    <>
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-section bg-kahu-cream-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Skeleton className="h-12 w-48" />
            <Skeleton className="mt-4 h-6 w-full max-w-2xl" />
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-section bg-kahu-cream-warm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ProjectGridSkeleton count={4} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
