import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "L'Atelier",
  description:
    "Decouvrez l'histoire de KAHU Studio, l'atelier de design mobilier artisanal fonde par Mouna Shaima a Abidjan.",
};

export default function AtelierPage() {
  return (
    <>
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-section bg-kahu-cream-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-display-lg text-kahu-charcoal">
                L&apos;Atelier
              </h1>
              <p className="mt-6 text-body-lg text-kahu-taupe leading-relaxed">
                KAHU Studio est ne de la passion pour le bois et l&apos;artisanat.
                Chaque piece qui sort de notre atelier raconte une histoire,
                celle d&apos;un materiau noble transforme avec respect et intention.
              </p>
            </div>
          </div>
        </section>

        {/* Mouna Section */}
        <section className="py-section bg-kahu-cream-warm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Portrait Placeholder */}
              <div className="aspect-[3/4] bg-kahu-cream-deep rounded-sm" />

              {/* Text */}
              <div>
                <h2 className="font-display text-display-md text-kahu-charcoal">
                Shaima Mouna 
                </h2>
                <p className="mt-2 text-body-sm text-kahu-taupe uppercase tracking-wider">
                  Designer produit & Ebeniste
                </p>
                <div className="mt-6 space-y-4 text-body-md text-kahu-bark leading-relaxed">
                  <p>
                    Formee au design produit et a l&apos;ebenisterie, Shaima a fonde
                    KAHU Studio avec une vision claire : creer des pieces qui
                    durent, qui ont une ame, et qui s&apos;integrent naturellement
                    dans les espaces de vie.
                  </p>
                  <p>
                    Chaque creation est pensee comme une sculpture fonctionnelle,
                    ou la beaute du materiau brut rencontre l&apos;intention du design.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Origin of KAHU */}
        <section className="py-section bg-kahu-bark">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-display-sm text-kahu-cream">
              L&apos;origine du nom
            </h2>
            <p className="mt-6 text-body-lg text-kahu-stone-light leading-relaxed">
              <span className="text-kahu-ivory font-medium">KAHU</span> est la
              contraction de <span className="text-kahu-ivory">Ka</span>rina et <span className="text-kahu-ivory">Hu</span>ssein, les parents de
              Mouna. Un hommage a ceux qui lui ont transmis le gout du beau, du
              bien fait, et l&apos;importance de creer avec le coeur.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-section bg-kahu-cream-warm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-display-md text-kahu-charcoal">
                Notre philosophie
              </h2>
              <div className="mt-8 space-y-6 text-body-md text-kahu-bark leading-relaxed">
                <p>
                  Chez KAHU, nous croyons que le mobilier doit etre plus qu&apos;un
                  objet utilitaire. Il doit porter en lui une intention, une
                  histoire, une presence.
                </p>
                <p>
                  Nous travaillons principalement avec des essences locales,
                  selectionnees pour leur beaute naturelle et leur durabilite.
                  Chaque piece est fabriquee a la main dans notre atelier
                  d&apos;Abidjan, avec un soin particulier apporte aux finitions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-section bg-kahu-cream-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-display-md text-kahu-charcoal text-center">
              Le processus creatif
            </h2>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-kahu-terracotta/10 flex items-center justify-center">
                  <span className="font-display text-display-sm text-kahu-terracotta">
                    1
                  </span>
                </div>
                <h3 className="mt-4 font-display text-body-lg text-kahu-charcoal">
                  Conception
                </h3>
                <p className="mt-2 text-body-sm text-kahu-taupe">
                  Chaque piece commence par un dessin, une reflexion sur la
                  fonction et la forme.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-kahu-terracotta/10 flex items-center justify-center">
                  <span className="font-display text-display-sm text-kahu-terracotta">
                    2
                  </span>
                </div>
                <h3 className="mt-4 font-display text-body-lg text-kahu-charcoal">
                  Selection
                </h3>
                <p className="mt-2 text-body-sm text-kahu-taupe">
                  Le choix du bois est crucial. Nous selectionnons chaque
                  planche pour ses veines, sa couleur, son caractere.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-kahu-terracotta/10 flex items-center justify-center">
                  <span className="font-display text-display-sm text-kahu-terracotta">
                    3
                  </span>
                </div>
                <h3 className="mt-4 font-display text-body-lg text-kahu-charcoal">
                  Fabrication
                </h3>
                <p className="mt-2 text-body-sm text-kahu-taupe">
                  A la main, avec patience et precision. Chaque detail compte,
                  chaque finition est soignee.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Placeholder */}
        <section className="py-section bg-kahu-cream-warm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-display-md text-kahu-charcoal text-center">
              L&apos;atelier en images
            </h2>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-kahu-cream-deep rounded-sm"
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
