import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { AtelierContent } from "./atelier-content";

export const metadata: Metadata = {
  title: "L'Atelier",
  description:
    "Découvrez l'histoire de KAHU Studio, l'atelier de design mobilier artisanal fondé par Mouna Shaima à Abidjan.",
};

export default function AtelierPage() {
  return (
    <>
      <Header />
      <AtelierContent />
      <Footer />
    </>
  );
}
