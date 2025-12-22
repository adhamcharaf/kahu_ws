import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="pt-20">
        <section className="min-h-[70vh] flex items-center justify-center bg-kahu-cream-warm">
          <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center">
            {/* 404 */}
            <p className="font-display text-display-xl text-kahu-cream-deep">
              404
            </p>

            {/* Message */}
            <h1 className="mt-4 font-display text-display-md text-kahu-charcoal">
              Page introuvable
            </h1>
            <p className="mt-4 text-body-md text-kahu-taupe">
              La page que vous recherchez n&apos;existe pas ou a ete deplacee.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button href="/" variant="primary">
                Retour a l&apos;accueil
              </Button>
              <Button href="/fr/objet" variant="secondary">
                Voir les creations
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
