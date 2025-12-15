import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { generateWhatsAppLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez KAHU Studio pour vos projets de mobilier sur-mesure a Abidjan. WhatsApp, email ou visitez notre atelier.",
};

export default function ContactPage() {
  return (
    <>
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-section bg-kahu-cream-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="font-display text-display-lg text-kahu-charcoal">
                Contact
              </h1>
              <p className="mt-6 text-body-lg text-kahu-taupe leading-relaxed">
                Une question, un projet, une envie ? N&apos;hesitez pas a nous
                contacter. Nous serons ravis d&apos;echanger avec vous.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-section bg-kahu-cream-warm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Contact Details */}
              <div>
                <h2 className="font-display text-display-sm text-kahu-charcoal">
                  Nos coordonnees
                </h2>

                <div className="mt-8 space-y-6">
                  {/* Address */}
                  <div>
                    <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-taupe">
                      Adresse
                    </h3>
                    <p className="mt-2 text-body-md text-kahu-bark">
                      Riviera 2 les jardins
                      <br />
                      Abidjan, Cote d&apos;Ivoire
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-taupe">
                      Email
                    </h3>
                    <a
                      href="mailto:kahu.ci@outlook.com"
                      className="mt-2 block text-body-md text-kahu-bark hover:text-kahu-terracotta transition-colors"
                    >
                      kahu.ci@outlook.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div>
                    <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-taupe">
                      Telephone
                    </h3>
                    <a
                      href="tel:+2250704160700"
                      className="mt-2 block text-body-md text-kahu-bark hover:text-kahu-terracotta transition-colors"
                    >
                      +225 07 04 16 07 00
                    </a>
                  </div>

                  {/* Instagram */}
                  <div>
                    <h3 className="text-body-sm font-medium uppercase tracking-wider text-kahu-taupe">
                      Instagram
                    </h3>
                    <a
                      href="https://www.instagram.com/kahu.ci/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-2 text-body-md text-kahu-bark hover:text-kahu-terracotta transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      @kahu.ci
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-kahu-bark rounded-sm p-8 sm:p-10 flex flex-col justify-center">
                <h2 className="font-display text-display-sm text-kahu-cream">
                  Le plus simple ?
                </h2>
                <p className="mt-4 text-body-md text-kahu-stone-light">
                  Ecrivez-nous directement sur WhatsApp. Nous repondons
                  generalement dans la journee.
                </p>
                <div className="mt-8">
                  <Button
                    href={generateWhatsAppLink()}
                    external
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Ecrire sur WhatsApp
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Hours */}
        <section className="py-section bg-kahu-cream-deep">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="font-display text-display-sm text-kahu-charcoal">
                Horaires
              </h2>
              <p className="mt-4 text-body-md text-kahu-taupe">
                L&apos;atelier est ouvert sur rendez-vous. Contactez-nous pour
                organiser une visite et decouvrir nos creations en personne.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
