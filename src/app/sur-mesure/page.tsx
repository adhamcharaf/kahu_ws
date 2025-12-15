import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sur-mesure",
  description:
    "Creez avec KAHU Studio une piece unique, faite sur-mesure selon vos envies et vos besoins. Mobilier personnalise a Abidjan.",
};

const processSteps = [
  {
    number: "01",
    title: "Premiere rencontre",
    description:
      "Nous echangeons sur votre projet, vos envies, vos contraintes d'espace et de budget. C'est le moment de partager vos inspirations.",
  },
  {
    number: "02",
    title: "Conception",
    description:
      "Nous elaborons des esquisses et propositions. Ensemble, nous affinons le design jusqu'a obtenir la piece parfaite.",
  },
  {
    number: "03",
    title: "Selection des materiaux",
    description:
      "Nous vous presentons les essences de bois disponibles. Vous participez au choix du materiau qui donnera vie a votre piece.",
  },
  {
    number: "04",
    title: "Fabrication",
    description:
      "Votre piece prend forme dans notre atelier. Nous vous tenons informe de l'avancement et partageons des photos du processus.",
  },
  {
    number: "05",
    title: "Livraison & Installation",
    description:
      "Nous livrons et installons votre piece chez vous. Le moment ou votre vision devient realite.",
  },
];

const projectTypes = [
  {
    title: "Mobilier d'interieur",
    description:
      "Tables, chaises, rangements, bibliotheques... Tout ce qui fait l'ame de votre interieur.",
  },
  {
    title: "Amenagement d'espaces",
    description:
      "Cuisines, dressings, bureaux. Des solutions sur-mesure qui optimisent votre espace.",
  },
  {
    title: "Pieces sculpturales",
    description:
      "Des creations uniques qui deviennent le point focal de votre espace.",
  },
  {
    title: "Restauration",
    description:
      "Redonner vie a vos pieces anciennes tout en preservant leur caractere.",
  },
];

export default function SurMesurePage() {
  return (
    <>
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-section bg-kahu-cream-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-display-lg text-kahu-charcoal">
                Sur-mesure
              </h1>
              <p className="mt-6 text-body-lg text-kahu-taupe leading-relaxed">
                Parce que chaque espace est unique, chaque piece devrait l&apos;etre
                aussi. Creez avec nous le mobilier qui vous ressemble, adapte a
                vos besoins et a votre interieur.
              </p>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-section bg-kahu-cream-warm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-display-md text-kahu-charcoal text-center">
              Le processus
            </h2>
            <p className="mt-4 text-body-md text-kahu-taupe text-center max-w-2xl mx-auto">
              De l&apos;idee a la realisation, nous vous accompagnons a chaque etape
              pour creer la piece parfaite.
            </p>

            <div className="mt-16 space-y-12 md:space-y-0 md:grid md:grid-cols-5 md:gap-8">
              {processSteps.map((step, index) => (
                <div key={step.number} className="relative">
                  {/* Connector line (desktop only) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-kahu-cream-deep -translate-x-4" />
                  )}

                  <div className="text-center md:text-left">
                    <span className="inline-block font-display text-display-sm text-kahu-terracotta">
                      {step.number}
                    </span>
                    <h3 className="mt-2 font-display text-body-lg text-kahu-charcoal">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-body-sm text-kahu-taupe">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Types */}
        <section className="py-section bg-kahu-bark">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-display-md text-kahu-cream text-center">
              Types de projets
            </h2>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {projectTypes.map((type) => (
                <div
                  key={type.title}
                  className="p-6 sm:p-8 bg-kahu-bark-soft rounded-sm"
                >
                  <h3 className="font-display text-body-lg text-kahu-ivory">
                    {type.title}
                  </h3>
                  <p className="mt-2 text-body-sm text-kahu-stone-light">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-section bg-kahu-cream-warm">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-display-md text-kahu-charcoal">
              Vous avez un projet ?
            </h2>
            <p className="mt-4 text-body-md text-kahu-taupe">
              Discutons de votre vision. Chaque projet commence par une
              conversation.
            </p>
            <div className="mt-8">
              <Button href={generateWhatsAppLink()} external size="lg">
                Discuter de mon projet
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
