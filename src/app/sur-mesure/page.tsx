import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SurMesureContent } from "./sur-mesure-content";

export const metadata: Metadata = {
  title: "Sur-mesure",
  description:
    "Creez avec KAHU Studio une piece unique, faite sur-mesure selon vos envies et vos besoins. Mobilier personnalise a Abidjan.",
};

export default function SurMesurePage() {
  return (
    <>
      <Header />
      <SurMesureContent />
      <Footer />
    </>
  );
}
