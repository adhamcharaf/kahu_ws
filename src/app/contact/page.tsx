import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { ContactContent } from "./contact-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez KAHU Studio pour vos projets de mobilier sur-mesure a Abidjan. WhatsApp, email ou visitez notre atelier.",
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <ContactContent />
      <Footer />
    </>
  );
}
